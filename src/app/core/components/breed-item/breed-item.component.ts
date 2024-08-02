import { Component, Input } from '@angular/core';
import { BreedModel } from '../../models/breed.model';

@Component({
  selector: 'app-breed-item',
  standalone: true,
  imports: [],
  templateUrl: './breed-item.component.html',
  styleUrl: './breed-item.component.sass'
})
export class BreedItemComponent {
  @Input() breed!: BreedModel;
}
