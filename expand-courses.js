const fs = require('fs');

const expansions = {
  'week-1': `
## Advanced Deep Dive: The Idea Maze
A great startup idea is not just a spark; it's a deep labyrinth. You must understand the history of the industry, the graveyard of failed startups that tried the same thing, and the specific technological shifts that make your solution possible *today*.
- **The Graveyard Analysis**: Study 3 companies that failed trying to solve your problem. What did they miss?
- **The "Why Now" Matrix**: Map out recent shifts in technology, regulation, or consumer behavior.
- **The Monopoly Endgame**: If you win your small niche, what is the exact step-by-step path to dominating the adjacent markets?
`,
  'week-2': `
## Advanced Deep Dive: The Execution Engine
Execution is a muscle that must be trained. Founders must build an operating cadence that forces momentum even on bad days.
- **The Weekly Shipping Cadence**: Your team must deliver a tangible improvement to the user every 7 days. No exceptions.
- **The 10x Engineer Myth**: Don't hire for raw intellect alone. A 10x engineer who refuses to communicate is a net negative. Hire for the "10x Team Player" who elevates everyone else's output.
- **Ruthless Prioritization**: Use the Eisenhower Matrix daily. If it's not urgent and important to your core metric, delete it.
`,
  'week-3': `
## Advanced Deep Dive: Escaping the Local Maximum
Counterintuitive thinking requires you to ignore local maxima—small optimizations that feel like progress but prevent you from reaching true greatness.
- **The Danger of Best Practices**: Best practices are for average companies. To be extraordinary, you must selectively break the rules.
- **The Feedback Trap**: Users will ask for features that make your product look exactly like your competitors. Ignore them. Build what they *need*, not what they ask for.
- **Embracing Chaos**: Early startups are messy. If your operations are too neat, you are moving too slowly.
`,
  'week-4': `
## Advanced Deep Dive: Behavioral Engineering
The consumer mind is not rational. It is driven by emotion, status, and habit.
- **The Hook Model**: Design your product with a Trigger, Action, Variable Reward, and Investment.
- **Status Economies**: Users adopt products that increase their perceived social status. How does your product make the user look smarter or cooler to their friends?
- **Friction Auditing**: Walk through your signup flow every week. Remove one click, one field, or one confusing word every time.
`,
  'week-5': `
## Advanced Deep Dive: Financial Fortitude
Financial mastery is not about accounting; it's about scenario planning.
- **The 3 Scenarios**: Always have a Base Case (expected growth), a Best Case (explosive growth), and a Worst Case (nuclear winter). Know exactly when to switch between them.
- **Cash Flow is Oxygen**: Revenue is vanity, profit is sanity, but cash is reality. You can go bankrupt while being profitable if your cash flow cycle is broken.
- **The Unit Economics Equation**: Constantly optimize the ratio of Lifetime Value (LTV) to Customer Acquisition Cost (CAC). Aim for 3:1 or higher.
`,
  'week-6': `
## Advanced Deep Dive: The Growth Flywheel
Growth is not a funnel; it is a flywheel. A funnel loses energy at the bottom; a flywheel stores energy and accelerates.
- **The Virality Coefficient (K-Factor)**: Track exactly how many new users each existing user brings in. If K > 1, growth is exponential.
- **The Retention Plateau**: Your retention curve must flatten. If it trends toward zero, you have a leaky bucket. Stop all acquisition and fix the product.
- **The Marginal User**: Don't optimize for your power users; optimize for the user who is right on the edge of quitting.
`,
  'week-7': `
## Advanced Deep Dive: Cultural Architecture
Culture is not ping-pong tables; it is how your team behaves when you are not in the room.
- **The Defining Behaviors**: Write down 3 specific actions that represent your culture (e.g., "We default to transparency," "We ship before we are ready").
- **The Hiring Filter**: Create interview questions specifically designed to test for your cultural values. Reject brilliant jerks immediately.
- **The Firing Trigger**: Culture is defined by who you fire. If you tolerate a toxic high-performer, you have destroyed your culture.
`,
  'week-8': `
## Advanced Deep Dive: Second-Order Thinking
Every decision has a consequence, but great leaders look for the consequence of the consequence (second-order effects).
- **The Stakeholder Map**: Before a major pivot, map out how it will affect your users, your team, your investors, and your competitors.
- **The Pre-Mortem**: Before launching a project, assume it has failed miserably. Write down all the reasons why. Fix them before you launch.
- **The Decision Journal**: Write down why you made a critical decision. Review it 6 months later. Were you right for the right reasons, or just lucky?
`,
  'week-9': `
## Advanced Deep Dive: Scaling the Machine
Hiring your first 10 people is about survival; hiring the next 100 is about systems.
- **The Interview Rubric**: Standardize your interviews. Every candidate for a role must answer the exact same questions to remove bias.
- **The Onboarding Engine**: A new hire should push code or talk to a customer on day one. Create an automated onboarding checklist that gets them to value instantly.
- **The Management Transition**: Founders must transition from doing the work to building the machine that does the work. Delegate outcomes, not tasks.
`,
  'week-10': `
## Advanced Deep Dive: The Capital Structure
Capital is a weapon. Use it wisely, or it will be used against you.
- **The Dilution Math**: Understand exactly how much of your company you are giving away in every round. Model out your cap table through Series C.
- **The Board of Directors**: A bad board member can destroy your company. Conduct reference checks on your investors just like you would an employee.
- **The Legal Debt**: Fix your IP assignments, employment contracts, and founder vesting now. Legal debt is the most expensive debt to pay off later.
`,
  'week-11': `
## Advanced Deep Dive: The Hustle Playbook
Early growth is unglamorous. It requires brute force and relentless hustle.
- **The Concierge MVP**: Instead of building software, provide the service manually to a single customer. Learn the edge cases before you write a line of code.
- **The Cold Email Architecture**: Craft cold emails that focus entirely on the recipient's pain point, not your product. Keep it under 4 sentences.
- **The Fake Door Test**: Put up a landing page for a feature you haven't built yet. Measure how many people click "Buy." Build it only if the demand is there.
`,
  'week-12': `
## Advanced Deep Dive: Crossing the Chasm
Moving from early adopters to the early majority requires a fundamental shift in messaging.
- **The Positioning Shift**: Early adopters buy vision; the early majority buys solutions. Change your marketing from "This is the future" to "This solves your immediate problem."
- **The Bowling Alley Strategy**: Dominate one highly specific niche completely before moving to the next. Use the momentum to knock down the adjacent pins.
- **The Proof of Concept**: Enterprise customers need proof. Build case studies that highlight concrete ROI (Return on Investment) metrics.
`,
  'week-13': `
## Advanced Deep Dive: Advanced Virality Mechanisms
Virality must be engineered into the core loop of the product.
- **Incentivized Virality**: Reward both the referrer and the referee (e.g., Dropbox's two-sided storage bonus).
- **Demonstration Virality**: The product naturally markets itself when used (e.g., the "Sent from my iPhone" signature).
- **The Viral Cycle Time**: How long does it take for a new user to invite another user? Compress this time to accelerate growth exponentially.
`,
  'week-14': `
## Advanced Deep Dive: The Growth Stack
Modern growth requires a technical infrastructure that enables rapid experimentation.
- **The Event Taxonomy**: Define a clean, standardized naming convention for every user action in your product. Garbage data leads to garbage decisions.
- **The A/B Testing Engine**: Run experiments constantly. A failed experiment is a success if it generates a learning.
- **The Lifecycle Marketing Flow**: Map out automated email and push notification sequences that trigger based on specific user behaviors (e.g., onboarding, resurrection, upsell).
`,
  'week-15': `
## Advanced Deep Dive: Investor Psychology
Raising money is a sales process. You are selling a piece of the future.
- **The FOMO Mechanism**: Investors invest because they are afraid of missing out. You must create competitive tension by talking to multiple firms simultaneously.
- **The Risk Mitigation Pitch**: Investors look for reasons to say no. Address the biggest risks in your business head-on before they can ask about them.
- **The Backchannel**: Investors will talk to your former colleagues and customers behind your back. Ensure your reputation is spotless.
`,
  'week-16': `
## Advanced Deep Dive: Enterprise Sales Motion
Selling to businesses requires navigating complex organizations and procurement processes.
- **The Champion and the Economic Buyer**: Identify the person who loves your product (the champion) and the person who controls the budget (the economic buyer). You need both.
- **The Land and Expand Strategy**: Sell a small pilot project to one department. Prove extreme value, then use that success to expand across the entire organization.
- **The Security Questionnaire**: Prepare your SOC2 compliance and security documentation early. Enterprise deals die in the security review.
`,
  'week-17': `
## Advanced Deep Dive: Managing Psychology
The Trough of Sorrow is where most founders quit. Survival is a mental game.
- **The Stoic Founder**: Separate your self-worth from your company's valuation. You are not your startup.
- **The Support Network**: Build a peer group of other founders. They are the only ones who truly understand the pressure you are under.
- **The Pivot Protocol**: If the data shows you are dead, pivot swiftly and decisively. Don't cling to a failing idea out of pride.
`,
  'week-18': `
## Advanced Deep Dive: The Executive Transition
As the company scales, you must transition from a team of doers to a team of leaders.
- **The VPE vs. CTO**: Understand the difference between managing the engineering organization (VP of Engineering) and defining the technical vision (CTO). You eventually need both.
- **The Executive Alignment**: The executive team must operate as a cohesive unit. Any dysfunction at the top will multiply down the org chart.
- **The Performance Management System**: Implement clear OKRs (Objectives and Key Results) to align the entire company around the same goals.
`,
  'week-19': `
## Advanced Deep Dive: The Endgame Mechanics
An exit is the culmination of years of work. It requires strategic maneuvering.
- **The Dual-Track Process**: Prepare for an IPO while simultaneously entertaining M&A (Mergers and Acquisitions) offers. Keep your options open.
- **The Post-Merger Integration**: Most acquisitions fail during integration. Negotiate the culture and team structure, not just the purchase price.
- **The Founder's Legacy**: What impact did you leave on the world? The greatest companies build products that outlast their founders.
`
};

