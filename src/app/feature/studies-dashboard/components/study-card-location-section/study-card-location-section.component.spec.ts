import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAnchor } from '@angular/material/button';

import { SafePipe } from '@shared-module/pipes/safe.pipe';

import { StudyCardLocationSectionComponent } from './study-card-location-section.component';

describe('StudyCardLocationSectionComponent', () => {
  let component: StudyCardLocationSectionComponent;
  let fixture: ComponentFixture<StudyCardLocationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyCardLocationSectionComponent, MatAnchor, SafePipe]
    })
      .overrideComponent(StudyCardLocationSectionComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
    fixture = TestBed.createComponent(StudyCardLocationSectionComponent);
    component = fixture.componentInstance;
    component.url = 'https://example-test.com';
    component.location = { name: 'loc', url: 'https://example.com' };
    component.locationsAmount = 5;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render location link with locationsAmount', () => {
    const anchorElement: HTMLElement = fixture.nativeElement.querySelector('a');
    expect(anchorElement).toBeTruthy();
    expect(anchorElement.getAttribute('href')).toContain(
      'https://example-test.com#contacts-and-locations'
    );
    expect(anchorElement.textContent).toContain('(+5 more)');
  });

  it('should not render location link without locationsAmount', () => {
    component.locationsAmount = undefined;
    fixture.detectChanges();

    const anchorElement: HTMLElement = fixture.nativeElement.querySelector('a');
    expect(anchorElement).toBeFalsy();
  });

  it('should render iframe with location url', () => {
    const iframeElement: HTMLIFrameElement =
      fixture.nativeElement.querySelector('iframe');
    expect(iframeElement).toBeTruthy();
    expect(iframeElement.getAttribute('src')).toContain('https://example.com');
  });

  it('should not render iframe without location url', () => {
    component.location = { name: 'loc', url: undefined };
    fixture.detectChanges();

    const iframeElement: HTMLIFrameElement =
      fixture.nativeElement.querySelector('iframe');
    expect(iframeElement).toBeFalsy();
  });

  it('should render unspecified location when location name is not provided', () => {
    component.location = undefined;
    fixture.detectChanges();

    const contentContainer: HTMLElement =
      fixture.nativeElement.querySelector('.content-container');
    expect(contentContainer.textContent).toContain(': Unspecified');
  });

  it('should not render unspecified location when location name is provided', () => {
    component.location = { name: 'Location Name', url: 'https://example.com' };
    fixture.detectChanges();

    const contentContainer: HTMLElement =
      fixture.nativeElement.querySelector('.content-container');
    expect(contentContainer.textContent).not.toContain(': Unspecified');
  });
});
