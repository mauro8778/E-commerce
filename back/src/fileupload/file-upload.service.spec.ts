import { Test, TestingModule } from '@nestjs/testing';
import { FileuUploadService } from './file-upload.service';

describe('FileuUploadService', () => {
  let service: FileuUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileuUploadService],
    }).compile();

    service = module.get<FileuUploadService>(FileuUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
