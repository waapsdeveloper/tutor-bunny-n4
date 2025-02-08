import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDashboardPageRoutingModule } from './student-dashboard-routing.module';

import { StudentDashboardPage } from './student-dashboard.page';
import { ProfileSearchBoxModule } from './profile-search-box/profile-search-box.module';
import { RecTeachersModule } from './rec-teachers/rec-teachers.module';
import { SearchBoxModule } from './search-box/search-box.module';
import { RecTechersBoxModule } from './rec-techers-box/rec-techers-box.module';
import { StudentWelcomeModule } from './student-welcome/student-welcome.module';
import { HeaderCartButtonComponent } from './header-cart-button/header-cart-button.component';
import { HeaderFavButtonComponent } from './header-fav-button/header-fav-button.component';
import { HeaderNotificationButtonComponent } from './header-notification-button/header-notification-button.component';
import { HeaderProfileIconComponent } from './header-profile-icon/header-profile-icon.component';
import { SwiperModule } from 'swiper/angular';
import { StudentDashboardStudyMaterialPageModule } from "./student-dashboard-study-material/student-dashboard-study-material.module";
import { StudentDashboradCoursesPageModule } from './student-dashborad-courses/student-dashborad-courses.module';
import { StudentDashboradTeachersPageModule } from './student-dashborad-teachers/student-dashborad-teachers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDashboardPageRoutingModule,
    ProfileSearchBoxModule,
    RecTeachersModule,
    SearchBoxModule,
    RecTechersBoxModule,
    StudentWelcomeModule,
    SwiperModule,

    // pages import
    StudentDashboardStudyMaterialPageModule,
    StudentDashboradCoursesPageModule,
    StudentDashboradTeachersPageModule
],
  declarations: [StudentDashboardPage, HeaderProfileIconComponent, HeaderCartButtonComponent, HeaderFavButtonComponent, HeaderNotificationButtonComponent]
})
export class StudentDashboardPageModule { }
