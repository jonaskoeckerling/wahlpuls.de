# Wahlpuls.de

The website Wahlpuls.de offers a simple and comprehensive dashboard to keep track of the latest poll results for the geman political system. You can compare poll results from different research institutes and analyze trends over time. The website is designed to be user-friendly and accessible, making it easy for anyone interested in the political landscape to stay informed about the latest poll results.

**🚀 Check out the live website here: https://wahlpuls.de/**

## Features

- 📊 **Bar Chart:** Check poll results with a simple bar chart.
- 🔎 **Source selection:** Compare poll results from different research institutes.
- 📈 **Line Chart:** Analyze poll results over time.
- 📱 **Responsive design:** View poll results on any screen size.

## Development

The website is build with Angular 19. The project is well structured into Components, Services and Models. The design is implemented with clean and structured custom CSS.

Comments are provided throughout the codebase to help you understand how things work. The data is provided from a Supabase PostreSQL database fetched with the Supabase client. 

### Development server

To start a local development server, run:

```bash
vercel dev
```

Once the server is running, open your browser and navigate to `http://localhost:3000/`. The application will automatically reload whenever you modify any of the source files.

## Deployment

The project is deployed to Vercel. Continous Deployment happens every time you push changes to the repository on GitHub. The deployment process is automated and managed by Vercel.

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Tests

> Tests are not implemented yet and will be added in a future release.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.