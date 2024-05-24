import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

import { StudyCardHeaderComponent } from './study-card-header.component';
import { StudyStatus } from '../../enums';
import { StudyIcon } from '../../types';

describe('StudyCardHeaderComponent', () => {
  let component: StudyCardHeaderComponent;
  let fixture: ComponentFixture<StudyCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StudyCardHeaderComponent,
        MatCardHeader,
        MatCardSubtitle,
        MatCardTitle,
        MatIcon
      ]
    })
      .overrideComponent(StudyCardHeaderComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
    fixture = TestBed.createComponent(StudyCardHeaderComponent);
    component = fixture.componentInstance;
    const title = 'Sample Title';
    const status = StudyStatus.RECRUITING;
    const statusIcon: StudyIcon = {
      icon: 'icon-name',
      color: 'icon-color'
    };
    component.title = title;
    component.status = status;
    component.statusIcon = statusIcon;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input properties', () => {
    const cardTitleElement: HTMLElement | null =
      fixture.nativeElement.querySelector('mat-card-title');
    const cardSubtitleElement: HTMLElement | null =
      fixture.nativeElement.querySelector('.study-card-subtitle');
    expect(cardTitleElement?.textContent).toContain('Sample Title');
    expect(cardSubtitleElement?.textContent).toContain(StudyStatus.RECRUITING);
  });
});
