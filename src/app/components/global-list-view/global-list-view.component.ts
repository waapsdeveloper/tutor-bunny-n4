import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-global-list-view',
  templateUrl: './global-list-view.component.html',
  styleUrls: ['./global-list-view.component.scss'],
})
export class GlobalListViewComponent implements OnInit {  
  
  private _list: any[] = [];

  @Input()
  get list(): any[] {
    return this._list;
  }

  set list(value: any[]) {
    this._list = value;
    console.log(value)
  }
  
  
  @Input() itemTemplate!: TemplateRef<any>;

  @Output() refresh = new EventEmitter<any>();
  @Output() loadMore = new EventEmitter<any>();

  handleRefresh(event: any) {
    this.refresh.emit(event);
  }

  onIonInfinite(event: any) {
    this.loadMore.emit(event);
  }

  ngOnInit(): void {
    console.log("Item template available?", !!this.itemTemplate);
  }
}