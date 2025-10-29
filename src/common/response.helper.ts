// response.helper.ts
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';


export class MockResponse<T = any> {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  statusCode: HttpStatus;

  @ApiProperty({ example: 'OK', description: 'Human readable message' })
  message: string;

  @ApiProperty({ description: 'Returned data (if any)' })
  data?: T;

  constructor(statusCode: HttpStatus, message: string, data?: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success<T>(
    data: T,
    message = 'OK',
    statusCode: HttpStatus = HttpStatus.OK,
  ) {
    return new MockResponse(statusCode, message, data);
  }

  static error(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    return new MockResponse(statusCode, message);
  }
}
