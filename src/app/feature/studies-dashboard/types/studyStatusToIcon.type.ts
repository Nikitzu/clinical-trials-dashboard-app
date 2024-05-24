import { StudyIcon } from './studyIcon.type';
import { StudyStatus } from '../enums';

export type StudyStatusToIconMap = { [key in StudyStatus]: StudyIcon };
