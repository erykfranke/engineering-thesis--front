import {Injectable, Input} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorPaletteService {
    readonly COLORS_PALETTE = ['#FEECD2', '#FDDFB5', '#FDCF99', '#FDBD86', '#FC9D68', '#F77E52', '#ED6044', '#DA3825', '#C2150D', '#A40000'];
    // readonly COLORS_PALETTE = ['#1E60A4', '#3C8ABE', '#7AB6D6', '#BAD9E9', '#E5EEF3', '#F9EAE1', '#F9C7AE', '#EB9072', '#CE5146', '#AA1529'];
    // readonly COLORS_PALETTE = ['#D49DC7', '#C78BBE', '#BF7AB3', '#B569AA', '#AA56A1', '#9C4593', '#903585', '#812675', '#732265', '#641A57'];
    // readonly COLORS_PALETTE = ['#FFF2AC', '#FEE48D', '#FED26F', '#FEB54F', '#FD9A41', '#FC7635', '#F94928', '#E7221E', '#CD0B21', '#AC0026'];

    private _maxValue: number;
    @Input() set maxValue(val: number) {
        this._maxValue = val;
        this.step = this._maxValue / this.COLORS_PALETTE.length;
    }
    get maxValue(): number {
        return this._maxValue;
    }

    public step: number;

    constructor() {
    }

    public getColor(value: number): string {
        const colorIndex = Math.floor((value * 100 / this.maxValue) / (this.COLORS_PALETTE.length + 1));
        return this.COLORS_PALETTE[colorIndex];
    }
}
