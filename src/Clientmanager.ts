import { IClientinfo } from './core/interfaces';

export default class Clientmanager {
  private clientinfos: IClientinfo[] = [];

  public addClient(): Clientmanager {
    this.clientinfos.push({
      Connection: '',
      id: '',
      login: '',
      loginTimestamp: new Date(),
      roles: ['GUEST'],
    });
    return this;
  }

  public getClients(): IClientinfo[] {
    return this.clientinfos;
  }
}
