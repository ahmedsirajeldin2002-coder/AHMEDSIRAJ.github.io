const fs = require('fs');
const file = 'd:/My portoflio/index.html';
let content = fs.readFileSync(file, 'utf8');

const realLinks = [
  'https://drive.google.com/drive/folders/1Ybm0EA6datIvw5lw9O4v1S_r2aWcYYPM?usp=drive_link',
  'https://drive.google.com/drive/folders/1dzAHaJiKEMNHbxUmH7aOAO3zlcJW2fKF?usp=drive_link',
  'https://drive.google.com/drive/folders/1ZcmDlTyQ1gCJhL5HaO4fg-a8onI5YNoq?usp=drive_link',
  'https://drive.google.com/drive/folders/1RbXmukftMlWUto3BhmTQ6AK6EBQsETo5?usp=drive_link',
  'https://drive.google.com/drive/folders/1fIiZT94fd3VlV9ZSYrxI45NZF50sUpue?usp=drive_link',
  'https://drive.google.com/drive/folders/1YxomJUfq0Rx6beUt2NCgMHDrzMqIYWIi?usp=drive_link',
  'https://drive.google.com/drive/folders/11FUnKbgKlTjHywur6fIXAzqZ7yq6t-Lz?usp=drive_link',
  'https://drive.google.com/drive/folders/1SvX4tJhWZURgh4oLwfXcCjFs77Ja2vzI?usp=drive_link',
  'https://drive.google.com/drive/folders/1k9tTHP9h4cI5q01GOYqN74tQVM0ktv1N?usp=drive_link',
  'https://drive.google.com/drive/folders/1hSmKmPgsPywOuk5ZU5lwn5bYtiWSAzYX?usp=drive_link',
  'https://drive.google.com/drive/folders/1-SyiSilK0DsqRoTTWZ2dJru2KreAmMcB?usp=drive_link',
  'https://drive.google.com/drive/folders/1ta8zaUd7VmjIUWoGzxCb8Mhm8vuVLIuJ?usp=drive_link'
];

let i = 0;
// Replace all instances of href="https://drive.google.com/drive/folders/..." 
content = content.replace(/href="https:\/\/drive\.google\.com\/drive\/folders\/[^"]+"/g, (match) => {
  if (i < realLinks.length) {
    const replacement = `href="${realLinks[i]}"`;
    i++;
    return replacement;
  }
  return match;
});

fs.writeFileSync(file, content, 'utf8');
console.log(`Replaced ${i} links.`);
