import { expect } from '@playwright/test';
import test from '../fixtures/fixture';
import { launchesTableTitles } from '../test-data/test-data';

test.describe('Check Ui', () => {
    test.beforeEach(async ({launchesPage}) => {
        await launchesPage.openPage();
    });

    test('Check table columns names', async ({launchesPage}) => {
        await expect(launchesPage.columnTitles).toHaveText(launchesTableTitles, {useInnerText: true});
    });

    test('Check removing launch functionality', async ({launchesPage}) => {
        const launchName = await launchesPage.launchItemNames.first().textContent();
        await launchesPage.hamburgerMenu.first().click();
        await launchesPage.deleteOption.nth(1).click();
        await launchesPage.deleteSubmitButton.click();
        await launchesPage.reload();
        await expect(
            launchesPage.launchItemNames.filter({ hasText: launchName })
        ).toHaveCount(0);
    });

    test('Check comparing launches functionality', async ({launchesPage}) => {
        await launchesPage.launchItemCheckboxes.nth(1).click();
        await launchesPage.launchItemCheckboxes.nth(2).click();
        await launchesPage.actionsButton.click();
        await launchesPage.compareOption.click();
        await expect (launchesPage.diagram).toBeVisible();
    });
});