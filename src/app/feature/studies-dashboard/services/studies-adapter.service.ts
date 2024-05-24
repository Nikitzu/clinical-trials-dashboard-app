import { Injectable } from '@angular/core';

import { AdapterService } from '@core-module/services';
import { IconMapperConstant } from '@study-feature/constants';
import { MappedStudy } from '@study-feature/models';
import { MappedStudyLocation, Study, StudyLocation } from '@study-feature/types';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudiesAdapterService extends AdapterService<Study[], MappedStudy[]> {
  constructor() {
    super();
  }

  adapt(items: Study[]): MappedStudy[] {
    return items?.map((item) => {
      let locationData: { locationsAmount?: number; location?: MappedStudyLocation } = {};
      if (item.protocolSection.contactsLocationsModule) {
        locationData = this.buildLocationsData(
          item.protocolSection.contactsLocationsModule?.locations
        );
      }

      return new MappedStudy(
        item.protocolSection.identificationModule.nctId,
        item.protocolSection.identificationModule.briefTitle,
        item.protocolSection.statusModule.overallStatus,
        item.protocolSection.conditionsModule.conditions,
        item.hasResults,
        IconMapperConstant[item.protocolSection.statusModule.overallStatus],
        `${environment.ANGULAR_BASE_URL}/study/${item.protocolSection.identificationModule.nctId}`,
        locationData?.locationsAmount,
        locationData?.location
      );
    });
  }

  private buildLocationsData(locations: StudyLocation[] | undefined): {
    locationsAmount?: number;
    location?: MappedStudyLocation;
  } {
    const location = locations?.[0];
    const locationsAmount = locations ? locations.length - 1 : 0;
    let locationName: string | undefined;
    let locationUrl: string | undefined;

    if (location) {
      if (location?.country.includes(',')) {
        location.country = location.country.split(',').reverse().join(' ').trim();
      }
      locationName = `${location?.country}${location?.state ? ', ' + location.state : ''}, ${location?.city}`;
      locationUrl = `https://www.google.com/maps/embed/v1/place?key=${environment.ANGULAR_GOOGLE_MAPS_API_KEY}&q=${locationName?.replaceAll(', ', '+')}`;
    }
    return {
      locationsAmount,
      location: { name: locationName, url: locationUrl }
    };
  }
}
