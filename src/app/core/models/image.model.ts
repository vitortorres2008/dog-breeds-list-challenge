import { BreedModel } from "./breed.model";

export interface ImageDogModel {
    id: string;
    url: string;
    breeds: BreedModel[];
    width: number;
    height: number;
}

export interface ImageUrlModel {
    url: string
}