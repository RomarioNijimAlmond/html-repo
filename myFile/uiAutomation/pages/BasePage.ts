import { expect, Page } from "@playwright/test";
import { Locator } from "@playwright/test";
import { ApplicationUrl } from "./ApplicationUrl";

export class BasePage {
    constructor(public page: Page) {
        this.page = page;
    }

    public async loadApplication(url: ApplicationUrl) {
        await this.page.goto(url.valueOf(), {
            waitUntil: 'domcontentloaded',
        });
    }

    public async fillText(element: (string | Locator), text: string) {
        const locatorElement = element as Locator;
        if (typeof element === 'string') {
            await this.page.locator(element).click();
            await this.page.locator(element).fill(text);
        }
        else if (element === locatorElement) {
            await element.click();
            await element.fill(text);
        }
    }

    public async clickElement(element: (string | Locator | undefined)) {
        const locatorElement = element as Locator;
        if (typeof element === 'string') {
            await this.page.locator(element).click({ force: true });
        }
        else if (element === locatorElement) {
            await element.click({ force: true });
        }
    }

    public async waitForVisiblityOfElement(element: (string | Locator), visibilityTimeout?: number) {
        const elementLocator = element as Locator;
        if (typeof element === 'string') {
            const domLocator = this.page.locator(element);
            await domLocator.waitFor({ state: "visible", timeout: visibilityTimeout });
        } else if (element === elementLocator) {
            await element.waitFor({ state: "visible" });
        }

    }

    public async waitForInvisibiltyOfElement(element: (string | Locator)) {
        const elementLocator = element as Locator;
        if (typeof element === 'string') {
            const domLocator = this.page.locator(element);
            await domLocator.waitFor({ state: "hidden" });
        } else if (element === elementLocator) {
            await element.waitFor({ state: "hidden" });
        }
    }


    public async hover(locator: string) {
        const element = this.page.locator(locator);
        await element.hover();
    }

    public async alertAccept() {
        this.page.on('dialog', async (dialog) => await dialog.accept());
    }

    public async alertDismiss() {
        this.page.on('dialog', dialog => {
            dialog.dismiss();
        });
    }

    public async alertGetText() {
        this.page.on('dialog', dialog => {
            dialog.message();
        });
    }

    public async alertGetTextAndAccept(text: string) {
        this.page.on('dialog', async (dialog) => {
            const message = dialog.message();
            await this.waitForVisiblityOfElement(message);
            if (message.trim().includes(text)) {
                expect(message).toContain(text);
                await dialog.accept();
            } else {
                throw new Error(`the actual alert text does not contain the expected alert text`);
            }
        });
    }

