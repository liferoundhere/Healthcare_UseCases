# AI in Healthcare Pillar: Research Brief

Compiled: Thursday, Nov 12, 2026. Sources are mostly 2023 to 2026; older canonical studies are flagged. Sections A through E are vendor-neutral (vendor and product names appear only to identify what a study evaluated). Cisco material is confined to Section F. Bracketed numbers refer to Section H.

## Headline changes that affect the pillar copy

- **Federal terminology.** Executive Order 14434 (signed September 29, 2026) directs federal agencies to use "Super Intelligence (SI)" instead of "AI" in new documents. Newer HHS, ONC and FDA pages may say "SI". Statutory wording, prior regulations and direct quotations are unaffected [78].
- **ONC transparency rollback.** ONC's HTI-5 final rule (published October 28, 2026) removes the HTI-1 model-card (source attribute) and risk-management requirements for predictive decision support tools, effective December 28, 2026 [68][69].
- **HIPAA Security Rule still proposed.** The update that would require a technology asset inventory, a network map and network segmentation is not final. The regulatory agenda has moved final action to July 2027 [62][63][64].

---

## A) Clinical and operational AI landscape

**Overall adoption**
- **Physicians, 2026:** 81% of physicians use AI professionally, up from 38% in 2023 (AMA, n=1,692, fielded Jan 15 to Feb 2, 2026) [1][2]. They use 2.3 use cases on average, up from 1.1 in 2023 [2].
- **Physician use cases, 2026** (AMA) [3]:
  - summaries of medical research and standards of care: 39%
  - discharge instructions, care plans or progress notes: 30%
  - documentation of billing codes, charts or visit notes: 28%
  - chart summaries: 28%
  - draft patient portal replies: 19%
  - translation services: 18%
  - assistive diagnosis: 17%
- **Physicians, 2024 baseline:** 66% used at least one AI use case (AMA, 2024 survey) [4].
- **Adoption conditions:** 86% of physicians say data privacy assurances are important and 88% say validation of safety and efficacy is important before adopting AI (AMA, 2026) [2].
- **Hospitals, predictive AI:** 71% of US non-federal acute care hospitals used predictive AI integrated with the EHR in 2024, up from 66% in 2023 (ASTP/ONC data brief using AHA IT Supplement data) [9].
  - Small, rural, independent, government-owned and critical access hospitals lagged [9].
  - Among users, the fastest-growing uses were billing (36% to 61%) and scheduling (51% to 67%), 2023 to 2024 [9].
- **Generative AI in security programs:** about 50% of organizations permitted generative AI in a 2023 HIMSS survey of healthcare cybersecurity professionals, as cited in the HIPAA Security Rule proposed rule [62].

**Ambient clinical documentation**
- Ambient speech is the top clinical AI use case: 79% of organizations use it and report positive ROI. Source: KLAS Healthcare AI Update 2025 (published Dec 29, 2025; 3,370 respondents at 1,742 organizations), as reported by TechTarget [5][6].
- KLAS finds organizations focus on lower-risk, well-defined workflows (ambient speech, coding support, administrative tasks) and are cautious about higher-stakes clinical applications [5].
- Early adopters are ambulatory generalists (family and internal medicine). Specialty and inpatient adoption is "limited but growing" (KLAS Arch Collaborative, more than 900 providers at 24 organizations, data Nov 2023 to Mar 2025) [7].
- At least 75% of organizations that surveyed providers before and after adoption saw improved EHR experience scores, higher perceived efficiency and decreased burnout (KLAS Arch Collaborative) [7].
- EHR vendors entering ambient documentation (announced August 2025) is reshaping vendor strategy (KLAS, 2025) [8].

**Imaging and radiology AI**
- About three in four devices on FDA's AI-enabled device list are radiology [11][12].
  - The September 4, 2026 version of the list holds 1,614 devices; 335 devices had 2025 decisions, up from 18 in 2016 (Kent Applied analysis of the FDA list) [11].
  - A 2025 peer-reviewed paper counts 1,357 FDA-cleared AI/ML devices as of December 2025, with over 75% in radiology [13]. Counts differ by source and date.
- FDA states its list "is not a comprehensive resource of AI-enabled medical devices" [12].
- Imaging is one of few clinical areas with established AI use (stroke triage, mammography, cardiology), mainly to flag urgent findings and prioritize worklists rather than replace clinical judgment (KLAS) [6].

**Clinical decision support and early warning**
- The most common hospital predictive-AI use is predicting health trajectories or risks for inpatients (ASTP/ONC, 2024) [9].

**Capacity, scheduling and staffing**
- Predictive AI for scheduling rose from 51% to 67% of hospitals using predictive AI, 2023 to 2024 (ASTP/ONC) [9].
- KLAS reports organizations invest in AI to improve operational efficiency and alleviate staffing challenges [5].

**Revenue cycle automation**
- 80% of health systems were exploring, piloting or implementing generative AI for revenue cycle management in 2025, a 38% increase in less than two years (HFMA Pulse Survey commissioned by a vendor, AKASA; n=519 CFOs and revenue cycle leaders, April 2025) [10].
  - About 40% were piloting or implementing; 39% were exploring; 20% had not started [10].
  - 64% of larger systems were piloting or implementing versus about 20% of systems with $500 million to $1 billion in revenue [10].
  - Respondents estimate 8.49% of revenue is at risk from incomplete or inaccurate documentation; 89% say missed or inaccurate codes significantly affect revenue [10].
- Predictive AI for billing rose from 36% to 61% of hospitals using predictive AI, 2023 to 2024 (ASTP/ONC) [9].

**Contact center and patient access**
- 10% of physicians used patient-facing chatbots for customer service functions in 2024, up from 8% in 2023 (AMA) [4].
- KLAS says organizations' forward AI plans focus on revenue cycle and patient engagement use cases [5].

**Agentic AI**
- Of more than 3,000 KLAS respondents, 17 specifically mentioned agentic AI and one organization reported active use (KLAS 2025) [6].

---

## B) Failure modes and outcome impact

**Hallucinated or incomplete AI scribe notes**
- **Simulated encounters, two products:** 127 errors across 44 draft notes; 70% of notes (31 of 44) contained errors, averaging 2.9 per note. Omissions were 83% and 54% of errors by product (JMIR instrument validation study, 2025) [30].
- **Five platforms, simulated ambulatory encounters:** 26.3% of key clinical elements were omitted or captured wrongly. There were on average 3.0 errors per case with potential for moderate-to-severe harm. Hallucinations included fabricated test results; medication errors were the most common error theme (Mayo Clinic Proceedings: Digital Health, 2025) [31].
- **Seven primary-care products:** omissions were 83.8% of errors and hallucinations 7.8%. Hallucinations were less frequent but more often clinically serious, and no product produced error-free summaries [32]. (Publication year not confirmed in retrieval.)
- **Randomized trial (NEJM AI, published Nov 26, 2025):** one scribe cut time-in-note by 9.5% versus control; the other showed no significant change (-1.7%). One grade 1 (mild) adverse event was reported, and clinicians said clinically significant inaccuracies occurred "occasionally" [17].
- **Physician feedback:** 85% of physician comments on accuracy (28 of 33) were negative, and 76% of comments on completeness were negative (JAMA Network Open, 2025) [33].

