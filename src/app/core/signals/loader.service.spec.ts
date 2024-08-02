import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have isLoading signal set to false initially', () => {
    expect(service.isLoading()).toBe(false);
  });

  it('should set isLoading to true', () => {
    service.isLoading.set(true);
    expect(service.isLoading()).toBe(true);
  });

  it('should set isLoading to false', () => {
    service.isLoading.set(true);
    service.isLoading.set(false);
    expect(service.isLoading()).toBe(false);
  });
});