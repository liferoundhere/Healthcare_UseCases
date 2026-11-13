# Research Brief 01: Clinical Operations and Infrastructure Use Cases

Prepared: Thursday, November 12, 2026
Scope: Top business-impacting network and technology infrastructure use cases in U.S. healthcare, with impact on patient outcomes, revenue, clinical workflow, and operational workflow. Vendor-neutral.
Conventions: Every statistic lists figure, year, organization, and a source number [n] that maps to the numbered source list in Section 5. Items marked ESTIMATE are arithmetic or third-party estimates, not measured results. Items marked VENDOR-REPORTED come from a technology vendor's own research or case study and should be treated as directional.

Contents: Section 1 (Macro context), Section 2 (Use cases 1 through 10), Section 3 (KPI/MTTx table), Section 4 (Gaps), Section 5 (Full numbered source list, 103 sources).

---

## 1) Macro context

1. **Hospital margins are thin and volatile.** Kaufman Hall's National Hospital Flash Report (August 2026 data, published Oct 13, 2026) shows a calendar year-to-date operating margin index of 2.5% including health-system allocations (8.0% excluding allocations); the single-month August margin was 1.8%, down from 3.8% in July. Roughly 43% of hospitals were operating at a loss, versus about 33% before COVID-19. [4][5]
2. **Costs are outrunning prices.** AHA "Costs of Caring" reports total hospital expenses grew 7.5% in 2025 (workforce +5.6%, supplies +9.9%, drugs +13.6%), after growing 5.1% in 2024 against 2.9% inflation. Labor is the largest category (56% of costs in the 2025 report; about 60% in the 2026 report). [6][7]
3. **IT infrastructure spend is rising faster than most categories.** AHA analysis of Lightcast data (2024) found hospitals spent nearly $4.5 billion on computing infrastructure and data processing, up 15% from 2023. [7]
4. **Healthcare is still the costliest industry for breaches.** IBM/Ponemon Cost of a Data Breach 2026: healthcare average USD 6.64 million (down 10.5% from USD 7.42 million in 2025), the highest of all industries. In 2025, healthcare breaches took the longest of any industry to identify and contain: 279 days. [1][2]
5. **Detection and containment remain slow.** IBM 2026 global mean time to identify (MTTI) 183 days and mean time to contain (MTTC) 64 days, total 247 days (up from 181 + 60 = 241 days in 2025). The U.S. average breach cost rose 13% to USD 11.5 million. [1][3]
6. **Third-party concentration risk is now systemic.** The Feb 2024 Change Healthcare ransomware attack affected approximately 192.7 million individuals (final count reported to HHS OCR on July 31, 2025), and UnitedHealth Group reported USD 3.09 billion in total 2024 costs (USD 2.2 billion direct response, USD 867 million business disruption). [8][9][93]
7. **Ransomware harms patients, not just data.** A University of Minnesota analysis of Medicare claims (2016 to 2021) found hospital volume fell 17% to 25% in the first week of a ransomware attack, Medicare revenue fell 19% to 41%, and in-hospital mortality for patients already admitted rose roughly 20% to 35%. (Working paper; not yet peer reviewed at time of the 2023 NPR report.) [15][16]
8. **Spillover hits neighbors.** At an unaffected ED adjacent to a month-long 2021 San Diego ransomware attack, stroke code activations rose 74.6% (59 to 103) and confirmed strokes rose 113.6% (22 to 47) (JAMA Network Open, 2023). Cardiac arrests rose from 21 to 38, and favorable neurologic survival after out-of-hospital arrest fell from 40.0% to 4.5% (Critical Care Explorations, 2024). [17][18]
9. **Accreditors now assume long outages.** Joint Commission Sentinel Event Alert 67 tells hospitals to be prepared to have life- and safety-critical technology offline for four weeks or longer. It reports 99 cyberattack, ransomware, or hacking events reported to the Joint Commission over 10 years, 90% impacting hospitals. [19][20]
10. **Regulation is tightening, slowly.** The HIPAA Security Rule NPRM (published Jan 6, 2025) would require MFA, encryption at rest and in transit, network segmentation, vulnerability scans every 6 months, annual penetration tests, and written procedures to restore critical systems and data within 72 hours. HHS has moved it to "long-term actions" with final action projected for July 2027 (a target, not a deadline). [12][13][14][94]
11. **Breach volume remains high.** HIPAA Journal counted 710 large (500+) healthcare breaches in 2025 affecting at least 61,556,256 individuals; hacking/IT incidents were 570 of 710 (about 80%). 2024 set the record at 289,162,330 individuals, largely due to Change Healthcare. [85]
12. **Outages are increasingly network and change driven.** Uptime Institute 2025: IT and networking issues caused 23% of impactful outages in 2024; configuration/change management failure was the top cause of major network-related outages (34%). In Uptime's 2025 survey, 57% said their last major outage cost more than USD 100,000 and 1 in 5 said more than USD 1 million. [81][82]
13. **Care is moving out of the building.** Medicare telehealth flexibilities run through Dec 31, 2027, and the Acute Hospital Care at Home waiver runs through Sep 30, 2030 (Consolidated Appropriations Act, 2026, signed Feb 3, 2026). CMS lists 358 approved hospital CCNs across 134 health systems in 37 states (as of Oct 19, 2026). [28][29][32][33]
14. **AI is now mainstream in clinical work.** AMA's 2026 Physician Survey on Augmented Intelligence: 81% of physicians use AI professionally (38% in 2023). FDA's AI-enabled device list shows 1,451 authorizations through end of 2025, 1,104 (76%) in radiology; FDA states more than 1,600 as of September 2026. [55][56][57][58]
15. **Consolidation continues under distress.** Kaufman Hall counted 46 announced hospital and health system M&A transactions in 2025 (72 in 2024), with a record 43.5% involving a financially distressed party; ECRI ranks "digital darkness" (sudden loss of electronic systems) as the #2 health technology hazard for 2026 and legacy-device cybersecurity as #8. [27][75][76]

---

## 2) Per-use-case research blocks

### Use case 1: EHR availability and clinical application performance (EHR, VDI/app virtualization, clinician desktop latency)

**Problem statement.** The EHR is the operational backbone of the hospital: orders, medication administration, results, documentation, scheduling, and billing all depend on it, and most large health systems deliver it through application virtualization or virtual desktops, which means every click is a network round trip. Unplanned downtime is common: in a 2014 survey of 50 institutions, 96% reported at least one unplanned EHR downtime in three years and 70% had one longer than 8 hours. Even when the EHR is "up," slow session response degrades clinician throughput and adds to burnout in a workforce where 43.2% of physicians report burnout and nurses spend roughly 35% of a shift documenting. Why now: thin margins (2.5% YTD margin index) leave no room for productivity loss, AI tools add new latency-sensitive traffic to the same sessions, and July 2024's mass outage showed how a single software dependency can knock patient-facing services offline across hundreds of hospitals at once.

**Impact bullets**
- Patient outcomes: Three of 50 surveyed institutions reported patient injury from planned or unplanned EHR downtime (2014). [79] ECRI 2026 warns downtime can cause medical errors, inappropriate treatment decisions, or delayed care. [27]
- Revenue/financial: A large hospital "may lose as much as USD 1 million per hour" in lost charges during EHR downtime (Sittig, cited 2018; ESTIMATE, not a study result). [78] Unplanned downtime estimated at USD 634 per physician per hour (AC Group estimate, cited 2017; ESTIMATE). [80]
- Clinical workflow: Work during downtime "takes four or five times longer" (AC Group time-and-motion study, cited 2017). [80] Nurses spend about 35% of shift time documenting (JAMIA, 2024). [59]
- Operational workflow: Lab turnaround can extend to hours during and after EHR downtime as specimens back up and results move to phone/fax (AHRQ-funded report, 2018). [95]
- Compliance/risk: Joint Commission EM.13.01.01 requires a continuity of operations plan and EM.14.01.01 a disaster recovery plan; the HIPAA NPRM would require a written 72-hour restoration capability for critical systems. [19][12]
- Staff burnout: 43.2% of physicians reported at least one burnout symptom in 2024 (AMA, down from 48.2% in 2023 and 53% in 2022). [87]

**Quantified numbers**
- Citrix default thresholds for session ICA round-trip time (RTT): warning 300 ms, critical 400 ms; session network latency: warning 150 ms, critical 250 ms; logon duration: warning 40 s, critical 70 s (Citrix site analytics, current documentation). [37]
- Citrix recommends separate sites instead of zones when zone network latency exceeds 250 ms RTT. [38]
- Commonly cited ICA latency bands: 0 to 150 ms optimal, 150 to 300 ms acceptable, more than 300 ms degraded (third-party monitoring vendor documentation; VENDOR-REPORTED). Users "notice slowness" at sustained ICA latency above 250 ms; significant impact above 400 ms for 2 to 5 minutes. [39]
- CrowdStrike faulty update (July 19, 2024): 759 of 2,232 scanned U.S. hospitals (34.0%) showed network service disruptions; of 1,098 disrupted services, 239 (21.8%) were patient-facing; 58.1% of services recovered within 6 hours and 7.8% took more than 48 hours (JAMA Network Open, 2025). CrowdStrike disputes the methodology. [64][65]
- Single sign-on badge tap reduced reconnect login from 29.3 s to 8.9 s (20.4 s saved, 69.6%) across 19 hospitals; 943.4 clinician hours saved per week enterprise-wide (peer-reviewed, data collected 2018). [77]

**MTTx metrics**
- Downtime duration (hours) and recovery percentiles: 58.1% of services under 6 hours; 7.8% over 48 hours (CrowdStrike event, 2024). [64]
- Session KPIs: ICA RTT P70/P90 (Citrix computes dynamic warning/critical thresholds weekly at the 70th/90th percentile). [37]
- MTTI (mean time to innocence, "prove it isn't the network"): no published healthcare statistic found (see Gaps).

**Technical jargon**
- Security: privileged access management, EDR, application allowlisting, immutable backups, break-glass accounts, downtime read-only (BCA) workstations.
- Network Infrastructure: data center fabric, east-west segmentation, QoS for ICA/HDX, dual-homed access, first-hop redundancy, jumbo frames for storage.
- WAN: ICA RTT, application-aware routing, path conditioning, forward error correction, latency/jitter/loss SLAs, zone vs. site design.
- Visibility: digital experience monitoring (DEM), session RTT, logon duration, synthetic transactions, packet capture, flow telemetry, end-to-end path tracing.
- Orchestration: change windows, configuration drift detection, infrastructure as code, automated failover runbooks, canary rollouts for endpoint agents.

