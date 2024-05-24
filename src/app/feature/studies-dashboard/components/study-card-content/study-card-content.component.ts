import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardContent } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';

import { MappedStudyLocation } from '@study-feature/types';

import { StudyCardLocationSectionComponent } from '../study-card-location-section/study-card-location-section.component';

@Component({
  selector: 'app-study-card-content',
  standalone: true,
  imports: [
    MatCardContent,
    MatChipSet,
    StudyCardLocationSectionComponent,
    MatChip,
    NgClass
  ],
  templateUrl: './study-card-content.component.html',
  styleUrl: './study-card-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyCardContentComponent {
  @Input({ required: true }) conditions!: string[];
  @Input({ required: true }) url!: string;
  @Input() locationsAmount?: number;
  @Input() location?: MappedStudyLocation;
}
