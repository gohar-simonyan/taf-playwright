import {Given, When, Then} from '@cucumber/cucumber';
import {expect} from '@playwright/test';
import * as testData from '../test-data/testData.js';
import { PageFactory } from '../page-object/pageFactory.js';
import { camelCaseTransformer } from '../utils/utils.js';
import { wordsToNumbers } from 'words-to-numbers';

Given('I navigate to {string} page', async function (pageName) {
    this.currentPage = PageFactory.getPageInstance(pageName, this.page);
    await this.currentPage.openPage();
});

When('I get {string} element text and save as {string}', async function (element, key) {
    const elementLocator = this.currentPage[camelCaseTransformer(element)];
    this[key] = await elementLocator.first().textContent();
});

When('I click on {string} {string} element', async function (index, element) {
    const resolvedIndex = wordsToNumbers(index) - 1;
    const locator = this.currentPage[camelCaseTransformer(element)].nth(resolvedIndex);
    await locator.click();
});

When('I click on {string} element', async function (element) {
    const locator = this.currentPage[camelCaseTransformer(element)];
    await locator.click();
});

When('I reload {string} page', async function (pageName) {
    this.currentPage = PageFactory.getPageInstance(pageName, this.page);
    await this.currentPage.reload();
});

Then('{string} collection should equal {string} data', async function (collection, data) {
    await expect(this.currentPage[camelCaseTransformer(collection)]).toHaveText(testData[data], { useInnerText: true });
});

Then('{string} collection should not include {string} member', async function (collection, member) {
    const collectionLocator = this.currentPage[camelCaseTransformer(collection)];
    const filteredLocator = collectionLocator.filter({ hasText: this[member] });
    await expect(filteredLocator).toHaveCount(0);
});