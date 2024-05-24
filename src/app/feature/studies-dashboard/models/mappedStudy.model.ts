import { StudyStatus } from '@study-feature/enums';
import { MappedStudyLocation, StudyIcon } from '@study-feature/types';

export class MappedStudy {
  id: string;
  title: string;
  status: StudyStatus;
  conditions: string[];
  location?: MappedStudyLocation;
  locationsAmount?: number;
  hasResults: boolean;
  statusIcon: StudyIcon;
  url: string;
  constructor(
    id: string,
    title: string,
    status: StudyStatus,
    conditions: string[],
    hasResults: boolean,
    statusIcon: StudyIcon,
    url: string,
    locationsAmount?: number,
    location?: MappedStudyLocation
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.conditions = conditions;
    this.location = location;
    this.hasResults = hasResults;
    this.url = url;
    this.statusIcon = statusIcon;
    this.locationsAmount = locationsAmount;
  }
}
