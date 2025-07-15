import { Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import * as fs from 'fs';
import path from 'path';
import { LoginPage } from '../page-object/loginPage.js';
import { PageFactory } from '../page-object/pageFactory.js';
import * as dotenv from 'dotenv';

dotenv.config();

const STORAGE_STATE_PATH = path.resolve('./storageState.json');

Before(async function () {
    const baseUrl = process.env.BASE_URL;
    const credentials = {
        username: process.env.USER_NAME_0,
        password: process.env.PASSWORD_0,
    };
    this.browser = await chromium.launch({ headless: false });
    if (fs.existsSync(STORAGE_STATE_PATH)) {
        this.context = await this.browser.newContext({
            storageState: STORAGE_STATE_PATH,
            baseURL: baseUrl,
        });
    } else {
        this.context = await this.browser.newContext({ baseURL: baseUrl });
        const page = await this.context.newPage();
        const loginPage = new LoginPage(page);
        await loginPage.openPage();
        await loginPage.login(credentials);
        await page.waitForLoadState('networkidle');
        await this.context.storageState({ path: STORAGE_STATE_PATH });
        await page.close();
    }
    this.page = await this.context.newPage();
    this.currentPage = PageFactory.getPageInstance('Launches', this.page);
});

After(async function () {
    if (this.browser) { await this.browser.close();}
    this.context = null;
    this.page = null;
    this.currentPage = null;
});
