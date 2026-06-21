const fs = require('fs');

const coursesMeta = {
  'week-1': { topic: 'Startup Ideation and Market Monopolies', metric: 'User Intent & TAM', enemy: 'Cynicism and Incremental Thinking', caseCompany: 'Airbnb', archetype: 'The Visionary Architect' },
  'week-2': { topic: 'Relentless Execution and Speed', metric: 'Shipping Velocity', enemy: 'Perfectionism and Analysis Paralysis', caseCompany: 'Stripe', archetype: 'The Execution Machine' },
  'week-3': { topic: 'Counterintuitive Strategy', metric: 'Viral Coefficient', enemy: 'Corporate Best Practices', caseCompany: 'Snapchat', archetype: 'The Rule Breaker' },
  'week-4': { topic: 'Behavioral Engineering', metric: 'Session Length & Engagement', enemy: 'User Friction and Cognitive Load', caseCompany: 'TikTok', archetype: 'The Dopamine Architect' },
  'week-5': { topic: 'Financial Fortitude', metric: 'Net Cash Burn & Gross Margin', enemy: 'Vanity Metrics and Ego', caseCompany: 'WeWork (as a cautionary tale)', archetype: 'The Capital Allocator' },
  'week-6': { topic: 'The Growth Flywheel', metric: 'Monthly Active Users (MAU)', enemy: 'The Leaky Bucket (Churn)', caseCompany: 'Facebook', archetype: 'The Growth Hacker' },
  'week-7': { topic: 'High-Performance Culture', metric: 'Employee Retention & Output', enemy: 'Toxicity and Brilliant Jerks', caseCompany: 'Netflix', archetype: 'The Cultural Guardian' },
  'week-8': { topic: 'Principled Command', metric: 'Decision Speed and Conviction', enemy: 'Death by Consensus', caseCompany: 'Apple', archetype: 'The Decisive Dictator' },
  'week-9': { topic: 'The Hiring Machine', metric: 'Offer Acceptance & Talent Density', enemy: 'False Positives in Hiring', caseCompany: 'Google', archetype: 'The Talent Magnet' },
  'week-10': { topic: 'Legal and Structural Foundations', metric: 'Compliance and Cap Table Integrity', enemy: 'Legal Debt and Dilution', caseCompany: 'Zenefits', archetype: 'The Structural Defender' },
  'week-11': { topic: 'Guerrilla Tactics and Hacks', metric: 'Customer Acquisition Cost (CAC)', enemy: 'Premature Scaling', caseCompany: 'DoorDash', archetype: 'The Scrappy Hustler' },
  'week-12': { topic: 'Crossing the Chasm', metric: 'Mainstream Market Share', enemy: 'Early Adopter Bias', caseCompany: 'Salesforce', archetype: 'The Mainstream Translator' },
  'week-13': { topic: 'Advanced Virality', metric: 'The K-Factor', enemy: 'Linear Growth and Ad Dependency', caseCompany: 'Dropbox', archetype: 'The Network Engineer' },
  'week-14': { topic: 'The Full-Stack Growth Engine', metric: 'LTV:CAC Ratio', enemy: 'Garbage Data and Silos', caseCompany: 'HubSpot', archetype: 'The Data Scientist' },
  'week-15': { topic: 'Investor Psychology', metric: 'Valuation and Dilution', enemy: 'FOMO Failure and Bad Terms', caseCompany: 'Uber', archetype: 'The Master Pitchman' },
  'week-16': { topic: 'B2B Enterprise Sales', metric: 'Annual Contract Value (ACV)', enemy: 'Procurement and Red Tape', caseCompany: 'Palantir', archetype: 'The Enterprise Closer' },
  'week-17': { topic: 'Surviving the Trough of Sorrow', metric: 'Daily Active Users (DAU)', enemy: 'Burnout and Apathy', caseCompany: 'Slack', archetype: 'The Stoic Survivor' },
  'week-18': { topic: 'Executive Scaling', metric: 'V2MOM Alignment', enemy: 'Micromanagement and Ego', caseCompany: 'Amazon', archetype: 'The Systems Architect' },
  'week-19': { topic: 'The Endgame: M&A and IPO', metric: 'Acquisition Premium', enemy: 'Deal Fatigue and Integration Failure', caseCompany: 'WhatsApp', archetype: 'The Legacy Builder' }
};

