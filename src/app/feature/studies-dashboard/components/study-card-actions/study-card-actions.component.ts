import { Clipboard } from '@angular/cdk/clipboard';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatCardActions } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-study-card-actions',
  standalone: true,
  imports: [MatAnchor, MatButton, MatCardActions, MatIcon, NgClass],
  templateUrl: './study-card-actions.component.html',
  styleUrl: './study-card-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyCardActionsComponent {
  @Input({ required: true }) url!: string;
  constructor(
    private snackBar: MatSnackBar,
    private clipboard: Clipboard
  ) {}

  copyLink() {
    this.clipboard.copy(this.url);
    this.snackBar.open('Link copied to the clipboard!', 'Ok', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 5 * 1000
    });
  }
}
