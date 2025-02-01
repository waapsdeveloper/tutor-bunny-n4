import {
  Component,
  OnInit,
  Input,
  Injector,
  EventEmitter,
  Output,
} from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-generic-study-material-card',
  templateUrl: './generic-study-material-card.component.html',
  styleUrls: ['./generic-study-material-card.component.scss'],
})
export class GenericStudyMaterialCardComponent extends BasePage {
  private _item: any;

  itemExistInCart$;
  itemExistInFav$;

  teacherImage
  displayName;
  flag;
  user;
  courseId;
  status;
  rating;
  type;
  blocked;
  total_rating;
  loading = false;
  trail = false;
  languageName: any;

  @Output() openDetails = new EventEmitter<any>();

  @Input('item')
  public get item() {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;
    this.initialize(value);
  }

  constructor(
    injector: Injector,
    private cartService: CartService,

    private materialFavoriteService: GlobalFavMaterialService,
    public globalMaterial: GlobalFavMaterialService,
  ) {
    super(injector);
    this.user = this.users.getUser();

  }

  async initialize(data) {

    this.cartService.isItemExist(data.id).subscribe( data => {
      this.itemExistInCart$ = data;
    })

    this.materialFavoriteService.isItemExist('study_material_id', data.id).subscribe( count => {
      this.itemExistInFav$ = count > 0;
    })



    this.rating = data.user.teacher.avg_rating;
    this.total_rating = data.user.teacher.total_rating;
    this.displayName = this.utility.getAmericanName(data.user.name);
    this.flag = this.utility.getFlag(data.user);
    this.status = data.trial ? data.trial.status : null;
    this.teacherImage = data.user.image
    if (data && data.trial) {
      this.blocked = data.trial.status;
    }
    if (data && data.type == 3) {
      this.type = data.type;
    }
  }

  getFlag(data) {
    if (data && data.user.teacher && data.user.teacher.country) {
      const flag = data.user.teacher.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  async goToDetail(item) {
    const params = {
      id: item.id,
      backUrl: '/tabs/student-dashboard',
    };
    this.nav.push('student-study-material-detail', params);
  }

  // async requestTrail(id) {
  //   this.user = this.users.getUser();

  //   let v = (await this.profiles.isProfileCompleted(this.user)) as any;

  //   if (v || v == true) {
  //     let data = await this.modals.present(TrailMessageComponent, {}, '', 0.7);
  //     // return
  //     let send = data.data.send;
  //     if (send == true) {
  //       this.trail = true;
  //       this.globalMaterial.requestTrial(
  //         this.item,
  //         this.user,
  //         data.data.message
  //       );
  //     } else {
  //       return;
  //     }
  //   } else {
  //     let res = await this.modals.present(
  //       StudentWelcomeComponent,
  //       {},
  //       'auto-height-modal',
  //       1,
  //       [0, 1],
  //       false
  //     );
  //     let key = res.data.key;

  //     if (key == 1) {
  //       this.nav.push('/student-profile/student-profile-edit', {
  //         showBack: true,
  //       });
  //     }
  //   }
  // }

  // async presentAlert() {
  //   const flag = await this.utility.presentConfirm(
  //     'OK',
  //     'Cancel',
  //     'Cancel Trial',
  //     'Are you sure to cancel the Trial?'
  //   );

  //   if (flag) {
  //     this.cancelTrail(this.item);
  //   }
  // }

  // async cancelTrail(id) {
  //   this.trail = false;
  //   let user = this.users.getUser();
  //   this.globalMaterial.cancelTrail(this.item, user);
  // }

  async addToFav() {
    // let showFav = true;
    // this.events.publish('show-fav-dot', showFav);
    let user = this.users.getUser();
    this.item.is_liked_by_me = true;
    this.materialFavoriteService.addFavorites(this.item, user);
  }

  async removeToFav() {
    // let showFav = false;
    // this.events.publish('show-fav-dot', showFav);
    let user = this.users.getUser();
    this.item.is_liked_by_me = false;
    this.materialFavoriteService.removeFavorites(this.item, user);
  }

  async toggleCartItem(){

    if(this.itemExistInCart$ == 0) {
      this.cartService.setItem(this.item)
    }

    // else {
    //   this.cartService.setRemove(this.item)
    // }
  }
}import { GlobalFavMaterialService } from 'src/app/services/student/global-fav-material.service';

