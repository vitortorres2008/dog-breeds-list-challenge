import { Component, inject, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { BreedService } from '../../core/services/breed.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BreedItemComponent } from '../../core/components/breed-item/breed-item.component';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../core/signals/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { BreedModalComponent } from '../../core/components/breed-modal/breed-modal.component';
import { BreedModel } from '../../core/models/breed.model';

@Component({
  selector: 'app-breed-list',
  standalone: true,
  imports: [MatPaginatorModule, BreedItemComponent, CommonModule],
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.sass']
})
export class BreedListComponent implements OnInit {
  public pageIndex = 0;
  public pageSize = 10;
  public total = 172;
  public breeds$!: Observable<BreedModel[]>;
  private breedService = inject(BreedService);
  private loaderService = inject(LoaderService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getBreeds();
  }

  private getBreeds(): void {
    this.loaderService.isLoading.set(true);
    this.breeds$ = this.breedService.getBreeds(this.pageSize, this.pageIndex)
      .pipe(
        switchMap(breeds => {
          const breedRequests = breeds.map(breed => {
            if (breed.reference_image_id) {
              return this.breedService.getBreedImage(breed.reference_image_id).pipe(
                map(image => ({
                  ...breed,
                  image: {
                    url: image.url
                  }
                }))
              );
            }
            return of(breed);
          });
          return forkJoin(breedRequests);
        }),
        finalize(() => this.loaderService.isLoading.set(false))
      );
  }

  public openDialog(breed: BreedModel): void {
    this.dialog.open(BreedModalComponent, {
      width: '60vw',
      height: '600px',
      data: breed
    });
  }

  public handlePage(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getBreeds();
  }
}