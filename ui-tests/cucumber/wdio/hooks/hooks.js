import { Before, After } from '@wdio/cucumber-framework';
import LoginPage from '../../page-objects/loginPage.js';
import PageFactory from '../../page-objects/pageFactory.js';
import * as dotenv from 'dotenv';
import { ElementFactory } from '../../page-objects/elementFactory.js';

dotenv.config();

Before(async function () {
    const credentials = {
        username: process.env.USER_NAME_0,
        password: process.env.PASSWORD_0,
    };
    await browser.reloadSession();
    const elementFactory = new ElementFactory({ browser });
    const loginPage = new LoginPage(elementFactory);
    await loginPage.openPage();
    await loginPage.login(credentials);
    await browser.pause(2000);
    this.currentPage = PageFactory.getPageInstance('Launches', { browser });
});

After(async function () {
    await browser.deleteCookies();
    this.currentPage = null;
});
