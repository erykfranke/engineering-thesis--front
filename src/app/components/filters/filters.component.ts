import {Component, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import * as moment from 'moment';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AppService} from '../../services/app.service';
import {DisabilitiesModel} from '../../models/disabilities.model';
import {MatSelectionList} from '@angular/material/list';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS,} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.sass'],
    providers: [
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'pl'
        },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: MAT_MOMENT_DATE_FORMATS
        },
    ],
})
export class FiltersComponent implements OnInit {

    @Output() filterChangeEmit = new EventEmitter<any>();

    @ViewChild('list', {static: false}) matListOptions: MatSelectionList;
    filtersForm: FormGroup;
    disabilitiesOptions: DisabilitiesModel;
    loading = true;

    constructor(private formBuilder: FormBuilder, private appService: AppService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.appService.getDisabilities().subscribe(disabilities => {
            this.disabilitiesOptions = disabilities;
            this.filtersForm = this.formBuilder.group({
                dateRange: new FormGroup({
                    start: new FormControl(new Date(moment().subtract(30, 'd').format('YYYY-MM-DD'))),
                    end: new FormControl(new Date(moment().format('YYYY-MM-DD')))
                }),
                hourRange: new FormControl({start: 0, end: 24}),
                disabilities: new FormControl(this.disabilitiesOptions.disabilities)
            });
            this.loading = false;
            this.filterChangeEmit.emit();
        });
    }

    dateChangeEmit(): void {
        if (this.filtersForm.value.dateRange.start && this.filtersForm.value.dateRange.end) {
            this.filterChangeEmit.emit();
        }
    }

    hourRangeEmit(): void {
        this.filterChangeEmit.emit();
    }

    selectDisabilitiesChangeEmit(): void {
      this.filtersForm.value.disabilities = this.matListOptions._value;
      this.filterChangeEmit.emit();
    }
}
