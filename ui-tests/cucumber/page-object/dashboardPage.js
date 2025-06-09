export class DashboardPage {

    url = 'dashboard';

    constructor(page) {
        this.page = page;
    }

    get title() {
        return this.page.getByTitle('All Dashboards');
    }

    async openPage() {
        await this.page.goto(`${this.url}`);
    }
}