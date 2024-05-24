import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TransferState
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatAnchor } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { first } from 'rxjs';

import { studyStateKeyConstant } from '@study-feature/constants';

import { StudyCardComponent } from './components/study-card/study-card.component';
import { StudiesService } from './services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-studies-dashboard',
  standalone: true,
  imports: [
    StudyCardComponent,
    StudiesDashboardComponent,
    MatProgressSpinner,
    MatAnchor,
    NgClass
  ],
  providers: [StudiesService],
  templateUrl: './studies-dashboard.component.html',
  styleUrl: './studies-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('myInsertRemoveTrigger1', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [animate('1000ms', style({ opacity: 0 }))])
    ])
  ]
})
export class StudiesDashboardComponent implements OnInit {
  get studies() {
    return this.studiesService.data;
  }
  trialsURL: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformID: object,
    private studiesService: StudiesService,
    private transferState: TransferState
  ) {
    this.trialsURL = environment.ANGULAR_BASE_URL;
    if (
      isPlatformBrowser(this.platformID) &&
      !this.transferState.hasKey(studyStateKeyConstant)
    ) {
      toObservable(this.studiesService.data)
        .pipe(first())
        .subscribe(() => {
          this.studiesService.updateStudies();
        });
    }
  }

  ngOnInit() {
    if (
      isPlatformBrowser(this.platformID) &&
      this.transferState.hasKey(studyStateKeyConstant)
    ) {
      const ssrData = this.transferState.get(studyStateKeyConstant, []);
      if (ssrData.length) {
        this.studiesService.setServerData = ssrData;
      }
      this.studiesService.updateStudies();
    }
  }
}
