# Research Brief 05: Cisco Cloud Control and Cisco Data Fabric (powered by Splunk)

Research date: Thursday, November 12, 2026
Scope: Cited facts for a healthcare storyboard. Every capability is tagged by availability status based on public Cisco and Splunk sources dated June to November 2026.

## How to read this brief

**Status tags**

- **GA**: a Cisco or Splunk source calls it generally available or "available now."
- **CA**: Controlled Availability, beta, or alpha. The exact term used by the source is given each time.
- **Roadmap**: announced, "coming," "will," "targeted," or no shipping evidence found.

**Healthcare relevance** columns and section F are positioning reasoned by the researcher. They are not Cisco healthcare SKUs. No Cisco healthcare-specific SKU for Cloud Control or Data Fabric was found.

Bracketed numbers such as [1] refer to the numbered sources in section G.

## Executive summary

- **Cloud Control** has been GA for US customers since August 25, 2026 [1][3]. It entered Controlled Availability in the US on June 2, 2026, at Cisco Live [2][7][15]. It is GA in the United States only; other regions are "future milestones" with no date [4].
- **Licensing:** Cloud Control and AI Canvas are included with eligible Cisco product subscriptions at Essential and Advantage tiers at no additional cost, and Cisco "reserve[s] the right to change this in the future" [8][14][15].
- **Not GA:** Agent Builder, App Builder, Marketplace, Digital Twin (alpha), Expanded Experience Metrics (beta), and the autonomous agentic loop.
- **Data Fabric:** Machine Data Lake, Catalog, and Agent Launchpad went GA on August 4, 2026, in Splunk Cloud [17][18]. Federated Search is GA for Amazon S3, Azure Blob, Azure Data Lake Gen2, Azure Databricks, Snowflake, and Splunk DDSS [21][22]. AWS CloudWatch Lake and Databricks were added on September 15, 2026 [19][20]. The 50% weighted ingest rate for eligible Cisco telemetry is verified [17].
- **"No separate Splunk license"** is real but narrow. Some Splunk-powered insights (Agent Observability, Network Intelligence app) surface in Cloud Control without a Splunk license [19][20]. Using your own Splunk data from AI Canvas requires an existing Splunk Cloud Platform stack, version 10.5 or later, hosted on US Commercial AWS [4].
- **HIPAA:** Splunk Lantern treats Cloud Control and AI Canvas as third-party content governed by Cisco terms and puts HIPAA alignment on the customer to confirm [29].

---

## A) Cisco Cloud Control capability matrix

