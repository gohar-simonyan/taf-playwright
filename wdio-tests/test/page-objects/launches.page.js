export class LaunchesPage {

    get columnTitles() {
        return $$('.gridHeader__grid-header--KArbb>div');
    }

    get launchItemName() {
        return $('.itemInfo__item-info--K7BYP:not([style]) > .itemInfo__main-info--uYMpQ');
    }

    get launchItemNames() {
        return $$('.itemInfo__item-info--K7BYP:not([style]) > .itemInfo__main-info--uYMpQ');
    }

    get launchItemCheckboxes() {
        return $('.checkIcon__square--Exwkc');
    }

    get hamburgerMenu() {
        return $$('.hamburger__hamburger--F5UVO');
    }

    get deleteOption() {
        return $$('.hamburgerMenuItem__hamburger-menu-item--oPTFm');
    }

    get deleteSubmitButton() {
        return $('.bigButton__color-tomato--jXOiC');
    }

    get actionsButton() {
        return $('.ghostMenuButton__ghost-menu-button--xMrXq');
    }

    get compareOption() {
        return $('.ghostMenuButton__menu--xPeTl>div:nth-child(3)');
    }

    get diagram() {
        return $('.c3-event-rect');
    }

    async openPage() {
        await browser.url(`${process.env.BASE_USER}launches/all`);
    }
}
