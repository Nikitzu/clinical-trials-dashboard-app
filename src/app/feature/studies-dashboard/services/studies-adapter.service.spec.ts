import { TestBed } from '@angular/core/testing';

import { StudyStatus } from '@study-feature/enums';
import { MappedStudy } from '@study-feature/models';
import { Study } from '@study-feature/types';

import { StudiesAdapterService } from './studies-adapter.service';

describe('StudiesAdapterService', () => {
  let service: StudiesAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudiesAdapterService]
    });
    service = TestBed.inject(StudiesAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should adapt Study objects to MappedStudy objects', () => {
    const mockStudy: Study = {
      protocolSection: {
        identificationModule: {
          nctId: 'NCT1234',
          briefTitle: 'Sample Study'
        },
        statusModule: {
          overallStatus: StudyStatus.COMPLETED
        },
        conditionsModule: {
          conditions: ['Condition 1', 'Condition 2']
        },
        contactsLocationsModule: {
          locations: [
            { city: 'Sample City', state: 'Sample State', country: 'Sample Country' }
          ]
        }
      },
      hasResults: true
    };

    const adaptedStudy = service.adapt([mockStudy])[0];
    const expectedMappedStudy: MappedStudy = new MappedStudy(
      'NCT1234',
      'Sample Study',
      StudyStatus.COMPLETED,
      ['Condition 1', 'Condition 2'],
      true,
      { icon: 'check', color: '#3fb568' },
      '/study/NCT1234',
      0,
      {
        name: 'Sample Country, Sample State, Sample City',
        url: 'https://www.google.com/maps/embed/v1/place?key=&q=Sample Country+Sample State+Sample City'
      }
    );

    expect(adaptedStudy).toEqual(expectedMappedStudy);
  });
});
