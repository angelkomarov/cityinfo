import { PointOfInterest } from "src/app/point-of-interest/models/point-of-interest.model";

export interface City {
    id?: number;
    name?: string;
    description?: string;
    link?: string;
    pointsOfInterest?: PointOfInterest[];
}
