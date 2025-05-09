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

    test('Check removing launch functionality', async ({launchesPage}) => {
        const launchName = await launchesPage.elements.launchItemNames.first().textContent();
        await launchesPage.elements.hamburgerMenu.first().click();
        await launchesPage.elements.deleteOption.nth(1).click();
        await launchesPage.elements.deleteSubmitButton.click();
        await launchesPage.reload();
        await expect(
            launchesPage.elements.launchItemNames.filter({ hasText: launchName })
        ).toHaveCount(0);
    });

    test('Check comparing launches functionality', async ({launchesPage}) => {
        await launchesPage.elements.launchItemCheckboxes.nth(1).click();
        await launchesPage.elements.launchItemCheckboxes.nth(2).click();
        await launchesPage.elements.actionsButton.click();
        await launchesPage.elements.compareOption.click();
        await expect (launchesPage.elements.diagram).toBeVisible();
    });
});