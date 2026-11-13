# Research Brief 11: Account profile, Memorial Sloan Kettering Cancer Center (MSK)

Date of research: November 13, 2026. Public sources only. Companion data file: `research/data/account-msk.json`.

## How to read this brief

- Every factual claim carries a numbered citation; the Sources section gives title, publisher, date and URL.
- Quotation marks mean the words were read on the cited page (or in the cited PDF) during this research.
- **VENDOR-REPORTED** marks numbers published by a supplier about its own customer story.
- **[search-level]** marks a claim taken from a search-engine result summary where the page itself could not be opened (paywall, bot block or 404). Treat these as leads, not as verified facts. They are repeated under Gaps.
- Every "with Cisco" statement is a **hypothesis to validate**. No public source found in this research says MSK uses or has bought Cisco Cloud Control, Cisco Data Fabric, Splunk, ThousandEyes, Meraki, Webex or any other current Cisco product.

## A) Executive summary

1. **Scale is outpatient and regional.** In 2024 MSK treated 74,098 patients, recorded 1,046,023 outpatient visits (316,078 of them telemedicine) and gave 212,457 chemotherapy treatments in its regional network against 129,857 in Manhattan [5]. Bed occupancy was 95.1% [5]. A network or record problem at a regional site is a care-capacity problem.
2. **Epic is new and still being optimized.** MSK and its physician practice have used Epic since February 1, 2025 [28]. MSK reported "a temporary dip in patient activity in February and March" 2025 [1], a 2025 operating deficiency of "($47.9) million" reflecting "planned one-time investments related to the go-live" [1], and then for the first half of 2026 "an excess of operating revenues over expenses of $216.6 million", crediting "efficiencies realized through the Epic electronic health record (EHR) system" [17].
3. **A major building is under way.** The Kenneth C. Griffin Pavilion is expected to be completed "by 2030" and will house "advanced technology, cutting-edge robotics, improved digital infrastructure, and enhanced operating suites" [2]. Trade press in June 2026 reports about $2.3 billion, 883,000 square feet, steel erection from mid-2027 and a mid-2030 target [10]. Operating suite counts conflict between sources (see Gaps).
4. **Research computing and AI sit next to clinical systems.** MSK's research cluster IRIS is described by Dell as processing "15+ petabytes of imaging data" and "over 6 million monthly computational jobs" (VENDOR-REPORTED) [8]. MSK's own governance paper says its AI platform runs on premises and on public cloud, with two generative AI sandboxes "approved by Information Security, Privacy, and Compliance" [21]. A February 2025 AWS collaboration adds cloud AI and high-performance computing [4].
5. **AI is governed formally.** In its first year the AI Governance Committee registered and monitored "26 AI models (including large language models)", reviewed two ambient AI pilots and 33 nomograms [21]. Abridge is rolling out through 2025 and 2026 (VENDOR-REPORTED) [7]; OpenEvidence is being integrated into the Epic workflow [15].
6. **The public incident record is mostly about suppliers.** Blackbaud (2020) [29], Accellion (2021) [13] and Nuance MOVEit (2023) [12] were incidents at vendors. A phishing attack identified on April 26, 2024 exposed data of 12,274 people [23]. On July 19, 2024, during the CrowdStrike outage, "procedures requiring anesthesia were suspended" [14].
7. **New digital leadership.** Shakeeb Akhter was announced as Chief Digital Officer on May 20, 2026, responsible for "the overall design and execution of MSK's digital strategy" and "an enterprise-wide strategy that connects clinical, research, and administrative domains" [3]. No public source found names a current CISO, CIO or chief AI officer.

## B) Organisation profile

| Item | Fact | Source |
|---|---|---|
| Founded | "founded in 1884 as New York Cancer Hospital" | [26] |
| Main campus | Memorial Hospital on York Avenue, Manhattan (move began 1936; hospital "opened in 1939") | [26] |
| Inpatient beds | "514 inpatient beds" | [26] |
| Manhattan outpatient and specialty sites named on MSK's locations menu | David H. Koch Center for Cancer Care, Josie Robertson Surgery Center, Evelyn H. Lauder Breast Center, Rockefeller Outpatient Pavilion, Sidney Kimmel Center for Prostate and Urologic Cancers, 64th Street Outpatient Center, MSK Imaging Center, MSK Ralph Lauren Center, Bendheim Integrative Medicine Center, and others | [20] |
| Regional sites named on MSK's locations menu (grouped here by site name) | Basking Ridge, Bergen, Monmouth (New Jersey); Westchester; Commack Nonna's Garden Foundation Center, Nassau, Skin Cancer Center Hauppauge (Long Island); Brooklyn Infusion Center | [20] |
| Research sites named | Mortimer B. Zuckerman Research Center, Rockefeller Research Laboratories, Arnold and Marie Schwartz Cancer Research Building | [20] |
| Kenneth C. Griffin Pavilion: status | Named March 14, 2025; "currently under construction"; "located on York Avenue between East 66th and East 67th Streets"; "built entirely within MSK's existing footprint" | [16] |
| Griffin Pavilion: completion | "We currently expect construction of The Kenneth C. Griffin Pavilion at MSK to be completed by 2030." Trade press: "targeted completion date of mid-2030"; "Steel erection will begin mid-2027." | [2] [10] |
| Griffin Pavilion: size | 883,000 square feet (per architect CannonDesign, as reported); about $2.3 billion (per Newsweek, as reported); height 481 feet after a 76-foot reduction | [10] [24] |
| Griffin Pavilion: beds and operating suites | MSK page (updated March 2025): "28 operating suites and 206 single-occupancy inpatient beds". Trade press (June 2026): 12 operating suites and "208 single-occupancy inpatient beds". Conflict unresolved. | [2] [10] |
| Griffin Pavilion: link to hospital | "connected to Memorial Hospital via an enclosed two-story patient bridge over 67th street" | [2] |
| Griffin Pavilion: builders | Turner Construction and Consigli Construction joint venture; architect CannonDesign | [10] |
| Patients treated (2024) | 74,098 | [5] |
| Admissions (2024) | 26,009 (adults 25,022; children 987); average stay 7.02 days; bed occupancy 95.1% | [5] |
| Outpatient visits (2024) | 1,046,023 including telemedicine: Manhattan 412,179; regional network 317,766; telemedicine 316,078 | [5] |
| Surgical cases (2024) | 29,494 | [5] |
| Chemotherapy treatments (2024) | Manhattan 129,857; regional network 212,457 | [5] |
| Radiation oncology new starts (2024) | Manhattan 4,779; regional network 8,341 | [5] |
| Diagnostic and interventional radiology procedures (2024) | 790,378 | [5] |
| Clinical research studies (2024) | 1,806 | [5] |
| Staff (2024) | Total 21,175: hospital attending staff 1,507; registered nurses 4,714; advanced practice providers 1,152; Sloan Kettering Institute members 155; administrative and support 13,664 | [5] |
| Operating revenues (2025) | $8,530,446 thousand; patient care revenue $7,115,163 thousand; grants and contracts $537,996 thousand | [31] |
| Operating result (2025) | Deficit of $47,894 thousand; "operating cash flow margin of 3.7% for 2025" | [31] [1] |
| Capital spending | $444,919 thousand in 2025; $468,993 thousand in 2024 | [31] |
| First half 2026 | "an excess of operating revenues over expenses of $216.6 million and an operating cash flow margin of 8.9%"; operating revenues up 11.5% | [17] |
| Rankings | 2026-27 U.S. News: "the #2 hospital for cancer care in the country"; "the #1 hospital in the nation for urology care" for the fourth consecutive year | [18] |
| Credit rating | Fitch assigned 'AA' to 2025 tax-exempt revenue bonds; "364.5 days cash on hand" (secondary summary of the Fitch report). Listed at AA, stable outlook, in an April 2026 trade roundup [search-level]. | [11] [43] |

