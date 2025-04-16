import { expect } from '@playwright/test';
import test from '../fixtures/fixture';
import {launchesTableTitles} from "../test-data/test-data"

test.describe('Check Ui', () => {
    test.beforeEach(async ({launchesPage}) => {
        await launchesPage.openPage();
    });

    test('Check table columns names', async ({launchesPage}) => {
        await launchesPage.elements.tableHeader.waitFor({state: 'visible'});
        const actualTitles = await launchesPage.elements.columnTitles.allInnerTexts();
        expect(actualTitles).toEqual(launchesTableTitles);
    });
})