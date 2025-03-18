import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'impressum', component: ImprintComponent },
    { path: 'datenschutz', component: PrivacyComponent },
];
