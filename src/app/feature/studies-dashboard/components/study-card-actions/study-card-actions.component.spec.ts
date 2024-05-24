import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatCardActions } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StudyCardActionsComponent } from './study-card-actions.component';

describe('StudyCardActionsComponent', () => {
  let component: StudyCardActionsComponent;
  let fixture: ComponentFixture<StudyCardActionsComponent>;
  let mockClipboard: jasmine.SpyObj<Clipboard>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    mockClipboard = jasmine.createSpyObj('Clipboard', ['copy']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [StudyCardActionsComponent, MatAnchor, MatButton, MatCardActions, MatIcon],
      providers: [
        { provide: Clipboard, useValue: mockClipboard },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    })
      .overrideComponent(StudyCardActionsComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCardActionsComponent);
    component = fixture.componentInstance;
    component.url = 'sample-url';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should copy link to clipboard and open snackbar on copyLink()', () => {
    component.copyLink();
    expect(mockClipboard.copy).toHaveBeenCalledWith('sample-url');
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Link copied to the clipboard!',
      'Ok',
      {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 5 * 1000
      }
    );
  });

  it('should render action buttons with correct URLs', () => {
    const anchorElement: HTMLElement = fixture.nativeElement.querySelector('a');
    expect(anchorElement.getAttribute('href')).toContain('sample-url');

    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement).toBeTruthy();
  });
});