**2023-2026 incidents**
- CrowdStrike faulty update, July 19, 2024: at least 759 U.S. hospitals with detectable disruptions (EHR access, imaging, fetal monitoring, transfer portals). [64][65]
- Lurie Children's, Jan 31, 2024: Epic and MyChart taken offline; Epic restored March 4, 2024 (about 33 days); 791,784 individuals affected. [69][70]

---

### Use case 2: IoMT and medical device security plus visibility (infusion pumps, imaging, patient monitors, legacy OS, FDA 524B)

**Problem statement.** Hospitals operate large fleets of networked medical devices (infusion pumps, patient monitors, imaging modalities, lab analyzers) that often run legacy or unsupported operating systems, cannot host endpoint agents, and stay in service for a decade or more. Security research consistently finds known exploited vulnerabilities (KEVs) on medical devices in nearly every hospital, and many devices are insecurely reachable from the internet or bridge guest and clinical networks. Because devices cannot be patched quickly, the practical controls are asset visibility, segmentation, and compensating network policy. Why now: FDA section 524B (effective March 29, 2023) and FDA's June 27, 2025 final premarket guidance require SBOMs and vulnerability management plans for new "cyber devices," but the installed base predates those rules; ECRI lists legacy-device cybersecurity as a top-10 hazard for 2026.

**Impact bullets**
- Patient outcomes: ECRI 2026: a successful attack "could block access to patient data, force staff to alter workflows, or render devices or systems unavailable," leading to delayed or inappropriate care. [27]
- Revenue/financial: Device downtime drives procedure cancellations and diversion (see use case 3); 31% of organizations with medical device incidents reported up to 12 hours without critical systems (aggregated statistic list; VENDOR-REPORTED, original source not verified). [96]
- Clinical workflow: Taking pumps or monitors offline forces manual programming and manual vitals charting.
- Operational workflow: Biomedical engineering and IT must jointly inventory, risk-rank, and segment devices; ECRI recommends segmenting or disconnecting legacy devices and planning replacement. [27]
- Compliance/risk: FDA 524B requires cyber device manufacturers to provide an SBOM (commercial, open-source, off-the-shelf components), a postmarket vulnerability monitoring plan, and update/patch processes. [21][22][23]
- Staff burnout: Device workarounds add manual documentation steps on top of the 35% of shift time nurses already spend documenting. [59]

**Quantified numbers**
- 99% of healthcare organizations had devices with KEVs; 89% had devices with ransomware-linked KEVs that were also insecurely internet-connected; 28% of imaging devices contained KEVs; 86% of organizations had patient devices with confirmed KEVs (2.25 million IoMT devices, 351 organizations, 2025; VENDOR-REPORTED). [25]
- 20% of hospital information systems carry ransomware-linked KEVs and insecure internet connectivity, affecting close to 60% of organizations (2025; VENDOR-REPORTED). [25]
- 63% of CISA-tracked KEVs found on healthcare networks; 23% of medical devices have at least one KEV; 14% of connected devices run unsupported/EOL OS; 22% of hospitals have devices bridging guest and internal networks (2023 data, released 2024; VENDOR-REPORTED). [26]
- 75% of 200,000 infusion pumps analyzed had one or more known security gaps; 1 in 5 connected medical devices run unsupported/EOL OS; devices remain vulnerable an average of 3.2 years (2025; VENDOR-REPORTED). [24]

**MTTx metrics**
- Vulnerability dwell time: 3.2 years average for healthcare devices even when patches exist (2025; VENDOR-REPORTED). [24]
- Device patch latency, MTTD for device compromise, MTTR for device restoration: no neutral published benchmarks found (see Gaps).

**Technical jargon**
- Security: SBOM, VEX, KEV, EPSS, CVSS, compensating controls, MDS2 forms, NAC, 802.1X/MAB, certificate-based device identity.
- Network Infrastructure: micro-segmentation, VLAN/VRF isolation, security group tags, dedicated medical device SSIDs, DHCP fingerprinting.
- WAN: vendor remote-support paths, inbound remote access brokering, site-to-site tunnels to device manufacturers.
- Visibility: passive asset discovery, deep packet inspection of clinical protocols (DICOM, HL7, proprietary pump protocols), device risk scoring, CMMS integration.
- Orchestration: policy automation from asset classification, quarantine playbooks, change control with biomed, recall/advisory ingestion.

**2023-2026 incidents**
- ECRI 2026 hazard #8 (legacy device cybersecurity) and #2 (digital darkness). [27]
- No widely confirmed 2023-2026 U.S. patient harm event attributed solely to a compromised infusion pump was found (see Gaps).

---

### Use case 3: Ransomware resilience and downtime procedures (EHR downtime, ambulance diversion, recovery)

**Problem statement.** Ransomware is the dominant operational threat to hospitals because it removes the EHR, phones, pharmacy, lab, and imaging at the same time, forcing paper downtime, ambulance diversion, and cancelled procedures for weeks. Recovery depends on clean, isolated backups, the ability to contain lateral movement, and rehearsed downtime procedures, yet survey data shows backup-based recovery is declining in healthcare. Effects spread to neighboring hospitals that absorb diverted patients. Why now: 2024 to 2026 brought multi-week outages at major systems (Ascension, Kettering, Lurie, Synnovis), the Joint Commission now expects four-plus week offline readiness, and the proposed HIPAA rule would require 72-hour restoration of critical systems.

**Impact bullets**
- Patient outcomes: In-hospital mortality for already-admitted Medicare patients rose roughly 20% to 35% during attacks (2016 to 2021 data). [15][16] Synnovis (London, 2024): 170 patient-care incidents including 1 severe-harm case, and one patient death linked in part to a long wait for a blood test result. [66][68][97]
- Revenue/financial: Medicare revenue fell 19% to 41% at attacked hospitals during the initial attack week. [15] Ascension reported a FY24 operating loss of USD 1.8 billion "including the cyber impact," after only a USD 79 million recurring-operations loss in the 10 months before the May 2024 attack. [10] Synnovis estimated direct losses of GBP 32.7 million in 2024. [66]
- Clinical workflow: Adjacent unaffected ED: median waiting room time rose from 21 to 31 minutes; ED length of stay for admitted patients rose from 614 to 822 minutes; patients leaving without being seen rose from 158 to 360 (2021 attack, JAMA Network Open 2023). [17]
- Operational workflow: Revenue cycle stops: Ascension cited delays in insurance verification, claims submission, and payment processing, with some downtime claims still in process months later. [98]
- Compliance/risk: HIPAA NPRM: 72-hour restore of critical systems, criticality analysis, written incident response plans, separate backup controls. [13] Joint Commission EM.11.01.01 hazard vulnerability analysis must include cyberattacks. [19]
- Staff burnout: ECRI 2026: the strain of working under downtime procedures "can increase the risk of errors and lead to burnout." [27]

**Quantified numbers**
- Sophos healthcare 2025 (292 respondents, 17 countries): 34% of attacks resulted in encryption (down from 74% in 2024); 51% used backups to restore (down from 72%); 36% paid ransom; median ransom paid USD 150,000; average recovery cost USD 1.02 million; 58% recovered within one week (21% in 2024); 97% recovered within three months (VENDOR-REPORTED survey). [86]
- Adjacent-ED effects (2021 attack): EMS arrivals +35.2%; stroke codes +74.6%; confirmed strokes +113.6%; cardiac arrests 21 to 38 (+81%). [17][18][99]
- Joint Commission: plan for four weeks or longer offline for life- and safety-critical technology. [19]
- Synnovis: 10,152 acute outpatient appointments and 1,710 elective procedures postponed; services fully restored by December 2024 (about 6 months). [66][67]

**MTTx metrics (healthcare-specific downtime durations)**
- Ascension (2024): attack May 8; EHR access restored across the system by June 30 (about 7 weeks). HIPAA Journal reports "around 6 weeks." [11][98]
- Kettering Health (2025): outage began May 20; core Epic restored June 2 (13 days); normal operations including MyChart and phones by June 10 to 11 (about 3 weeks). [62][63]
- Lurie Children's (2024): Epic offline Jan 31; restored March 4 (about 33 days); MyChart remained offline after that. [69]
- Signature Healthcare Brockton (2026): incident April 6; ambulance diversion lifted April 15 (9 days); paper downtime expected for about two more weeks. [71][72]
- Sophos 2025: 58% of healthcare victims recovered within one week. [86]
- IBM 2026 global MTTI 183 days and MTTC 64 days (all industries). [1]

**Technical jargon**
- Security: immutable/air-gapped backups, clean room recovery, EDR/XDR, identity threat detection, tiered admin model, MFA on remote access, tabletop exercises.
- Network Infrastructure: segmentation to limit blast radius, isolation zones, out-of-band management, kill-switch ACLs, recovery VLANs.
- WAN: emergency carrier diversity, internet breakout isolation, regional failover.
- Visibility: NDR, DNS telemetry, east-west flow analytics, centralized log collection, honeypots/canary credentials.
- Orchestration: SOAR playbooks, automated quarantine, restoration sequencing by criticality tier, downtime declaration workflows (HICS).

**2023-2026 incidents**
- Change Healthcare (Feb 2024): 192.7 million individuals; USD 3.09 billion 2024 cost to UnitedHealth Group. [8][9]
- Ascension (May 2024): 5,599,699 individuals; ambulance diversion; EHR down about 6 to 7 weeks. [11][92]
- Lurie Children's (Jan 2024), Synnovis (June 2024), Kettering Health (May 2025), Signature Healthcare Brockton (April 2026), UNM Health (Oct 2026). [62][66][69][71][73]

---

### Use case 4: Clinical mobility and Wi-Fi reliability (voice badges, smartphones, nurse call, RTLS, Wi-Fi 6E/7)

**Problem statement.** Nurses, physicians, and support staff now communicate through Wi-Fi voice badges and smartphones that carry nurse call alerts, alarms, secure messaging, and EHR mobile apps, so a coverage hole or slow roam becomes a missed alarm or a dropped call during a code. Voice clients have much stricter RF requirements than laptops (signal strength, SNR, DTIM, fast roaming), and these devices are used in places site surveys often ignore (stairwells, elevators, closets). Location services (RTLS) recover time nurses spend hunting for equipment. Why now: WPA3 adoption makes fast transition roaming mandatory for acceptable voice handoffs on some handsets, Wi-Fi 6E/7 refresh cycles are underway, and staffing shortages make every minute of nurse time valuable.

