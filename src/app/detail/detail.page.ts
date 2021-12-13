import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AppManagerService } from '../app-manager.service';
import { Clipboard as CLBD } from '@capacitor/clipboard';
import { Browser as BRWSR } from '@capacitor/browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  logoImage: string;

  constructor(
    private appManager: AppManagerService,
    private alertController: AlertController,
    private navController: NavController
  ) {
    this.logoImage = 'assets/defaultUser.jpeg';
   }

  ngOnInit() {
  }

  async handleBrowser(url: string) {
    await BRWSR.open({ url });
  }

  async handleDelete() {
    await this.appManager.removeServiceUserAsync(this.appManager.selService.ID);

    const alert = await this.alertController.create({
      header: 'User deleted',
      message: 'User with service \'' + this.appManager.selService.serviceName + '\' has been deleted!',
      buttons: ['OK']
    });

    await alert.present();
    await alert.onDidDismiss();

    this.navController.navigateBack('/home');
  }

  async handleCopy(info: string) {
    await CLBD.write({
      // eslint-disable-next-line id-blacklist
      string: info
    });

    const alert = await this.alertController.create({
      header: 'Copied to clipboard!',
      message: 'Text \'' + info + '\' copied!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
