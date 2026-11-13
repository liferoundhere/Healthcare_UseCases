# Research Brief 06: Cisco Cloud Control as an agentic orchestrator, and exactly what it can manage

Research date: Friday, November 13, 2026
Scope: Deepens Brief 05 on one angle: how Cloud Control orchestrates agents, and what it manages domain by domain. Brief 05 is not repeated here. Data Fabric, Splunk federation, and the healthcare use-case mapping stay in Brief 05.

## How to read this brief

**Status tags** use the source's own wording.

- **GA**: a Cisco source says generally available or "available."
- **CA**: Controlled Availability.
- **Beta / Alpha**: the source uses that word.
- **Roadmap**: announced, "will," "planned," "targeted," or no shipping evidence found.
- **Shipped (docs)**: described as a working feature in Cisco product documentation or release notes, with no GA/beta label attached.

**How sources were read.** Pages on blogs.cisco.com, newsroom.cisco.com, cloud.cisco.com/docs, and the press and analyst sites were downloaded and quoted from the full text. Pages on www.cisco.com block direct download, so they were read through a fetch tool that returns short excerpts. Quotes from those pages (sources [3], [46] to [53], [57]) are short excerpts, not full passages.

Bracketed numbers refer to the sources in section J.

## Executive summary

- **What it is.** Cisco documentation defines Cloud Control as "the unified operations platform for AgenticOps" that "complements existing Cisco product controllers" and works "without replacing individual product dashboards" [4]. Cisco's architecture blog calls it "the platform of record for cross-domain operations" [17].
- **What it manages.** Twelve connected products feed Inventory, Topology, and Notifications in different combinations [5]. Cloud Control adds correlated Actions, AI Assistant, AI Canvas, Workflows, Cisco Identity, Licensing, and an Admin Console on top [5]. Deep configuration stays in each controller: "Domain controllers remain responsible for their specialized management and execution" [1].
- **How it is agentic.** AI Canvas plans an investigation, dispatches product agents in parallel, and returns sourced findings; the operator approves the plan first in Reasoning mode [6][18]. Workflows "can perform write actions that change your operational environment" and need an explicit Run confirmation [6]. Cisco's stated rule: "Agents propose. Humans approve before anything changes in production" [19].
- **The loop.** Cisco's Agentic Loop has "five stages: sense, diagnose, remediate, validate, and deploy" [21]. The autonomous version is still Roadmap ("will be able to") [2].
- **New since Brief 05's sources.** Agentic Actions for networking is "Now in controlled availability" (October 26 and November 9, 2026) [27][29]. Model Foundry entered CA with partners first on October 26, 2026 [26][28]. MCP servers for networking platforms were announced October 26, 2026 [26]. Network World reported at Cisco Live Melbourne (November 10, 2026) that Australia, the EU, and the UK are scheduled for February 2027, with Japan, India, and Canada in May [32].
- **Release notes.** The latest entry is still November 10, 2026. Nothing newer was posted as of November 13 [3].
- **Healthcare.** No named healthcare customer, case study, or healthcare-specific Cloud Control statement exists in public sources. Cisco says AI Canvas alpha and beta customers included healthcare, without naming any [18].
- **A governance default to know.** AI model training on AI Canvas and AI Assistant data is "Default: Enabled" per tenant; an Environment Admin can switch it off [6][12].

---

## A) What Cloud Control manages, product by product

### A1. Cisco's own data-availability table

This table is reproduced from the Cloud Control Overview documentation (last updated November 10, 2026) [5].

| Connected product | Inventory | Topology | Notifications |
|---|---|---|---|
| Catalyst Center | Available | Available | Available |
| Catalyst SD-WAN Manager | Available | Available | Available |
| Cisco Spaces | Available | Available | Available |
| Collaboration Control Hub | Available | - | - |
| Identity | Available, Cisco ISE only | - | - |
| Intersight | Available | Available | Available |
| Meraki | Available | Available | Available |
| Nexus Dashboard | Available | Available | Available |
| Nexus Hyperfabric | Available | Available | Available |
| Secure Access | Available | - | - |
| Secure Firewall | Available | Available | Available |
| ThousandEyes | Available | - | Available |

Splunk and Cisco IQ are connected products [1] but are not rows in this table [5]. The release notes say Secure Access notifications were added October 27, 2026 [3], which the table does not yet show (see Gaps).

### A2. Platform services that sit on top of the products

| Platform service | What it does | Status | Source |
|---|---|---|---|
| Inventory | "unified, AI-powered asset inventory" that "automatically syncs data from your Cisco products." Sync is every 5 minutes for ISE, Nexus Hyperfabric, Nexus Dashboard and every 60 minutes for Meraki, Security Cloud Control, Secure Access, Control Hub, ThousandEyes, Catalyst Center, SD-WAN Manager. Assets are removed "after 3 days of reporting inactivity" | GA (US) | [5][9] |
| Topology | "unified view of network infrastructure across multiple controller domains." Physical (L1), switched (L2), routed (L3) connectivity, "including relationships learned from OSPF, ISIS, and BGP." History: "daily changes for 30 days and monthly change summaries for up to 1 year" | GA (US). Note: "Topology displays data center and compute relationships only at L1 & L2" | [10] |
| Actions | "An action correlates one or more alerts to identify an overall issue." Each action has "a summary of the issue, the related alerts, a possible cause, and a recommendation." "When you open an action for the first time, AI Assistant triggers the relevant agents to analyze the issue" | Shipped (docs); bulk resolve added November 3, 2026 | [7][3] |
| Notifications | Alert, Recommendation, Approval, Activity, Announcement. Removed "after 90 days"; "This data is not removed from the source product" | Shipped (docs) | [5] |
| AI Assistant | "the natural-language entry point in Cisco Cloud Control" | GA (US) | [1][13][45] |
| AI Canvas | "a shared operational workspace where people and AI agents work together to investigate and resolve IT issues" | CA June 2, 2026; part of GA (US) August 25, 2026 | [6][18][1] |
| Workflows | "Automates responses and task management for each tenant." Runs "automatically, manually, or using API requests." Limits: 500 workflows, 300 targets per organization | GA (introduced at August 25 GA) | [1][5][11] |
| Identity (Cisco Identity) | "centralizes identity data from sources such as Okta, Cisco ISE, and Microsoft Active Directory" | GA (US), August 25, 2026. "Identity for AI Canvas is currently in beta" | [5][3][15] |
| Licensing | License visibility for Meraki, Intersight, ThousandEyes, Splunk Cloud Platform, Security Cloud Control (Secure Access) | GA (US) | [14] |
| Admin Console | Users, SSO, environments, product tenants, audit log, AI data preference | GA (US); environments added October 27, 2026 | [12][3] |

### A3. Product-by-product: what surfaces in Cloud Control and what stays in the controller

"Agent use cases" below are the use cases Cisco lists for each product agent in the AI Canvas documentation [6]. They describe what you can ask, not a guarantee of write access.