**Impact bullets**
- Patient outcomes: Missed or delayed alarm delivery to mobile devices delays response; roaming failures cause "audible clicks and other disturbances" on calls (Ascom troubleshooting guidance). [100]
- Revenue/financial: SSO and mobility time savings were valued at USD 168,474 per hospital per year in a 19-hospital study (2018 data). [77]
- Clinical workflow: Nurses spend 21 to 60 minutes per shift searching for equipment (range across studies summarized by HIMSS; older studies). [90]
- Operational workflow: Voice-grade site surveys, AP power tuning to match low-power badges, and channel planning are prerequisites. [41][44]
- Compliance/risk: Encryption settings affect roaming: Vocera badges do not support WEP, TKIP, or SAE; Ascom states 802.11r is mandatory for acceptable roaming with WPA3. [40][45]
- Staff burnout: Equipment searching and chasing colleagues for answers add non-clinical load on top of documentation time. [59][90]

**Quantified numbers (vendor-published requirements; VENDOR-REPORTED but authoritative for those devices)**
- Vocera: coverage of -65 dBm minimum (recommended: two APs at -65 dBm); minimum SNR +25 dB; DTIM 1 (required); beacon interval 100 ms (required); DTIM x beacon must not exceed 108 ms or multicast audio becomes choppy; AP transmit power 12 to 17 dBm; 802.11k enabled; voice priority queue required; 20 MHz channels recommended. [40][41][42]
- Vocera authentication association delays: EAP-FAST about 200 ms; PSK under 100 ms; use 802.11r/OKC/CCKM to cache credentials. [40][43]
- Voice roam validation targets: under 50 ms ideal, under 100 ms acceptable; no packet loss spike beyond 1 to 2 frames (Vocera design guide published by a wireless vendor). [44]
- Ascom i63 interoperability results: WPA3-SAE without FT, about 174 ms typical roam; WPA3-SAE with FT, about 31 ms; WPA2-PSK with FT, about 25 ms. Ascom: more than 8 enabled channels without 802.11k degrades roaming; avoid channel bonding and DFS where possible. [45][46]
- Ascom Myco 4 roaming on 6 GHz: about 83 ms typical. [46]

**MTTx metrics**
- Roam time (ms) per handoff; association delay by authentication type (ms); call drop rate; alarm delivery latency. Published targets above. [40][44][45]
- Wi-Fi MTBF/MTTR for clinical WLANs: no published benchmark found (see Gaps).

**Technical jargon**
- Security: WPA3-Enterprise, 802.1X/EAP-TLS, PMF (802.11w), OKC, FT key caching, device certificates, MDM.
- Network Infrastructure: 802.11r/k/v, DTIM, beacon interval, WMM/UAPSD, DFS, co-channel interference, AP transmit power matching, 20/40/80 MHz channels, 6 GHz.
- WAN: cloud-hosted clinical communications platforms, SIP trunking, survivability at remote sites.
- Visibility: voice-grade site survey, RF analytics, roaming analytics, client health scores, RTLS heat maps.
- Orchestration: RF profile templates, automated channel/power with voice-safe constraints, firmware compatibility matrices.

**2023-2026 incidents**
- No public 2023-2026 incident specifically attributing patient harm to Wi-Fi voice failure was found (see Gaps). Downtime events (use case 3) routinely take phones and paging offline (Kettering 2025 call centers and phones). [62]

---

### Use case 5: Imaging and PACS data movement (DICOM throughput, cloud PACS/VNA, radiology turnaround, digital pathology)

**Problem statement.** Imaging generates the largest clinical data objects in the hospital: CT and MRI studies are hundreds of megabytes to gigabytes, and digital pathology whole-slide images can be multi-gigabyte per slide before compression. Moving studies among modalities, PACS, vendor-neutral archives, remote readers, AI engines, and cloud archives makes WAN bandwidth and storage throughput a direct determinant of report turnaround. Time-critical pathways (stroke, PE, trauma) depend on images reaching a radiologist within minutes. Why now: radiology dominates FDA AI authorizations (76%), cloud PACS and teleradiology are expanding, and digital pathology adoption multiplies data volume.

**Impact bullets**
- Patient outcomes: AHA/ASA Target: Stroke Phase III goals: door-to-needle within 60 minutes for 85% or more of eligible patients, within 45 minutes for 75% or more; door-to-device within 90 minutes (direct) or 60 minutes (transfer) for 50% or more. Imaging transfer is on the critical path. [89]
- Revenue/financial: Imaging downtime stops high-margin outpatient imaging; Kettering's 2025 outage halted imaging until normal operations resumed June 10. [62]
- Clinical workflow: AI triage reduced PE-positive CTPA preliminary report turnaround during work hours from 68.9 to 46.7 minutes (22.2 minutes saved); off-hours change was not significant (44.8 to 42.0 minutes) (JACR, 2025). [50]
- Operational workflow: A radiology department doing 500 studies per day generates roughly 150 GB to 1 TB of new imaging daily (industry planning estimate; ESTIMATE). [48]
- Compliance/risk: DICOM services are a common internet exposure; 28% of imaging devices carry KEVs (2025; VENDOR-REPORTED). [25]
- Staff burnout: Slow image loads lengthen read times for a workforce already handling rising volumes (no quantified neutral source found; see Gaps).

**Quantified numbers**
- Typical study sizes (industry planning ranges; ESTIMATE): chest X-ray 5 to 15 MB uncompressed; CT head 100 to 300 MB; CT chest 300 to 800 MB; CT abdomen/pelvis with contrast 500 MB to 1.5 GB; MRI brain 150 to 400 MB; cardiac MRI 500 MB to 2 GB; digital breast tomosynthesis 500 MB to 1.5 GB; whole-slide image 1 to 10 GB per slide. [48]
- DICOM standard (NEMA): a typical 20 mm x 15 mm sample at 0.25 microns/pixel (40X) is about 80,000 x 60,000 pixels (4.8 gigapixels), about 15 GB uncompressed, about 300 MB with JPEG 2000; an extreme multi-plane case can reach 3.75 TB. [47]
- Industry average digital pathology slide: 1.3 GB; an uncompressed 40X radical prostatectomy WSI can reach 100 GB (storage vendor whitepaper; VENDOR-REPORTED). [49]
- Transfer time ESTIMATE (arithmetic: size in MB x 8 / usable Mbps): a 1 GB CT over a 100 Mbps link at 70% usable throughput takes about 114 seconds; over 1 Gbps at 70%, about 11 seconds; a 1.3 GB WSI over 1 Gbps at 70%, about 15 seconds. [48][101]
- AI triage for intracranial hemorrhage did not improve report turnaround (147.1 vs 149.9 minutes) in a prospective study (AJR, 2025). [51]

**MTTx metrics**
- Report turnaround time (TAT): scan completion to preliminary report: 68.9 to 46.7 minutes with AI triage (work hours, PE). [50]
- Door-to-needle, door-to-device (stroke). [89]
- Image retrieval/prefetch latency, PACS availability: no neutral benchmark found (see Gaps).

**Technical jargon**
- Security: DICOM TLS, DICOMweb over HTTPS with OAuth, de-identification, PACS segmentation, modality allowlisting.
- Network Infrastructure: 10/25/40 GbE to modalities and archives, storage fabrics, jumbo frames, lossless vs lossy JPEG 2000, edge caching.
- WAN: WAN optimization, bandwidth reservation for imaging, cloud interconnects, teleradiology paths, prefetch scheduling.
- Visibility: DICOM association and transfer telemetry, study-level latency tracking, worklist analytics.
- Orchestration: DICOM routing rules, VNA lifecycle policies, AI orchestration platforms, autoscaling cloud ingestion.

**2023-2026 incidents**
- CrowdStrike event (July 2024): imaging platforms among the patient-facing services disrupted. [64]
- Kettering Health (2025): imaging among the services restored only when normal operations resumed. [62]

---

### Use case 6: Telehealth, virtual care, and hospital-at-home (remote patient monitoring, WAN/SASE, digital experience monitoring)

**Problem statement.** Care delivery now extends into patients' homes through video visits, remote patient monitoring (RPM), and inpatient-level Acute Hospital Care at Home (AHCAH), which means clinical service quality depends on consumer broadband, cellular links, and cloud platforms the hospital does not own. Hospital-at-home programs carry inpatient acuity, so device telemetry, video, and escalation paths need hospital-grade reliability and monitoring. Policy uncertainty that slowed investment has eased: Congress extended Medicare telehealth flexibilities through Dec 31, 2027 and AHCAH through Sep 30, 2030. Why now: RPM use and spending keep growing, OIG is scrutinizing RPM billing, and health systems need end-to-end visibility to prove that a failed visit or missed reading was not their network.

**Impact bullets**
- Patient outcomes: Cone Health reported zero patient deaths, zero care-associated infections, shorter lengths of stay, and fewer 30-day readmissions in the first year of its hospital-at-home program (reported June 2026; single-program, self-reported). [31]
- Revenue/financial: Medicare paid USD 536 million for RPM in 2024, up 31% from 2023 (OIG, 2025). [35]
- Clinical workflow: About 4,600 practices routinely billed RPM in 2024, each covering about 70 enrollees and adding about 5 new enrollees per month (OIG). [35]
- Operational workflow: AHCAH waivers are per CCN; hospitals with fewer than 25 prior at-home patients follow a detailed (non-expedited) process; experienced hospitals submit monitoring data monthly (CMS). [29]
- Compliance/risk: OIG flagged RPM billing patterns that warrant scrutiny (enrollees with no prior relationship; multiple devices per month). [36] From Jan 1, 2028, non-behavioral Medicare telehealth generally reverts to rural, facility-based originating sites absent new legislation (CMS FAQ). [34]
- Staff burnout: Not quantified in neutral sources for virtual care staff (see Gaps).

