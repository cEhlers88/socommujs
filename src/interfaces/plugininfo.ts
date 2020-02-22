import { IDataEntry } from '@cehlers88/ceutils/dist/Interfaces';
import IPluginsettingEntry from './pluginsettingEntry';

export default interface IPlugininfo {
  name: string;
  description: string;
  data: IDataEntry[];
  settings: IPluginsettingEntry[];
}