### Leadership relevant to IT, digital and AI

| Name | Title as published | Source and date |
|---|---|---|
| Selwyn M. Vickers, MD, FACS | President and CEO | [16] Mar 2025; [24] May 2025 |
| Shakeeb Akhter | Chief Digital Officer (announced May 20, 2026; previously at Children's Hospital of Philadelphia, with work "spanning AI, clinical informatics, cybersecurity, advanced analytics") | [3] |
| Anaeze C. Offodile II, MD | Chief Strategy Officer (spokesperson for the AWS and OpenEvidence partnerships; last author of the AI governance paper) | [4] [15] [21] |
| Peter D. Stetson, MD | Chief Health Informatics Officer (first and corresponding author of the AI governance paper; quoted on Abridge) | [7] [21] |
| Lisa M. DeAngelis, MD | Physician-in-Chief and Chief Medical Officer (as of November 2022) | [6] |
| Jessica Audette | "Head of Research Technology Management" (Dell case study); "head of high-performance computing" (SiliconANGLE, November 2024) | [8] [9] |
| Tsvi Gal | Named "Head of Infrastructure of MSK" in May 2020, reporting to the then CIO; later conference listings give "CTO and Head of Enterprise Technology Services" [search-level]. Current status not verified. | [32] [44] |
| Kojo Elenitoba-Johnson, MD | Chair, Department of Pathology and Laboratory Medicine | [19] |
| David Solit, MD | Director, Marie-Josée and Henry R. Kravis Center for Molecular Oncology | [19] |
| Rémy Evard | "Chief Digital Officer and Head of Technology" in November 2022 (predecessor in the CDO role; departure date not verified) | [6] |
| CISO, CIO, chief AI officer, chief data officer | No current office-holder found in public sources | Gaps |

## C) Technology and digital posture (public record only)

| Area | What is public | Source |
|---|---|---|
| EHR selection | November 21, 2022: MSK "selected Epic to provide a new platform for integrated care" that "will streamline several systems that MSK staff and patients are currently required to navigate". Legacy systems are not named. | [6] |
| EHR go-live | "As of February 1, 2025, Memorial Sloan Kettering Cancer Center and our physician practice Memorial Medical Care, P.C." use Epic | [28] |
| EHR scope | "more than 18,000 MSK staff across hospitals and outpatient sites now work from a unified Epic EHR"; more than 100,000 patients registered for MyChart before launch; "nearly 90% of patients actively manage their care online" (VENDOR-REPORTED) | [22] |
| EHR and research | "more than 1,800 active research studies"; "over 25,000 patients enrolled in studies at any given time"; "more than 80% of study consents are completed electronically in Epic" (VENDOR-REPORTED) | [22] |
| Critical results | "providers acknowledge these results within just three minutes, compared to the 45-minute average" (VENDOR-REPORTED) | [22] |
| EHR financial effect | "MSK experienced a temporary dip in patient activity in February and March"; deficiency of "($174.9) million" for the first three quarters of 2025; "($47.9) million" for the full year. Trade press put the first-half 2025 operating loss at $113.2 million [search-level]. | [36] [1] [39] |
| Post go-live organisation | A "VP, Epic Systems" role was advertised to lead stabilization and optimization after the February 2025 go-live [search-level] | [46] |
| Health information exchange | "MSK participates in health information exchange through Epic Care Everywhere, Carequality and Healthix" | [28] |
| Patient portal | MSK MyChart (Epic) | [22] [6] |
| Cloud partnership | February 17, 2025: MSK and AWS to build "a high-quality, up-to-date longitudinal data resource for cancer research at MSK" from de-identified genomic, imaging and clinical data, "Leveraging large language models (LLMs) through Amazon Bedrock and Amazon SageMaker", with AWS ParallelCluster for simulations and "Cryo-EM data processing" | [4] |
| Innovation programme | "MSK's Innovation Hub ("iHub") launched in 2020"; AWS to support it with a dedicated AI team | [4] |
| Research computing | IRIS, the "Cluster of Discovery": "Processed 15+ petabytes of imaging data efficiently"; "Supported over 6 million monthly computational jobs"; "MSK's infrastructure ranks top 10 in the world on the IO500 benchmark"; "Reduced research timelines by up to 30 times" (VENDOR-REPORTED) | [8] |
| Research computing: need | "With data pouring in from genomics, digital pathology, radiologic imaging/PACS, and clinical trials, MSK needed a new high-performance computing cluster"; "Some of our workflows were still running on 20-year-old code" (Jessica Audette) (VENDOR-REPORTED) | [8] |
| Research computing: vendors named | Dell Technologies and WEKA (a WEKA-sponsored interview at SC24). No GPU vendor, GPU count or network vendor is given. | [8] [9] |
| Older clusters | MSK HPC documentation lists Lilac (about 124 nodes, 508 GPUs, 4.1 PB) and Juno [search-level; page blocked] | [41] |
| Digital pathology: scale | "With more than 6.1 million slides scanned to date"; "In 2021, the DPLM at MSK had 25 whole slide scanners"; "MSK allocated a total of 9 PB for slide storage" | [33] |
| Digital pathology: Paige | Paige was "Founded in 2017"; its dataset was built "through its relationship with Memorial Sloan Kettering Cancer Center" and holds "nearly 7 million digitized slides paired with clinical and molecular data"; Tempus bought Paige for $81.25 million in August 2025 and assumed its Microsoft Azure commitment (VENDOR-REPORTED) | [25] |
| Pathology foundation model | Virchow (Paige) was trained on about 1.5 million slides from about 100,000 MSK patients [search-level] | [40] |
| Genomics | "As of 2024, MSK-IMPACT had analyzed tumors in more than 92,000 MSK patients"; 505 genes; FDA authorization in 2017 | [19] |
| Knowledge base | OncoKB, MSK's precision oncology knowledge base, FDA-recognized in October 2021 | [15] |
| Real-world dataset | MSK-CHORD: 24,950 patients; 705,241 radiology reports annotated by natural language processing; published in Nature, November 2024 [search-level; abstract quoted in search results, journal page behind login] | [37] |
| Telemedicine | 316,078 outpatient telemedicine visits in 2024 (about 30% of the 1,046,023 outpatient visits; share computed here) | [5] |
| Remote monitoring | Matched-cohort study: cumulative incidence of an emergency visit at 6 months 0.27 with remote monitoring versus 0.47 in controls (P = .01); admissions 0.23 versus 0.41 (P = .02); "a 20% absolute reduction in ED visits" | [34] |
| Network vendors | The only public Cisco reference found is from June 22, 2005: MSK was "deploying Cisco Catalyst switches with 10 Gigabit Ethernet (10GbE) interfaces throughout its campus networks" (VENDOR-REPORTED, 21 years old). No current network, wireless, WAN, security or collaboration vendor is named in any source found. | [27] |

## D) AI programme, 2023 to 2026

| Item | What is public | Source |
|---|---|---|
| Governance body | A multidisciplinary AI Governance Committee, embedded in existing digital governance, working with the IRB and the Research Data Governance Committee; preceded by an AI Task Force | [21] |
| First-year numbers | "26 AI models (including large language models)" registered and monitored; two ambient AI pilots; "a review of 33 nomograms" | [21] |
| Platform | Runs on premises and on public cloud; a central AI/ML engineering team; two generative AI sandboxes "approved by Information Security, Privacy, and Compliance" (one for de-identified data, one for PHI under IRB approval) | [21] |
| Monitoring | Post-launch monitoring of performance, adoption, success metrics and AI-induced adverse events; reviews typically 6 to 12 months after go-live | [21] |
| Governance tooling | October 2025: collaboration with ALIGNMT AI through the MSK Innovation Hub to "establish a scalable framework for responsible AI governance" | [30] |
| Ambient documentation | Abridge: "extensive rollout" through 2025 and 2026 after a pilot run by the Digital Informatics & Technology Solutions (DigITs) group in hematology, head and neck surgery and neurology, tested in Spanish, Chinese and Russian (VENDOR-REPORTED). Trade coverage: [45] [search-level]. | [7] [45] |
| Clinical decision support | September 16, 2026: OpenEvidence integrated "within MSK's Epic workflow"; OncoKB surfaced inside OpenEvidence for providers outside MSK | [15] |
| Cloud AI | AWS Bedrock and SageMaker for model building on de-identified cohorts; an "AI Technology Development Fund" pilot in 2025 | [4] |
| Precision oncology hub | June 2026: memorandum of understanding with SOPHiA GENETICS for an AI-powered precision oncology hub [search-level] | [47] |
| Published outcome numbers | Remote monitoring: 20% absolute reduction in emergency visits and 18% in admissions (matched cohort, 81 pairs) | [34] |
| Published outcome numbers | MSK-CHORD: models with NLP-derived features outperformed those based on genomic data or stage alone [search-level] | [37] |

## E) Public incident record

| Date | Event | What MSK or the press said | Source |
|---|---|---|---|
| July 2020 (notified) | Blackbaud ransomware (fundraising software vendor) | "On July 16, 2020, MSK was notified of a cyber security incident on the computer network of our vendor, Blackbaud." Donor data copied; "does not involve credit card, bank account or social security number information." | [29] |
| January 2021 | Accellion file-transfer vulnerability | "unauthorized access between January 20-22, 2021 to electronic documents stored on the system"; "MSK's own IT systems were not involved in this incident." | [13] |
| September 2023 (notice) | Nuance MOVEit | "The incident occurred at Nuance and did not affect any of MSK's computing or information systems." | [12] |
| April 26, 2024 (identified) | Phishing of employee email accounts | "the protected health information of 12,274 individuals has been exposed in a phishing attack"; "medical records were not accessed" | [23] |
| July 19, 2024 | CrowdStrike faulty update (global outage) | "at Memorial Sloan Kettering Cancer Center, procedures requiring anesthesia were suspended." Trade press reported most systems and procedures were reinstated the same day [search-level]. | [14] [38] |

Research data protection obligations (general, apply to any NIH-funded institution using controlled-access genomic data): from January 25, 2025, "Approved Users of NIH controlled-access data will attest to NIH that their institution is compliant with NIST SP 800-171." [35]. MSK reported $537,996 thousand in grants and contracts revenue in 2025 [31]. No MSK-specific statement on its NIST SP 800-171 status was found.

No 2025 or 2026 MSK breach notice was found. The HHS OCR breach portal was not queried directly (see Gaps).

## F) Stated priorities, 2025 to 2027

| Priority | Evidence | Source |
|---|---|---|
| Build the Griffin Pavilion | Completion expected "by 2030"; "advanced technology, cutting-edge robotics, improved digital infrastructure, and enhanced operating suites"; steel from mid-2027; built while the campus stays operational | [2] [10] [16] |
| Realize Epic's benefits | First half 2026 results "reflect higher patient activity levels, supported by ongoing improvements in patient access and efficiencies realized through the Epic electronic health record (EHR) system" | [17] |
| Patient access with financial discipline | "MSK remains focused on advancing a long-term financial strategy centered on expanding patient access, strengthening operational discipline, and supporting the Institution's mission-driven growth amid continued cost pressures across the healthcare sector." | [17] |
| One digital strategy | The Chief Digital Officer is "architect of MSK's digital and technology future, championing an enterprise-wide strategy that connects clinical, research, and administrative domains" | [3] |
| AI at the point of care, governed | "embedding trusted tools into clinical practice in ways that augment the expertise of our clinicians" (Offodile); formal AI Governance Committee | [15] [21] |
| Research data and AI | Longitudinal data resource and cloud HPC with AWS; IRIS cluster on premises | [4] [8] |
| Capital capacity | Fitch (secondary summary): "The center's strong liquidity and manageable debt support its robust capital spending plans, including a new inpatient pavilion." No rating commentary on IT or cyber was found. | [11] |

## G) Four account-specific use cases

Each is anchored on a cited public fact. "Today" beats are vendor-neutral descriptions of how such work generally runs; they are not claims about MSK's internal operations. Every "with Cisco" line is a hypothesis to validate.

### 1. Bringing a 2030 pavilion onto a live campus (`msk-pavilion-live-campus`)

- **Anchor fact:** "We currently expect construction of The Kenneth C. Griffin Pavilion at MSK to be completed by 2030." It will be "connected to Memorial Hospital via an enclosed two-story patient bridge over 67th street" and house "improved digital infrastructure, and enhanced operating suites" [2]. Bed occupancy in the existing hospital was 95.1% in 2024 [5].
- **Today:** thousands of new devices against one opening date; commissioning traffic beside live clinical traffic; readiness assembled from separate team reports.
- **With Cisco (hypothesis to validate):** one readiness view per floor (Topology, Inventory, Catalyst Center, ISE, Spaces); a named MSK owner approves each move of a floor into production; fewer activation surprises, modeled not measured.
- **Approval:** move one pavilion floor to production. Approver: MSK's change authority for the pavilion with perioperative and biomedical engineering sign-off (roles to confirm).
- **Discovery question:** who owns technical readiness across network, security, biomedical and building systems, and how will a floor be proven ready before it connects to Memorial Hospital?
- **Stays with MSK and its vendors:** design, construction, commissioning, medical devices, building-management systems.
- **Caveat:** MSK has not named pavilion technology vendors; operating suite counts conflict (28 versus 12).

### 2. Epic slow at a regional infusion site (`msk-regional-infusion-epic`)

- **Anchor fact:** 212,457 chemotherapy treatments in the regional network in 2024 against 129,857 in Manhattan; 317,766 regional outpatient visits [5]. Epic has been MSK's record since February 1, 2025 [28].
- **Today:** the chair is ready and the screen is not; a bridge call per site; the pattern is found late.
- **With Cisco (hypothesis to validate):** one investigation from chair to record (AI Canvas, ThousandEyes, Catalyst SD-WAN, Meraki, Splunk); a person approves any path change; shorter delays and fewer repeats, modeled not measured.
- **Approval:** shift one regional site's traffic path. Approver: network operations duty manager, infusion nursing lead informed (roles to confirm).
- **Discovery question:** when a regional site says Epic is slow during infusion hours, how long until you know which layer it is, and who decides?
- **Stays:** Epic and its hosting, pharmacy systems, carrier circuits, clinical scheduling.
- **Caveat:** the scenario is illustrative, not a reported MSK incident; MSK's WAN, wireless and monitoring vendors and its Epic hosting model are not public.

### 3. Research AI computing beside clinical systems (`msk-research-ai-beside-clinical`)

- **Anchor fact:** MSK's AI platform runs on premises and on public cloud, with two generative AI sandboxes "approved by Information Security, Privacy, and Compliance", one for de-identified data and one for PHI under IRB approval [21]. Research computing handles "15+ petabytes of imaging data" (VENDOR-REPORTED) [8]; slide storage alone was allocated 9 PB [33]; 790,378 radiology procedures were performed in 2024 [5].
- **Today:** two worlds on shared ground; proving where sensitive data went; slow jobs with unclear cause.
- **With Cisco (hypothesis to validate):** one view across clinical and research paths (Nexus, Intersight, ThousandEyes, Splunk, Data Fabric search); a person approves anything on a path that also carries clinical imaging; evidence on demand for data-use and security reviews (AI Defense, Agent Observability, Audit log), modeled not measured.
- **Approval:** change a path shared with clinical imaging. Approver: infrastructure change authority with imaging or pathology informatics sign-off (roles to confirm).
- **Discovery question:** where do clinical imaging, digital pathology and research AI share network, storage or cloud paths, and how do you show reviewers where patient data did and did not travel?
- **Stays:** research clusters and storage (Dell, WEKA as named publicly), PACS and pathology systems, cloud services, IRB and governance decisions.
- **Caveat:** whether clinical and research traffic share paths at MSK is not public; the NIST SP 800-171 attestation rule is a general NIH requirement, not an MSK statement.

### 4. When a supplier fault reaches the operating room (`msk-supplier-fault-day`)

- **Anchor fact:** July 19, 2024: "at Memorial Sloan Kettering Cancer Center, procedures requiring anesthesia were suspended." [14]. Three disclosed data incidents began at vendors: Blackbaud [29], Accellion [13], Nuance MOVEit [12]. MSK performed 29,494 surgical cases in 2024 [5].
- **Today:** the first hour is spent finding scope; vendor connections are known in pieces; care decisions wait on IT facts.
- **With Cisco (hypothesis to validate):** one view of what a supplier touches (Inventory, Cisco Identity, Splunk, Security Cloud Control); a person approves each containment step (Secure Access, ISE, Duo); faster scope and a clearer restart, modeled not measured.
- **Approval:** restrict one supplier's access. Approver: security operations lead with the clinical operations administrator on call (roles to confirm).
- **Discovery question:** on July 19, 2024, how long did it take to know which clinical areas were affected and when it was safe to restart?
- **Stays:** downtime procedures and pause or resume decisions, the supplier's software and fix, breach notification.
- **Caveat:** the July 2024 event was a faulty update, not an attack, and nothing proposed would have prevented it; duration and number of procedures affected are not public.

## H) Claims that must NOT be made

1. Do not say or imply that MSK uses, has bought or is evaluating Cisco Cloud Control, Cisco Data Fabric, Splunk, ThousandEyes, Meraki, Webex, ISE, Duo, Nexus or any other current Cisco product. The only public Cisco reference found is a 2005 press release about Catalyst switches [27].
2. Do not confuse MSK with **Kettering Health** (Ohio), which appears in search results for a separate ransomware event. It is a different organisation.
3. Do not state a settled operating suite count for the Griffin Pavilion (28 [2] versus 12 [10]) or a settled bed count (206 [2] versus 208 [10]).
4. Do not say the Epic go-live "caused" the 2025 deficit. MSK's wording is "planned one-time investments related to the go-live" and "a temporary dip in patient activity" [1].
5. Do not describe the July 19, 2024 event as a breach or cyberattack on MSK. It was a faulty vendor software update [14].
6. Do not say MSK's own systems were breached in the Blackbaud, Accellion or Nuance incidents; MSK's notices place them at the vendors [29] [13] [12].
7. Do not present Dell, Epic, Abridge, Tempus or Cisco (2005) figures as independently measured. They are VENDOR-REPORTED. The Dell case study itself states it "is not an endorsement of Dell products or services by Memorial Sloan Kettering Cancer Center." [8]
8. Do not attribute the "100% remission" colon cancer trial result that Dell cites to infrastructure; the Dell text links them loosely and gives no study citation [8].
9. Do not say MSK owns Paige. Paige was acquired by Tempus in August 2025 [25].
10. Do not name a CISO, CIO or chief AI officer for MSK; none was verified. Do not present Tsvi Gal as current CTO without confirmation.
11. Do not claim MSK is or is not compliant with NIST SP 800-171; only the NIH rule is public [35].
12. Do not quote modeled outcomes for the four use cases as measured results.

## I) Sources

Accessed November 13, 2026 unless stated.

1. "Memorial Sloan Kettering Cancer Center Issues Statement on Fiscal Year 2025 Financial Results", MSK, March 31, 2026. https://www.mskcc.org/news-releases/mskcc-issues-statement-on-fiscal-year-2025-financial-results
2. "Building The Kenneth C. Griffin Pavilion at MSK", MSK, updated March 2025. https://www.mskcc.org/msk-community/building-the-kenneth-c-griffin-pavilion-at-msk
3. "Memorial Sloan Kettering Cancer Center Appoints Shakeeb Akhter as Chief Digital Officer", MSK, May 20, 2026. https://www.mskcc.org/news-releases/mskcc-appoints-shakeeb-akhter-as-chief-digital-officer
4. "Memorial Sloan Kettering Cancer Center and AWS to Accelerate AI-Driven Cancer Innovation", MSK, February 17, 2025. https://www.mskcc.org/news-releases/mskcc-and-aws-to-accelerate-ai-driven-cancer-innovation
5. "Statistical Profile", 2024 MSK Annual Report, MSK, 2025 (PDF read directly). https://www.mskcc.org/sites/default/files/node/326511/documents/ar-2024_statistical-profile.pdf
6. "Memorial Sloan Kettering Cancer Center Selects Epic to Transform Electronic Health Record System", MSK, November 21, 2022. https://www.mskcc.org/news-releases/mskcc-selects-epic-transform-electronic-health-record-system
7. "Leading Global Cancer Center Expands Use of Abridge AI Platform for Oncology Clinical Documentation", Abridge, March 5, 2025. VENDOR-REPORTED. https://abridge.com/press-release/msk-abridge
8. "AI creates new paths for faster cancer treatment discovery" (customer case study), Dell Technologies, undated (PDF metadata December 2025; PDF read directly). VENDOR-REPORTED. https://www.delltechnologies.com/asset/en-us/products/servers/customer-stories-case-studies/memorial-sloan-kettering-cancer-center-case-study.pdf
9. "AI in cancer research: transforming breakthroughs" (SC24 interview, sponsored by WEKA), SiliconANGLE, November 20, 2024. https://siliconangle.com/2024/11/20/ai-in-cancer-research-transforming-breakthroughs-msk-sc24/
10. "Award: Cancer center", Construction Dive, June 2, 2026. https://www.constructiondive.com/news/memorial-sloan-kettering-cancer-center-construction-turner-consigli/821693/
11. "Memorial Sloan-Kettering Cancer Center, New York: Fitch New Issue Report" (summary of Fitch Ratings report dated April 11, 2025), Bond Case Briefs, April 15, 2025. https://bondcasebriefs.com/2025/04/15/news/memorial-sloan-kettering-cancer-center-new-york-fitch-new-issue-report/
12. "Notice of Nuance MOVEit Incident", MSK, September 19, 2023. https://www.mskcc.org/news-releases/notice-of-nuance-moveit-incident
13. "MSK Notice of Accellion Data Incident", MSK, March 31, 2021. https://www.mskcc.org/news-releases/msk-notice-accellion-data-incident
14. STAT News article on hospital cancellations during the Microsoft and CrowdStrike outage (headline not captured), STAT, July 19, 2024. https://www.statnews.com/2024/07/19/microsoft-crowdstrike-outage-hospitals-cancellations/
15. "Memorial Sloan Kettering Cancer Center (MSK) and OpenEvidence Partner to Advance Precision Oncology at the Point of Care", MSK, September 16, 2026. https://www.mskcc.org/news-releases/mskcc-msk-and-openevidence-partner-to-advance-precision-oncology-at-point-of-care
16. MSK news release announcing that the new cancer care pavilion will be named The Kenneth C. Griffin Pavilion at MSK (title paraphrased from the page address), MSK, March 14, 2025. https://www.mskcc.org/news-releases/mskcc-announces-new-state-of-art-cancer-care-pavilion-will-be-named-kenneth-griffin-pavilion-at-msk-cancer-center
17. "Memorial Sloan Kettering Cancer Center Issues Statement on First Half 2026 Financial Results", MSK, August 14, 2026. https://www.mskcc.org/news-releases/mskcc-issues-statement-on-first-half-2026-financial-results
18. "Memorial Sloan Kettering Cancer Center Ranked Top Cancer Center in the Northeast and in New York Metropolitan Area, Second in Nation and First in Urology Care by U.S. News & World Report", MSK, August 4, 2026. https://www.mskcc.org/news-releases/mskcc-ranked-top-cancer-center-in-northeast-and-in-new-york-metropolitan-area-second-in-nation-and-first-in-urology-care-by-u-s-news-and-world-report
19. "The Next Frontier of Precision Diagnostics in Cancer Care", MSK, June 6, 2025. https://www.mskcc.org/news/next-frontier-of-precision-diagnostics-in-cancer-care
20. "Locations" (site menu listing 24 locations), MSK, accessed November 13, 2026. https://www.mskcc.org/locations
21. Stetson PD, et al., "Responsible Artificial Intelligence governance in oncology", NPJ Digital Medicine 8:407, July 4, 2025. https://pmc.ncbi.nlm.nih.gov/articles/PMC12227680/
22. "Leading Cancer Center Transforms Care Through Better Coordination, Faster Results, and a More Connected Patient Experience", Epic, undated. VENDOR-REPORTED. https://www.epic.com/epic/post/leading-cancer-center-transforms-care-through-better-coordination-faster-results-and-a-more-connected-patient-experience/
23. "Memorial Sloan Kettering Cancer Center Employees Tricked by Phishing Email", The HIPAA Journal, July 19, 2024. https://www.hipaajournal.com/memorial-sloan-kettering-cancer-center-phishing-attack/
24. "Memorial Sloan Kettering Announces Updated Design for Kenneth C. Griffin Pavilion at MSK", MSK, May 30, 2025. https://www.mskcc.org/news-releases/msk-announces-updated-design-for-kenneth-griffin-pavilion-at-msk
25. "Tempus Announces the Acquisition of Paige" (repost of Tempus press release of August 22, 2025), HLTH, August 25, 2025. VENDOR-REPORTED. https://hlth.com/insights/news/tempus-announces-the-acquisition-of-paige-2025-08-25
26. "History & Milestones", MSK, accessed November 13, 2026. https://www.mskcc.org/history-milestones
27. "10 Gigabit Ethernet-Enabled Cisco Catalyst Switches Deployed by Memorial Sloan-Kettering Cancer Center throughout Campus Network", Cisco, June 22, 2005. VENDOR-REPORTED. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2005/m06/10-gigabit-ethernet-enabled-cisco-catalyst-switches-deployed-by-memorial-sloan-kettering-cancer-center-throughout-campus-network.html
28. "Electronic Health Information Exchange" (public notice), MSK, accessed November 13, 2026. https://www.mskcc.org/public-notices/electronic-health-information-exchange
29. "MSK Notice of Blackbaud Data Incident", MSK, September 14, 2020. https://www.mskcc.org/news-releases/msk-notice-blackbaud-data-incident
30. "MSK Innovation Hub Partners with ALIGNMT AI for Responsible Oncology AI Governance", HIT Consultant, October 1, 2025. https://hitconsultant.net/2025/10/01/msk-innovation-hub-partners-with-alignmt-ai-for-responsible-oncology-ai-governance/
31. "Financial Summary", 2025 MSK Annual Report, MSK, 2026 (PDF read directly). https://www.mskcc.org/document/2025-annual-report-financial-summary
32. "Tsvi Gal named head of infrastructure at MSK", The Cancer Letter, May 8, 2020. https://cancerletter.com/?p=12800
33. Ardon O, et al., "Digital pathology operations at a tertiary cancer center: Infrastructure requirements and operational cost", Journal of Pathology Informatics, 2023. https://pmc.ncbi.nlm.nih.gov/articles/PMC10550754
34. Daly B, et al., "Association Between Remote Monitoring and Acute Care Visits in High-Risk Patients Initiating Intravenous Antineoplastic Therapy", JCO Oncology Practice 18(12):e1935-e1942, October 20, 2022. https://pmc.ncbi.nlm.nih.gov/articles/PMC9750548
35. "Implementation Update for Data Management and Access Practices Under the Genomic Data Sharing Policy", NOT-OD-24-157, National Institutes of Health, July 25, 2024 (effective January 25, 2025). https://grants.nih.gov/grants/guide/notice-files/NOT-OD-24-157.html
36. "Memorial Sloan Kettering Cancer Center Issues Statement on Third Quarter 2025 Financial Results", MSK, November 14, 2025. https://www.mskcc.org/news-releases/mskcc-issues-statement-on-third-quarter-2025-financial-results

Search-level sources (page could not be opened; claim taken from the search result summary):

37. Schultz N (corresponding author), et al., "Automated real-world data integration improves cancer outcome prediction", Nature 636:728-736, published online November 6, 2024. https://pubmed.ncbi.nlm.nih.gov/39506116/
38. "NYC hospital pauses procedures using anesthesia due to global IT outage", Becker's ASC Review, July 2024. https://www.beckersasc.com/anesthesia/nyc-hospital-pauses-procedures-using-anesthesia-due-to-global-it-outage.html
39. "Epic launch contributes to Memorial Sloan Kettering's $113M shortfall", Becker's Hospital Review, 2025. https://www.beckershospitalreview.com/healthcare-information-technology/ehrs/epic-launch-contributes-to-memorial-sloan-ketterings-113m-shortfall
40. Virchow pathology foundation model paper (later published in Nature Medicine as "A foundation model for clinical-grade computational pathology and rare cancers detection"), arXiv 2309.07778, 2023. https://arxiv.org/abs/2309.07778
41. "HPC Computing" and cluster documentation, MSK High Performance Computing Group, undated. https://www.mskcc.org/research/ski/core-facilities/high-performance-computing-group/hpc-computing
42. "Paige.AI Lands $25 Million Series A Financing and 25 Million Slides from Memorial Sloan Kettering", Tissuepathology.com, February 8, 2018. https://tissuepathology.com/2018/02/08/paige-ai-lands-25-million-series-a-financing-and-25-million-slides-from-memorial-sloan-kettering/
43. "32 health systems with strong finances" (lists MSK at Fitch AA, stable), Becker's Hospital Review, April 2026. https://www.beckershospitalreview.com/finance/32-health-systems-with-strong-finances/
44. "Tsvi Gal, CTO (Infrastructure), Memorial Sloan Kettering Cancer Center recognized at AI Networking Summit - New York", Kalkine Media, 2024. https://kalkinemedia.com/news/world-news/tsvi-gal-cto-infrastructure-memorial-sloan-kettering-cancer-center-recognized-at-ai-networking-summit-new-york
45. "Memorial Sloan Kettering expands Abridge rollout", Becker's Hospital Review, March 2025. https://www.beckershospitalreview.com/ai/memorial-sloan-kettering-expands-abridge-rollout.html
46. "VP, Epic Systems" (job posting), MSK Careers, 2025. https://careers.mskcc.org/vacancies/2025-85310-vp-epic-systems
47. "SOPHiA GENETICS Signs Strategic Collaboration MOU with Leading Global Cancer Center", SOPHiA GENETICS, June 4, 2026. https://ir.sophiagenetics.com/2026-06-04-SOPHiA-GENETICS-Signs-Strategic-Collaboration-MOU-with-Leading-Global-Cancer-Center

## J) Gaps / unverified

1. **CISO, CIO, chief AI officer, chief data officer:** no current office-holder found. A secondary report says David Arnold, formerly MSK's chief data analytics officer, moved to Hackensack Meridian Health; not verified. Atefeh Riazi (CIO from 2019) has since left; not verified against a primary source.
2. **Tsvi Gal:** primary source confirms only the May 2020 appointment as Head of Infrastructure [32]. The CTO title and current status are search-level [44].
3. **Akhter start date:** MSK's release is dated May 20, 2026 [3]; one search summary of a Becker's profile said he "joined MSK in 2025". The MSK release is used here.
4. **Griffin Pavilion counts:** 28 operating suites and 206 beds [2] versus 12 operating suites and 208 beds [10]. The Certificate of Need document on mskcc.org returned 404. The $2.3 billion and 883,000 square feet figures are trade press citing Newsweek and the architect, not MSK.
5. **Epic scope and what it replaced:** MSK's release says only "several systems" [6]. No public source names the legacy systems, the modules deployed or the hosting model. The VP Epic Systems posting returned 404 [46].
6. **Network, wireless, WAN, security, collaboration and observability vendors:** none named in any current public source. No Webex, Splunk, ThousandEyes or Meraki mention found.
7. **GPU and supercomputing detail:** no NVIDIA announcement found; no GPU counts for IRIS. Lilac figures are search-level and may be old [41].
8. **Digital pathology today:** the latest verified slide count is "more than 6.1 million" in a 2023 paper using 2021 data [33]. No 2024 to 2026 figure found. The 2018 "25 million slides" Paige figure is search-level [42].
9. **MSK-CHORD and Virchow numbers:** search-level; journal pages were behind login or not opened [37] [40].
10. **CrowdStrike day:** duration of the pause and number of procedures affected are not public. The "most systems reinstated" update is search-level [38].
11. **HHS OCR breach portal:** not queried directly. The 12,274 figure comes from The HIPAA Journal [23], which does not itself cite the OCR filing.
12. **Ambient scribe study:** a peer-reviewed pilot at a New York cancer center (Applied Clinical Informatics, Thieme) was found but could not be opened; vendor and numbers unverified.
13. **Hospital at home:** no MSK programme by that name was found. Remote monitoring evidence is the 2022 matched-cohort study [34]; the programme name "InSight Care" appears only in that paper's reference list.
14. **Rating agency commentary on IT or cyber:** none found. The Fitch text is a secondary summary [11]; Moody's and S&P current ratings were not verified.
15. **NCI designation requirements:** MSK is described in a study as "an NCI-designated cancer center" [search-level]; no MSK-specific text on NCI or Cancer Center Support Grant data requirements was retrieved.
16. **Regional expansion 2025 to 2027:** no new regional site announcement found.
17. **Koch Center and Josie Robertson Surgery Center detail** (size, operating rooms, opening year): location pages returned 404; only their names are verified [20].
18. **2025 statistical profile:** not retrieved; 2024 volumes are used. MSK's history page gives 2025 counts of "1,435 attending physicians" and "4,691 nurses" [26].
19. **Dell case study date:** the PDF carries no publication date; December 2025 is file metadata.

## Physical estate used for floor plans (public sources)

[P-addr] MSK, "Memorial Hospital" location directory page and "Planning Your Visit: Visitor Policy" page (main entrance at 1275 York Avenue), accessed 13 November 2026. https://www.mskcc.org/locations/directory/memorial-hospital ; https://www.mskcc.org/locations/planning-visit-travel-to-msk/policy-visitors-patients

Used only to make the four MSK floor plans in `atlas/src/engine/45-decor-msk.js` recognisable. Only high-level public facts are used: building names, what a building holds, and how buildings relate on the street. Room layouts, network closets, data rooms, security rooms and equipment positions in the plans are illustrative and are not MSK's real arrangement.

| Place | What the plans use | Source |
|---|---|---|
| Memorial Hospital | At York Avenue and 68th Street, main entrance 1275 York Avenue (between East 67th and East 68th Streets); the existing inpatient hospital, running at 95.1% occupancy in 2024 | [P1] [5] [P-addr] |
| Kenneth C. Griffin Pavilion | On York Avenue between East 66th and East 67th Streets, inside MSK's existing footprint, south of Memorial Hospital; "28 operating suites and 206 single-occupancy inpatient beds" (MSK) versus 12 suites and 208 beds (trade press), so the plan shows suites without a count; "advanced technology, cutting-edge robotics, improved digital infrastructure" | [P1] [10] [16] |
| The bridge | "an enclosed two-story patient bridge over 67th street" for moving "critically ill patients, equipment, and faculty" between pavilion and hospital | [P1] |
| Josie Robertson Surgery Center | 1133 York Avenue; freestanding outpatient surgery, 12 operating rooms, opened December 2015. Not drawn; it informs how an operating room is furnished (table, lights, anesthesia cart, robot console) | [P2] [P3] |
| David H. Koch Center for Cancer Care | 530 East 74th Street; outpatient building with 110 private infusion rooms, opened January 2020. Informs the infusion bay dressing (private rooms with recliners and pumps) | [P4] [P5] |
| Regional outpatient sites | Westchester (500 Westchester Avenue, West Harrison), Bergen (Montvale), Monmouth (Middletown; infusion suite of 18 rooms), Basking Ridge, Nassau (Uniondale), Commack; each offers chemotherapy, immunotherapy and radiation; Westchester also lists a pharmacy, clinical lab and radiology. The M2 plan is a generic regional outpatient building, not one named site | [P6] [P7] [P8] [20] |
| Research buildings | Mortimer B. Zuckerman Research Center, 417 East 68th Street (23 stories; computational biology among its programs); Rockefeller Research Laboratories; research computing cluster (Dell, vendor-reported) | [P9] [8] [20] |
| Digital pathology | 25 whole slide scanners in 2021, more than 6.1 million slides scanned, 9 PB allocated for slide storage. Informs the slide scanner room in the M3 plan | [33] |

- [P1] "Building The Kenneth C. Griffin Pavilion at MSK", MSK, updated March 2025. https://www.mskcc.org/msk-community/building-the-kenneth-c-griffin-pavilion-at-msk
- [P2] Josie Robertson Surgery Center, MSK location directory. https://www.mskcc.org/locations/directory/josie-robertson-surgery
- [P3] "Memorial Sloan Kettering opens outpatient surgery center", The Cancer Letter, January 8, 2016. https://cancerletter.com/in-brief/20160108_6c/
- [P4] David H. Koch Center for Cancer Care, MSK location directory. https://mskcc.org/locations/directory/david-koch-center-cancer-care
- [P5] "The David H. Koch Center For Cancer Care At Memorial Sloan Kettering Cancer Center Opens", Healthcare Design, 2020. https://healthcaredesignmagazine.com/news/the-david-h-koch-center-for-cancer-care-at-memorial-sloan-kettering-cancer-center-opens/41301/
- [P6] Memorial Sloan Kettering Westchester, MSK. https://mskcc.org/locations/westchester ; Stantec project page, Memorial Sloan Kettering Harrison Regional. https://www.stantec.com/en/projects/united-states-projects/m/memorial-sloan-kettering-harrison-regional
- [P7] Memorial Sloan Kettering Monmouth, MSK. https://mskcc.org/monmouth ; Basking Ridge. https://www.mskcc.org/cancer-care/suburban-outpatient/mskcc-basking-ridge
- [P8] "Chemotherapy at MSK", MSK. https://www.mskcc.org/cancer-care/diagnosis-treatment/cancer-treatments/chemotherapy/chemotherapy-msk
- [P9] Mortimer B. Zuckerman Research Center, MSK location directory. https://www.mskcc.org/locations/directory/zuckerman-research