**Model drift and dataset shift**
- Across 24 US hospitals, daily sepsis alerts rose 43% (953 to 1,363) in the three weeks after the first COVID-19 case while hospital census fell 35%. The share of patients generating alerts went from 9% to 21% (JAMA Network Open, 2021) [35].
- One academic health system's clinical AI governance committee deactivated a widely used sepsis model in April 2020 after spurious alerting caused by dataset shift (NEJM, 2021) [36].
- Across 9 networked hospitals, sepsis model performance was negatively correlated with sepsis incidence (r = -0.80), comorbidity burden (r = -0.78) and cancer prevalence (r = -0.86) (JAMA Internal Medicine, 2023) [37].

**Alert fatigue**
- One external validation of a widely deployed proprietary sepsis model (38,455 hospitalizations) found [34]:
  - hospitalization-level AUC of 0.63
  - alerts on 18% of all hospitalizations
  - 67% of sepsis cases missed
  - sensitivity 33%, specificity 83%, positive predictive value 12%
- This is older (JAMA Internal Medicine, 2021) but remains the canonical citation.

**Bias**
- A widely used cost-proxy population health algorithm under-identified Black patients. Fixing the label would raise the share of Black patients automatically flagged for extra care from 17.7% to 46.5% (Science, 2019; older but canonical) [38].
- Since May 1, 2025, Section 1557 requires covered entities to identify and mitigate discrimination risk in patient care decision support tools (see Section E) [65][66].

**AI scribe downtime during clinic (2026 vendor status pages)**
- One US ambient vendor reported a third-party provider outage on June 25, 2026, from 11:55 AM to 1:38 PM, causing transcription and note-generation delays. Audio was rerouted to other models and backfilled [39].
- The same vendor reported a cloud-hosted ambient scribe outage on July 21, 2026, affecting functionality from 6:27 AM to 8:32 AM [40].
- A Canadian scribe vendor lost note generation from 8:50 to 11:00 AM MST on May 29, 2026, during a cloud provider outage. Recording continued and notes were regenerated afterward [41].
- A UK scribe was unavailable for 1 hour 35 minutes on April 27, 2026, after an upstream sub-processor's database ran out of memory during Monday morning demand. The vendor rated the clinical risk as moderate (rating 2), and April uptime was 99.78% [42].
- Common pattern: dependence on third-party model, speech and cloud providers. Vendor names are in the source list.

**Delayed reads and queueing**
- In AI pulmonary embolism (PE) triage at one academic center, work-hours report turnaround fell from 68.9 to 46.7 minutes (22.2 minutes saved, significant), but the off-hours change (44.8 to 42.0 minutes) was not significant [26].
- A queueing model in the same study showed time savings depend on exam inter-arrival time, number of radiologists, read time, disease prevalence and AI diagnostic performance [26].
- I found **no peer-reviewed study** tying GPU or network congestion to delayed reads (see Section G).

---

## C) Infrastructure requirements

**Training versus inference fabric**
- Training is dominated by synchronous collective operations across GPUs. With 800 Gbps or more of per-GPU network bandwidth, tail latency and worst-case flow completion matter more than averages (NVIDIA, 2026 arXiv paper) [43].
- RDMA over Converged Ethernet (RoCE) has become the dominant transport in Ethernet AI clusters [43]. Its known limits [43][44]:
  - head-of-line blocking and congestion propagation from PFC pause frames on lossless Ethernet
  - ECMP hash collisions that leave links unevenly loaded
  - DCQCN congestion control that is hard to tune for bursty collectives
- In an NVIDIA simulation of LLM training, "noisy neighbor" traffic slowed standard Ethernet training steps 1.6x (735 ms to 1.18 s) [44]. This is a vendor benchmark.
- NVIDIA's reference design combines lossless PFC with sender-based congestion control and per-packet adaptive routing; it reports 98% of theoretical line rate in its evaluation [43][45].
- Multiplane designs split one 800 Gbps NIC into multiple lower-speed interfaces (for example, 4 x 200 Gbps), each into an independent network plane [43].
- Ultra Ethernet Consortium Specification 1.0 was published June 11, 2025 [46][47][48]:
  - defines a new transport (Ultra Ethernet Transport, UET) with AI Base, AI Full and HPC profiles
  - its congestion control approach "does not rely on a lossless network" and lets receivers limit sender transmissions
  - founding members were AMD, Arista, Broadcom, Cisco, Eviden, HPE, Intel, Meta and Microsoft
- InfiniBand versus Ethernet: I found no neutral, current source on market share. The NVIDIA paper above describes RoCE as dominant within Ethernet-based AI clusters [43].

**GPU cluster power and cooling**
- One GB200 NVL72 rack (72 GPUs, 36 CPUs) needs 120 kW of cooling capacity using direct liquid cooling (NVIDIA) [49]. One OEM version is rated at 132 kW (115 kW liquid-cooled, 17 kW air-cooled) [50].
- For contrast, the average typical (modal) rack density across surveyed facilities is almost 9 kW, or 7.5 kW excluding high-density sites. Most growth is in the 10 to 30 kW range, and few facilities exceed 30 kW (Uptime Institute 2025 survey, more than 800 owners and operators) [51].
- Vendor roadmaps point to 200 kW per rack and above within a few years (Uptime Institute) [52].
- Most data center operators would allow AI for sensor-data analysis and predictive maintenance but not configuration changes or equipment control (Uptime 2025) [51].
- 45% of enterprise IT workloads still reside in corporate (on-premises) facilities (Uptime 2025) [51].

**Inference at the edge (modality, OR, clinic)**
- Endoscopy pipeline benchmarks: 10 ms end-to-end latency at 4K 240 Hz, versus 220 ms for a traditional 1080p 60 Hz pipeline; under 50 ms at 4K 60 Hz on an edge developer kit (NVIDIA) [53].
- A multimodal surgical guidance demo fusing preoperative CT with live video ran under 75 ms end-to-end (NVIDIA) [54]. Both are vendor benchmarks.

