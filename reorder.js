const fs = require('fs');
const file = 'd:/My portoflio/index.html';
let content = fs.readFileSync(file, 'utf8');

const sections = [
    'NAVIGATION',
    'HERO SECTION',
    'ABOUT SECTION',
    'EXPERIENCE',
    'EDUCATION',
    'PROJECTS',
    'SKILLS',
    'TRAINING',
    'CONTACT',
    'FOOTER'
];

let parts = {};
let header = content.split('<!-- ==================== NAVIGATION ==================== -->')[0];
let footerScript = content.split('<!-- ==================== FOOTER ==================== -->')[1].split('<!-- ==================== JAVASCRIPT ==================== -->')[1];
let afterFooter = '\n  <!-- ==================== JAVASCRIPT ==================== -->' + footerScript;

for (let i = 0; i < sections.length; i++) {
    let start = `<!-- ==================== ${sections[i]} ==================== -->`;
    let end = (i < sections.length - 1) ? `<!-- ==================== ${sections[i+1]} ==================== -->` : `<!-- ==================== JAVASCRIPT ==================== -->`;
    
    let startIndex = content.indexOf(start);
    if(startIndex === -1) {
        // Fallback for FOOTER if it doesn't have a next section
        if (sections[i] === 'FOOTER') {
            end = `<!-- ==================== JAVASCRIPT ==================== -->`;
        } else {
             // Find the next available section
             for(let j=i+1; j<sections.length; j++) {
                 let nextStart = `<!-- ==================== ${sections[j]} ==================== -->`;
                 if(content.indexOf(nextStart) !== -1) {
                     end = nextStart;
                     break;
                 }
             }
        }
    }
    
    let endIndex = content.indexOf(end, startIndex);
    if(startIndex !== -1 && endIndex !== -1) {
        parts[sections[i]] = content.substring(startIndex, endIndex);
    } else if (startIndex !== -1) {
        parts[sections[i]] = content.substring(startIndex);
    }
}

// New Order: Navigation -> Hero -> Contact -> Education -> Experience -> Projects -> About -> Skills -> Training -> Footer
const newContent = header +
    parts['NAVIGATION'] +
    parts['HERO SECTION'] +
    parts['CONTACT'] +
    parts['EDUCATION'] +
    parts['EXPERIENCE'] +
    parts['PROJECTS'] +
    parts['ABOUT SECTION'] +
    parts['SKILLS'] +
    parts['TRAINING'] +
    parts['FOOTER'] +
    afterFooter;

fs.writeFileSync(file, newContent, 'utf8');
console.log('Sections reordered successfully!');
