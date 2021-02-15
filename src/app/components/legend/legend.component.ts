import {Component, Input, OnInit} from '@angular/core';
import {ColorPaletteService} from '../../services/color-palette.service';

@Component({
    selector: 'app-legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.sass']
})
export class LegendComponent implements OnInit {

    @Input() maxCount: number;


    constructor(public colorPaletteService: ColorPaletteService) {
    }

    ngOnInit(): void {
    }

}
