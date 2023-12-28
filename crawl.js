const { JSDOM } = require('jsdom');

async function crawlpage(currURL) {
    console.log(`actively crawling: ${currURL}`)
    try {
        const resp = await fetch(currURL)
        if (resp.status > 400) {
            console.log(`error in fetch with status code: ${resp.status} on page: ${currURL} `)
            return 
        }
        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`non html respone ${resp.status} on pages: ${currURL}`)
            return 
        }
        console.log(await resp.text())  
        
    } catch (err) {
        console.log(`error in fetch: ${err.message} with ${currURL} `)
    }
    
}

function getURLsFromHTML(htmlbody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlbody)
    const links = dom.window.document.querySelectorAll('a')
    for (const elem of links) {
        if (elem.href.slice(0, 1) === "/") {
            try {
                const url = new URL(`${baseURL}${elem.href}`)
                urls.push(url.href);
            } catch (err) {
                console.log(`error with ${err.message}`)
            }  
        }else {
            // urls.push(elem.href);    
            try {
                const url = new URL(elem.href)
                urls.push(url.href)
               
            } catch (err) {
                console.log(`error with ${err.message}`)
            }
        }
    }
    return urls;

    
}
function normalizeURL(urlString) {
    url = new URL(urlString)
    url.pathname = url.pathname.endsWith('/') ?
                   url.pathname.slice(0, -1) : url.pathname;
    return `${url.hostname.toLowerCase()}${url.pathname.toLowerCase()}`
   
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlpage
}