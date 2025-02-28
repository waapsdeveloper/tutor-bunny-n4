import {
  Component,
  OnInit,
  Input,
  Injector,
  EventEmitter,
  Output,
  HostListener,
} from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CartService } from 'src/app/services/cart.service';
import { GlobalFavMaterialService } from 'src/app/services/student/global-fav-material.service';
@Component({
  selector: 'app-generic-study-material-card',
  templateUrl: './generic-study-material-card.component.html',
  styleUrls: ['./generic-study-material-card.component.scss'],
})
export class GenericStudyMaterialCardComponent extends BasePage implements OnInit {
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

  favLoading = false;

  @Output() openDetails = new EventEmitter<any>();

  
  hostScreensize = -1;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateColumnClass(event.target.innerWidth);
  }

  updateColumnClass(width: number) {
    this.hostScreensize = width; //<= 1300 ? 'col-md-12' : 'col-md-9';
  }


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

  ngOnInit(): void {
    this.updateColumnClass(window.innerWidth);
  }

  async initialize(data) { 
    console.log(data)
    this.cartService.isItemExist(data.id).subscribe( data => {
      this.itemExistInCart$ = data;
    })

    this.materialFavoriteService.isItemExist('study_material_id', data.id).subscribe( count => {
      this.itemExistInFav$ = count > 0;
    })



    this.rating = data.avg_rating || 0;
    this.total_rating = data.total_rating || 0;
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
    if(this.favLoading == true){
      return
    }
    this.favLoading = true;
    this.itemExistInFav$ = true;
    let user = this.users.getUser();
    this.materialFavoriteService.addFavorites(this.item, user);
    this.favLoading = false;
  }

  async removeToFav() {
    // let showFav = false;
    // this.events.publish('show-fav-dot', showFav);
    if(this.favLoading == true){
      return
    }
    this.favLoading = true;
    this.itemExistInFav$ = false;
    let user = this.users.getUser();
    this.materialFavoriteService.removeFavorites(this.item, user);
    this.favLoading = false;
  }

  async toggleCartItem(){


    if(this.itemExistInCart$ == 0) {

      const flag = await this.utility.presentConfirm('Yes', 'No', 'Add Item to Cart', 'Are you sure you want to add this item to cart?');
      if(!flag) {
        return;
      }

      this.cartService.setItem(this.item);
    }

  }

  getButtonText(){


    if(this.hostScreensize <= 400 ){
      return '';
    }

     return this.itemExistInCart$ > 0 ? 'In Cart' : 'Add to Cart'
  }
}