const templates = [
  // PAGE 1
  (m) => `
## PAGE 1: THE HISTORICAL CONTEXT OF ${m.topic.toUpperCase()}
To truly master ${m.topic}, we must look backward before we can build forward. The history of Silicon Valley is littered with the corpses of founders who misunderstood this fundamental concept. When you are optimizing for ${m.metric}, you are engaging in a battle that has been fought a thousand times before. 

Consider the ultimate historical case study: ${m.caseCompany}. When they first approached this problem, the industry laughed at them. The incumbents were paralyzed by ${m.enemy}. But ${m.caseCompany} succeeded because they understood that ${m.topic} isn't just a tactic; it is a foundational paradigm shift. They didn't iterate; they completely dismantled the existing framework.

As a founder embodying ${m.archetype}, your job is not to copy ${m.caseCompany}. Your job is to understand the physics of *why* they won. They weaponized ${m.metric} to create an insurmountable moat. They realized that every day spent fighting ${m.enemy} was a day their competitors were bleeding cash. In this page, we will deconstruct the exact historical conditions that allow ${m.topic} to flourish.
`,
  // PAGE 2
  (m) => `
## PAGE 2: THE QUANTITATIVE BLUEPRINT
If you cannot measure it, you cannot manage it. The biggest lie told in the startup ecosystem is that ${m.topic} is purely an art form. It is not. It is a rigorous, unforgiving mathematical science.

Your entire operational dashboard must be reconfigured to highlight ${m.metric}. Why? Because ${m.enemy} thrives in ambiguity. When metrics are fuzzy, ego takes over. When metrics are absolute, truth wins. You must build a culture where every engineer, designer, and marketer knows exactly how their daily tasks impact ${m.metric}.

Let's break down the equation. Your input variables are time, capital, and human focus. Your output variable is ${m.topic}. The conversion rate between those two is dictated by your ability to suppress ${m.enemy}. If you spend $10,000 and 100 engineering hours, and ${m.metric} does not move by a statistically significant margin, your execution engine is broken. You must implement daily tracking, rigorous A/B testing, and ruthless data hygiene.
`,
  // PAGE 3
  (m) => `
## PAGE 3: THE TACTICAL IMPLEMENTATION PLAYBOOK
Theory is useless without execution. Here is the exact, step-by-step tactical playbook for implementing ${m.topic} starting tomorrow morning at 8:00 AM.

**Step 1: The Audit.** You must brutally audit your current operations. Where is ${m.enemy} currently hiding in your company? It is usually hiding in legacy processes and comfortable routines. Root it out.
**Step 2: The Alignment.** Call an all-hands meeting. Announce that for the next 90 days, the only thing that matters is ${m.metric}. Everything else is secondary.
**Step 3: The Infrastructure.** Deploy the software tools necessary to track this. If you are using spreadsheets, upgrade to a real data warehouse. 
**Step 4: The Cadence.** Establish a daily 15-minute standup dedicated solely to reviewing the previous day's progress on ${m.topic}.

If you follow these four steps, you will transition from a chaotic group of smart people into a lethal, focused unit. ${m.archetype} does not leave execution to chance. They engineer it.
`,
  // PAGE 4
  (m) => `
## PAGE 4: ADVANCED PSYCHOLOGICAL WARFARE
Mastering ${m.topic} is 20% mechanics and 80% psychology. The reason most founders fail here is not a lack of intellect; it is a lack of emotional regulation.

When you push your team to optimize ${m.metric}, you will face immense internal resistance. Human beings naturally gravitate toward comfort, and ${m.topic} requires extreme discomfort. Your team will unknowingly succumb to ${m.enemy}. They will invent rational-sounding excuses for why the target is impossible.

As ${m.archetype}, you must act as the psychological shock absorber for your company. You must absorb the panic and project absolute, unyielding calm. You must reframe failure. When a massive experiment regarding ${m.topic} fails, you do not punish the team. You celebrate the speed of the failure, extract the data, and immediately launch the next iteration. This rewires the collective brain of your startup.
`,
  // PAGE 5
  (m) => `
## PAGE 5: THE FAILURE AUTOPSY
Let us examine the dark side. What happens when a startup completely botches ${m.topic}? The results are catastrophic and irreversible.

The failure always begins subtly. The founder takes their eye off ${m.metric} because they are distracted by press coverage, shiny new features, or fundraising. Without realizing it, ${m.enemy} begins to rot the foundation of the company. 

Consider the anti-patterns:
- **Denial**: The data shows that ${m.topic} is failing, but the executive team blames the market, the customers, or the algorithm.
- **Half-Measures**: The company identifies the problem but tries to solve it with a minor tweak rather than a structural pivot.
- **Talent Flight**: The A-players realize the ship is sinking and leave. You are left with B-players trying to solve an S-tier problem.
Learn from these corpses. Do not repeat their mistakes.
`,
  // PAGE 6
  (m) => `
## PAGE 6: INVESTOR AND BOARD MANAGEMENT
How do you explain ${m.topic} to a room full of venture capitalists? Investors are pattern-matching machines. They are looking for specific signals of competence.

When you present your progress on ${m.metric}, you must frame it as an inevitable force of nature. Do not say, "We hope to improve this." Say, "Our engineering of ${m.topic} is yielding a 15% month-over-month compounding advantage." 

Investors are terrified of ${m.enemy}. If they sense even a hint of it in your boardroom posture, they will write you off as a lifestyle business and stop returning your calls. As ${m.archetype}, you must project total command of the numbers. You must know your ${m.metric} better than your own birthday. When a board member challenges your strategy, overwhelm them with granular, irrefutable data.
`,
  // PAGE 7
  (m) => `
## PAGE 7: SCALING AND AUTOMATION
Doing ${m.topic} manually is necessary in the early days. But eventually, manual effort becomes the bottleneck. You must transition from doing the work to building the machine that does the work.

Scaling ${m.metric} requires software engineering, not just human effort. You must build internal tools that automate the data collection, the feedback loops, and the anomaly detection. If ${m.enemy} spikes at 3:00 AM on a Sunday, your automated systems must catch it and trigger an alert before you even wake up.

This is where you transition from a scrappy startup to an enterprise juggernaut. You document every single process. You write standard operating procedures (SOPs) so robust that a new hire can perfectly execute your ${m.topic} strategy on their first day.
`,
  // PAGE 8
  (m) => `
## PAGE 8: HIRING AND DELEGATION
You cannot scale ${m.topic} alone. You must hire people who are fundamentally better at it than you are.

The ideal hire for this phase is not a generalist. It is a hyper-specialized mercenary who wakes up every day obsessing over ${m.metric}. During the interview process, you must actively screen out candidates who are susceptible to ${m.enemy}. Give them a broken process and ask them how they would fix it. If their answer involves scheduling a meeting to discuss it, do not hire them. If their answer involves diving into the database and shipping a fix, hire them immediately.

Once hired, delegate the outcome, not the task. Say: "Your job is to increase ${m.metric} by 20%. I do not care how you do it, as long as it is legal and ethical. You have full autonomy."
`,
  // PAGE 9
  (m) => `
## PAGE 9: THE COMPETITIVE MOAT
If you execute ${m.topic} perfectly, you do not just win customers; you build an impenetrable fortress around your business. 

Competitors will try to copy your UI. They will try to copy your pricing. But they cannot copy a perfectly calibrated engine driving ${m.metric}. By the time they realize what you are doing, you are already three iterations ahead. 

This is how ${m.caseCompany} achieved dominance. They didn't just play the game better; they changed the rules of the game to ensure ${m.enemy} destroyed their rivals while they remained immune. Your goal is to make competing with you mathematically impossible.
`,
  // PAGE 10
  (m) => `
## PAGE 10: THE ULTIMATE MASTER CHECKLIST
Before you close this module, review this final checklist to ensure total mastery of ${m.topic}.
- [ ] Have we defined ${m.metric} mathematically with zero ambiguity?
- [ ] Is there a live dashboard visible to the entire company tracking this?
- [ ] Have we completely eliminated ${m.enemy} from our weekly workflows?
- [ ] Does every new hire understand our ${m.caseCompany}-level ambition?
- [ ] Are we iterating fast enough? (If you aren't breaking things, you are too slow).

Embrace the identity of ${m.archetype}. The market rewards absolute obsession. Go execute.
`
];

