import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200'
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      options: {
        projectConfig: {
          root: '',
          sourceRoot: 'apps/my-app',
          buildOptions: {
            index: 'src/index.html',
            main: 'src/main.ts',
            tsConfig: 'tsconfig.json',
            inlineStyleLanguage: 'scss',
            assets: ['src/favicon.ico', 'src/assets'],
            styles: ['src/styles.scss']
          }
        }
      }
    },
    specPattern: '**/*.cy.ts'
  }
});
