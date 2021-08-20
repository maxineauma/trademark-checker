async function scrapeBrand(input) {
    let reg = /<td role="gridcell" style="" title="[a-zA-Z0-9@;:&'°#!\.\(\)-_%\$\^\*,\+\\\/ ]+" aria-describedby="gridForsearch_pane_BRAND">([a-zA-Z0-9@;:&'°#!\.\(\)-_%\$\^\*,\+\\\/ ]+)<\/td>/g;
    let match = input.match(reg);

    let reg2 = /title="([a-zA-Z0-9@;:&'°#!\.\(\)-_%\$\^\*,\+\\\/ ]+)"/;
    let matches = [];
    for(x = 0; x<match.length; x++) {
        matches.push(match[x].match(reg2)[1]);
    }
    return matches;
}

async function scrapeStatus(input) {
    let reg = /<td role="gridcell" style="" title="[a-zA-Z]+" aria-describedby="gridForsearch_pane_STATUS">([a-zA-Z]+)<\/td>/g;
    let match = input.match(reg);

    let reg2 = /title="([a-zA-Z]+)"/;
    let matches = [];
    for(x = 0; x<match.length; x++) {
        matches.push(match[x].match(reg2)[1]);
    }
    return matches;
}

async function scrapeOrigin(input) {
    let reg = /<td role="gridcell" style="text-align:right;" title="[a-zA-Z]+" aria-describedby="gridForsearch_pane_OO">([a-zA-Z]+)<\/td>/g;
    let match = input.match(reg);

    let reg2 = /title="([a-zA-Z]+)"/;
    let matches = [];
    for(x = 0; x<match.length; x++) {
        matches.push(match[x].match(reg2)[1]);
    }
    return matches;
}

async function scrapeOwner(input) {
    let reg = /<td role="gridcell" style="" title="[a-zA-Z0-9@;:&'°#!\.\(\)-_%\$\^\*,\+\\\/ ]+" aria-describedby="gridForsearch_pane_HOL">([a-zA-Z0-9@;:&'°#!\.\(\)-_%\$\^\*,\+\\\/ ]+)<\/td>/g;
    let match = input.match(reg);

    let reg2 = /title="([a-zA-Z0-9@;:&'°#!\.\(\)-_%\$\^\*,\+\\\/ ]+)"/;
    let matches = [];
    for(x = 0; x<match.length; x++) {
        matches.push(match[x].match(reg2)[1]);
    }
    return matches;
}

async function scrapeDate(input) {
    let reg = /<td role="gridcell" style="text-align:right;" title="[0-9\-]+" aria-describedby="gridForsearch_pane_AD">([0-9\-]+)<\/td>/g;
    let match = input.match(reg);

    let reg2 = /title="([0-9\-]+)"/;
    let matches = [];
    for(x = 0; x<match.length; x++) {
        matches.push(match[x].match(reg2)[1]);
    }
    return matches;
}

module.exports = { scrapeBrand, scrapeStatus, scrapeOrigin, scrapeOwner, scrapeDate };