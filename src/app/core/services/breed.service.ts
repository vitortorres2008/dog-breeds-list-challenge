import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BreedModel } from '../models/breed.model';
import { ImageDogModel } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class BreedService {
  private apiUrl = environment.api;
  private apiKey = environment.apiKey;
  private http = inject(HttpClient);

  public getBreeds(limit: number, page: number): Observable<BreedModel[]> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());

    return this.http.get<BreedModel[]>(`${this.apiUrl}/breeds`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey
      },
      params: params
    });
  }

  public getBreedImage(id: string): Observable<ImageDogModel> {
    const url = `${this.apiUrl}/images/${id}`;
    return this.http.get<ImageDogModel>(url);
  }
}