**Quantified numbers**
- Nearly 1 million Medicare enrollees received RPM in 2024, up 27% from 2023; 10,388 practices billed at least one RPM service (OIG OEI-02-23-00261, 2025). [35]
- AHCAH: 358 approved CCNs across 134 health systems in 37 states (CMS list updated Oct 19, 2026). A separate trade-press count cites 365 hospital campuses across 137 systems; the CMS figure is used here. [28][31]
- Waiver end date: inpatients must be discharged or returned to the hospital by Sep 30, 2030 absent Congressional action; no new waiver requests accepted after Sep 1, 2030. [29][30]
- Telehealth flexibilities through Dec 31, 2027: home as originating site, no geographic restriction, expanded practitioner types, FQHC/RHC distant sites, audio-only allowed (HHS). [32][33]

**MTTx metrics**
- Visit failure/drop rate, time to escalation from RPM alert, home device data latency: no neutral published benchmarks found (see Gaps).

**Technical jargon**
- Security: ZTNA for clinician access, device identity for home kits, encryption in transit, BAAs with platform providers, secure messaging.
- Network Infrastructure: cellular gateways (LTE/5G) for home kits, Wi-Fi fallback, peripheral Bluetooth pairing.
- WAN: SASE, SSE, secure web gateway, direct internet access, cloud on-ramps, per-application SLAs.
- Visibility: DEM, endpoint and ISP path monitoring, synthetic video/RTC tests, MOS scores, jitter/loss/latency per session.
- Orchestration: logistics for kit provisioning, automated escalation workflows, command center integration.

**2023-2026 incidents**
- CrowdStrike event (July 2024): remote patient care monitoring tools and patient access platforms were among disrupted services. [64][65]

---

### Use case 7: Multi-site WAN, M&A integration, and clinic/ambulatory connectivity (SD-WAN, segmentation during mergers)

**Problem statement.** Health systems are larger and more distributed than ever: one hospital system can operate hundreds of clinics, ambulatory surgery centers, imaging centers, and labs, each needing EHR, imaging, voice, and device connectivity with hospital-grade availability. Mergers and acquisitions add networks with different addressing, security postures, identity stores, and unknown device inventories that must be connected without importing risk. Legacy dedicated circuits and site-to-site VPNs are costly and slow to deploy for new sites. Why now: 46 hospital deals were announced in 2025 with a record 43.5% involving distressed parties (whose IT is often under-invested), outpatient volume grew 9.8% in 2025, and ambulatory acquisitions are accelerating.

**Impact bullets**
- Patient outcomes: Clinic outages delay visits and medication refills; CrowdStrike-era outages included patient transfer portals between hospitals. [64]
- Revenue/financial: Total transacted revenue in 2025 hospital M&A was USD 18.5 billion, the lowest since Kaufman Hall began tracking; USD 9.8 billion came in Q4. Integration delays defer synergy capture. [75]
- Clinical workflow: Outpatient visits rose 9.8% in 2025 (AHA via Strata). [7]
- Operational workflow: One health system replaced dedicated links with multi-carrier broadband SD-WAN across more than 200 sites (6 hospitals, 400+ clinics) and reported up to 33% fewer outages caused by network hardware issues (2024-2025 case study; VENDOR-REPORTED). [88]
- Compliance/risk: HIPAA NPRM would require network segmentation and an accurate network map of ePHI flows; HHS CPGs list network segmentation as an enhanced goal. [13][83]
- Staff burnout: Not quantified in neutral sources (see Gaps).

**Quantified numbers**
- 46 announced hospital/health system transactions in 2025 (72 in 2024); 17 in Q4 2025 including four "mega mergers" (smaller party revenue over USD 1 billion); 20 involved a financially distressed seller; 43.5% involved a distressed party (Kaufman Hall, Jan 2026). [75][76]
- Uptime 2025: among organizations with a significant network-caused outage in the past three years (44% of 414 respondents), most common causes were configuration/change management failure (34%), firmware/software error (31%), hardware failure (26%), third-party network provider failure and line breakages (17% each). [81]
- Uptime 2026: outages linked to fiber and connectivity issues are rising and more likely to cause extended disruptions. [82]

**MTTx metrics**
- Site onboarding time, circuit MTTR, WAN availability per site: no neutral healthcare benchmark found (see Gaps). Vendor case study reports "minutes-level onboarding" of new locations (VENDOR-REPORTED). [88]

**Technical jargon**
- Security: segmentation during integration (isolate acquired network, then migrate), overlapping IP remediation, identity federation, third-party risk assessment, security baselines.
- Network Infrastructure: branch switching/Wi-Fi templates, PoE budgets for devices, redundant power, LTE/5G backup.
- WAN: SD-WAN, application-aware routing, dual carrier/diverse path, broadband plus MPLS hybrid, SASE/SSE, cloud on-ramp, QoS for ICA/voice/imaging.
- Visibility: per-site and per-application SLA dashboards, ISP performance monitoring, path tracing, synthetic tests from clinics.
- Orchestration: zero-touch provisioning, golden configurations, policy templates per site type, change automation with rollback.

**2023-2026 incidents**
- Change Healthcare (2024): attacker used stolen credentials on a remote access portal without MFA, then moved laterally for nine days before deploying ransomware (secondary source summary of public testimony). [102]
- Kettering Health (2025) stated it put network segmentation, enhanced monitoring, and updated access controls in place during recovery. [62][63]

---

### Use case 8: Identity, zero trust, and clinician access (tap-and-go SSO, MFA, ZTNA, third-party vendor access)

**Problem statement.** Clinicians log in dozens of times per shift on shared workstations, so authentication friction directly costs care time, while weak remote access (no MFA, shared vendor accounts) is a leading entry point for attackers. Health systems must make access faster for clinicians and stronger against attackers at the same time, including for vendors and business associates who maintain devices and applications remotely. Why now: two of the most damaging recent attacks (Change Healthcare and Synnovis) were reported to involve missing multi-factor authentication, the HIPAA NPRM would require MFA with limited exceptions, and HHS CPGs list MFA as an essential goal.

**Impact bullets**
- Patient outcomes: Synnovis breach "reportedly enabled by the absence of two-factor authentication" led to 170 patient-care incidents (2024-2025 reporting). [97]
- Revenue/financial: SSO saved USD 3,201,001 per year in clinician time across 19 hospitals (USD 168,474 per hospital) (peer-reviewed, 2018 data; ESTIMATE of dollar value based on wage rates). [77]
- Clinical workflow: Reconnect login 29.3 s to 8.9 s with badge tap (20.4 s saved per reconnect); 49,056.8 clinician hours per year liberated enterprise-wide. [77]
- Operational workflow: HIPAA NPRM would require notification within 24 hours when a workforce member's access is changed or terminated. [13]
- Compliance/risk: NPRM: MFA required with limited exceptions; CPG essential goals include MFA, unique credentials, separate user and privileged accounts, revoke credentials for departing workforce; enhanced goals include third-party vulnerability disclosure and incident reporting. [13][83][84]
- Staff burnout: Login friction contributes to EHR burden; AMA reports 43.2% physician burnout (2024). [87]

**Quantified numbers**
- First-of-shift login reduced 34.6 s to 29.3 s (5.3 s, 15.3%); reconnect reduced 20.4 s (69.6%); 943.4 hours per week saved across 19 hospitals (peer-reviewed). [77]
- Lurie Children's: attackers accessed systems Jan 26 to 31, 2024 "through credential compromise and ransomware" (breach notice to Maryland AG). [103]
- UNM Health (Oct 2026): threat actor claimed compromise of Active Directory forests, Group Policy infrastructure, and the Entra tenant across 36,000 systems (attacker claim, unverified); UNM said core systems and servers were not penetrated. [73]

**MTTx metrics**
- Login time per session (seconds); time to deprovision (NPRM target: notify within 24 hours of access change). [13][77]
- Identity-based MTTD: no healthcare-specific benchmark found (see Gaps).

**Technical jargon**
- Security: tap-and-go SSO, proximity badges, FIDO2/passkeys, phishing-resistant MFA, PAM, just-in-time access, vendor privileged access, ZTNA, conditional access, identity threat detection and response.
- Network Infrastructure: 802.1X wired/wireless, NAC posture, dynamic VLAN/policy assignment.
- WAN: ZTNA replacing VPN concentrators, SSE, per-app tunnels for vendors.
- Visibility: authentication logs, impossible-travel analytics, session recording for vendor access, UEBA.
- Orchestration: joiner/mover/leaver automation from HR system, access recertification, automated credential revocation.

**2023-2026 incidents**
- Change Healthcare (Feb 2024): remote access portal without MFA (per public reporting). [102]
- Synnovis (June 2024): reportedly enabled by absence of two-factor authentication. [97]
- Lurie Children's (Jan 2024): credential compromise. [103]

---

### Use case 9: Compliance, audit, and data governance (HIPAA Security Rule update, HICP/CPGs, Joint Commission, FDA, third parties)

**Problem statement.** Healthcare security regulation is moving from "reasonable and appropriate" toward specific, testable controls: asset inventories, network maps, MFA, encryption, segmentation, scanning cadence, and 72-hour restoration. Hospitals must produce evidence continuously, not annually, while managing hundreds of business associates whose breaches become their breaches. Accreditation (Joint Commission) and device regulation (FDA 524B) add parallel expectations. Why now: the HIPAA NPRM remains on the HHS agenda with final action projected for July 2027, the CPGs are the voluntary benchmark today, and breach reporting continues at more than 700 large breaches per year.

**Impact bullets**
- Patient outcomes: Joint Commission links cyber preparedness directly to patient safety (SEA 67). [19]
- Revenue/financial: HHS estimated each regulated entity would spend an average of 4.5 hours to set up network segmentation in year one (low 4, high 5) under the NPRM; industry commenters dispute that estimate as low (HHS regulatory impact analysis; ESTIMATE). [12]
- Clinical workflow: Downtime drills and training required under EM.15.01.01 take clinical time. [19]
- Operational workflow: NPRM: technology asset inventory and network map; vulnerability scanning every 6 months; penetration testing every 12 months; annual review of security measures. [13]
- Compliance/risk: Business associate notification to covered entities within 60 calendar days of discovery (current rule). [8] FDA 524B SBOM and patch requirements for cyber devices. [21][22]
- Staff burnout: Compliance evidence collection is largely manual in many organizations (no quantified source found; see Gaps).

