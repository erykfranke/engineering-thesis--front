import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MapPositionModel} from '../models/map-position.model';
import {ServerChunksResponseModel} from '../models/server-chunks-response.model';
import {FilterModel} from '../models/filter.model';
import {DisabilitiesModel} from '../models/disabilities.model';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) {
    }

    getChunks(mapPosition: MapPositionModel, filterOptions: FilterModel): Observable<ServerChunksResponseModel> {
        return this.http.get<ServerChunksResponseModel>(
            `${environment.heatmap_api_url}chunks?northEastLat=${mapPosition.bounds.getNorthEast().lat}`
                   + `&northEastLng=${mapPosition.bounds.getNorthEast().lng}`
                   + `&southWestLat=${mapPosition.bounds.getSouthWest().lat}`
                   + `&southWestLng=${mapPosition.bounds.getSouthWest().lng}`
                   + `&hourRange=${filterOptions.hourRange.start},${filterOptions.hourRange.end}`
                   + `&dateRange=${filterOptions.dateRange.start.getTime()},${filterOptions.dateRange.end.getTime()}`
                   + `&disabilities=${filterOptions.disabilities.map(disability => disability.id).join(',')}`
                   + `&zoom=${mapPosition.zoom}`
        );
    }

    getDisabilities(): Observable<DisabilitiesModel> {
        return this.http.get<DisabilitiesModel>(`${environment.global_api_url}/api/disability`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer xuyR6D1kgai15WstR01CwyBljcZt1J4StGsNMeoU',
                'Accept': 'application/json'
            }
        });
    }
}
