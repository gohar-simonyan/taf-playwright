export class LaunchesPage {
    constructor(elementFactory) {
        this.elementFactory = elementFactory;
        this.url = 'launches/all';
    }

    get columnTitles() {
        return this.elementFactory.allBySelector('.gridHeader__grid-header--KArbb>div');
    }

    get launchItemName() {
        return this.elementFactory.bySelector('.itemInfo__item-info--K7BYP:not([style]) > .itemInfo__main-info--uYMpQ');
    }

    get launchItemNames() {
        return this.elementFactory.allBySelector('.itemInfo__item-info--K7BYP:not([style]) > .itemInfo__main-info--uYMpQ');
    }

    get launchItemCheckboxes() {
        return this.elementFactory.allBySelector('.checkIcon__square--Exwkc');
    }

    get hamburgerMenu() {
        return this.elementFactory.allBySelector('.hamburger__hamburger--F5UVO');
    }

    get deleteOption() {
        return this.elementFactory.allBySelector('.hamburgerMenuItem__hamburger-menu-item--oPTFm');
    }

    get deleteSubmitButton() {
        return this.elementFactory.byRole('button', { name: 'Delete' });
    }

    get actionsButton() {
        return this.elementFactory.bySelector('.ghostMenuButton__ghost-menu-button--xMrXq');
    }

    get compareOption() {
        return this.elementFactory.getByText('Compare');
    }

    get diagram() {
        return this.elementFactory.bySelector('.c3-event-rect');
    }

    async openPage() {
        await this.elementFactory.navigateTo(`${process.env.BASE_USER_0}${this.url}`);
    }

    async reload() {
        await this.elementFactory.reloadPage();
    }
}