| Capability | Status | Source | Healthcare relevance (positioning) |
|---|---|---|---|
| Platform overall: "With one login, Cisco Cloud Control delivers a single view of Cisco networking, security, compute, observability, and collaboration in one secure environment" | **GA (US only)**, August 25, 2026. Entered CA in the US on June 2, 2026, at Cisco Live. "Global Availability to follow." Other regions are "future milestones" with no date | [1][2][3][4] | One operating view for a health system's IT, network, and security teams |
| Unified identity (single sign-on across supported connected products, subject to existing permissions) | GA (US) | [1] | Fewer shared admin credentials across hospital IT tools |
| Inventory (one view of assets, AI-powered search, product-specific sync intervals) | GA (US) | [1][3] | One asset view across campus, clinics, and data center |
| Topology, including Layer 3 (subnets, VRF, VLAN, protocol, IP) for SD-WAN, Meraki, Nexus Hyperfabric, Nexus Dashboard, and Catalyst Center | GA (US). Layer 3 topology shipped August 11, 2026. Meraki Layer 3 and role-filtered topology shipped July 28, 2026 | [3] | One topology across the hospital campus and its clinics |
| AI Insights in Topology (sites and devices that need attention first, with reasoning and evidence) | GA (US), August 25, 2026 | [3] | Prioritizes which hospital or clinic site to look at first |
| Actions (correlated alerts, incidents, site-level summaries, role-based access, search and filter, bulk dismiss or resolve) | GA as a Cloud Control feature [3][3b]. Separately, "Agentic Actions for networking" was beta in June 2026 [7], and an October 13, 2026 Cisco Connect deck labels Actions "CONTROLLED AVAILABILITY" [10] | [3][3b][7][10] | Reduces alert noise during clinically impactful incidents |
| AI Assistant (natural-language entry point; supported, authorized actions) | GA (US) | [1][10] | Quick answers for on-call staff |
| AI Canvas (multiplayer, persistent investigation workspace with Default Mode and Deep Reasoning Mode, generated widgets, multimodal context) | Entered CA on June 2, 2026 [6]. Included in the August 25 GA experience [1] and covered by the licensing FAQ [8]. The Workflows agent inside AI Canvas is labeled **beta** [3] | [1][6][8][3] | A shared war room for an EHR slowdown, with context preserved across shift changes and escalations |
| Cisco agents in AI Canvas (choose which product agents handle a request) | GA (US), August 25, 2026 | [3] | Pull in Meraki, ThousandEyes, or Security expertise on demand |
| Cisco Agentic Workflows (turn recommendations and repetitive tasks into reusable automations) | GA, introduced at the August 25 GA. Running workflows from inside AI Canvas is beta (Default Reasoning mode only) | [1][3] | Reusable runbooks, for example a VLAN quarantine that requires approval |
| Cloud Control Studio: Agent Builder (natural-language agent creation, sandbox, versioned publish lifecycle, 50+ planned native connectors plus MCP) | **Roadmap / unconfirmed.** Announced June 2, 2026 [2][5]. Network World reported "Targeted for late 2026" [11]. The Studio product page still uses "will support" language for third-party connections [12] | [2][5][11][12] | Custom agents built from hospital SOPs and runbooks |
| Cloud Control Studio: App Builder (build apps and workflows from natural-language prompts with OpenAI Codex built in) | **Roadmap / unconfirmed.** Same evidence as Agent Builder | [2][11] | Custom operational views for clinical engineering or facilities |
| Cloud Control Marketplace | **Roadmap / unconfirmed.** Described in the GA blog with no availability date | [1][2][11] | Partner-built and certified agents |
| Deep Network Model (purpose-built model "grounded in 40 years of Cisco operational networking data") | Announced as a reasoning model in Cloud Control [2] and as powering AI Canvas for data center networking [13]. No standalone SKU or explicit GA statement found | [2][13] | Network-domain reasoning for root cause |
| Deep Reasoning (structured investigation: competing hypotheses, evidence, impact, root cause, next steps) | Beta in June 2026 [7]. The October 13, 2026 Cisco Connect deck labels it "AVAILABLE" [10] | [6][7][10] | Defensible root cause for a clinical-impact post-mortem |
| Expanded Experience Metrics (called "Enhanced Experience Metrics" in the October deck) | **Beta.** Beta in June 2026 [7]; still labeled BETA on October 13, 2026 [10] | [7][10] | Clinician user experience on Wi-Fi and wired networks |
| Digital Twin (emulate devices, connectivity, topology, configurations to validate changes before production) | **Alpha**, July 2026 [7]. No later status found | [7] | Pre-validating changes in a 24x7 clinical network |
| Autonomous Agentic Loop (sense, diagnose, remediate, validate, deploy) | **Roadmap.** The announcement uses "will be able to" language | [2][7] | Future closed-loop operations |
| Cisco Spaces connector (open the Spaces dashboard, Spaces Connectors in Inventory and Topology, health and availability alerts) | GA (US), added November 10, 2026 | [3b] | Health of indoor location and RTLS infrastructure. This is connector health only, not patient, staff, or asset location data |
| Cisco Identity (identity data from Okta, Cisco ISE, Microsoft Active Directory in one view; identity posture and risk) | GA (US), August 25, 2026. Non-Cisco identity sources require a **Duo Advantage+ or ISE Advantage+** license | [3] | Identity posture for clinician, contractor, and vendor accounts |
| Tenant groups (multiple product tenants in one Cloud Control tenant group) | GA (US), August 25, 2026. A tenant group can include only one ThousandEyes tenant and one Security tenant | [3] | Multi-hospital systems with several Meraki organizations |
| Environments and new onboarding experience | GA (US), October 27, 2026 | [3b] | Separate environments per hospital or region |
| Audit log | GA (US); usability improvements July 14, 2026 | [3] | Auditable record for compliance reviews |
| Licensing visibility (license usage, balance, and reports across supported products) | GA (US) | [3] | Single view of entitlements |
| Licensing model | Included with eligible Cisco product subscriptions at Essential and Advantage tiers at no additional cost. "We reserve the right to change this in the future." Partner blog: "there is no new license and no new cost for eligible customers" | [8][14][15] | Usually no new budget line, but eligibility per product needs confirming |

### Security posture of the platform (cited)

- Cisco Newsroom: "People and agents work from a single data layer, sharing the same operational context and the same system of action, while humans stay in control." Agents keep "actions visible and governed" [2].
- Cisco Live 2026 keynote recap: "Cloud Control brings together zero trust, identity intelligence, and AI guardrails to give teams complete visibility into where agents are running and what they can access" [16].
- Agent Builder blog: "Every agent runs under policy enforcement through Cisco AI Defense. Customers define what each agent can do, when it can act, and what actions require human approval. Agents propose. Humans approve before anything changes in production" [5].
- Splunk AI Agent Monitoring "captures every agent's execution, including outcome, duration, trigger, and a full trace of every LLM call, tool invocation, and skill execution" [5].
- Agents go through "a draft, sandbox, and publish lifecycle" with "Version control tracks every change, with full rollback support" [5].
- Role-based access control governs who can assign, dismiss, or resolve actions, run workflows, and act on correlated alerts. Topology is filtered by role. An audit log is available [3].
- Intersight FAQ: "The platform utilizes a centralized AI gateway (a middleware layer) that manages model routing, data governance, and policy enforcement" [14].
- Cisco Connect deck trust levels: L1 Diagnose only ("Show me why"), L2 Recommend ("Pick the fix"), L3 Supervised autonomy ("Execute after I click approve"), L4 Autonomous ("Act within policy") [10].
- GA blog: Cloud Control is "the secure harness that puts AgenticOps into practice. It gives agents trusted access to infrastructure, live operational context, and clear guardrails for action" [1].

**Mapping to the storyboard's five words**

| Storyboard word | Supported by | Caveat |
|---|---|---|
| Visible | Agent traces [5]; AI Canvas reasoning trail [6]; visibility into where agents run [16] | None |
| Auditable | Audit log [3]; full traces [5] | None |
| Bounded | AI Defense policy enforcement [5]; RBAC [3]; AI gateway [14] | None |
| Human-approved | "Agents propose. Humans approve" [5]; L3 "Execute after I click approve" [10]; Deep Reasoning plan approval before agents run [6] | None |
| Reversible | "full rollback support" for agent versions [5] | Rollback applies to **agent versions**. No source says network configuration changes are automatically reversible. Digital Twin (alpha) is the change-validation story [7] |

