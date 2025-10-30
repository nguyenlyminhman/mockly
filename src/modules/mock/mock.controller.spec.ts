import { Test, TestingModule } from '@nestjs/testing';
import { MockController } from './mock.controller';
import { MockService } from './mock.service';
import { MockResponse } from '../../common/response.helper';
import { HttpStatus } from '@nestjs/common';

describe('MockController', () => {
  let controller: MockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockController],
      providers: [MockService],
    }).compile();

    controller = module.get<MockController>(MockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return specified data from service', async () => {
    const data = { message: 'This is a delayed response after timeout.' };
    const expected = MockResponse.success(data, 'yo', HttpStatus.ACCEPTED);
    const result = await controller.callTimeoutData();

    expect(result).toEqual(expected);
  }, 10000);

  it('should return common data from service', async () => {
    const result = await controller.callTimeoutData();

    expect(result).toMatchObject(
      {
        statusCode: HttpStatus.ACCEPTED,
        message: 'yo',
        data: expect.anything(),
      },
    );
  }, 10000);

});