**Quantified numbers**
- NPRM published Jan 6, 2025 (90 FR 898, 125 pages, RIN 0945-AA22); stage "Long-Term Actions"; final action projected 07/2027. [12][14]
- 710 large breaches in 2025; at least 61,556,256 individuals; average breach size 86,699 (median 4,011) vs 389,707 (median 6,702) in 2024 (HIPAA Journal from OCR portal). [85]
- HHS CPGs: 10 essential goals and 10 enhanced goals mapped to HICP 2023 sub-practices (HHS 405(d)). [83][84]
- Joint Commission: 99 cyber/ransomware/hacking events reported in 10 years; 90% impacted hospitals. [19]

**MTTx metrics**
- Time to restore critical systems (NPRM target: 72 hours). [12][13]
- Breach notification timeliness (60 days); OCR breach verification generally completed within 14 days before portal posting. [8]
- Audit evidence cycle time: no benchmark found (see Gaps).

**Technical jargon**
- Security: risk analysis, criticality analysis, SBOM/VEX, BAA, third-party risk management, encryption at rest and in transit, configuration baselines.
- Network Infrastructure: documented network maps, segmentation evidence, port disablement per risk analysis.
- WAN: data flow documentation for ePHI across sites and clouds.
- Visibility: continuous control monitoring, centralized log collection, asset inventory reconciliation.
- Orchestration: compliance-as-code, automated evidence collection, policy drift alerts, GRC integration.

**2023-2026 incidents**
- Change Healthcare (2024): OCR opened investigations of Change Healthcare and UnitedHealth Group; no enforcement action announced as of early 2026 (secondary source). [8][102]

---

### Use case 10: AI workload delivery (ambient documentation, imaging AI, network path, governance)

**Problem statement.** AI is moving into the clinical path: ambient scribes stream exam-room audio to cloud models and return draft notes into the EHR, and imaging AI reprioritizes worklists and flags critical findings for time-sensitive conditions. These workloads add continuous upstream audio, large image transfers to inference engines, and new third-party data flows that must be secured, monitored, and kept fast enough not to break clinician workflow. Evidence of benefit is real but modest and depends on workflow fit. Why now: 81% of physicians use AI professionally (2026), radiology AI authorizations exceed 1,100, and ECRI ranks misuse of AI chatbots as the #1 health technology hazard for 2026.

**Impact bullets**
- Patient outcomes: AI triage cut PE report turnaround during work hours by 22.2 minutes but not off-hours (JACR, 2025); ICH triage showed no TAT improvement in a prospective study (AJR, 2025). [50][51]
- Revenue/financial: AI scribe adoption was associated with 0.49 additional weekly visits and about USD 167 per month in added billing per adopting clinician (JAMA, 2026; described as nominal by the authors). [53][54]
- Clinical workflow: 13.4 fewer minutes of EHR time and 16.0 fewer minutes of documentation time per 8 scheduled patient hours (about 3% and 10% relative reductions); 21.3 and 27.3 fewer minutes for clinicians using scribes in 50% or more of visits; after-hours EHR time did not change significantly (8,581 clinicians, 5 academic systems, JAMA 2026). [53][54]
- Operational workflow: Only 32% of AI scribe users used them in at least half of visits. [54]
- Compliance/risk: Ambient documentation creates new PHI flows to cloud providers that require BAAs and governance; FDA list does not tag LLM functionality yet. [56]
- Staff burnout: Burnout fell from 51.9% to 38.8% after 30 days of ambient scribe use (263 ambulatory clinicians, 6 systems; quality improvement study without a control group; JAMA Network Open, 2025). [52]

**Quantified numbers**
- AMA 2026: 81% of physicians use AI professionally (38% in 2023); average 2.3 use cases per physician (1.1 in 2023); 30% use AI for discharge instructions/care plans/progress notes; 28% for visit notes/billing documentation; 28% for chart summaries; 19% for draft portal replies. [55]
- FDA AI-enabled devices: 1,451 through end of 2025, 1,104 radiology (76%); 72 cleared in Q4 2025, 55 radiology; FDA states over 1,600 as of September 2026. [56][57][58]
- PE AI triage: 11,252 CTPA exams; PE-positive TAT 68.9 to 46.7 minutes (work hours). [50]

**MTTx metrics**
- Report TAT for AI-flagged studies; EHR-8 and DocTime-8 minutes per 8 scheduled hours. [50][53]
- AI inference latency, upstream audio bandwidth per room, and AI service SLAs: no neutral published benchmarks found (see Gaps).

**Technical jargon**
- Security: data loss prevention for AI prompts, model access governance, BAA coverage, API security, AI usage monitoring, prompt injection controls.
- Network Infrastructure: exam-room Wi-Fi uplink capacity, GPU clusters for on-prem inference, high-throughput storage for imaging AI.
- WAN: cloud on-ramps, private interconnects to AI providers, QoS for streaming audio, egress controls.
- Visibility: AI application discovery, API telemetry, per-session latency, model performance monitoring.
- Orchestration: AI orchestration/routing for imaging (DICOM routers), PCCP-governed model updates, change control for AI tools.

**2023-2026 incidents**
- ECRI 2026 hazard #1: misuse of AI chatbots in healthcare. [27]
- No public 2023-2026 incident found where AI workload network failure caused patient harm (see Gaps).

---

## 3) KPI / MTTx table (all numbers found)

