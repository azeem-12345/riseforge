/**
 * @fileOverview The RiseForge Founder Academy Data Library.
 * Contains expanded youngster-friendly startup lessons for Weeks 1 to 10.
 */

export interface AcademyWeek {
  id: string;
  level: number;
  week: number;
  title: string;
  objective: string;
  theory: string;
  examples: string[];
  mistakes: string[];
  vocabulary: { word: string; definition: string }[];
  summary: string;
  xpReward: number;
}

export const ACADEMY_CONTENT: Record<string, AcademyWeek> = {
  'week-1': {
    id: 'week-1',
    level: 1,
    week: 1,
    title: 'The Essence of Startups',
    objective: 'Understand what a startup is, the founder mindset, and how to start with validation.',
    theory: `> [!IMPORTANT]
> **MAKE SOMETHING PEOPLE WANT**
> The most important rule of starting a startup is solving a real problem for real people. Ideas are cool, but a business only works if someone is willing to use what you make.

## What is a Startup?
A startup is not just a regular small business (like a local barber shop or bakery). A startup is a team of people building a brand new product that can grow **extremely fast** and serve millions of users all over the world.

### Real Story: The Cereal Box Founders (Airbnb)
In 2007, Brian Chesky and Joe Gebbia couldn't afford their rent in San Francisco. A big design conference was coming to town, and all the hotels were fully booked. They got a crazy idea: they bought three air mattresses, put them on their living room floor, and set up a basic website offering "Air Bed & Breakfast" with a warm breakfast included. They got their first three guests, who paid them $80 each!
But soon, they ran out of money. To survive, they bought thousands of boxes of generic breakfast cereal, designed custom boxes called **"Obama O's"** and **"Cap'n McCain's"** (since the presidential election was happening), and hand-glued them. They sold them for $40 a box as collectors' items, raising **$30,000**! That cereal money kept their startup alive, which today is worth billions of dollars.

### Real Story: The Laptops-in-Hand Founders (Stripe)
When Patrick and John Collison started Stripe (a tool to help websites accept credit card payments), they didn't just launch it on the internet and wait. They used the **"Collison Installation"** method. Instead of asking friends, "Hey, will you try our app when you get home?", they would grab their friend's laptop right there on the spot, write the code, and install Stripe on their computer immediately!

## Key Principles for Young Founders:
1. **Solve Your Own Friction**: Look for things that annoy you every day. That is the best seed for a startup.
2. **Do Things That Don't Scale**: Do manual work early on (like hand-gluing boxes or hand-installing code) to learn what your users actually need.
3. **Start Small**: Airbnb started as a literal air mattress on a floor. You do not need a giant factory to test an idea.`,
    examples: [
      'Airbnb selling cereal boxes to raise funding.',
      'Stripe founders manually installing their code on users\' laptops.'
    ],
    mistakes: [
      'Spending months coding a product without talking to a single customer.',
      'Thinking you need millions of dollars in funding before starting.'
    ],
    vocabulary: [
      { word: 'Startup', definition: 'A new company designed to grow extremely fast by solving a widespread problem.' },
      { word: 'Validation', definition: 'Checking if real people actually want to use and pay for your product before you build it.' },
      { word: 'Scale', definition: 'Growing a business to serve millions of customers without running out of resources.' }
    ],
    summary: 'Startups are high-growth machines built to solve problems. Start by validating demand manually, just like Airbnb and Stripe did.',
    xpReward: 50
  },

  'week-2': {
    id: 'week-2',
    level: 1,
    week: 2,
    title: 'Finding Great Problems',
    objective: 'Learn how to identify painful problems worth solving, rather than chasing random ideas.',
    theory: `> [!TIP]
> **PROBLEMS > IDEAS**
> If you start with a cool technology or a random idea, you will build a "solution looking for a problem." Instead, start with a painful problem and build the solution around it.

## The Secret to Finding Problems
The best startup ideas are usually things the founders personally needed. If you solve a problem you experience, you automatically understand the customer because *you* are the customer.

### Real Story: The Missed Gym Calls (WhatsApp)
In 2009, Jan Koum bought an iPhone. He went to a local gym that had a strict rule: no phones allowed inside. Because of this, Jan kept missing important phone calls from his friends. This annoyed him deeply. He wanted a simple app that would show a status next to his name in his friends' contact lists—statuses like *"At the gym,"* *"Battery about to die,"* or *"In a meeting."* He created WhatsApp to solve this simple status problem. Today, WhatsApp is used by over two billion people to send messages every day.

### Real Story: Hating Team Emails (Slack)
Stewart Butterfield and his team were trying to build a complex multiplayer online game. They were spread across different cities and hated using email to coordinate. So, they coded a simple chat tool just for their internal team to message each other. The game failed completely, but they realized the chat tool they built was incredibly useful. They pivoted, polished it, and launched it as Slack, which later sold for over $27 billion.

## How to Assess a Problem:
- **Is it popular?** Do a lot of people have this problem?
- **Is it growing?** Are more people getting this problem every day?
- **Is it urgent?** Do people need a solution right now, or can they wait?
- **Is it frequent?** Do people face this problem daily or weekly?`,
    examples: [
      'Jan Koum building WhatsApp to show statuses during gym workouts.',
      'Slack starting as a simple chat room built to help game developers talk.'
    ],
    mistakes: [
      'Building a solution for a problem that only exists in your head.',
      'Targeting a problem that people only face once every ten years.'
    ],
    vocabulary: [
      { word: 'Pivot', definition: 'Changing the direction of your startup when you realize your initial idea isn\'t working, but a different part is.' },
      { word: 'Friction', definition: 'Any obstacle or annoyance that makes it hard for a customer to get what they want.' }
    ],
    summary: 'Great startups solve real, recurring friction. Look at what annoys you or others daily, and start there.',
    xpReward: 50
  },

  'week-3': {
    id: 'week-3',
    level: 1,
    week: 3,
    title: 'Customer Conversations',
    objective: 'Master the art of talking to users to discover the truth about your idea.',
    theory: `> [!IMPORTANT]
> **THE MOM TEST**
> Never ask anyone: "Do you think this is a good idea?" They will say yes because they want to be polite. Instead, ask them about how they solved the problem in the past.

## The Mom Test Rules
When you ask someone: *"Would you buy an app that helps you coordinate study groups?"*, they will say *"Sure!"* but they won't actually buy it. To get honest feedback, follow these rules:
1. **Talk about their life**, not your idea.
2. **Ask about specifics in the past**, not generics in the future.
3. **Talk less**, and listen more.

### Real Story: The 3-Minute Video (Dropbox)
Drew Houston wanted to build Dropbox because he kept forgetting his USB flash drive at home. Everyone told him that file syncing was already solved by giant tech companies. Drew didn't spend months coding a finished app to prove them wrong. Instead, he made a **3-minute screen recording video** showing how a folder on his desktop synced files automatically. He made the video fun, filled it with jokes for computer programmers, and posted it online. Overnight, his waiting list jumped from **5,000 to 75,000 people**! The video validated that the demand was huge before he even finished building the software.

## What to Ask Instead:
- **Bad**: "Would you buy a tool that schedules your homework?"
- **Good**: "How do you keep track of your homework today? What is the hardest part about that? When was the last time you tried to fix this?"`,
    examples: [
      'Dropbox founder creating a 3-minute demo video to prove demand.',
      'Asking users how they currently solve a problem instead of asking if they like your idea.'
    ],
    mistakes: [
      'Asking leading questions like "Don\'t you think my app is cool?"',
      'Relying on anonymous online surveys instead of talking face-to-face.'
    ],
    vocabulary: [
      { word: 'Mom Test', definition: 'A set of rules for talking to customers where even your mom cannot lie to you about your idea.' },
      { word: 'Demo', definition: 'A simple video or display showing how a product works before it is fully built.' }
    ],
    summary: 'Talk to users about their past behaviors, not future promises. Use simple demos like Dropbox did to measure real interest.',
    xpReward: 50
  },

  'week-4': {
    id: 'week-4',
    level: 1,
    week: 4,
    title: 'Building the MVP',
    objective: 'Learn how to build a Minimum Viable Product (MVP) to test assumptions quickly.',
    theory: `> [!WARNING]
> **AVOID FEATURITIS**
> Your MVP should only do ONE thing exceptionally well. Do not add twenty buttons and features. Keep it simple, launch it fast, and see if anyone cares.

## What is an MVP?
An MVP is the absolute simplest, smallest version of your product that you can build to start learning from real users. It doesn't need to look perfect or have automated databases behind it.

### Real Story: The Photo Shoe Shop (Zappos)
In 1999, Nick Swinmurn wanted to buy a specific pair of shoes but couldn't find them at his local mall. He wondered if people would buy shoes online. He didn't build a warehouse, purchase inventory, or hire programmers. Instead, he went to a local shoe store, took photos of the shoes on the shelves, and posted them on a super simple website. When a customer ordered a shoe on his site, Nick walked back to the local store, bought the shoes at full retail price, and mailed them from the post office. He lost money on every sale, but he proved that people were ready to buy shoes online!

### Real Story: UberCab's Single Town Car
When Uber started in San Francisco, it wasn't a giant app with maps, ratings, and food delivery. It was called "UberCab," and it was a simple SMS service. If you wanted a ride, you sent a text message, and they manually dispatched a single town car that they rented. It did one thing: got you a ride quickly.

## How to Build Lean:
- **Do it manually**: If your app promises to match tutors, match them yourself via email first.
- **Focus on the core value**: Find the single most important feature and cut everything else.
- **Launch in days, not months**: If it takes you half a year to build your first version, you have built too much.`,
    examples: [
      'Zappos founder taking photos of store shoes to test online demand.',
      'Uber launching as a simple SMS ride service with a single town car.'
    ],
    mistakes: [
      'Spending thousands of dollars coding automated systems before selling a single item.',
      'Delaying your launch because the logo or color scheme isn\'t perfect.'
    ],
    vocabulary: [
      { word: 'MVP', definition: 'Minimum Viable Product. The simplest version of a product used to test an idea with real users.' },
      { word: 'Lean', definition: 'Building a startup with minimal waste, low expenses, and rapid iteration.' }
    ],
    summary: 'An MVP is a tool for learning. Build the absolute simplest version manually (like Zappos or UberCab) to verify demand.',
    xpReward: 50
  },

  'week-5': {
    id: 'week-5',
    level: 2,
    week: 5,
    title: 'Launching & First Users',
    objective: 'Discover creative tactics to acquire your first 100 passionate users.',
    theory: `> [!TIP]
> **GET YOUR HANDS DIRTY**
> Do not spend money on ads early on. Go directly to places where your customers hang out (cafes, school clubs, forums) and invite them one by one.

## Finding Your Early Adopters
Your first users should be people who have the problem so severely that they are willing to use a broken, ugly, early version of your app just to get some relief.

### Real Story: Changing Apple Store Homepages (Pinterest)
Ben Silbermann started Pinterest, but almost nobody was using it. He tried running ads, but they failed. So he got creative. He would walk into local Apple retail stores, sit down at the display laptops, set their homepages to Pinterest.com, and leave them open. When customers walked up to test the computers, they were introduced to Pinterest! He also personally emailed every single user who signed up to ask them what they liked and disliked.

### Real Story: Limiting Access (Facebook)
When Mark Zuckerberg launched Facebook, he didn't launch it to the whole world. He launched it only to Harvard students. Once it became super popular there, he expanded it to three other colleges, then to all universities, and only years later to the public. Limiting access created a massive sense of FOMO (Fear Of Missing Out) and made early users feel special.

## Tactics for Getting First Users:
1. **Direct Recruiting**: Talk to people face-to-face and ask them to sign up.
2. **Niche Communities**: Post in specific subreddits, Discord servers, or Facebook groups.
3. **The Friends & Family Hustle**: Get your classmates and friends to use it and give you honest feedback.`,
    examples: [
      'Pinterest founder setting display computers in Apple stores to his website.',
      'Facebook launching strictly in one school to build extreme focus and FOMO.'
    ],
    mistakes: [
      'Buying expensive Google or Instagram ads to get early signups.',
      'Launching to the whole world at once instead of dominating a small niche first.'
    ],
    vocabulary: [
      { word: 'Early Adopter', definition: 'A customer who likes trying new products early, even if they have bugs or look simple.' },
      { word: 'FOMO', definition: 'Fear Of Missing Out. A social feeling that makes people want to join a group or platform so they don\'t feel left out.' }
    ],
    summary: 'Hustle manually to get your first users. Set homepages, send personal emails, or start in a tiny niche just like Pinterest and Facebook did.',
    xpReward: 50
  },

  'week-6': {
    id: 'week-6',
    level: 2,
    week: 6,
    title: 'Product-Market Fit (PMF)',
    objective: 'Understand the concept of Product-Market Fit and how to measure user love.',
    theory: `> [!IMPORTANT]
> **THE 40% DISAPPOINTMENT RULE**
> Ask your users: "How would you feel if you could no longer use this product?" If 40% or more say "Very Disappointed," you have achieved Product-Market Fit.

## What is Product-Market Fit?
PMF is the tipping point where your product is so good that users are naturally sharing it, retention is high, and your startup starts growing organically without you pushing it constantly.

### Real Story: The PMF Survey (Superhuman)
Rahul Vohra, the founder of Superhuman (a super fast email app), was struggling to know if they were ready to launch. He sent a simple survey to his users asking: *"How would you feel if you could no longer use Superhuman?"*
- **Very disappointed**
- **Somewhat disappointed**
- **Not disappointed**
He realized that if the "Very Disappointed" group was under 40%, the startup would fail. He focused all his engineering team's energy *only* on fixing things that the "Somewhat Disappointed" users complained about. Soon, his numbers crossed 58%, and the company took off.

### Real Story: The Server Crash Test (Twitter)
In its early days, Twitter was constantly crashing because so many people were using it. They had a screen showing a drawing of a whale lifted by birds (the "Fail Whale") whenever the site went down. Despite the constant crashes, users refused to leave the site and kept refreshing the page because they loved it so much. That is a clear sign of PMF!

## Signals of Product-Market Fit:
- **High Retention**: Users keep coming back day after day.
- **Word-of-Mouth**: Users tell their friends about your product without you asking.
- **Organic Growth**: You are gaining signups without spending money on marketing.`,
    examples: [
      'Superhuman founder using the 40% disappointment survey to guide development.',
      'Twitter users staying on the platform despite constant server crashes.'
    ],
    mistakes: [
      'Trying to scale or run big marketing campaigns before reaching PMF.',
      'Adding more features when your current users aren\'t coming back to use the app.'
    ],
    vocabulary: [
      { word: 'Product-Market Fit', definition: 'The stage where a startup\'s product perfectly matches a strong market demand.' },
      { word: 'Retention', definition: 'The percentage of users who continue to use your product over time.' }
    ],
    summary: 'Product-Market Fit is about user love. Measure it using the 40% disappointment rule, and focus on retaining users before trying to grow.',
    xpReward: 50
  },

  'week-7': {
    id: 'week-7',
    level: 2,
    week: 7,
    title: 'Growth & Distribution',
    objective: 'Explore viral growth loops and referral mechanics to scale your user base.',
    theory: `> [!TIP]
> **GROWTH LOOPS > ADVERTISING**
> An advertisement is a one-time thing. A growth loop is a system where every new user who signs up automatically brings in one or more new users.

## Understanding Growth Loops
The best startups grow because the product itself encourages sharing. If you need to send a document (Dropbox) or transfer money (PayPal) to a friend, you *have* to invite them to use the app.

### Real Story: The Clickable Signature (Hotmail)
In 1996, Hotmail launched one of the first free webmail services. They had no money for marketing. Their investor suggested putting a small, clickable line at the bottom of every single email sent through Hotmail:
*"PS: I love you. Get your free email at Hotmail."*
Every time a Hotmail user emailed a friend, colleague, or teacher, they advertised the product. Within 1.5 years, Hotmail grew to **12 million users** (which was huge back then) and sold to Microsoft for $400 million, having spent almost zero dollars on ads!

### Real Story: The Space Race (Dropbox)
Dropbox wanted to grow faster. They set up a referral program: if you invited a classmate, both you AND your classmate received **250MB of extra storage space for free**. This created an explosion of shares, especially among university students who needed extra space for project folders. This viral loop increased their signups by **60%** permanent growth!

## Core Growth Mechanics:
- **Viral Coefficient (K)**: The number of new users brought in by each existing user. If K is greater than 1, your growth is exponential!
- **Word-of-Mouth**: Making your product so cool or useful that students talk about it in school hallways.
- **Built-in Sharing**: Features that require collaborating with others (like collaborative documents or team games).`,
    examples: [
      'Hotmail appending a clickable signature to the bottom of all sent emails.',
      'Dropbox rewarding referrers and referees with free storage space.'
    ],
    mistakes: [
      'Forcing users to spam their contacts, which makes them hate your app.',
      'Assuming growth will happen by itself without designing a sharing loop.'
    ],
    vocabulary: [
      { word: 'Growth Loop', definition: 'A self-sustaining mechanism where inputs lead to outputs, which feed back into more inputs.' },
      { word: 'Referral', definition: 'When an existing customer recommends a product to a friend, often for a small reward.' }
    ],
    summary: 'Build sharing directly into the usage of your product, like Hotmail\'s signatures or Dropbox\'s space referrals, to grow exponentially.',
    xpReward: 50
  },

  'week-8': {
    id: 'week-8',
    level: 2,
    week: 8,
    title: 'The Art of Pitching',
    objective: 'Learn how to tell a clear, compelling story about your startup to raise funds or attract partners.',
    theory: `> [!IMPORTANT]
> **KEEP IT SIMPLE**
> A pitch is not a speech. It is a simple story. You should be able to explain your problem, solution, and business model in under three minutes using simple words.

## The Structure of a Pitch
Investors listen to hundreds of pitches a week. If you bore them with long paragraphs or complex charts, they will tune out. Keep your slides short and visual.

### Real Story: The 10-Slide Deck (Airbnb)
When Airbnb was starting out, they created a pitch deck that is now famous in the business world because it was only **10 slides long**. It used very little text and large, bold numbers:
- **Slide 1**: Title (Clean hook)
- **Slide 2**: Problem (Hotels are expensive, Craigslist is sketchy)
- **Slide 3**: Solution (Rent rooms from local hosts)
- **Slide 4**: Market Validation ( Craigslist numbers proving demand)
- **Slide 5**: Market Size (Number of trips taken globally)
- **Slide 6**: Product (Screenshots showing how easy it is to book)
- **Slide 7**: Business Model (We take a 10% fee on every booking)
- **Slide 8**: Market Adoption (How we get hosts and guests)
- **Slide 9**: Competition (Our advantages over hotels)
- **Slide 10**: Financials (Our growth predictions)
They raised their first funding with this simple, crystal-clear presentation.

## Core Pitch Rules:
1. **One Sentence Hook**: Explain what you do in one sentence (e.g., *"We help schools manage homework clubs."*)
2. **Start with the Pain**: Explain the problem so clearly that anyone can feel the frustration.
3. **Show, Don't Tell**: Show screenshots, video clips, or a live demo of your MVP rather than explaining it on a slide.`,
    examples: [
      'Airbnb using a 10-slide visual presentation to raise their first funding.',
      'Explaining a business using a single-sentence hook instead of corporate jargon.'
    ],
    mistakes: [
      'Creating a 40-slide presentation filled with tiny text that nobody reads.',
      'Explaining features instead of explaining how you solve the customer\'s pain.'
    ],
    vocabulary: [
      { word: 'Pitch Deck', definition: 'A brief presentation used to provide investors with a quick overview of your startup.' },
      { word: 'Business Model', definition: 'The design and plan for how a company will generate revenue and make a profit.' }
    ],
    summary: 'A great pitch is short and clear. Tell a simple story, focus on the problem, and use Airbnb\'s 10-slide framework to explain your idea.',
    xpReward: 50
  },

  'week-9': {
    id: 'week-9',
    level: 2,
    week: 9,
    title: 'Unit Economics',
    objective: 'Demystify metrics like CAC and LTV using simple business math.',
    theory: `> [!TIP]
> **THE LEMONADE RULE**
> If it costs you more to find a customer than what the customer spends at your store, you do not have a startup—you have a charity.

## Understanding the Math
Startups fail when their unit economics do not make sense. Two core metrics rule every business:
- **CAC (Customer Acquisition Cost)**: How much money you spend on marketing to get one new customer.
- **LTV (Lifetime Value)**: How much total profit a customer brings to your business before they stop buying.

### Real Story: The Lemonade Stand Analogy
Imagine you open a lemonade stand.
1. You spend **$2 on paper flyers** to tell your classmates about your stand. That flyer attracts **1 customer** to buy from you. Your **CAC is $2**.
2. That customer buys a cup of lemonade for $2. It costs you $0.50 in lemons and sugar to make the cup. Your profit is $1.50 per cup.
3. Over the summer, that customer comes back and buys a total of **4 cups**. The total profit they bring you is: $1.50 × 4 = **$6**. Your **LTV is $6**.
Because your LTV ($6) is greater than your CAC ($2), your lemonade stand is healthy and making money! If you spent $8 on flyers to get one customer who only bought $4 of lemonade, your stand would go broke quickly.

## The Health Rule:
In high-growth startups, you want your **LTV to be at least 3 times greater than your CAC** (LTV > 3 × CAC). This gives you enough runway to survive and invest in scaling.`,
    examples: [
      'Calculating LTV and CAC using simple lemonade stand margins.',
      'Measuring customer acquisition costs to avoid burning cash on marketing.'
    ],
    mistakes: [
      'Ignoring how much it costs to acquire a user in a rush to get signups.',
      'Assuming every customer will stay forever when calculating lifetime value.'
    ],
    vocabulary: [
      { word: 'CAC', definition: 'Customer Acquisition Cost. The total cost associated with convincing a customer to buy a product.' },
      { word: 'LTV', definition: 'Lifetime Value. The total net profit a company makes from any single customer over time.' },
      { word: 'Runway', definition: 'The amount of time a startup has before it runs out of cash, calculated in months.' }
    ],
    summary: 'Keep your business math healthy. Make sure what a customer spends (LTV) is significantly more than what you spend to find them (CAC).',
    xpReward: 50
  },

  'week-10': {
    id: 'week-10',
    level: 2,
    week: 10,
    title: 'Legal, Dilution & Launch',
    objective: 'Understand co-founder equity, dilution, and how to graduate to final launch.',
    theory: `> [!IMPORTANT]
> **THE PIZZA PIE RULE**
> It is much better to own 10% of a massive, billion-dollar pizza than to own 100% of a tiny grape-sized pizza. Equity is about growing the pie together.

## Understanding Dilution
When you start a company alone, you own **100%** of it. If you bring in a co-founder and split it 50/50, you now own **50%**. If you raise money from investors, they buy a share, and your ownership percentage drops to **40%**. This drop is called **dilution**.
Although your percentage is smaller, the *value* of your company is now much larger because you have more help and funding to grow.

### Real Story: The Pizza Share (Airbnb)
When the founders of Airbnb started, they owned 100% of their tiny, struggling startup worth $0. When they raised funding, their ownership diluted. Today, the founders own a much smaller percentage (around 10% each), but because the company is worth billions, their small slices are worth billions of dollars! Having 100% of $0 is worth $0. Having 10% of $10 billion is worth $1 billion!

## Graduation Launch Action Plan:
1. **Choose Your Co-Founders Wisely**: Pick partners who have skills you don't have (e.g., if you are a coder, find a designer or salesperson).
2. **Vest Your Equity**: Don't give away equity all at once. Release it over 4 years so team members only keep their shares if they stay and work.
3. **Launch and Iterate**: Ship your MVP, talk to users, check your metrics, and keep building!`,
    examples: [
      'Understanding company dilution using slices of a pizza pie.',
      'Setting up a 4-year vesting schedule to protect the co-founders\' shares.'
    ],
    mistakes: [
      'Giving away 50% of your company to someone who leaves after one month.',
      'Hoarding 100% of ownership and refusing to hire help or raise funding to grow.'
    ],
    vocabulary: [
      { word: 'Dilution', definition: 'The decrease in ownership percentage for existing founders when new shares are issued.' },
      { word: 'Equity', definition: 'Ownership interest in a corporation, represented as shares or percentages.' },
      { word: 'Vesting', definition: 'A process where team members earn their equity shares slowly over time, rather than all at once.' }
    ],
    summary: 'Build a great team, divide equity fairly using vesting schedules, and understand that growing the value of the company pie is more important than hoarding shares.',
    xpReward: 50
  }
};
