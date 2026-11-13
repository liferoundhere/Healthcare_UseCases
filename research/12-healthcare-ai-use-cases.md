# Research Brief 12: Seven Healthcare AI Use Cases Where Infrastructure and Operations Decide Whether the AI Works

Compiled: Friday, Nov 13, 2026. Evidence window: 2025 to 2026, with older canonical studies flagged. Companion data file: `research/data/ai-use-cases.json`.

## How to read this brief

- **Scope.** Seven use cases that the explainer does not already cover. The ambient scribe outage, the AI data path flagship (scribe audio, imaging AI, shadow AI, unplanned GPU rack) and the clinical operations lens are in Briefs 04 and 09 and are not repeated here.
- **Citations.** New sources are numbered [1], [2] ... in "Sources" at the end. Facts already in earlier briefs keep the earlier number with a prefix: [04-34] is Brief 04, source 34; [09-5] is Brief 09, source 5; [08-38] is Brief 08, source 38.
- **Verification tags in Sources.** (F) page or abstract fetched and read. (S) search-result summary only because the page was blocked or not opened. Nothing tagged (S) is used as a headline number in the JSON file.
- **VENDOR-REPORTED** marks numbers from a vendor, a vendor-funded survey, a vendor press release or a health system's own announcement without independent audit.
- **Cisco statements are hypotheses.** Each use case ends with one plain sentence per product about what it would do. No outcome is claimed for any Cisco product in a hospital. Product status and limits are in Briefs 06, 07 and 08.
- **Terminology.** Executive Order 14434 directs federal agencies to use "Super Intelligence (SI)" in new documents [04-78]. This brief keeps "AI" because the cited studies and rules use it.

## Executive summary

1. **Virtual nursing has outcome evidence now, and it is mixed by outcome.** Across nine hospitals in one US health system, virtual nursing was associated with a hospital length-of-stay reduction of 0.786 days (129,080 encounters) [11] and lower 30-day emergency department readmission after virtual discharge (3.7% versus 13.3%; 4,662 matched pairs) [10]. Yet 57% of 880 hospital nurses said virtual nurses did not reduce their workload [09-5].
2. **Camera-based fall prevention is not proven.** A 2026 matched cohort (3,002 pairs) found 1.017 versus 1.286 falls per 1,000 patient-days with AI-assisted video monitoring, a difference that was not statistically significant [8]. A 2025 Italian study reported an adjusted rate ratio of 0.21 on only 20 falls [7].
3. **No vendor-neutral network specification for room cameras was found.** The nearest guidance is from the American Telemedicine Association (video "all in under 150 milliseconds", Wi-Fi 6 on all units, edge computing) [12] and one vendor ("Hardwire virtual care devices whenever possible") [13]. No published PoE or per-room bandwidth figure was found.
4. **Patient-access voice agents are in production, and the numbers are self-reported.** MUSC Health reports more than 2.2 million calls since 2024 [1]; WellSpan reports more than 160,000 calls a month [16]; Community Health Network reports 40% AI containment [09-25]. No independent audit of accuracy, containment or patient experience was found.
5. **On-premises clinical AI exists at named institutions, but no adoption statistic was found.** Mayo Clinic deployed an NVIDIA DGX SuperPOD with DGX B200 systems [21]; University Medicine Magdeburg reports 322 registered users on an on-premises language model [22]; Severance Hospital (Yonsei) runs an on-premises drafting agent integrated with its EHR [23]. Rack power is the documented physical constraint: 120 to 132 kW per rack against an industry average near 9 kW [04-49][04-50][04-51].
6. **Bedside prediction has the strongest new evidence.** The updated Epic Sepsis Model (v2) was prospectively validated at four US health systems (227,091 encounters): encounter-level AUROC 0.82 to 0.92, but positive predictive value only 0.13 to 0.26 with "high institutional variability ... and high alert burden" [25]. In one emergency department both versions alerted before clinical recognition in only about a third of cases [26].
7. **Outcome benefit depends on clinicians acting, which depends on the alert arriving in time.** With the TREWS system, patients whose alert was confirmed within 3 hours had an 18.7% adjusted relative reduction in in-hospital mortality (6,877 sepsis patients, five hospitals) [29]. No published measurement of data-pipeline latency for bedside models was found.
8. **Agents can operate EHR interfaces, imperfectly, and oversight is immature.** In a FHIR-compliant test environment the best model completed 69.67% of 300 physician-written tasks [32]; a later agent design reached 98.0% [33]. Health-system CIOs say the maturity needed for agent oversight "doesn't fully exist yet" [34], and 55% of surveyed IT leaders already run AI workflows with limited staff oversight (VENDOR-REPORTED, n=60+) [3].
9. **Digital pathology is constrained by data and by few cleared algorithms.** Through April 2026 there were 51 FDA-authorized AI-flagged pathology devices, 7 of them whole-slide imaging algorithms [4]. One academic institute scans 800 to 1,000 slides a day [38]; a vendor-sourced figure puts one image at 2 to 4 GB [40]. All 10 large US labs in one interview study reported IT process issues [39].
10. **Cost governance trails spending.** Only 18% of "AI scaler" organizations report mature financial attribution (64 healthcare CFOs, spring 2026) [5]; 4% of surveyed health-system IT leaders report scaled AI with measurable outcomes (VENDOR-REPORTED) [3]. Named CIOs describe tiered access, usage caps and FinOps monitoring to contain token spend [24]. No health-system dollar figure for token or inference spend was found.

---

## 1. Virtual nursing and computer-vision patient monitoring (id: ai-vision)

### Evidence

