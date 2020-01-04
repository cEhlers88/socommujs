import { IDataEntry } from '@cehlers88/ceutils/dist/interfaces';
import IPluginsettingEntry from './pluginsettingEntry';

export default interface IPlugininfo {
  name: string;
  description: string;
  data: IDataEntry[];
  settings: IPluginsettingEntry[];
}
