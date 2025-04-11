import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { injectSpeedInsights } from '@vercel/speed-insights';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Inject Vercel Speed Insights
injectSpeedInsights();