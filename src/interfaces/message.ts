import { IDataEntry } from '@cehlers88/ceutils/dist/Interfaces';

export default interface IMessage {
  message: string;
  data?: IDataEntry[];
  requestId?: string;
}
