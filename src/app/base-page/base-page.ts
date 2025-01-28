import { ChangeDetectorRef, Injector } from "@angular/core";
import { ModalService } from "../services/basic/modal.service";
import { EventsService } from "../services/events.service";
import { NavService } from "../services/nav.service";
import { NetworkService } from "../services/network.service";
import { UsersService } from "../services/users.service";
import { UtilityService } from "../services/utility.service";
import { ProfileService } from "../services/profile.service";
import { ImageService } from "../services/image.service";
import { ActivatedRoute } from "@angular/router";

export abstract class BasePage{

  public network: NetworkService;
  public utility: UtilityService;
  public nav: NavService;
  public events: EventsService;
  public users: UsersService;
  public profiles: ProfileService;
  public imageService: ImageService
  public modals: ModalService;

  public activatedRoute: ActivatedRoute;  // Add ActivatedRoute here
  public dataR: any;  // To store the resolved user data
  public cdr: ChangeDetectorRef

  constructor(injector: Injector) {
    this.users = injector.get(UsersService);
    this.profiles = injector.get(ProfileService);
    this.network = injector.get(NetworkService);
    this.utility = injector.get(UtilityService);
    this.events = injector.get(EventsService);
    this.imageService = injector.get(ImageService);
    this.nav = injector.get(NavService);
    this.modals = injector.get(ModalService);

    this.activatedRoute = injector.get(ActivatedRoute);
    this.cdr = injector.get(ChangeDetectorRef);

  }

  protected loadResolvers() {
    this.activatedRoute.data.subscribe(data => {
      this.dataR = data;  // Access the resolved 'user' data
    });
  }



}
