import {Component, Input, OnInit} from '@angular/core';
import {ColorPaletteService} from '../../services/color-palette.service';

@Component({
    selector: 'app-legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.sass']
})
export class LegendComponent implements OnInit {

    readonly CHUNK_SIZE = 10;
    readonly MAX_ZOOM = 18;

    @Input() maxCount: number;

    private _mapZoom: number;
    @Input() set mapZoom(val: number) {
        if (val) {
            this._mapZoom = val;
            this.chunkSize = Math.pow(2, (this.MAX_ZOOM - this._mapZoom)) * this.CHUNK_SIZE;
        }
    }
    get mapZoom(): number {
        return this._mapZoom;
    }

    chunkSize: number;

    constructor(public colorPaletteService: ColorPaletteService) {
    }

    ngOnInit(): void {
    }

}
