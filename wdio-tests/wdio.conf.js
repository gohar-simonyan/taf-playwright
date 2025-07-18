export const config = {
    runner: 'local',
    specs: ['./test/features/*.feature'],
    services: ['chromedriver'],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://rp.epam.com/ui/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    cucumberOpts: {
        require: ['./test/step-definitions/**/*.js', './test/hooks/*.js'],
        backtrace: false,
        dryRun: false,
        failFast: false,
        source: true,
        timeout: 60000,
        ignoreUndefinedDefinitions: false,
    },
    framework: 'cucumber',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
