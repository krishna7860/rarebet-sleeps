import { Test, TestingModule } from '@nestjs/testing';
import { SleepsController } from './sleeps.controller';

describe('SleepsController', () => {
  let controller: SleepsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SleepsController],
    }).compile();

    controller = module.get<SleepsController>(SleepsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
