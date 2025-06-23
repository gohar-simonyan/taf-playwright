import { LaunchesPage } from './launchesPage.js';

export class PageFactory {
    static getPageInstance(pageName, page) {
        switch (pageName) {
            case 'Launches':
                return new LaunchesPage(page);
            default:
                throw new Error(`Unknown page: ${pageName}. Please define it in the PageFactory.`);
        }
    }
}