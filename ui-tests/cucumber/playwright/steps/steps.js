import {Given, When, Then} from '@cucumber/cucumber';
import {expect} from '@playwright/test';
import * as testData from '../../test-data/testData.js';
import { PageFactory } from '../page-object/pageFactory.js';

Given('I navigate to {string} page', async function (pageName) {
    this.currentPage = PageFactory.getPageInstance(pageName, this.page);
    await this.currentPage.openPage();
});

When('I get {element} text and save as {string}', async function (element, key) {
    const elementLocator = this.currentPage[element];
    this[key] = await elementLocator.first().textContent();
});

When('I click on {index} {element}', async function (index, element) {
    const locator = this.currentPage[element].nth(index);
    await locator.click();
});

When('I click on {element}', async function (element) {
    const locator = this.currentPage[element];
    await locator.click();
});

When('I reload {string} page', async function (pageName) {
    this.currentPage = PageFactory.getPageInstance(pageName, this.page);
    await this.currentPage.reload();
});

Then('{collection} should equal {string} data', async function (collection, data) {
    await expect(this.currentPage[collection]).toHaveText(testData[data], { useInnerText: true });
});

Then('{collection} should not include {string} member', async function (collection, member) {
    const collectionLocator = this.currentPage[collection];
    const filteredLocator = collectionLocator.filter({ hasText: this[member] });
    await expect(filteredLocator).toHaveCount(0);
});
