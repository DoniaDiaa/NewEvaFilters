import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFilterDetails } from '../models/Filters';
import { FilterDetailsService } from '../Services/filter-details.service';
import { FiltersArray } from '../models/filtersArray';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() filterDetails: FiltersArray ={
    id: 0,
    imageFilterUrl: '',
    statusId: 0,
    originalFileName: ''
  }
  @Output() FilterClicked = new EventEmitter();
  filters:IFilterDetails[]=[];
  constructor(private filter:FilterDetailsService) { }

  ngOnInit(): void {}

  clickFilter(e:Event) {
    this.FilterClicked.emit(e);
  }
}
