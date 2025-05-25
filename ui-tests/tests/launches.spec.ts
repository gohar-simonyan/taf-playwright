import test from '../fixtures/fixture';
import { Given, When, Then, And } from '../steps/gherkin';

test.describe('Check Ui', () => {
    test.beforeEach(async ({step}) => {
        await Given(step, 'I navigate to Launches page');
    });

    test('Check table columns names', async ({step}) => {
        await Then(step, 'I expect columnTitles collection to equal launchesTableTitles data');
    });

    test('Check removing launch functionality', async ({step}) => {
        await When(step, 'I get launchItemNames element text and save as launchName');
        await And(step, 'I click on hamburgerMenu element by index 0');
        await And(step, 'I click on deleteOption element by index 1');
        await And(step, 'I click on deleteSubmitButton element');
        await And(step, 'I reload Launches page');
        await Then(step, 'launchItemNames collection should not include launchName member');
    });

    test('Check comparing launches functionality', async ({step}) => {
        await When(step, 'I click on launchItemCheckboxes element by index 1');
        await And(step, 'I click on launchItemCheckboxes element by index 2');
        await And(step, 'I click on actionsButton element');
        await And(step, 'I click on compareOption element');
        await Then(step, 'I expect diagram element to be visible');
    });
});