export class LaunchesPage {
    url = 'launches/all';

    constructor( page) {
        this.page = page;
    }

    get columnTitles() {
        return this.page.locator('.gridHeader__grid-header--KArbb>div');
    }

    get launchItemNames() {
        return this.page.getByRole('cell').getByRole('link');
    }

    get launchItemCheckboxes() {
        return this.page.locator('.checkIcon__square--Exwkc');
    }

    get hamburgerMenu() {
        return this.page.locator('.hamburger__hamburger--F5UVO');
    }

    get deleteOption() {
        return this.page.getByText('Delete');
    }

    get deleteSubmitButton() {
        return this.page.getByRole('button', { name: 'Delete' });
    }

    get actionsButton() {
        return this.page.locator('.ghostMenuButton__ghost-menu-button--xMrXq');
    }

    get compareOption() {
        return this.page.getByText('Compare');
    }

    get diagram() {
        return this.page.locator('.c3-event-rect');
    }

    async openPage() {
        await this.page.goto(`${process.env.BASE_USER_0}${this.url}`);
    }

    async reload() {
        await this.page.reload();
    }
}