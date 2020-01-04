import { IDataEntry } from '@cehlers88/ceutils/dist/interfaces';

export default interface IMessage {
  message: string;
  data?: IDataEntry[];
  requestId?: string;
}
