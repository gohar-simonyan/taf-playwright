import { test as baseTest } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import {LoginPage} from '../page-objects/login.page';
import { LaunchesPage } from '../page-objects/launches.page';
import { DashboardPage } from '../page-objects/dashboard.page';

type PlaywrightTestFixtures = {
    launchesPage: LaunchesPage;
};

const test = baseTest.extend<PlaywrightTestFixtures, { workerStorageState: string }>({
    launchesPage: async ({ page }, use) => {
        const launchesPage = new LaunchesPage(page);

        await use(launchesPage);
    },
    storageState: ({ workerStorageState }, use) => use(workerStorageState),

    workerStorageState: [async ({ browser }, use) => {
        const fileName = path.resolve(test.info().project.outputDir, '.auth.json');

        if (fs.existsSync(fileName)) {
            await use(fileName);
            return;
        }
        const page = await browser.newPage({ storageState: undefined });
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.openPage();
        await loginPage.login({ username: process.env.USER_NAME, password: process.env.PASSWORD });
        await dashboardPage.elements.title.waitFor({state: 'visible'});
        await page.context().storageState({ path: fileName });
        await page.close();
        await use(fileName);
    }, { scope: 'worker' }],
});

export default test;