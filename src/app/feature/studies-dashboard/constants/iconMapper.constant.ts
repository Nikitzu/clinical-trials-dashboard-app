import { StudyStatus } from '../enums';
import { StudyStatusToIconMap } from '../types';

export const IconMapperConstant: StudyStatusToIconMap = {
  [StudyStatus.ACTIVE_NOT_RECRUITING]: { icon: 'assignment_turned_in', color: '#3fb5a3' },
  [StudyStatus.COMPLETED]: { icon: 'check', color: '#3fb568' },
  [StudyStatus.ENROLLING_BY_INVITATION]: { icon: 'email', color: '#1a1a9c' },
  [StudyStatus.NOT_YET_RECRUITING]: { icon: 'person_outline', color: '#f1aa28' },
  [StudyStatus.RECRUITING]: { icon: 'people', color: '#0b63a4' },
  [StudyStatus.SUSPENDED]: { icon: 'pause', color: '#b53f8c' },
  [StudyStatus.TERMINATED]: { icon: 'cancel', color: '#9c1a1a' },
  [StudyStatus.WITHDRAWN]: { icon: 'mail_outline', color: '#b53f51' },
  [StudyStatus.AVAILABLE]: { icon: 'event_available', color: '#216037' },
  [StudyStatus.NO_LONGER_AVAILABLE]: { icon: 'event_busy', color: '#b5a33f' },
  [StudyStatus.TEMPORARILY_NOT_AVAILABLE]: { icon: 'event_note', color: '#f1d528' },
  [StudyStatus.APPROVED_FOR_MARKETING]: { icon: 'check_circle', color: '#216056' },
  [StudyStatus.WITHHELD]: { icon: 'notifications_paused', color: '#605621' },
  [StudyStatus.UNKNOWN]: { icon: 'check_box_outline_blank', color: '#000000' }
};
