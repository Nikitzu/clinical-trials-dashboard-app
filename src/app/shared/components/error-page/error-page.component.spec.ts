import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterLink, RouterModule } from '@angular/router';

import { ErrorPageComponent } from './error-page.component';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserDynamicTestingModule,
        MatButton,
        RouterLink,
        ErrorPageComponent,
        RouterModule.forRoot([])
      ]
    })
      .overrideComponent(ErrorPageComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentUrl with the current route', () => {
    component.ngOnInit();
    expect(component.currentUrl).toBe('/');
  });

  it('should display 404 error message if currentUrl is /404', () => {
    component.currentUrl = '/404';
    fixture.detectChanges();

    const h1 = fixture.nativeElement.querySelector('h1');
    const h2 = fixture.nativeElement.querySelector('h2');

    expect(h1.textContent).toContain('404');
    expect(h2.textContent).toContain('This Page Could Not Be Found');
  });

  it('should display 500 error message if currentUrl is /500', () => {
    component.currentUrl = '/500';
    fixture.detectChanges();

    const h1 = fixture.nativeElement.querySelector('h1');
    const h2 = fixture.nativeElement.querySelector('h2');

    expect(h1.textContent).toContain('500');
    expect(h2.textContent).toContain('Our server faced some issues');
  });

  it('should display 0 ideas message if currentUrl is not /404 or /500', () => {
    component.currentUrl = '/other-url';
    fixture.detectChanges();

    const h1 = fixture.nativeElement.querySelector('h1');
    const h2 = fixture.nativeElement.querySelector('h2');

    expect(h1.textContent).toContain('0 ideas');
    expect(h2.textContent).toContain('We are sorry, but we do not know this URL.');
  });
});
