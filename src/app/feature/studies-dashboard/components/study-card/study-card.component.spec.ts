import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard } from '@angular/material/card';

import { StudyCardComponent } from './study-card.component';
import { StudyStatus } from '../../enums';
import { MappedStudy } from '../../models';
import { StudyCardActionsComponent } from '../study-card-actions/study-card-actions.component';
import { StudyCardContentComponent } from '../study-card-content/study-card-content.component';
import { StudyCardHeaderComponent } from '../study-card-header/study-card-header.component';

describe('StudyCardComponent', () => {
  let component: StudyCardComponent;
  let fixture: ComponentFixture<StudyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StudyCardComponent,
        MatCard,
        StudyCardHeaderComponent,
        StudyCardContentComponent,
        StudyCardActionsComponent
      ]
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
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCardComponent);
    component = fixture.componentInstance;
    const mockStudy: MappedStudy = {
      id: '1',
      hasResults: true,
      status: StudyStatus.RECRUITING,
      statusIcon: { icon: 'icon-name', color: 'icon-color' },
      title: 'Study Title',
      location: { name: 'Location Name', url: 'https://example.com' },
      locationsAmount: 5,
      conditions: ['Condition 1', 'Condition 2'],
      url: 'sample-url'
    };
    component.study = mockStudy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render child components with correct inputs', () => {
    const cardElement: HTMLElement = fixture.nativeElement.querySelector('.study-card');

    expect(cardElement).toBeTruthy();

    const headerComponent: HTMLElement | null = cardElement.querySelector(
      'app-study-card-header'
    );
    expect(headerComponent).toBeTruthy();

    const contentComponent: HTMLElement | null = cardElement.querySelector(
      'app-study-card-content'
    );
    expect(contentComponent).toBeTruthy();

    const actionsComponent: HTMLElement | null = cardElement.querySelector(
      'app-study-card-actions'
    );
    expect(actionsComponent).toBeTruthy();
  });
});
