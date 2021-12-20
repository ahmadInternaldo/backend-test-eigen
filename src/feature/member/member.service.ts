import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from 'src/entities/book';
import { History } from 'src/entities/history';
import { Member } from 'src/entities/member';
import { MemberBook } from 'src/entities/member-book';
import {
  limitOccurred,
  notFoundException,
  successConstant,
  suspended,
} from 'src/utils/constants/error.constants';
import { FilterException } from 'src/utils/exceptions/filter-exception';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member)
    private readonly memberRepo: typeof Member,

    @InjectModel(MemberBook)
    private readonly memberBookRepo: typeof MemberBook,

    @InjectModel(Book)
    private readonly bookRepo: typeof Book,

    @InjectModel(History)
    private readonly historyRepo: typeof History,
  ) {}

  async getAll(): Promise<any> {
    try {
      const members = await this.memberRepo.findAll({
        attributes: ['id', 'name', 'countBorrowed'],
      });
      return {
        errorCode: 0,
        message: 'success',
        members,
      };
    } catch (error) {
      throw new FilterException(error);
    }
  }

  async borrow(memberId: string, bookId: string): Promise<any> {
    try {
      // validate member first
      const member = await this.memberRepo.findOne({
        where: {
          id: memberId,
        },
      });
      if (member.isPenalty) {
        if (Date.now() < member.suspendedTime) {
          const suspendedTime = suspended(+member.suspendedTime);
          throw new ForbiddenException(suspendedTime);
        } else {
          await this.memberRepo.update(
            { isPenalty: false },
            {
              where: {
                id: memberId,
              },
            },
          );
        }
      }
      // validate member's countBorrowed
      if (member.countBorrowed > 1) {
        throw new BadRequestException(limitOccurred);
      }

      const book = await this.bookRepo.findOne({ where: { id: bookId } });
      // validate book's stock
      if (+book.stock < 1) {
        throw new NotFoundException(notFoundException)
      }

      await this.memberBookRepo.create({
        memberId,
        bookId,
        startBorrow: Date.now(),
      });
      await this.memberRepo.update(
        { countBorrowed: member.countBorrowed + 1 },
        { where: { id: memberId } },
      );
      await this.bookRepo.update(
        { stock: book.stock - 1 },
        { where: { id: bookId } },
      );

      return successConstant;
    } catch (error) {
      throw new FilterException(error);
    }
  }

  async getMemberDetail(memberId: string): Promise<any> {
    const booksBorrowed = await this.memberBookRepo.findAll({
      where: {
        memberId,
      },
      attributes: ['id', 'memberId', 'bookId', 'startBorrow'],
      include: [
        {
          model: Book,
          attributes: ['title', 'author'],
        },
      ],
    });
    const data = booksBorrowed.map((bookBorrowed) => {
      console.log(+bookBorrowed.startBorrow + +process.env.SEVEN_DAYS);
      return {
        id: bookBorrowed.id,
        memberId: bookBorrowed.memberId,
        bookId: bookBorrowed.bookId,
        startBorrow: `${new Date(+bookBorrowed.startBorrow).toLocaleDateString(
          'en-US',
        )} at ${new Date(+bookBorrowed.startBorrow).toLocaleTimeString(
          'en-US',
        )}`,
        mustReturn: `${new Date(
          +bookBorrowed.startBorrow + +process.env.SEVEN_DAYS,
        ).toLocaleDateString('en-US')} at ${new Date(
          +bookBorrowed.startBorrow + +process.env.SEVEN_DAYS,
        ).toLocaleTimeString('en-US')}`,
        bookTitle: bookBorrowed.book.title,
        bookAuthoe: bookBorrowed.book.author,
      };
    });

    return {
      ...successConstant,
      booksBorrowed: data,
    };
  }

  async return(memberBookId: string): Promise<any> {
    try {
      const memberBook = await this.memberBookRepo.findOne({
        where: {
          id: memberBookId,
        },
      });

      //validate memberBookId
      if (!memberBook) {
        throw new NotFoundException(notFoundException);
      }

      await this.memberBookRepo.destroy({ where: { id: memberBookId } });

      //create history
      await this.historyRepo.create({
        memberId: memberBook.memberId,
        bookId: memberBook.bookId,
        startBorrow: +memberBook.startBorrow,
        returnBook: Date.now(),
      });

      //validate possibility for penalty
      if (Date.now() > +memberBook.startBorrow + +process.env.SEVEN_DAYS) {
        await this.memberRepo.update(
          {
            isPenalty: true,
            suspendedTime: Date.now() + +process.env.THREE_DAYS,
          },
          { where: { id: memberBook.memberId } },
        );
      }

      const member = await this.memberRepo.findOne({
        where: { id: memberBook.memberId },
      });
      await this.memberRepo.update(
        { countBorrowed: +member.countBorrowed - 1 },
        { where: { id: member.id } },
      );
      const book = await this.bookRepo.findOne({
        where: { id: memberBook.bookId },
      });
      await this.bookRepo.update(
        { stock: +book.stock + 1 },
        { where: { id: book.id } },
      );
      return successConstant
    } catch (error) {
      throw new FilterException(error);
    }
  }
}
