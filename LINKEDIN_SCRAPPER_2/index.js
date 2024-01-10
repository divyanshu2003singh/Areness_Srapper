// const puppeteer = require('puppeteer');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// let USERNAME = 'chhv26@gmail.com';
// let PASSWORD = 'Chhavigupta@809';
// let USERKEYWORDS = 'cosmetics';
// let MAX_PAGES = 2;
// let CSV_FILE_PATH = 'test1.csv';

// (async () => {
//     try {
//         const browser = await puppeteer.launch({
//             headless: false,
//             defaultViewport: null,
//             args: ["--start-maximized"],
//         });

//         const page = await browser.newPage();

//         // Navigate to LinkedIn login page
//         await page.goto("https://www.linkedin.com/checkpoint/lg/login");

//         // Login to LinkedIn
//         await page.type("#username", USERNAME);
//         await page.type("#password", PASSWORD);
//         await page.click('.login__form_action_container');
//         await page.waitForNavigation();
//         console.log('Logged in successfully.');

//         // Perform LinkedIn search and apply filters
//         await page.waitForSelector('.search-global-typeahead__input');
//         await page.click('.search-global-typeahead__input');

//         // Take user input for keywords
//         await page.type('.search-global-typeahead__input', USERKEYWORDS);
//         await page.keyboard.press('Enter');
//         await page.waitForTimeout(5000);
//         console.log('Search and navigation successful.');

//         const profiles = [];

//         for (let currentPage = 1; currentPage <= MAX_PAGES; currentPage++) {
//             // Build the URL with the extracted geoUrn for subsequent pages
//             const url = `https://www.linkedin.com/search/results/companies/?companyHqGeo=%5B%22102713980%22%5D&keywords=cosmetics&origin=FACETED_SEARCH&sid=up%3B&page=${currentPage}`;

//             await page.goto(url);
//             await page.waitForTimeout(5000);

//             const results = await page.evaluate(() => {
//                 const data = [];
            
//                 const items = document.querySelectorAll('.reusable-search__result-container');
                
//                 items.forEach(item => {
//                     const nameElement = item.querySelector('.entity-result__title-text a');
//                     const linkedinLinkElement = item.querySelector('.app-aware-link');
//                     const locationElement = item.querySelector('.entity-result__primary-subtitle');
//                     const imageElement = item.querySelector('img.ivm-view-attr__img--centered');
            
//                     const companyName = nameElement ? nameElement.textContent.trim() : 'N/A';
//                     const linkedinLink = linkedinLinkElement ? linkedinLinkElement.getAttribute('href') : 'N/A';
//                     const companyLocation = locationElement ? locationElement.textContent.trim() : 'N/A';
//                     const imageLink = imageElement ? imageElement.getAttribute('src') : 'N/A';
            
//                     data.push({
//                         name: companyName,
//                         linkedinProfileUrl: linkedinLink,
//                         logo: imageLink,
//                         location: companyLocation
//                     });
//                 });
            
//                 return data;
//             });
            
//             profiles.push(...results);
            
//         }

//         console.log('Extracted data:', profiles);

//         const csvWriter = createCsvWriter({
//             path: CSV_FILE_PATH || 'linkedin_profiles.csv',
//             header: [
//                 { id: 'name', title: 'Name' },
//                 { id: 'linkedinProfileUrl', title: 'LinkedIn Profile URL' },
//                 { id: 'logo', title: 'Logo' },
//                 { id: 'location', title: 'Location' }
//             ]
//         });

//         const records = profiles.map(profile => ({
//             name: profile.name,
//             linkedinProfileUrl: profile.linkedinProfileUrl,
//             logo: profile.logo,
//             location: profile.location
//         }));

//         await csvWriter.writeRecords(records);

//         console.log('CSV file created successfully.');

//     } catch (error) {
//         console.error('Error occurred: ', error);
//     } 
// })();










/////////////////




const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let USERNAME = 'chhv26@gmail.com';
let PASSWORD = 'Chhavigupta@809';
let USERKEYWORDS = 'cosmetics';
let MAX_PAGES = 2;
let CSV_FILE_PATH = 'test1.csv';

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
        });

        const page = await browser.newPage();

        // Navigate to LinkedIn login page
        await page.goto("https://www.linkedin.com/checkpoint/lg/login");

        // Login to LinkedIn
        await page.type("#username", USERNAME);
        await page.type("#password", PASSWORD);
        await page.click('.login__form_action_container');
        await page.waitForNavigation();
        console.log('Logged in successfully.');

        // Perform LinkedIn search and apply filters
        await page.waitForSelector('.search-global-typeahead__input');
        await page.click('.search-global-typeahead__input');

        // Take user input for keywords
        await page.type('.search-global-typeahead__input', USERKEYWORDS);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(5000);
        console.log('Search and navigation successful.');

        const profiles = [];

        for (let currentPage = 1; currentPage <= MAX_PAGES; currentPage++) {
            // Build the URL with the extracted geoUrn for subsequent pages
            const url = `https://www.linkedin.com/search/results/companies/?companyHqGeo=%5B%22102713980%22%5D&keywords=cosmetics&origin=FACETED_SEARCH&sid=up%3B&page=${currentPage}`;

            await page.goto(url);
            await page.waitForTimeout(5000);

            const results = await page.evaluate(() => {
                const data = [];
            
                const items = document.querySelectorAll('.reusable-search__result-container');
            
                items.forEach(item => {
                    const nameElement = item.querySelector('.entity-result__title-text a');
                    const linkedinLinkElement = item.querySelector('.app-aware-link');
                    const locationElement = item.querySelector('.entity-result__primary-subtitle');
                    const imageElement = item.querySelector('img.ivm-view-attr__img--centered');
            
                    const companyName = nameElement ? nameElement.textContent.trim() : 'N/A';
                    const linkedinLink = linkedinLinkElement ? linkedinLinkElement.getAttribute('href') : 'N/A';
                    const locationAndIndustry = locationElement ? locationElement.textContent.trim() : 'N/A';
            
                    // Split locationAndIndustry into location and industry
                    const [industry, location] = locationAndIndustry.split(' • ').map(item => item.trim());
            
                    const imageLink = imageElement ? imageElement.getAttribute('src') : 'N/A';
            
                    data.push({
                        name: companyName,
                        linkedinProfileUrl: linkedinLink,
                        logo: imageLink,
                        location: location || 'N/A',
                        industry: industry || 'N/A'
                    });
                });
            
                return data;
            });
            
            profiles.push(...results);
        }

        console.log('Extracted data:', profiles);

        const csvWriter = createCsvWriter({
            path: CSV_FILE_PATH || 'linkedin_profiles.csv',
            header: [
                { id: 'name', title: 'Name' },
                { id: 'linkedinProfileUrl', title: 'LinkedIn Profile URL' },
                { id: 'logo', title: 'Logo' },
                { id: 'location', title: 'Location' },
                { id: 'industry', title: 'Industry' } // New field for industry
            ]
        });
        

        const records = profiles.map(profile => ({
            name: profile.name,
            linkedinProfileUrl: profile.linkedinProfileUrl,
            logo: profile.logo,
            location: profile.location,
            industry: profile.industry
        }));
        
        await csvWriter.writeRecords(records);

        console.log('CSV file created successfully.');

    } catch (error) {
        console.error('Error occurred: ', error);
    } 
})();


