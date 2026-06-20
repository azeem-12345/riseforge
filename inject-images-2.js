const fs = require('fs');

const weekImages = {
  'week-10': 'financial-fortitude',
  'week-15': 'investor-psychology',
  'week-16': 'crossing-chasm',
  'week-18': 'team-hiring'
};

let contentData = fs.readFileSync('src/lib/academy-data.ts', 'utf8');

for (const [weekId, imageId] of Object.entries(weekImages)) {
  const weekStartStr = "id: '" + weekId + "',";
  const weekIndex = contentData.indexOf(weekStartStr);
  if (weekIndex === -1) continue;
  
  const theoryIndex = contentData.indexOf('theory: `', weekIndex);
  if (theoryIndex === -1) continue;
  
  const examplesIndex = contentData.indexOf('examples: [', theoryIndex);
  if (examplesIndex === -1) continue;
  
  let theoryContent = contentData.substring(theoryIndex, examplesIndex);
  
  if (theoryContent.includes('!!IMAGE:')) {
    console.log(weekId + ' already has an image. Skipping.');
    continue;
  }
  
  // This time, just replace 'theory: `' with 'theory: `\n!!IMAGE:imageId!!\n\n'
  theoryContent = theoryContent.replace(/theory:\s*`/, 'theory: `\\n!!IMAGE:' + imageId + '!!\\n\\n');
  
  contentData = contentData.substring(0, theoryIndex) + theoryContent + contentData.substring(examplesIndex);
  console.log('Injected ' + imageId + ' into ' + weekId);
}

fs.writeFileSync('src/lib/academy-data.ts', contentData, 'utf8');
console.log('Remaining image injection complete.');
