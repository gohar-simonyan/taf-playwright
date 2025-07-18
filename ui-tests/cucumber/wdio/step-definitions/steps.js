import {Given, When, Then} from '@cucumber/cucumber';
import * as testData from '../../test-data/testData.js';
import PageFactory from '../page-objects/page.factory.js';
import assert from 'assert';

Given('I navigate to {string} page', async function (pageName) {
    this.currentPage = PageFactory.getPageInstance(pageName, browser);
    await this.currentPage.openPage();
});

When('I wait {int} ms', async function (ms) {
    await browser.pause(ms);
});

When('I get {element} text and save as {string}', async function (element, key) {
    const elementLocator = await this.currentPage[element];
    this[key] = await elementLocator.getText();
});

When('I click on {index} {element}', async function (index, element) {
    const locator = await this.currentPage[element];
    const indexedElement = locator[index];
    await indexedElement.click();
});

When('I click on {element}', async function (element) {
    const locator = await this.currentPage[element];
    await locator.click();
});

When('I reload {string} page', async function (pageName) {
    this.currentPage = PageFactory.getPageInstance(pageName, browser);
    await browser.refresh();
});

Then('{collection} should equal {string} data', async function (collection, data) {
    const collectionLocator = await this.currentPage[collection];
    const actualText = await Promise.all(collectionLocator.map(async (element) => await element.getText()));
    const expectedText = testData[data];
    assert.deepEqual(actualText, expectedText, `Expected "${actualText}" to equal "${expectedText}"`);
});

Then('{collection} should not include {string} member', async function (collection, member) {
    const collectionLocator = await this.currentPage[collection];
    const memberText = this[member];
    const actualText = await Promise.all(collectionLocator.map(async (element) => await element.getText()));
    const matchingElements = actualText.includes(memberText);
    assert.strictEqual(matchingElements, false, `Expected "${memberText}" not to be included in collection`);
});
