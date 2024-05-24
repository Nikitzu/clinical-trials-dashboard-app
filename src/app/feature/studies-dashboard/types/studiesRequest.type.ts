import { Study } from './study.type';

export interface StudiesRequest {
  studies: Study[];
  nextPageToken: string;
}