let contentData = fs.readFileSync('src/lib/academy-data.ts', 'utf8');

for (const [weekId, expansionText] of Object.entries(expansions)) {
  const weekStartStr = "id: '" + weekId + "',";
  const weekIndex = contentData.indexOf(weekStartStr);
  if (weekIndex === -1) {
    console.log("Could not find", weekStartStr);
    continue;
  }
  
  const examplesIndex = contentData.indexOf('examples: [', weekIndex);
  if (examplesIndex === -1) {
    console.log("Could not find examples for", weekStartStr);
    continue;
  }
  
  // The theory string ends with \`,\n    examples: [
  // So we look backwards from examplesIndex for \`,
  const theoryEndStr = "\`,";
  const theoryEndIndex = contentData.lastIndexOf(theoryEndStr, examplesIndex);
  
  if (theoryEndIndex === -1 || theoryEndIndex < weekIndex) {
    console.log("Could not find theory end for", weekStartStr);
    continue;
  }
  
  // Extract everything before the end backtick
  const before = contentData.substring(0, theoryEndIndex);
  const after = contentData.substring(theoryEndIndex);
  
  // Avoid double appending
  const theoryContent = contentData.substring(weekIndex, theoryEndIndex);
  if (theoryContent.includes('Advanced Deep Dive')) {
    continue;
  }
  
  contentData = before + "\\n" + expansionText + after;
}

fs.writeFileSync('src/lib/academy-data.ts', contentData, 'utf8');
console.log('Successfully expanded all 19 courses with advanced deep dives.');
