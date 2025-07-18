import { setWorldConstructor } from '@cucumber/cucumber';

export class CustomWorld {
    context;
    page;
    currentPage;

    constructor() {
        this.context = null;
        this.page = null;
        this.currentPage = null;
    }
}

setWorldConstructor(CustomWorld);
