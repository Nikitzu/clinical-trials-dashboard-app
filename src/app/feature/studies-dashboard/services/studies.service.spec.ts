import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';

import { ErrorHandlerService } from '@core-module/services';
import { StudyStatus } from '@study-feature/enums';
import { MappedStudy } from '@study-feature/models';
import { StudiesAdapterService } from '@study-feature/services/studies-adapter.service';

import { StudiesService } from './studies.service';
import { environment } from '../../../../environments/environment';
import { DefaultRequestFields } from '../constants';

describe('StudiesService', () => {
  let service: StudiesService;
  let httpMock: HttpTestingController;

  const mockMappedStudy: MappedStudy = {
    id: '1',
    title: 'Sample Study',
    status: StudyStatus.COMPLETED,
    conditions: ['Condition 1', 'Condition 2'],
    location: { name: 'Sample Location', url: 'https://example.com' },
    locationsAmount: 5,
    hasResults: true,
    statusIcon: { icon: 'icon-name', color: 'icon-color' },
    url: 'https://example.com/study'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StudiesService,
        ErrorHandlerService,
        TransferState,
        {
          provide: StudiesAdapterService,
          useValue: { adapt: (studies: MappedStudy[]) => studies }
        }
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(StudiesService);
    httpMock
      .expectOne(
        `${environment.ANGULAR_BASE_API_URL}/studies?fields=${DefaultRequestFields.join(',')}`
      )
      .flush({ studies: [mockMappedStudy] });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch studies', () => {
    service.getStudies();

    const req = httpMock.expectOne(
      `${environment.ANGULAR_BASE_API_URL}/studies?fields=${DefaultRequestFields.join(',')}`
    );
    expect(req.request.method).toBe('GET');
    req.flush({ studies: [mockMappedStudy] });

    expect(service.data()).toEqual([mockMappedStudy]);
  });

  it('should update studies periodically', () => {
    const mockStudies: MappedStudy[] = [mockMappedStudy];

    service.updateStudies();

    setTimeout(() => {
      const req2 = httpMock.expectOne(
        `${environment.ANGULAR_BASE_API_URL}/studies?fields=${DefaultRequestFields.join(',')}&pageSize=1`
      );
      expect(req2.request.method).toBe('GET');
      req2.flush({ studies: mockStudies });
    }, 5000);
  });

  it('should build HTTP params correctly', () => {
    const params = { pageSize: 10 };
    const builtParams = service['buildHttpParams'](params);
    expect(builtParams.has('fields')).toBeTrue();
    expect(builtParams.has('pageSize')).toBeTrue();
    expect(builtParams.has('pageToken')).toBeFalse();
    expect(builtParams.get('fields')).toBe(DefaultRequestFields.join(','));
    expect(builtParams.get('pageSize')).toBe('10');
  });
});
