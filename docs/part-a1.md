# Healthcare Infrastructure Storyboard: Context Document

**Phase 1 (vendor-neutral today-state) plus three pillars. Prepared November 12, 2026.**

This is file 1 of 2 of Part A. It contains: How to use this document, Part 0 (Executive framing and glossary), and Part 1 (Ten use cases, today). File 2 (`part-a2.md`) contains the three full pillars: Healthcare security, Healthcare facilities, and AI in healthcare.

---

## How to use this document

This is context for later 3D and 2D storyboards. Phase 1 describes how health systems operate today, with any technology vendor. Nothing in Phase 1 assumes or names a specific network, security, or observability vendor's product. Phase 2 (in a later file) maps Cisco Cloud Control and Cisco Data Fabric onto the problems described here.

**Citations.** Every figure carries a bracketed citation that points to a numbered source in one of four research briefs:

| Prefix | Research brief | Scope |
|---|---|---|
| [C-n] | `research/01-clinical-ops.md` | Macro context, ten use cases, KPI table |
| [S-n] | `research/02-security.md` | Threats, architecture, identity, MTTx, compliance matrix, incident file |
| [F-n] | `research/03-facilities.md` | Facility types, clinical spaces, building/OT, plant, M&A, hospital-at-home |
| [A-n] | `research/04-ai-healthcare.md` | AI landscape, failure modes, infrastructure, governance, regulation |

**Labels that must be preserved in any derived storyboard.**
- **ESTIMATE**: arithmetic, planning ranges, or third-party estimates, not measured results.
- **VENDOR-REPORTED**: a technology vendor's own research, survey, case study, or benchmark. Treat as directional.
- **Analysis**: an inference drawn from cited facts, not a cited fact itself.
- **Gap**: no published number exists or none could be verified. The storyboard must not fill gaps with invented numbers.

**Section-level citations.** Most citations point to a numbered source (for example, [C-64]). Where a statement summarizes a research brief's own synthesis rather than a single source, the citation points to the section instead: [C-1 jargon] means the "Technical jargon" list under use case 1 of the clinical brief; [C-gaps 3] means item 3 of that brief's Gaps section; [S-gaps 1], [F-gaps 1], and [A-gaps] work the same way; [S-B] is the security brief's compliance matrix.

**Journeys are illustrative composites.** The Patient, Engineering, and Clinical journeys in Part 1 are composite narratives built from the cited mechanics of real incidents and workflows. They are not accounts of a single named event unless a citation says so. Any number inside a journey carries its citation.

