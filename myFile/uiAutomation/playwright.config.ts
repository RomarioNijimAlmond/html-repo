import { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {

    timeout: 1000 * 1000,
    globalTimeout: 240000,


    reporter: [["html", { open: "never" }]],


    use: {
        trace: 'on',
        screenshot: 'on',
        ignoreHTTPSErrors: true,
        viewport: { width: 1400, height: 900 },

        video: {
            mode: 'retain-on-failure'
        },
        contextOptions: {},
        launchOptions: {
            headless: true,
            slowMo: 700,
        }
    },

    projects: [
        {
            name: 'Chrome Browser',
            use: {
                browserName: 'chromium',
                channel: 'chrome',
                viewport: { width: 1400, height: 900 },
            },
        },
        {
            name: 'Edge Browser',
            use: {
                browserName: 'chromium',
                channel: 'msedge',
                viewport: { width: 1400, height: 900 },
            }
        },
        {
            name: 'Firefox Browser',
            use: {
                browserName: 'firefox',
                channel: 'firefox',
                viewport: { width: 1400, height: 900 },
            }
        },
    ],
}

module.exports = config;
export default config;
