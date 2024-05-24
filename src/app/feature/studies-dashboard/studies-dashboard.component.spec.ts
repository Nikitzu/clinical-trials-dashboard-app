import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StudyCardComponent } from './components/study-card/study-card.component';
import { StudyCardActionsComponent } from './components/study-card-actions/study-card-actions.component';
import { StudyCardContentComponent } from './components/study-card-content/study-card-content.component';
import { StudyCardHeaderComponent } from './components/study-card-header/study-card-header.component';
import { StudyCardLocationSectionComponent } from './components/study-card-location-section/study-card-location-section.component';
import { StudyStatus } from './enums';
import { StudiesService } from './services';
import { StudiesDashboardComponent } from './studies-dashboard.component';

describe('StudiesDashboardComponent', () => {
  describe('with data', () => {
    let component: StudiesDashboardComponent;
    let fixture: ComponentFixture<StudiesDashboardComponent>;

    const studiesServiceMock = {
      data: signal([
        {
          id: '1',
          hasResults: true,
          status: StudyStatus.RECRUITING,
          statusIcon: { icon: 'icon-name', color: 'icon-color' },
          title: 'Study Title',
          location: { name: 'Location Name', url: 'https://example.com' },
          locationsAmount: 5,
          conditions: ['Condition 1', 'Condition 2'],
          url: 'sample-url'
        }
      ])
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          BrowserAnimationsModule,
          MatProgressSpinnerModule,
          StudiesDashboardComponent,
          StudyCardLocationSectionComponent,
          StudyCardHeaderComponent,
          StudyCardContentComponent,
          StudyCardActionsComponent
        ],
        providers: [TransferState]
      })
        .overrideComponent(StudyCardLocationSectionComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default }
        })
        .overrideComponent(StudyCardHeaderComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default }
        })
        .overrideComponent(StudyCardContentComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default }
        })
        .overrideComponent(StudyCardActionsComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default }
        })
        .overrideComponent(StudyCardComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default }
        })
        .overrideComponent(StudiesDashboardComponent, {
          set: {
            providers: [
              {
                provide: StudiesService,
                useValue: studiesServiceMock
              }
            ],
            changeDetection: ChangeDetectionStrategy.Default
          }
        })
        .compileComponents();

      fixture = TestBed.createComponent(StudiesDashboardComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show studies container if studies data length is greater than 0', () => {
      expect(fixture.nativeElement.querySelector('.studies-container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.title-container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.loading-label')).toBeFalsy();
    });
  });

  describe('with no data', () => {
    let fixture: ComponentFixture<StudiesDashboardComponent>;

    const studiesServiceMock = {
      data: signal([])
    };
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          BrowserAnimationsModule,
          MatProgressSpinnerModule,
          StudiesDashboardComponent,
          StudyCardLocationSectionComponent,
          StudyCardHeaderComponent,
          StudyCardContentComponent,
          StudyCardActionsComponent
        ],
        providers: [TransferState]
      })
        .overrideComponent(StudyCardLocationSectionComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default }
        })
        .overrideComponent(StudyCardHeaderComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default }
        })
        .overrideComponent(StudyCardContentComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default }
        })
        .overrideComponent(StudyCardActionsComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default }
        })
        .overrideComponent(StudyCardComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default }
        })
        .overrideComponent(StudiesDashboardComponent, {
          set: {
            providers: [
              {
                provide: StudiesService,
                useValue: studiesServiceMock
              }
            ],
            changeDetection: ChangeDetectionStrategy.Default
          }
        })
        .compileComponents();

      fixture = TestBed.createComponent(StudiesDashboardComponent);

      fixture.detectChanges();
    });

    it('should show loading label if studies data length is 0', () => {
      expect(fixture.nativeElement.querySelector('.studies-container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('app-study-card')).toBeNull();
      expect(fixture.nativeElement.querySelector('.loading-label')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.title-container')).toBeTruthy();
    });
  });
});
