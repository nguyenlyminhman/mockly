import { Test, TestingModule } from '@nestjs/testing';
import { MegaboomService } from './megaboom.service';

describe('MegaboomService', () => {
  let service: MegaboomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MegaboomService],
    }).compile();

    service = module.get<MegaboomService>(MegaboomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
