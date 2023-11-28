const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
let initialUrl;


// Main function using an immediately-invoked async function expression (IIFE)
(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
        });

        const page = await browser.newPage();


        await page.goto("https://app.apollo.io/#/login");

        await page.waitForSelector('input[name="email"]');
        await page.waitForSelector('input[name="password"]');
        await page.waitForSelector('button[type="submit"]');

        await page.type('input[name="email"]', 'divyanshu.singh@arenessconsulting.com');
        await page.type('input[name="password"]', 'Divyanshu@123');

        await page.click('button[type="submit"]');

        await page.waitForNavigation();
        await page.waitForSelector('.zp-icon.apollo-icon-search');

        await page.click('.zp-icon.apollo-icon-search');

        await page.waitForNavigation();
        initialUrl = page.url();


        await page.waitForSelector('button[data-cy="finder-filter-button"]', {
            visible: true
        });

        await page.waitForTimeout(9000);

        await page.click('button[data-cy="finder-filter-button"]');

        await page.waitForSelector('tbody.zp_RFed0 tr.zp_cWbgJ');

        await page.waitForSelector('button.zp-button.zp_zUY3r.zp_n9QPr.zp_MCSwB', {
            visible: true
        });

        let data = [];
        for (let currentPage = 1; currentPage <= 5; currentPage++) {
            // Append the current page number to the URL
            const pageUrl = `https://app.apollo.io/#/people?finderViewId=5b6dfc5a73f47568b2e5f11c&personTitles[]=founder&personTitles[]=founder%20and%20ceo&personTitles[]=co%20founder%20and%20ceo&personTitles[]=owner&page=${currentPage}&organizationIndustryTagIds[]=5567cd82736964540d0b0000&personLocations[]=Delhi%2C%20India`;
            await page.goto(pageUrl);
            await page.waitForTimeout(5000);


            const currentPageData = await page.evaluate(async () => {
                const rows = document.querySelectorAll('tbody.zp_RFed0 tr.zp_cWbgJ');
                const rowData = [];
                for (const row of rows) {
                    const linkedinLinkElement = row.querySelector('div.zp_I1ps2 a[href^="http://www.linkedin.com/in/"]');
                    const companyLinkedinElement = Array.from(row.querySelectorAll('div.zp_I1ps2 span a')).find(link => link.getAttribute('href').includes('linkedin.com/company/'));
                    const companyLinkedinLink = companyLinkedinElement ? companyLinkedinElement.getAttribute('href') : 'N/A';
                    const nameElement = row.querySelector('div.zp_xVJ20 a');
                    const titleElement = row.querySelector('td.zp_aBhrx:nth-child(2) span.zp_Y6y8d');
                    const contactLocationElement = row.querySelector('td.zp_aBhrx:nth-child(5) > span.zp_Y6y8d');
                    const appoloIdElement = row.querySelector('div.zp_xVJ20 a');

                    const appoloIdLink = appoloIdElement ? appoloIdElement.getAttribute('href') : '';
                    const completeAppoloLink = appoloIdLink ? `https://app.apollo.io${appoloIdLink}` : '';

                    let contactLocation = 'N/A';
                    if (contactLocationElement) {
                        contactLocation = contactLocationElement.textContent.replace(/\s+/g, ' ').trim();
                    }

                    const industryElement = row.querySelector('td.zp_aBhrx:nth-child(8) span.zp_lm1kV');
                    let industry = 'N/A';

                    if (industryElement) {
                        industry = industryElement.textContent.trim();
                    }
                    const companyLogoElement = row.querySelector('span.zp_IL7J9 img');
                    const companyLinkElement = row.querySelector('div.zp_I1ps2 a.zp-link.zp_OotKe:not([href*="linkedin.com"])');
                    const companyNameElement = row.querySelector('td.zp_aBhrx div.zp_J1j17 a.zp_WM8e5');

                    const companyLogo = companyLogoElement ? companyLogoElement.getAttribute('src') : 'N/A';
                    const companyLink = companyLinkElement ? companyLinkElement.getAttribute('href') : 'N/A';
                    const companyName = companyNameElement ? companyNameElement.textContent.trim() : 'N/A';

                    rowData.push([
                        linkedinLinkElement ? linkedinLinkElement.getAttribute('href') : '',
                        companyLinkedinLink,
                        nameElement ? nameElement.textContent.trim() : '',
                        titleElement ? titleElement.textContent.trim() : '',
                        contactLocation,
                        completeAppoloLink,
                        industry,
                        companyLogo,
                        companyLink,
                        companyName,
                    ]);
                }

                return rowData;
            });
            data = data.concat(currentPageData);

        }
        // Create CSV headers and data
        const csvHeaders = ['LinkedIn Link', 'Company LinkedIn', 'Name', 'Title', 'Contact Location', 'AppoloID', 'Industry', 'Company Logo', 'Company Link', 'Company Name'];
        const csvRows = [csvHeaders.join(',')];

        // Convert data to CSV format
        data.forEach(rowData => {
            const row = rowData.map(value => `"${value}"`);
            csvRows.push(row.join(','));
        });

        // Write to CSV file
        const csvFileName = 'output.csv';
        fs.writeFileSync(csvFileName, csvRows.join('\n'));

        // Log a message indicating that data has been extracted and saved to a CSV file
        console.log('Data extracted and saved to CSV:', csvFileName);

    } catch (error) {
        console.error("Error occurred: ", error);
        console.error(error.stack);
    }

})();