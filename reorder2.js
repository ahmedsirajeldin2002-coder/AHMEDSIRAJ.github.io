const fs = require('fs');
const file = 'd:/My portoflio/index.html';
let content = fs.readFileSync(file, 'utf8');

// The markers we want to manage
const markers = [
    'NAVIGATION',
    'HERO SECTION',
    'PROJECTS',
    'CONTACT',
    'EDUCATION',
    'EXPERIENCE',
    'ABOUT SECTION',
    'SKILLS',
    'TRAINING',
    'FOOTER'
];

let parts = {};
// Split the file by the prefix
let chunks = content.split('<!-- ==================== ');

// First chunk is everything before NAVIGATION
let header = chunks[0];
let footerScript = '';

for(let i=1; i<chunks.length; i++) {
    let chunk = chunks[i];
    let endNameIndex = chunk.indexOf(' ==================== -->');
    if(endNameIndex !== -1) {
        let name = chunk.substring(0, endNameIndex);
        let block = '<!-- ==================== ' + chunk;
        if(name === 'JAVASCRIPT') {
            footerScript = block;
        } else {
            parts[name] = block;
        }
    }
}

// Reassemble in the new order
let newContent = header;
for(let name of markers) {
    if(parts[name]) {
        newContent += parts[name];
    }
}
newContent += footerScript;

fs.writeFileSync(file, newContent, 'utf8');
console.log('Successfully reordered to put PROJECTS first!');
