import { TestBed } from '@angular/core/testing';
import { BreedService } from './breed.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { BreedModel } from '../models/breed.model';
import { ImageDogModel } from '../models/image.model';
import { provideHttpClient } from '@angular/common/http';

describe('BreedService', () => {
  let service: BreedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        BreedService
      ]
    });
    service = TestBed.inject(BreedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve breeds from the API via GET', () => {
    const dummyBreeds: BreedModel[] = [
      { id: 1, name: 'Breed 1', temperament: 'Friendly', reference_image_id: '1', weight: { imperial: '10 - 20', metric: '5 - 10' }, height: { imperial: '15 - 20', metric: '35 - 45' }, life_span: '10 - 12 years', origin: 'Country 1', bred_for: 'Hunting', breed_group: 'Hound', image: { url: 'http://example.com/image1.jpg' } },
      { id: 2, name: 'Breed 2', temperament: 'Energetic', reference_image_id: '2', weight: { imperial: '20 - 30', metric: '10 - 15' }, height: { imperial: '20 - 25', metric: '45 - 55' }, life_span: '12 - 15 years', origin: 'Country 2', bred_for: 'Working', breed_group: 'Working', image: { url: 'http://example.com/image2.jpg' } }
    ];

    service.getBreeds(10, 1).subscribe(breeds => {
      expect(breeds.length).toBe(2);
      expect(breeds).toEqual(dummyBreeds);
    });

    const request = httpMock.expectOne(`${environment.api}/breeds?limit=10&page=1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyBreeds);
  });

  it('should retrieve breed image from the API via GET', () => {
    const dummyImage: ImageDogModel = {
      id: '1',
      url: 'http://example.com/image1.jpg',
      breeds: [],
      width: 0,
      height: 0
    };

    service.getBreedImage('1').subscribe(image => {
      expect(image).toEqual(dummyImage);
    });

    const request = httpMock.expectOne(`${environment.api}/images/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyImage);
  });
});