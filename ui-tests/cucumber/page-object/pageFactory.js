import { LaunchesPage } from './launchesPage.js';
import { DashboardPage } from './dashboardPage.js';

export class PageFactory {
    static getPageInstance(pageName, page) {
        switch (pageName) {
            case 'Launches':
                return new LaunchesPage(page);
            case 'Dashboard':
                return new DashboardPage(page);
            default:
                throw new Error(`Unknown page: ${pageName}. Please define it in the PageFactory.`);
        }
    }
}