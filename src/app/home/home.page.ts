import { Component } from '@angular/core';
import { NavService } from '../services/nav.service';
import { AuthenticationService } from '../services/authentication.service';
import { ViewWillEnter } from '@ionic/angular';
import { ModalService } from '../services/basic/modal.service';
import { FakeAccountsComponent } from './fake-accounts/fake-accounts.component';
import { ProfileService } from '../services/profile.service';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewWillEnter {
  loading = false;
  googleauth;
  user;
  constructor(
    private nav: NavService,
    public authService: AuthenticationService,
    private modals: ModalService,
    private profiles: ProfileService,
    private network: NetworkService
  ) { }

  ionViewWillEnter(): void {
  }


  gotoDashboard() {
    this.nav.push('tabs');
  }
  async continueWithGoogle() {
    this.googleauth = await this.authService.googleAuth();
    console.log(this.googleauth.user.providerData[0].displayName);
    
    if (this.googleauth && this.googleauth.user && this.googleauth.user.providerData) {
      let key = localStorage.getItem('role');
      console.log(key);
      
      const data = {
        name: this.googleauth.user.displayName,
        email: this.googleauth.user.email,
        password: this.googleauth.credential.accessToken,
        login_type: this.googleauth.user.providerData[0].providerId,
        role_id: key,
        image: this.googleauth.user.photoUrl
      }
      console.log(data);
      this.user = await this.network.login(data) as any[];
      console.log(this.user);
      let user = this.user.user;
      localStorage.setItem("user", JSON.stringify(user));
      const profile = await this.profiles.isProfileCompleted(user);
      console.log(profile);
      let roleId = parseInt(user.role_id);
      // return
      if (!profile) {
        if (roleId == 2) {
          console.log("fgdgfgd");
          
          this.nav.push('/student-profile/student-profile-edit', {
            backUrl: '/home',
          });
        }
        if (roleId == 3) {
          console.log("fgdioueoruouwerogfgd");

          this.nav.push('/teacher-profile/teacher-profile-edit', {
            backUrl: '/home',
          });
        }
       
      } else {
        
        if (roleId == 2) {
          console.log("5656");

          this.nav.push('/tabs/student-dashboard', {
            backUrl: '/home',
          });
        }
        if (roleId == 3) {
          console.log("5656323232326666");

          this.nav.push('/tabs/teacher-dashboard', {
            backUrl: '/home',
          });
        }
      }
    }
  }

  async continueWithFake() {
    const res = await this.modals.present(FakeAccountsComponent, {}, '', 0.5);
    console.log(res);
    if (res.data) {
      let user = res.data;
      const isf = await this.profiles.isProfileCompleted(user);

      if (!isf) {
        if (parseInt(user.role_id) == 2) {
          this.nav.push('/student-profile/student-profile-edit', {
            backUrl: '/home',
          });
        }
        if (parseInt(user.role_id) == 3) {
          this.nav.push('/teacher-profile/teacher-profile-edit', {
            backUrl: '/home',
          });
        }
      } else {

        if (parseInt(user.role_id) == 2) {
          this.nav.push('/tabs/student-dashboard', {
            backUrl: '/home',
          });
        }
        if (parseInt(user.role_id) == 3) {
          this.nav.push('/tabs/teacher-dashboard', {
            backUrl: '/home',
          });
        }

      }
    }
    // face objects
  }

  back() {
    this.nav.pop('/role-base');
  }
}
