import { Test, TestingModule } from '@nestjs/testing';
import { InfosController } from './infos.controller';

describe('InfosController', () => {
  let controller: InfosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfosController],
    }).compile();

    controller = module.get<InfosController>(InfosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
