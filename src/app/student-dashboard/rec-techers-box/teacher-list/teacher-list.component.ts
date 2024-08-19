import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherListComponent extends BasePage implements OnInit {
  private _item: any;

  @Input('item')
  public get item() {
    return this._item;
  };
  public set item(value: any) {
    this._item = value;
    this.displayName = this.utility.getAmericanName(this.item.name);

  }
  subjects;
  displayName;
  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() { 
    
  }

  getFlag() {
    if (this.item && this.item.teacher && this.item.teacher.country) {
      const flag = this.item.teacher.country.iso2;
      return flag.toLowerCase();
    }
    else {
      return ""
    }
  }

  gototecher(email){
    const params ={
      email: email
    }
    this.nav.push('/tabs/teacher-profile', params)
  }
}