| Topic | Finding | Sample and date | Source |
|---|---|---|---|
| Adoption | 40% of nurse leaders say their organization is implementing virtual care; 15% piloting; 15% no investment | 867 nurse leaders, 363 hospitals, 204 health systems, Feb 2026 | [09-62] |
| Nurse-reported effect | 57% said virtual nurses did not reduce workload; 10% said workload increased | 880 hospital nurses, JAMA Network Open, Dec 2025 | [09-5] |
| Readmission | 30-day emergency department readmission 3.7% with virtual-nurse discharge versus 13.3% with in-person discharge; risk ratio 0.28 (95% CI 0.24 to 0.33). Retrospective | 4,662 matched pairs, nine hospitals in one Southeastern US health system, 2022 to 2024; NPJ Digital Medicine, June 2026 | [10] |
| Length of stay | Hospital length of stay -0.786 days (95% CI -0.940 to -0.631); emergency department length of stay -0.398 hours. Effects appeared six to seven months after go-live | 129,080 encounters, same nine hospitals; Int J Med Inform, Nov 2026 | [11] |
| Falls, AI video | 1.017 versus 1.286 falls per 1,000 patient-days; "no statistically significant effect". One author employed by the system vendor | 3,002 matched pairs, one tertiary hospital in South Korea; Healthcare (Basel), Sept 2026 | [8] |
| Falls, AI camera | 5 falls monitored (2.84 per 1,000 person-days) versus 15 unmonitored (6.65); adjusted incidence rate ratio 0.21 (95% CI 0.12 to 0.38). Retrospective, single site, 20 falls in total; five falls happened despite correct alerts because nurses could not arrive in time | 362 patients, 10 rooms (20 beds), Humanitas Gavazzeni, Nov 2023 to Feb 2024; Frontiers in Digital Health, Apr 2025 | [7] |
| Falls and sitters, human-watched video | Falls 17.2 to 12.9 per month; 1:1 sitter hours 1,428 to 140 per month; estimated savings over $3.2 million. Not AI: technicians watch the video | One long-term acute care hospital, 20 months versus 20 months; Am J Nurs, Dec 2025 | [9] |
| Named deployment | UChicago Medicine: more than 1,800 devices systemwide in operating rooms, patient rooms and PACUs; virtual nursing and sitting, bedside TV, location services. No outcomes reported. VENDOR-REPORTED | AHA Market Scan, May 2026 | [6] |
| Vendor architecture | One vendor's in-room device does "edge processing, AI vision and audio recognition, EMR integration" and says edge processing minimizes "latency and cloud dependence". Claims sitter hours cut "over 90%" with no customer named. VENDOR-REPORTED | Product page, read Nov 13, 2026 | [14] |

### Infrastructure demands

| Layer | What the use case needs | Evidence or status | Source |
|---|---|---|---|
| Network, latency | Video round trip "all in under 150 milliseconds to avoid service interruptions"; design for "high availability (up to 99.999% uptime)" | ATA Center of Digital Excellence, June 2025 (Ochsner Health and AvaSure presenters) | [12] |
| Network, wired versus wireless | "Hardwire virtual care devices whenever possible"; "Isolate video traffic in a VLAN if possible"; "Calculate your peak bandwidth" | Vendor guidance (Caregility), VENDOR-REPORTED; no figures given | [13] |
| Wi-Fi | "Deploy Wi-Fi 6 access points across all hospital units" | ATA CODE | [12] |
| Bandwidth per device | About 4 Mbps is general video-device guidance, not a virtual-nursing specification | Webex help article | [09-59] |
| PoE and closet power | No published PoE class or per-room wattage found | Gap | Gaps |
| Compute | "Deploy edge computing to process clinical data locally and reduce dependency on cloud roundtrips" | ATA CODE; vendor in-room edge device | [12][14] |
| Identity and privacy | Who may view a room, whether video is recorded, patient consent | No vendor-neutral standard found; state AI laws differ | [09-40] |
| Security | Proposed HIPAA Security Rule would require a technology asset inventory, network map and segmentation; not final | NPRM Jan 2025; final action moved to 2027 | [04-62][04-63][04-64] |
| Observability | Per-room device health and proof that the inference node is processing | No published practice found | Gaps |

### Risks and failure modes

- Benefit is uneven: operational outcomes improved in one nine-hospital system [10][11] while most surveyed bedside nurses saw no workload relief [09-5].
- A correct alert does not prevent a fall if staff cannot reach the room in time [7].
- Fall-prevention evidence is retrospective, small or non-significant [7][8].
- Program benefits took six to seven months to appear [11], so early infrastructure problems can end a program before it shows value (inference from [11], not a measured finding).

### Cisco hypotheses (not outcomes)

- Meraki or Catalyst Center would report switch port, PoE and wireless state for room devices.
- ThousandEyes would test the path from the hospital to the vision vendor's cloud endpoints.
- Topology and Inventory in Cloud Control would map each room device to its switch and closet.
- Actions and the Audit log would hold a proposed switch or QoS change for a named approver and record the decision.

---

## 2. AI agents in patient access (id: ai-access)

### Evidence

