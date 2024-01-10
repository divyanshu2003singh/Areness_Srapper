// const puppeteer = require('puppeteer');
// const cheerio = require('cheerio');
// const fs = require('fs');
// let initialUrl;


// // Main function using an immediately-invoked async function expression (IIFE)
// (async () => {
//     try {
//         const browser = await puppeteer.launch({
//             headless: false,
//             defaultViewport: null,
//             args: ["--start-maximized"],
//         });

//         const page = await browser.newPage();


//         await page.goto("https://app.apollo.io/#/login");

//         await page.waitForSelector('input[name="email"]');
//         await page.waitForSelector('input[name="password"]');
//         await page.waitForSelector('button[type="submit"]');

//         await page.type('input[name="email"]', 'satyam@arenessconsulting.com');
//         await page.type('input[name="password"]', 'Shiva@4321');

//         await page.click('button[type="submit"]');

//         await page.waitForNavigation();
//         await page.waitForSelector('.zp-icon.apollo-icon-search');

//         await page.click('.zp-icon.apollo-icon-search');

//         await page.waitForNavigation();
//         initialUrl = page.url();


//         await page.waitForSelector('button[data-cy="finder-filter-button"]', {
//             visible: true
//         });

//         await page.waitForTimeout(9000);

//         await page.click('button[data-cy="finder-filter-button"]');

//         await page.waitForSelector('tbody.zp_RFed0 tr.zp_cWbgJ');

//         await page.waitForSelector('button.zp-button.zp_zUY3r.zp_n9QPr.zp_MCSwB', {
//             visible: true
//         });

//         let data = [];
//         for (let currentPage = 1; currentPage <= 5; currentPage++) {
//             // Append the current page number to the URL
//             const pageUrl = `https://app.apollo.io/#/companies?finderViewId=5b8050d050a3893c382e9360&page=${currentPage}&organizationIndustryTagIds[]=5567e1ae73696423dc040000&organizationLocations[]=Punjab%2C%20India`;
//             await page.goto(pageUrl);
//             await page.waitForTimeout(5000);


//             const currentPageData = await page.evaluate(async () => {
//                 const rows = document.querySelectorAll('tbody.zp_RFed0 tr.zp_cWbgJ');
//                 const rowData = [];
//                 for (const row of rows) {
//                     const companyLinkedinElement = Array.from(row.querySelectorAll('div.zp_I1ps2 span a')).find(link => link.getAttribute('href').includes('linkedin.com/company/'));
//                     const companyLinkedinLink = companyLinkedinElement ? companyLinkedinElement.getAttribute('href') : 'N/A';

//                     const industryElement = row.querySelector('td.zp_aBhrx:nth-child(8) span.zp_lm1kV');
//                     let industry = 'N/A';

//                     if (industryElement) {
//                         industry = industryElement.textContent.trim();
//                     }

//                     const companyLogoElement = row.querySelector('span.zp_IL7J9 img');
//                     const companyLinkElement = row.querySelector('div.zp_I1ps2 a.zp-link.zp_OotKe:not([href*="linkedin.com"])');
//                     const companyNameElement = row.querySelector('td.zp_aBhrx div.zp_J1j17 a.zp_WM8e5');

//                     const companyLogo = companyLogoElement ? companyLogoElement.getAttribute('src') : 'N/A';
//                     const companyLink = companyLinkElement ? companyLinkElement.getAttribute('href') : 'N/A';
//                     const companyName = companyNameElement ? companyNameElement.textContent.trim() : 'N/A';

//                     const NoOfEmployeesElement = row.querySelector('td.zp_aBhrx .zp_Y6y8d');
//                     let NoOfEmployees = 'N/A';

//                     if (NoOfEmployeesElement) {
//                         NoOfEmployees = NoOfEmployeesElement.textContent.trim();
//                     }
//                     const companyLocationElement = row.querySelector('td.zp_aBhrx:last-child > span.zp_Y6y8d');
//                     let companyLocation = 'N/A';
                
//                     if (companyLocationElement) {
//                         companyLocation = companyLocationElement.textContent.trim();
//                     }
                
//                     rowData.push([
//                         companyLinkedinLink,
//                         companyLogo,
//                         companyLink,
//                         companyName,
//                         NoOfEmployees,
//                         companyLocation,
//                     ]);
//                 }

//                 return rowData;
//             });
//             data = data.concat(currentPageData);

//         }
//         // Create CSV headers and data
//         const csvHeaders = ['Company LinkedIn', 'Company Logo', 'Company Link', 'Company Name', 'No. of Employees','CompanyLocation'];
//         const csvRows = [csvHeaders.join(',')];

//         // Convert data to CSV format
//         data.forEach(rowData => {
//             const row = rowData.map(value => `"${value}"`);
//             csvRows.push(row.join(','));
//         });

