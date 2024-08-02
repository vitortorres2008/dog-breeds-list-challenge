// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BreedListComponent } from './breed-list.component';
// import { provideHttpClientTesting } from '@angular/common/http/testing';
// import { BreedService } from '../../core/services/breed.service';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { LoaderService } from '../../core/signals/loader.service';
// import { provideHttpClient } from '@angular/common/http';

// describe('BreedListComponent', () => {
//   let component: BreedListComponent;
//   let fixture: ComponentFixture<BreedListComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         MatDialogModule,
//         MatPaginatorModule,
//         CommonModule,
//         BrowserAnimationsModule,
//         BreedListComponent
//       ],
//       providers: [
//         provideHttpClient(),
//         provideHttpClientTesting(),
//         BreedService,
//         LoaderService
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(BreedListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });





import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedListComponent } from './breed-list.component';
import { BreedService } from '../../core/services/breed.service';
import { LoaderService } from '../../core/signals/loader.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { BreedModel } from '../../core/models/breed.model';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BreedListComponent', () => {
  let component: BreedListComponent;
  let fixture: ComponentFixture<BreedListComponent>;
  let breedService: jasmine.SpyObj<BreedService>;
  let loaderService: LoaderService;

  const mockBreeds: BreedModel[] = [
    {
      id: 1, name: 'Breed 1', temperament: 'Calm', reference_image_id: 'image1', image: { url: '' },
      weight: { imperial: '15 - 20', metric: '35 - 45' },
      height: { imperial: '15 - 20', metric: '35 - 45' },
      bred_for: '',
      breed_group: '',
      life_span: '',
      origin: ''
    },
    {
      id: 2, name: 'Breed 2', temperament: 'Energetic', reference_image_id: 'image2', image: { url: 'url2' },
      weight: { imperial: '15 - 20', metric: '35 - 45' },
      height: { imperial: '15 - 20', metric: '35 - 45' },
      bred_for: '',
      breed_group: '',
      life_span: '',
      origin: ''
    },
  ];

  beforeEach(async () => {
    const breedServiceSpy = jasmine.createSpyObj('BreedService', ['getBreeds', 'getBreedImage']);
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatPaginatorModule,
        CommonModule,
        BrowserAnimationsModule,
        BreedListComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BreedService, useValue: breedServiceSpy },
        LoaderService,
        MatDialog
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BreedListComponent);
    component = fixture.componentInstance;
    breedService = TestBed.inject(BreedService) as jasmine.SpyObj<BreedService>;
    loaderService = TestBed.inject(LoaderService);

    breedService.getBreeds.and.returnValue(of(mockBreeds));
    breedService.getBreedImage.and.returnValue(of({
      id: '',
      url: '',
      breeds: [{
        id: 1, name: 'Breed 1', temperament: 'Calm', reference_image_id: 'image1', image: { url: 'url1' },
        weight: { imperial: '15 - 20', metric: '35 - 45' },
        height: { imperial: '15 - 20', metric: '35 - 45' },
        bred_for: '',
        breed_group: '',
        life_span: '',
        origin: ''
      }],
      width: 1,
      height: 1,
    }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBreeds on initialization', () => {
    expect(breedService.getBreeds).toHaveBeenCalledWith(component.pageSize, component.pageIndex);
  });

  it('should display breeds', () => {
    fixture.detectChanges();
    const breedItems = fixture.debugElement.queryAll(By.css('.breed-item'));
    expect(breedItems.length).toBe(mockBreeds.length);
  });

  it('should open dialog with breed data on click', () => {
    spyOn(component, 'openDialog').and.callThrough();
    const breedItem = fixture.debugElement.query(By.css('.breed-item')).nativeElement;
    breedItem.click();
    fixture.detectChanges();
    expect(component.openDialog).toHaveBeenCalledWith(mockBreeds[0]);
  });

  it('should handle page change and fetch new breeds', () => {
    const pageEvent = { pageIndex: 1, pageSize: 20 } as PageEvent;
    spyOn(component, <never>'getBreeds').and.callThrough();

    component.handlePage(pageEvent);

    expect(component.pageIndex).toBe(1);
    expect(component.pageSize).toBe(20);
    expect(component['getBreeds']).toHaveBeenCalled();
  });

  it('should set isLoading to true when fetching breeds', () => {
    loaderService.isLoading.set = jasmine.createSpy('set');
    component['getBreeds']();
    expect(loaderService.isLoading.set).toHaveBeenCalledWith(true);
  });

  it('should set isLoading to false after fetching breeds', (done) => {
    loaderService.isLoading.set = jasmine.createSpy('set');
    component['getBreeds']();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(loaderService.isLoading.set).toHaveBeenCalledWith(false);
      done();
    });
  });

  it('should return breed directly if reference_image_id is not present', () => {
    const mockBreedsWithoutImage: BreedModel[] = [
      {
        id: 1, name: 'Breed 1', temperament: 'Temperament 1', origin: 'Origin 1', life_span: '10 years', weight: { imperial: '15 - 20', metric: '35 - 45' }, height: { imperial: '15 - 20', metric: '35 - 45' },
        bred_for: '',
        breed_group: '',
        reference_image_id: '',
        image: { url: '' }
      }
    ];

    (breedService.getBreeds as jasmine.Spy).and.returnValue(of(mockBreedsWithoutImage));

    component.ngOnInit();
    fixture.detectChanges();

    component.breeds$.subscribe(breeds => {
      expect(breeds.length).toBe(1);
      expect(breeds[0]).toEqual(mockBreedsWithoutImage[0]);
    });
  });
});