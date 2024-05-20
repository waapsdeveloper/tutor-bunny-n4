import { Injector } from "@angular/core";
import { ModalService } from "../services/basic/modal.service";
import { EventsService } from "../services/events.service";
import { NavService } from "../services/nav.service";
import { NetworkService } from "../services/network.service";
import { UsersService } from "../services/users.service";
import { UtilityService } from "../services/utility.service";
import { ProfileService } from "../services/profile.service";


export abstract class BasePage {

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

  private lastScrollTop: number = 0;
  onScroll(event: CustomEvent) {
    const currentScrollTop = event.detail.scrollTop;

    if (currentScrollTop > this.lastScrollTop) {
      console.log('Scrolled downwards');
      // Handle downward scroll event
      let obj = {
        direction: 'down'
      }
      this.events.publish('page-scroll-event', obj)

    } else {
      console.log('Scrolled upwards or no scroll change');
      // Handle upward scroll event or no change
      let obj = {
        direction: 'up'
      }
      this.events.publish('page-scroll-event', obj)

      

    }

    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  }



}