**Storage and data path from PACS and EHR into the model**
- In one PE triage deployment, images went from the CT scanner to PACS and to an on-prem AI orchestrator. The orchestrator sent de-identified DICOM images to a cloud AI tool, which moved positive studies to the top of the radiologist worklist (AJR, 2023) [25].
- In a stroke trial, all stroke CT angiography was automatically sent to a cloud AI algorithm. Transmission plus analysis averaged under 5 minutes, and alerts went to clinicians' phones with a mobile PACS viewer [23].
- HTI-5 resets the ONC certification program toward FHIR-based API requirements, which ONC says will "support creative AI-enabled interoperability solutions" [68].

---

## D) Data, governance and PHI

**PHI in prompts to public LLMs**
- An AI or cloud vendor that creates, receives, maintains or transmits PHI on behalf of a covered entity is a business associate and requires a business associate agreement (BAA) [57][58].
- That holds even when the vendor stores only encrypted ePHI and lacks the key [57].
- HHS's business associate FAQ, as retrieved on Nov 12, 2026, lists a third-party "SI chatbot" on a provider's patient portal (symptom assessment, reminders, scheduling) as a business associate example [58]. Verify the wording on the live page.
- Implication (inference, not OCR guidance): PHI pasted into a consumer LLM account with no BAA is a disclosure outside HIPAA safeguards.

**Shadow AI**
- Wolters Kluwer Health survey, December 2025 (n=518; 256 providers, 262 administrators) [55][56]:
  - 40% had encountered unauthorized AI tools at work
  - 17% admitted using one
  - 1 in 10 had used an unauthorized AI tool for a direct patient care use case
- Among those who used unapproved tools, 45% cited a faster workflow as the primary reason and 24% cited better functionality than approved tools [56].
- Administrators were three times more likely than providers to be involved in AI policy development (30% vs 9%) [55].

**De-identification**
- HIPAA allows two de-identification methods: Safe Harbor (remove 18 identifier types, including names, dates, medical record numbers, device identifiers and serial numbers, URLs and IP addresses, with no actual knowledge of re-identification) or Expert Determination (a qualified expert finds re-identification risk is very small and documents the method) [59][60].

**FHIR and DICOM access**
- The PE triage example above shows de-identified DICOM leaving the hospital for cloud inference via an orchestrator [25].
- ONC's HTI-5 positions FHIR-based APIs as the foundation for future certification requirements [68].

**Machine/operational data versus designated-record-set PHI**
- The designated record set (medical and billing records and other records used to make decisions about individuals) is defined at 45 CFR 164.501 [61]. Telemetry, logs and agent traces are operational or machine data and are not part of the designated record set by default.
- Operational data can still become PHI if it carries identifiers listed under Safe Harbor (for example, medical record numbers, IP addresses tied to a patient, device serial numbers) or captures prompt contents with patient details [60]. This is my inference from the regulation, not OCR guidance.
- The proposed Security Rule would require listing AI software that creates, receives, maintains, transmits or interacts with ePHI, including where ePHI is used to train the AI, in the technology asset inventory [62].

**Lineage and governance practice**
- Among hospitals using predictive AI in 2024, 82% evaluated models for accuracy, 74% for bias and 79% monitored after go-live. Only 71% (accuracy) and 57% (bias) evaluated all or most of their models, and 15% to 21% answered "don't know" [9].
- 74% to 75% of hospitals name more than one entity accountable for evaluating predictive AI [9].

**HHS OCR guidance on HIPAA and generative AI**
- I found no OCR guidance specific to HIPAA and generative AI. The closest sources are the Security Rule proposed rule's AI discussion [62], the January 10, 2025 Section 1557 Dear Colleague letter on AI [65], and the business associate and cloud computing guidance [57][58].

**ONC HTI-1 / HTI-5 AI transparency**
- HTI-1 required certified health IT to support 31 source attributes for predictive decision support interventions and 13 for evidence-based ones [67].
- HTI-5 removes the source attribute and risk management requirements effective December 28, 2026. ONC said it "identified no evidence" that users relied on these requirements [68][69].

**Agentic risk in healthcare IT operations**
- OWASP calls the core risk "Excessive Agency": too much functionality, permission or autonomy, triggered by hallucination, prompt injection or a compromised tool. Mitigations include minimizing tools and permissions, executing in the user's security context, and requiring human approval for high-impact actions [79].
- OWASP's agentic threat list adds untraceable agent actions (mitigation: signed, immutable logs) and attacks that overwhelm human reviewers (mitigation: risk-tiered review where low-risk actions are automated and high-risk ones get human attention) [80].
- HHS's 405(d) HICP guidance says to restrict high-impact assets such as medical devices into more restricted network zones and limit third-party access; infusion pumps connect to servers for drug libraries and usage data; the 2023 edition added micro-segmentation [81][82].
- Most data center operators would not trust AI to make configuration changes (Uptime 2025) [51].
- **My synthesis, not a cited standard:**
  - An agent that opens or enriches a ticket is read-only and easy to reverse.
  - An agent that changes a firewall rule, a medical device (for example, infusion pump) VLAN or an identity policy can affect patient safety or ePHI exposure.
  - The second kind needs pre-approval by a named human, a change record (audit), a tested rollback (reversal), and ideally a pre-change validation in a test or twin environment.

---

## E) Regulatory

**FDA: SaMD and clinical decision support**
- Clinical Decision Support Software guidance was revised January 6, 2026 and reissued January 29, 2026, without public comment [70][74].
  - It takes a broader reading of the statutory non-device CDS exemption [74].
  - It applies enforcement discretion to software that provides a single clinically appropriate recommendation, if the other non-device criteria are met [70][74].
  - It clarifies that discrete, episodic point-in-time measurements (for example, routine vital signs) generally do not by themselves constitute a "pattern" [74].
- Final guidance on predetermined change control plans (PCCPs) for AI-enabled device software functions was issued December 4, 2024 and reissued August 18, 2025. A PCCP lets planned modifications proceed without a new marketing submission for each change [71][72].
- AI-Enabled Device Software Functions lifecycle guidance (January 7, 2025) is **still a draft** as of November 2026 [71][73].

**HIPAA when prompts contain PHI**
- See Section D: LLM vendors handling PHI are business associates and need a BAA [57][58].

**Proposed HIPAA Security Rule: asset inventory and segmentation applied to AI**
- The proposed rule (Federal Register, January 6, 2025) would add [62][63]:
  - a written technology asset inventory
  - a network map of ePHI movement, reviewed at least every 12 months and when the environment changes
  - required network segmentation
- AI software interacting with ePHI, including AI trained on ePHI, would be listed in the inventory and feed the risk analysis [62].
- **Not final as of November 2026.** The regulatory agenda moved final action to July 2027 and reclassified it as a long-term action (secondary source) [64]. The 2013 rule text still governs [64].

**Section 1557 (nondiscrimination in AI)**
- Since May 1, 2025, covered entities must make reasonable, ongoing efforts to identify patient care decision support tools that use race, color, national origin, sex, age or disability as inputs, and to mitigate discrimination risk for each [65][66].