//         // Write to CSV file
//         const csvFileName = 'PUNJAB_COSMETICS.csv';
//         fs.writeFileSync(csvFileName, csvRows.join('\n'));

//         // Log a message indicating that data has been extracted and saved to a CSV file
//         console.log('Data extracted and saved to CSV:', csvFileName);

//     } catch (error) {
//         console.error("Error occurred: ", error);
//         console.error(error.stack);
//     }

// })();






// const puppeteer = require('puppeteer');
// const cheerio = require('cheerio');
// const fs = require('fs');
// let initialUrl;

// const states = [
//     "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
//     "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
//     "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
//     "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
//     "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
//     "Uttar Pradesh", "Uttarakhand", "West Bengal",  "Andaman and Nicobar Islands", "Chandigarh", 
//     "Dadra and Nagar Haveli and Daman and Diu", 
//     "Lakshadweep", "Delhi", "Puducherry"
//   ];

//   const personSeniorities = ["c_suite", "vp", "director", "founder", "owner"];

// // Main function using an immediately-invoked async function expression (IIFE)
// (async () => {
//     try {
//         const browser = await puppeteer.launch({
//             headless: false,
//             defaultViewport: null,
//             args: ["--start-maximized"],
//         });

//         const page = await browser.newPage();


//         await page.goto("https://app.apollo.io/#/login");

//         await page.waitForSelector('input[name="email"]');
//         await page.waitForSelector('input[name="password"]');
//         await page.waitForSelector('button[type="submit"]');

//         await page.type('input[name="email"]', 'satyam@arenessconsulting.com');
//         await page.type('input[name="password"]', 'Shiva@4321');

//         await page.click('button[type="submit"]');

//         await page.waitForNavigation();
//         await page.waitForSelector('.zp-icon.apollo-icon-search');

//         await page.click('.zp-icon.apollo-icon-search');

//         await page.waitForNavigation();
//         initialUrl = page.url();


//         await page.waitForSelector('button[data-cy="finder-filter-button"]', {
//             visible: true
//         });

//         await page.waitForTimeout(9000);

//         await page.click('button[data-cy="finder-filter-button"]');

//         await page.waitForSelector('tbody.zp_RFed0 tr.zp_cWbgJ');

//         await page.waitForSelector('button.zp-button.zp_zUY3r.zp_n9QPr.zp_MCSwB', {
//             visible: true
//         });


//         for (const currentSeniority of personSeniorities) {

//             for (const currentState of states) {

//        const csvHeaders = ['LinkedIn Link', 'Company LinkedIn', 'Name', 'Title', 'Contact Location', 'AppoloID', 'Industry', 'Company Logo', 'Company Link', 'Company Name'];
//         const csvRows = [csvHeaders.join(',')];


       
//         for (let currentPage = 1; currentPage <= 5; currentPage++) {
//             // Append the current page number to the URL
//             const pageUrl = `https://app.apollo.io/#/people?finderViewId=5b6dfc5a73f47568b2e5f11c&page=${currentPage}&qOrganizationKeywordTags[]=Ecommerce&includedOrganizationKeywordFields[]=tags&includedOrganizationKeywordFields[]=name&personLocations[]=${encodeURIComponent(currentState)}%2C%20India&personSeniorities[]=${currentSeniority}`;
        
//             await page.goto(pageUrl);
//             await page.waitForTimeout(5000);


//             const currentPageData = await page.evaluate(async () => {
//                 const rows = document.querySelectorAll('tbody.zp_RFed0 tr.zp_cWbgJ');
//                 const rowData = [];
//                 for (const row of rows) {
//                     const linkedinLinkElement = row.querySelector('div.zp_I1ps2 a[href^="http://www.linkedin.com/in/"]');
//                     const companyLinkedinElement = Array.from(row.querySelectorAll('div.zp_I1ps2 span a')).find(link => link.getAttribute('href').includes('linkedin.com/company/'));
//                     const companyLinkedinLink = companyLinkedinElement ? companyLinkedinElement.getAttribute('href') : 'N/A';
//                     const nameElement = row.querySelector('div.zp_xVJ20 a');
//                     const titleElement = row.querySelector('td.zp_aBhrx:nth-child(2) span.zp_Y6y8d');
//                     const contactLocationElement = row.querySelector('td.zp_aBhrx:nth-child(5) > span.zp_Y6y8d');
//                     const appoloIdElement = row.querySelector('div.zp_xVJ20 a');

//                     const appoloIdLink = appoloIdElement ? appoloIdElement.getAttribute('href') : '';
//                     const completeAppoloLink = appoloIdLink ? `https://app.apollo.io${appoloIdLink}` : '';

