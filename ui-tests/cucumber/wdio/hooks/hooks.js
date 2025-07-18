import { Before, After } from '@wdio/cucumber-framework';
import LoginPage from '../page-objects/login.page.js';
import PageFactory from '../page-objects/page.factory.js';
import * as dotenv from 'dotenv';

dotenv.config();

Before(async function () {
    const credentials = {
        username: process.env.USER_NAME_0,
        password: process.env.PASSWORD_0,
    };
    await browser.reloadSession();
    const loginPage = new LoginPage(browser);
    await loginPage.openPage();
    await loginPage.login(credentials);
    await browser.pause(2000);
    this.currentPage = PageFactory.getPageInstance('Launches', browser);
});

After(async function () {
    await browser.deleteCookies();
    this.currentPage = null;
});
