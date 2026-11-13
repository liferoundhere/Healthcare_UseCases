# Research Brief 09: Agentic Operations in the Clinical Space and AI Operations in the Workplace, 2025 to 2026 Evidence

Compiled: Friday, Nov 13, 2026. Scope: what hospitals actually run today versus an agentic operating model (people plus governed AI agents), across four lenses: network operations, security operations, clinical operations, workplace/office operations.

## How to read this brief

- Bracketed numbers refer to the numbered Sources section.
- Each source carries a verification tag:
  - **(F)** = the page or abstract was fetched and read for this brief.
  - **(S)** = the figure comes from a search-result summary because the page itself was blocked (HTTP 403/402/503) or not opened. Treat (S) figures as "confirm before putting on a slide".
- **VENDOR-REPORTED** = the number comes from a vendor, a vendor-funded survey, or a customer story published by a vendor.
- **ESTIMATE** = a modelled or extrapolated figure, not a measurement.
- Rows labelled *Framing* in the "agentic, with humans approving" tables describe an operating-model design choice. They are not cited facts; the cited evidence sits in the adjacent column.
- This brief does not repeat brief 04 (AI in healthcare), brief 02 (security) or brief 05 (Cisco Cloud Control). Where an earlier brief already holds the number (AMA physician AI use, the KLAS 79% ambient figure, IBM breach costs, ONC HTI-5), it is cross-referenced rather than re-cited.
- Not re-verified here: the federal-terminology and ONC HTI-5 items recorded in brief 04.

---

## Executive summary

1. **Ambient documentation is the one clinical AI category at real scale, and the trial evidence is more modest than the marketing.** Spend on ambient documentation reached an estimated $600 million in 2025 (ESTIMATE) [10]. Two randomized trials in NEJM AI (Nov 2025) found small or mixed time savings and clearer gains in burnout and work exhaustion: one scribe cut time-in-note 9.5% versus control while the other showed no significant change [1]; a second trial found time on notes fell 0.36 hours per day [2].
2. **"Agentic" is mostly early.** Deloitte found 49% of large US health systems and plans still experimenting with generative and agentic AI and about one-third operating AI at scale (n=120, Aug to Sep 2025) [18]. In a CHIME Foundation/Censinet survey, 63% of 51 healthcare organizations planned to implement agentic AI within 12 months (VENDOR-REPORTED) [34].
3. **EHR vendors are turning agents into a platform.** Epic says more than 85% of its customers use Epic AI (VENDOR-REPORTED, Mar 2026) [11]; at UGM 2026, 129 features of Art, Emmie and Penny were listed as available in Agent Factory, with 78 more in development [12]. Microsoft reports more than 100,000 clinicians on Dragon Copilot (VENDOR-REPORTED, Mar 2026) [14]. Abridge reports deployment at more than 300 health systems (VENDOR-REPORTED, Aug 2026) [15].
4. **Nurse-facing and virtual-nursing evidence is mixed.** In a JAMA Network Open survey of 880 hospital nurses, 57% said virtual nurses did not reduce their workload and 10% said workload increased [5].
5. **Governance is forming faster than tooling.** Joint Commission and CHAI issued guidance on Sept 17, 2025 [35] and the Joint Commission has since launched a voluntary Responsible Use of AI in Healthcare certification [36]. 84% of surveyed organizations have an AI governance committee, yet about 10% use automated monitoring to discover AI in their products (n=51, VENDOR-REPORTED) [34]. Fewer than 25% of clinicians using AI strongly agree they were adequately trained to validate AI output [16].
6. **Data egress is measurable.** In healthcare, regulated data made up 89% of generative-AI data policy violations versus 31% across industries (VENDOR-REPORTED telemetry, Dec 2024 to Dec 2025) [32].
7. **IT operations run short on people and long on noise.** 59% of security teams report too many alerts and 46% spend more time maintaining tools than defending (n=2,058) [50]. 31% of network teams call themselves completely successful (n=352) [53]. 21% of healthcare IT professionals describe themselves as critically understaffed (n=300+, VENDOR-REPORTED) [54].
8. **Infrastructure is the stated constraint on agents.** 54% of organizations say their networks cannot scale for AI complexity or data volume, 26% have robust GPU capacity, and 31% feel fully equipped to control and secure AI agents (Cisco AI Readiness Index 2025, n=8,000+, VENDOR-REPORTED, cross-industry) [47]. Machine identities, including AI agents, outnumber human identities 109:1 (VENDOR-REPORTED) [57]. 55% cannot accurately control AI costs (VENDOR-REPORTED) [52].
9. **The risks are documented in peer review.** In a pilot audit, 11.5% of reviewed ambient notes contained a hallucination and 5.3% contained an error rated serious or imminent risk if uncorrected [4]. Prompt-injection attacks on LLMs giving medical advice succeeded in 94.4% of simulated dialogues [6]. Systematically biased AI lowered clinician diagnostic accuracy by 11.3 percentage points [7]. ECRI ranked misuse of AI chatbots the top health technology hazard for 2026 and unpreparedness for a "digital darkness" event second [37].
10. **No healthcare cut of the Cisco indices was found.** The Cisco AI Readiness Index 2025, the Cisco Cybersecurity Readiness Index 2025, the Splunk reports and Cisco's 2025 networking research are cross-industry as published; present them that way (see Gaps).

---

## Lens 1: Network operations

### Today

| What is true today | Number | Sample / date | Source |
|---|---|---|---|
| Network teams that call themselves completely successful at monitoring and managing networks | 31% | EMA Network Management Megatrends 2026, 352 IT professionals; reported May 2026 (cross-industry) | [53] |
| IT leaders who faced major network outages, driven by congestion, cyberattacks and misconfigurations | 77% | Cisco 2025 networking research, 8,065 leaders, 30 markets, fielded Dec 2024 (VENDOR-REPORTED, cross-industry) | [49] |
| Estimated global cost of one severe disruption per business per year | $160 billion (ESTIMATE) | Same study; extrapolated from reported average disruption cost | [49] |
| Organizations that say their networks cannot scale for AI complexity or data volume | 54% | Cisco AI Readiness Index 2025, 8,000+ leaders, 26 industries (VENDOR-REPORTED, cross-industry) | [47] |
| Organizations that describe their networks as flexible or adaptable | 15% | Same | [47] |
| IT leaders who say data centers cannot yet meet today's AI demands | 71% | Cisco 2025 networking research (VENDOR-REPORTED) | [49] |
| Say autonomous, AI-powered networks are essential; have deployed the intelligent capabilities (segmentation, visibility, control) | 98%; 41% | Same | [49] |
| Healthcare IT professionals "critically understaffed and at risk of burnout" | 21% | Nile report, 300+ global healthcare IT professionals; reported Aug 2026 (VENDOR-REPORTED) | [54] |
| Share of impactful data center outages attributed to IT and networking issues | 23% | Uptime Institute Annual Outage Analysis 2025 (2024 data) | [64] (S) |
| Where operators sit on the TM Forum autonomy ladder | Most self-report around Level 2 of 5 | Analyst article, Aug 2025 (telecom operators, not hospitals) | [55] |

### Agentic, with humans approving

