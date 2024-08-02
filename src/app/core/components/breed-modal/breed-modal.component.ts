import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { BreedModel } from '../../models/breed.model';

@Component({
  selector: 'app-breed-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './breed-modal.component.html',
  styleUrl: './breed-modal.component.sass'
})
export class BreedModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: BreedModel) { }
}
