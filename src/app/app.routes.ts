import { Routes } from '@angular/router';

import { ErrorPageComponent } from '@shared-module/components/error-page/error-page.component';
import { StudiesDashboardComponent } from '@study-feature/studies-dashboard.component';

export const routes: Routes = [
  { path: '', component: StudiesDashboardComponent },
  { path: '**', component: ErrorPageComponent }
];
