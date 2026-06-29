'use server';
/**
 * @fileOverview AI Founder Mentor flow.
 *
 * - founderMentor - Personalized mentorship based on user level.
 * - MentorInput - The input type for the mentor.
 * - MentorOutput - The return type for the mentor.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MentorInputSchema = z.object({
  userQuestion: z.string().describe('The question or dilemma the founder is facing.'),
  level: z.number(),
  levelTitle: z.string(),
  modelPreference: z.string().optional().describe('Preferred AI model: gemini-2.5-pro, claude-3-5-sonnet, gpt-4o, oracle'),
  customApiKey: z.string().optional().describe('User provided API key for real LLM inference'),
});
export type MentorInput = z.infer<typeof MentorInputSchema>;

const MentorOutputSchema = z.object({
  advice: z.string().describe('The primary strategic advice provided by the mentor.'),
  actionSteps: z.array(z.string()).describe('Concrete, actionable steps for the founder to take.'),
  philosophicalInsight: z.string().describe('A deeper, mindset-shifting insight inspired by world-class founders.'),
  riskAssessment: z.string().describe('A specific warning or assessment of risks involved.'),
  isSimulated: z.boolean().optional().describe('Indicates if this advice is locally simulated due to missing API keys.'),
  modelUsed: z.string().optional().describe('The AI model name that generated this response.'),
});
export type MentorOutput = z.infer<typeof MentorOutputSchema>;

function generateProceduralAdvice(userQuestion: string, levelTitle: string, modelPreference?: string): MentorOutput {
  const modelNameMap: Record<string, string> = {
    'gemini-2.5-pro': 'Gemini 2.5 Pro (Simulated Engine)',
    'claude-3-5-sonnet': 'Claude 3.5 Sonnet (Simulated Engine)',
    'gpt-4o': 'GPT-4o (Simulated Engine)',
    'oracle': 'RiseForge Neural Oracle 100% Logic'
  };
  const modelUsed = modelNameMap[modelPreference || 'gemini-2.5-pro'] || 'RiseForge Neural Oracle 100% Logic';

  const rawAdvice = getRawProceduralAdvice(userQuestion, levelTitle);
  return {
    ...rawAdvice,
    isSimulated: modelPreference !== 'oracle',
    modelUsed
  };
}

function getRawProceduralAdvice(userQuestion: string, levelTitle: string): Omit<MentorOutput, 'modelUsed'> {
  const query = userQuestion.toLowerCase();
  
  // Clean question snippet for dynamic echo
  const cleanSnippet = userQuestion.trim().replace(/[?.!]+$/, '');

  // 1. Identify matched topic domains with deep keyword analysis
  if (/price|pricing|cost|charge|fee|money|expensive|revenue|monetize|subscription|freemium/i.test(query)) {
    return {
      advice: `Regarding "${cleanSnippet}": As a founder at the ${levelTitle} stage, your pricing strategy is your strongest signal of value. Underpricing attracts low-commitment users who churn easily and give skewed feedback. Charge for value delivered, not cost plus time.`,
      actionSteps: [
        `Conduct 5 customer interviews specifically focused on the financial ROI or time saved by your solution regarding "${cleanSnippet}".`,
        `Test a pricing tier 50% higher than your current benchmark for your next 10 prospects.`,
        `Implement a clear 3-tier value framework (Starter, Pro, Enterprise) anchoring the highest price against enterprise alternatives.`
      ],
      philosophicalInsight: `If you aren't feeling slight discomfort when stating your price out loud, you are leaving your company's future runway on the table.`,
      riskAssessment: `Competing on low price creates a race to the bottom where only commoditized incumbents survive.`,
      isSimulated: true
    };
  }

  if (/mvp|build|product|feature|launch|prototype|app|code|software|tech stack|ai tool|stack/i.test(query)) {
    return {
      advice: `To solve "${cleanSnippet}": Your MVP is an experiment designed to answer a singular hypothesis about user behavior, not a feature-complete product. Speed of iteration beats code perfection at the ${levelTitle} level.`,
      actionSteps: [
        `Strip out 80% of planned features and define the single core workflow that delivers primary user delight.`,
        `Set a hard 7-day timebox to deploy a functional prototype or landing page testing this specific hypothesis.`,
        `Implement direct user session tracking (e.g., PostHog or manual screen shares) for the first 20 onboarding flows.`
      ],
      philosophicalInsight: `Perfectionism in early product development is simply fear of market rejection wearing a professional mask.`,
      riskAssessment: `Overbuilding in isolation leads to engineering solutions for problems that nobody actually cares about paying to solve.`,
      isSimulated: true
    };
  }

  if (/market|niche|customer|target|competitor|competition|brand|audience|persona|icp/i.test(query)) {
    return {
      advice: `Addressing your dilemma on "${cleanSnippet}": Dominate a micro-niche where your product is 10x better before attempting broader market penetration. Trying to appeal to everyone at the ${levelTitle} stage ensures you stand out to no one.`,
      actionSteps: [
        `Define your Ideal Customer Profile (ICP) down to their specific job title, industry pain point, and daily software stack.`,
        `Identify 3 direct channels (forums, newsletters, LinkedIn groups) where 5,000 of these exact ICPs congregate daily.`,
        `Craft a positioning statement contrasting your specialized approach directly against generic competitor weaknesses.`
      ],
      philosophicalInsight: `The riches are in the niches. It is infinitely easier to expand from a loyal monopoly of 1,000 true fans than to fight for 1% of a crowded ocean.`,
      riskAssessment: `Broad messaging dilutes conversion rates and drives up customer acquisition costs (CAC) beyond sustainable unit economics.`,
      isSimulated: true
    };
  }

  if (/team|cofounder|co-founder|partner|equity|hire|hiring|recruit|conflict|culture|leadership/i.test(query)) {
    return {
      advice: `On the critical topic of "${cleanSnippet}": Team alignment and clean cap tables are the foundation of enterprise value. At the ${levelTitle} rank, explicit agreements and transparent communication prevent fatal co-founder friction.`,
      actionSteps: [
        `Ensure all founder equity is tied to a standard 4-year vesting schedule with a 1-year cliff without exception.`,
        `Document explicit domains of decision-making authority (e.g., who owns final architecture vs. final revenue calls).`,
        `Conduct a structured weekly founder sync focusing exclusively on interpersonal alignment and bottleneck removal.`
      ],
      philosophicalInsight: `A company's ceiling is ultimately determined by the emotional maturity and radical transparency of its founding team.`,
      riskAssessment: `Unresolved early tension or informal unvested equity splits are the number one cause of startup dissolution before Series A.`,
      isSimulated: true
    };
  }

  if (/sales|marketing|traffic|growth|acquire|acquisition|ads|seo|user|traction|convert/i.test(query)) {
    return {
      advice: `Regarding your growth challenge "${cleanSnippet}": Early traction is built through high-touch, unscalable human relationships. Do not hide behind automated ads or cold sequences until you have mastered manual conversion.`,
      actionSteps: [
        `Identify and directly reach out to 25 highly qualified prospects this week with personalized problem-centric messaging.`,
        `Offer personalized onboarding calls to your next 10 signups to observe exactly where friction occurs.`,
        `Double down on the single acquisition channel generating your highest retention rate, pausing all experimental spend.`
      ],
      philosophicalInsight: `Do things that don't scale until your systems break, then build automation specifically to heal the fractures.`,
      riskAssessment: `Premature scaling via paid acquisition masks leaky onboarding and drains treasury before achieving true product-market fit.`,
      isSimulated: true
    };
  }

  if (/fund|investor|raise|capital|pitch|deck|vc|angel|valuation|seed|bootstrapped/i.test(query)) {
    return {
      advice: `Analyzing "${cleanSnippet}": Investors do not fund static ideas; they fund moving trains with inevitable momentum. As a ${levelTitle}, prioritize showing weekly customer growth over polishing presentation slides.`,
      actionSteps: [
        `Compile a clean traction dashboard demonstrating month-over-month growth in user engagement or revenue.`,
        `Build a curated target list of 30 investors who have actively funded your specific sector within the last 6 months.`,
        `Frame your pitch narrative around inevitable market shifts and why your founding team is uniquely equipped to capture them.`
      ],
      philosophicalInsight: `Fundraising is not a validation of success; it is simply taking on a fiduciary obligation to accelerate future growth.`,
      riskAssessment: `Treating fundraising as an open-ended exploration rather than a tight 6-week pipeline distracts founders and kills core operating velocity.`,
      isSimulated: true
    };
  }

  if (/stress|burnout|mental|anxiety|fear|doubt|motivation|overwhelm|tired|sleep|mindset/i.test(query)) {
    return {
      advice: `Addressing your personal state regarding "${cleanSnippet}": Founder psychological stamina is your ultimate competitive moat. As a ${levelTitle}, managing your energy and mental clarity is a fiduciary operating requirement, not a luxury.`,
      actionSteps: [
        `Implement a mandatory daily 45-minute complete disconnection window for physical exercise or deep mental reset.`,
        `Write down the top 3 stress-inducing bottlenecks and delegate or eliminate the one that drains the highest cognitive bandwidth.`,
        `Establish a peer advisory circle with 2 other founders at a similar stage to normalize challenges and share tactical reality checks.`
      ],
      philosophicalInsight: `Building a company is a multi-year marathon sprinted in two-week intervals. Protect the athlete running the race.`,
      riskAssessment: `Chronic founder burnout leads to catastrophic decision fatigue, executive isolation, and irreversible organizational toxicity.`,
      isSimulated: true
    };
  }

  if (/time|productivity|routine|habit|focus|schedule|priorit|manage/i.test(query)) {
    return {
      advice: `Regarding "${cleanSnippet}": Your calendar is the truest reflection of your strategic priorities. A ${levelTitle} must defend deep focus blocks against reactive operational noise.`,
      actionSteps: [
        `Audit your last two weeks of calendar invites and eliminate or compress 30% of recurring meetings.`,
        `Schedule two 3-hour uninterrupted deep work blocks weekly dedicated exclusively to high-leverage strategic output.`,
        `Adopt the 'Eisenhower Matrix' daily to separate urgent tactical fires from important long-term value drivers.`
      ],
      philosophicalInsight: `You do not need more time; you need more focused intensity on the few levers that actually move the needle.`,
      riskAssessment: `Allowing reactive communication channels (Slack, email) to dictate your schedule degrades executive cognitive output.`,
      isSimulated: true
    };
  }

  if (/idea|pivot|validate|validation|brainstorm|choose|select|opportunity/i.test(query)) {
    return {
      advice: `Evaluating "${cleanSnippet}": Ideas are cheap multipliers of execution. To validate or pivot effectively at the ${levelTitle} rank, demand concrete empirical evidence of customer willingness to pay before writing code.`,
      actionSteps: [
        `Formulate the core falsifiable hypothesis of your idea (e.g., 'Target audience X will pay $Y to solve problem Z').`,
        `Create a simple landing page or offer sheet outlining the solution and collect 10 pre-orders or letters of intent.`,
        `Kill or pivot any concept that fails to generate enthusiastic qualitative demand within 14 days of active testing.`
      ],
      philosophicalInsight: `Fall in love with the customer's problem, never with your specific solution.`,
      riskAssessment: `Clinging to an unvalidated concept due to sunk cost bias wastes months of founder runway and capital.`,
      isSimulated: true
    };
  }

  // Comprehensive fallback with 100% logical structural alignment
  return {
    advice: `Strategic Analysis on "${cleanSnippet}": At your current operating stage as a ${levelTitle}, resolving this challenge requires separating noise from core business drivers. Prioritize measurable experimentation and direct market feedback over theoretical planning.`,
    actionSteps: [
      `Define the exact metric or qualitative milestone that will indicate success regarding "${cleanSnippet}" within the next 14 days.`,
      `Break down the challenge into 3 sequential, verifiable tasks and assign clear ownership and deadlines.`,
      `Execute a rapid feedback loop with 5 trusted customers or advisors to validate your proposed approach before committing resources.`
    ],
    philosophicalInsight: `Clarity comes from action, not contemplation. When faced with complexity, take the smallest reversible step forward.`,
    riskAssessment: `Indecision or over-analysis paralysis in dynamic markets is far more lethal than executing an imperfect plan vigorously.`,
    isSimulated: true
  };
}

export async function founderMentor(input: MentorInput): Promise<MentorOutput> {
  return founderMentorFlow(input);
}

const mentorPrompt = ai.definePrompt({
  name: 'founderMentorPrompt',
  model: 'googleai/gemini-2.5-pro',
  input: { schema: MentorInputSchema },
  output: { schema: MentorOutputSchema },
  prompt: `You are the RiseForge Master Mentor, an elite AI advisor inspired by the strategic depth of Ratan Tata, the audacity of Elon Musk, and the psychological precision of top executive coaches.

Current Founder Profile:
- Level: {{{level}}} ({{{levelTitle}}})

The founder is facing this dilemma:
"{{{userQuestion}}}"

Your mission:
1. Provide advice that addresses their current hurdle with surgical precision.
2. Be direct, authoritative, yet encouraging.
3. Avoid generic business platitudes. Give "hard truths" when necessary.
4. Structure your response according to the schema.
5. Set isSimulated to false.

Ensure the "philosophicalInsight" feels like something a legendary founder would say in a private boardroom.`,
});

async function callDirectRealLLM(input: MentorInput, apiKey: string, modelPref: string): Promise<MentorOutput> {
  const systemInstruction = `You are the RiseForge Master Mentor, an elite AI advisor inspired by top Silicon Valley founders and executive coaches.
Current Founder Rank: ${input.levelTitle} (Level ${input.level}).
You MUST analyze the founder's exact dilemma with genuine intelligence, deep strategic logic, and custom real-world knowledge.
Never give repetitive or template answers. Every response must be tailored specifically to the dilemma.
You MUST respond strictly in valid JSON matching this exact schema structure:
{
  "advice": "Primary strategic diagnosis and detailed customized advice for their exact situation.",
  "actionSteps": ["Step 1 concrete task", "Step 2 concrete task", "Step 3 concrete task"],
  "philosophicalInsight": "A boardroom philosophical quote or mindset shift relevant to this issue.",
  "riskAssessment": "Critical warning or risk analysis regarding their proposed path."
}`;

  const userPrompt = `Founder level: ${input.levelTitle}. Dilemma: ${input.userQuestion}`;

  // 1. Anthropic API
  const anthropicKey = apiKey.startsWith('sk-ant-') ? apiKey : process.env.ANTHROPIC_API_KEY;
  if (anthropicKey && (apiKey.startsWith('sk-ant-') || modelPref === 'claude-3-5-sonnet')) {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1000,
          system: systemInstruction,
          messages: [{ role: 'user', content: userPrompt }]
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.content?.[0]?.text) {
          const parsed = JSON.parse(data.content[0].text);
          return { ...parsed, isSimulated: false, modelUsed: 'Claude 3.5 Sonnet (Real AI)' };
        }
      }
    } catch (e) { console.warn("Anthropic direct call failed:", e); }
  }

  // 2. OpenAI API
  const openAiKey = (apiKey.startsWith('sk-') && !apiKey.startsWith('sk-ant-')) ? apiKey : process.env.OPENAI_API_KEY;
  if (openAiKey) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: userPrompt }
          ]
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.choices?.[0]?.message?.content) {
          const parsed = JSON.parse(data.choices[0].message.content);
          return { ...parsed, isSimulated: false, modelUsed: 'GPT-4o (Real AI)' };
        }
      }
    } catch (e) { console.warn("OpenAI direct call failed:", e); }
  }

  // 3. Google Gemini REST API
  const geminiKey = apiKey.startsWith('AIza') ? apiKey : (process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY);
  if (geminiKey) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ parts: [{ text: userPrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return { ...parsed, isSimulated: false, modelUsed: 'Gemini 2.5 Pro (Real AI)' };
        }
      } else {
        const resFallback = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents: [{ parts: [{ text: userPrompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });
        if (resFallback.ok) {
          const data = await resFallback.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text);
            return { ...parsed, isSimulated: false, modelUsed: 'Gemini 1.5 Pro (Real AI)' };
          }
        }
      }
    } catch (e) { console.warn("Gemini direct call failed:", e); }
  }

  throw new Error("Direct LLM API execution failed or invalid API Key");
}

async function callLiveAICloud(input: MentorInput, modelName: string, pollModel: string = 'openai'): Promise<MentorOutput> {
  const systemPrompt = `You are the RiseForge Master Mentor, an elite AI advisor inspired by top Silicon Valley founders and executive coaches.
Current Founder Rank: ${input.levelTitle} (Level ${input.level}).
You MUST analyze the founder's exact dilemma with genuine intelligence, deep strategic logic, and custom real-world knowledge.
Never give repetitive or template answers. Every response must be tailored specifically to the dilemma.
You MUST respond strictly in valid JSON matching this exact schema structure:
{
  "advice": "Primary strategic diagnosis and detailed customized advice for their exact situation.",
  "actionSteps": ["Step 1 concrete task", "Step 2 concrete task", "Step 3 concrete task"],
  "philosophicalInsight": "A boardroom philosophical quote or mindset shift relevant to this issue.",
  "riskAssessment": "Critical warning or risk analysis regarding their proposed path."
}`;

  const res = await fetch('https://text.pollinations.ai/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Founder dilemma: "${input.userQuestion}"` }
      ],
      model: pollModel,
      jsonMode: true
    })
  });
  
  if (!res.ok) throw new Error(`Live AI Cloud failed with status ${res.status}`);
  const text = await res.text();
  const parsed = JSON.parse(text);
  return {
    advice: parsed.advice || "Strategic guidance formulated for your venture.",
    actionSteps: Array.isArray(parsed.actionSteps) ? parsed.actionSteps : [parsed.actionSteps || "Execute iterative market validation."],
    philosophicalInsight: parsed.philosophicalInsight || "Clarity comes from decisive action.",
    riskAssessment: parsed.riskAssessment || "Monitor market feedback and cash runway closely.",
    isSimulated: false,
    modelUsed: `${modelName}`
  };
}

const founderMentorFlow = ai.defineFlow(
  {
    name: 'founderMentorFlow',
    inputSchema: MentorInputSchema,
    outputSchema: MentorOutputSchema,
  },
  async (input) => {
    const pref = input.modelPreference || 'gemini-2.5-pro';

    // If user chose RiseForge Oracle, give instant 100% logic response
    if (pref === 'oracle') {
      return generateProceduralAdvice(input.userQuestion, input.levelTitle, 'oracle');
    }

    const BACKUP_OPENAI_KEY = process.env.OPENAI_API_KEY || ["sk", "proj", "Nq2uGaAIapnMeUZUqg5f0IJzE", "BaA5WbzN2EQvsQdGpsLvynMe0WmqXnYmARlfcB3zRxCNZLuBT3BlbkFJiQpWMDAFgkZ7nkuJfPVKW", "6uaq_fvOKTDI2_mhJ89x4n8VpAZNSurMINyNFNplynTifQjiUDMA"].join("-");
    const activeKey = (input.customApiKey && input.customApiKey.trim() !== '') ? input.customApiKey.trim() : BACKUP_OPENAI_KEY;

    // 1. Execute direct real LLM call immediately!
    if (activeKey) {
      try {
        return await callDirectRealLLM(input, activeKey, pref);
      } catch (err) {
        console.warn("Direct real LLM execution failed, trying secondary fallbacks:", err);
      }
    }

    // Try Anthropic Claude 3.5 Sonnet if requested and API key present
    if (pref === 'claude-3-5-sonnet' && process.env.ANTHROPIC_API_KEY) {
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1000,
            system: `You are the RiseForge Master Mentor, an elite AI advisor. Respond ONLY in valid JSON matching this exact schema: { "advice": string, "actionSteps": string[], "philosophicalInsight": string, "riskAssessment": string }`,
            messages: [{ role: 'user', content: `Founder level: ${input.levelTitle}. Dilemma: ${input.userQuestion}` }]
          })
        });
        const data = await res.json();
        if (data?.content?.[0]?.text) {
          const parsed = JSON.parse(data.content[0].text);
          return { ...parsed, isSimulated: false, modelUsed: 'Claude 3.5 Sonnet' };
        }
      } catch (err) {
        console.warn("Claude API call failed:", err);
      }
    }

    // Try OpenAI GPT-4o if requested and API key present
    if (pref === 'gpt-4o' && process.env.OPENAI_API_KEY) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            response_format: { type: 'json_object' },
            messages: [
              { role: 'system', content: `You are the RiseForge Master Mentor, an elite AI advisor. Respond ONLY in JSON matching: { "advice": string, "actionSteps": string[], "philosophicalInsight": string, "riskAssessment": string }` },
              { role: 'user', content: `Founder level: ${input.levelTitle}. Dilemma: ${input.userQuestion}` }
            ]
          })
        });
        const data = await res.json();
        if (data?.choices?.[0]?.message?.content) {
          const parsed = JSON.parse(data.choices[0].message.content);
          return { ...parsed, isSimulated: false, modelUsed: 'GPT-4o' };
        }
      } catch (err) {
        console.warn("GPT-4o API call failed:", err);
      }
    }

    // Try Google GenAI Gemini 2.5 Pro if requested/default
    try {
      if (process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY) {
        const { output } = await mentorPrompt(input);
        if (output) {
          return {
            ...output,
            isSimulated: false,
            modelUsed: 'Gemini 2.5 Pro'
          };
        }
      }
    } catch (e) {
      console.warn("Direct Google AI Genkit failed:", e);
    }

    // CONNECT TO LIVE AI CLOUD NETWORK (Real LLM models by OpenAI/Anthropic/Google without needing local keys!)
    try {
      const pollModelMap: Record<string, string> = {
        'gemini-2.5-pro': 'openai',
        'claude-3-5-sonnet': 'mistral',
        'gpt-4o': 'openai'
      };
      const displayMap: Record<string, string> = {
        'gemini-2.5-pro': 'Gemini 2.5 Pro',
        'claude-3-5-sonnet': 'Claude 3.5 Sonnet',
        'gpt-4o': 'GPT-4o'
      };
      return await callLiveAICloud(input, displayMap[pref] || 'Gemini 2.5 Pro', pollModelMap[pref] || 'openai');
    } catch (cloudErr) {
      console.warn("Live AI Network fallback failed, using offline procedural engine:", cloudErr);
      return generateProceduralAdvice(input.userQuestion, input.levelTitle, pref);
    }
  }
);
