import { test } from '@playwright/test';
import { ApplicationUrl } from '../pages/ApplicationUrl';
import { BasePage } from '../pages/BasePage';
import { Swag } from '../pages/Swag';

test.describe('login', async () => {
    let basePage: BasePage;
    let swag: Swag;



    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        swag = new Swag(page);
    })

    test.afterEach(async ({ context }) => {
        await context.clearCookies();
    })

    test('login to sauce', async () => {
        await test.step('login', async () => {
            await basePage.loadApplication(ApplicationUrl.SAUCE_DEMO);
            await swag.login('standard_user', 'secret_sauce');
            await swag.validateLogin('https://www.saucedemo.com/inventory.html');
        })
    })
})