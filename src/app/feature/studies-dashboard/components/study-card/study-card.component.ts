import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCard } from '@angular/material/card';

import { MappedStudy } from '@study-feature/models';

import { StudyCardActionsComponent } from '../study-card-actions/study-card-actions.component';
import { StudyCardContentComponent } from '../study-card-content/study-card-content.component';
import { StudyCardHeaderComponent } from '../study-card-header/study-card-header.component';

@Component({
  selector: 'app-study-card',
  standalone: true,
  imports: [
    MatCard,
    StudyCardActionsComponent,
    StudyCardContentComponent,
    StudyCardHeaderComponent,
    NgClass
  ],
  templateUrl: './study-card.component.html',
  styleUrl: './study-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyCardComponent {
  @Input({ required: true }) study!: MappedStudy;
}