//                     let contactLocation = 'N/A';
//                     if (contactLocationElement) {
//                         contactLocation = contactLocationElement.textContent.replace(/\s+/g, ' ').trim();
//                     }

//                     const industryElement = row.querySelector('td.zp_aBhrx:nth-child(8) span.zp_lm1kV');
//                     let industry = 'N/A';

//                     if (industryElement) {
//                         industry = industryElement.textContent.trim();
//                     }
//                     const companyLogoElement = row.querySelector('span.zp_IL7J9 img');
//                     const companyLinkElement = row.querySelector('div.zp_I1ps2 a.zp-link.zp_OotKe:not([href*="linkedin.com"])');
//                     const companyNameElement = row.querySelector('td.zp_aBhrx div.zp_J1j17 a.zp_WM8e5');

//                     const companyLogo = companyLogoElement ? companyLogoElement.getAttribute('src') : 'N/A';
//                     const companyLink = companyLinkElement ? companyLinkElement.getAttribute('href') : 'N/A';
//                     const companyName = companyNameElement ? companyNameElement.textContent.trim() : 'N/A';

//                     rowData.push([
//                         linkedinLinkElement ? linkedinLinkElement.getAttribute('href') : '',
//                         companyLinkedinLink,
//                         nameElement ? nameElement.textContent.trim() : '',
//                         titleElement ? titleElement.textContent.trim() : '',
//                         contactLocation,
//                         completeAppoloLink,
//                         industry,
//                         companyLogo,
//                         companyLink,
//                         companyName,
//                     ]);
//                 }

//                 return rowData;
//             });
//             // data = data.concat(currentPageData);

//             if (currentPageData.length === 0) {
//                 break;
//             }

//             currentPageData.forEach(rowData => {
//                 const row = rowData.map(value => `"${value}"`);
//                 csvRows.push(row.join(','));
//             });
//         }

//         // Convert data to CSV format
//         // (move this block inside the loop to include data from each iteration)
//         currentPageData.forEach(rowData => {
//             const row = rowData.map(value => `"${value}"`);
//             csvRows.push(row.join(','));
//         });

//         // Write to CSV file
//         const csvFileName = `${currentState}_${currentSeniority}_ecommerce.csv`;

//         fs.writeFileSync(csvFileName, csvRows.join('\n'));

//         // Log a message indicating that data has been extracted and saved to a CSV file
//         console.log('Data extracted and saved to CSV:', csvFileName);
//     }
// }

//         await browser.close();

//     } catch (error) {
//         console.error("Error occurred: ", error);
//         console.error(error.stack);
//     }

// })();








const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
let initialUrl;

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep", "Delhi", "Puducherry"
];

const personSeniorities = [ "vp", "director", "founder", "owner"];

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

    await page.type('input[name="email"]', 'satyam@arenessconsulting.com');
    await page.type('input[name="password"]', 'Shiva@4321');

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

    // Loop over each seniority
    for (const currentSeniority of personSeniorities) {
      // Loop over each state
      for (const currentState of states) {
        // CSV headers for each state and seniority
        const csvHeaders = ['LinkedIn Link', 'Company LinkedIn', 'Name', 'Title', 'Contact Location', 'AppoloID', 'Industry', 'Company Logo', 'Company Link', 'Company Name'];
        // Initial row with headers
        const csvRows = [csvHeaders.join(',')];

        // Loop through pages
        for (let currentPage = 1; currentPage <= 5; currentPage++) {
          // Append the current page number to the URL
          const pageUrl = `https://app.apollo.io/#/people?finderViewId=5b6dfc5a73f47568b2e5f11c&page=${currentPage}&qOrganizationKeywordTags[]=Ecommerce&includedOrganizationKeywordFields[]=tags&includedOrganizationKeywordFields[]=name&personLocations[]=${encodeURIComponent(currentState)}%2C%20India&personSeniorities[]=${currentSeniority}`;

          await page.goto(pageUrl);
          await page.waitForTimeout(5000);

          // Extract data from the current page
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

          if (currentPageData.length === 0) {
            break;
          }

          // Convert data to CSV format
          currentPageData.forEach(rowData => {
            const row = rowData.map(value => `"${value}"`);
            csvRows.push(row.join(','));
          });
        }

        // Write to CSV file for each state and seniority
        const csvFileName = `${currentState}_${currentSeniority}_ecommerce.csv`;

        fs.writeFileSync(csvFileName, csvRows.join('\n'));

        // Log a message indicating that data has been extracted and saved to a CSV file
        console.log('Data extracted and saved to CSV:', csvFileName);

      }
    }

    await browser.close();
  } catch (error) {
    console.error("Error occurred: ", error);
    console.error(error.stack);
  }
})();
