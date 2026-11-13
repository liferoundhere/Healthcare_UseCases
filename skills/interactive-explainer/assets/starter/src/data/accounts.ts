/**
 * Account workspaces. "generic" is the general explainer; the others are named accounts.
 * The researched content of a named account (facts, priorities, tagline, about) is filled in here from public sources.
 * Every fact carries its source. Nothing here states what an account runs or has bought.
 */
export interface AccountFact { v: string; l: string; s: string; url?: string }
export interface AccountPriority { title: string; detail: string; s?: string; url?: string }
export interface Account { id: string; name: string; short: string; tagline: string; about: string; facts: AccountFact[]; priorities: AccountPriority[]; caveat: string }

const HYPOTHESIS = "Built from public sources. Every use case is a hypothesis to validate with the account, not a statement about what they run or have bought.";

export const ACCOUNTS: Account[] = [
  {
    id: "generic", name: "Any health system", short: "Generic",
    tagline: "The general explainer, not tied to one customer",
    about: "Stories, platform and combinations as they apply to any hospital. Ratings and notes captured here stay apart from the named account workspaces.",
    facts: [], priorities: [],
    caveat: "Outcomes with Cisco Cloud Control are modeled. Every use case is a hypothesis to validate with the customer.",
  },
  {
    id: "nyu", name: "NYU Langone Health", short: "NYU Langone",
    tagline: "Account workspace",
    about: "A workspace for discovery conversations and the account plan for NYU Langone Health.",
    facts: [], priorities: [],
    caveat: HYPOTHESIS,
  },
  {
    id: "msk", name: "Memorial Sloan Kettering Cancer Center", short: "MSK",
    tagline: "Account workspace",
    about: "A workspace for discovery conversations and the account plan for Memorial Sloan Kettering Cancer Center.",
    facts: [], priorities: [],
    caveat: HYPOTHESIS,
  },
];

/**
 * Researched content is generated into ./account-content.ts (ACCOUNT_CONTENT, keyed by account id) from the research briefs.
 * When that file is present its tagline, about, facts and priorities replace the neutral placeholders above;
 * when it is absent the workspaces still work, with an empty brief.
 */
type Content = Partial<Pick<Account, "tagline" | "about" | "facts" | "priorities">>;
const generated = import.meta.glob<{ ACCOUNT_CONTENT?: Record<string, Content> }>("./account-content.ts", { eager: true });
for (const mod of Object.values(generated)) {
  for (const a of ACCOUNTS) {
    const c = a.id === "generic" ? undefined : mod.ACCOUNT_CONTENT?.[a.id]; if (!c) continue;
    if (c.tagline) a.tagline = c.tagline;
    if (c.about) a.about = c.about;
    if (Array.isArray(c.facts)) a.facts = c.facts;
    if (Array.isArray(c.priorities)) a.priorities = c.priorities;
  }
}

export const DEFAULT_ACCOUNT = "generic";
export const accountById = (id: string | null | undefined): Account | undefined => ACCOUNTS.find((a) => a.id === id);