| Topic | Finding | Sample and date | Source |
|---|---|---|---|
| Named deployment | MUSC Health "Emily" (SoundHound): more than 2.2 million patient calls since 2024; July 2026 expansion to retail and specialty pharmacy; connects to Epic pharmacy and scheduling modules; verifies identity (method not described); routes "complex, high-acuity, or sensitive" calls to staff. No containment or wait-time figure. VENDOR-REPORTED | HIT Consultant, July 29, 2026 | [1] |
| Named deployment | WellSpan "Ana" (Hippocratic AI): more than 160,000 patient calls a month and more than 7,000 hours of conversation; answers inbound calls and schedules primary care appointments; outbound follow-up planned. Handoff and EHR integration not described. VENDOR-REPORTED | WellSpan, July 30, 2026 | [16] |
| Named deployment | Community Health Network: 40% AI containment on Webex Contact Center. VENDOR-REPORTED (Cisco) | Webex blog, Aug 2026 | [09-25] |
| Platform | PolyAI announced a direct Epic integration on Aug 18, 2026 | Search summary only | [20] |
| Oversight | 55% already run AI workflows with limited staff oversight. VENDOR-REPORTED | 60+ CIOs and senior IT leaders, Apr 2026 | [3] |
| Identity risk | Knowledge-based authentication "is bypassed more than 50% of the time" (vendor's 2025 report); one healthcare financial services case: 4,500 unique bot calls probing an IVR, $18M in exposed account value. VENDOR-REPORTED | Pindrop, May 12, 2026 | [17] |

### Infrastructure demands

| Layer | What the use case needs | Evidence or status | Source |
|---|---|---|---|
| Network | Carrier trunks, contact center platform, speech and language model endpoints and EHR interfaces, all reachable with low delay | No published latency budget for voice agents found | Gaps |
| Compute | Speech-to-text, language model and text-to-speech run in vendor clouds | Vendor descriptions only | [1][16] |
| Identity | Caller verification stronger than knowledge questions; scoped service identity for the agent in the EHR | KBA weakness is vendor-reported | [17] |
| Security | Business associate agreements for each vendor in the chain; AI-voice and disclosure rules | HHS guidance; state laws | [04-58][09-40] |
| Observability | Reconciliation of agent confirmations against EHR write-back; per-call traces | One vendor blog names failed write-back as the most common failure; not independently documented | [19] |
| Handoff | Transfer to staff with context for clinical, distressed or complex callers | Described by MUSC, not measured | [1] |

### Risks and failure modes

- All volume and containment figures are self-reported [1][16][09-25].
- A booking can be confirmed to the caller and not written to the schedule (vendor blog, search summary only) [19].
- Voice impersonation and automated probing of phone systems are reported by a security vendor [17].
- Platform dependence: the agent stops when the contact center platform, the model provider or the EHR interface stops. No documented patient-access agent outage was found.

### Regulation and guidance

- The FCC ruled in February 2024 that AI-generated voices are "artificial" under the Telephone Consumer Protection Act (search summary only) [18].
- California AB 3030 (January 2025) and other state laws set disclosure and human-review duties that differ by state [09-40].
- Business associate rules apply to each vendor that handles patient data [04-58].

### Cisco hypotheses (not outcomes)

- Webex Contact Center, where it is the platform, would supply call and routing data and execute an approved routing change.
- Agent Observability would trace the agent's steps and tool calls if the agent platform exports telemetry.
- ThousandEyes would measure voice and API paths to the model provider and the EHR interface.
- Splunk would join EHR interface errors to call records.
- Duo would verify the person approving a change.

---

## 3. On-premises or private clinical AI, the "AI factory" in the hospital data center (id: ai-factory)

### Evidence

| Topic | Finding | Sample and date | Source |
|---|---|---|---|
| Named deployment | Mayo Clinic: NVIDIA DGX SuperPOD "powered by DGX B200 systems" for pathology foundation models, drug discovery and precision medicine. Mayo says "Tasks that previously took four weeks now can be completed in one". Atlas pathology model trained on more than 1.2 million whole-slide images. GPU count and location not stated on the page read. Self-reported | AHA Market Scan, Aug 2025 | [21] |
| Named deployment | University Medicine Magdeburg (Germany): self-hosted on-premises language model; 322 registered users; of 91 survey respondents, 62.6% used it at least weekly and 44% reported saving at least 30 minutes a week | JMIR AI, Apr 15, 2026 | [22] |
| Named deployment | Severance Hospital, Yonsei University Health System (South Korea): on-premises agent built on Llama3-8B, integrated with the EHR, drafting emergency department discharge summaries and preanesthetic assessments; "all the architecture inside the hospital". Vendor-affiliated authors | JMIR Medical Informatics, Nov 24, 2025 | [23] |
| Named deployment | Kasugai Municipal Hospital (Japan): Cisco UCS C240 M7 with NVIDIA L40S GPUs; more than 1,000 discharge summaries a month drafted on premises. VENDOR-REPORTED (Cisco) | Cisco Japan customer story | [08-38] |
| US intent | Brown University Health and others "are exploring 'AI sovereignty,' running open-weight models on dedicated infrastructure so costs depend mainly on hardware" | DistilINFO summary of a Becker's report, Aug 12, 2026 | [24] |
| Readiness | 26% of organizations report robust GPU capacity; 54% say networks cannot scale for AI. Cross-industry, VENDOR-REPORTED | Cisco AI Readiness Index 2025, n=8,000+ | [09-47] |

### Infrastructure demands

| Layer | What the use case needs | Evidence or status | Source |
|---|---|---|---|
| Power and cooling | 120 kW of cooling for one GB200 NVL72 rack; one OEM version rated 132 kW; average rack density near 9 kW | NVIDIA, HPE, Uptime Institute 2025 | [04-49][04-50][04-51] |
| East-west network | Low-loss, high-throughput fabric between GPU nodes and storage | Covered in Brief 04, section C | [04-43][04-46] |
| Compute | GPU servers sized to the models; smaller clusters suffice for 8-billion-parameter models | Yonsei and Kasugai examples | [23][08-38] |
| Model serving | Inference server, scheduler, model registry, and an on-call owner | No health-system operating model published | Gaps |
| Identity and security | Access to models and to the PHI they read; "Self-hosted on-premise systems provide a secure environment and conform to data privacy and security regulations" (authors' claim) | JMIR AI | [22] |
| Observability | GPU utilization, queue depth, token throughput and latency tied to the clinical application | No published practice found | Gaps |

### Risks and failure modes

- No statistic on how many hospitals run their own GPU clusters was found (Brief 09 reported the same gap).
- Published on-premises examples are user surveys and implementation reports, not outcome studies [22][23].
- Rack power an order of magnitude above typical data-center design is a facilities constraint before it is an IT one [04-49][04-51].
- Who operates the platform is rarely stated. In Magdeburg it is the hospital's Data Integration Center [22].

### Cisco hypotheses (not outcomes)

- Intersight would report server, GPU and firmware state and execute approved maintenance.
- Nexus would carry and report on the east-west fabric.
- AI POD for Splunk is described by Cisco as a pre-validated on-premises stack for Splunk AI workloads; whether a hospital would use it for clinical models is not established [07-8].
- AI Defense would test models and applications for security and safety issues.
- Splunk would correlate inference latency with fabric and node events.

---

## 4. Real-time predictive models at the bedside: sepsis and deterioration (id: ai-bedside)

### Evidence

| Topic | Finding | Sample and date | Source |
|---|---|---|---|
| Original validation (older) | Epic Sepsis Model v1: AUC 0.63, sensitivity 33%, positive predictive value 12% | 38,455 hospitalizations; JAMA Internal Medicine, 2021 | [04-34] |
| Updated model, multicenter | Epic Sepsis Model v2: encounter-level AUROC 0.82 to 0.92 across sites; prediction-level (12-hour) AUROC 0.75 to 0.85; positive predictive value 0.13 to 0.26; "high institutional variability, low positive predictive value, and high alert burden" | 227,091 inpatient encounters, 4 large US health systems, Aug 2023 to Mar 2025; JAMA Network Open, Feb 2, 2026 | [25] |
| Updated model, timing | In the emergency department, AUROC 0.77 (v1) and 0.90 (v2); falling to 0.70 and 0.85 before clinical recognition. At 60% sensitivity, alerts preceded clinical recognition in 33.0% (v1) and 33.5% (v2) of cases | 35,076 encounters, MetroHealth; Am J Emerg Med, 2025 | [26] |
| Pooled validations | Epic Sepsis Model pooled AUROC 0.65 (3 studies, 922,754 patients); Epic Deterioration Index 0.79 (7 studies, 542,983 patients); heterogeneity I2 at least 93%; "none exceeding AUROC 0.79" | 22 studies, over 2.3 million patients, 34 sites, searches to Aug 2025; J Gen Intern Med, Mar 31, 2026 | [27][2] |
| Vendor response | Epic said the review covers largely first-generation models and that its current model was independently validated at four health systems | TechTarget, Apr 8, 2026 | [2] |
| Evaluation method | Same v2 model: AUC 0.86 at patient level versus 0.62 at prediction level; positive predictive value 14.5% versus 4%. Preprint, not peer reviewed | 31,951 hospitalizations; medRxiv, May 2026 | [28] |
| Outcome when acted on (older) | TREWS: alert confirmed within 3 hours associated with 3.3% adjusted absolute and 18.7% adjusted relative reduction in in-hospital mortality | 590,736 patients monitored, 6,877 sepsis patients analyzed, five hospitals; Nature Medicine, 2022 | [29] |
| Outcome, deep learning (older) | COMPOSER: 1.9% absolute (17% relative) reduction in in-hospital sepsis mortality; 5.0% absolute increase in bundle compliance. Before-and-after design; authors are co-founders of a related start-up | 6,217 septic patients, two emergency departments, UC San Diego; NPJ Digital Medicine, 2024 | [31] |
| FDA status | Bayesian Health described as the first company with FDA clearance for an AI continuous monitoring system for sepsis (May 2026). Users named: Cleveland Clinic, Johns Hopkins, University of Rochester Medicine, MemorialCare. MemorialCare reports a 3.6% absolute mortality reduction when providers engage with the flag (self-reported) | MedCity News, May 27, 2026 | [30] |
| Alert volume (older) | Across 24 US hospitals, daily sepsis alerts rose 43% in three weeks while census fell 35% | JAMA Network Open, 2021 | [04-35] |
| Site variation (older) | Across 9 hospitals, performance fell as sepsis incidence and comorbidity rose | JAMA Internal Medicine, 2023 | [04-37] |

### Infrastructure demands

| Layer | What the use case needs | Evidence or status | Source |
|---|---|---|---|
| Data pipeline | Vitals, labs, orders and notes arriving at the model on time from monitors, device gateways, the lab system and the EHR | No published latency or data-quality measurement for these pipelines found | Gaps |
| Timeliness | Alerts must precede clinician recognition to add value; in one study they did so in about a third of cases | Am J Emerg Med 2025 | [26] |
| Local validation | "High heterogeneity across sites emphasizes the need for local validation before clinical deployment" | J Gen Intern Med 2026 | [27] |
| Compute | Scoring runs inside the EHR vendor's environment or a vendor cloud | Vendor-specific; not documented in the studies read | Gaps |
| Identity and security | Every nurse, provider and resident in scope provisioned on the alert platform at one site | MedCity News | [30] |
| Observability | Input freshness and feed latency logged next to each prediction | No published practice found | Gaps |

### Risks and failure modes

- Alert burden stays high even with the improved model: positive predictive value 0.13 to 0.26 [25].
- Performance metrics depend on how they are computed; patient-level AUC can overstate what clinicians experience [28].
- Benefit was observed when clinicians confirmed alerts within 3 hours [29], so any delay in the alert reaching the bedside erodes the mechanism of benefit (inference; pipeline delay itself is unmeasured).
- Model-card and risk-management requirements for predictive decision support are removed by ONC's HTI-5 rule, effective December 28, 2026 [04-68][04-69].

### Regulation and guidance

- FDA Clinical Decision Support Software guidance, January 29, 2026 [04-70].
- ONC HTI-5 final rule, October 28, 2026 [04-68][04-69].
- Nondiscrimination in patient care decision support tools, 45 CFR 92.210 [04-66].

### Cisco hypotheses (not outcomes)

- Splunk would hold interface-engine queue depth, message timestamps and model-host logs if the hospital sends them.
- Federated Search would query logs left in other stores without ingesting them, within the platform limits in Brief 07.
- Machine Data Lake would retain full-fidelity pipeline logs for later review.
- Catalyst Center and Topology would show network state for device gateways and interface servers.
- None of these validates a model or changes its accuracy.

---

## 5. AI agents with access to clinical systems: non-human identity and agent governance (id: ai-agents)

### Evidence

| Topic | Finding | Sample and date | Source |
|---|---|---|---|
| Agent capability | Best model completed 69.67% of 300 physician-written tasks in a FHIR-compliant virtual EHR; "significant variation in performance across task categories" | 100 patient profiles, over 700,000 data elements; NEJM AI, Sept 2025 | [32] |
| Agent capability, later | An improved agent reached 91.0% without memory and 98.0% with memory on the same benchmark; authors list remaining limits for "responsible deployment" | Pacific Symposium on Biocomputing, 2026 | [33] |
| EHR vendor platform | 129 features of Epic's persona agents listed as available in Agent Factory, 78 in development | UGM, Aug 2026 | [09-12] |
| Who is building | Only a small number of health systems are building agents, with Epic; Mass General Brigham was in the early "Factory One" pilot (radiology actionable findings, emergency medicine); broader building access expected by end of 2026 | DistilINFO summary of a Becker's report, Sept 1, 2026 | [34] |
| CIO view | UW Medicine CIO Eric Neil: "We've got to manage them. We've got to monitor them."; retrofitting oversight later is "going to be incredibly difficult". Mass General Brigham: "We have to build governance around it before we expand." Several CIOs said the maturity needed for agent oversight does not fully exist yet | Same | [34] |
| Third-party tools | Epic "Connectors" let its agents reach third-party applications and will initially use the Model Context Protocol; no Epic-published MCP server was found | Search summary only | [37] |
| Oversight gap | 55% already run AI workflows with limited staff oversight. VENDOR-REPORTED | 60+ IT leaders, Apr 2026 | [3] |
| Discovery gap | 84% have an AI governance committee; about 10% use automated monitoring to discover AI. VENDOR-REPORTED | 51 organizations, Dec 2025 | [09-34] |
| Prompt injection | Attacks succeeded in 94.4% of simulated medical-advice dialogues | JAMA Network Open, Dec 2025 | [09-6] |
| Identity scale | Machine identities, including agents, outnumber human identities 109:1. Cross-industry, VENDOR-REPORTED | 2026 | [09-57] |
| Readiness | 31% feel fully equipped to control and secure AI agents. Cross-industry, VENDOR-REPORTED | Cisco AI Readiness Index 2025 | [09-47] |
| Prior authorization | CMS-0057-F API requirements begin January 1, 2027 | CMS | [09-22] |

### Infrastructure demands

| Layer | What the use case needs | Evidence or status | Source |
|---|---|---|---|
| Identity | One identity, owner and scope per agent; short-lived credentials; per-user delegated access where the agent acts for a person | No healthcare-specific non-human-identity survey found | Gaps |
| Network | Agent traffic to EHR APIs and MCP servers routed through enforceable paths | Vendor recommendation, not measured | Gaps |
| Security | Guardrails against prompt injection; adversarial testing before and after deployment; "human-in-the-loop oversight" | JMIR Medical Informatics viewpoint, Oct 2026 | [36] |
| Audit | A record of which agent did what, with which prompt and which tool call, next to the EHR audit log | CIO statements | [34] |
| Observability | Drift, duplicate agents and token use; "duplicate or malfunctioning agents can drive up token costs as well as cause clinical errors" | Becker's via DistilINFO | [34] |

### Risks and failure modes

- Scale changes the failure: "an agent working across thousands of charts can compound a mistake before anyone notices" (paraphrase of UW Medicine CIO) [34].
- Agents fail a meaningful share of realistic EHR tasks in testing [32].
- Prompt injection is demonstrated in peer review for medical advice [09-6]; no peer-reviewed red-team study of an agent with live EHR write access was found.
- A reported March 2026 disclosure about a scribe product's guardrails was seen only in a vendor blog and is not used (see Gaps).

### Regulation and guidance

- Health Sector Coordinating Council, "Health Industry AI Cyber Governance Framework Implementation Guide" (June 1, 2026), covering "agentic AI systems capable of autonomous action" [35].
- NIST AI Agent Standards Initiative (Feb 17, 2026) [09-43]; OWASP Top 10 for Agentic Applications for 2026 [09-44].
- Joint Commission and CHAI guidance (Sept 17, 2025) [09-35].

### Cisco hypotheses (not outcomes)

- Cisco Identity would aggregate identity and agentic activity into one view (Cisco says "Identity for AI Canvas is currently in beta", Brief 06); Duo would verify the people who approve changes.
- Secure Access would apply policy to agent traffic to APIs and MCP servers that pass through it.
- AI Defense would discover AI assets and test them against adversarial prompts.
- Agent Observability would trace agent steps, tool calls, cost and guardrail events for agents that export telemetry.
- Agents that run inside the EHR vendor's platform would be visible only through that vendor's own logs.

---

## 6. Digital pathology and imaging AI at scale (id: ai-pathology)

### Evidence

| Topic | Finding | Sample and date | Source |
|---|---|---|---|
| Cleared AI | 51 FDA-authorized AI/ML-flagged pathology-relevant devices through April 28, 2026; 7 are whole-slide imaging algorithms | Analysis of FDA data, Apr 2026 | [4] |
| Cleared AI, examples | Paige Prostate (De Novo, Sept 21, 2021); Ibex Galen Second Read (510(k), Jan 24, 2025); ArteraAI Prostate (De Novo, July 31, 2025) | Same | [4] |
| Scan volume | 800 to 1,000 routine slides scanned daily; 20,635 slides in one month; eight scanners; 1 to 3 minutes per slide, 40 to 50 minutes per rack of 20 | Technical University of Munich; Virchows Archiv, 2025 | [38] |
| Accuracy and time | 99% concordance between glass and digital reports; median case review time 304 to 266 seconds (resections), 333 to 290 seconds (biopsies) | 10,327 resection and 6,393 biopsy cases | [38] |
| Workstation network | Each pathologist workplace has a 1 Gb/s LAN connection; slides stay on fast storage for 2 weeks, then move to long-term network storage; trainees found the viewer slower than a microscope and suggested a faster server connection | Same | [38] |
| Validation | No major discordance in 98% of cases (821 of 837); rescanning required in 3% | 6,128 slides, 846 patients, a large private hospital network; APMIS, Mar 2026 | [41] |
| US adoption | 10 large US labs interviewed (5 named: Alverno, Intermountain Health, Labcorp, Memorial Sloan Kettering, Sonic Healthcare): go-live took under 1 year to about 18 months; all 10 reported IT process issues; cost of scanners and image storage was a barrier; half had adopted AI. Interviewer is a vendor executive | CAP Today, July 2025 | [39] |
| File size | "Single high-resolution pathology images typically range from 2 to 4 gigabytes"; a vendor pair claims up to 85% storage reduction (Hoag Health System named). VENDOR-REPORTED | CLP Magazine, Oct 1, 2025 | [40] |
| Large rollout | University Health Network (Toronto): all histopathology H&E cases scanned; storage capacity and interoperability named as key technical considerations | Crit Rev Clin Lab Sci, 2026 | [42] |
| Training data | Mayo's Atlas model trained on more than 1.2 million whole-slide images | AHA Market Scan | [21] |

### Infrastructure demands

| Layer | What the use case needs | Evidence or status | Source |
|---|---|---|---|
| Storage | A back-of-envelope from the two figures above: 800 to 1,000 slides a day at 2 to 4 GB is roughly 1.6 to 4 TB a day (derived, not reported by either source) | Derived from [38] and [40] | [38][40] |
| Network, campus | 1 Gb/s to each pathologist workstation in one institute | Virchows Archiv | [38] |
| Network, between sites and cloud | Capacity for bulk slide transfer plus interactive tile streaming | No published WAN sizing found | Gaps |
| Compute | GPU inference near the image store for cleared algorithms; foundation-model training at a few academic centers | Mayo example | [21] |
| Security and identity | De-identification and controlled distribution of slides for research | Institutional pipelines are being published | [42] |
| Observability | Scanner errors, failed transfers and viewer response time | Scanner contamination, summer heat and tissue-detection failures reported | [38] |

### Risks and failure modes

- Scan time, rescans and scanner faults delay slide availability [38].
- Few cleared whole-slide algorithms exist, each tied to specific scanners and viewers [4].
- Storage cost for indefinite retention is a named barrier [39].
- No peer-reviewed 2025 to 2026 study of laboratory turnaround time attributable to AI was found; the times above are pathologist review times, not end-to-end turnaround.

### Cisco hypotheses (not outcomes)

- Catalyst SD-WAN would show and steer slide traffic between sites and execute an approved path change.
- ThousandEyes would measure loss and delay to a cloud image archive.
- Nexus and Intersight would report on the data-center network and servers that host the image store and inference.
- Splunk would hold scanner, transfer and storage logs if the vendors expose them.

---

## 7. AI cost and capacity governance: tokens, GPUs and vendors (id: ai-cost)

### Evidence

| Topic | Finding | Sample and date | Source |
|---|---|---|---|
| Market spend | Healthcare AI spend $1.4 billion in 2025, nearly triple 2024 (ESTIMATE) | Menlo Ventures, 700+ executives | [09-10] |
| Attribution | 18% of "AI scalers" report mature financial attribution versus 31% of "AI starters"; 75% of scalers plan to increase gen AI and agentic AI investment; 68% of scalers rely primarily on before-and-after comparisons for some initiatives | 64 US healthcare CFOs (32 health systems over $1B revenue, 32 health plans), spring 2026; Deloitte, Aug 12, 2026 | [5] |
| Pricing shift | "AI consumption is increasingly metered in tokens rather than traditional licenses or seats" | Deloitte | [5] |
| Scale | 4% "have achieved scaled implementation with measurable outcomes"; 51% spend 11% to 25% of IT bandwidth on vendor management, integrations and implementations; 74% cite EHR dependency as a top barrier. VENDOR-REPORTED | 60+ IT leaders, Apr 9, 2026 | [3] |
| CIO practice | Jefferson Health: tiered access, token allocations by user type, usage reports; one task cost $75 in tokens for about two weeks of file-analysis work done in a day. Emory: lowest-intensity model per task and vendor disclosure of financial-operations data. Brown University Health: mostly flat per-user pricing, pilots with usage limits, FinOps monitoring "within hours to days". Atrium Health: moving from cost per token to cost per outcome | DistilINFO summary of a Becker's report, Aug 12, 2026 | [24] |
| CIO warning | Jefferson's Luis Taveras: without management "you will have runaway costs, because people don't understand the cost" | Same | [24] |
| Value claim | Mount Sinai "recently estimated nearly $50 million in return on investment" from its AI portfolio; period and method not stated. Self-reported | DistilINFO, May 28, 2026 | [44] |
| Cost control | 55% cannot accurately control AI costs. Cross-industry, VENDOR-REPORTED | Splunk State of Observability 2026 | [09-52] |
| EHR pricing | CIOs are budgeting for Epic's consumption-based AI cost model; terms not seen | Search summary only | [45] |

### Infrastructure demands

| Layer | What the use case needs | Evidence or status | Source |
|---|---|---|---|
| Observability | Token, model and cost per request, tagged to an application and owner | CIO practice | [24] |
| Compute | GPU utilization and queue data for owned clusters | No published practice found | Gaps |
| Identity | Usage tied to a user type or an agent identity | Jefferson allocates tokens by user type | [24] |
| Vendor data | Vendors disclosing usage and financial-operations data | Emory requires it | [24] |
| Finance join | Invoices and contracts joined to usage | Before-and-after comparison is the common method | [5] |

### Risks and failure modes

- Spend becomes a variable cost that tracks usage, not headcount [5].
- Duplicate or malfunctioning agents raise token cost [34].
- Value is mostly asserted: 18% mature attribution among organizations that have scaled [5].
- No health-system dollar figure for token or inference spend, and no documented surprise bill, was found.

### Cisco hypotheses (not outcomes)

- Agent Observability would report token use and cost per agent for agents that export telemetry.
- Intersight would report GPU utilization on Cisco compute.
- Splunk and Machine Data Lake would retain usage records for attribution.
- Cisco IQ would cover asset and lifecycle information for Cisco infrastructure, not AI spend.
- None of these measures clinical or financial value.

---

## Sources

Verification tag: (F) fetched and read (for journal articles, the PubMed or PMC record); (S) search-result summary only.

1. (F) HIT Consultant. "MUSC Health expands SoundHound AI agent Emily to pharmacy." July 29, 2026. https://hitconsultant.net/2026/07/29/musc-health-expands-soundhound-ai-agent-emily-pharmacy-epic/
2. (F) TechTarget (Anuja Vaidya). "Epic clinical decision support tools show modest performance." Apr 8, 2026. https://www.techtarget.com/searchhealthit/news/366641284/Epic-clinical-decision-support-tools-show-modest-performance
3. (F) Qventus. "Qventus Releases Second Annual CIO Report Revealing How Health Systems Are Closing the Gap Between AI Pilots and Payoff." Apr 9, 2026. VENDOR-REPORTED. https://www.qventus.com/company/newsroom/qventus-releases-second-annual-cio-report-revealing-how-health-systems-are-closing-the-gap-between-ai-pilots-and-payoff/
4. (F) Innolitics. "AI/ML in Digital Pathology and the Software-as-an-IVD Paradigm: Snapshot." Apr 28, 2026. https://innolitics.com/articles/ai-ml-in-digital-pathology-and-the-software-as-an-ivd-paradigm-snapshot/
5. (F) Deloitte Center for Health Solutions. US Healthcare CFO Survey 2026 article on proving AI value. Aug 12, 2026. https://www.deloitte.com/us/en/insights/industry/health-care/healthcare-cfos-proving-ai-value.html
6. (F) American Hospital Association, Center for Health Innovation Market Scan. "UChicago Medicine to Implement Smart Hospital Platform." URL dated May 12, 2026. https://www.aha.org/aha-center-health-innovation-market-scan/2026-05-12-uchicago-medicine-implement-smart-hospital-platform
7. (F) Gervasi C, et al. "Prevention of falls in hospitalized patients: evaluation of the effectiveness of a monitoring system (Verso Vision) developed with artificial intelligence." Frontiers in Digital Health, Apr 16, 2025. https://www.frontiersin.org/articles/10.3389/fdgth.2025.1548209/full
8. (F) Lee DS, et al. "Evaluation of Artificial Intelligence-Assisted Video Monitoring for Inpatient Fall Prevention: A Retrospective Matched Cohort Study." Healthcare (Basel), Sept 14, 2026;14(18):2999. https://pubmed.ncbi.nlm.nih.gov/42793538/
9. (F) Kalafus L, et al. "Implementation of a Continuous Video Monitoring Program to Decrease Inpatient Falls in a Long-Term Acute Care Hospital Setting." American Journal of Nursing, Dec 1, 2025;125(12):20-27. https://pubmed.ncbi.nlm.nih.gov/41261482/
10. (F) Khairat S, et al. "Virtual nursing implementation and 30-day patient readmissions: a multi-site study." NPJ Digital Medicine, June 12, 2026;9(1):734. https://pubmed.ncbi.nlm.nih.gov/42286161/
11. (F) Khairat S, et al. "Hospital and emergency department length of stay before and after virtual nursing implementation." International Journal of Medical Informatics, Nov 2, 2026;224:106791. https://pubmed.ncbi.nlm.nih.gov/42976388/
12. (F) American Telemedicine Association, Center of Digital Excellence. "What's Next: Scaling the Digital Hospital, Addressing Hardware and Connectivity Challenges." June 25, 2025. https://www.americantelemed.org/resources/code-whats-next-scaling-the-digital-hospital-addressing-hardware-and-connectivity-challenges/
13. (F) Caregility. "Network security best practices for virtual care." Undated; page footer 2026. VENDOR-REPORTED. https://caregility.com/blog/network-security-best-practices-for-virtual-care/
14. (F) Artisight. "The Smart Patient Room" product page. Read Nov 13, 2026. VENDOR-REPORTED. https://artisight.com/patient-room/
15. (S) Business Wire. "Artisight Now Runs Epic MyChart Bedside TV." Feb 17, 2026 (HTTP 403). https://www.businesswire.com/news/home/20260217518244/en/Artisight-Now-Runs-Epic-MyChart-Bedside-TV-Powering-a-Fully-Connected-Smart-Hospital-Experience
16. (F) WellSpan Health. "WellSpan expands Hippocratic AI partnership to support clinical operations and improve patient experience." URL dated July 30, 2026. Self-reported. https://www.wellspan.org/articles/2026/07/30/13/05/web---hippocractic-ai-partnership-expansion
17. (F) Pindrop. Article on the AMA deepfake warning and healthcare identity security. May 12, 2026. VENDOR-REPORTED. https://www.pindrop.com/article/ama-deepfake-warning-healthcare-identity-security/
18. (S) Federal Communications Commission. "FCC Makes AI-Generated Voices in Robocalls Illegal." Feb 8, 2024 (HTTP 403). https://www.fcc.gov/document/fcc-makes-ai-generated-voices-robocalls-illegal
19. (S) Assort Health. "Epic EHR integration for voice AI" (vendor blog). VENDOR-REPORTED. https://www.assorthealth.com/blog/epic-ehr-integration-voice-ai
20. (S) CustomerThink. "PolyAI launches direct integration with Epic, with PDS Health among the first to deploy at scale." Aug 2026. https://customerthink.com/?p=1083533
21. (F) American Hospital Association, Center for Health Innovation Market Scan. "Mayo Clinic: New AI Computing Platform Will Advance Precision Medicine." URL dated Aug 12, 2025. https://www.aha.org/aha-center-health-innovation-market-scan/2025-08-12-mayo-clinic-new-ai-computing-platform-will-advance-precision-medicine
22. (F) Grünig A, et al. "Implementation and User Evaluation of an On-Premise Large Language Model in a German University Hospital Setting: Cross-Sectional Survey." JMIR AI, Apr 15, 2026;5:e84362. https://pubmed.ncbi.nlm.nih.gov/41984850/
23. (F) Kim H, et al. "A Bilingual On-Premises AI Agent for Clinical Drafting: Implementation Report of Seamless Electronic Health Records Integration in the Y-KNOT Project." JMIR Medical Informatics, Nov 24, 2025;13:e76848. https://pubmed.ncbi.nlm.nih.gov/41284981/
24. (F) DistilINFO. "Health System CIOs Tame AI Token Costs." Aug 12, 2026 (secondary summary of a Becker's Hospital Review report, which returned HTTP 403). https://distilinfo.com/2026/08/12/health-system-ai-token-costs/
25. (F) Wong A, et al. "Multicenter Prospective Validation of an Updated Proprietary Sepsis Prediction Model." JAMA Network Open, Feb 2, 2026;9(2):e260181. https://pubmed.ncbi.nlm.nih.gov/41758510/
26. (F) Currey D, Tarabichi Y. "External validation of a widely available, localizable sepsis early detection model in the emergency department setting." American Journal of Emergency Medicine, Nov 2025;97:147-151. https://pubmed.ncbi.nlm.nih.gov/40729785/
27. (F) Patel H, et al. "A Systematic Review and Meta-analysis of Externally Validated Epic Clinical Decision Support Tools." Journal of General Internal Medicine, Mar 31, 2026 (online ahead of print). https://pubmed.ncbi.nlm.nih.gov/41917292/
28. (F) Tuttle M, et al. "Patient Versus Prediction-Level Evaluation of a Dynamic Clinical Prediction Model of Sepsis." medRxiv preprint, May 27, 2026. https://pubmed.ncbi.nlm.nih.gov/42245045/
29. (F) Adams R, et al. "Prospective, multi-site study of patient outcomes after implementation of the TREWS machine learning-based early warning system for sepsis." Nature Medicine, July 2022;28(7):1455-1460. https://pubmed.ncbi.nlm.nih.gov/35864252/
30. (F) MedCity News. Article on Bayesian Health's FDA clearance for sepsis AI. May 27, 2026. https://medcitynews.com/2026/05/bayesian-sepsis-ai/
31. (F) Boussina A, et al. "Impact of a deep learning sepsis prediction model on quality of care and survival." NPJ Digital Medicine, Jan 23, 2024;7(1):14. https://pubmed.ncbi.nlm.nih.gov/38263386/
32. (F) Jiang Y, et al. "MedAgentBench: A Virtual EHR Environment to Benchmark Medical LLM Agents." NEJM AI, Sept 2025;2(9). https://pubmed.ncbi.nlm.nih.gov/42932685/
33. (F) Chen E, et al. "MedAgentBench v2: Improving Medical LLM Agent Design." Pacific Symposium on Biocomputing 2026;31:354-371. https://pubmed.ncbi.nlm.nih.gov/41758153/
34. (F) DistilINFO. Article on AI agent oversight and healthcare CIOs. Sept 1, 2026 (secondary summary of a Becker's Hospital Review report, which returned HTTP 403). https://distilinfo.com/2026/09/01/ai-agent-oversight-healthcare-cios/
35. (F) Health Sector Coordinating Council Cybersecurity Working Group. "Health Sector Publishes Framework A.I. Cybersecurity Governance" (Health Industry AI Cyber Governance Framework Implementation Guide). June 1, 2026. https://healthsectorcouncil.org/health-sector-publishes-framework-a-i-cybersecurity-governance/
36. (F) Goh CJ, et al. "Cybersecurity of Large Language Models Across the Deployment Life Cycle in Health Systems." JMIR Medical Informatics, Oct 8, 2026;14:e101715. https://pubmed.ncbi.nlm.nih.gov/42849028/
37. (S) Fierce Healthcare. "Epic launches Connectors to link its AI tools with third-party apps." 2026 (HTTP 403). https://www.fiercehealthcare.com/ai-and-machine-learning/epic-launches-connectors-link-its-ai-tools-third-party-apps
38. (F) Iwuajoku V, et al. "An equivalency and efficiency study for one year digital pathology for clinical routine diagnostics in an accredited tertiary academic center." Virchows Archiv, July 2025;487(1):3-12. https://pmc.ncbi.nlm.nih.gov/articles/PMC12289765/
39. (F) CAP Today. "Put It on the Board" column on what 10 large US labs say about their digital pathology journeys. July 2025. https://www.captodayonline.com/?p=85288
40. (F) CLP Magazine. Article on the Fujifilm and PRECIDX partnership to reduce digital pathology storage costs. Oct 1, 2025. VENDOR-REPORTED. https://clpmag.com/diagnostic-technologies/digital-pathology/partnership-reduce-digital-pathology-storage-costs-85/
41. (F) Bayçelebi D, et al. "Implementation of Digital Pathology Workflow for Routine Primary Diagnosis in a Large Private Hospital Network." APMIS, Mar 2026;134(3):e70183. https://pubmed.ncbi.nlm.nih.gov/41804214/
42. (F) Clarke B, et al. "Large scale implementation of DP for clinical diagnoses: experience, challenges, and lessons learned." Critical Reviews in Clinical Laboratory Sciences, Mar 2026;63(2):109-123. https://pubmed.ncbi.nlm.nih.gov/40905836/
43. (S) News-Medical. "Leica Biosystems enables faster cancer diagnoses through multiple digital pathology FDA clearances." Aug 11, 2026. VENDOR-REPORTED. https://www.news-medical.net/news/20260811/Leica-Biosystems-enables-faster-cancer-diagnoses-through-multiple-digital-pathology-FDA-clearances-including-industry-first-AI-assisted-quality-control-software.aspx
44. (F) DistilINFO. "Mount Sinai's $50M AI Success." May 28, 2026 (secondary; no primary source linked). https://distilinfo.com/2026/05/28/mount-sinais-50m-ai-success/
45. (S) Becker's Hospital Review. "'Tokenomics': CIOs scramble to budget for Epic's AI cost model." 2026 (HTTP 403). https://www.beckershospitalreview.com/healthcare-information-technology/innovation/tokenomics-cios-scramble-to-budget-for-epics-ai-cost-model/

Reused from earlier briefs (full entries there): [04-34], [04-35], [04-37], [04-43], [04-46], [04-49], [04-50], [04-51], [04-57], [04-58], [04-62], [04-63], [04-64], [04-66], [04-68], [04-69], [04-70], [04-78]; [07-8]; [08-38]; [09-5], [09-6], [09-10], [09-12], [09-22], [09-25], [09-34], [09-35], [09-40], [09-43], [09-44], [09-47], [09-52], [09-57], [09-59], [09-62].

---

## Gaps / unverified

**Not found**
- **Room-camera network specification.** No vendor-neutral or peer-reviewed PoE class, wattage per room, or bandwidth per camera for virtual nursing or computer-vision monitoring. The ATA and vendor statements quoted in section 1 contain no Mbps or watt figures.
- **Prospective or randomized fall-prevention trial of computer vision.** A Mass General Brigham trial (NCT06339125) was seen in a registry listing with no results.
- **FDA status of fall-detection computer vision.** Not checked against FDA records.
- **Independent audit of patient-access voice agents.** No peer-reviewed or third-party measurement of accuracy, containment, abandonment or patient experience.
- **Documented outage or wrong-patient incident involving a patient-access agent.** None found.
- **Latency budget for voice agents.** No published figure found.
- **On-premises GPU adoption in hospitals.** No statistic. No US health system was found describing in a primary source who operates its GPU platform.
- **Data-pipeline latency or data-quality failure for bedside models.** No published measurement or incident report. The link between feed delay and stale scores in the storyboard is an engineering inference.
- **Peer-reviewed red-team of an agent with live EHR write access.** None found. No healthcare-specific non-human-identity survey found.
- **Epic agent identity model.** No primary Epic documentation on how agent identities, scopes and audit are issued. Agent Factory timing conflicts between sources: "by the end of 2026" [34], "October" (Becker's, search summary) and "2027" (Forbes via secondary).
- **Petabyte-scale storage figure from a 2025 to 2026 peer-reviewed source.** "About a petabyte a year for a large hospital" appears only in vendor and industry material. The 1.6 to 4 TB a day figure in section 6 is derived here from two sources and is not reported by either.
- **End-to-end laboratory turnaround time attributable to pathology AI.** Not found in peer review for 2025 to 2026.
- **Health-system token or inference spend, or a documented surprise bill.** None found. Epic's consumption pricing terms were not seen.
- **Use of the term "AI factory" by a hospital.** Seen in vendor material (NVIDIA, Dell), not in a health system's own primary source read here.

**Seen only in search summaries, marked (S), not used as headline numbers**
- Artisight footprint: "over 400 U.S. hospitals across 30 health systems, with more than 17,000 active patient rooms" [15]. MetroHealth: "nearly 500 patient rooms" (https://www.pulse.bot/healthtech/news/metrohealth-deploys-artisight-ai-platform-to-500-rooms-across-five-hospitals-6e6c6a78-73c3-4e47-8ca1-5be1dae6699c/).
- Mayo Clinic SuperPOD "128 graphics processing units" in Brooklyn Park (Star Tribune, HTTP 429: https://www.startribune.com/mayo-clinic-ai/601427580). The AHA page read gives no GPU count [21].
- Essen University Hospital on Dell servers with NVIDIA H100 GPUs, "50% reduction time in inferencing" (Dell case study, vendor).
- "88% of healthcare IT leaders say their infrastructure isn't fully ready for on-premises AI" (blog; underlying study not located).
- Sepsis ImmunoScore: FDA De Novo and a 3,457-encounter validation (secondary write-up only). Bayesian Health clearance pathway, device name and exact date (reported as 510(k), May 12 or May 15, 2026) not confirmed in a primary source; [30] confirms only "this month" (May 2026).
- FCC ruling details [18]; the July 2024 proposed AI-call disclosure rule was reported as not final in May 2026 (vendor blog).
- Epic Connectors and MCP [37]; PolyAI and Epic [20]; Intermountain with Hyro and Salesforce; Tampa General with Hyro.
- Booking write-back failure as "the most common failure" [19] (vendor blog).
- "A March 2026 disclosure tied to Heidi Health's scribe showed guardrails could be rewritten in three prompts" (vendor blog; no primary source found; not used).
- Forrester 2026: 78% of 450 US healthcare organizations named security risk as the leading hesitation about agentic AI (secondary; not used).
- Pindrop "AI voice attacks rose 1,390%" (search summary; the fetched Pindrop page [17] does not contain this figure; not used).
- Leica AI quality-control software: "up to 24% more artifacts" and "69%" less hands-on review time at Heidelberg [43] (vendor).
- Memorial Sloan Kettering: 93% drop in glass-slide archive requests (unverified report).
- Mount Sinai "return exceeding 3-to-1" and "about $50 million in bottom-line impact ... in 2026" (Becker's, search summary). The fetched secondary [44] says only "nearly $50 million in return on investment".
- FinOps Foundation "three times over their 2026 token allocations" and an insurer going "from 3M to 150M" tokens (vendor blog; not used).
- SmartSense survey: 60% of 150 hospital CFOs say half or more of tech pilots fail (vendor; search summary).
- AMGA case study: WellSpan's agent "completed 2.7M calls" (search summary).

**Conflicts and cautions**
- Humanitas fall study [7]: text and table give different confidence intervals for the crude rate ratio (0.12 to 1.24 versus 0.25 to 0.72); the adjusted ratio (0.21) is used with the 20-fall caveat. The abstract and text also differ on the unmonitored group size (355 versus 352).
- Qventus: an "80% cannot measure ROI" figure appears in Qventus blog titles but not in the press release read [3]; not used.
- MUSC: the article gives "13 health system locations" in one place and "13 retail locations" in another [1].
- TechTarget [2] reports the meta-analysis sample as "about 2.3 million patients"; the abstract [27] says "over 2.3 million patients and 34 sites".
- DistilINFO [24][34][44] is a secondary summarizer of Becker's reporting; quotes are as relayed there.
- Wong 2021 [04-34] and the other "older" rows fall outside the 2025 to 2026 window and are labeled.
