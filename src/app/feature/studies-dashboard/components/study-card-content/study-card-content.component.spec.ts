import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardContent } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';

import { StudyCardContentComponent } from './study-card-content.component';

describe('StudyCardContentComponent', () => {
  let component: StudyCardContentComponent;
  let fixture: ComponentFixture<StudyCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardContent, MatChip, MatChipSet, StudyCardContentComponent]
    })
      .overrideComponent(StudyCardContentComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
    fixture = TestBed.createComponent(StudyCardContentComponent);
    component = fixture.componentInstance;
    component.conditions = ['Condition 1', 'Condition 2'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render conditions if conditions are provided', () => {
    const chipSetElement: HTMLElement =
      fixture.nativeElement.querySelector('mat-chip-set');
    expect(chipSetElement).toBeTruthy();

    const chipOptionElements: NodeList = chipSetElement.querySelectorAll('mat-chip');
    expect(chipOptionElements.length).toBe(2);
  });

  it('should render StudyCardLocationSectionComponent', () => {
    component.url = 'sample-url';
    fixture.detectChanges();

    const locationSectionComponent = fixture.nativeElement.querySelector(
      'app-study-card-location-section'
    );
    expect(locationSectionComponent).toBeTruthy();
  });
});
