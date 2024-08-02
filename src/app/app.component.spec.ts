import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoaderService } from './core/signals/loader.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loaderService: LoaderService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatProgressSpinnerModule,
        AppComponent
      ],
      providers: [{ provide: Router, useValue: mockRouter }, LoaderService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the toolbar', () => {
    const toolbarElement = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbarElement).toBeTruthy();
    expect(toolbarElement.nativeElement.textContent).toContain('Dog Breeds');
  });

  it('should display the loading spinner when isLoading is true', () => {
    loaderService.isLoading.set(true);
    fixture.detectChanges();

    const spinnerElement = fixture.debugElement.query(By.css('.loading-spinner mat-spinner'));
    expect(spinnerElement).toBeTruthy();
  });

  it('should not display the loading spinner when isLoading is false', () => {
    loaderService.isLoading.set(false);
    fixture.detectChanges();

    const spinnerElement = fixture.debugElement.query(By.css('.loading-spinner mat-spinner'));
    expect(spinnerElement).toBeFalsy();
  });
});