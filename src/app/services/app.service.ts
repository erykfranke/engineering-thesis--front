import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChunkModel} from '../models/chunk.model';
import * as L from 'leaflet';
import {MapPositionModel} from '../models/map-position.model';
import {map} from 'rxjs/operators';
import {ServerChunksResponseModel} from '../models/server-chunks-response.model';
import {FilterModel} from '../models/filter.model';
import {DisabilitiesModel} from '../models/disabilities.model';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) {
    }

    getChunks(mapPosition: MapPositionModel, filterOptions: FilterModel): Observable<ServerChunksResponseModel> {
        return this.http.get<ServerChunksResponseModel>(
            `http://localhost:3000/?northEastLat=${mapPosition.bounds.getNorthEast().lat}`
                   + `&northEastLng=${mapPosition.bounds.getNorthEast().lng}`
                   + `&southWestLat=${mapPosition.bounds.getSouthWest().lat}`
                   + `&southWestLng=${mapPosition.bounds.getSouthWest().lng}`
                   + `&hourRange=${filterOptions.hourRange.start},${filterOptions.hourRange.end}`
                   + `&dateRange=${filterOptions.dateRange.start.getTime()},${filterOptions.dateRange.end.getTime()}`
                   + `&disabilities=${filterOptions.disabilities.map(disability => disability.id).join(',')}`
                   + `&zoom=${mapPosition.zoom}`
        );
    }

    addChunk(lat: number, lng: number, timestamp: number, userType: string): Observable<void> {
        return this.http.post<void>('http://localhost:3000/add', {lat, lng, timestamp, userType});
    }

    getDisabilities(): Observable<DisabilitiesModel> {
        return this.http.get<DisabilitiesModel>('http://server437671.nazwa.pl/api/disability', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer xuyR6D1kgai15WstR01CwyBljcZt1J4StGsNMeoU',
                'Accept': 'application/json'
            }
        });
    }
}
