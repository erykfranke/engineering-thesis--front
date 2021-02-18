import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {MapPositionModel} from '../../models/map-position.model';
import {ChunkModel} from '../../models/chunk.model';
import {ColorPaletteService} from '../../services/color-palette.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.sass']
})
export class MapComponent implements AfterViewInit {

    @ViewChild('mapContainer', {static: true}) mapContainer: ElementRef;
    @Output() mapMovedEmit = new EventEmitter<void>();

    private _chunks: ChunkModel[];
    set chunks(val: ChunkModel[]) {
        this._chunks = val;
        this.drawChunks();
    }
    get chunks(): ChunkModel[] {
        return this._chunks;
    }

    private map: L.Map;
    private chunksGroup: L.LayerGroup;

    constructor(private colorPaletteService: ColorPaletteService) {
    }

    ngAfterViewInit(): void {
        this.initMap();
    }

    public getMapPosition(): MapPositionModel {
        return {
            bounds: this.map?.getBounds(),
            zoom: this.map?.getZoom()
        };
    }

    private initMap(): void {
        this.map = L.map(this.mapContainer.nativeElement).setView([51.776685, 19.488966], 18);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        this.map.on('moveend', () => this.mapMovedEmit.emit());
    }


    private drawChunks(): void {
        this.chunksGroup?.clearLayers();
        const chunksMapGroup = [];
        for (const chunk of this.chunks) {
            chunksMapGroup.push(this.createChunk(chunk));
        }
        this.chunksGroup = L.layerGroup(chunksMapGroup);
        console.log(this.chunksGroup);
        this.map.addLayer(this.chunksGroup);
    }

    private createChunk(chunk: ChunkModel): L.Rectangle {
        const color = this.colorPaletteService.getColor(chunk.count);
        const rectangle = L.rectangle(
            L.latLngBounds(L.latLng(chunk.southWest.lat, chunk.southWest.lng), L.latLng(chunk.northEast.lat, chunk.northEast.lng)),
            {color, fillOpacity: .75, stroke: false}
        );
        rectangle.bindPopup(`Średnia liczba wystąpień: ${chunk.count}`);
        return rectangle;
    }
}
