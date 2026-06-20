const fs = require('fs');

const massiveExpansions = {
  'week-1': `
## THE 100-DAY VALIDATION PLAYBOOK
Great ideas are fragile. They must be forged in the fire of customer validation.
1. **The 48-Hour Wireframe**: Build a clickable prototype using Figma or Balsamiq. Do not write a single line of code.
2. **The 100-Customer Interview**: Speak to 100 people in your exact target demographic. Ask them: "How do you solve this problem today?" If they aren't actively spending time or money to solve it, your idea is dead.
3. **The Pricing Tolerance Test**: Ask customers, "Would you pay $50 for this?" Then say, "Actually, it's $100. Still interested?" Watch their eyes, not their words.
4. **The Competitor Autopsy**: Find 5 competitors. Read their 1-star reviews on Trustpilot. Your entire initial product roadmap should be built around solving the things they fail at.

## THE MATHEMATICS OF A STARTUP IDEA
- **TAM (Total Addressable Market)**: Is the market $1B+? If not, venture capitalists will not fund you. You are building a lifestyle business, which is fine, but know the difference.
- **SAM (Serviceable Addressable Market)**: Which geographical or demographical segment can you realistically reach in year 1?
- **SOM (Serviceable Obtainable Market)**: If you execute perfectly, what percentage of the SAM can you capture?

## PSYCHOLOGICAL RESILIENCE
You will be rejected. You will be told your idea is stupid.
* "Airbnb is creepy, no one will stay in a stranger's house."
* "Uber is dangerous, no one will get into a stranger's car."
Learn to separate signal (valid customer feedback) from noise (cynicism from people who have never built anything).
`,
  'week-2': `
## THE A-PLAYER RECRUITMENT MATRIX
A toxic hire in the first 10 employees will permanently stunt your company's growth.
1. **The "Give a Shit" Quotient**: Does this person care about the mission, or just the salary? Ask them to explain your product back to you. If they haven't researched it, pass.
2. **The Trajectory Test**: Is this person's career accelerating? You don't want someone who has coasted at a big tech company for 10 years. You want the hungry 25-year-old who is ready to run through walls.
3. **The Backchannel Reference**: Never trust the references they give you. Find mutual connections on LinkedIn and ask, "Off the record, would you hire this person again?"

## THE WARTIME CEO VS. PEACETIME CEO
- **Peacetime CEO**: Focuses on culture, broad expansion, and long-term R&D.
- **Wartime CEO**: Focuses on survival, defending against a lethal threat, and paranoid execution.
In your first two years, you are ALWAYS at war. Act accordingly.
- **Execution Speed**: If a decision is reversible, make it in 5 minutes. If it is irreversible, take 5 days. 99% of startup decisions are reversible.

## THE EQUITY DYNAMICS
Equity is your most expensive currency. Do not give it away lightly.
- **Standard Vesting**: 4 years, 1-year cliff. If they leave on day 364, they get 0%. This protects the company.
- **Refresh Grants**: Give high-performers extra equity on their 2nd anniversary to lock them in for another 4 years.
`,
  'week-3': `
## ESCAPING THE CORPORATE MINDSET
Traditional business schools teach you to manage large, stable monopolies. Startups are chaotic, hyper-growth insurgencies.
1. **The Fallacy of the 5-Year Plan**: In a startup, a 5-year plan is a hallucination. Plan for 18 months, execute in 2-week sprints.
2. **The Danger of "Professionalism"**: Polished branding and expensive PR firms are a waste of money if the product sucks. Craigslist is ugly, but it works.
3. **The Anti-Consensus Bet**: If everyone agrees your idea is good, Google or Amazon is already building it. The best startup ideas sound ridiculous (e.g., "Disappearing photos" -> Snapchat).

## THE ART OF UNLEARNING
- **Forget Perfection**: "If you are not embarrassed by the first version of your product, you've launched too late." (Reid Hoffman).
- **Forget Job Titles**: In the early days, everyone does customer support. Everyone tests QA. Everyone cleans the office.
- **Forget Standard Marketing**: Don't buy Google Ads until you have exhausted every single free, guerrilla marketing channel available.

## THE PSYCHOLOGY OF THE FOUNDER
You will experience extreme highs and extreme lows, often in the same afternoon.
- **Imposter Syndrome**: Accept that you have no idea what you are doing. Neither did Elon Musk when he started SpaceX.
- **The Information Diet**: Stop reading TechCrunch. Stop worrying about your competitor's funding round. Focus entirely on your users and your code.
`,
  'week-4': `
## NEURO-MARKETING AND USER BEHAVIOR
To win, you must hack the dopamine loops of your users.
1. **The Variable Reward**: Slot machines are addictive because the reward is unpredictable. Apply this to your UI. (e.g., Tinder's swipe, Instagram's pull-to-refresh).
2. **The Investment Phase**: The more data a user puts into your product, the harder it is for them to leave. (e.g., Spotify playlists, Evernote notes). This creates high switching costs.
3. **The Loss Aversion Trigger**: People fear losing $10 more than they desire gaining $10. Frame your marketing around what they are *losing* by not using your product.

## THE UX TEAR-DOWN
- **The 3-Click Rule**: A user should be able to find the core value of your app in 3 clicks or less.
- **Cognitive Load**: Every extra field on a signup form drops conversion by 10%. Use Single Sign-On (SSO) via Google/Apple.
- **Blank State Design**: The most important screen in your app is the empty dashboard a user sees upon signup. Fill it with a clear, engaging onboarding tutorial, not just empty space.

## THE TRIBE MENTALITY
Products that reach a billion valuation turn their users into a cult.
- Create an "enemy." (e.g., Apple vs. IBM, Salesforce vs. Software).
- Give your users a shared identity.
`,
  'week-5': `
## FINANCIAL ENGINEERING FOR FOUNDERS
You must become obsessed with your spreadsheets. If you run out of cash, the game is over.
1. **The Cash Flow Statement**: Profit is an accounting fiction; cash flow is reality. If your clients pay you in 90 days but you have to pay your servers in 30 days, you will go bankrupt while being highly profitable.
2. **The Gross Margin Obsession**: Software companies should have 80%+ gross margins. If your margins are below 50%, you are a tech-enabled service business, and investors will value you much lower.
3. **The CAC Payback Period**: How many months does it take to earn back the money you spent to acquire a customer? Elite startups achieve a payback period of under 6 months.

## FUNDRAISING MATHEMATICS
- **Dilution Protection**: Understand Anti-Dilution clauses. If you raise money in a "Down Round" later, early investors will get extra shares, wiping out the founders.
- **The Option Pool Shuffle**: Investors will demand a 15-20% employee option pool created *before* they invest, meaning the dilution comes entirely out of the founder's equity. Negotiate this fiercely.
- **The Post-Money Valuation Trap**: Raising at a massive valuation sounds cool until you have to raise again. If you can't justify a 3x higher valuation in your next round, you are dead. Raise at a reasonable price.

## THE SURVIVAL BUDGET
- Cut all SaaS subscriptions you don't use daily.
- Negotiate AWS/GCP credits (you can easily get $100k free).
- Work from a garage, not a WeWork, until you hit $1M ARR.
`,
  'week-6': `
## THE GROWTH ENGINEERING PLAYBOOK
Growth is not marketing. Growth is a cross-functional engineering discipline.
1. **The Activation Funnel**: Track the drop-off at every single step: View Landing Page -> Click Sign Up -> Enter Email -> Confirm Email -> Complete Profile -> First Core Action. Fix the step with the biggest leak.
2. **The Viral Loop Architecture**: 
   - Step 1: User completes core action.
   - Step 2: User is prompted to share the result.
   - Step 3: Shared link drives new user to landing page.
   - Compress the time it takes to complete this loop.
3. **The Resurrection Campaign**: Users who churned aren't dead. Send them highly targeted emails 30, 60, and 90 days later highlighting new features. A 5% resurrection rate is massive.

## THE PAID ACQUISITION SCALING LAW
- **The Saturation Point**: When you scale Facebook/Google Ads, your CAC will increase. What worked at $1,000/day will fail at $10,000/day. You must constantly find new channels.
- **LTV Calculation Complexity**: Do not calculate LTV based on revenue. Calculate it based on Gross Profit. If your LTV is $100 but your margin is 50%, your true LTV is $50. If your CAC is $40, you are barely breaking even.

## THE REFERRAL MECHANICS
- Dual-sided incentives win. (e.g., "Give $20, Get $20"). If the referrer is the only one who gets paid, they feel greedy. If both get paid, it feels like a gift.
`,
  'week-7': `
## BUILDING A HIGH-PERFORMANCE CULT
Your culture must be intensely unique. It should repel average people and attract obsessive builders.
1. **The Culture Deck**: Write a 50-slide presentation explaining exactly how you operate. (Look at Netflix's original culture deck). Be brutally honest. E.g., "We do not value face-time. We value output."
2. **The Radical Candor Matrix**: Teach your team to challenge directly while caring personally. Passive-aggressive behavior destroys startups. If someone's code is bad, tell them immediately, but offer to help them fix it.
3. **The No-Asshole Rule**: A brilliant jerk will destroy the psychological safety of your team. If an engineer is a genius but belittles junior staff, fire them immediately. Make it a public execution so the team knows you are serious.

## THE OPERATING RHYTHM
- **Daily Standups**: 10 minutes maximum. What did you do yesterday? What are you doing today? What is blocking you?
- **Weekly All-Hands**: 30 minutes. Review the North Star metric. Celebrate one massive win. Discuss one massive failure openly.
- **Quarterly Offsites**: Take the executive team out of the office. Review the 18-month roadmap. Are we building the right thing?

## THE COMPENSATION PHILOSOPHY
- Pay slightly below market rate in cash, but significantly above market rate in equity. You only want people who believe the equity will be worth millions.
- Keep salary bands completely transparent internally to avoid office politics.
`,
  'week-8': `
## THE ARCHITECTURE OF COMPLEX DECISIONS
As a founder, you are paid to make the 3 or 4 decisions a year that dictate the survival of the company.
1. **The Reversible vs. Irreversible Framework**: (Jeff Bezos' Type 1 vs Type 2 decisions). 
   - Type 1 (Irreversible): Selling the company, picking a co-founder. Take weeks to decide.
   - Type 2 (Reversible): Changing a button color, testing a new pricing tier. Decide in 5 minutes and launch.
2. **The Inversion Mental Model**: Instead of asking "How do we succeed?", ask "How do we guarantee total failure?" Then, systematically avoid doing those things.
3. **The 80/20 Rule (Pareto Principle)**: 80% of your revenue will come from 20% of your customers. 80% of your bugs will come from 20% of your code. Identify the 20% and focus all your energy there.

## NAVIGATING BOARDROOM POLITICS
- **The Pre-Meeting Strategy**: Never surprise your board of directors in a meeting. If you are going to miss a revenue target, call every board member individually 3 days before the meeting to explain why.
- **Managing Investors**: Investors want pattern recognition. Speak their language: Moat, TAM, LTV:CAC, Churn, ARR.
- **The Tie-Breaker Mechanism**: When the founding team is deadlocked on a decision, the CEO must act as the dictator. Democracy in a startup leads to slow death by consensus.

## ETHICAL COMMAND
- When you make a mistake, own it publicly. "I made the call, I was wrong, here is how we fix it." The team will respect you infinitely more than if you shift blame.
`,
  'week-9': `
## SCALING THE HIRING MACHINE
When you hit 50 employees, you can no longer interview everyone. You must build a machine that hires for you.
1. **The Scorecard System**: Before interviewing, define the exact outcomes the role must achieve in 12 months. Grade candidates on a 1-5 scale against those specific outcomes. Ignore "gut feeling."
2. **The Bar-Raiser Program**: Implement a system where one designated interviewer (who is not the hiring manager) has veto power over any hire. They are responsible purely for ensuring the candidate raises the average quality of the company.
3. **The Sourcing Engine**: Do not rely on inbound applications. The best people are already employed. Your recruiters must act like elite salespeople, cold-emailing passive candidates with highly personalized pitches.

## THE EXECUTIVE EXECUTION PROTOCOL
- **OKRs (Objectives and Key Results)**: Objective: "Dominate the mobile market." Key Result 1: "Increase iOS app rating from 3.0 to 4.5." Key Result 2: "Achieve 50k daily active mobile users." OKRs must be binary—you either hit them or you didn't.
- **The 1-on-1 Framework**: Managers must hold weekly 1-on-1s. It is the employee's meeting, not the manager's. Focus on career growth, blockers, and feedback, not status updates.

## FIRING WITH GRACE
- "Hire slow, fire fast." If you are wondering if you should fire someone, you already know the answer.
- Give a fair severance. Treat exiting employees with immense respect. The remaining team is watching how you treat the people who leave.
`,
  'week-10': `
## LEGAL AND FINANCIAL COMBAT
Startup legal mistakes do not kill you on day one; they kill you three years later when you try to sell the company.
1. **The 83(b) Election**: If you do not file an 83(b) election with the IRS within 30 days of receiving your founder shares, you could owe millions in taxes on money you haven't made. It is the single biggest catastrophic mistake founders make.
2. **Venture Debt**: Once you raise a Series A, you can access venture debt. This is non-dilutive capital (loans). Use it to extend your runway by 6 months, but never use it to fund an inherently unprofitable business model.
3. **The Data Room**: Maintain an immaculate, investor-ready data room from day one. Include incorporation docs, cap tables, IP assignments, and employment contracts. When a term sheet arrives, you must be ready to close in 14 days.

## CAP TABLE MATHEMATICS
- **The Liquidation Preference**: Understand a "1x Non-Participating Preference." If you sell the company for $10M and investors put in $5M, they get their $5M back first. If you agree to a "2x Participating," they get $10M first, leaving you with nothing.
- **Founder Vesting Acceleration**: Negotiate "Double Trigger Acceleration." If the company is acquired (Trigger 1) AND you are fired by the new owners (Trigger 2), all your unvested shares instantly vest.

## COMPLIANCE AS A MOAT
- If you sell to enterprise (B2B), achieving SOC2 Type II compliance early can be a massive competitive advantage against other startups.
`,
  'week-11': `
## TACTICAL GUERRILLA WARFARE
In the early days, you have no money and no brand. You must use asymmetric tactics.
1. **The Piggyback Strategy**: Find a massive platform and build a tool on top of it to steal their users. (e.g., Airbnb auto-posting listings to Craigslist).
2. **The "Wizard of Oz" MVP**: Offer an AI-powered service, but manually do the work yourself behind the scenes. If users love the output, *then* spend 6 months building the actual AI.
3. **The High-Touch Onboarding**: For your first 100 users, insist on a 30-minute Zoom call to set up their account. You will learn more in these 30 minutes than in 6 months of Google Analytics data.

## EXPLOITING NICHE COMMUNITIES
- Find highly concentrated pockets of your target audience (Subreddits, Discord servers, specialized Slack groups).
- Do not spam links. Provide immense, free value for 3 weeks. Become a recognized expert. Then, casually mention, "I built a tool that automates this."
- Create a "Waitlist VIP" dynamic. Make your product invite-only to manufacture scarcity and exclusivity (e.g., Clubhouse, Superhuman).

## THE FIRST $10K MRR (Monthly Recurring Revenue)
- Your only goal is to hit $10,000 MRR. At this point, the product is validated, and you can likely raise a seed round.
- Charge more than you think you should. High prices filter out terrible, high-maintenance customers and give you the margin to provide incredible customer support.
`,
  'week-12': `
## THE CHASM SURVIVAL GUIDE
The jump from visionary early adopters to pragmatic mainstream users destroys 90% of startups.
1. **The Whole Product Solution**: Early adopters will tolerate bugs and missing features. Mainstream users demand a complete, frictionless experience. You must build out the integrations, the support docs, and the polished UI before crossing the chasm.
2. **The Strategic Beachhead**: Do not attack the broad market. Attack a highly specific vertical. (e.g., Don't build "CRM for everyone." Build "CRM specifically for commercial real estate brokers in New York"). Dominate 80% of that tiny market, then expand.
3. **The Reference Customer**: Mainstream buyers only buy if they see someone else like them using it. Secure one massive, recognizable brand as a customer, even if you have to give them the software for free. Use their logo on your homepage aggressively.

## THE PRICING EVOLUTION
- Stop pricing based on costs. Start pricing based on value. If your software saves a company $100,000 a year, charging them $50/month is a joke. Charge them $10,000/year.
- Implement tiered pricing: Good, Better, Best. The "Best" tier exists solely to make the "Better" tier look like a reasonable deal (The Decoy Effect).

## SCALING CUSTOMER SUCCESS
- Customer Support fixes problems. Customer Success ensures the user achieves their desired outcome.
- Assign a dedicated Account Manager to high-value clients. Their only job is to ensure the client is using the product enough to justify renewing their contract next year.
`,
  'week-13': `
## ADVANCED VIRAL MATHEMATICS AND KINETICS
Virality is an engineering problem, not a marketing accident.
1. **The Viral Branching Factor**: How many invites does the average user send? You must optimize the UI to increase this. Pre-fill invite emails, access contact books (with permission), and create "one-click" share buttons.
2. **The Conversion Factor**: What percentage of invited users actually sign up? Optimize the landing page that the invitee sees. It must heavily feature the name and face of the friend who invited them to establish instant trust.
3. **The Cycle Time**: The true secret of hyper-growth. If a user invites a friend on day 1 vs day 30, the exponential curve is radically different. Force the viral loop during the initial onboarding flow (e.g., "Invite 3 team members to unlock pro features").

## THE NETWORK EFFECT MOAT
- **Direct Network Effects**: Telephone, WhatsApp. Every new user makes the product more valuable for everyone else.
- **Two-Sided Marketplaces**: Uber, Airbnb. More drivers attract more riders; more riders attract more drivers. You must manually subsidize the hardest side (usually supply) to kickstart the flywheel.
- **Data Network Effects**: Waze. Every user driving with the app improves the traffic algorithm for everyone else.

## DEFENDING AGAINST CLONES
- A clone can copy your code in 30 days. They cannot copy your network effect. Your goal is to grow the network so large that switching to a clone is fundamentally useless for the user.
`,
  'week-14': `
## THE FULL-STACK GROWTH MACHINE
Growth hacking is the systematic testing of the entire user lifecycle.
1. **The Data Pipeline Infrastructure**: Implement Segment.com to route your data to Mixpanel (for product analytics), Amplitude (for behavioral flows), and Redshift (for raw data warehouses). If you cannot trust your data, you are flying blind.
2. **High-Velocity A/B Testing**: Run 10 experiments a week. Test button colors, headline copy, pricing pages, and email subject lines. Use statistical significance calculators; do not call a winner until you reach 95% confidence.
3. **The SEO Programmatic Engine**: Don't just write blog posts. Create programmatic SEO pages. (e.g., Zapier created a dedicated landing page for every single possible app integration combination: "Connect Slack to Gmail," "Connect Trello to Jira"). This generates millions of long-tail search visits.

## COHORT ANALYSIS MASTERY
- Do not look at aggregate retention. Look at Cohorts (users who joined in January vs users who joined in February).
- If your product updates are working, the February cohort should have a higher retention rate than the January cohort.
- Identify the "Golden Action": Find the behavior that correlates with long-term retention. (e.g., Twitter found that if a user follows 30 people on day 1, they never churn). Force every new user to do that golden action.

## AUTOMATED LIFECYCLE MARKETING
- Trigger an email if a user signs up but doesn't complete the core action within 1 hour.
- Trigger a "We Miss You" SMS with a heavy discount if a user hasn't logged in for 14 days.
`,
  'week-15': `
## INVESTOR PSYCHOLOGY AND THE FUNDRAISING GAUNTLET
Fundraising is a brutal psychological war. You must project inevitable success.
1. **The Pitch Deck Narrative**: 
   - Slide 1: The massive shift in the world.
   - Slide 2: The catastrophic problem this shift created.
   - Slide 3: Your product (the inevitable solution).
   - Slide 4: Traction (the proof it works).
   - Slide 5: The Team (why you are the only ones who can execute this).
2. **The FOMO Protocol (Fear Of Missing Out)**: Never fundraise sequentially. Set a specific 2-week window. Take 40 meetings back-to-back. When VCs know you are talking to Tier-1 firms simultaneously, they will issue term sheets incredibly fast to beat their rivals.
3. **The "No" Translation**: Investors rarely say a direct "No." They say, "You're a bit early for us," or "Let's stay in touch." Cross them off your list immediately. Do not waste time chasing soft rejections.

## NEGOTIATING THE TERM SHEET
- **Valuation vs. Control**: A high valuation is great, but if you give up Board Control and agree to aggressive Protective Provisions (veto rights), you no longer own your company. Optimize for clean terms, not just a high price.
- **The Pro-Rata Right**: Understand that allowing early investors to maintain their ownership percentage in future rounds can make it harder to bring in new lead investors later.

## THE POST-PITCH FOLLOW-UP
- Send a monthly investor update to every VC you pitched, even the ones who passed. Show them a chart going up and to the right. Make them regret saying no, so they invest in your next round.
`,
  'week-16': `
## B2B ENTERPRISE SALES EXCELLENCE
Selling to Fortune 500 companies is completely different from selling to consumers.
1. **The Sales Cycle Reality**: Enterprise deals take 6 to 18 months to close. You must have enough runway to survive the sales cycle.
2. **The MEDDIC Framework**: Qualify every deal using MEDDIC:
   - **M**etrics: What is the economic impact of the solution?
   - **E**conomic Buyer: Who physically signs the check?
   - **D**ecision Criteria: How do they evaluate vendors?
   - **D**ecision Process: What are the exact steps to get approval?
   - **I**dentify Pain: What happens if they do nothing?
   - **C**hampion: Who inside the company is fighting for you?
3. **The Pilot Trap**: Never do a free pilot. Free pilots have no executive sponsorship and are rarely implemented. Always charge for a "Proof of Concept" (POC). If they pay $10k for a POC, they are financially committed to making it work.

## NAVIGATING PROCUREMENT AND IT
- Procurement's only job is to get a discount. Always anchor your initial price 20% higher so you can concede the discount without hurting your margins.
- IT Security will try to block your software. Provide a comprehensive "Security Trust Center" on your website with your penetration test results and data encryption standards to bypass them quickly.

## COMPENSATING THE SALES TEAM
- Base salary should only be 50% of On-Target Earnings (OTE). The rest should be uncapped commission.
- Implement accelerators: Once a rep hits 100% of their quota, increase their commission rate to keep them hungry.
`,
  'week-17': `
## SURVIVING THE TROUGH OF SORROW
After the initial launch buzz fades, you enter a multi-year period of grinding where growth stagnates and the press stops caring.
1. **Managing Burnout**: Burnout is not caused by working hard; it is caused by working hard and seeing no results. You must manufacture small, weekly wins to keep the team's psychology intact.
2. **The Pivot vs. Persevere Decision**: Look at your retention curve. If the curve is flat (users are staying), persevere and fix your marketing. If the curve crashes to zero (users are leaving), pivot immediately. The market is telling you the product is wrong.
3. **Founder Conflict Resolution**: 65% of startups fail due to co-founder disputes. During the trough, tensions explode. Hire an executive coach early. Have the difficult, brutally honest conversations about performance and equity before resentment builds.

## MAINTAINING INVESTOR CONFIDENCE
- In the trough, investors will stop replying to your emails. Do not hide from them. Send the monthly update even when the numbers are terrible. Transparency in bad times builds immense trust for when times are good again.
- Ask investors for tactical help (e.g., "Can you introduce us to the VP of Marketing at Company X?"). Give them a task to keep them engaged.

## THE PSYCHOLOGICAL ARMOR
- Adopt "Stoic Optimism." Accept the brutal reality of your current metrics, but maintain absolute faith that you will eventually figure it out.
- Exercise daily. Sleep 7 hours. A sleep-deprived founder makes catastrophic strategic errors.
`,
  'week-18': `
## SCALING THE EXECUTIVE TEAM
The leadership team that got you from $0 to $1M ARR will rarely be the same team that gets you from $10M to $100M ARR.
1. **The Executive Upgrade**: You must be willing to layer or fire loyal early employees who cannot scale into VP roles. It is heartbreaking, but failing to do so will kill the company. Offer them a generous "Director of X" role, but bring in the seasoned VP.
2. **Hiring Seasoned Executives**: When hiring a VP of Sales or CMO, do not hire the person from a $10 Billion giant (like Google or Salesforce). They are used to massive budgets and brand recognition. Hire the person who took a company from $10M to $50M. They know how to build the machine.
3. **The CEO Evolution**: The CEO's job changes completely. 
   - Stage 1 (0-10 people): Build the product.
   - Stage 2 (10-50 people): Build the team.
   - Stage 3 (50-500 people): Build the culture and allocate capital.
   You must fire yourself from daily operations.

## THE MEETING ARCHITECTURE
- Implement the "L10" (Level 10) weekly executive meeting. 90 minutes. 5 mins for good news. 10 mins for metrics review. The remaining 75 minutes are strictly for identifying and solving the 3 biggest critical issues in the company.
- Ban all internal meetings on Wednesdays to allow for deep, uninterrupted work.

## ALIGNING A LARGE ORG
- Use the "V2MOM" framework (Vision, Values, Methods, Obstacles, Measures) created by Marc Benioff. Every employee should be able to read the CEO's V2MOM and align their personal quarterly goals directly to it.
`,
  'week-19': `
## THE ENDGAME: EXITS, IPOS, AND LEGACY
Companies are bought, not sold. An exit must be engineered over years.
1. **The M&A Strategy**: Build strategic partnerships with massive tech companies early. Integrate with their platforms. Become so crucial to their ecosystem that buying you is cheaper than competing with you. (e.g., Instagram to Facebook, YouTube to Google).
2. **The Dual-Track Process**: Always operate as if you are going public (IPO). Hire a world-class CFO, audit your financials, and hit your quarterly forecasts perfectly for 2 years. When strategic acquirers see you are prepared to IPO, they will pay a massive premium to acquire you before you go public.
3. **The Term Sheet Warfare**: When an acquisition offer comes, do not accept the first number. Create a bidding war. Call their biggest competitor and say, "We have an offer, do you want to look under the hood?"

## POST-MERGER REALITIES
- **Earnouts and Golden Handcuffs**: The acquiring company will lock your payout behind a 3-year employment contract (an earnout). Assume you will hate working for the big company and negotiate the maximum possible cash up-front.
- **Protecting Your Team**: Negotiate the retention bonuses and severance packages for your employees before you sign the deal. Do not leave your early believers unprotected in a corporate restructure.

## THE FINAL LESSON: LEGACY
- Money solves financial problems, but it does not solve existential ones. Many founders fall into deep depression post-exit.
- Start thinking about your second act. Angel investing, philanthropy, or building the next giant. The skills you learned building a startup are the most valuable tools on earth for driving human progress.
`
};

