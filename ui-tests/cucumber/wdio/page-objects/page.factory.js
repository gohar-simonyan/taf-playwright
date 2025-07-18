import { LaunchesPage } from './launches.page.js';

export default class PageFactory {
    static getPageInstance(pageName) {
        switch (pageName) {
            case 'Launches':
                return new LaunchesPage();
            default:
                throw new Error(`Unknown page: ${pageName}. Please define it in the PageFactory.`);
        }
    }
}
