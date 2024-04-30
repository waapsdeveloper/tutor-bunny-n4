import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-profile-box',
  templateUrl: './profile-box.component.html',
  styleUrls: ['./profile-box.component.scss'],
})
export class ProfileBoxComponent implements OnInit {
  skills: any[] = ['Guitar', 'Violen', 'Piano', 'Drums'];
  languages: any[] = ['English', 'Hindi'];
  constructor(private nav: NavService) {}

  ngOnInit() {}

  openEditProfile() {
    this.nav.push('/teacher-profile/teacher-profile-edit');
  }
}
