import { ImageUrlModel } from "./image.model";
import { MetricModel } from "./metric.model";

export interface BreedModel {
    weight: MetricModel;
    height: MetricModel;
    id: number;
    name: string;
    bred_for: string;
    breed_group: string;
    life_span: string;
    temperament: string;
    origin: string;
    reference_image_id: string;
    image: ImageUrlModel;
}