| Product | Domain | Surfaces in Cloud Control | Stays in the domain controller | Status | Source |
|---|---|---|---|---|---|
| Meraki | Networking (campus, branch) | Inventory, Topology (incl. Layer 3), Notifications; open and resolved alerts sync into Actions; Meraki agent in AI Canvas (wireless health, switching, firewall, VPN, clients, alerts); Workflows shared with a linked Meraki tenant; cross-launch | Dashboard configuration and product roles. "Existing product roles and permissions stay the same" | GA (US), August 25, 2026 | [1][3][4][5][6][11] |
| Catalyst Center | Networking (campus, on-prem controller) | Inventory, Topology, Notifications; agent use cases include assurance, compliance, software-image management. Connects through Meraki; set up from Products since November 10, 2026 | On-prem controller keeps automation and assurance. Supported versions 2.3.7.11, 3.1.6, 3.2.3 (GA) and 3.3.1 (CA) | GA (US) for listed versions; 3.3.1 is CA | [3][4][5][6] |
| Catalyst SD-WAN Manager | Networking (WAN) | Inventory, Topology, Notifications; agent use cases include tunnel health, circuit and bandwidth, application QoE | SD-WAN policy and templates. Integrates "through Security, formerly known as Security Cloud Control." Cloud deployments supported; Cloud-Pro "Planned" | GA (US) | [4][5][6] |
| Nexus Dashboard | Data center networking | Inventory, Topology, Notifications; agent use cases include fabric health, anomaly investigation, AI/ML workload monitoring; Nexus Dashboard roles assignable from Cloud Control Users | Fabric configuration. Live Protect data "is read-only, you need to cross-launch Nexus Dashboard in order to perform any management actions." Connects through an Intersight tenant; version 4.x | GA (US) | [4][5][6][8][9] |
| Nexus Hyperfabric | Data center networking (cloud-managed) | Inventory, Topology, Notifications; agent use cases include resource discovery, live diagnostics, endpoint search | Fabric design and deployment. Requires "Enable data sharing" in Hyperfabric | GA (US) | [4][5][6] |
| Intersight | Compute | Inventory, Topology, Notifications; licensing visibility; agent can "query your Intersight inventory, analyze performance metrics" | Server profiles, policies, firmware. "currently for the Intersight SaaS platform (US-East region)." "no support for the Intersight Virtual Appliance at this time" | GA (US) | [5][6][14][52] |
| Security: Secure Firewall | Security | Inventory, Topology, Notifications; agent use cases include firewall inventory, VPN troubleshooting, "Audit and policy analysis" | Firewall policy authoring and deployment. One Security tenant per environment | GA (US) | [4][5][6] |
| Security: Secure Access | Security (SSE) | Inventory; alerts and correlated actions (added October 27, 2026); licensing visibility; agent use cases are mostly activity search and reporting | Access policy. Open issue in the release notes: read-only Secure Access admins can hit a permission error on AI Canvas prompts | GA (US) | [3][5][6][14] |
| Cisco Identity (ISE, Duo, external IdPs) | Identity | ISE assets in Inventory; identity posture and risk; "aggregates identity, device, network, application, and agentic activity into one operational view." Cisco sources (Duo, ISE, Secure Access, Webex, Splunk) for all customers | ISE and Duo policy. External sources need "Duo Advantage+ or ISE Advantage+" | GA (US); Identity for AI Canvas is Beta | [3][5][9][15] |
| ThousandEyes | Observability (digital experience) | Inventory, Notifications (no Topology); agent use cases include outage monitoring, test root-cause analysis; licensing visibility | Test configuration. "AI Features" must be enabled in ThousandEyes. One tenant per environment | GA (US) | [4][5][6][14] |
| Splunk (Cloud Platform, ITSI, Observability Cloud) | Observability and security analytics | "single sign-on, cross-launch between platforms, access to Splunk data and skills in AI Canvas, and Splunk AI Assistant capabilities"; Splunk Agent Observability (September 15, 2026); licensing visibility | Indexes, searches, detections stay in Splunk. Requires Splunk Cloud 10.5+ on US Commercial AWS and the Splunk MCP Server app | GA (US) | [3][4][6][14] |
| Collaboration Control Hub (Webex) | Collaboration | Inventory only; agent prompts for Webex Meetings, Calling, Workspaces and Devices (quality analysis, join failures, device status) | Collaboration administration stays in Control Hub | GA (US) | [1][5][6] |
| Cisco Spaces | Facilities (indoor location infrastructure) | Inventory, Topology, Notifications for Spaces Connectors; dashboard cross-launch | Location services and apps. Spaces-only SSO customers "are not currently supported" | GA (US), November 10, 2026 | [3][4][5] |
| Cisco IQ | Support and lifecycle | "access Cisco IQ directly from the Cisco Cloud Control operations console" and "open support cases enriched with full context"; TAC case, screen recording, file upload from the Help menu | Lifecycle insights and playbooks stay in Cisco IQ | GA (US). "one-click action on at-risk, controller-managed devices directly within Cloud Control" was announced October 26, 2026 with no GA wording | [1][5][26][56] |
| Live Protect (Nexus) | Security (runtime shielding) | "unified, read-only view of Live Protect exposure and shield status for supported Nexus devices" in Inventory | Shield deployment happens in Nexus Dashboard by cross-launch | Shipped (docs) | [9] |
| Cisco AI Defense | AI security | Not a connected product tile. Named as the policy layer for agents: "Every agent runs under policy enforcement through Cisco AI Defense" | AI Defense remains its own product | Tied to Studio (Roadmap); see section B | [19][49] |
| Hypershield, Cisco XDR, Isovalent | Security | **Not found** in Cloud Control documentation, release notes, or the GA product list | Not applicable | Unverified | [1][3][5] |
| Cisco AI PODs | AI infrastructure | **Not found** as a connected product. A Cisco Live 2026 demo lists "Cisco UCS (AI Pods)" and "Cisco Cloud Control" together | UCS is managed in Intersight | Unverified | [54] |

**Tenancy limits that shape "what it can manage"**

- Multiple tenants per environment are supported for Meraki, Intersight, Nexus Hyperfabric, Collaboration Control Hub, and Splunk Cloud [12]. "For Security and ThousandEyes, you can select only one tenant" [4].
- "Your data stays in its original product tenant. Connecting tenants lets Cisco Cloud Control correlate related data for monitoring and troubleshooting; it does not move or merge the data" [4].
- AI Assistant "uses one selected environment per product for a prompt. It does not combine or compare data from multiple environments belonging to the same product in a single prompt" [6]. A health system with several Meraki organizations should expect one organization per prompt.
- "Organizations outside the United States are not available for selection" for SD-WAN, to keep their data out of "US-based Cisco Cloud Control services" [4].

---

## B) How it is "agentic": the architecture as Cisco describes it

### B1. Component status table