| # | Metric | Figure | Year | Organization | Source |
|---|---|---|---|---|---|
| 1 | Hospital YTD operating margin index (with allocations) | 2.5% (8.0% without) | Aug 2026 | Kaufman Hall | [4][5] |
| 2 | Hospitals operating at a loss | ~43% (vs ~33% pre-COVID) | Aug 2026 | Kaufman Hall | [4] |
| 3 | Total hospital expense growth | +7.5% | 2025 | AHA/Strata | [7] |
| 4 | Total hospital expense growth vs inflation | +5.1% vs 2.9% | 2024 | AHA | [6] |
| 5 | Hospital computing infrastructure spend | ~USD 4.5B, +15% | 2024 | AHA/Lightcast | [7] |
| 6 | Avg healthcare breach cost | USD 6.64M (2026); USD 7.42M (2025); USD 9.77M (2024) | 2024-2026 | IBM/Ponemon | [1][2] |
| 7 | Global MTTI / MTTC / total | 183 / 64 / 247 days | 2026 | IBM/Ponemon | [1] |
| 8 | Global MTTI / MTTC / total | 181 / 60 / 241 days | 2025 | IBM/Ponemon | [1] |
| 9 | Healthcare breach lifecycle | 279 days | 2025 | IBM/Ponemon | [2] |
| 10 | U.S. avg breach cost | USD 11.5M | 2026 | IBM/Ponemon | [3] |
| 11 | Change Healthcare individuals affected | ~192.7M | 2025 (final) | HHS OCR | [8] |
| 12 | Change Healthcare 2024 cost | USD 3.09B | 2024 | UnitedHealth Group | [9] |
| 13 | Ascension FY24 operating loss incl. cyber | USD 1.8B | FY2024 | Ascension | [10] |
| 14 | Ascension individuals affected | 5,599,699 | 2024 | HHS OCR / Maine AG | [11] |
| 15 | Ransomware: hospital volume drop (attack week) | 17% to 25% | 2016-2021 data | Univ. of Minnesota (working paper) | [15] |
| 16 | Ransomware: Medicare revenue drop | 19% to 41% | 2016-2021 data | Univ. of Minnesota (working paper) | [15] |
| 17 | Ransomware: in-hospital mortality increase | ~20% to 35% | 2016-2021 data | Univ. of Minnesota | [15][16] |
| 18 | Adjacent ED stroke code activations | +74.6% (59 to 103) | 2021 event, pub. 2023 | UC San Diego, JAMA Netw Open | [17] |
| 19 | Adjacent ED waiting room median | 21 to 31 min | 2021 event | JAMA Netw Open | [17] |
| 20 | Adjacent ED LOS (admitted) median | 614 to 822 min | 2021 event | JAMA Netw Open | [17] |
| 21 | Cardiac arrests at adjacent hospital | 21 to 38 | 2021 event, pub. 2024 | Crit Care Explorations | [18] |
| 22 | OHCA favorable neuro survival | 40.0% to 4.5% | 2021 event | Crit Care Explorations | [18] |
| 23 | Offline readiness expectation | 4 weeks or longer | SEA 67 | Joint Commission | [19] |
| 24 | Proposed restore target for critical systems | 72 hours | NPRM 2025 | HHS OCR | [12][13] |
| 25 | NPRM final action projection | July 2027 | 2026 agenda | HHS (reginfo) | [14] |
| 26 | Large healthcare breaches | 710; 61.56M individuals; ~80% hacking/IT | 2025 | HIPAA Journal / OCR | [85] |
| 27 | Healthcare ransomware: recovered within 1 week | 58% (21% in 2024) | 2025 | Sophos (vendor survey) | [86] |
| 28 | Healthcare ransomware: used backups | 51% (72% prior) | 2025 | Sophos (vendor survey) | [86] |
| 29 | Healthcare ransomware: paid ransom | 36% | 2025 | Sophos (vendor survey) | [86] |
| 30 | Healthcare ransomware: avg recovery cost | USD 1.02M | 2025 | Sophos (vendor survey) | [86] |
| 31 | Ascension EHR downtime | ~6 to 7 weeks (May 8 to June 30) | 2024 | Ascension / HIPAA Journal | [11][98] |
| 32 | Kettering core EHR restore | 13 days; normal ops ~3 weeks | 2025 | Kettering Health | [62] |
| 33 | Lurie EHR restore | ~33 days | 2024 | Lurie / Chicago Sun-Times | [69] |
| 34 | Synnovis full restoration | ~6 months (June to Dec 2024) | 2024 | NHS England | [67] |
| 35 | Synnovis postponed activity | 10,152 outpatient appts; 1,710 elective procedures | 2024 | NHS / Digital Health | [66] |
| 36 | Synnovis direct losses | GBP 32.7M | 2024 | Synnovis filing | [66] |
| 37 | Brockton ambulance diversion | 9 days (Apr 6 to 15) | 2026 | Signature Healthcare | [71] |
| 38 | CrowdStrike: hospitals with disruptions | 759 of 2,232 (34.0%) | 2024 | JAMA Netw Open | [64] |
| 39 | CrowdStrike: services recovered within 6 h / over 48 h | 58.1% / 7.8% | 2024 | JAMA Netw Open | [64] |
| 40 | Unplanned EHR downtime prevalence | 96% in 3 yrs; 70% had one over 8 h | 2014 | Sittig et al. | [79] |
| 41 | EHR downtime cost (large hospital) | up to USD 1M/hour (ESTIMATE) | cited 2018 | Sittig (quoted) | [78] |
| 42 | EHR downtime cost per physician | USD 634/hour (ESTIMATE) | cited 2017 | AC Group | [80] |
| 43 | Citrix ICA RTT default thresholds | warn 300 ms; critical 400 ms | current | Citrix | [37] |
| 44 | Citrix session network latency thresholds | warn 150 ms; critical 250 ms | current | Citrix | [37] |
| 45 | Citrix zone latency limit | 250 ms RTT | current | Citrix | [38] |
| 46 | ICA latency user perception | optimal 0-150; acceptable 150-300; degraded 300+ ms | current | Monitoring vendor (VENDOR-REPORTED) | [39] |
| 47 | Physician burnout | 43.2% | 2024 | AMA | [87] |
| 48 | Nurse shift time documenting | ~35% (range 26%-41%; ~40% per Surgeon General) | 2023-2024 | JAMIA; Nursing Mgmt; AACN | [59][60][61] |
| 49 | SSO reconnect login | 29.3 s to 8.9 s (20.4 s saved) | 2018 data | Peer-reviewed, 19 hospitals | [77] |
| 50 | SSO value | USD 168,474 per hospital per year | 2018 data | Peer-reviewed | [77] |
| 51 | Medical devices with KEVs in org | 99% of orgs | 2025 | Claroty (VENDOR-REPORTED) | [25] |
| 52 | Imaging devices with KEVs | 28% | 2025 | Claroty (VENDOR-REPORTED) | [25] |
| 53 | Infusion pumps with known security gaps | 75% of 200,000 | 2025 | Trellix (VENDOR-REPORTED) | [24] |
| 54 | Devices on unsupported/EOL OS | 1 in 5 (2025); 14% (2023) | 2023-2025 | Trellix; Claroty (VENDOR-REPORTED) | [24][26] |
| 55 | Device vulnerability dwell time | 3.2 years | 2025 | Trellix (VENDOR-REPORTED) | [24] |
| 56 | Vocera min signal / SNR | -65 dBm / 25 dB | current | Vocera (Stryker) | [40][41] |
| 57 | Vocera DTIM / beacon | 1 / 100 ms; product max 108 ms | current | Vocera | [40][42] |
| 58 | Voice roam targets | under 50 ms ideal; under 100 ms acceptable | current | Vocera design guide | [44] |
| 59 | Ascom roam WPA3-SAE without/with FT | ~174 ms / ~31 ms | current | Ascom interop report | [45] |
| 60 | Nurse time searching for equipment | 21 to 60 min/shift | multiple, older | HIMSS summary | [90] |
| 61 | Whole-slide image size | ~15 GB uncompressed; ~300 MB JPEG 2000 | current | DICOM/NEMA | [47] |
| 62 | Avg digital pathology slide | 1.3 GB | current | Storage vendor (VENDOR-REPORTED) | [49] |
| 63 | CT chest / MRI brain study size | 300-800 MB / 150-400 MB (ESTIMATE) | current | Industry planning ranges | [48] |
| 64 | 1 GB study over 100 Mbps at 70% | ~114 s (ESTIMATE) | n/a | Arithmetic | [101] |
| 65 | AI triage PE report TAT (work hours) | 68.9 to 46.7 min | 2025 | JACR | [50] |
| 66 | AI triage ICH report TAT | 147.1 vs 149.9 min (no improvement) | 2025 | AJR | [51] |
| 67 | Stroke door-to-needle goals | 60 min in 85%+; 45 min in 75%+ | Phase III | AHA/ASA | [89] |
| 68 | Stroke door-to-device goal | 90 min direct / 60 min transfer in 50%+ | Phase III | AHA/ASA | [89] |
| 69 | Medicare RPM enrollees / payments | ~1M (+27%) / USD 536M (+31%) | 2024 | HHS OIG | [35] |
| 70 | AHCAH approved | 358 CCNs, 134 systems, 37 states | Oct 2026 | CMS | [28] |
| 71 | AHCAH waiver end | Sep 30, 2030 | 2026 law | CMS / Congress | [29][33] |
| 72 | Medicare telehealth flexibilities end | Dec 31, 2027 | 2026 law | HHS / CMS | [32][34] |
| 73 | Hospital M&A announced | 46 (72 in 2024); 43.5% distressed | 2025 | Kaufman Hall | [75][76] |
| 74 | Network-caused outage top cause | Config/change mgmt 34% | 2025 survey | Uptime Institute | [81] |
| 75 | IT/network share of impactful outages | 23% | 2024 | Uptime Institute | [81] |
| 76 | Last major outage cost over USD 100K / over USD 1M | 57% / 1 in 5 | 2025 survey | Uptime Institute | [82] |
| 77 | SD-WAN case: hardware outage reduction | up to 33% across 200+ sites | 2024-2025 | Vendor case study (VENDOR-REPORTED) | [88] |
| 78 | Physicians using AI | 81% (38% in 2023) | 2026 | AMA | [55] |
| 79 | AI scribe EHR time / doc time change | -13.4 / -16.0 min per 8 sched. hours | 2026 | JAMA multisite | [53] |
| 80 | AI scribe burnout change | 51.9% to 38.8% (no control) | 2025 | JAMA Netw Open | [52] |
| 81 | FDA AI-enabled devices | 1,451 (76% radiology) end 2025; 1,600+ Sep 2026 | 2025-2026 | FDA | [56][57][58] |

---

## 4) Gaps: what could NOT be verified

1. **EHR application latency budget:** No public Epic Hyperspace (or Oracle Health) network latency requirement was found. Citrix publishes default monitoring thresholds and a 250 ms zone guideline, but the 0-150 ms "optimal" band comes from a third-party monitoring vendor.
2. **EHR downtime cost per hour:** No recent (2023-2026) Ponemon, HIMSS, or peer-reviewed figure was found. The USD 1 million per hour figure is a quoted estimate (cited 2018), and USD 634 per physician per hour is a 2017-era consultancy estimate. Treat both as dated estimates.
3. **Mean time to innocence (MTTI, "prove it isn't the network"):** Common industry vocabulary, but no published statistic was found. Do not quantify it in the storyboard.
4. **Healthcare-specific breach lifecycle for 2026:** IBM 2026 gives global MTTI/MTTC (183/64 days) but a healthcare-specific 2026 lifecycle figure was not found; the latest healthcare figure is 279 days (2025 report).
5. **Ascension total cyber cost:** Ascension did not disclose a standalone cost. Its FY24 operating loss of USD 1.8 billion "includes" the cyber impact. Third-party estimates of roughly USD 1.3 billion are derivations from year-over-year changes and are not used as a figure here.
6. **Neutral SD-WAN adoption data for healthcare:** No vendor-neutral survey of SD-WAN adoption rates in hospitals or clinics was found; the only quantified outcome is a vendor case study.
7. **Wi-Fi MTBF/MTTR and Wi-Fi 6E/7 hospital adoption:** No published benchmark for clinical WLAN reliability or adoption rates of 6 GHz in hospitals was found.
8. **Medical device patch latency and device MTTD/MTTR:** Only vendor-reported dwell time (3.2 years) was found; no neutral benchmark.
9. **AI workload network SLAs:** No published latency or bandwidth requirement for ambient scribe audio streams or imaging AI inference was found.
10. **Radiology read TAT national benchmark and cloud PACS adoption (KLAS):** Not re-verified with a citable, freely accessible 2023-2026 source; only single-site AI triage studies are cited.
11. **Proofpoint/Ponemon "Cyber Insecurity in Healthcare" 2025-2026 editions:** Not verified; figures from that series are not used.
12. **Patient harm attributable to IoMT compromise or Wi-Fi voice failure:** No confirmed 2023-2026 U.S. incident found.
13. **Equipment search time (RTLS):** The 21 to 60 minutes per shift range is summarized by HIMSS from older studies; no 2023-2026 neutral study was found.
14. **Hospital-at-home counts:** CMS lists 358 CCNs (Oct 19, 2026); trade press cites 365 campuses across 137 systems. The difference was not reconciled; the CMS figure is used.
15. **Lurie Children's restoration:** Chicago Sun-Times reports Epic restored March 4, 2024; HIPAA Journal states access was restored by May 20, 2024 (likely full restoration including portal). The earlier date is used for the EHR.
16. **Neprash et al. ransomware mortality estimate:** Reported as a working paper in 2023; peer-reviewed publication status was not re-verified.
17. **Brockton (2026) ransomware attribution:** Attribution to the Anubis group is a claim reported by trade press, not confirmed by the hospital. UNM (2026) attribution to "Byod" and the 36,000-system claim are attacker claims.

---

## 5) Full source list (numbered)

