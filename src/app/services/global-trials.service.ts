import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';
import { EventsService } from './events.service';
import Pusher from 'pusher-js';
import { GlobalCoursesService } from './global-courses.service';



@Injectable({
  providedIn: 'root',
})
export class GlobalTrialsService {

  user: any;
  page = 1;
  last_page = -1;
  status;
  list: any[] = [];
  courseId: any;
  pendingTrialPage = 1;
  pendingTrialLastPage = -1;
  pendingTrials: any[] = [];
  trialChannel: any;
  private pusher: Pusher;

  constructor(
    private users: UsersService,
    private network: NetworkService,
    private events: EventsService,
    private GlobalCourses: GlobalCoursesService
  ) {

    this.events.subscribe(
      'clear-all-services-data',
      () => {
        this.user = null;
        this.page = null;
        this.last_page = null;
        this.status = null;
        this.courseId = null;
        this.pendingTrialPage = null;
        this.pendingTrialLastPage = null;

      },
      false
    );

    const options = {
      cluster: 'ap2',
      forceTLS: true,
    };
    this.pusher = new Pusher('a45efbe1a2e731b6dbfb', options);
    this.trialChannel = this.pusher.subscribe('trials-channel');
  }

  unRegisterPusherEvent(){
    let user = this.users.getUser() as any;

    if (this.pusher) {
      this.pusher.unsubscribe('trials-channel');
      this.pusher.disconnect();
    }
    this.trialChannel.unbind('trials-rec-' + user.id);

    this.events.unsubscribe('trail-received-via-pusher');
  }

  registerPusherEvent() {
    let user = this.users.getUser() as any;

    this.trialChannel.bind(
      'trials-rec-' + user.id,
      this.trialsChannelReceived.bind(this)
    );
  }

  async trialsChannelReceived($event: any) {
    console.log($event);
    this.events.publish('trail-received-via-pusher', $event);

    if ($event) {
      if ($event.slug) {
        let trialId = $event.trial_id;
        this.removeFromListAndPendingTrials(trialId);
        this.GlobalCourses.getCoursesFromApi();
        this.events.publish('get-dashboard-stats');
        this.events.publish('update-notifications');
      } else {
        let id = $event.trial_id;
        let res = await this.network.geTrailRequestsByPusher(id);
        this.updateTrailsList(res.trial);
        this.events.publish('update-notifications');
        if (this.user.role_id == 3) {
          let shownoti = true;
          this.user = this.users.getUser();
          console.log(this.user);

          this.events.publish('show-noti-dot', shownoti);
        }
        this.events.publish('get-dashboard-stats');
      }
    }
  }

  removeFromListAndPendingTrials(trialId: any) {
    // Remove from list
    const listIndex = this.list.findIndex((x) => x.id == trialId);
    if (listIndex > -1) {
      this.list.splice(listIndex, 1);
    }

    // Remove from pendingTrials
    const pendingIndex = this.pendingTrials.findIndex((x) => x.id == trialId);
    if (pendingIndex > -1) {
      this.pendingTrials.splice(pendingIndex, 1);
    }
  }

  async updateTrailsList(data: any) {
    const trialObj = Object.assign({}, data);

    const index = this.list.findIndex((x) => x.id == trialObj.id);

    if (index != -1) {
      this.list[index] = trialObj;
    } else {
      this.list = [trialObj, ...this.list];
    }
    console.log(this.list, "bdfgdgfdgdfgdfgfdg");

    const indexp = this.pendingTrials.findIndex((x) => x.id == trialObj.id);

    if (indexp != -1) {
      if (trialObj.status == 'Pending') {
        this.pendingTrials[indexp] = trialObj;
      } else {
        this.pendingTrials.splice(indexp, 1);
      }
    } else {
      if (trialObj.status == 'Pending') {
        this.pendingTrials = [trialObj, ...this.pendingTrials];
      }
    }
  }

  getPendingTrialsFromApi(search = '', page = 1) {
    return new Promise(async (resolve) => {
      this.user = this.users.getUser();
      let obj = {
        search: search,
        page: page,
        teacher_id: this.user.id,
      };
      let res = await this.network.getPendingTrial(this.user.id, obj);
      console.log(res, 'trials');

      const data = res.result;
      this.pendingTrialPage = data.current_page;
      this.pendingTrialLastPage = data.last_page;
      if (page === 1) {
        this.pendingTrials = data.data;
      } else {
        this.pendingTrials = [...this.pendingTrials, ...data.data];
      }
      resolve(true);
    });
  }

  getPendingTrials() {
    return new Promise(async (resolve) => {
      if (this.pendingTrials.length > 0) {
        resolve(this.pendingTrials);
        return;
      }
      this.user = this.users.getUser();
      let obj = {
        teacher_id: this.user.id,
      };
      let res = await this.network.getPendingTrial(this.user.id, obj);
      this.pendingTrials = res.trials;
    });
  }

  removeFromPendingTrials(obj) {
    const index = this.pendingTrials.findIndex((x) => x.id == obj.id);
    if (index > -1) {
      this.pendingTrials.splice(index, 1);
    } else {
    }
  }

  async getTrials(search = '', page = 1) {
    return new Promise(async (resolve) => {
      this.user = this.users.getUser();

      let obj = {
        search: search,
        page: page,
      };

      if (this.status) {
        obj['status'] = this.status;
      }

      const res = await this.network.geTrailRequests(obj, this.user.id);
      const result = res.result;
      this.page = result.current_page;
      this.last_page = result.last_page;
      if (this.page == 1) {
        this.list = result['data'];
      } else {
        this.list = [...this.list, ...result['data']];
      }
    console.log(this.list, "bdfgdgfdgdfgdfgfdg");


      resolve(true);
    });

    // this.list = res.trials;
  }

  async changeStatus(obj, trialId) {
    let res = await this.network.changeTrailStuts(obj, trialId);
    if (res.status === 200) {
      let findIndex = this.list.findIndex((x) => x.id == trialId);

      if (findIndex != -1) {
        this.events.publish('update-trail-list');
        this.list[findIndex] = res.trial;
      }
    }
  }
}
