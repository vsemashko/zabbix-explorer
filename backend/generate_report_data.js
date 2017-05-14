let fs = require('fs');
let faker = require('faker');

function generateReportData(reportsCount = 600) {
    let reports = [];
    let hostNames = new Set();
    for (let i = 0; i < reportsCount; i++) {
        let success = faker.random.number({min: 85, max: 100, precision: 0.0001});
        success = Math.round((success) * 10000) / 10000;
        let failure = Math.round((100 - success) * 10000) / 10000;
        if (i % 5 === 0 || i % 7 === 0) {
            success = 100;
            failure = 0;
        }

        success = parseFloat(Math.round(success * 1000) / 1000).toFixed(3);
        failure = parseFloat(Math.round(failure * 1000) / 1000).toFixed(3);

        let host = geterateRandomHostName();
        while (hostNames.has(host)) {
            host = geterateRandomHostName();
        }
        hostNames.add(host);
        reports.push({
            host,
            success,
            failure
        });
    }

    return reports;
}

function geterateRandomHostName() {
    return faker.random.arrayElement(['ATM', 'CASH']) + faker.random.number({min: 100, max: 999});
}

module.exports = generateReportData;