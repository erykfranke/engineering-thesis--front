import {Component, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {MatDateRangePicker} from '@angular/material/datepicker';
import * as moment from 'moment';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AppService} from '../../services/app.service';
import {DisabilitiesModel} from '../../models/disabilities.model';
import {MatSelectionList} from '@angular/material/list';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.sass']
})
export class FiltersComponent implements OnInit {

    @Output() filterChangeEmit = new EventEmitter<any>();

    @ViewChild('list', {static: true}) matListOptions: MatSelectionList;
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
                    start: new FormControl({value: new Date()}),
                    end: new FormControl({value: new Date()})
                }),
                hourRange: new FormControl({start: 0, end: 24}),
            });
            this.filtersForm.value['disabilities'] = this.disabilitiesOptions.disabilities;
            this.loading = false;
        });
    }

    dateChangeEmit(): void {
        if (this.filtersForm.value.dateRange.start && this.filtersForm.value.dateRange.end) {
            this.filtersForm.value['disabilities'] = this.matListOptions._value;
            this.filterChangeEmit.emit();
        }
    }

    hourRangeEmit(): void {
        this.filtersForm.value['disabilities'] = this.matListOptions._value;
        this.filterChangeEmit.emit();
    }

    selectDisabilitiesChangeEmit(): void {
      this.filtersForm.value['disabilities'] = this.matListOptions._value;
      this.filterChangeEmit.emit();
    }
}
