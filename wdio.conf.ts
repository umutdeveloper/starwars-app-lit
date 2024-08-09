import type { Options } from '@wdio/types';
export const config: Options.Testrunner = {
  runner: 'browser',
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },
  specs: ['./src/**/*.test.ts'],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--disable-gpu', '--no-sandbox'],
      },
    },
  ],
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  ...(process.env.SELENIUM_PORT ? { port: parseInt(process.env.SELENIUM_PORT) } : {}),
  ...(process.env.SELENIUM_HOSTNAME ? { hostname: process.env.SELENIUM_HOSTNAME } : {}),
};
