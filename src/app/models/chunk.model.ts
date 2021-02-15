import {LatLngModel} from './lat-lng.model';

export interface ChunkModel {
    id: number;
    southWest: LatLngModel;
    northEast: LatLngModel;
    count: number;
}
