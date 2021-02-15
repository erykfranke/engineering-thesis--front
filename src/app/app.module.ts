import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {AppComponent} from './app.component';
import {MapComponent} from './components/map/map.component';
import {LegendComponent} from './components/legend/legend.component';
import {FiltersComponent} from './components/filters/filters.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMatRangeSliderModule} from 'ngx-mat-range-slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {HourSliderComponent} from './components/filters/hour-slider/hour-slider.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {MatListModule} from '@angular/material/list';

@NgModule({
    declarations: [
        AppComponent,
        MapComponent,
        LegendComponent,
        FiltersComponent,
        HourSliderComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        NgxMatRangeSliderModule,
        MatCheckboxModule,
        MatSliderModule,
        NgxDaterangepickerMd.forRoot(),
        MatListModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
