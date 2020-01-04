import { IClientinfo } from '../lib/interfaces';

export default class Clientmanager {
  private clientinfos: IClientinfo[] = [];

  public addClient(newClient: IClientinfo): Clientmanager {
    this.clientinfos.push(newClient);
    return this;
  }
  public createClient(): IClientinfo {
    return {
      Connection: '',
      data: [],
      id: Math.random()
        .toString(36)
        .substr(2, 15),
      login: '',
      loginTimestamp: new Date(),
      messageHandle: () => false,
      roles: ['GUEST'],
    };
  }
  public getClient(clientId: string): IClientinfo | undefined {
    return this.clientinfos.find((Client: IClientinfo) => Client.id === clientId);
  }
  public getClients(): IClientinfo[] {
    return this.clientinfos;
  }
  public removeAllClients() {
    this.clientinfos = [];
  }
  public removeClient(clientId: string) {
    this.clientinfos = this.clientinfos.filter((Client: IClientinfo) => Client.id !== clientId);
  }
}