let contentData = fs.readFileSync('src/lib/academy-data.ts', 'utf8');

for (const [weekId, expansionText] of Object.entries(massiveExpansions)) {
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
  
  const theoryEndStr = "\`,";
  const theoryEndIndex = contentData.lastIndexOf(theoryEndStr, examplesIndex);
  
  if (theoryEndIndex === -1 || theoryEndIndex < weekIndex) {
    console.log("Could not find theory end for", weekStartStr);
    continue;
  }
  
  const before = contentData.substring(0, theoryEndIndex);
  const after = contentData.substring(theoryEndIndex);
  
  // If the content already contains some of our new strings, we should replace the old expansion 
  // with the new massive expansion. Since we injected "Advanced Deep Dive" earlier, let's remove it first.
  let theoryContent = contentData.substring(weekIndex, theoryEndIndex);
  
  // Find where "## Advanced Deep Dive" starts and slice it off if it exists
  const oldExpansionIndex = before.indexOf('## Advanced Deep Dive', weekIndex);
  let finalBefore = before;
  
  if (oldExpansionIndex !== -1 && oldExpansionIndex < theoryEndIndex) {
    finalBefore = before.substring(0, oldExpansionIndex);
  }
  
  contentData = finalBefore + "\\n" + expansionText + after;
}

fs.writeFileSync('src/lib/academy-data.ts', contentData, 'utf8');
console.log('Successfully completed the massive expansion of all 19 courses.');