| Component | What Cisco says it is | Status (source wording) | Date | Source |
|---|---|---|---|---|
| AI Assistant | "AI Assistant is the experience through which a user asks for help. An agent is a specialized capability that can perform part of an investigation or workflow" | GA (US): "Cisco Cloud Control (US GA) ... AVAILABLE" | October 13, 2026 | [6][45] |
| AI Canvas | "It can develop an investigation plan, assign work to the appropriate agents, correlate their findings, generate relevant visualizations, and present proposed next steps for review" | CA, then included in US GA | June 2 and August 25, 2026 | [6][18][1] |
| Cisco product agents in AI Canvas | "AI Canvas now lets teams choose which Cisco agents handle a request." Picked with @, for example "@Meraki Agent and @ThousandEyes Agent." Availability depends on "product entitlements and configured integrations" | Shipped at US GA | August 25, 2026 | [3][6] |
| Workflows agent in AI Canvas | Finds, creates, configures, and runs workflows from a prompt | **Beta**: "The Workflows agent is in beta, and it supports Default only" | Docs updated November 7, 2026 | [6] |
| Default mode | "Default answers right away" | Shipped (docs) | November 2026 | [5][6] |
| Deep Reasoning (docs call it "Reasoning mode") | Plan creation, plan review, investigation, progress visibility, evidence-backed results, investigation record. "The operator reviews, revises, or approves the plan before any agent runs" | CA in AI Canvas (June 2); "available in beta in June 2026" in AI Assistant; "AVAILABLE" on October 13 deck | June 2 to October 13, 2026 | [6][18][22][45] |
| Deep Network Model | "grounded in 40 years of Cisco operational networking data." Model Foundry lists "Deep Network 1.4" and describes "the 31-billion-parameter Deep Network Model" | Named as a model inside Cloud Control (no GA label). Offered through Model Foundry, which is CA with partners | June 2 and October 26, 2026 | [2][28] |
| Agentic Workflows | "enables teams to transform AI recommendations and repetitive operational tasks into reusable automations" | GA: introduced with US general availability | August 25, 2026 | [1][11] |
| Actions (Cloud Control tab) | Correlated alerts with possible cause and recommendation | Shipped (docs) | Docs updated November 5, 2026 | [7] |
| Agentic Actions for networking | "one place to see, approve, audit, and control agent activity" | Beta ("available in beta in June 2026"), then **CA**: "Now in controlled availability" | June 2; October 26; November 9, 2026 | [21][22][27][29][45] |
| Ambient agents for networking | "always-on and purpose-built to sense issues, investigate anomalies ... and recommend or execute actions through governed workflows" | Announced; no status label found | June 2, 2026 | [21] |
| "Agents propose, humans approve" | "Agents propose. Humans approve before anything changes in production" | Design principle. Enforced today by plan approval in Reasoning mode and the Run confirmation on workflows | June 2 to November 2026 | [6][19][47] |
| Trust and autonomy levels L1 to L4 | L1 "Diagnose only / Show me why"; L2 "Recommend / Pick the fix"; L3 "Supervised autonomy / Execute after I click approve"; L4 "Autonomous / Act within policy" | Slide framing in one Cisco deck. Not found in product documentation | October 13, 2026 | [45] |
| Autonomy controls | "customers will be able to define autonomy controls by action type, network domain, and change window" | **Roadmap** ("will be able to") | June 2, 2026 | [21] |
| Autonomous Agentic Loop | "sense degradation, diagnose issues, remediate problems, validate changes, and deploy fixes" | **Roadmap**: "operators will be able to work with autonomous agents" | June 2, 2026 | [2][22] |
| Expanded Experience Metrics | Turns telemetry into user-experience indicators; being extended to applications | **Beta** | June 2; October 13; October 26, 2026 | [22][27][45] |
| Digital Twin | "emulating devices, connectivity, topology, and configurations so teams can validate changes before production" | **Alpha**: "available in alpha in July 2026." No later status found | June 2, 2026 | [22] |
| AI gateway | "a centralized AI gateway (a middleware layer) that manages model routing, data governance, and policy enforcement" | Described as part of the platform; no status label | September 1, 2026 | [52] |
| AI Defense guardrails | "Runtime protections intercept LLM calls and tool invocations to block unauthorized usage, prompt injection, and sensitive data exposure" | Described for Studio-built apps and agents (Roadmap with Studio) | June 2, 2026 | [17][19] |
| RBAC for agents and people | Two layers: Cloud Control role plus product role. "A Cisco Cloud Control role does not automatically grant you administrative access to every integrated product" | GA (US) | Docs updated October 31, 2026 | [8] |
| Audit log | "Cisco Cloud Control creates a log file whenever a user makes a system change or an event takes place." In Actions, "all actions are logged with user identity and timestamp" | GA (US) | November 2026 | [8][12] |
| Agent observability | Splunk Agent Observability in Cloud Control monitors and evaluates generative AI and agentic applications and configures guardrails. It requires Splunk Cloud Platform onboarding | Shipped | September 15, 2026 | [3] |
| MCP: Splunk | Splunk MCP Server app is required for Splunk data in AI Canvas | GA | November 2026 | [4] |
| MCP: networking platforms | "Model Context Protocol (MCP) servers for its networking platforms." Deck labels: Catalyst Center (BETA), Meraki (BETA), ThousandEyes (GA) | Announced October 26; per-product status from October 13 deck | October 2026 | [26][27][45] |
| MCP: Cisco IQ | "Cisco IQ MCP Server and expanded API access" for partners | Listed under "the general availability of Cisco IQ for Partners" | October 26, 2026 | [26] |
| MCP: third-party tools in Agent Builder | "For systems without a native integration, Agent Builder supports Model Context Protocol (MCP)" | **Roadmap** (with Agent Builder) | June 2, 2026 | [19] |
| A2A (agent-to-agent) | One mention: "Gateway and protocol-based patterns — including Model Context Protocol and agent-to-agent integration" | **Unverified.** No Cisco source names the A2A protocol for Cloud Control | June 2, 2026 | [17] |
| Skills | "A skill is a reusable set of instructions that helps an AI agent perform a specific task." Managed in AI Canvas "or synchronized from a GitHub repository" | Shipped (docs) | Docs updated November 7, 2026 | [6] |
| Knowledge base | Upload runbooks, SOPs, policies. "Knowledge base content is shared with users who have access to the same environment" | Shipped (CA feature list June 2; in docs) | June 2 and November 2026 | [5][18] |
| Cloud Control Studio: Agent Builder | "connecting third-party products, building AI agents, and creating reusable agent skills." Ambient agents and live agents. "more than 50 ecosystem integrations planned" | **Roadmap.** "Targeted for late 2026" (press). Studio page: "will support native connections." No GA, beta, or CA statement found | June 2 to November 13, 2026 | [19][34][37][49] |
| Cloud Control Studio: App Builder | "brings OpenAI Codex directly into Cisco Cloud Control" | **Roadmap.** Same evidence as Agent Builder | June 2, 2026 | [20][34] |
| Cloud Control Marketplace | "Deploy certified Cisco and partner agents in one click" | **Roadmap.** FAQ asks "What integrations will be available" | June 2 to November 13, 2026 | [49] |
| Third-party integrations live today | ServiceNow, BlueCat, Infoblox, Atlassian | GA: "available today" | August 25, 2026 | [1] |
| Workflows Exchange | Catalog of workflows "managed by Cisco, verified by Cisco, or created by the community" | Shipped (docs) | Docs updated November 7, 2026 | [11] |
| Model Foundry | "discovering, evaluating, fine-tuning, and running" Cisco models "on your own data." OpenAI-compatible API | **CA**: "Controlled Availability begins with Cisco partners." GA "planned for June 2027" per Network World and Futurum | October 26 to 30, 2026 | [26][28][36][40] |
| Privileged Infrastructure Access | "fast, governed, task-specific access to Cisco routers and switches" for "network teams and AI agents" | **Roadmap**: "Being developed in collaboration with Teleport" | October 26, 2026 | [26] |

### B2. How an investigation runs (documented behavior)

1. An alert becomes an action, or the operator types a question [5][7].
2. In Reasoning mode, AI Canvas "creates a proposed investigation plan." The operator must "Modify the plan when necessary, and then approve it to continue" [6].
3. AI Canvas "performs the approved steps using the products, agents, data, and knowledge available within your access permissions" [6].
4. Results include "Supporting evidence," "Recommended next steps," and "Investigation limitations — Missing data, unavailable products, access restrictions" [6].
5. If a fix is a workflow, selecting it "opens its configuration form. It does not start the workflow." The operator reviews targets and inputs and selects Run [6].
6. Workflows can pause for a human: "Tasks let workflows request user input before taking an action. They are commonly used to request approval for actions such as automated remediation" [11].
7. Everything stays on the canvas: "the questions asked, evidence collected, findings reached, decisions made, and actions taken" [6].

### B3. Controls on who can act