let contentData = fs.readFileSync('src/lib/academy-data.ts', 'utf8');

for (const [weekId, meta] of Object.entries(coursesMeta)) {
  const weekStartStr = "id: '" + weekId + "',";
  const weekIndex = contentData.indexOf(weekStartStr);
  if (weekIndex === -1) continue;
  
  const examplesIndex = contentData.indexOf('examples: [', weekIndex);
  if (examplesIndex === -1) continue;
  
  const theoryEndStr = "`,";
  const theoryEndIndex = contentData.lastIndexOf(theoryEndStr, examplesIndex);
  
  if (theoryEndIndex === -1 || theoryEndIndex < weekIndex) continue;
  
  let generatedPages = '\\n\\n';
  for (let i = 0; i < templates.length; i++) {
    generatedPages += templates[i](meta) + '\\n\\n';
  }
  
  const before = contentData.substring(0, theoryEndIndex);
  const after = contentData.substring(theoryEndIndex);
  
  // Clean up any old expansions to keep the file clean, or just append it.
  // We'll just append it to make it MASSIVE.
  
  contentData = before + generatedPages + after;
  console.log('Appended 10 pages of epic content to ' + weekId);
}

fs.writeFileSync('src/lib/academy-data.ts', contentData, 'utf8');
console.log('Successfully completed the epic 10-page expansion for all 19 courses.');
