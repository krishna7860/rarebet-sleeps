import { Test, TestingModule } from '@nestjs/testing';
import { SleepsService } from './sleeps.service';

describe('SleepsService', () => {
  let service: SleepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SleepsService],
    }).compile();

    service = module.get<SleepsService>(SleepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
