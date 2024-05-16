import { Injector } from "@angular/core";
import { ModalService } from "../services/basic/modal.service";
import { EventsService } from "../services/events.service";
import { NavService } from "../services/nav.service";
import { NetworkService } from "../services/network.service";
import { UsersService } from "../services/users.service";
import { UtilityService } from "../services/utility.service";


export abstract class BasePage {

  public network: NetworkService;
  public utility: UtilityService;
  public nav: NavService;
  public events: EventsService;
  public users: UsersService;
  public modals: ModalService;

  constructor(injector: Injector) {
    this.users = injector.get(UsersService);
    this.network = injector.get(NetworkService);
    this.utility = injector.get(UtilityService);
    this.events = injector.get(EventsService);
    this.nav = injector.get(NavService);
    this.modals = injector.get(ModalService);
}



}
