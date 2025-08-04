import { defineParameterType } from '@cucumber/cucumber';
import {wordsToNumbers} from 'words-to-numbers';
import {camelCaseTransformer} from '../utils/utils.js';

defineParameterType({
    name: 'index',
    regexp: /first|second|third|fourth|fifth|sixth|seventh|eighth|ninth/,
    transformer: (index) => wordsToNumbers(index) - 1,
});

defineParameterType({
    name: 'element',
    regexp: /"([^"]*)" element/,
    transformer: (element) => camelCaseTransformer(element)
});

defineParameterType({
    name: 'collection',
    regexp: /"([^"]*)" collection/,
    transformer: (element) => camelCaseTransformer(element)
});
