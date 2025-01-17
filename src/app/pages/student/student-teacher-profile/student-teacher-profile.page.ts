import { Component, Injector, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-student-teacher-profile',
  templateUrl: './student-teacher-profile.page.html',
  styleUrls: ['./student-teacher-profile.page.scss'],
})
export class StudentTeacherProfilePage extends BasePage implements OnInit {

  loading = false;
  user: any;  

  headerData = {
    image: '',
    displayName: '',
    verifiedOn: '',
    rating: 0,
    totalRating: 0

  }

  infoData = {
    subjects: [],
    languages: [],
    travel_policy: '',
    country: '',
    city: '',
    state: '',
    flag: ''
  };

  countData = {
    years_of_experience: 0,
    course_count: 0,
    notes_count: 0
  };

  aboutData = {
    heading: 'About',
    text: ''
  }

  courseData = {
    heading: 'Courses & Study Notes',    
    list: []
  }

  galleryData = {
    heading: 'Gallery',    
    list: []
  }

  ratingData = {
    heading: 'Reviews',
    list: []
  }






  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    const params = this.nav.getQueryParams();
    if (params['email']) {
      this.initialize(params['email']);      
    }
  }

  async initialize(email) {
    this.loading = true;
    
    let obj = {
      email: email,
    };
    let res = await this.network.getStudentTeacherProfileByEmail(obj);

    console.log(res);
    this.user = res.user;


    this.headerData = {
      image: this.user.image,
      displayName: this.utility.getAmericanName(this.user.name),
      verifiedOn: moment(this.user.verified_on).format('DD-MMM-YYYY'),
      rating: this.user.teacher.avg_rating,
      totalRating: this.user.teacher.total_rating
    }

    this.infoData = {
      subjects: this.user.teacher.subjects,
      languages: this.user.teacher.languages,
      travel_policy: this.user.teacher.travel_policy.name,
      country: this.user.teacher.country.name,
      city: this.user.teacher.city,
      state: this.user.teacher.state.name,
      flag: this.getFlag()
    }

    this.countData = {
      years_of_experience: this.user.teacher.started_teaching,
      course_count: res.course_material.total_courses,
      notes_count: res.course_material.total_material,
    }

    this.aboutData = {
      heading: 'About',
      text: this.user.teacher.description || ''
    }


    this.courseData = {
      heading: 'Courses & Study Notes',
      list: res.course_material.list
    }

    this.galleryData = {
      heading: 'Gallery',
      list: res.gallery
    }

    this.ratingData = {
      heading: 'Reviews',
      list: res.reviews
    }

    this.loading = false;


    //   const verified_on = this.user.verified_on;
    //   this.verified_on = moment(verified_on).format('DD-MMM-YYYY');
    //   this.displayName = this.utility.getAmericanName(this.user.name);
    //   this.country = this.user.teacher.country.name;
    //   this.state = this.user.teacher.state.name;
    //   this.city = this.user.teacher.city;
    //   this.hourly_rate = this.user.teacher.converted_hourly_rate;
    //   this.travel_policy = this.user.teacher.travel_policy.name;
    //   this.language = this.user.teacher.languages;
    //   this.total_rating = this.user.teacher.total_rating;
    //   this.rating = this.user.teacher.avg_rating;
    //   this.status = this.user.teacher.status;

    //   this.subject = this.user.teacher.subjects;
    //   this.experince = this.user.teacher.started_teaching;
    //   // const user = this.users.getUser();
    //   const data = (await this.network.getImage(res.user.id)) as any;
    //   this.images = data.result;
    //   if (this.images.length != 0) {
    //     this.showGellary = true;
    //   }
    // }
    // this.loading = false;
  }

  getFlag() {
    if (this.user && this.user.teacher && this.user.teacher.country) {
      const flag = this.user.teacher.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  clickOpenCourse($event){
    console.log($event)
  }

  

  

}
