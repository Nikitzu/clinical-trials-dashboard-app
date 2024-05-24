import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatAnchor } from '@angular/material/button';

import { SafePipe } from '@shared-module/pipes/safe.pipe';
import { MappedStudyLocation } from '@study-feature/types';

@Component({
  selector: 'app-study-card-location-section',
  standalone: true,
  imports: [MatAnchor, SafePipe, NgClass],
  templateUrl: './study-card-location-section.component.html',
  styleUrl: './study-card-location-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyCardLocationSectionComponent {
  @Input({ required: true }) url!: string;
  @Input() locationsAmount?: number;
  @Input() location?: MappedStudyLocation;
}
