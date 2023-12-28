const { JSDOM } = require('jsdom');

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
    getURLsFromHTML
}