**ONC**
- HTI-1 required 31 source attributes for predictive decision support tools [67].
- HTI-5 (published October 28, 2026) removes those source attribute and risk management requirements, effective December 28, 2026; it keeps the electronic feedback requirement for evidence-based tools [68][69].

**EU AI Act (for US health systems with EU exposure)**
- The Digital Omnibus on AI, Regulation (EU) 2026/1744, was published July 24, 2026 and entered into force July 27, 2026 [75][76][77]:
  - high-risk rules for AI in medical devices and IVDs (Annex I route) now apply from **August 2, 2028** (previously August 2, 2027)
  - stand-alone high-risk systems (Annex III) apply from December 2, 2027
  - Article 50 transparency duties (for example, informing people they are interacting with AI) have applied since August 2, 2026
  - MDR and IVDR notified bodies must apply for AI Act designation by January 28, 2028
- Medical devices remain in Annex I Section A, so they face parallel AI Act and MDR/IVDR requirements [76][77].

**Terminology**
- Executive Order 14434 (September 29, 2026) tells federal agencies to use "Super Intelligence/SI" in place of "Artificial Intelligence/AI" in new documents. "SI" temporarily means the technologies covered by the existing statutory AI definition at 15 U.S.C. 9401(3) [78].

---

## Quantified quick reference

- **Ambient scribes, time in notes per appointment:**
  - 10.3 to 8.2 minutes (-20.4%), with after-hours work down 30% (50.6 to 35.4 minutes per workday); n=46 (JAMA Network Open, Feb 2025) [14]
  - 6.2 to 5.3 minutes; n=100 (JAMA Network Open, May 2025) [15]
  - adjusted -1.8 minutes (-15.9%) and EHR time -2.4 minutes (-8.5%); 125 users vs 478 controls (JAMA Network Open, Oct 2025) [16]
- **Ambient scribes at scale:** 15,791 hours saved (1,794 eight-hour workdays) across 7,260 physicians and 2,576,627 encounters, October 2023 to December 2024, in one large medical group (NEJM Catalyst, 2025) [18][19].
- **Documentation burden:**
  - primary care EHR time rose 28.4 minutes per 8 scheduled clinic hours, 2019 to 2023 (Annals of Family Medicine, 2024) [20]
  - 5.9 hours of an 11.4-hour workday in the EHR (Annals of Family Medicine, 2017; older) [21]
  - EHR time of 5.3 (men) to 5.9 (women) hours per 8 scheduled hours (JAMA Network Open, 2022) [22]
- **Stroke AI triage:**
  - door-to-groin time cut by 11.2 minutes and CT-to-treatment by 9.8 minutes; no significant difference in functional independence (cluster randomized trial, JAMA Neurology, 2023) [23]
  - every 9 minutes of onset-to-reperfusion delay means 1 in 100 treated patients has worse disability; every 4 minutes for door-to-reperfusion (HERMES, JAMA, 2016; older) [27]
  - each minute saved gives on average 4.2 days of extra healthy life (Neurology, 2017; older) [28]
  - each minute faster endovascular treatment yields a median net monetary benefit of 309 euros (Netherlands model) [29]
- **PE AI triage:** report turnaround cut by 12.3 minutes (59.9 to 47.6) (AJR, 2023) [25]; by 22.2 minutes during work hours only [26].
- **GPU racks:** 120 to 132 kW per rack, versus an industry average of about 9 kW [49][50][51].

---

## F) Cisco AI-in-healthcare positioning (separate section)

Cisco positions itself around clinical AI as infrastructure, security, observability and IT operations. Nothing found implies Cisco stores or replaces the EHR. One caution: a Cisco CX blog uses the phrase "clinical data fabric" to mean the network [107]. Avoid that phrase in pillar copy so it does not suggest Cisco holds clinical records. Cisco Data Fabric (powered by Splunk) is about machine and operational data, not the designated record set [93][94].

### Status table

| Product | Status | Basis |
|---|---|---|
| AI Defense (AI discovery, model validation/algorithmic red teaming, runtime guardrails) | **GA** | Announced Jan 15, 2025; available March 2025 [83] |
| AI Defense: AI BOM | **GA** (plus open-source tool) | [85] |
| AI Defense: MCP Catalog, advanced red teaming, real-time agentic guardrails, NVIDIA NeMo Guardrails integration | Announced Feb 10, 2026 | Per-feature GA not confirmed [84] |
| Cloud Control | **CA** in US from Jun 2, 2026; **GA** for US customers Aug 25, 2026; global is **Roadmap** | More than 300 customers onboarded at US GA [86][89] |
| Cloud Control Studio / Agent Builder | Announced Jun 2, 2026 | GA not confirmed [87] |
| Agentic Actions, Deep Reasoning, Expanded Experience Metrics | Beta (pre-GA), Jun 2026 | [88] |
| Digital Twin | Alpha (pre-GA), Jul 2026 | [88] |
| Splunk AI Agent Monitoring | **GA** Q1 2026; now scheduled for deprecation | Replaced by Splunk Agent Observability (Galileo technology), available Sept 2026 on-premises, in Observability Cloud and in Cloud Control [90][91][92][110] |
| Cisco Data Fabric (Machine Data Lake, Catalog, Agent Launchpad, expanded Federated Search) | **GA** Aug 4, 2026 | [93][94] |
| AI POD for Splunk | Announced at .conf26 | Self-hosted NVIDIA Nemotron models "in the coming months" (**Roadmap**) [95] |
| UCS C885A M8 (8-GPU NVIDIA HGX server) | **GA** | Orderable Oct 2024 [98] |
| Nexus Hyperfabric AI | **GA** (secondary source) | Available May 2025; Hyperfabric now part of Nexus One [97][99] |
| Secure AI Factory with NVIDIA | Validated reference architecture | Expected purchasable by end of 2025; expanded Mar 16, 2026 [96][97] |
| N9100 800G (NVIDIA Spectrum-4 silicon) | **GA** | [97] |
| N9100 102.4T (NVIDIA Spectrum-6 silicon) | **Roadmap** | Announced Mar 2026 [97] |
| Silicon One G300 (102.4 Tbps) | Customer sampling; first systems shipping Oct 2026 | Cisco claims 28% better job completion time (vendor claim) [100][101] |
| Silicon One G302 (51.2 Tbps ToR) | **Roadmap** | Planned to ship before end of 2026 [101] |
| Silicon One P200 (scale-across, deep buffer) | In hyperscaler production | [101] |
| Unified Edge (UCS XE130c M8, XE9305 chassis) | **GA** | Orderable Nov 2025; series release Sept 30, 2025 [102][103] |
| Unified Edge UCS XE150c M8 (GPU-capable node) | Orderable Q3 CY2026 | [103] |
| Unified Edge 8255 Secure Router Node | Orderable Sept 2026 | [103] |

