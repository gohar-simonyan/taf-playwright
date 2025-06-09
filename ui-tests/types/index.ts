import { Page } from 'playwright/test';

export type Context = Record<string, any>;

export type StepFn<TParams extends Record<string, any> = Record<string, any>> = (
    args: {
        page: Page;
        ctx: Context;
        params?: TParams;
    }
) => Promise<void>;

export type Step = (description: string, fn: StepFn) => Promise<void>;

export interface PageObject {
    readonly url: string;
    openPage(): Promise<void>;
}

export type Fixtures = {
    ctx: Context;
    step: Step;
    shared: Record<string, any>,
    [key: string]: any;
}