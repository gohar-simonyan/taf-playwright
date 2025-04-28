import { expect } from '@playwright/test';
import test from '../fixtures/fixture';
import { launchesTableTitles } from '../test-data/test-data';

test.describe('Check Ui', () => {
    test.beforeEach(async ({launchesPage}) => {
        await launchesPage.openPage();
    });

    test('Check table columns names', async ({launchesPage}) => {
        await expect(launchesPage.elements.columnTitles).toHaveText(launchesTableTitles, {useInnerText: true});
    });
});