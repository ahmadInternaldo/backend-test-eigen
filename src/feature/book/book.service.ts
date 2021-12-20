import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Book } from 'src/entities/book';
import { FilterException } from 'src/utils/exceptions/filter-exception';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book)
    private readonly bookRepo: typeof Book,
  ) {}

  async getAll(): Promise<any> {
    try {
      const books = await this.bookRepo.findAll({
        where: {
          stock: {
            [Op.gte]: 1,
          },
        },
        attributes: ['id', 'title', 'author', 'stock']
      });
      return {
        errorCode: 0,
        message: 'success',
        books,
      };
    } catch (error) {
      throw new FilterException(error)
    }
  }

}