| Control | Documented behavior | Source |
|---|---|---|
| Two-layer RBAC | "You must have explicit permissions at both levels to perform all functions" | [8] |
| Weakest-link rule | "If you lack permission on any single alert in a correlated group, the action is blocked for the entire group" | [8] |
| Viewer cannot act | "If you have the Environment Viewer role, you cannot run actions, even if you have member or administrator rights in an underlying product" | [8] |
| Least privilege across products | "A cross-product platform must hold the line on access, never widen it" | [17] |
| Agents | "Relevance alone never grants action. Agents need scoped tools, bounded skills, runtime policy checks, full auditability, and human-in-the-loop gates for higher-impact work" | [17] |
| Canvas sharing | "Anyone with this link is automatically granted editor rights" | [6] |
| AI training data | "Default: Enabled." "An Environment Admin can modify this preference at any time" | [6][12] |

The last two rows matter for a hospital: a shared canvas link gives edit rights, and the tenant is opted in to AI model training unless an admin turns it off.

### B4. The five storyboard words, re-checked against Cisco's own wording

Cisco's launch blog lists governance "that makes every agentic action transparent, auditable, bounded, reversible, and subject to human approval" [16]. Zeus Kerravala repeats "bounded, auditable, and reversible" [33]. This is a stated design attribute. No product documentation found describes an automatic rollback of a network configuration change. The only documented rollback is for Studio apps and agents: "versioned, immutable, and rollback-ready" [17].

---

## C) What Cisco means by "AgenticOps"

| Source | Cisco's wording | Ref |
|---|---|---|
| Product documentation (Terminology) | "A model in which governed AI agents help operators correlate information across domains, investigate, and take action on issues that need attention" | [13] |
| GA blog | "Cisco's operating model for people and AI agents to work together across product boundaries, with clear human accountability" | [1] |
| Launch blog (DJ Sampath) | "Cisco's operational system for the AI era, where governed AI agents monitor, reason, and act across your infrastructure with humans firmly in the loop. AgenticOps is the capability. Autonomous infrastructure is the outcome" | [16] |
| Learn page | "AgenticOps is a new operating model for IT" | [46] |
| Learn page, versus AIOps | "AIOps helped IT see problems sooner." AIOps "stops at alerts and recommendations" | [46] |
| Learn page, oversight | "Operators retain oversight with the ability to validate, approve or override at any point" | [46] |
| Networking blog (Joe Vaccaro) | "The future of NetOps is not human or machine. It is human-led, agent-powered operations" | [21] |

**The stated loop**

- Five stages: "sense, diagnose, remediate, validate, and deploy. It is powered by Experience Metrics, Deep Reasoning, Digital Twin, and Cisco Agentic Workflows" [21].
- November 9, 2026 restatement: "agents sense an issue, diagnose its cause, prepare remediation, validate the proposed change, and deploy it within customer-defined controls" [29].
- The learn page uses four agent roles instead: a monitoring agent, a diagnostic agent, a remediation agent that "proposes a validated fix," and a learning agent [46].

Use the five-stage loop in the explainer. It is the version Cisco repeats in June, October, and November 2026 [21][29][45].

---

## D) How Cisco says Cloud Control changes architecture and operations

### D1. Cisco executives

