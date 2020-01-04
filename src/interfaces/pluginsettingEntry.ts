import { IDataEntry } from '@cehlers88/ceutils/dist/interfaces';

export default interface IPluginsettingEntry extends IDataEntry {
  valueIsOptionIndex?: boolean;
  options?: string[];
  callback?: (props?: unknown) => void;
  props?: unknown;
}