1. IBM / Ponemon Institute, Cost of a Data Breach Report 2026. https://assets.ibm.com/adobe/assets/urn:aaid:aem:21111142-1251-4369-86fb-57b82f5bb108/original/as/Cost%20of%20a%20Data%20Breach%20Report%202026.pdf
2. IBM / Ponemon Institute, Cost of a Data Breach Report 2025. https://www-api.ibm.com/adobe/assets/urn:aaid:aem:607b9590-38e0-4c91-b433-aa8a17f5b5e8/original/as/cost-of-a-data-breach-2025-full-report.pdf
3. CFO.com, "Average cost of data breaches is up 12% this year" (IBM 2026). https://www.cfo.com/news/average-cost-of-data-breaches-is-up-12-this-year-IBM/827713/
4. Kaufman Hall (Vizient), National Hospital Flash Report: August 2026 Data (Oct 13, 2026). https://www.vizient.com/insights/reports/national-hospital-flash-report/august-2026-data
5. Becker's Hospital Review, "Hospital revenue up, margins still under pressure: 6 notes" (2026). https://www.beckershospitalreview.com/finance/hospital-revenue-up-margins-still-under-pressure-6-notes/
6. American Hospital Association, The Cost of Caring (April 2025). https://www.aha.org/system/files/media/file/2025/04/The-Cost-of-Caring-April-2025.pdf
7. Fierce Healthcare, "AHA: Hospitals' total expenses rose 7.5% in 2025" (2026), with AHA Costs of Caring 2026 detail via ACHI. https://www.fiercehealthcare.com/providers/aha-hospitals-total-expenses-rose-75-2025 and https://www.healthycommunities.org/node/683162
8. HHS OCR, Change Healthcare Cybersecurity Incident FAQ. https://www.hhs.gov/hipaa/for-professionals/special-topics/change-healthcare-cybersecurity-incident-frequently-asked-questions/index.html
9. Becker's Hospital Review, "The financial toll of the Change Healthcare hack: 7 numbers" (Jan 17, 2025). https://www.beckershospitalreview.com/healthcare-information-technology/cybersecurity/the-financial-toll-of-the-change-healthcare-hack-7-numbers/
10. Ascension, Q4 FY24 financial results (Sep 2024). https://about.ascension.org/news/2024/09/ascension-releases-q4-fy24-financial-results
11. HIPAA Journal, "Ascension Ransomware Attack Affects 5.6 Million Patients" (2024). https://www.hipaajournal.com/ascension-cyberattack-2024/
12. Federal Register, HIPAA Security Rule To Strengthen the Cybersecurity of ePHI (NPRM, Jan 6, 2025, Doc 2024-30983). https://www.federalregister.gov/documents/2025/01/06/2024-30983/hipaa-security-rule-to-strengthen-the-cybersecurity-of-electronic-protected-health-information
13. HHS OCR, HIPAA Security Rule NPRM Fact Sheet. https://www.hhs.gov/hipaa/for-professionals/security/hipaa-security-rule-nprm/factsheet/index.html
14. OIRA / reginfo.gov, RIN 0945-AA22 Unified Agenda entry (2026). https://www.reginfo.gov/public/do/eAgendaViewRule?RIN=0945-AA22&pubId=202510
15. Neprash, McGlave, Nikpay et al., "Hacked to Pieces? The Effects of Ransomware Attacks on Hospitals and Patients" (working paper, 2023). https://dpu-p-001.sitecorecontenthub.cloud/api/public/content/09f039a6eb4f4adbb9d547d55620ebe4?v=09008f9d
16. NPR, "Ransomware attacks against hospitals put patients' lives at risk, researchers say" (Oct 20, 2023). https://www.npr.org/2023/10/20/1207367397/ransomware-attacks-against-hospitals-put-patients-lives-at-risk-researchers-say
17. Dameff et al., "Ransomware Attack Associated With Disruptions at Adjacent Emergency Departments in the US," JAMA Network Open (2023). https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2804585
18. "Ransomware Cyberattack Associated With Cardiac Arrest Incidence and Outcomes at Untargeted, Adjacent Hospitals," Critical Care Explorations (2024). https://journals.lww.com/ccejournal/fulltext/10.1097/cce.0000000000001079~ransomware-cyberattack-associated-with-cardiac-arrest
19. The Joint Commission, Sentinel Event Alert 67: Preserving patient safety after a cyberattack (PDF). https://digitalassets.jointcommission.org/api/public/content/8bd6addf4df943f383a074f2d9d4af64
20. The Joint Commission, Sentinel Event Alert 67 landing page. https://www.jointcommission.org/en-us/knowledge-library/newsletters/sentinel-event-alert/issue-67
21. Federal Register, FDA notice of final guidance "Cybersecurity in Medical Devices" (June 27, 2025). https://www.govinfo.gov/content/pkg/FR-2025-06-27/html/2025-11669.htm
22. FDA, Cybersecurity in Medical Devices: Quality Management System Considerations and Content of Premarket Submissions (guidance PDF). https://www.fda.gov/media/119933/download
23. 21 U.S.C. 360n-2 (FD&C Act section 524B), Ensuring cybersecurity of devices. https://uscode.house.gov/us/usc/119-124/t21/s360n-2/
24. Trellix, Healthcare Cybersecurity Threat Intelligence Report 2025 (VENDOR-REPORTED). https://trellix-dr.trellix.com/assets/reports/trellix-healthcare-cybersecurity-threat-intelligence-report.pdf
25. Claroty Team82, State of CPS Security Report: Healthcare Exposures 2025 (Mar 26, 2025; VENDOR-REPORTED). https://www.claroty.com/blog/clarotys-state-of-cps-security-report-healthcare-exposures-2025
26. Claroty, press release on State of CPS Security Report: Healthcare 2023 (Mar 12, 2024; VENDOR-REPORTED). https://www.claroty.com/press-releases/63-of-known-vulnerabilities-tracked-by-cisa-are-on-healthcare-organization-networks-clarotys-team82-finds
27. ECRI, Top 10 Health Technology Hazards for 2026 (blog and executive brief). https://home.ecri.org/blogs/ecri-news/examining-the-greatest-health-technology-threats-of-2026 and https://www.draeger.com/Content/Documents/Content/ECRI-Top-10-Health-Technology-Hazards-for-2026-Executive-Brief.pdf
28. CMS QualityNet, Acute Hospital Care at Home Resources: Approved Facilities (updated Oct 19, 2026). https://qualitynet.cms.gov/publicgateway/public/acute-hospital-care-at-home/resources
29. CMS QualityNet, Acute Hospital Care at Home (program and waiver pages). https://qualitynet.cms.gov/acute-hospital-care-at-home and https://qualitynet.cms.gov/acute-hospital-care-at-home/waiver
30. CMS, Acute Hospital Care at Home Data Release Fact Sheet. https://www.cms.gov/newsroom/fact-sheets/acute-hospital-care-home-data-release-fact-sheet-0
31. Becker's Hospital Review, "Hospitals, health systems approved for hospital at home in 2026." https://www.beckershospitalreview.com/healthcare-information-technology/innovation/hospitals-health-systems-approved-for-hospital-at-home-in-2026/
32. HHS Telehealth.HHS.gov, Telehealth policy updates. https://telehealth.hhs.gov/providers/telehealth-policy/telehealth-policy-updates
33. U.S. Senate Finance Committee, Consolidated Appropriations Act, 2026 Section-by-Section (sec. 6209, 6210). https://www.finance.senate.gov/imo/media/doc/consolidated_appropriations_act_2026_section-by-section.pdf
34. CMS, Telehealth FAQ (updated Oct 2026). https://www.cms.gov/files/document/telehealth-faq-updated-10-09-2026.pdf
35. HHS OIG, Final Data Snapshot: Billing for Remote Patient Monitoring in Medicare (OEI-02-23-00261, 2025). https://oig.hhs.gov/documents/evaluation/10901/OEI-02-23-00261.pdf
36. HHS OIG, Billing for Remote Patient Monitoring in Medicare (report page, Aug 2025). https://oig.hhs.gov/reports/all/2025/billing-for-remote-patient-monitoring/
37. Citrix, Site analytics thresholds (documentation). https://docs.citrix.com/us/en/citrix-daas/monitor/site-analytics/thresholds.html
38. Citrix, Zones (Citrix Virtual Apps and Desktops documentation). https://docs.citrix.com/us/en/citrix-virtual-apps-desktops/current-release/manage-deployment/zones.html
39. Goliath Technologies, Citrix ICA/HDX latency guidance and troubleshooting (VENDOR-REPORTED). https://support.goliathtechnologies.com/hc/en-us/articles/360039780093-Citrix-Virtual-Apps-Desktops-ICA-HDX and https://support.goliathtechnologies.com/hc/en-us/articles/360022808414-Troubleshooting-Citrix-Session-Slowness-ICA-RTT-Server-Performance
40. Vocera (Stryker), Common WLAN Settings. https://pubs.vocera.com/solution/vig/production/help/vig_vig_wlan_help/solution/vig/production/topics/vig_wlanrequirements.html
41. Vocera (Stryker), Signal Propagation. https://pubs.vocera.com/solution/vig/production/help/vig_vig_help/solution/vig/production/topics/vig_coverage.html
42. Vocera (Stryker), Beacon and DTIM Intervals. https://pubs.vocera.com/solution/vig/production/help/vig_vig_help/solution/vig/production/topics/vig_beacondtim.html
43. Vocera (Stryker), Fast Transition Roaming: 802.11r. https://pubs.vocera.com/solution/vig/production/help/vig_vig_help/solution/vig/production/topics/vig_802.11_r.html
44. Vocera Wireless Design and Configuration Guide (wireless vendor community article). https://arista.my.site.com/AristaCommunity/s/article/Vocera-Wireless-Design-and-Configuration-Guide
45. Ascom, i63 interoperability report (WPA3/FT roaming results). https://wiki.innovaphone.com/images/6/67/I63_interop_aruba_networking_8_10_0_13.pdf
46. Ascom, Myco 4 interoperability report (roaming and 6 GHz results). https://www.juniper.net/content/dam/www/assets/partners/us/en/ascom-interoperability-report-juniper-mist-myco4.pdf
47. DICOM Standards Committee (NEMA), DICOM Whole Slide Imaging. https://dicom.nema.org/dicom/dicomwsi/
48. HexaTransfer, "DICOM File Sharing in Healthcare: Best Practices" (study size planning ranges; ESTIMATE). https://hexatransfer.com/en/blog/dicom-file-sharing-healthcare
49. Everpure (Pure Storage) and Dicom Systems, "Maximizing the DICOM Standard for Digital Pathology" (VENDOR-REPORTED). https://www.everpuredata.com/content/dam/pdf/en/white-papers/maximizing-dicom-standard-for-digital-pathology.pdf
50. Thompson et al., "Impact of AI Triage on Radiologist Report Turnaround Time," Journal of the American College of Radiology (2025). https://www.jacr.org/article/S1546-1440(25)00481-8/abstract
51. "Prospective Evaluation of AI Triage of Intracranial Hemorrhage on Noncontrast Head CT," American Journal of Roentgenology (2025). https://www.ajronline.org/doi/full/10.2214/AJR.24.31639
52. Olson et al., "Use of Ambient AI Scribes to Reduce Administrative Burden and Professional Burnout," JAMA Network Open (2025). https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2839542
53. "Changes in Clinician Time Expenditure and Visit Quantity With Adoption of AI-Powered Scribes: A Multisite Study," JAMA (2026). https://jamanetwork.com/journals/jama/fullarticle/2847319
54. Mass General Brigham, "AI Scribes Linked to Modest Reductions in EHR Use and Clinical Documentation Time" (2026). https://news.massgeneralbrigham.org/en/ai-scribes-linked-to-modest-reductions-in-ehr-documentation-time
55. American Medical Association, "More than 80% of physicians use AI professionally: AMA survey" (2026). https://www.ama-assn.org/practice-management/digital-health/more-80-physicians-use-ai-professionally-ama-survey
56. FDA, List of Artificial Intelligence-Enabled Medical Devices. https://www.fda.gov/medical-devices/artificial-intelligence-enabled-medical-devices/list-artificial-intelligence-enabled-medical-devices
57. The Imaging Wire, "FDA Updates AI List with New Clearances" (Mar 11, 2026). https://theimagingwire.com/2026/03/11/numbers-from-the-fda-show-radiology-is-maintaining-its-lead/
58. FDA, Artificial Intelligence-Enabled Medical Devices (overview page, "over 1,600 as of September 2026"). https://www.fda.gov/medical-devices/digital-health-center-excellence/artificial-intelligence-enabled-medical-devices
59. "EHR system use and documentation burden of acute and critical care nurse clinicians: a mixed-methods study," JAMIA (2024). https://pmc.ncbi.nlm.nih.gov/articles/PMC11491602/
60. AACN, "Nursing Documentation Burden: A Critical Problem to Solve" (cites U.S. Surgeon General advisory). https://www.aacn.org/blog/nursing-documentation-burden-a-critical-problem-to-solve
61. "A shared governance approach to nursing documentation," Nursing Management (2023). https://www.ovid.com/jnls/nursingmanagement/fulltext/10.1097/01.numa.0000919064.29246.6b~a-shared-governance-approach-to-nursing-documentation
62. Kettering Health, System-wide Technology Outage updates (May to June 2025). https://ketteringhealth.org/system-wide-technology-outage/
63. The Record (Recorded Future News), "Kettering Health confirms attack by Interlock ransomware group" (2025). https://therecord.media/kettering-health-ohio-interlock-ransomware
64. "Patient Care Technology Disruptions Associated With the CrowdStrike Outage," JAMA Network Open (2025). https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2836824
65. WIRED, "At Least 750 US Hospitals Faced Disruptions During Last Year's CrowdStrike Outage" (2025). https://www.wired.com/story/at-least-750-us-hospitals-faced-disruptions-during-last-years-crowdstrike-outage-study-finds/
66. Digital Health, "Cyber attack cost Synnovis estimated GBP 32.7m in 2024" and "Synnovis attack led to at least two cases of severe patient harm" (Jan 2025). https://www.digitalhealth.net/2025/01/cyber-attack-cost-synnovis-estimated-32-7m-in-2024/ and https://www.digitalhealth.net/2025/01/synnovis-attack-led-to-at-least-two-cases-of-severe-patient-harm/
67. NHS England, Synnovis cyber incident. https://www.england.nhs.uk/synnovis-cyber-incident/
68. BBC News, "NHS ransomware attack contributed to patient's death" (2025). https://www.bbc.co.uk/news/articles/cp3ly4v2kp2o
69. Chicago Sun-Times, "Lurie restores medical records system after cybersecurity threat" (Mar 5, 2024). https://chicago.suntimes.com/health/2024/03/05/lurie-childrens-hospital-cyberattack-restores-electronic-medical-record-system
70. HIPAA Journal, "January 2024 Cyberattack on Lurie Children's Hospital Affects 792K Individuals." https://www.hipaajournal.com/january-2024-cyberattack-on-lurie-childrens-hospital-affects-792k-individuals/
71. Signature Healthcare, Alert Announcements (April 2026). https://signature-healthcare.org/pages/alerts/
72. TechTarget, "Cyberattack continues to disrupt operations at Signature Healthcare" (Apr 15, 2026). https://www.techtarget.com/healthtechsecurity/news/366641391/Cyberattack-continues-to-disrupt-operations-at-Signature-Healthcare
73. BleepingComputer, "UNM Health ransomware attack disrupts patient care, surgeries" (Oct 27, 2026). https://www.bleepingcomputer.com/news/security/unm-health-ransomware-attack-disrupts-patient-care-surgeries/
74. KRQE, "UNM Health systems come back online after Monday's cyber attack" (Oct 2026). https://www.krqe.com/news/albuquerque-metro/unm-health-systems-come-back-online-after-mondays-cyber-attack/
75. Kaufman Hall, "Hospital and health system M&A activity ends 2025 with momentum" (Jan 15, 2026). https://www.kaufmanhall.com/news/hospital-and-health-system-ma-activity-ends-2025-momentum
76. Kaufman Hall, Hospital and health system M&A in review 2025 (PDF). https://www.kaufmanhall.com/sites/default/files/2026-01/KH-Report_M+A_2025-Review_0.pdf
77. Gellert et al., "An Evaluation of the Clinical and Financial Value of Work Station Single Sign-on in 19 Hospitals" (PMC). https://pmc.ncbi.nlm.nih.gov/articles/PMC6669364/
78. Healthcare IT Today, "Hospitals, Doctors And Patients Impacted By Unplanned EHR Downtime" (June 18, 2018). https://www.healthcareittoday.com/2018/06/18/hospitals-doctors-and-patients-impacted-by-unplanned-ehr-downtime/
79. Sittig et al., "Contingency planning for EHR-based care continuity: a survey of recommended practices" (2014). https://pubmed.ncbi.nlm.nih.gov/25200197/
80. For The Record, "The Price of EHR Downtime" (2017). https://www.fortherecordmag.com/archives/1117p24.shtml
81. Uptime Institute, Annual Outage Analysis 2025. https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.AnnualOutageAnalysis.pdf?version=0
82. Uptime Institute, "Uptime Announces Annual Outage Analysis Report 2026." https://uptimeinstitute.com/about-ui/press-releases/uptime-announces-annual-outage-analysis-report-2026
83. HHS Cyber Gateway, Healthcare and Public Health Cybersecurity Performance Goals. https://hhscyber.hhs.gov/cybersecurity-performance-goals.html
84. HHS 405(d), What's New in the HICP 2023 Edition / CPG alignment. https://405d.hhs.gov/Documents/405d-cpg-highlights-2024.pdf
85. HIPAA Journal, 2025 Healthcare Data Breach Report. https://www.hipaajournal.com/2025-healthcare-data-breach-report/
86. Sophos, The State of Ransomware in Healthcare 2025 (VENDOR-REPORTED survey). https://assets.sophos.com/X24WTUEQ/at/cq9bfnh5g9kpw874qqg5th/sophos-state-of-ransomware-in-healthcare-2025.pdf
87. American Medical Association, "U.S. physician burnout hits lowest rate since COVID-19" (2025). https://www.ama-assn.org/practice-management/physician-health/us-physician-burnout-hits-lowest-rate-covid-19
88. Atlantic Health System SD-WAN customer case study (network security vendor; VENDOR-REPORTED). https://www.paloaltonetworks.com/customers/atlantic-health-system-secures-patient-and-provider-experience-with-panw
89. American Heart Association / American Stroke Association, Target: Stroke Phase III brochure. https://www.heart.org/en/-/media/Files/Professional/Quality-Improvement/Target-Stroke/Target-Stroke-Phase-III/TS-Phase-III-5-6-19/FINAL5619-Target-Stroke-Phase-3-Brochure.pdf?sc_lang=en
90. HIMSS, "Applying RTLS Technology to Improve Nurse Efficiency and Patient Care." https://www.himss.org/resources/applying-rtls-technology-improve-nurse-efficiency-and-patient-care/
91. Medscape, "AMA Survey: More Doctors Are Embracing AI-Based Tools" (2026; ambient scribe use may exceed 50% per commentary). https://www.medscape.com/viewarticle/ama-survey-more-doctors-are-embracing-ai-based-tools-2026a1000k8x
92. Healthcare Dive, "Ascension cyberattack exposes data from 5.6 million people" (Dec 2024; ambulance diversion). https://www.healthcaredive.com/news/ascension-cyberattack-data-breach-5-6-million/736167/
93. Reuters, "Hack at UnitedHealth's tech unit impacted 192.7 million people" (Aug 14, 2025). https://www.reuters.com/business/hack-unitedhealths-tech-unit-impacted-1927-million-people-us-health-dept-website-2025-08-14/
94. Davis Wright Tremaine, "HHS Updates HIPAA Rulemaking Timeframes" (July 2026). https://www.dwt.com/blogs/privacy--security-law-blog/2026/07/hhs-updates-hipaa-rulemaking-timeframes
95. AHRQ (Wernz et al.), Evidence-based Contingency Planning for EHR Downtime, Final Report (2018). https://digital.ahrq.gov/sites/default/files/docs/citation/r21hs024350-wernz-final-report-2018.pdf
96. C2A Security, "60 Healthcare and Medical Device Cybersecurity Risk Statistics for 2025" (aggregated list; VENDOR-REPORTED). https://c2a-sec.com/60-healthcare-and-medical-device-cybersecurity-risk-statistics-for-2025/
97. Howden, "The Synnovis cyber-attack: A warning for healthcare providers" (2025). https://www.howdengroup.com/uk-en/the-synnovis-cyber-atack-critical-patient-safety-warning-for-healthcare-providers
98. Ascension, Consolidated Financial Statements Q4 FY24 (cybersecurity incident note). https://about.ascension.org/-/media/project/ascension/about/section-about/financials/2024/consolidated-ascension-financial-statements-q4-fy24.pdf
99. TechTarget, "Healthcare Cyberattacks Linked to Disruptions at Neighboring Hospitals, Study Finds" (2023; 35.2% EMS arrival increase). https://www.techtarget.com/healthtechsecurity/news/366594334/Healthcare-Cyberattacks-Linked-to-Disruptions-at-Neighboring-Hospitals-Study-Finds
100. Ascom, Troubleshooting Guide i62 VoWiFi Handset (TD 92685EN). https://files.engineering.com/files/3fb413df-2035-4976-b0e3-3e812b031f06/tg_vowifi_td92685en.pdf
101. Imaging Exchange, DICOM study transfer time calculator (method: size in MB x 8 / usable throughput). https://imagingexchange.com.au/dicom-transfer-calculator
102. One Guy Consulting, "Change Healthcare Breach: One Year Later" (secondary summary; no-MFA remote portal, 9-day dwell, enforcement status). https://oneguyconsulting.com/blog/change-healthcare-breach-one-year-later
103. Lurie Children's Hospital, breach notice to Maryland Attorney General (June 27, 2024). https://oag.maryland.gov/resources-info/SBN%20Documents/2024/ITU-375092.pdf
