const { JSDOM } = require('jsdom');

async function crawlpage(baseURL, currURL, pages) {
    
    const baseURLObj = new URL(baseURL)
    const currURLObj = new URL(currURL)
    // base case 
    if (baseURLObj.hostname !== currURLObj.hostname) { 
        return pages
    }
    const normalizedURL = normalizeURL(currURL)
    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++
        return pages
        
    }
    pages[normalizedURL] = 1
    console.log(`actively crawling: ${currURL}`)
    try {
        const resp = await fetch(currURL)
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page: ${currURL} `)
            return pages
        }
        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`non html respone ${resp.status} on pages: ${currURL}`)
            return pages
        }

        const htmlbody = await resp.text()
        const nextURLs = getURLsFromHTML(htmlbody, baseURL)
        
        for (const nextURL of nextURLs) {
            pages = await crawlpage(baseURL,nextURL,pages)
        }
        
    } catch (err) {
        console.log(`error in fetch: ${err.message} with ${currURL} `)
    }
    return pages
    
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