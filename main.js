const { crawlpage } = require('./crawl.js')
const {sortPages,printReport} = require('./report.js')

async function main() {
    if (process.argv.length < 3) {
        console.log("No website exit")
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log("Too many command line arguments")
        process.exit(1)
    }

    const baseURL = process.argv[2];
    console.log(`Starting crawl of ${baseURL}`)

    const pages = await crawlpage(baseURL, baseURL, {})
    printReport(pages)


}
main()