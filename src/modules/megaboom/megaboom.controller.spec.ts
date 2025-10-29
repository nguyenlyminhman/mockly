import { Test, TestingModule } from '@nestjs/testing';
import { MegaboomController } from './megaboom.controller';

describe('MegaboomController', () => {
  let controller: MegaboomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MegaboomController],
    }).compile();

    controller = module.get<MegaboomController>(MegaboomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
