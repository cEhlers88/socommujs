import { ELogLevel } from '../lib/enums';

export default interface ILogInfo {
  additionals?: any;
  level: ELogLevel;
  message: string;
}
