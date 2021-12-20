import { ApiProperty } from "@nestjs/swagger";

export class BookDto {
  @ApiProperty()
  bookId: string
}

export class MemberBookDto{
  @ApiProperty()
  memberBookId: string
}