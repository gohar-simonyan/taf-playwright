import { Step } from '../types';
import {stepImplementations} from './steps';
import logger from '../utils/logger';

const resolveStepDescription = (description: string): { resolvedDescription: string; inferredParams: Record<string, any> } => {
    const pagePattern = /(\w+) page/;
    const elementPattern = /(\w+) element/;
    const collectionPattern = /(\w+) collection/;
    const indexPattern = /by index (\d+)/;
    const keyPattern = /save as (\w+)/;
    const dataPattern = /(\w+) data/;
    const memberPattern = /(\w+) member/;

    const patterns = [
        { regex: pagePattern, key: 'pageName', placeholder: '{pageName}' },
        { regex: elementPattern, key: 'element', placeholder: '{element}' },
        { regex: dataPattern, key: 'data', placeholder: '{data}' },
        { regex: collectionPattern, key: 'collection', placeholder: '{collection}' },
        { regex: indexPattern, key: 'index', placeholder: 'by index {index}', transform: (v: string) => parseInt(v, 10) },
        { regex: memberPattern, key: 'member', placeholder: '{member}' },
        { regex: keyPattern, key: 'key', placeholder: 'save as {key}' },
    ];

    const inferredParams: Record<string, any> = {};
    let resolvedDescription = description;
    patterns.forEach(({ regex, key, placeholder, transform }) => {
        const match = description.match(regex);
        if (match) {
            inferredParams[key] = transform ? transform(match[1]) : match[1];
            resolvedDescription = resolvedDescription.replace(match[0], placeholder);
        }
    });
    return { resolvedDescription, inferredParams };
};

export const gherkinStep = async (
    step: Step,
    description: string,
    params: Record<string, any> = {},
) => {
    const { resolvedDescription, inferredParams } = resolveStepDescription(description);
    const finalParams = { ...inferredParams, ...params };
    const implementation = stepImplementations[resolvedDescription];
    if (!implementation) {
        logger.error(`Step implementation not found for description: "${resolvedDescription}"`);
    }

    await step(resolvedDescription, async (args) =>
        implementation({ ...args, params: finalParams })
    );
};

export const Given = gherkinStep;
export const When = gherkinStep;
export const Then = gherkinStep;
export const And = gherkinStep;
