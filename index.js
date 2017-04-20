const rp = require('request-promise');
// still necessary to promisify all callback-based APIs:
const thenifyAll = require('thenify-all');
const fs = thenifyAll(require('fs'));

main()
    .then(() => console.log('this should be the last line of output'))
    .catch((err) => console.error('uncaught error:', err));

async function main() {
    const urls = parseArgs();
    
    console.log('in series...');
    for (let index = 0; index < urls.length; index++) {
        const url = urls[index];
        try {
            const html = await fetchHtml(url);
            await saveHtml(`output${index}.html`, html);
        } catch (err) {
            console.error('ERROR:', err);
        }
    }

    // console.log('in parallel...');
    // let promises = urls.map(async function (url, index) {
    //     try {
    //         const html = await fetchHtml(url);
    //         await saveHtml(`output${index}.html`, html);
    //     } catch (err) {
    //         console.error('ERROR:', err);
    //     }
    // });
    // await Promise.all(promises);

    console.log('all done');
}

function parseArgs() {
    const urls = process.argv.slice(2);
    if (!urls) {
        throw new Error(`usage: node ${process.argv[1]} <url> [<url> ...]`);
    }
    return urls;
}

async function sleep(ms) {
    console.log(`sleeping for ${ms}ms...`);
    await new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchHtml(url) {
    await sleep(getRandomIntInclusive(0, 2) * 1000);
    return rp({
        uri: url,
        gzip: true
    });
}

async function saveHtml(path, data) {
    console.log(`writing ${path}...`);
    return fs.writeFile(path, data);
}