| Speaker | Quote | Date | Ref |
|---|---|---|---|
| Jeetu Patel, President and Chief Product Officer | "Cisco Cloud Control is a command center for agentic AI: a platform where your team and your AI agents work together, in the same environment, with the same information, and with humans in control." | June 2, 2026 | [2] |
| Jeetu Patel | "This shift isn't an incremental upgrade — it requires us to refactor our infrastructure entirely." | June 2, 2026 | [23] |
| Jeetu Patel | "We moved from a collection of individual products, each with its own interface and data model, to a platform where every product makes the others more powerful." | June 2, 2026 | [23] |
| Jeetu Patel | "The future of infrastructure operations is agentic, and it requires a platform that combines shared context, purpose-built models, and clear guardrails. Cisco Cloud Control is that platform." | October 26, 2026 | [26] |
| DJ Sampath, SVP and GM, AI Software and Platform | "This isn't a single pane of glass; glass is passive. Cisco Cloud Control is active execution, with policy and identity built into the control path itself." | June 2, 2026 | [16] |
| DJ Sampath | "Dashboards giving way to agentic workflows. Infrastructure as code evolving into infrastructure as a harness." | June 2, 2026 | [16] |
| DJ Sampath | "tightly integrated, loosely coupled, and built for an open ecosystem" | June 2, 2026 | [16] |
| Balaji Venkatraman, VP Product Management | "they unified the interface without converging the data." "Convergence happens below the UI." | June 2, 2026 | [17] |
| Balaji Venkatraman | "Humans move higher in the loop — toward judgment, strategy, and design — and away from the repetitive, cross-tool assembly work that consumes their attention today." | June 2, 2026 | [17] |
| Joe Vaccaro, SVP and GM | "greater autonomy must come with visibility and control. Teams need to understand what an agent found, what evidence supports its recommendation, which actions need approval, and whether the service has recovered." | October 26, 2026 | [27] |
| Anurag Dhingra, SVP and GM | "closed-loop autonomy that can help free human operators from tedious or error-prone tasks, accelerate time to resolution, and address issues earlier before they become incidents" | June 2, 2026 | [22] |
| Jeff Schultz, SVP (as reported) | Cloud Control is the "single front door" to the portfolio; "no new Cisco product will ship unless it is integrated with Cloud Control" (reporter's paraphrase) | November 10, 2026 | [32] |
| Jeff Schultz (as reported) | "the line between observing an agent and securing an agent is beginning to blur" | November 10, 2026 | [32] |

**Architecture claims worth repeating accurately**

- Federated, not replaced: "an open, federated architecture with common services for identity, tenancy, authorization, assets, topology, telemetry, search, navigation, audit, workflow, and agent actions" [17].
- Hybrid data model: "Data is normalized and converged where correlation, search, and AI reasoning require it, and federated where live product context or domain-specific action requires direct interaction" [17].
- Six harness capabilities: trusted access, "Normalized APIs and MCPs," identity and zero trust "in the control path," telemetry, enforcement points, and governance [16].
- Policy at the network edge: "Policy is governed centrally in Cloud Control, with distributed enforcement across Secure Routers" [22].

### D2. Analysts and press

| Analyst | Firm | Quote | Date | Ref |
|---|---|---|---|---|
| Mike Leone | Moor Insights & Strategy | "Cloud Control is, I would argue, the most coherent platform argument they've made in years." | June 2, 2026 | [37] |
| Mike Leone | Moor Insights & Strategy | "Surfacing confidence and risk scores that are based on every agent and the digital twin component will all make 'human in the loop' involvement really fast." | June 2, 2026 | [37] |
| Jim Frey | Omdia | "Compute systems are cattle ... But networks are still like pets; something goes wrong with a network switch, okay, now you've got a problem that's got a much broader impact, potentially." | June 2, 2026 | [37] |
| Bob Laliberte | theCUBE Research | "As we move to these highly distributed environments, the network becomes a key enabler for operationalizing AI." | June 2, 2026 | [37] |
| Zeus Kerravala | ZK Research | "If the old model was 'visibility first, action later,' the new model is supposed to be visibility, reasoning, and action, all within the same environment." | June 3, 2026 | [33] |
| Zeus Kerravala | ZK Research | "rigorously evaluate the AI governance model ... customers should validate this in real workflows before letting agents take any consequential actions." | June 3, 2026 | [33] |
| Tom Hollingsworth | Futurum | "The central issue now is whether a unified control plane can deliver meaningful operational simplification while maintaining the governance and oversight enterprises require." | June 5, 2026 | [38] |
| Fernando Montenegro | Futurum | "An agentic security architecture that deeply covers Cisco infrastructure but selectively integrates with the broader security ecosystem is a partial architecture for the typical enterprise environment." | June 8, 2026 | [39] |
| Steve McDowell | NAND Research | "Cisco is now selling the operating model, not just the underlying network." | June 7, 2026 | [41] |
| Steve McDowell | NAND Research | "without that data layer, Cloud Control would be an interface without substance." | June 7, 2026 | [41] |
| Paul Nashawaty, Samantha Weston | Efficiently Connected (ECI Research) | "Customers will need to see mature confidence scoring, explainability, and staged autonomy before they hand over the keys." | July 27, 2026 | [43] |
| Jim Lundy | Aragon Research | "Enterprises should view this launch as a clear signal that manual network administration models are becoming obsolete." | June 3, 2026 | [44] |

**IDC and Gartner.** No public IDC or Gartner commentary on Cloud Control was found. Cisco's chief sales officer cited IDC data at Cisco Live Melbourne that "only 9% of organizations in the region believe their networks are fully ready for new AI and digital initiatives" (as reported; the region is Asia Pacific) [32].

**Vendor survey data.** "A recent Cisco and Omdia study of 1,000 IT and network operations leaders found that 51% of respondents are already using agentic AI to act on NetOps processes and tasks in production. And 84% expect to reach an AI-led operating model within 12 months" [27][29].

---

## E) What is new (October 26 to November 13, 2026)

Brief 05 covered release notes through November 10. These items were not in Brief 05.

| Date | Item | Status | Source |
|---|---|---|---|
| October 13, 2026 | Cisco Connect deck labels networking MCP: Catalyst Center (BETA), Meraki (BETA), ThousandEyes (GA) | Beta / GA as labeled | [45] |
| October 26, 2026 | Model Foundry: "A new platform service in Cisco Cloud Control" | CA, partners first. GA planned June 2027 (press) | [26][28][36][40] |
| October 26, 2026 | Agentic Actions: "Now in controlled availability." "Customers can progressively expand autonomy from approving individual changes to autonomous execution within defined policies and guardrails, with human oversight" | CA. The same post also says "sign up for the Agentic Actions beta" | [27] |
| October 26, 2026 | MCP servers for Cisco networking platforms | Announced | [26][27] |
| October 26, 2026 | ThousandEyes built into Wi-Fi 6E and Wi-Fi 7 access points, "Included with eligible Cisco Networking Essentials licenses starting in late fourth quarter 2026" | Roadmap (late Q4 2026) | [27] |
| October 26, 2026 | Experience Metrics extended to applications | Beta | [27] |
| October 26, 2026 | Cisco IQ in Cloud Control: "one-click action on at-risk, controller-managed devices directly within Cloud Control" | Announced | [26] |
| October 26, 2026 | Privileged Infrastructure Access (with Teleport) | Roadmap ("Being developed") | [26] |
| October 27 to November 10, 2026 | Environments, Secure Access notifications, bulk resolve, Cisco Spaces, Catalyst Center setup move, site health filter | Shipped | [3] |
| November 9, 2026 | "AgenticOps went from vision to a day-to-day necessity for NetOps." Agentic Actions "combines AI agents, deep reasoning, and Cisco Workflows" | CA | [29] |
| November 10, 2026 | Cisco Live Melbourne: Claude Mythos added to AI Defense red teaming ("coming soon for select enterprises"); Cisco IQ data into Splunk; "Model Context Protocol (MCP) & ServiceNow Connectors" for Cisco IQ | Mixed; see source | [30] |
| November 10, 2026 | Regional rollout as reported: "Australia, the EU, and the UK are scheduled for February 2027, with Japan, India, and Canada following in May" | Roadmap, press report only | [32] |
| November 10, 2026 | Tokenomics on AWS: "private preview in December, with general availability in AWS Marketplace early 2027" | Roadmap | [30] |
| November 13, 2026 | Release notes: no entry after November 10 | Checked | [3] |

No Cloud Control Studio, Agent Builder, App Builder, Marketplace, or Digital Twin status change was found in any October or November 2026 source.

---

## F) Healthcare-specific statements

**Finding: there is no named healthcare customer, healthcare case study, or healthcare-specific product statement for Cloud Control or AI Canvas in public sources as of November 13, 2026.**

What does exist:

| Statement | Type | Source |
|---|---|---|
| AI Canvas "has been shaped by alpha and beta customers across industries – financial services, healthcare, retail, manufacturing, technology and more" | Cisco blog; no customer named | [18] |
| "In every workplace environment – from office spaces to hospitals to factory floors – we are seeing accelerated AI adoption" | Executive blog, general | [22] |
| "The IT teams behind hospitals, power grids, banks, airlines, and governments" | Executive blog, general | [23] |
| Custom apps could bring under management "a factory controller, a medical device, or a partner-managed appliance" | Executive blog, illustrative; depends on Studio (Roadmap) | [16] |
| Example prompt for the security Policy agent: "Allow only doctors to access the EHR system, deny nurses and others, log every attempt" | Illustrative input on Cisco's AgenticOps for security page | [51] |
| Cisco Live 2026 demo AIDC-01, "Powering real-world AI use cases: Healthcare \| Retail \| Manufacturing," lists Cisco Cloud Control among its products | Trade-show demo, not a customer | [54] |
| "Identify any PCI, HIPAA, or other compliance requirements that may require reviewing the applicable Cisco terms" | Splunk prerequisite in Getting Started | [4] |
| Cisco's Unified Edge for Intelligent Healthcare overview mentions Intersight and Splunk, not Cloud Control | Healthcare collateral, February 10, 2026 | [57] |

Agent Builder's thank-you list of ecosystem partners includes Ordr [19]. That is a partner name on a roadmap feature, not a healthcare integration available today.

---

## G) Published outcome metrics (all non-healthcare)

| Customer | Named? | Exact wording | Product | Caveat | Source |
|---|---|---|---|---|---|
| "a global supply chain and commerce software company" | No | "used AI Canvas to resolve a recurring site issue in under 10 minutes. Previous manual investigations took more than 10 hours" | AI Canvas | **Non-healthcare.** One live session | [1] |
| "a leading investment management firm" | No | "a ThousandEyes specialist answered with just one AI Canvas prompt a question that had previously required a custom Python workaround" | AI Canvas | **Non-healthcare.** No number | [1] |
| "a higher education technology provider" | No | "now logs into Cloud Control daily and says it's already identifying real issues before users can complain" | Cloud Control | **Non-healthcare.** No number | [1] |
| A global bank | No | "Eliminated 20–30 minutes of initial manual triage per incident." "Reduced the mean time to resolution from hours to seconds through contextual handoffs" | AI Canvas (data center) | **Non-healthcare.** Solution overview dated June 2, 2026, before GA | [53] |
| World Wide Technology (partner) | Yes, Naasief Edross, Chief Security Architect | "Fine-tuning Cisco's Deep Network Model on troubleshooting data demonstrated the ability to get to the right fix in 11 of 12 real-world scenarios in the lab." | Deep Network Model via Model Foundry | **Non-healthcare.** Lab test by a partner, not production | [28] |
| Nutrien | Yes, Brock Richards, Senior Solution Architect | "This is game-changing technology from Cisco—taking us from reactive to preventive" | AgenticOps for networking | **Non-healthcare.** Quote does not name Cloud Control; no number | [50] |
| A state public-sector agency | No | "This is a huge leap forward. It's giving me another member of my team." | Deep Reasoning | **Non-healthcare.** No number | [21] |
| Room & Board | Yes | "one of the early customers using Cloud Control to bring its environment into that single view" | Cloud Control | **Non-healthcare.** No metric | [24] |
| AMD | Yes (keynote with Hasmukh Ranjan, SVP and CIO) | "AMD uses Cisco technology, including Cloud Control and Defense Claw, to streamline operations" | Cloud Control | **Non-healthcare.** Cisco's keynote recap text, not a direct quote. No metric | [25] |
| Customers Bank | Yes, Evan Mintzer | "That ecosystem will make integrating them into our environment much easier." | Marketplace | **Non-healthcare.** Forward-looking opinion | [33] |

**Adoption and vendor-claimed numbers**

- "More than 300 customers are already onboarded, and the global pre-GA waitlist surpassed 5,000 sign-ups" (August 25, 2026) [1].
- Deep Network Model "requires up to 5x fewer tool-calls for troubleshooting tasks" [53]. Cisco says it "beats general-purpose models by up to 20% on networking tasks" (as reported) [36].
- "92% of issues span multiple domains, taking an average of 88 hours to fix" appears on Cisco's NetOps page with no cited source [50].
- A Cisco Connect slide titled "Lower MTTR with Cloud Control" shows "80% Fewer support tickets," "80% Faster resolution times," "90% Less time spent on configuration changes," sourced to "Forrester TEI Report (2025)" [45]. That report predates Cloud Control (announced June 2026). Do not present these as Cloud Control results.

---

## H) Claims that must NOT be made

1. Do not say Cloud Control configures every Cisco product. It "complements existing Cisco product controllers" and works "without replacing individual product dashboards" [4].
2. Do not say Cloud Control shows topology for every connected product. Collaboration Control Hub, Identity, Secure Access, and ThousandEyes have no Topology data [5].
3. Do not say Cloud Control can deploy Live Protect shields. The view is "read-only"; deployment is in Nexus Dashboard [9].
4. Do not call the autonomous loop available. Cisco's wording is "will be able to" [2]. Agentic Actions is CA [27][29].
5. Do not present L1 to L4 as a product setting. It appears on one Cisco slide [45]. Configurable autonomy controls are "will be able to" [21].
6. Do not say agents act without a person. Today's documented path is plan approval plus an explicit Run [6]. Cisco's rule is "Agents propose. Humans approve" [19].
7. Do not say network changes are automatically rolled back. Cisco lists "reversible" as a governance attribute [16], but the only documented rollback is for Studio apps and agents [17].
8. Do not call Agent Builder, App Builder, or Marketplace GA, beta, or CA. No status statement exists beyond "Targeted for late 2026" [34] and "will support" [49].
9. Do not call Digital Twin anything but alpha [22].
10. Do not call Model Foundry GA. It is CA with partners first [26].
11. Do not say Cloud Control supports the A2A protocol. Only a generic "agent-to-agent integration" phrase was found [17].
12. Do not list Hypershield, Cisco XDR, Isovalent, or AI PODs as connected products. None appear in documentation [5].
13. Do not say AI Defense is a Cloud Control tile. It is described as the policy layer for Studio-built agents [19].
14. Do not say every Cisco Identity feature is GA. "Identity for AI Canvas is currently in beta" [15].
15. Do not say the Workflows agent is GA or works in Reasoning mode. It "is in beta, and it supports Default only" [6].
16. Do not say AI Assistant compares several Meraki organizations in one prompt. It uses "one selected environment per product for a prompt" [6].
17. Do not say customer data is never used for model training. The tenant preference is "Default: Enabled" [6][12].
18. Do not say Cloud Control keeps a long-term incident archive. Notifications and closed actions are removed after 90 days [5][7].
19. Do not state EU, UK, or Australia availability as a Cisco commitment. February 2027 comes from a press report of a keynote [32]. Documentation still says "United States only" [4].
20. Do not claim a healthcare customer, healthcare reference, or healthcare outcome metric for Cloud Control or AI Canvas. None exists [18].
21. Do not use the "80% / 80% / 90%" Forrester numbers as Cloud Control outcomes [45].
22. Do not say on-premises Intersight or Catalyst SD-WAN Cloud-Pro connect today. Virtual Appliance is unsupported [52]; Cloud-Pro is "Planned" [4].
23. Do not say Spaces-only SSO customers can use Cisco Spaces in Cloud Control. They "are not currently supported" [4].

---

## I) Where this brief differs from Brief 05

| # | Brief 05 says | This brief found | Source |
|---|---|---|---|
| 1 | Other regions are "future milestones" with no date | Network World reports Australia, EU, UK for February 2027; Japan, India, Canada for May. Press report, not Cisco documentation | [32] |
| 2 | Gap: Actions is both shipped and "Controlled Availability" | Two different things. The Cloud Control Actions tab is documented as shipped [7]. "Agentic Actions for networking" is CA [27][29] | [7][27][29] |
| 3 | "No source says network configuration changes are automatically reversible" | Still true for a documented mechanism. But Cisco does use the word: governance that makes agentic action "reversible" | [16] |
| 4 | Topology includes Layer 3 for Nexus Hyperfabric and Nexus Dashboard | Topology doc (November 3, 2026): "Topology displays data center and compute relationships only at L1 & L2." Conflicts with the August 11 release note | [10][3] |
| 5 | Licensing: Essential and Advantage, no additional cost | Cisco's page still says this [48]. TechTarget reported on June 2 that it "will be priced in three tiers: Essentials, Advantage or Premium. Customers can also buy token packs a la carte" | [37][48] |
| 6 | Cisco Identity is GA (US) | Platform service is GA, but "Identity for AI Canvas is currently in beta" | [15] |
| 7 | Deep Network Model: "No standalone SKU" | Now offered as "Deep Network 1.4" in Model Foundry (CA, partners first) | [28] |
| 8 | Splunk Agent Observability "with Tokenomics" GA September 15 | The AWS Bedrock and CloudWatch Tokenomics is "private preview in December" with GA "early 2027." Cisco says it "extends the token-spend attribution launched at .conf26" | [30] |
| 9 | Secure Access notifications added October 27 | Release notes agree [3], but the Overview data table (November 10) still shows no Notifications for Secure Access | [5] |
| 10 | "Tenant groups" and "Tenant Full Admin" | Renamed October 27, 2026 to environments, Environment Admin, Environment Viewer. The Cisco Identity doc still uses the old role names | [3][15] |
| 11 | Not covered | AI model training preference is "Default: Enabled" | [6][12] |
| 12 | Global availability "to follow" | Patel wrote on June 2: "global availability planned for later this year." Reported dates are now in 2027 | [23][32] |
| 13 | Lists "Security Cloud Control" as the connected security product | Documentation now calls it "Security, formerly known as Security Cloud Control." TechTarget reported that Cloud Control "replaces the previous Cisco Security Cloud Control" | [4][37] |

---

## J) Sources

1. Cisco Blogs, "A new chapter for IT operations: Cisco Cloud Control is now generally available for U.S. customers," Balaji Venkatraman, August 25, 2026. https://blogs.cisco.com/ai/cisco-cloud-control-us-general-availability
2. Cisco Newsroom, "Cisco Unveils Agentic Platform for Operating and Defending Critical IT Infrastructure," June 2, 2026. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m06/cisco-unveils-agentic-platform-for-operating-and-defending-critical-it-infrastructure.html
3. Cisco, "Cisco Cloud Control Release Notes" (header "Updated: October 30, 2026"; latest entry November 10, 2026; accessed November 13, 2026). https://www.cisco.com/c/en/us/td/docs/ai/cisco-cloud-control/release-notes/cisco-cloud-control-release-notes.html
4. Cisco, "Cisco Cloud Control Getting Started" (last updated November 10, 2026). https://cloud.cisco.com/docs/en/cisco-cloud-control-getting-started/cisco-cloud-control-getting-started.html
5. Cisco, "Cisco Cloud Control Overview" (last updated November 10, 2026). https://cloud.cisco.com/docs/en/cisco-cloud-control-overview/cisco-cloud-control-overview.html
6. Cisco, "Cisco Cloud Control AI Canvas and AI Assistant" (last updated November 7, 2026). https://cloud.cisco.com/docs/en/cisco-cloud-control-canvas/cisco-cloud-control-canvas.html
7. Cisco, "Cisco Cloud Control Actions" (last updated November 5, 2026). https://cloud.cisco.com/docs/en/cisco-cloud-control-actions/cisco-cloud-control-actions.html
8. Cisco, "Cisco Cloud Control RBAC" (last updated October 31, 2026). https://cloud.cisco.com/docs/en/cisco-cloud-control-rbac/cisco-cloud-control-rbac.html
9. Cisco, "Cisco Cloud Control Inventory" (last updated October 31, 2026). https://cloud.cisco.com/docs/en/cisco-cloud-control-inventory/cisco-cloud-control-inventory.html
10. Cisco, "Cisco Cloud Control Topology" (last updated November 3, 2026). https://cloud.cisco.com/docs/en/cisco-cloud-control-topology/cisco-cloud-control-topology.html
11. Cisco, "Cisco Cloud Control Workflows" (last updated November 7, 2026). https://cloud.cisco.com/docs/en/cisco-cloud-control-workflows/cisco-cloud-control-workflows.html
12. Cisco, "Cisco Cloud Control Administration" (last updated November 10, 2026). https://cloud.cisco.com/docs/en/cisco-cloud-control-administration/cisco-cloud-control-administration.html
13. Cisco, "Cisco Cloud Control Terminology" (last updated October 31, 2026). https://cloud.cisco.com/docs/en/cisco-cloud-control-terminology/cisco-cloud-control-terminology.html
14. Cisco, "Cisco Cloud Control Licensing" (last updated October 31, 2026). https://cloud.cisco.com/docs/en/cisco-cloud-control-licensing/cisco-cloud-control-licensing.html
15. Cisco Identity Intelligence Knowledge Base, "Cisco Identity in Cloud Control" (undated; accessed November 13, 2026). https://docs.oort.io/how-to-guides/cisco-identity-in-cloud-control
16. Cisco Blogs, "Cisco Cloud Control: The Secure Harness for the Agentic Era," DJ Sampath, June 2, 2026. https://blogs.cisco.com/ai/cisco-cloud-control-the-secure-harness-for-the-agentic-era
17. Cisco Blogs, "Inside Cisco Cloud Control: Building the AI-Native Platform of Record for Cross-Domain Operations," Balaji Venkatraman, June 2, 2026. https://blogs.cisco.com/ai/inside-cisco-cloud-control-building-the-ai-native-platform-of-record-for-cross-domain-operations
18. Cisco Blogs, "Cisco AI Canvas is here: the workspace for agentic operations," Rohit Bakshi and Colby Philbin, June 2, 2026. https://blogs.cisco.com/ai/ai-canvas-controlled-availability
19. Cisco Blogs, "Agent Builder in Cloud Control Studio: A new way to extend and customize Cisco Cloud Control," Vimarsh Puneet and Naveen Elango, June 2, 2026. https://blogs.cisco.com/ai/announcing-cisco-cloud-control-agent-builder
20. Cisco Blogs, "From an Idea to a Live App on Cisco, in Minutes" (App Builder), Travis Sugarbaker, June 2, 2026. https://blogs.cisco.com/ai/from-an-idea-to-a-live-app-on-cisco-in-minutes
21. Cisco Blogs, "From signal to action: The next step in Cisco AgenticOps," Joe Vaccaro, June 2, 2026. https://blogs.cisco.com/networking/from-signal-to-action-the-next-step-in-cisco-agenticops
22. Cisco Blogs, "The Agentic Workplace Runs on Cisco," Anurag Dhingra, June 2, 2026. https://blogs.cisco.com/news/the-agentic-workplace-runs-on-cisco
23. Cisco Blogs, "Navigating the Frontier of Agentic AI," Jeetu Patel, June 2, 2026. https://blogs.cisco.com/news/navigating-the-frontier-of-agentic-ai
24. Cisco Blogs, "The Network is the Foundation: Powering the Agentic AI Era," Steve Clayton, June 2, 2026. https://blogs.cisco.com/news/the-network-is-the-foundation-powering-the-agentic-ai-era
25. Cisco Newsroom, "Cisco Live 2026 keynotes: TL;DR edition," June 2026. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m06/cisco-live-2026-keynotes-tldr-edition.html
26. Cisco Newsroom, "Cisco Expands Partner Opportunity with New Cisco 360 Program Updates, High Yield Customer Experience Offerings, and AI-Ready Innovations," October 26, 2026. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m10/cisco-expands-partner-opportunity-with-new-cisco-360-program-updates-high-yield-customer-experience-offerings-and-ai-ready-innovations.html
27. Cisco Blogs, "Powering Partner Potential in a World of Agentic AI," Joe Vaccaro, October 26, 2026. https://blogs.cisco.com/news/powering-partner-potential-in-a-world-of-agentic-ai
28. Cisco Blogs, "Introducing Cisco Model Foundry: Bringing AI to our partners," DJ Sampath, October 26, 2026. https://blogs.cisco.com/ai/cisco-model-foundry-partner-summit
29. Cisco Blogs, "Agentic AI demands a stronger, more assured network foundation," Grant Shirk, November 9, 2026. https://blogs.cisco.com/networking/agentic-ai-demands-a-stronger-more-assured-network-foundation
30. Cisco Newsroom, "Cisco Unveils Frontier AI Red Teaming and Agent Observability to Secure the Agentic Enterprise," November 10, 2026. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m11/cisco-unveils-frontier-ai-red-teaming-and-agent-observability-to-secure-the-agentic-enterprise.html
31. Cisco Blogs, "Moving Fast and Staying in Control in the Agentic AI Era," Steve Clayton, November 9, 2026. https://blogs.cisco.com/news/moving-fast-and-staying-in-control-in-the-agentic-ai-era
32. Network World, "Cisco Live Melbourne: AI agents will break today's enterprise network, and Cisco wants to rebuild it," Zeus Kerravala, November 10, 2026. https://www.networkworld.com/article/4247022/cisco-live-melbourne-ai-agents-will-break-todays-enterprise-network-and-cisco-wants-to-rebuild-it.html
33. Network World, "What is Cisco Cloud Control and why should customers care?" Zeus Kerravala, June 3, 2026. https://www.networkworld.com/article/4180810/what-is-cisco-cloud-control-and-why-should-customers-care.html
34. Network World, "Cisco brings agentic ops platform and security overhaul to Cisco Live," Sean Michael Kerner, June 2, 2026. https://www.networkworld.com/article/4179673/cisco-brings-agentic-ops-platform-and-security-overhaul-to-cisco-live.html
35. Network World, "Cisco taps AI, partners to modernize IT operations and fortify network security," Michael Cooney, October 27, 2026. https://www.networkworld.com/article/4240556/cisco-taps-ai-partners-to-modernize-it-operations-and-fortify-network-security.html
36. Network World, "Cisco's partner shift: What customers should expect from their Cisco partner in the AI era," Zeus Kerravala, October 27, 2026. https://www.networkworld.com/article/4241463/ciscos-partner-shift-what-customers-should-expect-from-their-cisco-partner-in-the-ai-era.html
37. TechTarget, "Cisco Cloud Control unites AgenticOps for IT infrastructure," Beth Pariseau, June 2, 2026. https://www.techtarget.com/searchitoperations/news/366643670/Cisco-Cloud-Control-unites-AgenticOps-for-IT-infrastructure
38. Futurum, "Can Cisco Cloud Control Make AgenticOps Practical for Enterprises?" Tom Hollingsworth, June 5, 2026. https://futurumgroup.com/insights/can-cisco-cloud-control-make-agenticops-practical-for-enterprises/
39. Futurum, "Cisco Live 2026: Platform, Silicon, and Security for the Agentic Era," Fernando Montenegro, June 8, 2026. https://futurumgroup.com/insights/cisco-live-2026-platform-silicon-and-security-for-the-agentic-era/
40. Futurum, "Cisco Partner Summit 2026: An Energized Cisco Bets on Partner-Led AI," Alex Smith, October 30, 2026. https://futurumgroup.com/?p=97338
41. NAND Research, "Cisco's Full-Stack Play for Agentic Enterprise AI," Steve McDowell, June 7, 2026. https://nand-research.com/?p=5652
42. Efficiently Connected, "Cisco Cloud Control: AgenticOps Comes to Enterprise IT," Paul Nashawaty and Samantha Weston, June 5, 2026. https://www.efficientlyconnected.com/?p=7625
43. Efficiently Connected, "Cisco Cloud Control and AgenticOps: Autonomous Infra or Bold Rebrand?" Paul Nashawaty and Samantha Weston, July 27, 2026. https://www.efficientlyconnected.com/?p=8526
44. Aragon Research, "Cisco Live: The Race to Agentic Network Ops," Jim Lundy, June 3, 2026. https://aragonresearch.com/cisco-live-the-race-to-agentic-network-ops/
45. Cisco Connect St. Louis, "Networking for the Agentic Era," David Friday and Brandon Dodd, October 13, 2026 (PDF, text extracted). https://www.cisco.com/c/dam/en_us/training-events/events/cisco-connect/stl-fpw-networking-for-the-agentic-era.pdf
46. Cisco, AgenticOps learn topic page (URL slug "what-is-agentic-operations-agenticops"; page title not captured; undated; accessed November 13, 2026). https://www.cisco.com/site/us/en/learn/topics/artificial-intelligence/what-is-agentic-operations-agenticops.html
47. Cisco, "Cisco AI Canvas" product page (accessed November 13, 2026). https://www.cisco.com/site/us/en/solutions/artificial-intelligence/agentic-ops/ai-canvas/index.html
48. Cisco, "Cisco Cloud Control" product page (accessed November 13, 2026). https://www.cisco.com/site/us/en/solutions/artificial-intelligence/agentic-ops/cisco-cloud-control/index.html
49. Cisco, "Agent Builder in Cloud Control Studio" product page (accessed November 13, 2026). https://www.cisco.com/site/us/en/solutions/artificial-intelligence/agentic-ops/cloud-control-studio/index.html
50. Cisco, AgenticOps for network operations page (accessed November 13, 2026). https://www.cisco.com/site/us/en/solutions/artificial-intelligence/agentic-ops/net-ops/index.html
51. Cisco, AgenticOps for security page (accessed November 13, 2026). https://www.cisco.com/site/us/en/solutions/artificial-intelligence/agentic-ops/security/index.html
52. Cisco, "Cisco Intersight Integration with Cisco Cloud Control (AI Canvas/AI Assistant) FAQ," updated September 1, 2026. https://www.cisco.com/c/en/us/products/collateral/computing/hybrid-cloud-operations/ii-cc-ai-canvas-asst-faq.html
53. Cisco, "Resolve Data Center Issues Faster with Agentic AI Operations Solution Overview," updated June 2, 2026. https://www.cisco.com/c/en/us/products/collateral/networking/cloud-networking/resolve-dc-issues-faster-agentic-ai-operations-so.html
54. Cisco Live, "Cisco Live 2026 Las Vegas Showcase Demo Guide" (PDF, text extracted), June 2026. https://www.ciscolive.com/c/dam/r/ciscolive/global-event/docs/2026/Cisco-Live-2026-Las-Vegas-Showcase-Demo-Guide.pdf
55. Cisco Blogs, "Enabling Local AI Resilience with Cisco Cloud Control and NVIDIA DGX Station," Yash Sheth, October 21, 2026. https://blogs.cisco.com/ai/enabling-local-ai-resilience-with-cisco-cloud-control-and-nvidia-dgx-station
56. Cisco Blogs, "Cisco IQ: Scaling Secure Resilience," Bhaskar Jayakrishnan, June 2, 2026. https://blogs.cisco.com/customerexperience/cisco-iq-scaling-secure-resilience
57. Cisco, "Cisco Unified Edge for Intelligent Healthcare Solution Overview," updated February 10, 2026. https://www.cisco.com/c/en/us/products/collateral/computing/unified-edge/intelligent-healthcare-so.html

---

## K) Gaps / unverified

1. **Regional dates.** February 2027 (Australia, EU, UK) and May (Japan, India, Canada) come from one Network World report of a keynote [32]. No Cisco document or press release confirming them was found.
2. **Cloud Control Studio status.** No GA, CA, beta, or alpha statement for Agent Builder, App Builder, or Marketplace was found after the June 2 announcement. "Late 2026" is a press-reported target [34].
3. **Digital Twin.** No status after "alpha in July 2026" [22].
4. **A2A.** No Cisco source names the Agent2Agent protocol for Cloud Control. One blog says "agent-to-agent integration" [17].
5. **Hypershield, Cisco XDR, Isovalent, AI PODs.** No Cloud Control documentation, release note, or product list mentions them as connected products.
6. **Duo.** Named only as a Cisco Identity source [15]. No Duo tile or Duo agent was found in documentation.
7. **L1 to L4 trust levels.** Found only on one Cisco Connect slide [45].
8. **Layer 3 topology for data center.** The August 11 release note and the November 3 Topology doc disagree [3][10]. Confirm with Cisco before showing Nexus Layer 3 in Cloud Control.
9. **Secure Access notifications.** Release notes say added October 27 [3]; the Overview table does not show it [5].
10. **Pricing tiers.** TechTarget's June 2 report of a Premium tier and token packs [37] is not reflected on Cisco's pages [48][52]. Confirm current terms with the account team.
11. **Write actions per product agent.** Documentation lists agent use cases but does not publish a per-product list of write operations. Workflows are the documented write path [6][11].
12. **Agentic Actions wording.** Cisco says "Now in controlled availability" and "sign up for the Agentic Actions beta" in the same post [27].
13. **Schultz statement.** "No new Cisco product will ship unless it is integrated with Cloud Control" is a reporter's paraphrase [32]. No transcript was found.
14. **Healthcare reference.** None found. Ask Cisco whether a healthcare AI Canvas beta customer can be named.
15. **Sources that could not be read.** Constellation Research (HTTP 403) and the Cisco Community Experience Metrics beta post (HTTP 403). www.cisco.com pages were read as short excerpts only.
16. **IDC and Gartner.** No public commentary on Cloud Control found.
17. **Ambient agents.** Announced June 2 [21]; no availability label found.
18. **Release notes header.** The page header says "Updated: October 30, 2026" while listing entries through November 10 [3].
