import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ImprintComponent } from './pages/imprint/imprint.component';

export const routes: Routes = [
    { path: 'impressum', component: ImprintComponent },
    { path: ':id', component: HomeComponent },
    { path: '', component: HomeComponent },
];
