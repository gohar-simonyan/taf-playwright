import { StepFn } from '../types';
import {expect} from '@playwright/test';
import * as testData from '../test-data/test-data';
import logger from '../utils/logger';

export const stepImplementations: Record<string, StepFn> = {
    'I navigate to {pageName}': async ({ ctx, params }, ) => {
        const { pageName } = params!;

        const pageObject = ctx[`${pageName.toLowerCase()}Page`];
        if (!pageObject) {
            logger.error(`Page object for "${pageName}" not found in context`);
        }
        await pageObject.openPage();
    },

    'I reload {pageName}': async ({ ctx, params }, ) => {
        const { pageName } = params!;

        const pageObject = ctx[`${pageName.toLowerCase()}Page`];
        if (!pageObject) {
            logger.error(`Page object for "${pageName}" not found in context`);
        }
        await pageObject.reload();
    },

    'I expect {element} to be visible': async ({ ctx, params }, ) => {
        const { element } = params!;
        if (!element) {
            logger.error('element parameter is required for this step.');
        }
        const pageObject = Object.values(ctx).find(
            (po: any) => po[element]
        );
        if (!pageObject || !pageObject[element]) {
            logger.error(`The element "${element}" was not found in the context.`);
        }
        const elementLocator = pageObject[element];
        await expect(elementLocator).toBeVisible();
    },
    'I expect {collection} to equal {data}': async ({ ctx, params }) => {
        const { collection, data } = params!;

        if (!collection || !data) {
            logger.error('Both "element" and "text" parameters are required for this step.');
        }

        if(!testData || !testData[data]) {
            logger.error('Test data is undefined.');
        }

        const pageObject = Object.values(ctx).find(
            (po: any) => po[collection]
        );
        if (!pageObject || !pageObject[collection]) {
            logger.error(`The element "${collection}" was not found in the context.`);
        }
        const elementLocator = pageObject[collection];
        await expect(elementLocator).toHaveText(testData[data], { useInnerText: true });
    },
    'I click on {element}': async ({ ctx, params }) => {
        const { element } = params!;
        if (!element) {
            logger.error('"element" parameter is required.');
        }

        const pageObject = Object.values(ctx).find(
            (po: any) => po[element]
        );
        if (!pageObject || !pageObject[element]) {
            logger.error(`The element "${element}" was not found in the context.`);
        }
        const elementLocator = pageObject[element];
        await elementLocator.click();
    },
    'I click on {element} by index {index}': async ({ ctx, params }) => {
        const { element, index } = params!;
        if (!element) {
            logger.error('"element" parameter is required.');
        }

        const pageObject = Object.values(ctx).find(
            (po: any) => po[element]
        );
        if (!pageObject || !pageObject[element]) {
            logger.error(`The element "${element}" was not found in the context.`);
        }
        let elementLocator = pageObject[element];

        if (typeof index !== 'undefined') {
            elementLocator = elementLocator.nth(parseInt(index, 10));
        }
        await elementLocator.click();
    },
    '{collection} should not include {member}': async ({ ctx, params }) => {
        const { collection, member } = params!;
        if (!collection || !member) {
            logger.error('Both "collection" and "member" parameters are required for this step.');
        }

        const resolvedMember = ctx.shared[member] || member;

        const pageObject = Object.values(ctx).find(
            (po: any) => po[collection]
        );
        if (!pageObject || !pageObject[collection]) {
            logger.error(`The element "${collection}" was not found in the context.`);
        }
        const collectionLocator = pageObject[collection];
        const filteredLocator = collectionLocator.filter({ hasText: resolvedMember });
        await expect(filteredLocator).toHaveCount(0);
    },

    'I get {element} text and save as {key}': async ({ ctx, params }) => {
        const { element, key } = params!;
        if (!element || !key) {
           logger.error('Both "element" and "key" parameters are required for this step.');
        }

        const pageObject = Object.values(ctx).find(
            (po: any) => po[element]
        );
        if (!pageObject || !pageObject[element]) {
            logger.error(`The element "${element}" was not found in the context.`);
        }

        const elementLocator = pageObject[element];

        const textContent = await elementLocator.first().textContent();
        if (textContent === null || textContent.trim() === '') {
            logger.error(`The element "${element}" does not contain any text or is empty.`);
        }
        ctx.shared[key] = textContent.trim();
        logger.info(`Saved "${textContent.trim()}" as "${key}" in shared context.`);
    },
};