**Conflicting sources.** Where research briefs disagree (for example, Ascension's restoration date or Synnovis incident counts), both values are shown with their sources. Do not silently pick one.

**Terminology note.** Executive Order 14434 (September 29, 2026) directs federal agencies to use "Super Intelligence (SI)" in place of "AI" in new documents; newer HHS, ONC, and FDA pages may say "SI" [A-78]. This document uses "AI" throughout because statutory wording, prior regulations, and the cited studies use it.

---

## Part 0: Executive framing

### 0.1 The macro picture in 2026

**Margins are thin and volatile.** Kaufman Hall's National Hospital Flash Report (August 2026 data, published October 13, 2026) puts the calendar year-to-date operating margin index at 2.5% including health-system allocations (8.0% excluding allocations). The single-month August margin was 1.8%, down from 3.8% in July. Roughly 43% of hospitals were operating at a loss, versus about 33% before COVID-19 [C-4][C-5].

**Expenses are outrunning prices.** The AHA reports total hospital expenses grew 7.5% in 2025 (workforce +5.6%, supplies +9.9%, drugs +13.6%), after 5.1% growth in 2024 against 2.9% inflation. Labor is the largest cost category, at 56% of costs in the 2025 report and about 60% in the 2026 report [C-6][C-7].

**Infrastructure spend is rising fastest.** AHA analysis of Lightcast data found hospitals spent nearly $4.5 billion on computing infrastructure and data processing in 2024, up 15% from 2023 [C-7].

**Healthcare remains the costliest industry for breaches.** IBM/Ponemon's Cost of a Data Breach 2026 report puts the average healthcare breach at $6.64 million, down 10.5% from $7.42 million in 2025 and still the highest of all industries [C-1][S-3]. In the 2025 report, healthcare breaches took the longest of any industry to identify and contain: 279 days [C-2]. IBM's 2026 report gives no healthcare-specific lifecycle, so 279 days remains the latest healthcare figure (Gap) [S-3]. Globally, IBM 2026 reports a mean time to identify of 183 days and a mean time to contain of 64 days (247 days total, up from 241 in 2025), and the U.S. average breach cost rose to $11.5 million [C-1][C-3].

**Third-party concentration risk is systemic.** The February 2024 Change Healthcare ransomware attack affected approximately 192.7 million individuals (final count reported to HHS OCR on July 31, 2025), and UnitedHealth Group reported $3.09 billion in total 2024 costs ($2.2 billion direct response, $867 million business disruption) [C-8][C-9][C-93]. An additional $799 million was reported in Q4 2025 [S-54].

**Ransomware harms patients, not just data.** A University of Minnesota analysis of Medicare claims (2016 to 2021) found hospital volume fell 17% to 25% in the first week of a ransomware attack, Medicare revenue fell 19% to 41%, and in-hospital mortality for patients already admitted rose roughly 20% to 35% (working paper; peer-review status not re-verified) [C-15][C-16].

**Spillover hits neighbors.** At unaffected EDs adjacent to a month-long 2021 San Diego ransomware attack, ambulance arrivals rose 35.2%, stroke code activations rose 74.6% (59 to 103), and confirmed strokes rose 113.6% (22 to 47) [C-17][C-99]. Cardiac arrests rose from 21 to 38, and favorable neurologic survival after out-of-hospital cardiac arrest fell from 40.0% to 4.5% [C-18].

**Accreditors now assume long outages.** Joint Commission Sentinel Event Alert 67 tells hospitals to be prepared for life- and safety-critical technology to be offline for four weeks or longer. It counts 99 cyberattack, ransomware, or hacking events reported to the Joint Commission over 10 years, 90% impacting hospitals [C-19][C-20]. In 2026 the Joint Commission and AHA launched a Cyber Resilience Readiness (CRR) program aimed at outages of 30 days or more [S-14][S-15][S-16].

**Regulation is tightening, slowly.** The HIPAA Security Rule NPRM (published January 6, 2025) would require MFA, encryption at rest and in transit, network segmentation, a technology asset inventory and network map, vulnerability scans every 6 months, annual penetration tests, and written procedures to restore critical systems and data within 72 hours [C-12][C-13]. It is **not final**. HHS moved it to "long-term actions" with final action projected for July 2027; that is a target, not a legal deadline [C-14][C-94][S-20][S-21].

**Breach volume stays high.** HIPAA Journal counted 710 large (500+ record) healthcare breaches in 2025 affecting at least 61,556,256 individuals, with hacking/IT incidents at 570 of 710 (about 80%) [C-85]. That was a January 2026 snapshot; a later count of OCR portal data shows 804 breaches and over 140 million people for 2025 [S-97][S-98]. H1 2026 recorded 397 breaches affecting 33.77 million people [S-98]. 2024 set the record at 289,162,330 individuals, largely due to Change Healthcare [C-85].

**Outages are increasingly network and change driven.** Uptime Institute 2025: IT and networking issues caused 23% of impactful outages in 2024, and configuration/change management failure was the top cause of major network-related outages (34%). In Uptime's 2025 survey, 57% said their last major outage cost more than $100,000 and 1 in 5 said more than $1 million [C-81][C-82].

**Care is moving out of the building.** Medicare telehealth flexibilities run through December 31, 2027, and the Acute Hospital Care at Home (AHCAH) waiver runs through September 30, 2030 (Consolidated Appropriations Act, 2026, signed February 3, 2026). CMS lists 358 approved hospital CCNs across 134 health systems in 37 states (as of October 19, 2026) [C-28][C-29][C-32][C-33]. Outpatient visits rose 9.8% in 2025 [C-7].

**AI is mainstream in clinical work.** The AMA's 2026 Physician Survey found 81% of physicians use AI professionally, up from 38% in 2023 [C-55][A-1]. FDA's AI-enabled device list shows 1,451 authorizations through the end of 2025, 1,104 (76%) in radiology; FDA states more than 1,600 as of September 2026 [C-56][C-57][C-58].

**ECRI's 2026 hazard list ties the three pillars together.** ECRI ranks misuse of AI chatbots #1, unpreparedness for a "digital darkness" event (sudden loss of electronic systems) #2, and cybersecurity risks from legacy medical devices #8 among the top 10 health technology hazards for 2026 [C-27][S-36].

**Consolidation continues under distress.** Kaufman Hall counted 46 announced hospital and health system transactions in 2025 (72 in 2024), with a record 43.5% involving a financially distressed party [C-75][C-76].

### 0.2 The three pillars and how they relate

The storyboard rests on three pillars. They are not parallel silos; each one depends on the other two.

| Pillar | What it covers | Depends on | Creates risk for |
|---|---|---|---|
| **Security** | Threats, segmentation, identity, detection and response, medical device security, resilience, compliance | The facility's network, power, and building systems as the attack surface and the control plane | Clinical workflow (downtime, diversion) and AI (new data flows to protect) |
| **Facilities** | Hospitals, CAHs, clinics, ASCs, imaging centers, labs, pharmacies, data centers, hospital-at-home; clinical spaces; building/OT; cabling, power, Wi-Fi | Security to keep building and clinical systems trustworthy; WAN and cloud to connect sites | Everything: it is where care, devices, and infrastructure physically live |
| **AI** | Ambient documentation, imaging AI, predictive models, revenue cycle, agentic IT operations; GPU and fabric requirements; PHI governance | The facility's network, power, cooling, and data paths (PACS, EHR, Wi-Fi uplinks) | New third-party PHI flows, shadow AI, model failures, and agents that can change production systems |

**How they relate, in one sentence each.**
- **Security protects the facility and the clinical workflow.** A ransomware event removes the EHR, phones, pharmacy, lab, and imaging at once [C-62][S-60]; segmentation and identity controls decide how much of the facility has to go dark [S-27].
- **The facility is where care and infrastructure live.** Nurse call, clinical IT network equipment, and wireless phones for clinical staff sit on the NEC critical branch, which must be restored within 10 seconds of power loss [F-53][F-55]; a typical hospital carries 10 to 15 medical devices per bed [F-23].
- **AI depends on that infrastructure and creates new risk inside it.** Ambient scribes stream exam-room audio to third-party cloud models [C-10 use case narrative]; 2026 scribe outages traced to upstream model and cloud providers [A-39][A-40][A-41][A-42]; 40% of surveyed healthcare workers had encountered unauthorized AI tools [A-55]; and GPU racks at 120 to 132 kW dwarf a typical 9 kW rack [A-49][A-50][A-51].

### 0.3 Glossary

| Term | Definition (as used in this document) |
|---|---|
| **AHCAH** | Acute Hospital Care at Home. CMS waiver allowing inpatient-level care in the home; requested per CCN; runs through September 30, 2030 [C-29][F-80]. |
| **ASC** | Ambulatory surgery center. 6,308 Medicare-certified ASCs in 2023 [F-6]. |
| **BAA** | Business associate agreement. Required when a vendor (including an AI or cloud vendor) creates, receives, maintains, or transmits PHI for a covered entity, even if it stores only encrypted ePHI without the key [A-57][A-58]. |
| **BCA / downtime workstation** | Read-only business continuity workstation that holds recent EHR reports (MAR, census, orders) for use during EHR downtime [C-1 jargon]. |
| **BMS** | Building management system. Controls and monitors HVAC, pressure relationships, and other building systems; treated as OT by NIST SP 800-82r3 [F-16][F-19]. |
| **Break-glass** | Pre-staged emergency accounts with minimum necessary privileges, extra auditing, and a tested procedure, used when normal access paths fail [S-114]. |
| **CAH** | Critical access hospital. No more than 25 inpatient beds, 24/7 ED, average length of stay of 96 hours or less, generally more than 35 miles from another hospital; 1,377 CAHs as of October 2025 [F-3][F-5]. |
| **CCN** | CMS Certification Number. AHCAH waivers are granted per CCN, even within one system [F-79]. |
| **CDS** | Clinical decision support software. FDA revised its CDS guidance January 6, 2026 and reissued it January 29, 2026 [A-70][A-74]. |
| **CMMS** | Computerized maintenance management system. Clinical engineering's asset system of record for devices and building equipment [F-19][C-2 jargon]. |
| **CPG** | HHS Healthcare and Public Health Cybersecurity Performance Goals (January 2024): 10 Essential and 10 Enhanced voluntary goals mapped to HICP [S-25][C-83]. |
| **Designated record set** | Medical and billing records and other records used to make decisions about individuals (45 CFR 164.501). Telemetry, logs, and agent traces are operational data and not part of it by default, though they can carry identifiers that make them PHI (Analysis) [A-61][A-60]. |
| **DEM** | Digital experience monitoring. Measures the user's actual experience (session round-trip time, logon duration, synthetic transactions, path tracing) end to end [C-1 jargon]. |
| **DICOM** | Digital Imaging and Communications in Medicine. The standard for medical image format and transfer, including whole-slide pathology imaging [C-47]. |
| **DTIM** | Delivery Traffic Indication Message interval. Voice badges typically require DTIM 1 with a 100 ms beacon interval (VENDOR-REPORTED requirement) [C-40][C-42]. |
| **EDR / XDR** | Endpoint (or extended) detection and response. Cannot be installed on most medical devices [C-2 problem statement]. |
| **EHR** | Electronic health record. Orders, medication administration, results, documentation, scheduling, and billing all depend on it [C-1 problem statement]. |
| **ePHI / PHI** | (Electronic) protected health information under HIPAA. |
| **EVPN-VXLAN** | Ethernet VPN control plane with Virtual Extensible LAN data plane. A standards-based campus and data-center fabric overlay used to stretch segments and carry segmentation tags across a routed underlay (practitioner framing; no healthcare source cited). |
| **FDA 524B** | FD&C Act section 524B (added by FDORA, December 2022; effective March 29, 2023). Requires "cyber device" makers to provide an SBOM, a postmarket vulnerability plan, and patch processes [C-21][C-23][S-30]. |
| **FHIR** | HL7 Fast Healthcare Interoperability Resources. API-based standard; ONC's HTI-5 positions FHIR APIs as the base for future certification requirements [A-68]. |
| **HICP** | Health Industry Cybersecurity Practices (HHS 405(d), 2023 edition). Practice 6.M.B defines network zones [S-27]. |
| **HICS** | Hospital Incident Command System. The incident command structure hospitals activate to declare downtime and coordinate response [C-3 jargon]. |
| **HL7 (v2)** | Health Level Seven messaging standard used for ADT, orders, and results interfaces between the EHR and departmental systems. |
| **HTM** | Healthcare technology management (clinical or biomedical engineering). Owns medical device maintenance [S-27][S-36]. |
| **ICA / HDX** | Citrix Independent Computing Architecture protocol and its HDX technology stack, widely used to deliver virtualized EHR sessions. ICA round-trip time (RTT) default thresholds: warning 300 ms, critical 400 ms [C-37]. |
| **IoMT** | Internet of Medical Things. Networked infusion pumps, monitors, imaging modalities, lab analyzers, and similar devices. |
| **KEV** | CISA Known Exploited Vulnerability. |
| **MDS2** | Manufacturer Disclosure Statement for Medical Device Security (ANSI/NEMA HN 1-2019). About 240 questions across 23 security capabilities, including SBOM availability; typically requested during procurement [S-32][S-33]. |
| **Microsegmentation** | Fine-grained policy that restricts east-west traffic between individual assets or groups within a zone. Added to HICP in the 2023 edition [F-13][S-27]. |
| **MTBF** | Mean time between failures. No published benchmark found for clinical WLANs (Gap) [C-gaps 7]. |
| **MTTA** | Mean time to acknowledge an alert. No published healthcare benchmark (Gap) [S-gaps 1]. |
| **MTTC** | Mean time to contain. IBM 2026 global: 64 days [C-1][S-3]. |
| **MTTD** | Mean time to detect. Proxy: Mandiant 2026 global median dwell time of 14 days [S-8]. |
| **MTTI (IBM) vs. mean time to innocence** | Two different metrics share the acronym. In this document, **MTTI means IBM's mean time to identify a breach** (183 days global, 2026) [C-1]. **Mean time to innocence** (abbreviated **MTTInn** here to avoid collision) is the time it takes each team to prove its domain (EHR application, PACS, pump VLAN, Wi-Fi, WAN, identity) is not the cause of a clinical-facing problem. No published statistic exists; it is a **proposed KPI** [C-gaps 3][S-gaps 1]. |
| **MTTK** | Mean time to know (root cause identified). No published healthcare benchmark (Gap) [S-gaps 1]. |
| **MTTR** | Mean time to restore or recover. Healthcare proxies: Sophos 2025, 58% of ransomware victims recovered within a week (VENDOR-REPORTED); IBM 2026, 42% of organizations fully recovered from a breach [C-86][S-3]. |
| **NAC** | Network access control. Admits, profiles, and assigns policy to devices at connection time (practitioner framing; no primary healthcare source) [S-gaps 5]. |
| **802.1X / MAB** | IEEE port-based authentication (EAP) for wired and wireless; MAC Authentication Bypass for devices that cannot run a supplicant, common for medical devices [C-2 jargon]. |
| **802.11r/k/v** | Wi-Fi fast transition, neighbor reports, and BSS transition management. Ascom states 802.11r is mandatory for acceptable roaming with WPA3 [C-45]. |
| **Nurse call** | Patient-to-staff signaling system; on the NEC critical branch [F-53]; UL 1069 governs equipment [F-51]. |
| **OT** | Operational technology: HVAC, fire, electrical, lighting, physical access, physical security, utilities (NIST SP 800-82r3) [F-16]. |
| **PACS / VNA** | Picture archiving and communication system (the image archive and viewer platform) and vendor-neutral archive (a standards-based long-term image store shared across PACS) [C-5 problem statement]. |
| **PCCP** | Predetermined change control plan. FDA final guidance (December 4, 2024; reissued August 18, 2025) lets planned AI model modifications proceed without a new submission for each change [A-71][A-72]. |
| **PFC** | Priority Flow Control (IEEE 802.1Qbb). Per-priority pause frames that make Ethernet lossless for RoCE; can cause head-of-line blocking and congestion spreading [A-43][A-44]. |
| **RoCEv2** | RDMA over Converged Ethernet, routable version. The dominant transport in Ethernet AI clusters [A-43]. |
| **RPM** | Remote patient monitoring. Medicare paid $536 million for RPM in 2024 [C-35]. |
| **RTLS** | Real-time location system (Wi-Fi, BLE, ZigBee, infrared, and others). Hospital trial: Wi-Fi fingerprinting 1.21 m point accuracy and 96% room accuracy [F-45]. |
| **SaMD** | Software as a Medical Device. Software intended for a medical purpose that is itself the device, including many AI models. |
| **SASE / SSE** | Secure access service edge (networking plus cloud-delivered security) and security service edge (the security subset: secure web gateway, CASB, ZTNA) [C-6 jargon]. No primary healthcare source for design patterns (Gap) [S-gaps 5]. |
| **SBOM / VEX** | Software bill of materials (machine-readable, NTIA baseline attributes, with support level and end-of-support date per FDA) and Vulnerability Exploitability eXchange [S-31][C-2 jargon]. |
| **SD-WAN** | Software-defined WAN. Application-aware routing over multiple transports (broadband, MPLS, LTE/5G) [C-7 jargon]. |
| **Section 1557** | ACA nondiscrimination rule. Since May 1, 2025, covered entities must identify and mitigate discrimination risk in patient care decision support tools (45 CFR 92.210) [A-65][A-66]. |
| **UEC / UET** | Ultra Ethernet Consortium and its Ultra Ethernet Transport. Specification 1.0 published June 11, 2025; congestion control "does not rely on a lossless network" [A-46][A-47]. |
| **WMTS** | Wireless Medical Telemetry Service. FCC-protected bands at 608 to 614, 1395 to 1400, and 1427 to 1432 MHz, created in 2002; deployments registered with ASHE/AHA [F-32][F-33]. |
| **ZTNA** | Zero trust network access. Per-application, identity-verified access that replaces broad network VPN access [C-8 jargon]. |

---

## Part 1: Ten use cases (today)

Each use case follows the same structure: Pillars touched; Business problem and why it matters now; Impact; Today journeys; Technical deep dive; MTTx and other metrics; Quantified cost; Compliance hooks; Relevant 2023 to 2026 outages.

**A note on mean time to innocence, applied to every use case.** No published statistic exists for mean time to innocence in healthcare or elsewhere [C-gaps 3][S-gaps 1]. This document defines it as a **proposed KPI**: the elapsed time from a clinical-facing symptom (for example, "the EHR is slow on 4 West" or "the pump drug library did not update") to the point where every candidate domain (EHR application tier, PACS, the pump VLAN or device segment, Wi-Fi, WAN or ISP, identity) has either been proven not to be the cause or been identified as the cause. Each use case below states this explicitly rather than inventing a figure.

---

### Use case 1: EHR availability and clinical application performance

#### Pillars touched
- **Security:** endpoint agents, privileged access, immutable backups, and the July 2024 faulty security update all sit on the EHR's critical path [C-64].
- **Facilities:** data center power and cooling, and telecom rooms on the critical branch, keep the EHR reachable [F-53][F-67].
- **AI:** ambient documentation and AI features add latency-sensitive traffic to the same clinician sessions [C-1 problem statement].

#### Business problem and why it matters now
The EHR is the operational backbone of the hospital: orders, medication administration, results, documentation, scheduling, and billing all depend on it. Most large health systems deliver it through application virtualization or virtual desktops, so every click is a network round trip [C-1 problem statement]. Unplanned downtime is common: in a 2014 survey of 50 institutions, 96% reported at least one unplanned EHR downtime in three years and 70% had one longer than 8 hours [C-79]. Even when the EHR is "up," slow sessions degrade throughput in a workforce where 43.2% of physicians report burnout and nurses spend about 35% of a shift documenting [C-87][C-59]. Why now: margins at 2.5% leave no room for productivity loss [C-4]; AI tools add traffic to the same sessions; and on July 19, 2024 a single faulty software update caused detectable disruptions at 759 U.S. hospitals at once [C-64].

#### Impact
| Dimension | Impact | Source |
|---|---|---|
| Patient outcomes | Three of 50 surveyed institutions reported patient injury from EHR downtime (2014). ECRI 2026: downtime can cause medical errors, inappropriate treatment decisions, or delayed care. | [C-79][C-27] |
| Revenue | A large hospital "may lose as much as $1 million per hour" in lost charges during EHR downtime (ESTIMATE, quoted 2018). $634 per physician per hour (ESTIMATE, consultancy, cited 2017). | [C-78][C-80] |
| Clinical workflow | Work during downtime "takes four or five times longer" (time-and-motion study, cited 2017). Nurses spend about 35% of shift time documenting (range 26% to 41%). | [C-80][C-59][C-61] |
| Operational workflow | Lab turnaround can stretch to hours as specimens back up and results move to phone and fax. | [C-95] |
| Compliance and risk | Joint Commission EM.13.01.01 (continuity of operations) and EM.14.01.01 (disaster recovery). The HIPAA NPRM would require 72-hour restoration of critical systems. | [C-19][C-12] |
| Staff experience | 43.2% of physicians reported at least one burnout symptom in 2024 (48.2% in 2023, 53% in 2022). | [C-87] |

#### Today journeys
**Patient.** A patient with chest pain arrives at the ED at morning shift change. Registration's screen hangs on the insurance eligibility step, so the clerk prints a downtime face sheet and assigns a temporary medical record number. In the treatment bay, the nurse cannot see the prior ECG from last month's visit because the results tab will not load, so the physician orders a repeat. The patient waits longer for a bed because the bed board in the command center has gone stale, and later receives a handwritten discharge prescription that the pharmacy has to call to verify.

**Engineering (NetOps/SecOps).** The service desk logs a "P1: Epic slow, multiple units" ticket and opens a bridge. The virtualization team reports ICA round-trip time above the 300 ms warning threshold on a subset of sessions [C-37]; the application team says the database looks healthy; the network team says core links are lightly loaded; the storage team is not yet on the call. Each team pulls its own dashboard and spends the first hour proving its own innocence. Eventually someone notices that logon duration crossed the 70-second critical threshold [C-37] only for users whose profiles live on one file server, and the fix is a storage path, not the network. Nobody records how long the "is it the network?" phase took, because no one measures it.

**Clinical (nurse).** On a med-surg unit, a nurse taps her badge on a workstation on wheels outside room 12. Single sign-on reconnects in a few seconds on a good day (the published average is 8.9 seconds [C-77]), but this morning the Hyperspace window just spins. She jots vitals on a glove, moves to the next room, and back-enters them later in the shift. When the unit formally goes to downtime, the charge nurse pulls the read-only BCA printout of the medication administration record (MAR) and the team switches to a paper MAR for scheduled medications until the system returns.

#### Technical deep dive
- **Security:** privileged access management for EHR and hypervisor admins; EDR on Citrix/VDI hosts with staged (canary) content rollouts after the July 2024 event; application allowlisting on downtime BCA workstations; immutable backups of EHR databases; break-glass accounts that work when the directory does not [C-1 jargon][S-114].
- **Network infrastructure:** data center fabric with east-west segmentation between web, application, database, and storage tiers; dual-homed access to virtualization hosts; first-hop redundancy; QoS marking for ICA/HDX; jumbo frames on storage networks [C-1 jargon].
- **WAN:** ICA RTT budgets per site; application-aware routing and path conditioning (forward error correction) for remote clinics; Citrix recommends separate sites instead of zones when zone latency exceeds 250 ms RTT [C-38].
- **Visibility:** DEM for session RTT, logon duration, and synthetic EHR transactions; flow telemetry and packet capture at tier boundaries; end-to-end path tracing from the clinician endpoint to the database [C-1 jargon].
- **Orchestration:** change windows; configuration drift detection; infrastructure as code; automated failover runbooks; canary rollouts for endpoint agents [C-1 jargon].

#### MTTx and other metrics
| Metric | Figure | Source |
|---|---|---|
| ICA RTT default thresholds | Warning 300 ms; critical 400 ms (dynamic thresholds computed weekly at P70/P90) | [C-37] |
| Session network latency thresholds | Warning 150 ms; critical 250 ms | [C-37] |
| Logon duration thresholds | Warning 40 s; critical 70 s | [C-37] |
| ICA latency user perception bands | 0 to 150 ms optimal; 150 to 300 acceptable; over 300 degraded (VENDOR-REPORTED) | [C-39] |
| SSO login time | First-of-shift 34.6 s to 29.3 s; reconnect 29.3 s to 8.9 s | [C-77] |
| CrowdStrike event recovery (MTTR proxy) | 58.1% of services recovered within 6 hours; 7.8% took over 48 hours; median hospital downtime about 5 hours | [C-64][S-81] |
| Unplanned downtime prevalence | 96% of institutions in 3 years; 70% had one over 8 hours (2014) | [C-79] |
| Top cause of network outages | Configuration/change management failure, 34% | [C-81] |
| Mean time to innocence | **No published number.** Proposed KPI: time to prove the EHR application tier, storage, VDI, Wi-Fi, WAN, and identity are or are not the cause of a "slow EHR" ticket. | [C-gaps 3] |
| Epic Hyperspace network latency requirement | **Gap.** No public EHR vendor latency requirement found. | [C-gaps 1] |

#### Quantified cost
- Up to $1 million per hour in lost charges for a large hospital (ESTIMATE, quoted 2018) [C-78].
- $634 per physician per hour of unplanned downtime (ESTIMATE, cited 2017) [C-80].
- 57% of organizations said their last major outage cost more than $100,000; 1 in 5 said more than $1 million (all industries, 2025) [C-82].
- SSO saved $168,474 per hospital per year in clinician time (ESTIMATE of dollar value from wage rates, peer-reviewed study, 2018 data) [C-77].
- **Gap:** no 2023 to 2026 peer-reviewed or Ponemon figure for EHR downtime cost per hour [C-gaps 2].

#### Compliance hooks
- Joint Commission EM.13.01.01 continuity of operations, EM.14.01.01 disaster recovery, EM.15.01.01 drills [C-19].
- HIPAA NPRM (proposed): 72-hour restoration, criticality analysis, technology asset inventory and network map [C-13].
- CMS Conditions of Participation for emergency preparedness: all-hazards plan including cyberattacks, reviewed yearly [S-38][S-39].
- HHS CPGs and HICP practices for privileged access and backups [S-25][S-27].

#### Relevant 2023 to 2026 outages
- **CrowdStrike faulty update, July 19, 2024:** 759 of 2,232 scanned U.S. hospitals (34.0%) showed disruptions; 239 of 1,098 disrupted services were patient-facing, including EHR access, imaging, fetal monitoring, and transfer portals. CrowdStrike disputes the methodology [C-64][C-65].
- **Lurie Children's, January 31, 2024:** Epic and MyChart offline; Epic restored March 4, 2024 (about 33 days) [C-69].
- **Ascension, May 2024; Kettering Health, May 2025; UMMC, February 2026:** EHR plus phones and other systems down for days to weeks (see use case 3 and the Security pillar incident file) [C-11][C-62][S-102].

---

### Use case 2: IoMT and medical device security plus visibility

#### Pillars touched
- **Security:** devices with known exploited vulnerabilities, no agents, long lifespans [C-24][C-25].
- **Facilities:** a typical hospital has about 10 to 15 medical devices per bed, so a 1,000-bed hospital could hold about 15,000 devices [F-23]; building systems share the same risk patterns [F-16].
- **AI:** AI-enabled devices (more than 1,600 FDA authorizations) join the same device networks [C-58].

#### Business problem and why it matters now
Hospitals run large fleets of networked infusion pumps, patient monitors, imaging modalities, and lab analyzers that often run legacy or unsupported operating systems, cannot host endpoint agents, and stay in service for a decade or more; device hardware can stay in service 10 to 30 years while software support ends much sooner [C-2 problem statement][F-22]. Research consistently finds known exploited vulnerabilities on devices in nearly every hospital, and some devices are reachable from the internet or bridge guest and clinical networks [C-25][C-26]. Because devices cannot be patched quickly, the practical controls are asset visibility, segmentation, and compensating network policy [C-2 problem statement]. Why now: FDA section 524B (effective March 29, 2023) and FDA premarket guidance (final June 27, 2025, superseded by a February 3, 2026 version) require SBOMs and vulnerability management for new cyber devices, but the installed base predates those rules; ECRI lists legacy-device cybersecurity as hazard #8 for 2026 [C-21][S-29][S-30][C-27].

#### Impact
| Dimension | Impact | Source |
|---|---|---|
| Patient outcomes | ECRI 2026: an attack "could block access to patient data, force staff to alter workflows, or render devices or systems unavailable," leading to delayed or inappropriate care. | [C-27] |
| Revenue | 31% of organizations with medical device incidents reported up to 12 hours without critical systems (VENDOR-REPORTED aggregated list; original source not verified). | [C-96] |
| Clinical workflow | Taking pumps or monitors offline forces manual pump programming and manual vitals charting. | [C-2 impact] |
| Operational workflow | Biomedical engineering and IT must jointly inventory, risk-rank, and segment devices; ECRI recommends segmenting or disconnecting legacy devices and planning replacement. | [C-27] |
| Compliance and risk | FDA 524B requires cyber device makers to provide an SBOM, postmarket vulnerability monitoring, and patch processes. | [C-21][C-22][C-23] |
| Staff experience | Device workarounds add manual documentation on top of the 35% of shift time nurses already spend documenting. | [C-59] |

#### Today journeys
**Patient.** A post-surgical patient is on a smart infusion pump that normally receives its order from the EHR (auto-programming) and logs doses back. Overnight, security isolates the pump segment after an alert, and the pump keeps infusing but stops talking to the server. The patient notices two nurses at the bedside reading the bag label aloud and double-checking the rate by hand, and the morning dose is late because the second nurse was on another hall.

**Engineering (NetOps/SecOps).** SecOps sees SMB traffic from an address in the infusion pump VLAN toward a file server it has never talked to. The asset inventory says the address is a pump; the CMMS says that pump was retired last year; the MDS2 form on file says the pump's server runs an older Windows version and does not support an agent. Nobody can install EDR on it, and nobody wants to pull every pump in the building off the network on a Friday night. NetOps writes an emergency ACL limiting the segment to the drug library server, biomed confirms the pumps still function standalone, and the change goes in without a tested rollback plan because no lab environment exists.

**Clinical (ICU nurse).** In the ICU, the central monitoring station loses three bedside monitors after an unplanned switch reboot. The nurse at the station sees gray tiles instead of waveforms and has to walk to each bedside; the alarm escalation to her voice badge stops for those beds. She documents vitals manually at the interval the downtime policy requires and calls biomed, who calls IT, who asks whether the monitors are on the "medical device VLAN or the clinical VLAN."

#### Technical deep dive
- **Security:** SBOM and VEX ingestion; KEV, EPSS, and CVSS prioritization; compensating controls where patching is impossible; MDS2 review at procurement; NAC with 802.1X where supported and MAB for the rest; certificate-based device identity [C-2 jargon][S-33].
- **Network infrastructure:** HICP calls for medical devices on "dedicated, highly-restricted networks" with traffic limited to what operation requires and vulnerability scanners kept away from clinical devices [F-12]; VLAN/VRF isolation; security group tags; dedicated medical device SSIDs; DHCP fingerprinting; NIST SP 1800-8 nine-zone infusion pump reference design [F-14].
- **WAN:** device manufacturer remote-support paths; inbound remote access brokering; site-to-site tunnels to device vendors; HICP warns about unattended vendor sessions [C-2 jargon][S-27].
- **Visibility:** passive asset discovery; deep packet inspection of clinical protocols (DICOM, HL7, proprietary pump protocols); device risk scoring; CMMS integration; HICP suggests a monthly count of medical devices not segmented [C-2 jargon][S-27].
- **Orchestration:** policy automation from asset classification; quarantine playbooks; change control co-owned with biomed; recall and advisory ingestion [C-2 jargon].

#### MTTx and other metrics
| Metric | Figure | Source |
|---|---|---|
| Organizations with KEV-affected devices | 99% (2.25 million IoMT devices, 351 organizations, 2025; VENDOR-REPORTED) | [C-25] |
| Organizations with ransomware-linked KEVs plus insecure internet connectivity | 89% (2025; VENDOR-REPORTED) | [C-25] |
| Imaging devices with KEVs | 28% (2025; VENDOR-REPORTED) | [C-25] |
| Medical devices with at least one KEV; on unsupported OS | 23%; 14% (2023 data; VENDOR-REPORTED) | [C-26] |
| Hospitals with devices bridging guest and internal networks | 22%; 4% of surgical devices reachable from guest (2023 data; VENDOR-REPORTED) | [C-26][F-23] |
| Infusion pumps with known security gaps | 75% of 200,000 analyzed (2025; VENDOR-REPORTED) | [C-24] |
| Vulnerability dwell time on devices | 3.2 years average (2025; VENDOR-REPORTED) | [C-24] |
| Share of assets that are IoMT, IoT, OT, or unmanaged | About 50%; over 2,500 IoMT devices per organization (2024; VENDOR-REPORTED) | [F-25] |
| Critical vulnerability remediation (all sectors) | 26% fully remediated; 43-day median to fix (2025) | [S-7] |
| Device MTTD, device patch latency, device MTTR | **Gap.** No neutral published benchmark. | [C-gaps 8] |
| Mean time to innocence | **No published number.** Proposed KPI: time to prove whether a pump or monitor problem is the device, its server, the pump VLAN or SSID, NAC policy, or the EHR integration engine. | [C-gaps 3] |

#### Quantified cost
- No neutral cost per device-related incident was found (Gap).
- Up to 12 hours without critical systems for 31% of organizations with device incidents (VENDOR-REPORTED, original source not verified) [C-96].
- Indirect cost flows through downtime and diversion (see use case 3).

#### Compliance hooks
- FDA 524B: SBOM, vulnerability monitoring plan, update processes for cyber devices; FDA recommends machine-readable SBOMs with NTIA baseline attributes and end-of-support dates [C-21][S-31].
- MDS2 (ANSI/NEMA HN 1-2019) at procurement [S-32].
- IEC 80001-1:2021: risk management for connecting devices to shared networks [F-28].
- HICP 6.M.B zoning and the monthly unsegmented-device metric [S-27]; CPG Enhanced goal for segmentation [S-25].
- HIPAA NPRM (proposed): technology asset inventory, network map, segmentation [C-13].

#### Relevant 2023 to 2026 outages
- ECRI 2026 hazard #8 (legacy device cybersecurity) and #2 (digital darkness) [C-27].
- **Gap:** no widely confirmed 2023 to 2026 U.S. patient harm event attributed solely to a compromised infusion pump or monitor was found [C-gaps 12].

---

### Use case 3: Ransomware resilience and downtime procedures

#### Pillars touched
- **Security:** the dominant operational threat; identity, segmentation, backups, detection [S-6][C-86].
- **Facilities:** diversion, paper downtime, building and OT continuity; the facility must operate off-network [S-17][F-17].
- **AI:** AI services and data pipelines go dark with everything else, and must be restored in sequence.

#### Business problem and why it matters now
Ransomware removes the EHR, phones, pharmacy, lab, and imaging at the same time, forcing paper downtime, ambulance diversion, and cancelled procedures for weeks [C-3 problem statement]. Recovery depends on clean, isolated backups, the ability to contain lateral movement, and rehearsed downtime procedures, yet healthcare's use of backups to restore fell to 51% in 2025 (VENDOR-REPORTED survey) [C-86]. Effects spread to neighboring hospitals that absorb diverted patients [C-17]. Why now: 2024 to 2026 brought multi-week outages at major systems (Ascension, Kettering, Lurie, Synnovis, UMMC), the Joint Commission expects four-plus week offline readiness, and the proposed HIPAA rule would require 72-hour restoration [C-19][C-13].

#### Impact
| Dimension | Impact | Source |
|---|---|---|
| Patient outcomes | In-hospital mortality for already-admitted Medicare patients rose roughly 20% to 35% during attacks (2016 to 2021 data). Synnovis: one patient death linked in part to a long wait for a blood test result; severe-harm cases reported. | [C-15][C-16][C-68][S-74] |
| Revenue | Medicare revenue fell 19% to 41% in the attack week. Ascension reported a FY24 operating loss of $1.8 billion "including the cyber impact." Synnovis direct losses GBP 32.7 million. | [C-15][C-10][C-66] |
| Clinical workflow | Adjacent ED: median waiting-room time 21 to 31 minutes; admitted-patient ED length of stay 614 to 822 minutes; left without being seen 158 to 360. | [C-17] |
| Operational workflow | Revenue cycle stops: Ascension cited delays in insurance verification, claims submission, and payment processing, with some downtime claims still in process months later. | [C-98] |
| Compliance and risk | HIPAA NPRM: 72-hour restore, criticality analysis, written incident response plans. Joint Commission EM.11.01.01 hazard vulnerability analysis must include cyberattacks. | [C-13][C-19] |
| Staff experience | ECRI 2026: working under downtime procedures "can increase the risk of errors and lead to burnout." | [C-27] |

#### Today journeys
**Patient.** An older adult with sudden slurred speech is in an ambulance that was heading to the nearest stroke center. The hospital has declared a cyber downtime and gone on diversion, so the crew reroutes to a hospital farther away. That ED is absorbing its neighbor's volume: in the San Diego case, stroke code activations rose from 59 to 103 and median waiting-room time from 21 to 31 minutes [C-17]. Across town, a cancer patient's scheduled chemotherapy is cancelled because the infusion center cannot verify orders, and her retail pharmacy cannot fill a prescription because the e-prescribing link is down (as at Signature Healthcare in April 2026 [S-103][S-104]).

**Engineering (NetOps/SecOps).** In the early morning hours the SOC sees mass file renames on a file server and a domain controller pushing a new scheduled task. The incident commander activates HICS, and the CIO makes the call to sever internet connectivity and disable site-to-site tunnels, which also takes down the cloud-hosted phone system and the e-prescribing interface. The identity directory is suspected to be compromised, so rebuilding requires a clean room, known-good backups, and new credentials for every privileged account. The team restores systems by criticality tier (identity, then communications, then EHR, then ancillaries) while the FBI and outside forensics firms image hosts. Kettering found attackers had been inside since April 9 before the May 20 encryption [S-84].

**Clinical (nurse, pharmacist, radiology tech).** The nursing supervisor pulls the downtime binders. Nurses work from a paper MAR printed from the last BCA snapshot, physicians handwrite orders, and runners carry paper requisitions to the lab and printed results back. At Ascension, runners carried printed scans to surgeons [S-60]. Pharmacy verifies every order by phone, and the radiology tech hands a CD to a courier because PACS cannot route studies. At shift change, nobody is sure which doses were given after the last snapshot, so nurses reconcile by hand from the paper record.

#### Technical deep dive
- **Security:** immutable or air-gapped backups; clean-room recovery; EDR/XDR; identity threat detection; tiered admin model separating user and privileged accounts; MFA on all remote access; tabletop exercises; CISA's Interlock advisory recommends segmentation, MFA, patching, and DNS filtering [C-3 jargon][S-93].
- **Network infrastructure:** segmentation to limit blast radius; pre-built isolation zones; out-of-band management; kill-switch ACLs; recovery VLANs [C-3 jargon]. HICP calls stopping assets in one general-access network from talking to another "a critical control against ransomware spread" [S-27].
- **WAN:** emergency carrier diversity; internet breakout isolation; regional failover so one region can be cut off without darkening the system (Prospect's multi-state outage is the counterexample) [C-3 jargon][S-86].
- **Visibility:** NDR; DNS telemetry; east-west flow analytics; centralized log collection that survives the outage; honeypots and canary credentials [C-3 jargon].
- **Orchestration:** SOAR playbooks; automated quarantine; restoration sequencing by criticality tier; HICS downtime declaration workflows [C-3 jargon].

#### MTTx and other metrics
| Metric | Figure | Source |
|---|---|---|
| MTTI (IBM mean time to identify), global | 183 days (2026); 181 days (2025) | [C-1] |
| MTTC (mean time to contain), global | 64 days (2026); 60 days (2025) | [C-1] |
| Healthcare breach lifecycle | 279 days (2025; no 2026 healthcare figure) | [C-2][S-gaps 2] |
| Lifecycle when found internally | 209 days (2026, global) | [S-3] |
| MTTD proxy: median dwell time | 14 days (2026, global, up from 11) | [S-8] |
| Detected internally | 52% of all cases; 41% of ransomware cases (2026) | [S-9] |
| MTTR: ransomware recovery within a week | 58% (2025; 21% in 2024; VENDOR-REPORTED) | [C-86] |
| MTTR: within three months | 97% (2025; VENDOR-REPORTED) | [C-86] |
| MTTR: full breach recovery | 42% fully recovered; 19% needed over 150 days (2026) | [S-3] |
| Healthcare downtime durations | Ascension EHR about 6 to 7 weeks (C) or 37 days to full restore (S); Kettering Epic 13 days, normal ops about 3 weeks; Lurie Epic about 33 days; Synnovis about 6 months; Brockton diversion 9 days; UNM about 2 days | [C-11][S-60][C-62][C-69][C-67][C-71][S-109] |
| MTTA, MTTK | **Gap.** No published healthcare benchmark. | [S-gaps 1] |
| Mean time to innocence | **No published number.** Proposed KPI here: during an active incident, time to establish which segments (EHR, PACS, pump VLAN, building systems, clinic WAN) are clean and can stay connected, which shrinks the blast radius of a "shut everything off" decision. | [S-gaps 1] |

#### Quantified cost
| Organization | Cost | Source |
|---|---|---|
| Change Healthcare / UnitedHealth Group | $3.09 billion in 2024; $799 million more in Q4 2025; $22 million ransom | [C-9][S-54][S-52] |
| Ascension | FY24 operating loss of $1.8 billion including cyber impact; about $130 million in response costs; no standalone total disclosed | [C-10][S-60][C-gaps 5] |
| CommonSpirit (2022) | $150 million, later raised to $160 million | [S-65][S-66] |
| Ardent | About $74 million pre-tax impact in 2023 | [S-70] |
| DaVita | $13.5 million in Q2 2025; $25 million for 2025; $15 million class-action settlement | [S-90][S-91] |
| Synnovis | GBP 32.7 million direct losses in 2024 | [C-66] |
| Healthcare ransomware averages | Average recovery cost $1.02 million; median ransom paid $150,000; 36% paid (2025; VENDOR-REPORTED) | [C-86] |
| Most significant attack (survey) | $3.9 million (2025, Ponemon) | [S-11] |

#### Compliance hooks
- HIPAA NPRM (proposed): 72-hour restoration, criticality analysis, written incident response plans, separate backup controls; business associates to report contingency plan activation within 24 hours [C-13][S-19].
- Joint Commission EM.11.01.01 (HVA including cyber, reviewed every 2 years), EM.13, EM.14, EM.15 [C-19][S-18]; Sentinel Event Alert 67 four-week planning horizon [C-19]; voluntary CRR program [S-14].
- CMS emergency preparedness CoP [S-38].
- New York 10 NYCRR 405.46: CISO, MFA, incident response, report within 72 hours (full compliance October 2, 2025) [S-45][S-46].
- OCR enforcement: 19 ransomware settlements by April 2026; Lehigh Valley Health Network $800,000 (October 29, 2026) [S-23][S-24].

#### Relevant 2023 to 2026 outages
Change Healthcare (February 2024), Lurie Children's (January 2024), Ascension (May 2024), Synnovis (June 2024), Kettering Health (May 2025), DaVita (April 2025), UMMC (February 2026), Signature Healthcare Brockton (April 2026), University Hospitals Cleveland (October 2026), UNM Health (October 2026). Each is summarized in the Security pillar incident file in `part-a2.md` [C-8][C-62][C-66][C-69][C-71][C-73][S-100][S-105].

---

### Use case 4: Clinical mobility and Wi-Fi reliability

#### Pillars touched
- **Facilities:** RF design, AP density, cabling, closet power, WMTS versus Wi-Fi [F-32][F-41][F-64].
- **Security:** WPA3, 802.1X/EAP-TLS, encryption settings that change roaming behavior [C-40][C-45].
- **AI:** mobile EHR and ambient documentation apps ride the same WLAN [C-10 problem statement].

#### Business problem and why it matters now
Nurses, physicians, and support staff communicate through Wi-Fi voice badges and smartphones that carry nurse call alerts, alarms, secure messaging, and mobile EHR apps, so a coverage hole or slow roam becomes a missed alarm or a dropped call during a code [C-4 problem statement]. Voice clients have much stricter RF requirements than laptops (signal strength, SNR, DTIM, fast roaming) and are used in places surveys often ignore: stairwells, elevators, closets [C-4 problem statement]. One hospital network carried about 7,148 staff devices, 6,306 guest devices, 1,327 medical devices, 3,086 IoT devices, and 1,100 voice badges (2025 case study), so AP density is driven by capacity and voice roaming, not coverage alone (Analysis) [F-41]. Why now: WPA3 makes fast transition roaming mandatory for acceptable voice handoffs on some handsets, Wi-Fi 6E/7 refresh cycles are underway, and staffing shortages make every nurse minute valuable [C-45][F-42].

#### Impact
| Dimension | Impact | Source |
|---|---|---|
| Patient outcomes | Delayed alarm delivery to mobile devices delays response; roaming failures cause "audible clicks and other disturbances" on calls. Joint Commission reviewed 98 alarm-related sentinel events (2009 to 2012), 80 of them deaths, and believes these are under 10% of actual alarm-related harm (older). | [C-100][F-63] |
| Revenue | SSO and mobility time savings valued at $168,474 per hospital per year (19 hospitals, 2018 data; ESTIMATE of dollar value). | [C-77] |
| Clinical workflow | Nurses spend 21 to 60 minutes per shift searching for equipment (HIMSS summary of older studies). Call-light response averages about 3 to 4 minutes, with one hospital averaging 17 min 27 s (2009 to 2012). | [C-90][F-47][F-48][F-49] |
| Operational workflow | Voice-grade site surveys, AP power tuned to low-power badges, and channel planning are prerequisites. | [C-41][C-44] |
| Compliance and risk | Vocera badges do not support WEP, TKIP, or SAE; Ascom says 802.11r is mandatory for acceptable roaming with WPA3. | [C-40][C-45] |
| Staff experience | Equipment searching and chasing colleagues add non-clinical load on top of documentation time. | [C-59][C-90] |

#### Today journeys
**Patient.** An elderly patient presses the call button because she needs to get to the bathroom. The nurse call system pages the assigned nurse's badge, but the nurse is in the stairwell between floors and the badge is between access points, so the page arrives late. The patient tries to get up on her own. Published call-light response averages run about 3 to 4 minutes, and one hospital averaged over 17 minutes [F-47][F-48]; no cited source ties Wi-Fi delay to a specific fall (Gap).

**Engineering (NetOps).** The clinical communications team forwards a complaint: "badges drop calls on 5 East near the elevators." The wireless engineer pulls roaming analytics and finds the badges authenticate with WPA3-SAE without fast transition; Ascom's published interop data shows about 174 ms typical roam in that mode versus about 31 ms with FT [C-45], and the target for voice is under 100 ms, ideally under 50 ms [C-44]. Enabling 802.11r breaks an older barcode scanner on the same SSID, so the fix becomes a new SSID, a firmware compatibility matrix, and a change request co-signed by biomed and nursing informatics.

**Clinical (nurse).** During a rapid response, the charge nurse calls pharmacy from her badge while walking the patient to the elevator. The call goes choppy, then silent. She runs back to the nurse station to use a desk phone. Earlier in the shift she spent time hunting for a free infusion pump; the RTLS screen showed one "on 5 East," but the tag's room-level accuracy did not tell her which room [F-45].

#### Technical deep dive
- **Security:** WPA3-Enterprise; 802.1X/EAP-TLS with device certificates; PMF (802.11w); OKC and FT key caching; MDM for shared smartphones. Authentication choice changes association delay: EAP-FAST about 200 ms, PSK under 100 ms (VENDOR-REPORTED requirement) [C-40][C-43].
- **Network infrastructure:** 802.11r/k/v; DTIM 1 with 100 ms beacon (DTIM x beacon must not exceed 108 ms for multicast audio); WMM/UAPSD; 20 MHz channels; AP transmit power 12 to 17 dBm to match badges; avoid DFS and channel bonding where possible; 6 GHz requires devices to support the full local channel set [C-40][C-42][C-46][F-40]. TIA-1179-B requires two Category 6A runs per AP [F-64].
- **WAN:** cloud-hosted clinical communications platforms; SIP trunking; survivability at remote sites [C-4 jargon].
- **Visibility:** voice-grade site surveys; RF analytics; roaming analytics; client health scores; RTLS heat maps [C-4 jargon].
- **Orchestration:** RF profile templates; automated channel and power control with voice-safe constraints; firmware compatibility matrices [C-4 jargon].

#### MTTx and other metrics
| Metric | Figure | Source |
|---|---|---|
| Voice coverage and SNR | -65 dBm minimum (two APs at -65 dBm recommended); SNR +25 dB (VENDOR-REPORTED requirement) | [C-40][C-41] |
| Roam time targets | Under 50 ms ideal; under 100 ms acceptable | [C-44] |
| Measured roams | WPA3-SAE without FT about 174 ms; with FT about 31 ms; WPA2-PSK with FT about 25 ms; 6 GHz handset about 83 ms (VENDOR-REPORTED) | [C-45][C-46] |
| Interactive voice one-way delay | 150 ms or less (ITU-T G.114) | [F-38] |
| Wi-Fi voice certification | Loss under 1%, no more than 3 consecutive lost packets, latency under 50 ms, jitter under 50 ms | [F-39] |
| Patient monitor to central station (one manufacturer) | Round-trip peak 800 ms or less; jitter 400 ms or less; 99.9% uptime over 24 hours; no gaps over 4 s; -65 dBm; SNR 15 dB (manufacturer requirement, not a standard) | [F-31] |
| Nurse call fault reporting | Within 15 seconds (UL 1069 via secondary summary) | [F-51] |
| RTLS accuracy (hospital trial, 2016) | Wi-Fi 1.21 m, 96% room; BLE 2.13 m, 79% room; ZigBee 1.99 m, 88% room | [F-45] |
| Clinical WLAN MTBF/MTTR | **Gap.** No published benchmark. | [C-gaps 7] |
| Mean time to innocence | **No published number.** Proposed KPI: time to prove whether a dropped badge call is RF coverage, roaming/authentication, the voice server, the PBX/SIP trunk, or the handset firmware. | [C-gaps 3] |

#### Quantified cost
- $168,474 per hospital per year in clinician time from SSO and mobility (ESTIMATE of dollar value, 2018 data) [C-77].
- 21 to 60 minutes per nurse per shift searching for equipment (older studies) [C-90].
- **Gap:** no published cost of a Wi-Fi outage in a hospital.

#### Compliance hooks
- NEC 517.34(A): wireless phone and paging equipment for clinical staff and clinical IT network equipment on the critical branch (added in the 2020 NEC) [F-53][F-54].
- UL 1069 for nurse call equipment [F-51].
- Joint Commission clinical alarm safety, moved from NPSG.06.01.01 to NPG.01.05.01 (secondary source; confirm) [F-62]; Physical Environment chapter effective January 1, 2026 [F-58].
- IEC TR 80001-2-3: no universal Wi-Fi threshold; each organization defines a clinical service level per device [F-29].
- HIPAA NPRM (proposed): encryption in transit [C-13].

#### Relevant 2023 to 2026 outages
- **Gap:** no public 2023 to 2026 incident specifically attributing patient harm to Wi-Fi voice failure [C-gaps 12].
- Downtime events routinely take phones and paging offline: Kettering (2025) call centers and phones [C-62]; UMMC (2026) phones and email failed alongside the EHR [S-102].

---

### Use case 5: Imaging and PACS data movement

#### Pillars touched
- **Facilities:** imaging suites, imaging centers, labs, and backhaul between sites [F-71][F-75].
- **Security:** DICOM exposure and vulnerable imaging devices [C-25][F-24].
- **AI:** 76% of FDA AI-enabled device authorizations are radiology; images move to AI engines [C-56].

#### Business problem and why it matters now
Imaging produces the largest clinical data objects in the hospital. A 2025 study measured CT studies at a median of 787 MB including reconstructions [F-72]; at one Swedish center CT studies grew from 229 to 765 MB and MRI from 84.7 to 216 MB between 2009 and 2022 [F-71]; digital pathology whole-slide images run about 1 GB per slide at 40x [F-75]. Moving studies among modalities, PACS, VNAs, remote readers, AI engines, and cloud archives makes WAN bandwidth and storage throughput a direct determinant of report turnaround [C-5 problem statement]. Time-critical pathways (stroke, PE, trauma) depend on images reaching a radiologist within minutes [C-89]. Why now: radiology dominates AI authorizations, cloud PACS and teleradiology are expanding, and digital pathology multiplies data volume [C-56][F-75].

#### Impact
| Dimension | Impact | Source |
|---|---|---|
| Patient outcomes | Target: Stroke Phase III: door-to-needle within 60 minutes for 85% or more, within 45 minutes for 75% or more; door-to-device within 90 minutes (direct) or 60 minutes (transfer) for 50% or more. Every 4 minutes of door-to-reperfusion delay means 1 in 100 treated patients has worse disability (HERMES, 2016, older). | [C-89][A-27] |
| Revenue | Imaging downtime halts outpatient imaging; Kettering's 2025 outage stopped imaging until normal operations resumed June 10. | [C-62] |
| Clinical workflow | AI triage cut PE-positive CTPA report turnaround during work hours from 68.9 to 46.7 minutes; off-hours change not significant (44.8 to 42.0). | [C-50] |
| Operational workflow | A department doing 500 studies per day generates roughly 150 GB to 1 TB of new imaging daily (ESTIMATE). Scanning 300 slides a day needs about 50 TB for a six-month pathology archive. | [C-48][F-75] |
| Compliance and risk | 28% of imaging devices carry KEVs (2025; VENDOR-REPORTED); imaging was 32% of unsupported devices (2023 data; VENDOR-REPORTED). | [C-25][S-34] |
| Staff experience | **Gap.** No quantified neutral source on how slow image loads affect radiologist burnout. | [C-5 impact] |

#### Today journeys
**Patient.** A man with a suspected large-vessel occlusion gets a CT angiogram at a community hospital that will transfer him for thrombectomy. The study has to reach the comprehensive stroke center's neurointerventionalist, but the community hospital's WAN link is saturated by the overnight prefetch of prior studies for the morning outpatient schedule. The images take long enough that the transfer team calls to ask "did it send?" twice. The transfer door-to-device goal is 60 minutes for 50% or more of patients [C-89].

**Engineering (PACS admin and NetOps).** The PACS administrator sees DICOM associations from one modality retrying, and blames the network. NetOps sees the link at saturation and blames the PACS prefetch rules. The VNA team notes a cloud AI engine is also pulling every CT for triage. There is no single view of study-level latency from modality to reading workstation, so the teams argue from their own logs. The fix (QoS for STAT studies, prefetch windows, and a separate path to the AI orchestrator) takes a week of change requests.

**Clinical (radiologist and CT tech).** A radiologist reading remotely clicks a STAT head CT and waits while the series streams in slice by slice; she opens a less urgent study to stay productive and returns later. The CT tech, meanwhile, cannot confirm the study arrived because the modality worklist is out of sync. During a full outage the fallback is physical: at Ascension, runners carried printed scans to surgeons [S-60].

#### Technical deep dive
- **Security:** DICOM TLS; DICOMweb over HTTPS with OAuth; de-identification before cloud AI (HIPAA Safe Harbor or Expert Determination) [A-59]; PACS segmentation per NIST SP 1800-24 (zoning limited to the minimum necessary) [F-15]; modality allowlisting [C-5 jargon].
- **Network infrastructure:** 10/25/40 GbE to modalities and archives; storage fabrics; jumbo frames; lossless versus lossy JPEG 2000; edge caching [C-5 jargon]. OR video at uncompressed 4K60 needs about 10.4 Gbps on the wire over ST 2110, so plan on 25GbE per path [F-77].
- **WAN:** WAN optimization; bandwidth reservation for imaging; cloud interconnects; teleradiology paths; prefetch scheduling [C-5 jargon]. An 8K endoscope feed was compressed from 48 Gbps to 300 Mbps for a 68 km inter-hospital link with about 0.15 s latency [F-78].
- **Visibility:** DICOM association and transfer telemetry; study-level latency tracking; worklist analytics [C-5 jargon].
- **Orchestration:** DICOM routing rules; VNA lifecycle policies; AI orchestration platforms; autoscaling cloud ingestion. In one PE deployment, images went CT to PACS to an on-prem AI orchestrator, which sent de-identified DICOM to a cloud AI tool that reprioritized the worklist [C-5 jargon][A-25].

#### MTTx and other metrics
| Metric | Figure | Source |
|---|---|---|
| Report TAT with AI triage (PE, work hours) | 68.9 to 46.7 minutes | [C-50] |
| Report TAT with AI triage (PE, another study) | 59.9 to 47.6 minutes | [A-25] |
| Report TAT with AI triage (ICH) | 147.1 vs 149.9 minutes (no improvement) | [C-51] |
| Stroke AI triage (cluster randomized trial) | Door-to-groin cut 11.2 minutes; CT-to-treatment cut 9.8 minutes; no significant difference in functional independence | [A-23] |
| Cloud stroke AI transmission plus analysis | Under 5 minutes average | [A-23] |
| Transfer time (arithmetic) | 1 GB CT over 100 Mbps at 70% usable: about 114 s; over 1 Gbps: about 11 s; 1.3 GB WSI over 1 Gbps: about 15 s (ESTIMATE) | [C-101] |
| PACS availability, image retrieval/prefetch latency | **Gap.** No neutral benchmark. No standards-body latency target for DICOM. | [C-5 MTTx][F-gaps 1] |
| Mean time to innocence | **No published number.** Proposed KPI: time to prove whether a slow study is the modality, PACS or VNA storage, the AI orchestrator, the WAN link, or the reading workstation. | [C-gaps 3] |

#### Quantified cost
- Each minute faster endovascular treatment yields a median net monetary benefit of 309 euros (Netherlands model; no U.S. dollar figure found) [A-29].
- Each minute saved gives on average 4.2 days of extra healthy life (Neurology, 2017, older) [A-28].
- **Gap:** no U.S. cost per minute of imaging delay or per hour of PACS downtime.

#### Compliance hooks
- HIPAA de-identification (Safe Harbor, Expert Determination) for images sent to external AI [A-59][A-60].
- BAAs with cloud PACS and AI vendors [A-57].
- HIPAA NPRM (proposed): encryption in transit, network map of ePHI flows [C-13].
- NIST SP 1800-24 PACS reference architecture (2020) [F-15].
- FDA 524B for imaging modalities as cyber devices [C-21].

#### Relevant 2023 to 2026 outages
- CrowdStrike event (July 2024): imaging platforms among disrupted patient-facing services [C-64].
- Kettering Health (2025): imaging restored only when normal operations resumed [C-62].
- Ascension (2024): imaging down; printed scans carried by runners [S-60].

---

### Use case 6: Telehealth, virtual care, and hospital-at-home

#### Pillars touched
- **Facilities:** the home becomes a care space; hospital-at-home requirements set response times [F-83].
- **Security:** device identity for home kits, encryption, BAAs with platform providers [C-6 jargon].
- **AI:** RPM analytics and virtual nursing tools increasingly run on AI (no cited adoption figure; Gap).

#### Business problem and why it matters now
Care now extends into patients' homes through video visits, remote patient monitoring, and inpatient-level AHCAH, so clinical service quality depends on consumer broadband, cellular links, and cloud platforms the hospital does not own [C-6 problem statement]. Hospital-at-home carries inpatient acuity, so telemetry, video, and escalation paths need hospital-grade reliability and monitoring [C-6 problem statement]. Why now: Congress extended Medicare telehealth flexibilities through December 31, 2027 and AHCAH through September 30, 2030; 358 CCNs are approved; RPM spending keeps growing and OIG is scrutinizing RPM billing [C-28][C-29][C-32][C-35][C-36].

#### Impact
| Dimension | Impact | Source |
|---|---|---|
| Patient outcomes | CMS study (332 hospitals, November 2020 to July 2024): hospital-at-home beneficiaries generally had lower 30-day mortality than comparable inpatients. Cone Health reported zero deaths and zero care-associated infections in its first program year (self-reported). | [F-81][F-82][C-31] |
| Revenue | Medicare paid $536 million for RPM in 2024, up 31%. Post-discharge 30-day Medicare spending about 20% lower for most top-25 diagnosis groups in hospital-at-home. | [C-35][F-81] |
| Clinical workflow | About 4,600 practices routinely billed RPM in 2024, each covering about 70 enrollees. | [C-35] |
| Operational workflow | AHCAH waivers are per CCN; experienced hospitals submit monitoring data monthly; at least two in-person RN or paramedic visits daily. | [C-29][F-83] |
| Compliance and risk | OIG flagged RPM billing patterns; from January 1, 2028 non-behavioral Medicare telehealth generally reverts to rural, facility-based originating sites absent new legislation. | [C-36][C-34] |
| Staff experience | **Gap.** Not quantified in neutral sources for virtual care staff. | [C-6 impact] |

#### Today journeys
**Patient.** A woman with a COPD exacerbation is admitted to hospital-at-home. A courier sets up a tablet, a pulse oximeter, a blood pressure cuff, and a cellular hub in her living room, because programs prefer provider-supplied cellular over patients' own internet [F-87]. On day two her video visit freezes twice; she presses the on-demand audio button, which the waiver requires, and reaches a nurse who stays on the line while the video reconnects [F-83].

**Engineering (NetOps and clinical IT).** A ticket arrives: "Video visit failed, patient could not connect." The engineer has to consider the patient's cellular coverage, the hub, the video platform's cloud region, the hospital's security service edge, the clinician's home Wi-Fi, and the clinician's VPN. None of the home-side path is instrumented, so the ticket closes as "could not reproduce." No neutral benchmark exists for visit failure rate or home device data latency [C-6 MTTx].

**Clinical (virtual nurse).** In the virtual care command center, a nurse watches a panel of home patients' vitals. One patient's SpO2 tile goes gray. She must decide whether the patient is deteriorating or the cuff lost its Bluetooth link; the program requires a process for patients not reached within 15 minutes of a scheduled visit, and emergency personnel at the home within 30 minutes if needed [F-83]. In a Mayo Clinic cellular cardiac monitor pilot, 33.5% of alarms exceeding the 30-second threshold traced to damaged devices or inadequate cellular connections [F-37].

#### Technical deep dive
- **Security:** ZTNA for clinician access; device identity for home kits; encryption in transit; BAAs with platform providers; secure messaging [C-6 jargon].
- **Network infrastructure:** LTE/5G cellular gateways for home kits; Wi-Fi fallback; Bluetooth peripheral pairing; a rural Michigan RPM pilot using cellular devices saw a failure rate under 10%, with connectivity far less of a barrier than with Bluetooth devices [C-6 jargon][F-88].
- **WAN:** SASE and SSE; secure web gateway; direct internet access; cloud on-ramps; per-application SLAs [C-6 jargon].
- **Visibility:** DEM; endpoint and ISP path monitoring; synthetic video/RTC tests; MOS scores; jitter, loss, and latency per session [C-6 jargon].
- **Orchestration:** kit provisioning logistics; automated escalation workflows; command center integration [C-6 jargon].

#### MTTx and other metrics
| Metric | Figure | Source |
|---|---|---|
| AHCAH participation | 358 CCNs, 134 systems, 37 states (CMS, October 19, 2026); trade press 365 campuses across 137 systems; AMA 366 programs across 139 systems | [C-28][F-84][F-85] |
| Patients served | Over 31,000 by October 2024 | [F-81] |
| Required response times | Emergency personnel within 30 minutes; process for patients unreachable within 15 minutes | [F-83] |
| Medicare RPM | Nearly 1 million enrollees in 2024 (+27%); 10,388 practices billed at least one RPM service | [C-35] |
| Cellular RPM failure rate (rural pilot) | Under 10% | [F-88] |
| Visit failure rate, RPM alert-to-escalation time, home data latency | **Gap.** No neutral benchmark. | [C-6 MTTx] |
| Mean time to innocence | **No published number.** Proposed KPI: time to prove whether a failed visit or missing reading is the patient's device, home cellular or ISP, the platform cloud, the SSE path, or the clinician's endpoint. | [C-gaps 3] |

#### Quantified cost
- $536 million in Medicare RPM payments in 2024 [C-35].
- About 20% lower 30-day post-discharge Medicare spending for most top-25 hospital-at-home diagnosis groups [F-81].
- **Gap:** no published cost of failed virtual visits.

#### Compliance hooks
- AHCAH waiver conditions: per-CCN request; daily in-person visits and vitals; on-demand audio; 30-minute emergency response [C-29][F-83].
- Telehealth flexibilities through December 31, 2027, and reversion rules from January 1, 2028 [C-32][C-34].
- OIG RPM billing scrutiny [C-36].
- BAAs with telehealth and RPM vendors [A-57].

#### Relevant 2023 to 2026 outages
- CrowdStrike event (July 2024): remote patient monitoring tools and patient access platforms among disrupted services [C-64][C-65].

---

### Use case 7: Multi-site WAN, M&A integration, and clinic connectivity

#### Pillars touched
- **Facilities:** clinics, ASCs, imaging centers, CAHs, and acquired sites [F-2][F-4][F-6].
- **Security:** acquired networks import risk; third-party connectivity is part of every perimeter [F-10][F-70].
- **AI:** AI services must reach every site; cloud AI raises WAN dependence (Analysis).

#### Business problem and why it matters now
There are 397 U.S. health systems; 68% of hospitals and 77% of beds are system-affiliated, and systems range from 1 to 157 hospitals [F-2]. Each clinic, ASC, imaging center, and lab needs EHR, imaging, voice, and device connectivity with hospital-grade availability [C-7 problem statement]. Mergers add networks with different addressing, security postures, identity stores, and unknown device inventories that must be connected without importing risk [C-7 problem statement]. Why now: 46 hospital deals were announced in 2025 with a record 43.5% involving a distressed party (whose IT is often under-invested), outpatient visits rose 9.8% in 2025, and outpatient services rose from 52% of hospital revenue in 2020 to 57% in 2024 [C-75][C-7][F-8].

#### Impact
| Dimension | Impact | Source |
|---|---|---|
| Patient outcomes | Clinic outages delay visits and refills; CrowdStrike-era disruptions included inter-hospital transfer portals. | [C-64] |
| Revenue | 2025 hospital M&A transacted revenue $18.5 billion, the lowest since Kaufman Hall began tracking. Change Healthcare: about 60% of affected hospitals reported revenue impact of $1 million per day or more. | [C-75][F-70] |
| Clinical workflow | Outpatient visits up 9.8% in 2025; 2034 forecast: outpatient volume up 17%, home-based services up 22%. | [C-7][F-9] |
| Operational workflow | One health system replaced dedicated links with multi-carrier broadband SD-WAN at more than 200 sites and reported up to 33% fewer hardware-caused outages (VENDOR-REPORTED). | [C-88] |
| Compliance and risk | In an OCR case, an acquired practice left on its own network suffered three ransomware attacks in two months about 18 months post-acquisition (85,000 patients); the acquirer was held responsible (law-firm summary; verify). | [F-10] |
| Staff experience | **Gap.** Not quantified in neutral sources. | [C-7 impact] |

#### Today journeys
**Patient.** A patient arrives at a family medicine clinic that her health system acquired recently. The front desk can see her in the old practice management system but not in the system's EHR, so she fills out a paper history again. Her referral to cardiology is faxed, and the imaging she had at the hospital last week is not visible to her clinic physician.

**Engineering (NetOps/SecOps).** On Day 1 of integration, the network team discovers the acquired group uses the same 10.x address space as the parent system, runs a flat network with printers, cameras, and an X-ray unit on one VLAN, and has open Remote Desktop Protocol to the internet (the pattern in the OCR case [F-10]). The safe move is to quarantine the acquired network behind a firewall and migrate site by site, but the business wants single sign-on and EHR access within weeks. A new clinic circuit takes weeks to order; a broadband plus LTE branch with zero-touch provisioning is faster, if the security baseline is ready.

**Clinical (medical assistant and physician).** The medical assistant at the rural clinic loses the EHR when the clinic's single circuit fails during a storm; the clinic switches to paper encounter forms and calls patients to reschedule. At the critical access hospital down the road, a single WAN link carries transfers, teleconsults, and remote imaging reads, so it is a single point of failure for the facility (Analysis) [F-4].

#### Technical deep dive
- **Security:** isolate the acquired network, then migrate; overlapping IP remediation (NAT, re-addressing); identity federation; third-party risk assessment; security baselines before connection [C-7 jargon]. Breach likelihood doubles in the year before and after a hospital merger closes; over 30% of acquirers had a breach during integration (consulting source citing studies) [F-11].
- **Network infrastructure:** branch switching and Wi-Fi templates; PoE budgets for devices; redundant power; LTE/5G backup [C-7 jargon].
- **WAN:** SD-WAN with application-aware routing; dual carrier and diverse path; broadband plus MPLS hybrid; SASE/SSE; cloud on-ramps; QoS for ICA, voice, and imaging [C-7 jargon].
- **Visibility:** per-site and per-application SLA dashboards; ISP performance monitoring; path tracing; synthetic tests from clinics [C-7 jargon].
- **Orchestration:** zero-touch provisioning; golden configurations; policy templates per site type; change automation with rollback [C-7 jargon].

#### MTTx and other metrics
| Metric | Figure | Source |
|---|---|---|
| Hospital M&A | 46 announced (72 in 2024); 17 in Q4 2025 incl. four mega mergers; 43.5% distressed; 45.6% involved a divestiture | [C-75][F-7] |
| Network-caused outage causes (44% of 414 respondents had one) | Configuration/change management 34%; firmware/software 31%; hardware 26%; third-party provider and line breakage 17% each | [C-81] |
| Fiber and connectivity outages | Rising and more likely to cause extended disruptions (Uptime 2026) | [C-82] |
| Site onboarding time, circuit MTTR, per-site WAN availability | **Gap.** No neutral healthcare benchmark; a vendor case study reports "minutes-level onboarding" (VENDOR-REPORTED). | [C-88] |
| Clinic SD-WAN adoption | **Gap.** No vendor-neutral survey found. | [C-gaps 6][F-E] |
| Mean time to innocence | **No published number.** Proposed KPI: time to prove whether a clinic's "EHR down" is the local LAN, the circuit or ISP, the SD-WAN overlay, the SSE/security stack, or the data center application. | [C-gaps 3] |

#### Quantified cost
- About 60% of hospitals affected by Change Healthcare reported revenue impact of $1 million per day or more [F-70].
- A small physical therapy clinic in Yorkville, New York lost about $25,000 per week in cash flow during the Change Healthcare outage [S-58].
- 57% of organizations' last major outage cost over $100,000 (all industries) [C-82].

#### Compliance hooks
- HIPAA NPRM (proposed): network map of ePHI flows across sites and clouds; segmentation [C-13].
- HHS CPGs: segmentation (Enhanced); vendor/supplier requirements (Essential); third-party incident reporting (Enhanced) [S-25].
- Acquirer accountability for acquired entities' HIPAA compliance (OCR case via law-firm summary) [F-10].
- BAAs and business associate safeguards verification (NPRM proposed) [S-19].

#### Relevant 2023 to 2026 outages
- **Change Healthcare (2024):** stolen credentials on a remote access portal without MFA; nine days of lateral movement before ransomware [C-102][S-51].
- **CommonSpirit (2022, outside window, included for pattern):** shared IT spread impact to former affiliates still on its IT [S-67].
- **Prospect Medical (2023):** multi-state system with ED closures and diversion for about 40 days [S-86][S-89].
- **HealthAlliance (NY, October 2023):** unpatched remote-access appliance; ambulance diversion; $550,000 state fine [S-112].
- **Kettering Health (2025):** added segmentation, enhanced monitoring, and access controls during recovery [C-62][C-63].

---

### Use case 8: Identity, zero trust, and clinician access

#### Pillars touched
- **Security:** missing MFA and identity directory compromise drove the costliest recent incidents [S-51][S-64].
- **Facilities:** shared workstations in every clinical space; badge readers and physical access converge with logical access [F-16].
- **AI:** AI agents and AI vendors need identities and least privilege [A-79].

#### Business problem and why it matters now
Clinicians log in many times per shift on shared workstations, so authentication friction directly costs care time, while weak remote access (no MFA, shared vendor accounts) is a leading entry point for attackers [C-8 problem statement]. Health systems must make access faster for clinicians and stronger against attackers at the same time, including for vendors and business associates [C-8 problem statement]. Why now: Change Healthcare entered through a remote-access portal without MFA [S-51]; Synnovis was reportedly enabled by the absence of two-factor authentication [C-97]; Ascension began with one device and escalated to the central identity directory [S-64]; the NPRM would require MFA; and CPG Essential goals include MFA [C-13][S-25].

#### Impact
| Dimension | Impact | Source |
|---|---|---|
| Patient outcomes | Synnovis breach "reportedly enabled by the absence of two-factor authentication" led to patient-care incidents including severe harm. | [C-97][S-75] |
| Revenue | SSO saved $3,201,001 per year in clinician time across 19 hospitals ($168,474 per hospital; ESTIMATE of dollar value). | [C-77] |
| Clinical workflow | Reconnect login 29.3 s to 8.9 s with badge tap; 49,056.8 clinician hours per year freed enterprise-wide. | [C-77] |
| Operational workflow | NPRM would require notification within 24 hours when a workforce member's access is changed or terminated. | [C-13] |
| Compliance and risk | NPRM MFA with limited exceptions; CPG Essential: MFA, unique credentials, separate user and privileged accounts, revoke departing credentials. | [C-13][S-25] |
| Staff experience | Login friction contributes to EHR burden; 43.2% physician burnout (2024). | [C-87] |

#### Today journeys
**Patient.** A trauma patient arrives during an identity outage: the directory service is down, so the ED physician cannot sign in to order a CT. The charge nurse retrieves a sealed break-glass credential from the locked envelope in the department, and the order goes in under that account, which will need retrospective audit [S-114]. The patient's care proceeds, but every action is attributed to a shared emergency identity.

**Engineering (IAM and SecOps).** The identity team inventories third-party remote access after a peer system's breach and finds a device vendor using a shared account with no MFA, a session tool left in "unattended" mode (the HICP warning [S-27]), and dozens of accounts belonging to staff who left months ago. The joiner/mover/leaver process depends on a nightly HR file that fails silently. SecOps also sees impossible-travel logins for a physician who works at several hospitals in the system, some of which still run separate directories after a merger.

**Clinical (physician).** A hospitalist taps her badge on a shared workstation in the hallway outside a patient room and gets in quickly; HICP's model is a full login at shift start, then badge taps, with a session lock under 15 to 30 minutes [S-27]. To prescribe a controlled substance she has to complete a second factor on her phone, which is in her locker. At the recently acquired hospital across town she uses a different username and password entirely.

#### Technical deep dive
- **Security:** tap-and-go SSO with proximity badges; FIDO2/passkeys and phishing-resistant MFA; PAM with just-in-time elevation; vendor privileged access with session recording; ZTNA; conditional access; identity threat detection and response [C-8 jargon]. The 405(d) model is "one-person, one-identity, multiple contexts" with automated provisioning and deprovisioning [S-28].
- **Network infrastructure:** 802.1X wired and wireless; NAC posture; dynamic VLAN or policy assignment (practitioner framing; no primary healthcare source) [C-8 jargon][S-gaps 5].
- **WAN:** ZTNA replacing VPN concentrators; SSE; per-application tunnels for vendors [C-8 jargon].
- **Visibility:** authentication logs; impossible-travel analytics; UEBA; session recording for vendor access [C-8 jargon].
- **Orchestration:** joiner/mover/leaver automation from the HR system; access recertification; automated credential revocation [C-8 jargon].

#### MTTx and other metrics
| Metric | Figure | Source |
|---|---|---|
| Login time | First-of-shift 34.6 s to 29.3 s; reconnect 29.3 s to 8.9 s | [C-77] |
| Initial access in healthcare breaches (2026 DBIR) | Vulnerability exploitation 20%; phishing 14%; credential abuse 11% | [S-6] |
| Internal actors in healthcare breaches | 19% (2026) | [S-6] |
| Human element in incidents | 54%; misdelivery about 40% of human-error incidents | [S-7] |
| Access-change notification target | Within 24 hours (NPRM, proposed) | [C-13] |
| Session lock timeout guidance | Under 15 to 30 minutes | [S-27] |
| Identity-based MTTD | **Gap.** No healthcare-specific benchmark. | [C-8 MTTx] |
| Mean time to innocence | **No published number.** Proposed KPI: time to prove whether a login failure is the badge reader, SSO agent, directory, MFA provider, NAC policy, or network path. | [C-gaps 3] |

#### Quantified cost
- $3,201,001 per year in clinician time across 19 hospitals from SSO (ESTIMATE of dollar value) [C-77].
- Change Healthcare's $3.09 billion 2024 cost followed entry through a portal without MFA [C-9][S-51].

#### Compliance hooks
- HIPAA NPRM (proposed): MFA with limited exceptions; 24-hour access-change notification; business associate safeguard verification [C-13][S-19].
- HHS CPGs Essential: MFA, unique credentials, separate privileged accounts, credential revocation, vendor/supplier requirements [S-25].
- New York 10 NYCRR 405.46: MFA or risk-based authentication; third-party service-provider policies [S-45].
- HICP tap-and-go and vendor access practices [S-27].

#### Relevant 2023 to 2026 outages
- **Change Healthcare (February 2024):** portal without MFA [S-51].
- **Lurie Children's (January 2024):** "credential compromise and ransomware" [C-103].
- **Ascension (May 2024):** contractor or employee device, then escalation to the central identity directory [S-63][S-64].
- **Synnovis (June 2024):** reportedly enabled by absence of two-factor authentication [C-97].
- **UNM Health (October 2026):** threat actor claimed compromise of directory forests, Group Policy, and the cloud identity tenant across 36,000 systems (attacker claim, unverified); UNM said core systems and servers were not penetrated [C-73].

---

### Use case 9: Compliance, audit, and data governance

#### Pillars touched
- **Security:** HIPAA, HICP, CPGs, FDA 524B, state rules [S-B].
- **Facilities:** Joint Commission Physical Environment and Emergency Management chapters; CMS Life Safety Code [F-58][F-60].
- **AI:** AI software in the asset inventory; Section 1557; HTI-5; FDA CDS [A-62][A-65][A-68][A-70].

#### Business problem and why it matters now
Healthcare security regulation is moving from "reasonable and appropriate" toward specific, testable controls: asset inventories, network maps, MFA, encryption, segmentation, scanning cadence, and 72-hour restoration [C-9 problem statement]. Hospitals must produce evidence continuously, not annually, while managing hundreds of business associates whose breaches become their breaches [C-9 problem statement]. Joint Commission accreditation and FDA device regulation add parallel expectations. Why now: the HIPAA NPRM remains on the agenda with final action projected for July 2027; the CPGs are today's voluntary benchmark; OCR is actively settling ransomware cases; and breach volume stays above 700 large breaches a year [C-14][S-23][C-85].

#### Impact
| Dimension | Impact | Source |
|---|---|---|
| Patient outcomes | Joint Commission links cyber preparedness directly to patient safety (SEA 67). | [C-19] |
| Revenue | HHS estimated an average of 4.5 hours to set up network segmentation in year one under the NPRM (ESTIMATE; industry commenters dispute it as low). OCR settlement example: Lehigh Valley Health Network $800,000. | [C-12][S-24] |
| Clinical workflow | Downtime drills and training required under EM.15.01.01 take clinical time. | [C-19] |
| Operational workflow | NPRM: technology asset inventory and network map; vulnerability scanning every 6 months; penetration testing every 12 months; annual review. | [C-13] |
| Compliance and risk | Business associates must notify covered entities within 60 calendar days of discovery (current rule). FDA 524B SBOM and patch requirements. | [C-8][C-21] |
| Staff experience | **Gap.** Compliance evidence collection is largely manual in many organizations; no quantified source. | [C-9 impact] |

#### Today journeys
**Patient.** A patient receives a letter saying her information was involved in a breach at a billing vendor she has never heard of, and that she is being offered credit monitoring. She calls the hospital's main number, which routes her to a call center that cannot tell her what data was taken. 2025 breaches averaged 86,699 records each (median 4,011) [C-85].

**Engineering (GRC, NetOps, SecOps).** The compliance officer asks for a current network map showing where ePHI flows, because the proposed rule would require one reviewed at least every 12 months [A-62]. The most recent diagram is years old. The asset inventory lives in four places (the CMDB, the CMMS, NAC, and a vulnerability scanner) that disagree on counts. Evidence of segmentation is a set of firewall rule exports and screenshots assembled by hand for the auditor. AI tools that touch ePHI would also need to be in the inventory under the proposal, and nobody owns that list yet [A-62].

**Clinical (nurse manager).** A nurse manager is pulled into the annual downtime drill required for Joint Commission and has to staff it during a busy week. She also has to attest that every nurse on her unit completed security training and knows where the downtime binders are, and she finds the binder in one pod still lists a phone extension that no longer exists.

#### Technical deep dive
- **Security:** risk analysis (OCR's enforcement focus) [S-23]; criticality analysis; SBOM/VEX; BAA and third-party risk management; encryption at rest and in transit; configuration baselines [C-9 jargon].
- **Network infrastructure:** documented network maps; segmentation evidence; disabling unused ports per risk analysis [C-9 jargon].
- **WAN:** data flow documentation for ePHI across sites and clouds [C-9 jargon].
- **Visibility:** continuous control monitoring; centralized log collection; asset inventory reconciliation [C-9 jargon].
- **Orchestration:** compliance as code; automated evidence collection; policy drift alerts; GRC integration [C-9 jargon].

#### MTTx and other metrics
| Metric | Figure | Source |
|---|---|---|
| Critical system restore target | 72 hours (NPRM, proposed) | [C-13] |
| Breach notification | 60 days (business associate to covered entity); OCR verification generally within 14 days before portal posting | [C-8] |
| State incident reporting (NY hospitals) | 72 hours | [S-45] |
| Large breaches | 710 in 2025 (61.56 million people, January 2026 snapshot); later 804 and over 140 million; H1 2026: 397 and 33.77 million | [C-85][S-97][S-98] |
| OCR ransomware settlements | 19 by April 2026 | [S-23] |
| HHS CPGs | 10 Essential and 10 Enhanced goals | [C-83][S-25] |
| Joint Commission cyber events | 99 in 10 years; 90% impacted hospitals | [C-19] |
| Audit evidence cycle time | **Gap.** No benchmark. | [C-9 MTTx] |
| Mean time to innocence | **No published number.** Proposed KPI (compliance variant): time to prove to an auditor or OCR that a given segment (for example, the pump VLAN) was isolated from the breached segment on the date in question. | [C-gaps 3] |

#### Quantified cost
- Lehigh Valley Health Network OCR settlement: $800,000 (October 29, 2026) [S-24].
- HealthAlliance New York state fine: $550,000 (about $1.4 million total with $850,000 suspended) [S-112].
- Information blocking penalties up to $1 million per violation for IT developers and HIEs [S-44].
- HHS segmentation setup estimate: 4.5 hours average (ESTIMATE, disputed) [C-12].

#### Compliance hooks
See the full compliance matrix in the Security pillar (`part-a2.md`). Key items: HIPAA Security Rule (in force) and NPRM (proposed, July 2027 target) [S-B]; HITECH recognized security practices [S-49]; HICP and CPGs (voluntary) [S-25][S-27]; FDA 524B (in force) [S-29]; Joint Commission EM and PE chapters [C-19][F-58]; CMS emergency preparedness CoP [S-38]; NY 405.46 [S-45]; S.3315 Health Care Cybersecurity and Resiliency Act (passed Senate September 30, 2026; held at the House desk) [S-47]; Section 1557 AI nondiscrimination (since May 1, 2025) [A-65].

#### Relevant 2023 to 2026 outages
- **Change Healthcare (2024):** OCR opened investigations of Change Healthcare and UnitedHealth Group; no enforcement action announced as of early 2026 (secondary source) [C-8][C-102].
- **OCR ransomware settlements (2025 to 2026):** including Lehigh Valley Health Network [S-23][S-24].

---

### Use case 10: AI workload delivery

*Short treatment here; the full AI pillar is in `part-a2.md`.*

#### Pillars touched
- **AI:** ambient documentation, imaging AI, predictive models [A-A].
- **Security:** new PHI flows, shadow AI, agent permissions [A-55][A-79].
- **Facilities:** exam-room Wi-Fi uplink, GPU power and cooling (120 to 132 kW per rack) [A-49][A-50].

#### Business problem and why it matters now
AI is moving into the clinical path: ambient scribes stream exam-room audio to cloud models and return draft notes into the EHR, and imaging AI reprioritizes worklists for time-sensitive conditions [C-10 problem statement]. These workloads add continuous upstream audio, large image transfers to inference engines, and new third-party data flows that must be secured, monitored, and kept fast enough not to break clinician workflow [C-10 problem statement]. Why now: 81% of physicians use AI professionally; 79% of organizations use ambient speech (KLAS via TechTarget); and ECRI ranks misuse of AI chatbots the #1 hazard for 2026 [C-55][A-6][C-27].

#### Impact
| Dimension | Impact | Source |
|---|---|---|
| Patient outcomes | AI PE triage cut work-hours report TAT by 22.2 minutes but not off-hours; ICH triage showed no TAT improvement. | [C-50][C-51] |
| Revenue | AI scribe adoption associated with 0.49 additional weekly visits and about $167 per month in added billing per adopting clinician (authors call it nominal). | [C-53][C-54] |
| Clinical workflow | 13.4 fewer minutes of EHR time and 16.0 fewer minutes of documentation per 8 scheduled patient hours; after-hours EHR time unchanged (8,581 clinicians, JAMA 2026). | [C-53] |
| Operational workflow | Only 32% of AI scribe users used them in at least half of visits. | [C-54] |
| Compliance and risk | Ambient documentation creates PHI flows to cloud providers requiring BAAs; 40% of surveyed workers encountered unauthorized AI tools. | [A-57][A-55] |
| Staff experience | Burnout 51.9% to 38.8% after 30 days of ambient scribe use (no control group). | [C-52] |

#### Today journeys
**Patient.** During a primary care visit, the physician asks permission to use an ambient scribe, then talks to the patient instead of the keyboard. That afternoon the patient reads her visit note in the portal and finds a medication dose she never discussed; studies of scribe output found omissions and occasional fabricated content, with medication errors the most common theme [A-31].

**Engineering (NetOps and clinical apps).** On a Monday morning, scribe notes stop generating across the ambulatory network. The network team checks exam-room Wi-Fi and the internet edge and finds nothing wrong; two hours later the scribe vendor's status page attributes the delay to an upstream third-party model provider (a pattern seen in four 2026 vendor incidents) [A-39][A-40][A-41][A-42]. No neutral SLA exists for scribe audio bandwidth or inference latency to test against [C-gaps 9].

**Clinical (physician).** A family physician relies on the scribe to finish notes before leaving. When it fails mid-clinic, she types from memory at night, the after-hours work the tool was meant to remove. A resident on the same team pastes a de-identified (he thinks) case summary into a consumer chatbot for a differential; 17% of surveyed staff admitted using an unauthorized AI tool [A-55].

#### Technical deep dive
- **Security:** DLP for prompts; model access governance; BAA coverage; API security; AI usage discovery; prompt injection controls [C-10 jargon][A-79].
- **Network infrastructure:** exam-room Wi-Fi uplink capacity; on-prem GPU clusters with RoCEv2 fabrics; high-throughput storage for imaging AI [C-10 jargon][A-43].
- **WAN:** cloud on-ramps; private interconnects to AI providers; QoS for streaming audio; egress controls [C-10 jargon].
- **Visibility:** AI application discovery; API telemetry; per-session latency; model performance and drift monitoring [C-10 jargon].
- **Orchestration:** DICOM routers and AI orchestration for imaging; PCCP-governed model updates; change control for AI tools [C-10 jargon][A-72].

#### MTTx and other metrics
| Metric | Figure | Source |
|---|---|---|
| Ambient scribe outage durations (2026 vendor status pages) | 1 h 43 min (June 25); about 2 h 5 min (July 21); 2 h 10 min (May 29); 1 h 35 min (April 27, April uptime 99.78%) | [A-39][A-40][A-41][A-42] |
| EHR-8 and DocTime-8 | -13.4 and -16.0 minutes per 8 scheduled hours | [C-53] |
| AI inference latency, audio bandwidth per room, AI service SLA | **Gap.** No neutral published benchmark. | [C-gaps 9] |
| Mean time to innocence | **No published number.** Proposed KPI: time to prove whether a scribe or AI failure is exam-room Wi-Fi, the internet edge or SSE, the AI vendor, the vendor's upstream model or cloud, or the EHR integration. | [C-gaps 3] |

#### Quantified cost
- About $167 per month in added billing per adopting clinician (nominal) [C-53].
- 15,791 hours saved across 7,260 physicians and 2,576,627 encounters in one large medical group (October 2023 to December 2024) [A-18].
- **Gap:** no published cost of AI service outages to health systems.

#### Compliance hooks
- BAAs for AI vendors handling PHI [A-57][A-58].
- HIPAA NPRM (proposed): AI software interacting with ePHI listed in the asset inventory [A-62].
- Section 1557 decision support tool nondiscrimination [A-65][A-66].
- FDA CDS guidance (January 2026), PCCP guidance; HTI-5 removes model cards effective December 28, 2026 [A-70][A-72][A-68].

#### Relevant 2023 to 2026 outages
- Four ambient scribe vendor outages in April to July 2026 tied to third-party model, speech, or cloud dependencies [A-39][A-40][A-41][A-42].
- ECRI 2026 hazard #1: misuse of AI chatbots [C-27].
- **Gap:** no public incident where AI workload network failure caused patient harm [C-10 incidents].

---

*Continue to `part-a2.md` for the three pillars: Healthcare security, Healthcare facilities, and AI in healthcare.*
