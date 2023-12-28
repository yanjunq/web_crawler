const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('sortpage', () => {
    const input = {
        'https:wagslane.dev/path': 5, 
        'https:wagslane.dev': 4 
    }
    const actual = sortPages(input)
    const expected = [
    ['https:wagslane.dev', 4],
    ['https:wagslane.dev/path', 5]
    ]
    expect(actual).toEqual(expected)
})