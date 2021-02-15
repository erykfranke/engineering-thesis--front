import * as L from 'leaflet';

export interface MapPositionModel {
    bounds: L.LatLngBounds;
    zoom: number;
}