### Cisco AI Defense
- Launch capabilities: discovery of shadow and sanctioned AI applications, automated model validation (algorithmic red teaming), and runtime protection against prompt injection, denial of service and sensitive data leakage [83].
- February 2026 expansion: AI BOM for AI supply chain visibility (models, MCP servers, dependencies), MCP Catalog, multi-turn red teaming for models and agents, and real-time agentic guardrails that inspect agent-to-tool interactions for poisoned tools or prompts designed to trigger unauthorized tool use [84][85].
- AI Defense is a component of Cisco Secure AI Factory with NVIDIA [84].

### Cisco AI infrastructure and networking
- Secure AI Factory with NVIDIA: compute (UCS on NVIDIA HGX and MGX), networking (Nexus Hyperfabric AI and Nexus, Silicon One and NVIDIA Spectrum-X), partner storage (Pure Storage, Hitachi Vantara, NetApp, VAST Data), NVIDIA AI Enterprise software, with "ready-to-deploy" and "build-your-own" options [96].
- March 2026 expansion: edge support for NVIDIA RTX PRO 4500 Blackwell GPUs across UCS and Unified Edge; two validated paths for large AI factories (an NVIDIA Cloud Partner compliant reference architecture and a Cisco Cloud Reference Architecture on Silicon One) [97].
- Silicon One G300: 102.4 Tbps silicon for scale-out AI fabrics; 100% liquid-cooled systems that Cisco says improve energy efficiency by nearly 70%; 800G linear pluggable optics that Cisco says cut optic module power by 50% [100].
- Cisco presents "UEC-ready" AI networking with NVIDIA Spectrum-X integration [108]. Cisco is a founding member of the Ultra Ethernet Consortium [48].

### Agent observability and governed agents
- Cloud Control: a unified platform for humans and AI agents to manage, monitor and defend IT infrastructure, with one login, a shared data layer and integrations including AWS, Microsoft, PagerDuty, ServiceNow, Slack and Google Cloud [86].
- Governance model in Cloud Control Studio: "Every agent runs under policy enforcement through Cisco AI Defense... Agents propose. Humans approve before anything changes in production." Agents follow a draft, sandbox and publish lifecycle with version control and full rollback [87].
- Observability: Splunk AI Agent Monitoring and its successor, Splunk Agent Observability, trace every LLM call, tool invocation and skill execution, and score outputs for accuracy, hallucinations and drift [87][90][110].
- Galileo guardrails intercept prompts and harmful outputs in under 200 ms (Splunk claim) [91].

### Splunk / Cisco Data Fabric as the context layer
- Machine Data Lake retains full-fidelity machine data in open formats; Catalog helps people and agents find datasets (MCP-enabled discovery); Federated Search reaches external stores such as S3, Snowflake, Databricks and AWS CloudWatch Lake without moving data [93][94][95].
- Agent Launchpad lets analysts build agents with role-based access control; every agent run remains traceable [93].
- Lineage back to the immutable raw tier is positioned as the basis for trusted AI outputs [94].
- Scope: operational and machine data (security, IT, network telemetry). Not a clinical record system.

### How Cisco frames the healthcare story
- Run local inference at the hospital edge so sensitive patient data stays under institutional control and diagnostic latency drops [104][105].
- Unified Edge for healthcare: converged compute, networking, storage, security and observability in one chassis, with zero-trust controls, anti-tamper features, network segmentation and AI-model and container security [104].
- Validated partner applications on Cisco infrastructure through Cisco Compatible Solutions for AI, for example Sickbay high-frequency patient monitoring data running on Unified Edge [106].
- Confidential computing for AI workloads with Fortanix, so models and sensitive data stay protected during processing [106].
- Zero trust across workforce, workload and workplace, including monitoring AI model usage and medical device segmentation [109].
- End-to-end observability that correlates AI model health with network health, to tell whether a delay comes from the algorithm, a congested switch or a cloud API failure [107].

---

## G) Gaps and cautions

- **GPU or network congestion causing delayed reads:** no peer-reviewed study found. Present it as a plausible risk, not a measured outcome.
- **HHS OCR guidance specific to generative AI:** none found (see Section D).
- **MGMA:** no AI adoption figures retrieved.
- **Contact-center AI and capacity/staffing AI:** no dedicated health-system adoption statistic found beyond AMA chatbot use and ASTP/ONC scheduling use.
- **IEEE:** data center bridging standards (for example, priority flow control) were not retrieved, so none are cited.
- **Typical GPU networking requirements:** only NVIDIA's "800 Gbps and higher per-GPU" figure was found [43]; no neutral standards body figure.
- **InfiniBand versus Ethernet market share:** no neutral, current source found.
- **Stroke delay cost in dollars:** only non-US figures were found (309 euros per minute in a Netherlands model) [29].
- **Older canonical sources:** HERMES (2016), Meretoja (2017), the sepsis model validation (2021), the COVID sepsis alert study (2021) and Obermeyer (2019) predate 2023.
- **Vendor versus peer review:** a vendor page claims a 58% mortality reduction [24]. The peer-reviewed cluster randomized trial found no significant difference in functional independence [23]. Use the peer-reviewed figures.
- **Vendor benchmarks:** NVIDIA latency and congestion figures [43][44][53][54] and Cisco efficiency and job-completion claims [100] are vendor-reported.
- **Secondary sources to confirm against primary text:**
  - HFMA/AKASA is vendor-commissioned [10].
  - The KLAS 79% figure is from TechTarget's report on KLAS [6].
  - The HTI-5 details come from law-firm summaries [69].
  - The HIPAA rule timing comes from a secondary site [64].
  - The EU dates partly rely on a regulatory brief [76].
  - Nexus Hyperfabric AI availability is from an analyst firm [99].
- **Publication years not confirmed:** for sources [26] and [32].
- **EU AI Act territorial scope (Article 2):** whether and how it reaches US health systems was not verified.
- **HHS business associate FAQ "SI chatbot" wording:** verify on the live page [58].
- **FDA AI device counts:** sources disagree (1,357 as of Dec 2025 [13]; 1,614 as of Sept 4, 2026 list version [11]).

---

## H) Sources

