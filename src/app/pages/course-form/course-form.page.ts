import {
  Component,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IonContent, ViewWillEnter } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateCourseService } from 'src/app/services/create-course.service';
import { SwiperComponent } from 'swiper/angular';
@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.page.html',
  styleUrls: ['./course-form.page.scss'],
})
export class CourseFormPage
  extends BasePage
  implements OnInit, ViewWillEnter {

  @ViewChild('slides', { static: false }) slides: SwiperComponent | null = null;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  params;
  backUrl;
  lang;
  showBack;
  title;
  type;
  category;
  user;
  image;
  onlineMode;
  age;
  loading = false;
  language_id;
  sameCourseEdit = false;
  courseId;
  edit = false;
  step = 1;
  currency;

  constructor(
    injector: Injector,
    public createCourseService: CreateCourseService
  ) {
    super(injector);

    this.initialize();
    this.user = this.users.getUser();
    if (this.user.teacher.country.currency_symbol) {
      this.currency = this.user?.teacher?.country?.currency_symbol;
    }
    else {
      this.currency = '$'
    }
  }

  ngOnInit() { }


  async initialize() { }

  async ionViewWillEnter() {

    this.params = this.nav.getQueryParams();
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }
    if (this.params.title) {
      this.title = this.params.title;
    }
    if (this.params.showBack) {
      this.showBack = this.params.showBack;
    }
    if (this.params.edit) {
      this.edit = this.params.edit;
    }
    if (this.params.type) {
      this.type = this.params.type;
      localStorage.setItem('courseType', this.type);
    }
    if (this.params.course_Id) {
      this.courseId = this.params.course_Id;
      localStorage.setItem('courseId', this.courseId);

      let res = (await this.network.getcourseById(this.courseId)) as any;
      this.setFormDta(res.course);

      // course images patch
      this.createCourseService.courseId = this.courseId;
      this.createCourseService.getCourseImages();
    }
  }

  setFormDta(data) {
    this.createCourseService.setFormData(data);
    const lang = data['language'];
    if (lang) {
      this.language_id = lang.id;
    }
    this.events.publish('set-mode-and-capacity', data);
    this.events.publish('set-from-and-to-age', data);
    this.events.publish('set-form-course-image', data);
  }

  result(value, key) {
    this.createCourseService.formData[key] = value;
    if (key == 'category') {
      this.edit = true;
      this.sameCourseEdit = true;
      this.category = value.id;
      this.createCourseService.formData['category_id'] = value.id;
      this.createCourseService.formData['category'] = value;
    }
    if (key == 'mode_type') {
      this.onlineMode = value.mode;
      this.createCourseService.formData['mode_type'] = value.mode;
      this.createCourseService.formData['capacity'] = value.capacity;
    }
    if (key == 'age') {
      this.age = value.mode;
      this.createCourseService.formData['from_age'] = value.from_age;
      this.createCourseService.formData['to_age'] = value.to_age;
    }
    if (key == 'dates') {
      this.age = value.mode;
      this.createCourseService.formData['start_date'] = value.start_date;
      this.createCourseService.formData['end_date'] = value.end_date;
    }
    if (key == 'image') {
      this.createCourseService.formData['image'] = value.image;
    } else if (key == 'language') {
      this.lang = value;

      this.createCourseService.formData['language'] = value;
      this.createCourseService.formData['language_id'] = this.lang.id;
    }
  }

  async onSlideChange() {
    this.events.publish(
      'teacher-course-first-screen-submit-call',
      this.createCourseService.formData
    );
    const f = this.createCourseService.formData;
    if (
      !f.title ||
      !f.description ||
      !f.image ||
      !f.language ||
      !f.from_age ||
      !f.to_age
    ) {
      return;
    }
    if (f.language.length == 0) {
      return;
    }
    if (f.mode_type.length == 0) {
      return;
    }
    if (f.description.length <= 250) {
      return;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    f['user_id'] = user.id;
    f['type'] = this.type;
    this.loading = true;
    const res = !this.edit
      ? await this.network.SubmitCourse(f)
      : await this.network.SubmitCourseEdit(f, this.courseId);

    let courseId = res.course.id;
    this.createCourseService.courseId = courseId;
    if (courseId) {
      let obj = {
        course_id: courseId,
        image: this.createCourseService.formData.image,
      };
      if (!this.createCourseService.formData.image.includes('https')) {
        let image = await this.network.postCoursePhoto(obj);
      }

      this.createCourseService.sendPendingImages(courseId);
    }
    localStorage.setItem('course_Id', courseId);
    this.loading = false;
    if (res) {
      this.slides?.swiperRef?.slideTo(1, 300, false);
      this.step = 2;
      this.events.publish(
        'set-form-course-category',
        this.createCourseService.formData
      );
      this.events.publish('set-form-keywords-list', res.course.keywords);
      this.content.scrollToTop(500); // 500ms animation duration
    }
  }

  async changeToPrev() {
    if (this.step == 2) {
      this.step = 1;
      this.slides?.swiperRef?.slideTo(0, 300, false);
    }
  }

  async submit() {
    this.events.publish(
      'teacher-course-second-screen-submit-call',
      this.createCourseService.formData
    );
    let f = this.createCourseService.formData;
    if (!f.category || !f.price || !f.duration || !f.lesson || !f.keyword) {
      return;
    }
    if (f.keyword.length == 0) {
      return;
    }
    const course_id = this.createCourseService.courseId;
    if (f.category && f.category.id) {
      f.category_id = f.category.id;
    }
    this.loading = true;

    const res = await this.network.SubmitSecondCourse(f, course_id);
    if (res && res.message) {
      if (this.edit && this.sameCourseEdit) {
        this.utility.presentSuccessToast("Course Saved Successfully ");
      } else {
        this.utility.presentSuccessToast("Course Saved Successfully");
      }
    }

    // if (res && res.message) {
    //   this.loading = false;

    //   const message = !this.edit
    //     ? 'Course created successfully'
    //     : 'Course Updated Successfully';
    //   this.utility.presentSuccessToast(message);
    // }
    this.createCourseService.resetFormData()
    this.nav.pop('/tabs/courses');
    this.events.publish('initilize-the-list', res);
  }

  shouldHandleBackToPrevScreen(event) {

    this.sameCourseEdit = event;
    if (this.step == 2) {
      this.step = 1;
      this.edit = true;
      this.courseId = this.createCourseService.courseId;
      this.slides?.swiperRef?.slideTo(0, 300, false);
    }

  }

  openCoursePhotos() {
    this.nav.push('/course-photoss', {
      backUrl: '/course-form',
      gallary: 'true',
      title: 'Upload Course photos',
    });
  }


}
