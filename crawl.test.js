const { normalizeURL, getURLsFromHTML } = require ('./crawl.js');
const { test, expect } = require ('@jest/globals');

test('normalizeURL', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL /', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test("normalizeURL capitals", ()=> {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test("normalizeURL http", ()=> {
    const input = 'http://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test("getURLsFromHTML absolute", () => {
    const input = `<html>

        < body>
            <a href="https://blog.boot.dev">blog.boot.dev</a>
        </body>
        </html>
        `
    const baseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(input,baseURL)
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
    
})

test("getURLsFromHTML absolute", () => {
    const input = `<html>

        < body>
            <a href="/path/">blog.boot.dev</a>
        </body>
        </html>
        `
    const baseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(input,baseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
    
})

test("getURLsFromHTML mult absolute", () => {
    const input = `<html>

        < body>
            <a href="/path1/">blog.boot.dev</a>
            <a href="/path2/">blog.boot.dev</a>
        </body>
        </html>
        `
    const baseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(input,baseURL)
    const expected = ['https://blog.boot.dev/path1/','https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
    
})

test("getURLsFromHTML invalid", () => {
    const input = `<html>

        < body>
            <a href="invalid">invalid link</a>
    
        </body>
        </html>
        `
    const baseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(input,baseURL)
    const expected = []
    expect(actual).toEqual(expected)
    
})


