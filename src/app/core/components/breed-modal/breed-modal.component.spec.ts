import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedModalComponent } from './breed-modal.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BreedModel } from '../../models/breed.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';

describe('BreedModalComponent', () => {
  let component: BreedModalComponent;
  let fixture: ComponentFixture<BreedModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<BreedModalComponent>>;

  const mockBreed: BreedModel = {
    id: 1,
    name: 'Breed 1',
    temperament: 'Friendly',
    reference_image_id: 'image1',
    weight: { imperial: '10 - 20', metric: '5 - 10' },
    height: { imperial: '15 - 20', metric: '35 - 45' },
    life_span: '10 - 12 years',
    origin: 'Country 1',
    bred_for: 'Hunting',
    breed_group: 'Hound',
    image: {
      url: 'http://example.com/image.jpg'
    }
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        NoopAnimationsModule,
        BreedModalComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockBreed },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display breed name in the title', () => {
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain(mockBreed.name);
  });

  it('should display breed image', () => {
    const imageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imageElement.src).toBe(mockBreed.image.url);
    expect(imageElement.alt).toBe(mockBreed.name);
  });

  it('should display breed origin', () => {
    const originElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(originElement.textContent).toContain(mockBreed.origin);
  });

  it('should display breed life expectancy', () => {
    const lifeSpanElement = fixture.debugElement.query(By.css('p:nth-of-type(2)')).nativeElement;
    expect(lifeSpanElement.textContent).toContain(mockBreed.life_span);
  });

  it('should display breed weight', () => {
    const weightElement = fixture.debugElement.query(By.css('p:nth-of-type(3)')).nativeElement;
    expect(weightElement.textContent).toContain(`${mockBreed.weight.metric} kg`);
  });

  it('should display breed height', () => {
    const heightElement = fixture.debugElement.query(By.css('p:nth-of-type(4)')).nativeElement;
    expect(heightElement.textContent).toContain(`${mockBreed.height.metric} cm`);
  });

  it('should close the dialog when the close button is clicked', () => {
    const closeButton = fixture.debugElement.query(By.css('button')).nativeElement;
    closeButton.click();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});