### What Cloud Control does NOT do

- GA blog: "We have done this without flattening the depth of individual products. Each Cisco product continues to provide the specialized control customers expect. Domain controllers remain responsible for their specialized management and execution, while Cloud Control connects the work between them" [1].
- Documentation: it "complements existing Cisco product controllers" and "enables seamless cross-domain workflows and a consistent user experience without replacing individual product dashboards" [3][4].
- Meraki, Catalyst Center, Catalyst SD-WAN Manager, Nexus Dashboard, Intersight, Security Cloud Control, ThousandEyes, and Splunk remain the domains of record.

---

## B) Cisco Data Fabric (powered by Splunk) capability matrix

Splunk describes Cisco Data Fabric powered by the Splunk Platform as "the system of record and intelligence for the agentic enterprise," with the Splunk Platform as "the data platform that brings the architecture to life" [17]. Splunk describes three layers: data, context, and action [18][25].

| Capability | Status | Source | Healthcare relevance (positioning) |
|---|---|---|---|
| Machine Data Lake (full-fidelity machine data in a low-cost, Splunk-managed tier; "cataloged and schematized but not indexed"; promote slices to a Splunk index or Analytics Table, including streaming promotion) | **GA August 4, 2026** for Splunk Cloud Platform 10.5.2605.5 in US-East, Frankfurt, Tokyo, and Sydney. TechTarget states "generally available in July" in its body text and "GA Aug. 4, 2026" in its list; use August 4 | [17][18][19] | Retain full IoMT, network, and security telemetry for investigations and retention without indexing all of it |
| Catalog (keyword search over dataset names, owners, types, descriptions, fields; inspect coverage before promotion; governed by Splunk RBAC) | GA August 4, 2026 (same regions as Machine Data Lake) | [17][18] | Analysts and agents can find the right datasets |
| MCP-enabled Catalog Discovery | Announced ("highlighted today") September 15, 2026. No GA statement found | [20] | Agent-driven data discovery |
| Splunk MCP Server | GA. It is a required app for the Cloud Control Splunk integration | [4] | Governed agent access to Splunk data |
| Federated Search for Amazon S3 | GA May 18, 2026, starting with Splunk Cloud 10.4 on AWS | [21] | Search archived logs held in S3 without ingesting them |
| Federated Search for Azure Blob Storage, Azure Data Lake Storage (ADLS Gen2), Azure Databricks, Snowflake, Splunk DDSS | **GA July 6, 2026.** Azure stores and Azure Databricks were in CA as of May 18, 2026 | [21][22] | Covers health systems standardized on Azure or Snowflake |
| Federated Search for AWS CloudWatch Lake and Databricks | Announced September 15, 2026 ("Today we are extending Federated Search's functionality to AWS CloudWatch Lake and Databricks"). TechTarget: "available Sep. 15, 2026" | [19][20] | Cloud workloads adjacent to EHR hosting |
| Federated Search over Delta Lake and Iceberg | **Unverified.** Named only on the product page ("ideal for low-frequency, ad-hoc searches on data stored in Amazon S3, Snowflake, Delta Lake, Iceberg, Azure Blob, and more") with no GA date or connector documentation | [23] | Do not claim a GA connector |
| Federated Analytics for Amazon Security Lake | Listed as a current federated option | [22] | Security data lake correlation |
| Federated Search scope limitation | "The other federated search options are available only for users of Splunk Cloud Platform." Amazon S3 and Microsoft Azure options are "available only for Splunk Cloud Platform deployments in AWS regions." Activation is through a Splunk sales representative | [22] | Not available to an on-prem-only Splunk Enterprise shop for these targets |
| Schema inference with Splunk-managed catalog for federated data | GA with Federated Search (May 18, 2026) | [21] | Query raw lake data "as if it were already ingested" |
| AI-Powered Data Management (Guided Onboarding, Auto Schematization with CIM mapping recommendations, Self-Healing Pipelines that detect CIM drift and recommend fixes) | GA August 4, 2026 ("expanded Federated Search and Data Management capabilities, are now generally available") | [17] | Faster onboarding of unusual medical-device and building-system log formats |
| Context Layer (data catalog, knowledge graph, business context, operational history for semantic search, lineage) | Architecture concept. Catalog component is GA. No GA date found for the knowledge graph or lineage capabilities | [24][25][26] | Connects a log to a service, host, site, and impact |
| Agent Launchpad (build an agent, choose the LLM, connect tools, select agent skills, no coding; RBAC; every run traceable) | **GA August 4, 2026 in Splunk Cloud** [17]. For on-prem Splunk Enterprise on AI POD: "coming later this year" [27]. TechTarget lists "Agent Launchpad: later in 2026," which matches the on-prem scope | [17][19][27] | No-code SOC and IT operations agents with traceable runs |
| Splunk agent skills (open source on GitHub; first three Splunk-built skills) | GA (released) August 4, 2026 | [17] | Reusable investigation steps |
| Cisco AI POD for Splunk (self-managed Splunk AI on-prem, private cloud, air-gapped; Cisco infrastructure plus NVIDIA) | GA September 15, 2026 ("available today") | [27] | Splunk names **healthcare** among industries where "their data will never leave their data centers" [20] |
| Splunk AI Assistant on-prem | Available September 15, 2026 | [27] | On-prem agentic investigations |
| Self-hosted models (Cisco Deep Time Series Model, Google Gemma 4, OpenAI GPT-OSS 20B; NVIDIA Nemotron "in the coming months") | Available September 15, 2026, except Nemotron (Roadmap) | [27] | Keep model inference inside the hospital data center |
| Cisco Deep Time Series Model (forecasting and anomaly detection on machine data) | Announced September 15, 2026; selectable as a self-hosted model | [20][27] | Anomaly detection on device and facilities telemetry |
| Splunk Agent Observability with Tokenomics (also available in Cisco Cloud Control) | GA September 15, 2026 | [19][27] | AI governance and AI cost visibility |
| Network Intelligence App (Cisco SD-WAN, Firewalls, Nexus intelligence integrated with Cloud Control) | September 15, 2026 | [19][20] | Splunk-side analysis of network and firewall data |
| 50% weighted ingest rate: "Eligible Cisco security, network, and operational data is automatically recognized in Splunk and receives a built-in 50% weighted ingest rate" | **Verified**, August 4, 2026 | [17] | Lower cost to bring Cisco telemetry into a SIEM |
| Included capacity for AI-powered Data Management, Machine Data Lake, and Federated Search (Integrated Enterprise Value) for eligible Splunk Cloud customers | Announced summer 2026 | [20] | Lower-friction way to start |
| Activity-Based Pricing (weights search and ingest equally) | **Roadmap** ("Set to release this Fall") | [20] | Pricing model to watch |
| Sensitive data masked or tokenized at ingest; federation leaves regulated data in its home region | Stated in a Splunk Data Fabric blog (publication date not confirmed) | [24] | Supports the PHI boundary story |

