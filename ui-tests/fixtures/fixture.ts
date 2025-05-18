import { test as baseTest } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import {LoginPage} from '../page-objects/login.page';
import { LaunchesPage } from '../page-objects/launches.page';
import { DashboardPage } from '../page-objects/dashboard.page';
import { acquireAccount } from '../utils/accounts';

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
        const id = test.info().parallelIndex;
        const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);

        if (fs.existsSync(fileName)) {
            await use(fileName);
            return;
        }

        const account = await acquireAccount(id);

        const page = await browser.newPage({ storageState: undefined, baseURL: process.env.BASE_URL });
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.openPage();
        await loginPage.login({ username: account.username, password: account.password });
        await dashboardPage.title.waitFor({state: 'visible'});
        await page.context().storageState({ path: fileName });
        await page.close();
        await use(fileName);
    }, { scope: 'worker' }],
});

export default test;