| Capability | What the agent does | Where the human approves (*Framing*) | Evidence that this is real | Source |
|---|---|---|---|---|
| Detection and triage | Correlates telemetry and proposes a probable cause | Engineer accepts or rejects the diagnosis | 86% report improved mean time to detect due to agentic AI (2,050 ITOps and engineering professionals, VENDOR-REPORTED) | [52] |
| Change execution | Drafts the change and the rollback | Engineer approves before any change to a clinical VLAN, wireless policy or WAN path | TM Forum Level 3 "conditional" (self-optimizes in certain domains under programmable policies) versus Level 4 "highly autonomous" (predictive, closed-loop across domains) is the published line between the two modes | [55] |
| Agent oversight | Agents themselves are monitored for quality, cost and unintended actions | Named owner per agent | 83% are concerned about unintended consequences of AI agents; 81% say monitoring AI workloads increased collaboration with security (VENDOR-REPORTED) | [52] |
| Guardrails | Agent actions are bounded and watched live | Policy owner sets the bounds | 24% of organizations can control agent actions with guardrails and live monitoring, versus 84% of the top-performing 13% (VENDOR-REPORTED) | [47] |
| Capacity for AI traffic | Forecasts and flags saturation ahead of ambient or video rollouts | Capacity plan sign-off | 62% expect workloads to rise more than 30% within three years; 88% plan to expand data center capacity (VENDOR-REPORTED) | [47][49] |

**Autonomy ladder, as published.** TM Forum defines six levels [55]: L0 manual operations and maintenance; L1 assisted (pre-configured repetitive subtasks); L2 partial autonomous (closed loop for specific units under static rules); L3 conditional autonomous (senses change and self-optimizes in certain domains under dynamically programmable policies); L4 highly autonomous (predictive or active closed-loop decisions across domains); L5 fully autonomous (closed-loop across services, domains and lifecycle). The same analyst piece reports TM Forum's finding that more than 50% of AI experimentation never reaches production [55].

---

## Lens 2: Security operations

### Today

| What is true today | Number | Sample / date | Source |
|---|---|---|---|
| Security teams with too many alerts; too many false positives | 59%; 55% | Splunk State of Security 2025, 2,058 security leaders, 9 countries, 16 industries, fielded Oct to Dec 2024 (VENDOR-REPORTED, cross-industry) | [50] |
| Spend more time maintaining tools than defending the organization | 46% | Same | [50] |
| Say their security tools are dispersed and disconnected | 78% | Same | [50] |
| Fully trust AI for mission-critical tasks | 11% | Same | [50] |
| Team is overworked; stress has made them consider leaving cybersecurity | 52%; 52% | Same | [50] |
| Infrastructures with more than ten point security solutions are impeding threat response | Over 77% | Cisco 2025 Cybersecurity Readiness Index, 8,000 leaders, 30 markets (VENDOR-REPORTED, cross-industry) | [48] |
| Organizations at "Mature" cybersecurity readiness | 4% (3% the prior year) | Same | [48] |
| Experienced AI-related security incidents in the last year | 86% | Same | [48] |
| Cite shortage of skilled cybersecurity professionals as a major challenge; more than ten open positions | 86%; more than half | Same | [48] |
| Lack confidence in detecting unregulated AI deployments (shadow AI) | 60% | Same | [48] |
| Healthcare IT professionals not confident, or only slightly confident, of containing a cyberattack | 61% | Nile report, 300+; Aug 2026 (VENDOR-REPORTED) | [54] |
| Cybersecurity professionals exhausted keeping up; often overwhelmed by workload | 48%; 47% | ISC2 2025, more than 16,000 professionals (cross-industry), as reported by IT Brew | [54] |
| Healthcare: share of generative-AI data policy violations that involve regulated data | 89% (31% across industries) | Netskope Threat Labs Healthcare 2026, platform telemetry Dec 1, 2024 to Dec 31, 2025 (VENDOR-REPORTED) | [32] |
| Healthcare: staff using personal generative-AI accounts | 82% down to 32% in a year; organization-managed use 12% up to 56% | Same | [32] |
| Healthcare organizations with connections to api.openai.com; api.assemblyai.com; api.anthropic.com | 63%; 62%; 36% | Same | [32] |
| Machine identities (including AI agents) per human identity | 109:1 | Palo Alto Networks 2026 Identity Security Landscape, 2,900+ decision-makers (VENDOR-REPORTED, cross-industry) | [57] |
| Organizations with a successful identity-related breach in the last 12 months | 9 in 10 | Same | [57] |

Breach cost, dwell-time and ransomware figures are in brief 02 and are not repeated here.

### Agentic, with humans approving

| Capability | What the agent does | Where the human approves (*Framing*) | Evidence that this is real | Source |
|---|---|---|---|---|
| Alert triage | Reviews and correlates more events than analysts can | Analyst owns the verdict | 92% of CISOs say AI enables their teams to review more security events; 89% report improved data correlation (650 CISOs, fielded Jul to Aug 2025, VENDOR-REPORTED) | [51] |
| Investigation and reporting | Assembles the case and the report | Analyst signs the report | 39% of CISOs who have partially or fully adopted agentic AI strongly agree it more than doubled reporting speed, versus 18% of those still exploring (VENDOR-REPORTED) | [51] |
| Containment | Proposes isolation of a host, user or device | Human approves before isolating anything clinical | 82% of CISOs expect agentic AI to increase correlation and response speed; 86% fear it will increase the sophistication of social engineering (VENDOR-REPORTED) | [51] |
| Agent identity | Each agent has its own identity and scoped permissions | Identity owner grants and reviews scope | NIST launched the AI Agent Standards Initiative on Feb 17, 2026, with research on agent security and identity and an "AI Agent Identity and Authorization Concept Paper" | [43] |
| Securing the agents themselves | Guardrails, monitoring and least privilege on agent tools | Security architect sets policy | 31% of organizations feel fully equipped to control and secure AI agents, versus 75% of top performers (VENDOR-REPORTED) | [47] |
| AI governance | Inventory of AI in use, approval before deployment | Governance committee | 84% have an AI governance committee; 59% have a formal documented approval process; about 10% use automated monitoring to detect AI capabilities; 8% are "very confident" in identifying emerging AI risks (51 organizations, Dec 2025, VENDOR-REPORTED) | [34] |

**Autonomy ladder for the SOC.** An academic framework (Mohsin et al., first posted May 2025) defines five levels of AI autonomy "from manual to fully autonomous", mapped to human-in-the-loop roles and task-specific trust thresholds [56]. Trade press reporting on the Splunk CISO Report says 6% of the 650 CISOs had fully deployed agentic AI in security operations and nearly two-thirds disagreed that agentic AI will replace some level 1 functions [51a] (S).

---

## Lens 3: Clinical operations

### Today