1. AMA press release, 2026 Physician Survey on Augmented Intelligence. https://www.ama-assn.org/press-center/ama-press-releases/ama-ai-usage-among-doctors-doubles-confidence-technology-grows
2. AMA 2026 Physician AI Survey report (PDF). https://www.ama-assn.org/system/files/physician%2Dai%2Dsentiment%2Dreport.pdf
3. AMA, "More than 80% of physicians use AI professionally" (2026). https://www.ama-assn.org/practice-management/digital-health/more-80-physicians-use-ai-professionally-ama-survey
4. AMA, "2 in 3 physicians are using health AI, up 78% from 2023" (2025). https://www.ama-assn.org/practice-management/digital-health/2-3-physicians-are-using-health-ai-78-2023
5. KLAS, Healthcare AI Update 2025 (Dec 29, 2025). https://klasresearch.com/report/healthcare-ai-update-2025-what-use-cases-are-adopted-the-most/3912
6. TechTarget, "KLAS: Ambient speech remains healthcare's top AI use case." https://www.techtarget.com/searchhealthit/news/366637231/KLAS-Ambient-speech-remains-healthcares-top-AI-use-case
7. KLAS Arch Collaborative, Ambient Speech Outcomes 2025. https://klasresearch.com/archcollaborative/report/ambient-speech-outcomes-2025/652
8. KLAS, Epic's Ambient Speech Announcement 2025. https://klasresearch.com/report/epic-s-ambient-speech-announcement-2025-how-epic-s-move-into-ambient-speech-may-shape-customer-strategies/3920
9. ASTP/ONC data brief, Hospital Trends in the Use, Evaluation, and Governance of Predictive AI, 2023-2024. https://healthit.gov/data/data-briefs/hospital-trends-use-evaluation-and-governance-predictive-ai-2023-2024/
10. HFMA and AKASA survey press release (Dec 17, 2025). https://akasa.com/press/hfma-genai-revenue-cycle-survey
11. Kent Applied, analysis of FDA AI-enabled device list by specialty and year. https://www.kentapplied.com/research/fda-ai-enabled-devices/
12. FDA, List of Artificial Intelligence-Enabled Medical Devices. https://www.fda.gov/medical-devices/artificial-intelligence-enabled-medical-devices/list-artificial-intelligence-enabled-medical-devices
13. "Alignment of Policy, Practice, and Patient Safety for Trustworthy AI in Radiology" (PMC). https://pmc.ncbi.nlm.nih.gov/articles/PMC13349408/
14. JAMA Network Open, Clinician Experiences With Ambient Scribe Technology (Feb 19, 2025). https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2830383
15. JAMA Network Open, Evaluation of an Ambient AI Documentation Platform for Clinicians (May 2, 2025). https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2833433
16. JAMA Network Open, Use of an AI Scribe and EHR Efficiency (Oct 10, 2025). https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2839929
17. NEJM AI, Ambient AI Scribes in Clinical Practice: A Randomized Trial (Nov 26, 2025), PubMed record. https://pubmed.ncbi.nlm.nih.gov/41497288/
18. NEJM Catalyst, Ambient AI Scribes: Learnings after 1 Year and over 2.5 Million Uses (2025). https://catalyst.nejm.org/doi/full/10.1056/CAT.25.0040
19. AMA, "AI scribes save 15,000 hours." https://www.ama-assn.org/practice-management/digital-health/ai-scribes-save-15000-hours-and-restore-human-side-medicine
20. Annals of Family Medicine, More Tethered to the EHR, 2019-2023 (2024). https://www.annfammed.org/content/22/1/12
21. Annals of Family Medicine, Tethered to the EHR (2017). https://www.annfammed.org/content/15/5/419
22. JAMA Network Open, Gender Differences in Time Spent on Documentation and the EHR (2022). https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2790443
23. JAMA Neurology (PMC), Automated LVO Detection Software and Thrombectomy Treatment Times: A Cluster Randomized Clinical Trial (2023). https://pmc.ncbi.nlm.nih.gov/articles/PMC10507590/
24. Viz.ai publication summary page (vendor). https://www.viz.ai/publications/automated-large-vessel-occlusion-detection-software-and-thrombectomy-treatment-times
25. AJR, Radiologist Worklist Reprioritization Using AI: CTPA Positive for Acute PE (2023). https://ajronline.org/doi/full/10.2214/AJR.22.28949
26. Impact of AI-Triage on Radiologist Report Turnaround Time (PMC). https://pmc.ncbi.nlm.nih.gov/articles/PMC13091564/
27. JAMA, Time to Treatment With Endovascular Thrombectomy and Outcomes (HERMES meta-analysis, 2016). https://jamanetwork.com/journals/jama/fullarticle/2556124
28. Neurology, Endovascular therapy for ischemic stroke (Meretoja et al., 2017). https://www.neurology.org/doi/10.1212/WNL.0000000000003981
29. Quantified health and cost effects of faster endovascular treatment, Netherlands (PMC, 2021). https://pmc.ncbi.nlm.nih.gov/articles/PMC8606465/
30. Accuracy and Safety of AI-Enabled Scribe Technology: Instrument Validation Study (JMIR, PMC, 2025). https://pmc.ncbi.nlm.nih.gov/articles/PMC11811668/
31. Mayo Clinic Proceedings: Digital Health, Evaluating Quality and Safety of Ambient Digital Scribe Platforms (2025). https://www.mcpdigitalhealth.org/article/S2949-7612(25)00099-9/fulltext
32. Clinical AI Scribes in primary care: accuracy, error severity and implications (PMC). https://pmc.ncbi.nlm.nih.gov/articles/PMC13528381/
33. JAMA Network Open, Physician Perspectives on Ambient AI Scribes (2025). https://doi.org/10.1001/jamanetworkopen.2025.1904
34. JAMA Internal Medicine, External Validation of a Widely Implemented Proprietary Sepsis Prediction Model (2021). https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2781307
35. JAMA Network Open, Quantification of Sepsis Model Alerts in 24 US Hospitals Before and During COVID-19 (2021). https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2786356
36. NEJM, The Clinician and Dataset Shift in Artificial Intelligence (2021). https://www.nejm.org/doi/full/10.1056/NEJMc2104626
37. JAMA Internal Medicine, Variability in Performance of a Proprietary Sepsis Prediction Model Across 9 Hospitals (2023). https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2803492
38. Science, Dissecting racial bias in an algorithm used to manage the health of populations (2019). https://www.science.org/doi/10.1126/science.aax2342
39. Commure status page, Scribe Generation Delays (Jun 25, 2026). https://status.commure.com/incidents/01KVZQVT17SWJBW917Z7NRPM5A
40. Commure status page, Azure US Hosted Clients Pro Ambient Scribe Outage (Jul 21, 2026). https://status.commure.com/incidents/01KY2DRMN09DVGDRB646FPVP70
41. Mikata Health status page, Mika AI Scribe notes temporarily unavailable (May 29, 2026). https://mikata-health.gitbook.io/mikata-product-guide-for-customers/mikata-health-status-page/past-incidents/resolved-may-29th-2026-mika-ai-scribe-notes-were-temporarily-unavailable
42. Accurx incident report INC-2089 (Apr 27, 2026). https://support.accurx.com/en/articles/768462-incident-report-accurx-scribe-outage-inc-2089
43. NVIDIA, Spectrum-X: Hardware-Accelerated Multiplane Networking for Large-Scale AI Training (arXiv, 2026). https://arxiv.org/html/2605.21187v2
44. NVIDIA Technical Blog, Giga-Scale AI and the Ethernet Evolution. https://developer.nvidia.com/blog/giga-scale-ai-ethernet-evolution-spectrum-x-ethernet-rewrites-rules/
45. NVIDIA Technical Blog, Optimize Large-Scale AI Workloads with NVIDIA Spectrum-X. https://developer.nvidia.com/blog/optimize-large-scale-ai-workloads-with-nvidia-spectrum-x/
46. Ultra Ethernet Consortium, Specification v1.0 (Jun 11, 2025). https://ultraethernet.org/wp-content/uploads/sites/20/2025/06/UE-Specification-6.11.25.pdf
47. Network World, UEC publishes 1.0 specification (Jun 2025). https://www.networkworld.com/article/4006285/ultra-ethernet-consortium-publishes-1-0-specification-readies-ethernet-for-hpc-ai.html
48. DCD, Ultra Ethernet Consortium launches 1.0 specification (Jun 17, 2025). https://www.datacenterdynamics.com/en/news/ultra-ethernet-consortium-launches-10-specification/
49. NVIDIA Technical Blog, NVIDIA Contributes GB200 NVL72 Designs to Open Compute Project. https://developer.nvidia.com/blog/nvidia-contributes-nvidia-gb200-nvl72-designs-to-open-compute-project/
50. HPE, NVIDIA GB200 NVL72 by HPE product page. https://buy.hpe.com/emea_middle_east/en/compute/rack-scale-system/nvidia-nvl-system/nvidia-gb200-nvl72-by-hpe/p/1014890104
51. Uptime Institute, Global Data Center Survey 2025 (PDF). https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.Annual.Survey.Report.pdf
52. Uptime Institute blog, AI embraces liquid cooling, but enterprise IT is slow to follow. https://journal.uptimeinstitute.com/ai-embraces-liquid-cooling-but-enterprise-it-is-slow-to-follow/
53. NVIDIA Technical Blog, Ultra-High Speed Frame Rates in AI Medical Devices with Clara Holoscan. https://developer.nvidia.com/blog/powering-ultra-high-speed-frame-rates-in-ai-medical-devices-with-clara-holoscan-sdk/
54. NVIDIA Technical Blog, Real-Time Surgical Guidance by Fusing Multi-Modal Imaging with Holoscan. https://developer.nvidia.com/blog/real-time-surgical-guidance-by-fusing-multi-modal-imaging-with-nvidia-holoscan/
55. Wolters Kluwer press release, survey on unsanctioned AI tools in hospitals (Dec 2025). https://www.wolterskluwer.com/en/news/wolters-kluwer-survey-finds-broad-presence-of-unsanctioned-ai-tools-in-hospitals-and-health-systems
56. Wolters Kluwer expert insight, Shadow AI: providers using unapproved tools. https://www.wolterskluwer.com/en/expert-insights/shadow-ai-providers-are-using-unapproved-tools-to-improve-workflow
57. HHS OCR, Guidance on HIPAA and Cloud Computing. https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html
58. HHS OCR, Business Associates FAQs. https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html
59. HHS OCR, Guidance Regarding Methods for De-identification of PHI. https://www.hhs.gov/hipaa/for-professionals/special-topics/de-identification/index.html
60. eCFR, 45 CFR 164.514 (de-identification). https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.514
61. eCFR, 45 CFR 164.501 (definitions, including designated record set). https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.501
62. Federal Register, HIPAA Security Rule To Strengthen the Cybersecurity of ePHI, proposed rule (Jan 6, 2025). https://www.federalregister.gov/documents/2025/01/06/2024-30983/hipaa-security-rule-to-strengthen-the-cybersecurity-of-electronic-protected-health-information
63. HHS, HIPAA Security Rule NPRM fact sheet. https://www.hhs.gov/hipaa/for-professionals/security/hipaa-security-rule-nprm/factsheet/index.html
64. The Uptime Report, HIPAA Security Rule Changes 2026: Final Rule Slips to 2027 (secondary). https://theuptimereport.com/hipaa-security-rule-changes-2026/
65. HHS OCR Dear Colleague letter, Ensuring Nondiscrimination Through the Use of AI (Jan 10, 2025; copy hosted by NYSDA). https://www.nysdental.org/docs/statenynewyorklibraries/default-document-library/ocr-artificial-intelligence-guidance.pdf?sfvrsn=a74018b1_1
66. eCFR, 45 CFR 92.210 (nondiscrimination in patient care decision support tools). https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-92/subpart-C/section-92.210
67. ONC, HTI-1 Decision Support Interventions fact sheet. https://healthit.gov/wp-content/uploads/2023/12/HTI-1_DSI_fact-sheet_508.pdf
68. ONC, HTI-5 Final Rule overview. https://healthit.gov/resources/health-data-technology-and-interoperability-onc-deregulatory-actions-to-unleash-prosperity-hti-5-final-rule/
69. Akin, ONC Issues HTI-5 Final Rule Removing Model Card and Risk Management Requirements (secondary). https://www.akingump.com/en/insights/ai-law-and-regulation-tracker/onc-issues-hti-5-final-rule-removing-model-card-and-risk-management-requirements-for-predictive-decision-support-interventions
70. FDA, Clinical Decision Support Software guidance (Jan 29, 2026). https://www.fda.gov/media/109618/download
71. FDA, Guidances with Digital Health Content. https://www.fda.gov/medical-devices/digital-health-center-excellence/guidances-digital-health-content
72. FDA, PCCP for AI-Enabled Device Software Functions guidance (Aug 18, 2025). https://www.fda.gov/media/166704/download
73. FDA, AI-Enabled Device Software Functions: Lifecycle Management and Marketing Submission Recommendations (draft, Jan 7, 2025). https://www.fda.gov/regulatory-information/search-fda-guidance-documents/artificial-intelligence-enabled-device-software-functions-lifecycle-management-and-marketing
74. FDA Law Blog, Updates to the CDS and General Wellness Guidance Documents (Jan 2026). https://www.thefdalawblog.com/2026/01/a-busy-day-in-the-cdrh-neighborhood-updates-to-the-cds-and-general-wellness-guidance-documents/
75. European Parliament Legislative Train, Digital Omnibus on AI. https://www.europarl.europa.eu/legislative-train/theme-a-europe-fit-for-the-digital-age/file-digital-omnibus-on-ai
76. QLE regulatory brief, AI Act's Digital Omnibus is now law (secondary). https://www.qle.be/the-qle-regulatory-brief/ai-acts-digital-omnibus-is-now-law-ai-medical-devices-get-until-2-august-2028-but-notified-bodies-face-a-28-january-2028-deadline
77. MedTech Europe, response on classification of high-risk AI systems (Sept 11, 2026). https://www.medtecheurope.org/2026/09/11/medtech-europe-responds-to-stakeholder-consultation-on-the-classification-of-high-risk-ai-systems/
78. Federal Register, Executive Order 14434, Inaugurating the Era of Super Intelligence (Oct 2, 2026). https://www.govinfo.gov/content/pkg/FR-2026-10-02/html/2026-20321.htm
79. OWASP, Top 10 for LLM Applications 2025. https://genai.owasp.org/download/43299/
80. OWASP, Agentic AI: Threats and Mitigations. https://genai.owasp.org/download/45674/
81. HHS 405(d), HICP Technical Volume 1. https://hhscyber.hhs.gov/Documents/HICP/tech-vol1-508.pdf
82. HHS 405(d), HICP 2023 webinar. https://hhscyber.hhs.gov/Documents/Posters_and_awareness/HHS-webinar-hicp-2023-0504.pdf
83. Cisco Newsroom, Cisco Unveils AI Defense (Jan 15, 2025). https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2025/m01/cisco-unveils-ai-defense-to-secure-the-ai-transformation-of-enterprises.html
84. Cisco Newsroom, Cisco Redefines Security for the Agentic Era (Feb 10, 2026). https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m02/cisco-redefines-security-for-the-agentic-era.html
85. Cisco Blogs, Introducing AI BOM in Cisco AI Defense. https://blogs.cisco.com/ai/know-your-ai-stack-introducing-ai-bom-in-cisco-ai-defense
86. Cisco Newsroom, Cisco Unveils Agentic Platform (Cloud Control, Jun 2, 2026). https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m06/cisco-unveils-agentic-platform-for-operating-and-defending-critical-it-infrastructure.html
87. Cisco Blogs, Agent Builder in Cloud Control Studio (Jun 2, 2026). https://blogs.cisco.com/ai/announcing-cisco-cloud-control-agent-builder
88. Cisco Blogs, The Agentic Workplace Runs on Cisco. https://blogs.cisco.com/news/the-agentic-workplace-runs-on-cisco
89. Cisco Blogs, Cisco Cloud Control generally available for U.S. customers (Aug 25, 2026). https://blogs.cisco.com/ai/cisco-cloud-control-us-general-availability
90. Splunk Blog, Splunk Observability Update Q1 2026 (AI Agent Monitoring GA). https://www.splunk.com/en_us/blog/observability/splunk-observability-ai-agent-monitoring-innovations.html
91. Splunk Blog, Splunk Observability at .conf26. https://www.splunk.com/en_us/blog/observability/splunk-observability-at-conf26-optimize-ai-at-scale.html
92. Splunk Docs, Splunk AI Agent Monitoring (deprecation notice). https://help.splunk.com/en/splunk-observability-cloud/observability-for-ai/splunk-ai-agent-monitoring
93. Splunk Blog, Splunk Platform Innovations Supporting Cisco Data Fabric Are Generally Available (Aug 4, 2026). https://www.splunk.com/en_us/blog/platform/splunk-platform-innovations-cisco-data-fabric-generally-available.html
94. Splunk Blog, Cisco Data Fabric: Solving for Visibility, Economics, and AI Readiness. https://www.splunk.com/en_us/blog/platform/cisco-data-fabric-solving-for-visibility-economics-and-ai-readiness.html
95. Splunk Blog, The Agentic Era Demands a New Data Foundation (.conf26). https://www.splunk.com/en_us/blog/platform/the-agentic-era-demands-a-new-data-foundation-how-cisco-is-delivering-it-with-splunk.html
96. Cisco Investor Relations, Cisco to Deliver Secure AI Infrastructure with NVIDIA (Mar 18, 2025). https://investor.cisco.com/news/news-details/2025/Cisco-to-Deliver-Secure-AI-Infrastructure-with-NVIDIA/default.aspx
97. Cisco Newsroom, Cisco Secure AI Factory with NVIDIA expansion (Mar 16, 2026). https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m03/cisco-secure-ai-factory-with-nvidia-GTC-2026.html
98. Cisco Partner Blog, UCS C885A M8 and Nexus Hyperfabric. https://blogs.cisco.com/partner/fast-track-your-ai-revenue-4-game-changing-solutions-partners-need-now
99. Futurum Group, Cisco Ups the AI Ante (analyst, secondary). https://futurumgroup.com/insights/cisco-ups-the-ai-ante-launching-new-plug-and-play-solutions-with-nvidia/
100. Cisco Newsroom, Cisco Announces New Silicon One G300 (Feb 10, 2026). https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m02/cisco-announces-new-silicon-one-g300.html
101. Cisco Newsroom, Cisco Advances Scalability and Openness at OCP 2026 (Oct 2026). https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m10/cisco-advances-scalability-and-openness-at-ocp-2026.html
102. Cisco Newsroom, Cisco Debuts New Unified Edge Platform (Nov 3, 2025). https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2025/m11/cisco-unified-edge-platform-for-distributed-agentic-ai-workloads.html
103. Cisco, Unified Edge FAQ. https://www.cisco.com/c/en/us/products/collateral/servers-unified-computing/unified-edge/unified-edge-faq.html
104. Cisco, Unified Edge for Intelligent Healthcare Solution Overview. https://www.cisco.com/c/en/us/products/collateral/computing/unified-edge/intelligent-healthcare-so.html
105. Cisco Blogs, Responsible AI in Healthcare Starts with a Unified Edge Ecosystem. https://blogs.cisco.com/industries/responsible-ai-in-healthcare-starts-with-a-unified-edge-ecosystem
106. Cisco Blogs, Healthcare AI Must Earn Trust Before Adoption. https://blogs.cisco.com/industries/healthcare-ai-must-earn-trust-before-adoption
107. Cisco Blogs, Beyond the Pilot: Building the Clinical Data Fabric for the Agentic Era. https://blogs.cisco.com/customerexperience/beyond-the-pilot-building-the-clinical-data-fabric-for-the-agentic-era
108. Cisco Live EMEA 2026, Eliminate Network Bottlenecks with Cisco's UEC-Ready AI (PDF). https://www.ciscolive.com/c/dam/r/ciscolive/emea/docs/2026/pdf/PSODCN-2246.pdf
109. Cisco Blogs, Complicated vs. Complex: healthcare cybersecurity. https://blogs.cisco.com/industries/complicated-vs-complex-why-modern-healthcare-demands-a-unique-approach-to-cybersecurity
110. Splunk Blog, Observe, Evaluate, and Guardrail Your AI Agents With Agent Observability (Sept 18, 2026). https://www.splunk.com/en_us/blog/observability/observe-evaluate-and-guardrail-your-ai-agents-with-agent-observability.html
