import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class Swag extends BasePage {
    private username = '#user-name';
    private password = '#password';
    private loginButton = '#login-button';

    public async login(userName: string, passwordText: string) {
        await this.fillText(this.username, userName);
        await this.fillText(this.password, passwordText)
        await this.clickElement(this.loginButton);
    }

    public async validateLogin(url: string) {
        const urlAddress = this.page.url();
        expect(urlAddress).toBe(url);
    }
}