| Area | What hospitals run today | Number | Sample / date | Source |
|---|---|---|---|---|
| Market size | Healthcare AI spend, 2025 | $1.4 billion, nearly triple 2024 (ESTIMATE) | Menlo Ventures with Morning Consult, 700+ executives, Aug to Sep 2025 | [10] |
| Market size | Ambient documentation; coding and billing automation; prior authorization; patient engagement | $600 million; $450 million; $100 million+ (about 10x); $100 million+ (about 20x) (ESTIMATE) | Same | [10] |
| Adoption | Organizations that have deployed AI: all healthcare; health systems; outpatient providers; payers | 22%; 27%; 18%; 14% | Same | [10] |
| Adoption | Providers at full rollout of ambient documentation; in pilot | Roughly 1 in 5; another 2 in 5 | Bain and KLAS, about 228 US provider and payer executives, Oct 9, 2025 | [17] |
| Adoption | Providers with an AI strategy in place or in development | 70% (60% a year earlier) | Same | [17] |
| Adoption | Large systems and plans still experimenting with generative and agentic AI; not adopted; at scale | 49%; 18%; about one-third | Deloitte, 120 C-suite executives, Aug to Sep 2025 | [18] |
| Adoption | Leaders reporting generative AI implemented; agentic AI at that maturity; agentic proofs of concept | 50%; 19%; 51% | McKinsey, Q4 2025 survey of US healthcare leaders | [19] (S) |
| Ambient vendors | Share among health systems: Microsoft DAX Copilot; Abridge; Ambience | 33%; 30%; 13% (ESTIMATE) | Menlo Ventures, Oct 2025 | [10] |
| Microsoft | Clinicians relying on Dragon Copilot; countries; languages captured | More than 100,000; 9; 58 (VENDOR-REPORTED) | Microsoft, Mar 5, 2026 | [14] |
| Abridge | Health systems with the platform deployed | More than 300 (VENDOR-REPORTED) | Aug 17, 2026 | [15] |
| Epic | Customers using Epic AI | More than 85% (VENDOR-REPORTED) | Epic, Mar 10, 2026 | [11] |
| Epic | Chart with Art (ambient charting): specialties live; organizations live for nurses | 70; 10 (VENDOR-REPORTED) | UGM, Aug 2026 | [12] |
| Epic users | Physicians using ambient visit-note documentation; nurses using shift and patient-stay summaries | 71%; 30% | KLAS Arch Collaborative, 12 Epic organizations, reported Jul 2026 | [16] |
| Oracle Health | KLAS interviewees who would buy the Clinical AI Agent again; who had tested inpatient or emergency functionality | 94%; 12% | KLAS, 17 organizations, as reported by Becker's | [61] (S) |
| Nursing burden | Share of a 12-hour shift spent in flowsheets | 31.11% | One academic health system, EHR vendor time data, JMIR Nursing 2025 | [8] |
| Virtual nursing | Nurses reporting virtual nurses did not reduce workload; increased it; improved quality "by a lot" | 57%; 10%; 11% | 880 hospital nurses in 10 states, surveyed Dec 2023 to Mar 2024, JAMA Network Open Dec 2025 | [5] |
| Virtual nursing | Top uses: patient observation; admission and discharge activities; patient education | 53%; 45%; 37% | Same | [5] |
| Virtual nursing | Nurse leaders whose organization is implementing virtual care; piloting; no investment | 40%; 15%; 15% | AONL Quick Hit: Virtual Care, 867 nurse leaders from 363 hospitals and 204 health systems, Feb 2026 | [62] |
| Virtual nursing | Nurse leaders who feel virtual care improves length of stay; patient throughput | 21%; 29% | Same | [62] |
| Prior authorization | Prior authorizations per physician per week; physician and staff hours per week; practices with staff working exclusively on it | 40; 13; 40% | AMA 2025 Prior Authorization Physician Survey, 1,000 physicians, released May 13, 2026 | [21] |
| Prior authorization | Physicians reporting a serious adverse event from prior authorization; concerned AI may further increase denials | 26%; 6 in 10 | Same | [21] |
| Prior authorization | Federal rule CMS-0057-F: impacted payers must implement certain provisions; meet API requirements | By Jan 1, 2026; primarily by Jan 1, 2027 | CMS final rule released Jan 17, 2024 | [22] |
| Revenue cycle | Providers with denial rates of 10% or higher; using AI; understaffed | 41%; 14%; 43% | Experian Health State of Claims 2025, 250 professionals (VENDOR-REPORTED) | [24] |
| Command centers | Customer outcomes: 1.07-day length-of-stay reduction (The Queen's Health Systems); 66% reduction in time from bed request to bed assigned (Duke) | VENDOR-REPORTED; no timeframe stated | GE HealthCare Command Center outcomes page | [60] |

**Measured outcomes of ambient documentation (peer-reviewed, 2025 to 2026)**

| Study | Design | Result | Source |
|---|---|---|---|
| Lukac et al., NEJM AI (Epub Nov 26, 2025) | Three-arm pragmatic randomized trial, 238 outpatient physicians, 14 specialties, one academic center, Nov 4, 2024 to Jan 3, 2025 | One scribe: 9.5% decrease in time-in-note versus control (P=0.02). The other: no significant change (-1.7%, P=0.66). Scribes were used in 33.5% and 29.5% of visits. Burnout, task-load and work-exhaustion measures favoured both scribes but "need confirmation in larger, multicenter trials". One grade 1 adverse event; clinically significant inaccuracies noted "occasionally". | [1] |
| Afshar et al., NEJM AI (Epub Nov 26, 2025) | 24-week stepped-wedge randomized trial, 66 practitioners, two states | 27,092 of 71,487 notes (38%) used ambient AI. Work exhaustion/interpersonal disengagement fell 0.44 points on a five-point scale (P<0.001). Time on notes fell 0.36 hours per day. The work-outside-work reduction was not significant after removing extreme values. No software performance drift detected. | [2] |
| Olson et al., JAMA Network Open (Oct 2025) | Pre/post survey, 263 clinicians, 6 health systems, 30 days, no control group | Burnout 51.9% to 38.8% (odds ratio 0.26). After-hours documentation down a mean 0.90 hours. | [3] |
| Taylor et al., JMIR Medical Informatics (Apr 2026) | Pilot audit, 31 physicians, 356 of 7,545 notes reviewed, Jul to Aug 2024 | Omissions in 18% of reviewed notes, hallucinations in 11.5%, accidental inclusions in 9.3%. 5.3% of notes contained errors rated serious or imminent risk if uncorrected. 94.7% free from significant errors. 14.9% of sampled notes were left entirely unedited. | [4] |

Earlier ambient studies (JAMA Network Open Feb, May and Oct 2025; NEJM Catalyst 2025) are in brief 04 and are not repeated.

### Agentic, with humans approving

| Use case | What the agent does | Where the human approves | Evidence | Source |
|---|---|---|---|---|
| Ambient note | Drafts the visit note from the conversation | Clinician reviews and signs. Texas SB 1188 (effective Sept 1, 2025) requires practitioners to personally review AI-generated content before clinical decisions. | See outcomes table. The audit authors conclude "careful clinician review of notes remains imperative". | [1][2][4][40] |
| Nurse documentation | Turns nurse-patient conversation into flowsheet entries | The nurse must review and approve before documentation transfers to the EHR (VENDOR-REPORTED description) | Microsoft ambient nursing experience described as commercially available (Oct 2025) and available in the United States; covers med-surg flowsheet templates. No measured outcomes published in the announcements. | [14][20] |
| Chart summaries and discharge | Summarizes the chart; drafts hospital course and discharge summaries | Clinician edits and signs | Discharge summaries completed 20% to 30% faster at multiple organizations; Riverside Health reported up to 32% less time on documentation and communication tasks (VENDOR-REPORTED) | [11] |
| Decision support at the point of care | Retrieves evidence, pre-fills calculators, drafts referral letters and handoff summaries | Clinician decides | Monthly active users exceed 50% of eligible clinicians at participating systems (VENDOR-REPORTED) | [15] |
| Prior authorization (provider side) | Assembles and submits the request; drafts the appeal | Staff review; clinician attests | Summit Health: 42% reduction in submission time and 92% of AI-generated responses accepted without edits. Medical Necessity Insights: 180+ organizations live, 12,500 hours saved in prior authorization submission (VENDOR-REPORTED) | [11][12] |
| Prior authorization (payer side) | AI-enabled review of selected services | Nurse or clinician review before decisions | CMS WISeR model launched Jan 1, 2026 in six states for Traditional Medicare; critics warn of delay or denial of care | [23] (S) |
| Coding and denials | Suggests codes; drafts denial appeal letters | Coder or biller reviews | Professional Coding Assistant 360+ live; more than 40 groups cut coding denials by 20% or more. Denial Appeals Assistant 330+ live; medical-necessity appeals created 23% faster (VENDOR-REPORTED) | [12] |
| Patient access | Answers, authenticates, schedules and reschedules | Hand-off to staff for anything outside scope | Ochsner: more than 14,900 appointments rescheduled through Emmie, almost 750 staff hours saved. Rush: 58% sustained drop in billing-related customer service messages (VENDOR-REPORTED). See Lens 4 for contact-center results. | [11] |
| Capacity and flow | Surfaces bed, discharge and transfer bottlenecks | Charge nurse or command-center lead decides | GE HealthCare customer outcomes (VENDOR-REPORTED); no peer-reviewed 2025 to 2026 evaluation found | [60] |
| Virtual nursing | Remote nurse handles observation, admission, discharge and education by video | Bedside nurse remains accountable | Mixed: 53% of bedside nurses said quality improved and 57% said workload did not fall. Nurse leaders are more positive: roughly two-thirds of implementers report a positive impact on administrative and clinical workload. | [5][62] |
| Build-your-own agents | Health system composes agents inside the EHR | Governance committee approves each agent | 129 features of Art, Emmie and Penny available in Epic Agent Factory, 78 more in development (VENDOR-REPORTED, Aug 2026) | [12] |

---

## Lens 4: Workplace and office operations

Scope: administrative offices, contact centers, revenue cycle, hybrid work and facilities in a health system.

### Today

| What is true today | Number | Sample / date | Source |
|---|---|---|---|
| Annual US cost of administrative complexity | $265.6 billion (ESTIMATE, 2019 dollars) | Shrank et al., JAMA 2019 (older, canonical) | [9] |
| Administrative spending as a share of US health spending | 15% to 30% (ESTIMATE; definitions vary) | Health Affairs research brief, 2022 | [31] (S) |
| Hospital staff turnover; staff RN turnover | 18.5%; 17.6% | NSI National Health Care Retention Report 2026, 527 hospitals, 40 states, calendar 2025 | [28] |
| Average cost of turnover for one bedside RN; average hospital loss | $60,090; $4.2 million to $6.2 million | Same | [28] |
| RN vacancy rate; days to recruit an experienced RN | 8.6%; 78 | Same | [28] |
| Prior authorizations per physician per week; physician and staff hours per week | 40; 13 | AMA, 1,000 physicians, released May 2026 | [21] |
| Providers with denial rates of 10% or higher; claims teams understaffed | 41%; 43% | Experian Health, 250 professionals, Sept 2025 (VENDOR-REPORTED) | [24] |
| Believe AI can improve the claims process; actually using it | 67%; 14% | Same | [24] |
| Tampa General contact center before AI voice agents: average wait time; daily call abandonment | 6.2 minutes; 34% | AHA Market Scan, 2026, for wait time; trade press for the 34% (S) (VENDOR-REPORTED) | [26] |
| Community Health Network physician-practice calls per year before consolidation | 1.2 million | Cisco Webex customer story, Aug to Sep 2026 (VENDOR-REPORTED) | [25] |
| Healthcare staff using personal generative-AI accounts at work | 32%, down from 82% a year earlier | Netskope, Mar 2026 (VENDOR-REPORTED) | [32] |
| Regulated data as a share of data policy violations in personal cloud apps (healthcare) | 82% | Same | [32] |
| Providers and administrators who admit using an unapproved AI tool; who are aware a colleague has | Nearly 17% (15% of providers, 19% of administrators); 41% | Wolters Kluwer Health, 518 hospital and health system professionals (256 providers, 262 administrators), Dec 2025 (VENDOR-REPORTED); also in brief 04 | [33] |
| Energy intensity: inpatient versus outpatient health care buildings | 193.3 versus 82.0 thousand Btu per square foot | EIA CBECS 2018 (older) | [29] |
| Health care share of commercial floorspace versus commercial energy use | About 4% versus about 9% | Same | [29] |
| US office attendance versus pre-pandemic (10-city average); peak day | 56.4%; 65.3% | Kastle Back to Work Barometer, reading for about the week ending Nov 4, 2026 (all offices, not health systems) | [30] |

### Agentic, with humans approving

| Use case | What the agent does | Where the human approves (*Framing*) | Evidence | Source |
|---|---|---|---|---|
| Patient scheduling by phone | AI agent authenticates the caller and handles appointment calls | Live agent takes over outside scope | Community Health Network: 40% containment of appointment-related calls with Webex AI Agent; 95% patient-matching success; 15% reduction in agent attrition (VENDOR-REPORTED) | [25] |
| Outreach and no-shows | Proactive two-way text messaging | Staff own exceptions | Community Health Network: "did not attend" rate 12% to 6% with Webex Connect (VENDOR-REPORTED) | [25] |
| Agent assist | Brings a subject-matter expert into a live call | Human agent leads the call | 35% reduction in time to resolve complex issues (VENDOR-REPORTED) | [25] |
| Call abandonment | AI voice agents answer immediately | Staff handle escalations | Tampa General: 56% decrease in daily call abandonment, average wait 6.2 to 2.4 minutes, and 21% more appointments scheduled within two weeks of launch; live in about three months (VENDOR-REPORTED). Deloitte cites Sutter Health: 85% reduction in interaction abandonment with AI agents. | [26][18] |
| Billing questions | Portal assistant answers billing queries | Billing staff handle disputes | Rush University Medical Center: 58% sustained drop in billing-related customer service messages (VENDOR-REPORTED) | [11] |
| Employee assistants | Drafts, summarizes and searches across office documents and meetings | The employee reviews output | NHS England: 505,000 staff to receive Microsoft 365 Copilot; trial of more than 30,000 staff across 90 organizations reported 43 minutes saved per person per day (VENDOR-REPORTED; UK, not US) | [27] |
| Claims and denials | Flags likely denials and drafts resubmissions | Biller approves | 69% of AI users say AI reduced denials or increased resubmission success (VENDOR-REPORTED) | [24] |
| Building operations | Occupancy-based control of ventilation and space | Facilities engineer approves set-point policy; clinical spaces excluded unless validated | No 2025 to 2026 measured hospital figure found. A 2013 PNNL modelling result is listed under Gaps. | Gaps |

---

## Infrastructure demands of agentic care

| Demand | Why agentic clinical operations create it | Evidence | Source |
|---|---|---|---|
| Wireless and room media | Ambient capture and virtual nursing put continuous audio and video on the care-area network | Patient observation is the top virtual-nurse use (53%). Reference point for video: Cisco device guidance recommends a minimum of 4 Mbps for 1080p at 30 fps. No published per-room standard for virtual nursing was found. | [5][59] |
| Network scale and adaptability | AI traffic grows faster than refresh cycles | 54% say networks cannot scale for AI; 15% call their network flexible; 71% say data centers cannot meet today's AI demands (VENDOR-REPORTED, cross-industry) | [47][49] |
| Uptime | Documentation becomes dependent on a cloud path: ambient AI wrote 38% of notes in one trial and was used in about a third of visits in another | ECRI ranks unpreparedness for a "digital darkness" event the no. 2 hazard for 2026. During the Oct 20, 2025 AWS outage, at least 10 NHS sites were reported in downtime and Tufts Medicine reported slowdowns (S). The Oct 29, 2025 Azure outage hit Azure Healthcare APIs and Entra ID. | [1][2][37][63] |
| Identity for agents | Every agent is a non-human identity with access to PHI | Machine identities outnumber humans 109:1 (VENDOR-REPORTED). NIST AI Agent Standards Initiative, Feb 17, 2026, includes agent identity and authorization. | [57][43] |
| Control of agent actions | Agents call tools and change records | 31% fully equipped to control and secure agents; 24% can control agent actions with guardrails and live monitoring (VENDOR-REPORTED) | [47] |
| PHI egress governance | Prompts, audio and transcripts leave the building | 89% of healthcare generative-AI data policy violations involve regulated data. 62% of healthcare organizations show connections to a speech-to-text API (api.assemblyai.com) and 63% to api.openai.com (VENDOR-REPORTED) | [32] |
| Shadow AI discovery | Staff adopt tools faster than approval cycles | Personal generative-AI use in healthcare fell from 82% to 32% as managed tools rose from 12% to 56%; 60% of organizations lack confidence in detecting shadow AI; nearly 17% of health system staff admit using an unapproved AI tool, almost half of them for a faster workflow (VENDOR-REPORTED) | [32][48][33] |
| AI inventory and monitoring | You cannot govern what you cannot list | About 10% of surveyed healthcare organizations use automated monitoring to detect AI capabilities; 51% rely on informal discovery (VENDOR-REPORTED) | [34] |
| Governance evidence for accreditation | Policies, local validation, monitoring, reporting, training | Joint Commission and CHAI guidance (Sept 17, 2025); voluntary Responsible Use of AI in Healthcare certification covering governance, data management, risk and bias reduction, validation of safety and effectiveness, and transparency, education and training | [35][36] |
| State-law compliance | Disclosure and human review duties differ by state | California AB 3030 (Jan 2025); Texas SB 1188 (Sept 1, 2025); Texas HB 149 (Jan 1, 2026; penalties of $10,000 to $200,000 per violation); California AB 489 (Jan 1, 2026) | [40] |
| Federal direction | Risk management for high-impact AI | HHS AI strategy (Dec 4, 2025): five pillars, starting with governance and risk management; divisions to have minimum risk practices for high-impact AI by Apr 3, 2026. FDA revised its clinical decision support guidance on Jan 6, 2026; per one law-firm analysis the guidance says nothing specific about AI or generative AI. | [39][42] |
| Cost visibility | Usage-priced inference makes spend volatile | 55% cannot accurately control AI costs (VENDOR-REPORTED) | [52] |
| GPU and data center capacity | On-premises inference and imaging AI need accelerators | 26% have robust GPU capacity; 88% plan to expand data center capacity (VENDOR-REPORTED). Rack power figures are in brief 04. | [47][49] |
| Clinician training | Humans in the loop must know how to check output | Fewer than 25% of clinicians using AI strongly agree they received adequate formal training on validating AI-generated content | [16] |
| Staff to run it | Agents add systems to already short teams | 21% of healthcare IT professionals critically understaffed (VENDOR-REPORTED); more than half of organizations have more than ten open cybersecurity positions (VENDOR-REPORTED) | [54][48] |

---

## Risks and failure modes a credible presenter should acknowledge

1. **Errors in ambient notes are common enough to require review.** 18% of audited notes had an omission, 11.5% a hallucination, and 5.3% an error rated serious or imminent risk if uncorrected; 14.9% of sampled notes were left entirely unedited [4]. In the UCLA trial, clinically significant inaccuracies were noted "occasionally" and one grade 1 adverse event was reported [1].
2. **Time savings are smaller and less consistent than headlines.** One of two scribes showed no significant time-in-note change versus control [1]. The work-outside-work reduction in the second trial lost significance after removing extreme values [2]. The largest burnout result comes from an uncontrolled, voluntary pre/post study [3].
3. **Automation bias is measured.** Systematically biased AI predictions reduced clinician diagnostic accuracy by 11.3 percentage points; explanations did not significantly mitigate this (457 clinicians, JAMA 2023, older) [7]. In the CHIME Foundation/Censinet survey, 27% named automation bias their top concern and 63% named output quality and hallucinations as the primary data risk (VENDOR-REPORTED) [34].
4. **Speech recognition can invent text.** A 2024 study found roughly 1% of audio transcriptions from one speech-to-text model contained entire hallucinated phrases or sentences, and 38% of those hallucinations included explicit harms (older; the model has since been updated) [45].
5. **Prompt injection works against medical LLMs.** 94.4% success across 108 injected dialogues; 91.7% in extremely high-harm scenarios; flagship models were also vulnerable in a proof of concept (simulation, JAMA Network Open, Dec 2025) [6].
6. **Excessive agency is a named risk class.** OWASP published a peer-reviewed Top 10 for Agentic Applications, dated Dec 9, 2025 [44]. Secondary summaries list agent goal hijack, tool misuse, and identity and privilege abuse among the ten, with a "least agency" principle (S) [44].
7. **General-purpose chatbots are the top-ranked hazard.** ECRI's 2026 list ranks misuse of AI chatbots in healthcare first; AI-enabled health technologies topped the 2025 list [37][38] (S for 2025).
8. **Vendor accuracy claims have drawn enforcement.** In Sept 2024 the Texas Attorney General settled with a clinical generative-AI vendor that had advertised a "severe hallucination rate" of less than 1 per 100,000. The investigation found the metrics "likely inaccurate". The product was deployed at several Texas hospitals. For five years the vendor must disclose how marketed metrics are defined and calculated (older) [46].
9. **Virtual nursing has not been shown to reduce bedside workload.** 57% of nurses reported no workload reduction; the authors advise cautious introduction [5].
10. **AI in prior authorization cuts both ways.** Six in 10 physicians are concerned AI may further increase denial rates [21]; the CMS WISeR model has drawn criticism from members of Congress [23] (S).
11. **Outage dependence.** ECRI ranks "digital darkness" second for 2026 [37]. The Oct 29, 2025 Azure Front Door outage lasted roughly seven hours; Azure Healthcare APIs, Entra ID and Copilot were among affected services and a Quebec health provider suspended some patient access tools [63]. The Oct 20, 2025 AWS outage was reported to put at least 10 NHS sites into downtime (S) [63]. No source was found documenting an ambient-scribe outage specifically.
12. **Many agentic projects will not survive.** Gartner predicted in June 2025 that over 40% of agentic AI projects will be cancelled by the end of 2027 and that at least 15% of day-to-day work decisions will be made autonomously by 2028 (ESTIMATE, cross-industry) [58] (S).
13. **Governance capacity lags demand.** 84% have a committee, yet 8% are "very confident" in identifying emerging AI risks (VENDOR-REPORTED) [34]; fewer than 25% of clinicians feel adequately trained to validate AI output [16].
14. **Regulatory patchwork.** Manatt's tracker (July 30, 2026) counts over 280 health-AI bills introduced in 2026, with 33 signed into law in 22 states; 11 states enacted 12 consumer AI chatbot bills and 6 states enacted 7 clinical-AI bills [41].

---

## Sources

Verification tag: (F) fetched and read; (S) search-result summary only, page blocked or not opened.

1. (F) Lukac PJ, et al. "Ambient AI Scribes in Clinical Practice: A Randomized Trial." NEJM AI 2025;2(12). Epub Nov 26, 2025. https://pubmed.ncbi.nlm.nih.gov/41497288/
2. (F) Afshar M, et al. "A Pragmatic Randomized Controlled Trial of Ambient Artificial Intelligence to Improve Health Practitioner Well-Being." NEJM AI 2025;2(12). Epub Nov 26, 2025. https://pubmed.ncbi.nlm.nih.gov/41625485/
3. (F) Olson KD, et al. "Use of Ambient AI Scribes to Reduce Administrative Burden and Professional Burnout." JAMA Network Open 2025;8(10):e2534976. https://pubmed.ncbi.nlm.nih.gov/41037268/
4. (F) Taylor SL, et al. "Quality of Clinical Notes Created by Ambient Listening Generative AI: Pragmatic Prospective Pilot Study." JMIR Medical Informatics, Apr 17, 2026;14:e86474. https://pubmed.ncbi.nlm.nih.gov/41996389/
5. (F) Muir KJ, et al. "Virtual Nursing for the Care of Hospitalized Patients." JAMA Network Open 2025;8(12):e2545597. https://pubmed.ncbi.nlm.nih.gov/41348359/
6. (F) Lee RW, et al. "Vulnerability of Large Language Models to Prompt Injection When Providing Medical Advice." JAMA Network Open 2025;8(12):e2549963. https://pubmed.ncbi.nlm.nih.gov/41632124/
7. (F) Jabbour S, et al. "Measuring the Impact of AI in the Diagnosis of Hospitalized Patients: A Randomized Clinical Vignette Survey Study." JAMA 2023;330(23):2275-2284. https://pubmed.ncbi.nlm.nih.gov/38112814/
8. (F) Jacques D, et al. "Evaluating Nurses' Perceptions of Documentation in the Electronic Health Record: Multimethod Analysis." JMIR Nursing, Apr 28, 2025;8:e69651. https://pubmed.ncbi.nlm.nih.gov/40294588/
9. (F) Shrank WH, Rogstad TL, Parekh N. "Waste in the US Health Care System: Estimated Costs and Potential for Savings." JAMA 2019;322(15):1501-1509. https://pubmed.ncbi.nlm.nih.gov/31589283/
10. (F) Menlo Ventures. "2025: The State of AI in Healthcare." Oct 21, 2025. https://menlovc.com/perspective/2025-the-state-of-ai-in-healthcare/
11. (F) Epic. "Real Results, Right Now: How Epic AI Is Reducing Costs, Improving Care, and Helping Patients." Mar 10, 2026. https://www.epic.com/epic/post/real-results-right-now-how-epic-ai-is-reducing-costs-improving-care-and-helping-patients/
12. (F) Healthcare IT Today (John Lynn). "Epic UGM 2026 - Judy Faulkner Keynote and Cool Stuff Ahead." Aug 19, 2026. https://www.healthcareittoday.com/2026/08/19/epic-ugm-2026-judy-faulkner-keynote-and-cool-stuff-ahead/
13. (S) Healthcare IT News. "Epic bets its AI speed at UGM." 2026. https://www.healthcareitnews.com/news/epic-bets-its-ai-speed-ugm (HTTP 403; not used for any figure in the tables)
14. (F) Microsoft Industry Blog (Kees Hertogh). "Unify. Simplify. Scale: Microsoft Dragon Copilot meets the moment at HIMSS 2026." Mar 5, 2026. https://www.microsoft.com/en-us/industry/blog/?p=124758
15. (F) HIT Consultant (Fred Pennic). "Abridge expands clinical intelligence agent enterprise-wide." Aug 17, 2026. https://hitconsultant.net/2026/08/17/abridge-expands-clinical-intelligence-agent-enterprise-wide-ehr/
16. (F) HIT Consultant (Fred Pennic), reporting KLAS "AI Insights from the Arch Collaborative 2026." Jul 17, 2026. https://hitconsultant.net/2026/07/17/klas-arch-collaborative-2026-healthcare-ai-insights/
17. (F) Bain & Company and KLAS Research. Press release on the 2025 Healthcare IT Spending report. Oct 9, 2025. https://www.bain.com/about/media-center/press-releases/20252/healthcare-ai-investment-focusing-on-hard-dollar-returns-and-clinical-workflows-amid-shift-from-pilots-to-widespread-productionbain--company-and-klas-research/
18. (F) Deloitte Center for Health Solutions. "2026 US Health Care Executive Outlook." Dec 11, 2025. https://www.deloitte.com/us/en/insights/industry/health-care/life-sciences-and-health-care-industry-outlooks/2026-us-health-care-executive-outlook.html
19. (S) McKinsey & Company. "Generative AI in healthcare: Adoption trends and what's next." Q4 2025 survey. https://www.mckinsey.com/industries/healthcare/our-insights/generative-ai-in-healthcare-adoption-trends-and-whats-next (HTTP 503)
20. (F) HealthManagement.org. "Microsoft extends Dragon Copilot to nursing and partner ecosystem." Oct 23, 2025. https://healthmanagement.org/c/healthmanagement/News/microsoft-extends-dragon-copilot-to-nursing-and-partner-ecosystem
21. (F) American Medical Association. "AMA survey: Prior authorization reform pledge falls short with physicians." May 13, 2026. https://www.ama-assn.org/press-center/ama-press-releases/ama-survey-prior-authorization-reform-pledge-falls-short-physicians
22. (F) CMS. "CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F)." Released Jan 17, 2024. https://www.cms.gov/priorities/burden-reduction/overview/interoperability/policies-regulations/cms-interoperability-prior-authorization-final-rule-cms-0057-f (certain provisions by Jan 1, 2026; API requirements primarily by Jan 1, 2027)
23. (S) Georgetown University Center on Health Insurance Reforms. "New CMS WISeR Model Revives Concerns of Prior Authorization and Artificial Intelligence." https://medicare.chir.georgetown.edu/new-cms-wiser-model-revives-concerns-of-prior-authorization-and-artificial-intelligence/
24. (F) Experian Health. "3rd Annual State of Claims Survey Finds Denials Still on the Rise." Sept 22, 2025. https://www.experianplc.com/newsroom/press-releases/2025/experian-health-s-3rd-annual-state-of-claims-survey-finds-denial
25. (F) Webex Blog (Cisco). "Community Health Network achieves 40% AI containment, streamlines patient care." Aug 20, 2026 (page also shows Sep 1, 2026). https://blog.webex.com/customer-experience/community-health-network-achieves-40-ai-containment-streamlines-patient-care/
26. (F) American Hospital Association, Center for Health Innovation Market Scan. "How Tampa General Hospital Accelerates AI Adoption." URL dated Mar 3, 2026. https://www.aha.org/aha-center-health-innovation-market-scan/2026-03-03-how-tampa-general-hospital-accelerates-ai-adoption (The 34% to 14.9% abandonment detail is (S), from Fierce Healthcare, HTTP 403: https://www.fiercehealthcare.com/ai-and-machine-learning/how-tampa-general-hospital-and-startup-hyro-rolled-out-ai-voice-agents-3)
27. (F) Microsoft Source. "NHS England accelerates AI adoption with Microsoft 365 Copilot." June 8, 2026. https://news.microsoft.com/source/2026/06/08/nhs-england-accelerates-ai-adoption-with-microsoft-365-copilot-to-improve-service-delivery-reduce-costs-and-create-more-time-for-care/
28. (F) NSI Nursing Solutions. "2026 NSI National Health Care Retention & RN Staffing Report." March 2026. https://www.nsinursingsolutions.com/documents/library/nsi_national_health_care_retention_report.pdf
29. (F) US Energy Information Administration. "Commercial Buildings Energy Consumption Survey (CBECS) 2018: Health care buildings." https://www.eia.gov/consumption/commercial/pba/health-care.php
30. (F) Kastle Systems. "Getting America Back to Work" occupancy barometer. Accessed Nov 13, 2026. https://www.kastle.com/safety-wellness/getting-america-back-to-work/
31. (S) Health Affairs. "The Role of Administrative Waste in Excess US Health Spending." Research brief, Oct 2022. https://www.healthaffairs.org/do/10.1377/hpb20220909.830296/ (HTTP 403)
32. (F) Netskope Threat Labs. "Threat Labs Report: Healthcare 2026." Mar 2, 2026. https://threatlabs.netskope.com/reports/2026/threat-labs-report-healthcare-2026
33. (F) Wolters Kluwer Health. "Shadow AI: a hidden risk to healthcare" (survey report PDF, 2026; survey conducted Dec 2025, N=518). https://assets.contenthub.wolterskluwer.com/api/public/content/shadow-ai-a-hidden-risk-to-healthcare-pdf
34. (F) Censinet and CHIME Foundation. "AI Adoption Survey." Dec 16, 2025. https://www.censinet.com/blog/ai-adoption-survey-reveals-healthcares-governance-gap-and-drive-toward-agentic-usage
35. (F) Coalition for Health AI. "Joint Commission and Coalition for Health AI (CHAI) Release Initial Guidance to Support Responsible AI Adoption Across U.S. Health Systems." Sept 17, 2025. https://www.chai.org/news/joint-commission-and-coalition-for-health-ai-chai-release-initial-guidance (The seven-element list comes from law-firm summaries (S): https://www.polsinelli.com/publications/tjc-chai-release-guidance-responsible-ai-use-healthcare)
36. (F) Digital Health Insights. "Joint Commission launches responsible AI use certification." June 18, 2026. https://dhinsights.org/news/joint-commission-launches-responsible-ai-use-certification
37. (F) ECRI. "Misuse of AI chatbots tops annual list of health technology hazards." Jan 21, 2026. https://home.ecri.org/blogs/ecri-news/misuse-of-ai-chatbots-tops-annual-list-of-health-technology-hazards
38. (S) ECRI. "Artificial intelligence tops 2025 health technology hazards list." Dec 2024. https://home.ecri.org/blogs/ecri-news/artificial-intelligence-tops-2025-health-technology-hazards-list
39. (F) Holland & Knight. "HHS Releases Strategy Positioning Artificial Intelligence as the Core of Health Innovation." Dec 10, 2025. https://www.hklaw.com/en/insights/publications/2025/12/hhs-releases-strategy-positioning-artificial-intelligence (HHS primary page returned HTTP 403: https://www.hhs.gov/press-room/hhs-unveils-ai-strategy-to-transform-agency-operations.html)
40. (F) Akerman LLP. "New Year, New AI Rules: Healthcare AI Laws Now in Effect." Jan 5, 2026. https://www.akerman.com/en/perspectives/hrx-new-year-new-ai-rules-healthcare-ai-laws-now-in-effect.html
41. (F) Manatt Health. "Health AI Policy Tracker." Published July 30, 2026. https://www.manatt.com/insights/newsletters/health-highlights/manatt-health-health-ai-policy-tracker
42. (F) Covington & Burling. "5 Key Takeaways from FDA's Revised Clinical Decision Support (CDS) Software Guidance." Jan 2026. https://www.cov.com/en/news-and-insights/insights/2026/01/5-key-takeaways-from-fdas-revised-clinical-decision-support-cds-software-guidance
43. (F) NIST. "Announcing the 'AI Agent Standards Initiative' for Interoperable and Secure Innovation." Feb 17, 2026. https://www.nist.gov/node/1906621
44. (F) OWASP GenAI Security Project. "OWASP Top 10 for Agentic Applications for 2026." Dec 9, 2025. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (date and description fetched; the individual risk names are (S), from secondary summaries)
45. (F) Koenecke A, et al. "Careless Whisper: Speech-to-Text Hallucination Harms." arXiv:2402.08021, submitted Feb 12, 2024, revised May 3, 2024 (ACM FAccT 2024). https://arxiv.org/abs/2402.08021
46. (F) Nelson Mullins. "Texas Attorney General Announces First-of-its-Kind Healthcare Generative AI Settlement." Sept 20, 2024. https://www.nelsonmullins.com/insights/blogs/ai-task-force/all/texas-attorney-general-announces-first-of-its-kind-healthcare-generative-ai-settlement (Texas AG primary page returned HTTP 402)
47. (F) Cisco. "Cisco AI Research: The Most AI-ready Companies Outpace Peers in the Race to Value" (AI Readiness Index 2025). Oct 14, 2025. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2025/m10/cisco-ai-research-the-most-ai-ready-companies-outpace-peers-in-the-race-to-value.html and index page https://www.cisco.com/c/m/en_us/solutions/ai/readiness-index.html
48. (F) Cisco. "Cisco Study Reveals Alarming Deficiencies in Security Readiness" (2025 Cybersecurity Readiness Index). May 7, 2025. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2025/m05/cisco-study-reveals-alarming-deficiencies-in-security-readiness.html
49. (F) Cisco. "Cisco Research: A Major Infrastructure Shift Is Underway. AI Could Double the Strain or Solve It." June 4, 2025. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2025/m06/cisco-research-a-major-infrastructure-shift-is-underway-ai-could-double-the-strain-or-solve-it.html
50. (F) Cisco/Splunk. "Global State of Security Report Reveals Critical Need for Connected Security Operations" (State of Security 2025). May 20, 2025. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2025/m05/global-state-of-security-report-reveals-critical-need-for-connected-security-operations.html
51. (F) Cisco/Splunk. "Splunk Report: Agentic AI Takes Center Stage in CISOs' Path to Digital Resilience" (The CISO Report). Feb 24, 2026. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m02/splunk-report-agentic-ai-takes-center-stage-in-cisos-path-to-digital-resilience.html
    - 51a. (S) SecurityBrief. "CISOs cautious as agentic AI adoption in security lags." 2026. https://securitybrief.co.uk/story/cisos-cautious-as-agentic-ai-adoption-in-security-lags
52. (F) Splunk. "The State of Observability 2026." Landing page; release reported as Oct 20, 2026 (S). https://www.splunk.com/state-of-observability
53. (F) NETSCOUT. "Key Takeaways from the EMA Network Management Megatrends 2026." May 12, 2026. https://www.netscout.com/blog/key-takeaways-ema-network-management-megatrends-2026
54. (F) IT Brew. "Hospital IT pros are understaffed and overwhelmed: report." Aug 19, 2026 (Nile report; ISC2 2025 figures quoted). https://www.itbrew.com/stories/hospital-it-pros-are-understaffed-and-overwhelmed-report
55. (F) RCR Wireless (Sean Kinney). "Network automation: six levels, five blockers, four questions." Aug 18, 2025. https://rcrwireless.com/20250818/analyst-angle/network-automation-6-5-4
56. (F) Mohsin A, et al. "A Unified Framework for Human AI Collaboration in Security Operations Centers with Trusted Autonomy." arXiv:2505.23397, submitted May 29, 2025. https://arxiv.org/abs/2505.23397
57. (F) Palo Alto Networks. "2026 Identity Security Landscape." 2026. https://www.paloaltonetworks.com/idira/idira-identity-security-landscape
58. (S) Gartner. "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027." June 25, 2025. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (HTTP 403)
59. (F) Webex Help Center (Cisco). "Bandwidth management for Board, Desk, and Room Series." Accessed Nov 2026. https://help.webex.com/article/51qu5cb
60. (F) GE HealthCare. "Command Center: Outcomes." Accessed Nov 2026. https://www.gehealthcare.com/en-us/products/software/command-center/outcomes
61. (S) Becker's Hospital Review. "Oracle Health's Clinical AI Agent excels in EHR integration: KLAS." https://www.beckershospitalreview.com/healthcare-information-technology/innovation/oracle-ai-agent-excels-in-ehr-integration-klas (HTTP 403)
62. (F) AONL and Chartis Center for Burnout Solutions. "AONL Quick Hit: Virtual Care." February 2026 (PDF dated May 2026). https://www.aonl.org/system/files/media/file/2026/05/AONL-Quick-Hit-Results-Q1-2026.pdf
63. (F) The Register. Microsoft Azure outage report, Oct 29, 2025. https://theregister.com/2025/10/29/microsoft_azure_outage/ ; (S) Digital Health (UK). "AWS outage causes disruption to patient care across NHS sites." Oct 2025. https://www.digitalhealth.net/2025/10/aws-outage-causes-disruption-to-patient-care-across-nhs-sites/ (HTTP 403); (S) Becker's Hospital Review. "AWS outage disrupts Tufts Medicine; other health systems unaffected." Oct 2025.
64. (S) Uptime Institute. "Annual Outage Analysis 2025." May 6, 2025. https://www.businesswire.com/news/home/20250506733553/en/Uptime-Announces-Annual-Outage-Analysis-Report-2025 (HTTP 403)

---

## Gaps / unverified

**Not found**
- **Healthcare cut of Cisco research.** No healthcare-specific figure was found in the Cisco AI Readiness Index 2025, the Cisco Cybersecurity Readiness Index 2025, Cisco's 2025 networking research, Splunk State of Security 2025, the Splunk CISO Report 2026 or Splunk State of Observability 2026. All figures cited from them are cross-industry.
- **Cisco AI Readiness Index 2026.** No 2026 edition was found as of Nov 13, 2026. A Cisco "How CEOs see AI in 2026" page exists but was not used.
- **Splunk "State of Security 2026".** Not found. The 2025 edition and the 2026 CISO Report were used.
- **Network requirements for ambient AI and virtual nursing.** No vendor-neutral or peer-reviewed bandwidth, latency or Wi-Fi requirement was found. The 4 Mbps figure is general video-device guidance, not a virtual-nursing specification.
- **Ambient-scribe outage incident.** No documented case found.
- **Agent identity in healthcare.** No healthcare-specific non-human-identity survey found.
- **Token or inference spend in health systems.** No healthcare-specific figure found; the 55% cost-control figure is cross-industry.
- **On-premises GPU adoption in hospitals.** No adoption statistic found.
- **Health IT staffing vacancy rate.** No 2025 to 2026 CHIME, KLAS or HIMSS vacancy percentage found. A Black Book flash survey (56 executives, July 2025) exists but was judged too small to cite.
- **Healthcare SOC alert volumes.** No healthcare-specific alerts-per-day figure found. Cross-industry vendor surveys disagree widely (about 100 to about 4,300 alerts a day) and were not cited.
- **Contact-center benchmarks.** No primary MGMA or peer-reviewed abandonment or hold-time benchmark found; only vendor blogs.
- **Command centers and capacity AI.** No peer-reviewed 2025 to 2026 evaluation found for GE HealthCare Command Center, Qventus or LeanTaaS, and no installed-base count.
- **Microsoft 365 Copilot in US health systems.** No audited US figure found; the NHS England figure is UK and vendor-reported.
- **Smart building AI in hospitals.** No measured 2025 to 2026 hospital result found. A 2013 PNNL modelling study (about 18% whole-building and nearly 40% HVAC savings for advanced occupancy-based controls in a large office) was seen only through secondary coverage.
- **Analyst definition of human-in-the-loop versus human-on-the-loop.** No Gartner, Forrester or IDC definition was retrievable. TM Forum levels and one academic SOC framework were used instead.

**Verified only through search summaries, marked (S)**
- McKinsey Q4 2025 figures [19]; Gartner predictions [58]; OWASP individual risk names [44]; ECRI 2025 list [38]; WISeR details [23]; Oracle/KLAS figures [61]; Tampa General 34% to 14.9% detail [26]; Health Affairs 15% to 30% [31]; AWS outage details [63]; Uptime outage shares [64]; the 6% "fully deployed agentic AI" CISO figure [51a]; the seven-element list of the Joint Commission/CHAI guidance [35]; the Oct 20, 2026 release date of Splunk State of Observability 2026 [52].
- Manatt's 2025 totals (47 states, more than 250 bills, 33 laws in 21 states) were seen only in a search summary; the fetched tracker gives 2026 counts, which are used.

**Seen but not verified, so not used in tables**
- Epic: "AI-powered clinician and nurse summaries in use at more than 300 health systems", "1.4 million clinicians assisted by AI each month", "more than 60 organizations using Chart with Art", and Agent Factory "broad availability targeted for 2027".
- Abridge: "more than 80 million patient-clinician conversations projected for 2026"; Best in KLAS 2026 score of 94.7.
- CMS-0057-F decision timeframes (72 hours expedited, 7 calendar days standard) were not shown on the CMS page fetched; only the Jan 1, 2026 and Jan 1, 2027 dates were confirmed.
- Deloitte secondary coverage: "85% plan to increase agentic AI investment" and "61% building agentic initiatives" could not be matched to the primary report.
- Joint Commission certification launch date: June 2026 coverage says "has launched"; exact date not confirmed.

**Conflicts**
- Menlo Ventures' health-system ambient spend is reported differently by secondary sources ($475 million in one, about $600 million total in the primary). The primary page figure ($600 million, all segments) is used.
- KLAS Arch Collaborative: the article gives 71% and 54% for physician ambient use in different places; 71% (body text) is used.
- GE HealthCare lists The Queen's Health Systems length-of-stay reduction as 1.07 days on one page and 0.7 days elsewhere.
- IT Brew's headline says "a quarter" at risk of burnout; the body says 21%. The body figure is used.
