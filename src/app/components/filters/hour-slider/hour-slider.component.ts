import {Component, EventEmitter, forwardRef, OnInit, Output, ViewChild} from '@angular/core';
import {MatSlider, MatSliderChange} from '@angular/material/slider';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-hour-slider',
    templateUrl: './hour-slider.component.html',
    styleUrls: ['./hour-slider.component.sass'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HourSliderComponent),
            multi: true
        }
    ]
})
export class HourSliderComponent implements OnInit, ControlValueAccessor {

    @ViewChild('leftRange', {static: true}) leftRangeSlider: MatSlider;
    @ViewChild('rightRange', {static: true}) rightRangeSlider: MatSlider;

    @Output() hourRangeChanged = new EventEmitter<void>();

    value = {start: 0, end: 24};
    onChange: any = () => {};
    onTouch: any = () => {};

    constructor() {
    }

    ngOnInit(): void {

    }

    rightSliderMoveHandler(event: MatSliderChange): void {
        if (event.value < this.leftRangeSlider.value + 1) {
            event.source.writeValue(this.leftRangeSlider.value + 1);
        }
    }

    leftSliderMoveHandler(event: MatSliderChange): void {
        if (event.value > this.rightRangeSlider.value - 1) {
            event.source.writeValue(this.rightRangeSlider.value - 1);
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    writeValue(val: any): void {
        if (val) {
            this.value = val;
        }
    }
}
