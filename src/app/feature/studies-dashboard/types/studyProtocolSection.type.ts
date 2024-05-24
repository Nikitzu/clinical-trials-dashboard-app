import { StudyLocation } from './studyLocation.type';
import { StudyStatus } from '../enums';

export interface StudyProtocolSection {
  identificationModule: {
    nctId: string;
    briefTitle: string;
  };
  statusModule: {
    overallStatus: StudyStatus;
  };
  conditionsModule: {
    conditions: string[];
  };
  contactsLocationsModule?: {
    locations?: StudyLocation[];
  };
}
