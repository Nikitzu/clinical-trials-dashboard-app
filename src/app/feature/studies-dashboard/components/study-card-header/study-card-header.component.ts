import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

import { StudyStatus } from '@study-feature/enums';
import { StudyIcon } from '@study-feature/types';

@Component({
  selector: 'app-study-card-header',
  standalone: true,
  imports: [MatCardHeader, MatCardSubtitle, MatCardTitle, MatIcon, NgClass, NgStyle],
  templateUrl: './study-card-header.component.html',
  styleUrl: './study-card-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyCardHeaderComponent {
  @Input({ required: true }) status!: StudyStatus;
  @Input({ required: true }) statusIcon!: StudyIcon;
  @Input({ required: true }) title!: string;
}
