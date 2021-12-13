import { Injectable } from '@angular/core';
import { ServiceUser } from './models/ServiceUser';
import { v4 as uuid } from 'uuid';
import { DatabaseManagerService } from './database-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AppManagerService {

  serviceUsers: Array<ServiceUser>;
  private selectedService: ServiceUser;

  constructor(
    private dbManager: DatabaseManagerService
  ) {
    this.serviceUsers = [];
  }

  get selService(): ServiceUser {
    return this.selectedService;
  }
  set selService(serviceUser: ServiceUser) {
    this.selectedService = serviceUser;
  }

  get serviceUserEmpty(): boolean {
    return this.serviceUsers.length === 0;
  }

   async initServiceUser() {
    this.serviceUsers = await this.dbManager.getAll();
  }

  async addServiceUserAsync(serviceUser: ServiceUser) {
    serviceUser.ID = uuid();

    this.serviceUsers.push(serviceUser);

    await this.dbManager.set(serviceUser.ID, serviceUser);
  }

  async removeServiceUserAsync(key: string) {
    const index =  this.serviceUsers.findIndex(x => x.ID === key);
    if (index > -1) {
      this.serviceUsers.splice(index, 1);
    }

    await this.dbManager.remove(key);
  }

}
