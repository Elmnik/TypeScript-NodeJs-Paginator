function* createPaginator(items, pageSize) {
    if (pageSize <= 0)
        throw new Error("Page size must be greater than zero");
    for (let i = 0; i < items.length; i += pageSize) {
        yield items.slice(i, i + pageSize);
    }
}
// Read input from stdin
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let items = [];
let n = null;
let pageSize = null;
function main() {
    try {
        if (n === null || items.length !== n || pageSize === null) {
            throw new Error("Invalid input");
        }
        const paginator = createPaginator(items, pageSize);
        for (const page of paginator) {
            console.log(...page);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        else {
            console.error("An unknown error occurred");
        }
    }
}
rl.on('line', (line) => {
    const num = parseInt(line.trim(), 10);
    if (n === null) {
        n = num;
    }
    else if (items.length < n) {
        items.push(num);
    }
    else {
        pageSize = num;
        rl.close();
    }
});
rl.on('close', main);
