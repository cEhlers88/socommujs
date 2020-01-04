import { IDataEntry } from '@cehlers88/ceutils/dist/interfaces';

export default interface IClientinfo {
  data?: IDataEntry[];
  Connection: any;
  roles: string[];
  id: string;
  login: string;
  loginTimestamp: Date;
  messageHandle: CallableFunction;
}
