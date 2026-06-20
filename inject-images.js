const fs = require('fs');

const weekImages = {
  'week-1': 'founder-vision',
  'week-2': 'startup-formula',
  'week-3': 'counterintuitive-mindset',
  'week-4': 'consumer-mind',
  'week-5': 'financial-fortitude',
  'week-6': 'growth-graph',
  'week-7': 'team-hiring',
  'week-8': 'founder-vision', // Principled Command
  'week-9': 'team-hiring', // Hiring Machine
  'week-10': 'financial-fortitude', // Legal & Finance
  'week-11': 'market-dynamics', // Tactics
  'week-12': 'crossing-chasm',
  'week-13': 'growth-graph', // Virality
  'week-14': 'market-dynamics', // Growth Stack
  'week-15': 'investor-psychology',
  'week-16': 'crossing-chasm', // Enterprise Sales
  'week-17': 'trough-of-sorrow',
  'week-18': 'team-hiring', // Executive Scaling
  'week-19': 'exit-endgame'
};

let contentData = fs.readFileSync('src/lib/academy-data.ts', 'utf8');

for (const [weekId, imageId] of Object.entries(weekImages)) {
  const weekStartStr = "id: '" + weekId + "',";
  const weekIndex = contentData.indexOf(weekStartStr);
  if (weekIndex === -1) continue;
  
  // Find the first ## header in the theory block after the week starts
  const theoryIndex = contentData.indexOf('theory: `', weekIndex);
  if (theoryIndex === -1) continue;
  
  const examplesIndex = contentData.indexOf('examples: [', theoryIndex);
  if (examplesIndex === -1) continue;
  
  // Extract the theory block
  let theoryContent = contentData.substring(theoryIndex, examplesIndex);
  
  // Check if image is already injected in this week to avoid duplicates
  if (theoryContent.includes('!!IMAGE:')) {
    console.log(weekId + ' already has an image. Skipping.');
    continue;
  }
  
  // Find the first \n## after theory: \`
  // We want to put the image right after the first paragraph or header.
  // Actually, putting it at the very top of the theory block is best:
  // theory: \`
  // !!IMAGE:image-id!!
  // 
  // ## First Header
  
  const injectTarget = 'theory: `\\n';
  const injectRegex = /theory:\s*`\s*\n/;
  const match = theoryContent.match(injectRegex);
  
  if (match) {
    const injectionPoint = match[0];
    const replacement = injectionPoint + '\\n!!IMAGE:' + imageId + '!!\\n\\n';
    theoryContent = theoryContent.replace(injectRegex, replacement);
    
    // Replace back into the main content
    contentData = contentData.substring(0, theoryIndex) + theoryContent + contentData.substring(examplesIndex);
    console.log('Injected ' + imageId + ' into ' + weekId);
  }
}

fs.writeFileSync('src/lib/academy-data.ts', contentData, 'utf8');
console.log('Image injection complete.');
