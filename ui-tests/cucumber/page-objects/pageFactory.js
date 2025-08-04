import { LaunchesPage } from './launchesPage.js';
import { ElementFactory } from './ElementFactory.js';

export default class PageFactory {
    static getPageInstance(pageName, context) {
        const elementFactory = new ElementFactory(context);

        switch (pageName) {
            case 'Launches':
                return new LaunchesPage(elementFactory);
            default:
                throw new Error(`Unknown page: ${pageName}. Please define it in the PageFactory.`);
        }
    }
}
