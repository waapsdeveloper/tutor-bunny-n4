import { Injector } from "@angular/core";
import { ModalService } from "../services/basic/modal.service";
import { EventsService } from "../services/events.service";
import { NavService } from "../services/nav.service";
import { NetworkService } from "../services/network.service";
import { UsersService } from "../services/users.service";
import { UtilityService } from "../services/utility.service";
import { ProfileService } from "../services/profile.service";

function debounce(func, wait) {
  let timeout;

  function debounced(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  }

  debounced.cancel = function() {
    clearTimeout(timeout);
  };

  return debounced;
}

export abstract class BasePage {

  private previousScrollPosition: number = 0;
  private hiddenTabs: boolean = false;

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

  debouncedScrollHandler = debounce((event) => {

    console.log(event);
    let startY = event.detail.startY;
    let currentY = event.detail.currentY;

    const currentScrollPosition = event.target.scrollTop;
    const totalScrollHeight = event.target.scrollHeight;
    const visibleHeight = event.target.clientHeight;

    // Calculate if scroll reached the end
    const isAtBottom = currentScrollPosition == totalScrollHeight - visibleHeight;
    console.log(isAtBottom, currentScrollPosition, totalScrollHeight - visibleHeight)
    // if(currentY < clientHeight){
      if(startY > currentY){
        this.hiddenTabs = false;
      }

      if(startY < currentY){
        this.hiddenTabs = true;
      }
    // }

    // // const currentScrollPosition = event.detail.scrollTop;

    // // if (currentScrollPosition > this.previousScrollPosition) {
    // //   // Scrolling down
    // //   if (!this.hiddenTabs) {
    // //     console.log("scrolling down, hiding footer...");
    // //     this.hiddenTabs = true;
    // //   }
    // // } else if (currentScrollPosition < this.previousScrollPosition) {
    // //   // Scrolling up
    // //   if (this.hiddenTabs) {
    // //     console.log("scrolling up, revealing footer...");
    // //     this.hiddenTabs = false;
    // //   }
    // // }

    // // console.log(event);
    // // const scrollElement = event.target as HTMLElement;
    // // const isAtBottom = scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight;
    // // console.log(isAtBottom, scrollElement.scrollHeight, scrollElement.scrollTop , scrollElement.clientHeight)
    // // if(isAtBottom){
    // //   this.hiddenTabs = true;
    // // }

    // // Update the previous scroll position
    // this.previousScrollPosition = currentScrollPosition;
  }, 100); // Adjust debounce time as needed


  // onScroll(event: any) {

  //   this.debouncedScrollHandler(event);
  // }

  onScrollEnd($event) {
    // console.log($event);

    // Cancel the debounce timer
    this.debouncedScrollHandler.cancel();

    // Ensure the scroll position is at the end

    // Synchronize the hiddenTabs state based on the final scroll position
    // if (isAtBottom) {
    //   if (!this.hiddenTabs) {
    //     this.hiddenTabs = true;
    //     console.log("Scroll ended at the bottom, hiding footer...");
    //   }
    // } else {
    //   if (this.hiddenTabs) {
    //     this.hiddenTabs = false;
    //     console.log("Scroll ended above the bottom, revealing footer...");
    //   }
    // }

    // Publish event
    this.events.publish('page-scroll-event', {
      hide: this.hiddenTabs
    });
  }



}
