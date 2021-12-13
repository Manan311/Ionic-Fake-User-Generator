import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServiceUser } from '../models/ServiceUser';
import { AppManagerService } from '../app-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  logoImage: string;

  constructor(
    private appManager: AppManagerService,
    private navController: NavController
  ) {
    this.logoImage = 'assets/defaultUser.jpeg';
  }

  async ngOnInit() {
    await this.appManager.initServiceUser();
  }

  handleDetail(serviceUser: ServiceUser): void {
    // Set selected user in appManager instead of navigation url, because it's an app.
    this.appManager.selService = serviceUser;

    this.navController.navigateForward('/detail');
  }
}
