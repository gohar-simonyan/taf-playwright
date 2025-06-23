import { Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import * as fs from 'fs';
import path from 'path';
import { LoginPage } from '../page-object/loginPage.js';
import {PageFactory} from '../page-object/pageFactory.js';
import * as dotenv from 'dotenv';

dotenv.config();

let browser;
let context;

const STORAGE_STATE_PATH = path.resolve('./storageState.json');

Before(async function () {
    const baseUrl = process.env.BASE_URL;
    const credentials = {
        username: process.env.USER_NAME_0,
        password: process.env.PASSWORD_0,
    };
    browser = await chromium.launch({ headless: false });

    if (fs.existsSync(STORAGE_STATE_PATH)) {
        context = await browser.newContext({
            storageState: STORAGE_STATE_PATH,
            baseURL: baseUrl,
        });
    } else {
        context = await browser.newContext({ baseURL: baseUrl });
        const page = await context.newPage();
        const loginPage = new LoginPage(page);
        await loginPage.openPage();
        await loginPage.login(credentials);
        await page.waitForLoadState('networkidle');
        await context.storageState({ path: STORAGE_STATE_PATH });
        await page.close();
    }
    this.context = context;
    this.page = await context.newPage();
    this.currentPage = PageFactory.getPageInstance('Launches', this.page);
});

After(async function () {
    if (browser) { await browser.close();}
});