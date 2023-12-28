function normalizeURL(urlString) {
    url = new URL(urlString)
    url.pathname = url.pathname.endsWith('/') ?
                   url.pathname.slice(0, -1) : url.pathname;
    return `${url.hostname.toLowerCase()}${url.pathname.toLowerCase()}`
   
}

module.exports = {
    normalizeURL
}