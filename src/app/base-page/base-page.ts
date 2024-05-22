import { Injector } from "@angular/core";
import { ModalService } from "../services/basic/modal.service";
import { EventsService } from "../services/events.service";
import { NavService } from "../services/nav.service";
import { NetworkService } from "../services/network.service";
import { UsersService } from "../services/users.service";
import { UtilityService } from "../services/utility.service";
import { ProfileService } from "../services/profile.service";


export abstract class BasePage {

  directionObj = {};

  public network: NetworkService;
  public utility: UtilityService;
  public nav: NavService;
  public events: EventsService;
  public users: UsersService;
  public profiles: ProfileService;
  public modals: ModalService;

  constructor(injector: Injector) {
    this.users = injector.get(UsersService);
    this.profiles = injector.get(ProfileService);
    this.network = injector.get(NetworkService);
    this.utility = injector.get(UtilityService);
    this.events = injector.get(EventsService);
    this.nav = injector.get(NavService);
    this.modals = injector.get(ModalService);
  }

  private hiddenTabs: boolean = false;
  // onScroll(event: CustomEvent) {
  //   console.log(event);

  //   const currentScrollTop = event.detail.scrollTop;

  //   if (currentScrollTop > this.lastScrollTop) {
  //     let obj = {
  //       direction: 'down'
  //     }

  //     this.directionObj = obj;

  //   } else {
  //     let obj = {
  //       direction: 'up'
  //     }
  //     this.directionObj = obj;
  //   }

  //   this.lastScrollTop = currentScrollTop;
  //   // console.log(this.lastScrollTop);

  // }

  onScroll(event) {
    // used a couple of "guards" to prevent unnecessary assignments if scrolling in a direction and the var is set already:
    if (event.detail.deltaY > 0 && this.hiddenTabs) return;
    if (event.detail.deltaY < 0 && !this.hiddenTabs) return;
    if (event.detail.deltaY > 0) {
      console.log("scrolling down, hiding footer...");
      this.hiddenTabs = false;
    } else {
      console.log("scrolling up, revealing footer...");
      this.hiddenTabs = true;
    };
  };

  onScrollEnd(event: CustomEvent) {
    // console.log(event);

    this.events.publish('page-scroll-event', {
      hide: this.hiddenTabs
    })
  }



}
