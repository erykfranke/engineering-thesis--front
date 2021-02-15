import {Component, ViewChild} from '@angular/core';
import {AppService} from './services/app.service';
import {MapComponent} from './components/map/map.component';
import {ColorPaletteService} from './services/color-palette.service';
import {FiltersComponent} from './components/filters/filters.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
})
export class AppComponent {

    @ViewChild('map', {static: true}) map: MapComponent;
    @ViewChild('filters', {static: true}) filters: FiltersComponent;

    constructor(private appService: AppService, private colorPaletteService: ColorPaletteService) {
    }

    getChunks(): void {
        console.log('🎍🎍🎍', this.filters.filtersForm.value);
        this.appService.getChunks(this.map.getMapPosition(), this.filters.filtersForm.value).subscribe( (chunks) => {
            this.colorPaletteService.maxValue = chunks.maxCount;
            this.map.chunks = chunks.chunks;
        });
        return;
    }

}
