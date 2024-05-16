import { Test, TestingModule } from '@nestjs/testing';
import { FileuUploadController } from './fileu-upload.controller';

describe('FileuUploadController', () => {
  let controller: FileuUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileuUploadController],
    }).compile();

    controller = module.get<FileuUploadController>(FileuUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
