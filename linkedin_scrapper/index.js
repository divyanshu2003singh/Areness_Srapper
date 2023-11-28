
    let USERNAME = 'd04032004singh@gmail.com';   
    let PASSWORD = 'Divyanshu@password@1234';
    let USERKEYWORDS = '"Founder"OR"Co-Founder"OR"cofounder"OR"owner"';
    let MAX_PAGES = 100;
    let CSV_FILE_PATH = 'delhi.csv';





const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs/promises');

(async () => {
    try {
        // Read configuration file
        // const configFile = await fs.readFile('config.json', 'utf-8');
        // const config = JSON.parse(configFile);

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

        // Perform LinkedIn search and apply filters
        await page.waitForSelector('.search-global-typeahead__input');
        await page.click('.search-global-typeahead__input');

        // Take user input for keywords
        await page.type('.search-global-typeahead__input', USERKEYWORDS);

        await page.keyboard.press('Enter');
        await page.waitForNavigation();

        await page.waitForSelector('.search-reusables__primary-filter');
        await page.evaluate(() => {
            const peopleButton = document.querySelector('.search-reusables__primary-filter button');
            if (peopleButton) {
                peopleButton.click();
            }
        });

        await page.waitForSelector('.search-reusables__all-filters-pill-button');
        await page.click('.search-reusables__all-filters-pill-button');

       
       

        await page.waitForTimeout(2000);

        await page.waitForSelector('.search-reusables__secondary-filters-show-results-button');
        await page.click('.search-reusables__secondary-filters-show-results-button');

        await page.waitForTimeout(5000);

        

        const profiles = [];

        for (let currentPage = 1; currentPage <= MAX_PAGES; currentPage++) {
            // Build the URL with the extracted geoUrn for subsequent pages
            const url = `https://www.linkedin.com/search/results/people/?geoUrn=%5B%22104869687%22%2C%22100839447%22%2C%22106442238%22%2C%22106187582%22%5D&industry=%5B%2219%22%5D&keywords=%22Founder%22OR%22Co-Founder%22OR%22cofounder%22OR%22owner%22&origin=FACETED_SEARCH&sid=q!N&page=${currentPage}`;

            await page.goto(url);
            await page.waitForTimeout(5000);


            const results = await page.evaluate(() => {
                const data = [];
                const results = document.querySelectorAll('.entity-result__item');
                const nameRegex = /^(.*?)View .*?$/;
            
                // Inside the loop where you extract results
                results.forEach(result => {
                    const nameElement = result.querySelector('.entity-result__title-text a');
                    const nameMatch = nameElement.textContent.trim().match(/^(.*?)View .*?$/);
                    const name = nameMatch ? nameMatch[1].trim() : 'N/A'; // Use 'N/A' if cleanName is not present
            
                    // Remove unnecessary information like degrees of connection
                    const cleanName = name.replace(/(?:• \d+(?:st|nd|rd|th) degree connection)/g, '').trim();
            
                    const profileUrl = nameElement ? nameElement.href : 'N/A'; // Use 'N/A' if profileUrl is not present
                    const designationElement = result.querySelector('.entity-result__primary-subtitle');
                    const designation = designationElement ? designationElement.textContent.trim() : 'N/A';
            
                    const locationElement = result.querySelector('.entity-result__secondary-subtitle');
                    const location = locationElement ? locationElement.textContent.trim() : 'N/A';
            
                    data.push({
                        name: cleanName,
                        profileUrl,
                        designation,
                        location
                    });
                });
            
                return data;
            });

            profiles.push(...results);
        }

        const csvWriter = createCsvWriter({
            path: CSV_FILE_PATH || 'linkedin_profiles.csv', // Use config.csvFilePath if available, otherwise default to 'linkedin_profiles.csv'
            header: [
                { id: 'name', title: 'Name' },
                { id: 'profileUrl', title: 'Profile URL' },
                { id: 'designation', title: 'Designation' },
                { id: 'location', title: 'Location' }
            ]
        });

        const records = profiles.map(profile => ({
            name: profile.name,
            profileUrl: profile.profileUrl,
            designation: profile.designation,
            location: profile.location
        }));

        await csvWriter.writeRecords(records);

        console.log('Data extracted and CSV file created successfully.');

    } catch (error) {
        console.error("Error occurred: ", error);
    } 
})();




