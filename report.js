function printReport(pages) {
    console.log("==============")
    console.log("REPORT")
    console.log("==============")
    const sortpage = sortPages(pages)
    for (const page of sortpage) {
      
        console.log(`Found ${page[0]} Hit ${page[1]}`)
    }
    console.log("==============")
    console.log("END")
    console.log("==============")
    
}
function sortPages(pages) {
    const arr = Object.entries(pages)
    arr.sort((a, b) => {
      return a[1]-b[1]
    })
    return arr
    
}

module.exports = {
    sortPages,
    printReport
}