### Storage economics: approved wording

- **Verified:** "low-cost, Splunk-managed storage tier" [19]; "retaining all ingested data in open formats" [24]; Machine Data Lake "promotes selected data when higher-performance analytics creates value" [20]; promotion "when premium costs warrant" [17].
- **Verified:** TechTarget: "This shifts the cost decision from what should be retained to what needs to be activated for analysis" [19].
- **Not verified:** the exact phrase "object storage cost." Use "low-cost tier" instead.
- **Schema-on-read:** use "schema inference" [21] and "cataloged and schematized but not indexed" [19] rather than claiming a formal schema-on-read engine.

### How Cloud Control and Splunk connect (verified carefully)

1. **Splunk Blog, September 15, 2026 [20].** Exact text (Splunk's dash shown here as a colon): "Once data is discoverable, it must be connected to the signals around it. Cisco Data Fabric powered by the Splunk Platform enables our customers to not only access that context but turn it into trusted agentic action. Cisco customers can now get this same functionality through Cisco Cloud Control: no separate Splunk license required. It's a direct extension of the single-pane-of-glass view we announced at Cisco Live US this summer, now with a straight path to Splunk insights built in." The phrase "this same functionality" is not precisely defined.
2. **TechTarget, September 17, 2026 [19].** Narrows the claim to specific features: "Agent Observability and the network intelligence app also surface in Cisco Cloud Control, giving Cisco customers Splunk-powered insights without requiring a Splunk license."
3. **Cisco Getting Started documentation [4].** The full Splunk integration (single sign-on, cross-launch, access to Splunk data and skills in AI Canvas, Splunk AI Assistant through the Cisco Unified AI Assistant) requires:
   - Splunk Cloud Platform stack version 10.5 or later.
   - Splunk Cloud stack hosted on US Commercial AWS. "Future Support: GCP, Azure, FedRamp, Gov Cloud."
   - Splunk MCP Server and Splunk AI Assistant apps installed by an `sc_admin` user, and the `mcp_tool_execute` capability assigned to roles that need Splunk access in AI Canvas.
   - Users migrated to Cisco Unified Identity via email verification.
   - Customers in AWS US East should "identify any regional data requirements before connecting your Splunk environment to Cisco Cloud Control in the US West region."
4. **Timeline.** The Splunk integration shipped in Cloud Control on June 30, 2026 [3]. Splunk announced "Splunk is now available within Cisco Cloud Control for U.S. customers" on August 27, 2026 [28].
5. **Known issue.** "The Splunk AI Assistant may generate SPL that includes the rest command, which the Splunk MCP cannot execute" [3].

**Bottom line:** Some Splunk-powered insights (Agent Observability, Network Intelligence) appear in Cloud Control without a Splunk license. Searching your own data in Splunk from AI Canvas requires a Splunk Cloud subscription on US AWS. Confirm exact scope with the Cisco or Splunk account team before the storyboard states the claim.

### HIPAA caveat

Splunk Lantern [29]: "Cisco Cloud Control and AI Canvas are governed by Cisco terms and are deemed Third Party Content under Section 13.2 of the Splunk General Terms (or equivalent agreement with Splunk). You are responsible for reviewing the applicable Cisco terms, Cisco disclosures, and Cisco policies for Cisco Cloud Control and AI Canvas to confirm alignment with your compliance requirements, including the Health Insurance Portability and Accountability Act (HIPAA), the Payment Card Industry (PCI) standard, and other applicable requirements."

Cisco Getting Started [4] repeats the prerequisite: "Identify any PCI, HIPAA, or other compliance requirements that may require reviewing the applicable Cisco terms."

### PHI vs machine-data boundary (positioning)

Position Data Fabric as the aggregation layer for **machine data**:

- Network telemetry (Meraki, Catalyst, SD-WAN, Nexus, ThousandEyes)
- Security telemetry (firewalls, Secure Access, Splunk ES detections)
- Identity events (ISE, Duo, Okta, Active Directory)
- IoMT device telemetry (connectivity, posture, segmentation events)
- Nurse call and RTLS **system events** and infrastructure health
- EHR **performance** telemetry (response time, availability, synthetic tests)

Data Fabric is **not** a clinical data repository. Clinical records and PHI stay in the EHR and clinical systems of record.

Supporting evidence: sensitive data masked or tokenized at ingest and in-place federation [24]; on-prem Cisco AI POD for Splunk for data that cannot leave the data center [20][27]; customer responsibility for HIPAA alignment [29].

---

## C) Connected Cisco products (Cloud Control, US)

| Product | Status | Notes | Source |
|---|---|---|---|
| Meraki | GA (August 25, 2026) | Alert sync, Layer 3 topology, Workflows shared with Meraki | [1][3] |
| Catalyst Center (through Meraki Global Overview) | GA (August 25, 2026) | Inventory, topology, status in AI Canvas. Setup moved to Products page November 10, 2026 | [1][3][3b] |
| Catalyst SD-WAN | GA (August 25, 2026) | Interfaces in inventory and topology | [1][3] |
| Nexus Dashboard | GA (August 25, 2026) | Layer 3 topology | [1][3] |
| Nexus Hyperfabric | GA (August 25, 2026) | Layer 3 topology | [1][3] |
| Cisco Intersight | GA (August 25, 2026) | SaaS US-East only. No Intersight Virtual Appliance support. EU-Central is roadmap | [1][14] |
| Identity (Cisco Identity) | GA (August 25, 2026) | Okta, ISE, AD sources; non-Cisco sources need Duo Advantage+ or ISE Advantage+ | [1][3] |
| Security Cloud Control | GA (August 25, 2026) | Includes Cisco Secure Access licensing visibility; Secure Access notifications added October 27, 2026 | [1][3][3b] |
| ThousandEyes | GA (August 25, 2026) | AI Features must be enabled in ThousandEyes for AI Canvas | [1][4] |
| Splunk | GA (integration June 30, 2026; announced for US August 27, 2026) | Requires Splunk Cloud 10.5+ on US Commercial AWS | [1][3][4][28] |
| Collaboration Control Hub | GA (August 25, 2026) | Inventory appears without additional setup (August 4, 2026) | [1][3] |
| Cisco IQ | GA (August 25, 2026) | "fully integrated into Cisco Cloud Control"; on-prem deployment options announced | [1][2] |
| Cisco Spaces | GA (November 10, 2026) | Connector health in Inventory and Topology; requires Cisco Common Identity SSO | [3b][4] |

Constraint: a tenant group can include only one ThousandEyes tenant and one Security tenant [3].

---

## D) Third-party integrations

| Group | Integrations | Status | Source |
|---|---|---|---|
| Available at GA | ServiceNow, BlueCat, Infoblox, Atlassian | **GA** ("available today within a broader ecosystem backed by more than 60 integration commitments") | [1] |
| Named ecosystem at the June 2 launch | AWS, Linear, Microsoft, PagerDuty, ServiceNow, Slack, Google Cloud (which now includes Wiz) | Announced; individual GA status not confirmed except ServiceNow | [2] |
| Marketplace launch list (reported by Network World) | ITSM: ServiceNow, Atlassian, BMC. Identity: Okta, Ping Identity, Microsoft Entra ID, Jamf. Network monitoring: LiveAction, Panduit. Infrastructure knowledge: NetBox Labs, Device42, Vertiv. AI-native: Anthropic, OpenAI, NVIDIA, Collibra | Reported by press; not confirmed by Cisco as GA | [11] |
| Identity data sources via Cisco Identity | Okta, Cisco ISE, Microsoft Active Directory | GA; non-Cisco sources require Duo Advantage+ or ISE Advantage+ | [3] |
| Agent Builder connectivity | "more than 50 ecosystem integrations planned" plus Model Context Protocol | Roadmap | [5] |
| Model providers | OpenAI Codex built into App Builder | Roadmap (with App Builder) | [2] |

---

## E) Claims that must NOT be made (overclaim guardrails)

1. Do not say Cloud Control is "globally available." It is GA in the United States only [4].
2. Do not say Cloud Control replaces Meraki, Catalyst Center, SD-WAN Manager, Nexus Dashboard, Intersight, or other controllers. "Domain controllers remain responsible for their specialized management and execution" [1].
3. Do not say "no Splunk license needed" without a qualifier. Say that some Splunk-powered insights (Agent Observability, Network Intelligence app) surface in Cloud Control without a Splunk license, and that using Splunk data in AI Canvas requires Splunk Cloud 10.5+ on US Commercial AWS [4][19][20].
4. Do not say Cloud Control is "free forever." Cisco "reserve[s] the right to change this in the future," and eligibility varies by product [8].
5. Do not call Agent Builder, App Builder, Marketplace, Digital Twin, Expanded Experience Metrics, or autonomous agents GA. Describe Digital Twin as alpha, Experience Metrics as beta, and Studio and Marketplace as announced.
6. Do not claim fully autonomous remediation in clinical networks. The supported framing is human-approved, supervised autonomy (L3: "Execute after I click approve") [10].
7. Do not say network changes are "reversible." The cited rollback applies to agent versions only [5].
8. Do not call Data Fabric a clinical data repository, an EHR data store, or HIPAA-certified. Lantern puts HIPAA alignment on the customer [29].
9. Do not list Iceberg or Delta Lake as GA Federated Search targets [23].
10. Do not claim Federated Search for Splunk Enterprise on-prem against S3, Azure, or Snowflake. These options are Splunk Cloud Platform only, in AWS regions [22].
11. Do not claim a healthcare-specific Cloud Control or Data Fabric SKU. None was found.
12. Do not use "object storage cost" as an exact claim. Use "low-cost tier."
13. Do not say Cisco Spaces in Cloud Control provides patient, staff, or asset location. It currently provides Spaces Connector health, inventory, topology, and cross-launch [3b].
14. Do not cite customer metrics (300+ customers onboarded, 5,000+ waitlist, "more than 10 hours to under 10 minutes") as healthcare results. They come from non-healthcare customers [1].
15. Do not imply FedRAMP, Gov Cloud, GCP, or Azure support for the Splunk integration. These are listed as future support [4].
16. Do not say Machine Data Lake is available in every Splunk Cloud region. GA regions are US-East, Frankfurt, Tokyo, and Sydney [18].
17. Do not claim Agent Launchpad is available on-prem today. On-prem is "coming later this year" [27].
18. Do not claim Activity-Based Pricing is available. It is "Set to release this Fall" [20].
19. Do not say Cloud Control "includes Splunk Enterprise Security" or a SIEM. Splunk ES is a separate Splunk product.
20. Do not claim native Citrix, EHR vendor, nurse call, or RTLS vendor connectors in Cloud Control. None was found.

---

## F) Mapping to healthcare use cases and pillars (positioning, not a Cisco healthcare SKU)

The storyboard's actual list of 10 use cases was not found in the workspace. Use cases 1 to 5 come from the research brief; 6 to 10 are inferred placeholders. Replace with the storyboard's real list.

Pillars: **Security**, **Facilities**, **AI**.

| # | Use case | Cloud Control components | Data Fabric / Splunk components | Primary pillar | Status caveat |
|---|---|---|---|---|---|
| 1 | EHR is slow: is it the WAN, Wi-Fi, Citrix, the data center, or the app? | AI Canvas (Default and Deep Reasoning modes), Topology, ThousandEyes, Catalyst SD-WAN, Meraki and Catalyst Center, Intersight, Nexus Dashboard | Federated Search; Splunk Observability for app and Citrix telemetry; Machine Data Lake promotion of the incident window | AI | Citrix and EHR application telemetry arrive only through Splunk or ThousandEyes; no native Citrix or EHR connector. Deep Reasoning was beta in June and "AVAILABLE" in October |
| 2 | Containment of a medical-device VLAN event with human approval | Actions, Agentic Workflows, Security Cloud Control, Cisco Identity (ISE), AI Canvas | Splunk Enterprise Security detection; Agent Launchpad (Splunk Cloud) | Security | Human-approved (L3) is the supported framing. Autonomous loop is roadmap. Workflows inside AI Canvas is beta |
| 3 | One topology across hospital campus and clinics | Topology (including Layer 3), Inventory, Meraki plus Catalyst Center through Meraki Global Overview, Catalyst SD-WAN, AI Insights in Topology | Not required | Facilities | GA (US) |
| 4 | Telehealth and SaaS EHR digital experience | ThousandEyes in AI Canvas; Expanded Experience Metrics | ThousandEyes data in Splunk | AI | Expanded Experience Metrics is beta |
| 5 | Splunk as SIEM and observability for MTTD, MTTI, MTTR | Splunk integration, AI Canvas, AI Assistant with Splunk skills | Splunk Enterprise Security, Machine Data Lake, Catalog, Federated Search, 50% weighted ingest, Agent Launchpad | Security | Splunk data in AI Canvas requires Splunk Cloud 10.5+ on US AWS. Splunk ES is a separate license |
| 6 | Nurse call and RTLS infrastructure health (inferred) | Cisco Spaces connector health, Meraki, Topology | Nurse call and RTLS system events landed in Machine Data Lake | Facilities | Infrastructure and connector health only; not clinical events or location data |
| 7 | IoMT telemetry retention for investigations (inferred) | Identity (ISE) context | Machine Data Lake, Catalog, promotion, Self-Healing Pipelines | Security | GA in US-East, Frankfurt, Tokyo, Sydney |
| 8 | Identity risk for clinicians, contractors, and vendors (inferred) | Cisco Identity (Okta, ISE, AD) | Splunk Enterprise Security | Security | Duo Advantage+ or ISE Advantage+ required for non-Cisco sources |
| 9 | Lifecycle and vulnerability risk: end of support, quantum readiness (inferred) | Cisco IQ | Not required | Security | Quantum Ready Assessments were "planned for July 2026" [2]; confirm current status |
| 10 | Governed AI agents and AI token cost (inferred) | AI Defense policy, Cloud Control Studio (roadmap) | Splunk Agent Observability with Tokenomics; Cisco AI POD for Splunk for on-prem | AI | Studio is roadmap; Agent Observability is GA |

### Pillar summary

- **Security:** Security Cloud Control, Cisco Identity, Actions, Agentic Workflows with human approval, Splunk Enterprise Security, Machine Data Lake, Cisco IQ.
- **Facilities:** Topology and Inventory across campus and clinics, Meraki and Catalyst Center, Cisco Spaces connector health, building and nurse call system telemetry as machine data.
- **AI:** AI Assistant, AI Canvas, Deep Reasoning, Deep Network Model, Agent Launchpad, Agent Observability with Tokenomics, Cisco AI POD for Splunk. Roadmap: Studio, Digital Twin, autonomous loop.

---

## G) Sources

1. Cisco Blogs, "A new chapter for IT operations: Cisco Cloud Control is now generally available for U.S. customers," Balaji Venkatraman, August 25, 2026. https://blogs.cisco.com/ai/cisco-cloud-control-us-general-availability
2. Cisco Newsroom, "Cisco Unveils Agentic Platform for Operating and Defending Critical IT Infrastructure," June 2, 2026. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m06/cisco-unveils-agentic-platform-for-operating-and-defending-critical-it-infrastructure.html
3. Cisco Cloud Control Release Notes (PDF, entries June through September 9, 2026). https://www.cisco.com/c/en/us/td/docs/ai/cisco-cloud-control/release-notes/cisco-cloud-control-release-notes.pdf
   - 3b. Cisco Cloud Control Release Notes (HTML, updated October 30, 2026, with entries for October 27, November 3, and November 10, 2026). https://www.cisco.com/c/en/us/td/docs/ai/cisco-cloud-control/release-notes/cisco-cloud-control-release-notes.html
4. Cisco Cloud Control Getting Started (updated October 27, 2026). https://www.cisco.com/c/en/us/td/docs/ai/cisco-cloud-control/articles/cisco-cloud-control-getting-started.html (also at https://cloud.cisco.com/docs/en/cisco-cloud-control-getting-started/cisco-cloud-control-getting-started.html)
5. Cisco Blogs, "Agent Builder in Cloud Control Studio: A new way to extend and customize Cisco Cloud Control," Vimarsh Puneet and Naveen Elango, June 2, 2026. https://blogs.cisco.com/ai/announcing-cisco-cloud-control-agent-builder
6. Cisco Blogs, "Cisco AI Canvas is here: the workspace for agentic operations," Rohit Bakshi and Colby Philbin, June 2, 2026. https://blogs.cisco.com/ai/ai-canvas-controlled-availability
7. Cisco Blogs, "The Agentic Workplace Runs on Cisco," June 2026. https://blogs.cisco.com/news/the-agentic-workplace-runs-on-cisco
8. Cisco, "Cisco Cloud Control: Unified Operations for Agentic IT" product page (licensing FAQ), accessed November 12, 2026. https://www.cisco.com/site/us/en/solutions/artificial-intelligence/agentic-ops/cisco-cloud-control/index.html
9. Cisco AI Canvas and AI Assistant documentation, accessed November 12, 2026. https://cloud.cisco.com/docs/en/cisco-cloud-control-canvas/cisco-cloud-control-canvas.html
10. Cisco Connect St. Louis, "Networking for the Agentic Era" (David Friday, Brandon Dodd), October 13, 2026. https://www.cisco.com/c/dam/en_us/training-events/events/cisco-connect/stl-fpw-networking-for-the-agentic-era.pdf
11. Network World, "Cisco brings agentic ops platform and security overhaul to Cisco Live," June 2026. https://www.networkworld.com/article/4179673/cisco-brings-agentic-ops-platform-and-security-overhaul-to-cisco-live.html
12. Cisco, "Cloud Control Studio" product page, accessed November 12, 2026. https://www.cisco.com/site/us/en/solutions/artificial-intelligence/agentic-ops/cloud-control-studio/index.html
13. Cisco Blogs, "Networking for the Agentic Era: Cisco Unveils New Innovations in Scale and Simplicity" (Nexus One, Deep Network Model). https://blogs.cisco.com/datacenter/networking-for-the-agentic-era-cisco-unveils-new-innovations-in-scale-and-simplicity
14. Cisco, "Cisco Intersight Integration with Cisco Cloud Control (AI Canvas/AI Assistant) FAQ," updated September 1, 2026. https://www.cisco.com/c/en/us/products/collateral/computing/hybrid-cloud-operations/ii-cc-ai-canvas-asst-faq.html
15. Cisco Partner Blog, "Cisco Cloud Control: A New AI-Native Operating Layer for Partners," June 2, 2026. https://blogs.cisco.com/partner/cisco-cloud-control-a-new-operating-layer-for-cisco-partners
16. Cisco Newsroom, "Cisco Live 2026 keynotes: TL;DR edition," June 2026. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m06/cisco-live-2026-keynotes-tldr-edition.html
17. Splunk Blog, "From Vision to Value: New Splunk Platform Innovations Supporting Cisco Data Fabric Are Generally Available," Mangesh Pimpalkhare, August 4, 2026. https://www.splunk.com/en_us/blog/platform/splunk-platform-innovations-cisco-data-fabric-generally-available.html
18. Splunk Blog, "From Data at Rest to Data in Action: Machine Data Lake and Catalog" (availability note dated August 4, 2026). https://www.splunk.com/en_us/blog/platform/machine-data-lake-and-catalog.html
19. TechTarget, "Splunk .conf26: Context, control for Cisco's AI agents at scale," Torsten Volk (Omdia), September 17, 2026. https://www.techtarget.com/news/Splunk-conf26-Context-control-for-Ciscos-AI-agents-at-scale/856956/
20. Splunk Blog, "The Agentic Era Demands a New Data Foundation: How Cisco is Delivering It with Splunk," Mangesh Pimpalkhare, September 15, 2026. https://www.splunk.com/en_us/blog/platform/the-agentic-era-demands-a-new-data-foundation-how-cisco-is-delivering-it-with-splunk.html
21. Splunk Blog, "Unifying Your Data with Federated Search," Kiana Wheeler, May 18, 2026. https://www.splunk.com/en_us/blog/platform/unifying-your-data-with-federated-search.html
22. Splunk Community, "New Release of Federated Search: Bringing Splunk Analytics to...," July 6, 2026. https://community.splunk.com/t5/Product-News-Announcements/New-Release-of-Federated-Search-Bringing-Splunk-Analytics-to/ba-p/762014 ; and Splunk Docs, "Overview of the federated search options for the Splunk platform" (Splunk Cloud Platform 10.5.2605, last updated July 7, 2026). https://help.splunk.com/ja-jp/splunk-cloud-platform/search/federated-search/10.5.2605/welcome-to-splunk-federated-search/overview-of-the-federated-search-options-for-the-splunk-platform
23. Splunk, "Federated Search" product page, accessed November 12, 2026. https://www.splunk.com/en_us/products/federated-search.html
24. Splunk Blog, "Cisco Data Fabric: Solving for Visibility, Economics, and AI Readiness" (publication date not confirmed). https://www.splunk.com/en_us/blog/platform/cisco-data-fabric-solving-for-visibility-economics-and-ai-readiness.html
25. Splunk Blog, "From Alert Fatigue to Operational Clarity: Turning Cisco Data Fabric Vision, powered by Splunk, into Agentic Operations Reality" (publication date not confirmed). https://www.splunk.com/en_us/blog/leadership/turning-cisco-data-fabric-vision-into-agentic-operations-reality.html
26. Cisco Connect (Hong Kong), "Redefine Digital Resiliency with Cisco Data Fabric & Splunk" (BRKOBS-1004), date not confirmed. https://www.cisco.com/c/dam/global/en_hk/learn/events/cisco-connect/redefine-digital-resiliency-with-cisco-data-fabric-and-splunk-agentic-soc.pdf
27. Cisco Newsroom, "Cisco Delivers Trusted AI at Scale Through New Splunk Advancements," September 15, 2026. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m09/cisco-delivers-trusted-ai-at-scale-through-new-splunk-advancements.html
28. Splunk Blog, "Turning Machine Data into Agentic Action: Splunk Now Available in Cisco Cloud Control," Coty Sugg, August 27, 2026. https://www.splunk.com/en_us/blog/platform/splunk-now-available-in-cisco-cloud-control.html
29. Splunk Lantern, "Integrating Splunk Cloud Platform with Cisco Cloud Control and AI Canvas," accessed November 12, 2026. https://lantern.splunk.com/Splunk_and_Cisco_Use_Cases/Integrating_Splunk_Cloud_Platform_with_Cisco_Cloud_Control_and_AI_Canvas
30. Cisco, "Modernizing Cybersecurity in Healthcare" solution brief, updated October 16, 2026 (contains no Cloud Control healthcare SKU). https://www.cisco.com/c/en/us/products/collateral/security/modernizing-cybersecurity-healthcare-sb.html
31. Channel Dive, "Cisco bundles agentic management platform into existing partner tiers," June 3, 2026. https://www.channeldive.com/news/cisco-bundles-agentic-management-platform-into-existing-partner-tiers/821926/
32. Cisco Intersight Licensing page, accessed November 12, 2026. https://www.cisco.com/site/us/en/products/computing/hybrid-cloud-operations/intersight-platform/licensing.html

---

## H) Gaps

1. **Non-US availability:** no date for EU or other regions. Cisco says additional regions follow "as data sovereignty requirements are completed" [15].
2. **Cloud Control Studio:** no confirmed GA for Agent Builder, App Builder, or Marketplace.
3. **Digital Twin:** no status found after "alpha in July 2026."
4. **Deep Network Model:** no explicit GA statement as a named, standalone capability.
5. **Agentic Actions:** Cloud Control release notes describe Actions as a shipped feature, while the October 13 deck labels "Actions" as Controlled Availability. These may be two different things (correlated alert Actions vs agentic remediation Actions). Confirm with Cisco.
6. **"No separate Splunk license":** exact scope is unresolved between the Splunk blog [20], TechTarget [19], and Cisco documentation [4]. Confirm with the account team before the storyboard states it.
7. **Iceberg and Delta Lake:** no GA date or connector documentation as Federated Search targets.
8. **Machine Data Lake region list** excludes US-West, while Cloud Control's Splunk connection runs in the US West region [4][18]. Implications for data residency not documented.
9. **No Cisco BAA or HIPAA statement** specific to Cloud Control or AI Canvas was found. Lantern defers to Cisco terms [29].
10. **No native Citrix, EHR vendor, nurse call, or RTLS-vendor connectors** were found in Cloud Control.
11. **The storyboard's actual 10 use cases** were not in the workspace, so section F is provisional.
12. **The 60+ integration commitments:** no public full list with per-item status.
13. **MCP-enabled Catalog Discovery, knowledge graph, and lineage:** no GA dates found.
14. **Quantum Ready Assessments in Cisco IQ:** "Global availability planned for July 2026" [2]; current status not confirmed.
15. **Publication dates** for sources [24], [25], and [26] could not be confirmed.