    public async handlePopup(element: string, text: string) {
        const [popup] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.locator(element).click(),
        ]);
        await popup.waitForLoadState();
        const popupTitle = await popup.title();
        expect(popupTitle).toContain(text);
    }

    public async getInnerText(locator: string) {
        const element = this.page.locator(locator);
        return await element.innerText();
    }

    public async selectByIndex(locator: string, index: number) {
        const element = this.page.locator(locator);
        await element.nth(index).click();
    }

    public async typeText(element: (string | Locator), text: string) {
        const locatorElement = element as Locator
        if (typeof element === 'string') {
            await this.page.locator(element).type(text);
        } else if (element === locatorElement) {
            await element.type(text);
        }
    }

    public async pressEnter() {
        await this.page.keyboard.press('Enter');
    }

    public async waitUntilLoadingSpinnerIsInvisible(element: (string | Locator)) {
        await this.waitForVisiblityOfElement(element);
        await this.waitForInvisibiltyOfElement(element);
    }

    public async navigateBack() {
        await this.page.goBack();
    }

    /**
     * @description this function applies to checboxes and radio buttons
     * @param checkbox 
     */
    public async changeElementCheckBoxState(checkbox: (string | Locator)) {
        let checkBoxLocator = checkbox as Locator;
        if (typeof checkbox === 'string' && await this.page.locator(checkbox).isChecked() === false) {
            await this.page.locator(checkbox).check();
        } else if (checkbox === checkBoxLocator && await checkbox.isChecked() === false) {
            await checkbox.check();
        } else if (typeof checkbox === 'string' && await this.page.locator(checkbox).isChecked() === true) {
            await this.page.locator(checkbox).uncheck();
        } else if (checkbox === checkBoxLocator && await checkbox.isChecked() === true) {
            await checkbox.uncheck();
        }
    }

    public async selectOption(selectLocator: (string | Locator), options?: { label?: string, value?: string }) {
        const selectElement = selectLocator as Locator;
        if (typeof selectLocator === 'string' && options?.label !== undefined) {
            await this.page.locator(selectLocator).selectOption({ label: options.label })
        } else if (typeof selectLocator === 'string' && options?.value !== undefined) {
            await this.page.locator(selectLocator).selectOption({ value: options.value })
        } else if (selectLocator === selectElement && options?.label !== undefined) {
            await selectLocator.selectOption({ label: options.label });
        } else if (selectLocator === selectElement && options?.value !== undefined) {
            await selectLocator.selectOption({ value: options.value });
        }
    }

    /**
     * @description select option without specifying a label or a value property - select directly by the value that you put as a parameter or a variable
     */
    public async selecOptionWithoutSpecifyingValueProperties(selecLocator: (string | Locator), option: string) {
        const selectElement = selecLocator as Locator;
        if (typeof selecLocator === 'string') {
            await this.page.locator(selecLocator).selectOption(option);
        } else if (selecLocator === selectElement) {
            await selecLocator.selectOption(option);
        }
    }

    public async getCurrentFullDate() {
        let today = new Date();
        let currentDate: string = `${('0' + (today.getDate())).slice(-2)}-${('0' + (today.getMonth() + 1)).slice(-2)}-${today.getFullYear()}`;
        return currentDate;
    }

    public async getCurrentHourAndMinutes() {
        let hour = new Date();
        let currentHour: string = `${('0' + (hour.getHours())).slice(-2)}:${('0' + (hour.getMinutes())).slice(-2)}`;
        return currentHour;
    }

    public async getCurrentMonthAndYear() {
        let monthYear = new Date();
        let currentMonthAndYear: string = `${('0' + (monthYear.getMonth() + 1)).slice(-2)}-${monthYear.getFullYear()}`
        return currentMonthAndYear;
    }

    public async getCurrentDay() {
        let day = new Date();
        let currentDay: string = `${(day.getDate())}`;
        return currentDay;
    }

    public async getCurrentMonth() {
        let month = new Date();
        let currentMonth: string = `${('0' + (month.getMonth() + 1)).slice(-2)}`;
        return currentMonth;
    }

    public async getCurrentYear() {
        let year = new Date();
        let currentYear: string = `${year.getFullYear()}`;
        return currentYear;
    }

    public async scrollIntoViewIfNeeded(element: (string | Locator)) {
        const locatorElement = element as Locator;
        if (typeof element === 'string') {
            await this.page.locator(element).scrollIntoViewIfNeeded();
        } else {
            if (element === locatorElement) {
                await element.scrollIntoViewIfNeeded();
            }
        }
    }

    public async doubleClick(element: (string | Locator)) {
        const elementLocator = element as Locator;
        if (typeof element === 'string') {
            await this.page.locator(element).dblclick();
        } else if (element === elementLocator) {
            await element.dblclick();
        }
    }

    public async clearText(element: (string | Locator)) {
        const elementLocator = element as Locator;
        if (typeof element === 'string') {
            await this.page.locator(element).clear();
        } else if (element === elementLocator) {
            await element.clear();
        }
    }

    public async getCurrentUrl(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    public async pressKeyboadTab() {
        await this.page.keyboard.press('Tab');
    }

    public async refreshPage() {
        await this.page.reload();
    }
}