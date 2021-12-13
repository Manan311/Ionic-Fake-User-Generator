/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { ServiceUser } from './models/ServiceUser';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: ServiceUser) {
    return this._storage?.set(key, JSON.stringify(value));
  }

  public async remove(key: string) {
    return this._storage?.remove(key);
  }

  public async getAll(): Promise<Array<ServiceUser>> {
    const serviceUsers: Array<ServiceUser> = [];

    if (!this._storage) {
      await this.init();
    }

    await this._storage?.forEach((value, key, index) => {
      const serviceUser: ServiceUser = JSON.parse(value);
      serviceUsers.push(serviceUser);
    });

    return serviceUsers;
  }
}
