import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedItemComponent } from './breed-item.component';
import { BreedModel } from '../../models/breed.model';
import { By } from '@angular/platform-browser';

describe('BreedItemComponent', () => {
  let component: BreedItemComponent;
  let fixture: ComponentFixture<BreedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BreedItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display breed name', () => {
    const breed: BreedModel = {
      id: 1,
      name: 'Test Breed',
      temperament: 'Friendly',
      reference_image_id: 'image1',
      weight: { imperial: '10 - 20', metric: '5 - 10' },
      height: { imperial: '15 - 20', metric: '35 - 45' },
      life_span: '10 - 12 years',
      origin: 'Country 1',
      bred_for: '',
      breed_group: '',
      image: { url: 'http://test.image.url' }
    };

    component.breed = breed;
    fixture.detectChanges();

    const breedNameElement = fixture.debugElement.query(By.css('.breed-name')).nativeElement;
    expect(breedNameElement.textContent).toContain('Test Breed');
  });

  it('should display breed temperament', () => {
    const breed: BreedModel = {
      id: 1,
      name: 'Test Breed',
      temperament: 'Friendly',
      reference_image_id: 'image1',
      weight: { imperial: '10 - 20', metric: '5 - 10' },
      height: { imperial: '15 - 20', metric: '35 - 45' },
      life_span: '10 - 12 years',
      origin: 'Country 1',
      bred_for: '',
      breed_group: '',
      image: { url: 'http://test.image.url' }
    };

    component.breed = breed;
    fixture.detectChanges();

    const breedTemperamentElement = fixture.debugElement.query(By.css('.breed-temperament')).nativeElement;
    expect(breedTemperamentElement.textContent).toContain('Friendly');
  });

  it('should display breed image', () => {
    const breed: BreedModel = {
      id: 1,
      name: 'Test Breed',
      temperament: 'Friendly',
      reference_image_id: 'image1',
      weight: { imperial: '10 - 20', metric: '5 - 10' },
      height: { imperial: '15 - 20', metric: '35 - 45' },
      life_span: '10 - 12 years',
      origin: 'Country 1',
      bred_for: '',
      breed_group: '',
      image: { url: 'http://test.image.url' }
    };

    component.breed = breed;
    fixture.detectChanges();

    const breedImageElement = fixture.debugElement.query(By.css('.breed-img')).nativeElement;
    expect(breedImageElement.src).toContain('http://test.image.url');
    expect(breedImageElement.alt).toBe('Test Breed');
  });
});