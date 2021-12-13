import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FilterData } from '../models/FilterData';
import { ResultObject } from '../models/ResultObject';
import { ResultResponse } from '../models/ResultResponse';
import { ServiceUser } from '../models/ServiceUser';
import { ApiManagerService } from '../api-manager.service';
import { Subscription } from 'rxjs';
import { AppManagerService } from '../app-manager.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit{

  serviceName: string;
  filterData: FilterData;

  private genUserSub: Subscription;

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    private apiManager: ApiManagerService,
    private appManagerService: AppManagerService
  ) {
    this.filterData = new FilterData();
    this.serviceName = '';
   }

  ngOnInit() {
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy() {
    this.genUserSub.unsubscribe();
  }

  async handleGenerate(): Promise<void> {
    if (this.serviceName !== '' && !this.filterData.Empty()) {
      let serviceUser: ServiceUser;

      this.genUserSub = this.apiManager.getServiceUser()
        .subscribe(
          async (data: ResultResponse) => {
            const resultObject: ResultObject = data.results[0];
            serviceUser = new ServiceUser(
              this.serviceName,
              resultObject,
              this.filterData);

            await this.appManagerService.addServiceUserAsync(serviceUser);

            const alert = await this.alertController.create({
              header: 'User created',
              message: 'User with service ' + serviceUser.serviceName + ' generated!',
              buttons: ['OK']
            });

            await alert.present();
            await alert.onDidDismiss();

            this.navController.navigateBack('/home');
          }
        );
    }
    else {
      const alert = await this.alertController.create({
        header: 'Invalid input',
        message: 'Service name and one data field must be picked!',
        buttons: ['OK']
      });

      await alert.present();
    }
  }

}
