# Research Brief 10: Account profile, NYU Langone Health (New York)

Prepared 2026-11-13 for the Cisco account team. Public sources only. Companion data file: `research/data/account-nyu-langone.json`.

## How to read this brief

- Every factual claim carries a numbered citation; the numbered list is in section I.
- Quotes from sources [1], [2] and [3] (NYU Langone's bondholder disclosures) were read directly from the PDF text and are verbatim. Quotes from web pages were extracted with an automated page reader; re-check them on the page before using them in customer-facing material.
- VENDOR-REPORTED marks numbers published by a vendor about its own product.
- Every "with Cisco" statement in section G is a hypothesis to validate. No public source found says NYU Langone uses or has bought any Cisco product (see sections H and J).
- Product vocabulary follows briefs 05 to 08 in this repository; that research is not repeated here.

## A) Executive summary

1. **Scale.** NYU Langone Health reported operating revenue of $15,424.7 million and an operating gain of $482.8 million (3.1% margin) for the fiscal year ended August 31, 2025 [1]. For the nine months to May 31, 2026 it reported $12,765.2 million and a 3.4% margin [2]. It describes itself as stretching "across 5 inpatient facilities and over 330 locations throughout the New York City region and in Florida" with "more than 54,000 staff members" [2].
2. **Quality position.** On September 24, 2026 NYU Langone announced that Vizient had named it the No. 1 health system for "the fifth consecutive year" [4]. Its Manhattan, Brooklyn and Long Island hospitals "have earned an 'A' grade for 12 consecutive grading rounds or more" from Leapfrog [2].
3. **It is still growing.** Long Island Community Hospital merged into NYU Langone Hospitals effective March 1, 2025 and is now NYU Langone Hospital—Suffolk [1]. In May 2026 the system "closed on the acquisition of a 45-acre property in Melville, New York" for a new inpatient campus [2]. Three ambulatory hubs (Manhasset, Brooklyn, West Palm Beach) are scheduled to open in November and December 2026 [2].
4. **One record, high digital maturity.** Physicians "are connected by NYU Langone Health's enterprise-wide electronic medical record system, Epic" [2]. CHIME revalidated it in November 2025 as "Level 10 Digital Health Most Wired", "the only institution in New York State to receive Level 10 designation" [2].
5. **AI is in production at scale.** The system reports "more than 128 models in production and 150 models in development", ambient AI documentation supporting "over 1,500 inpatient and emergency department providers", a patient-facing "Find a Doctor Agentic AI" launched February 2026, and internal "agentic AI chatbots" [2].
6. **Cybersecurity is stated as strategic in bond disclosure.** The disclosure names segmentation, next-generation firewalls, password-less authentication, help desk user verification and AI-driven triage [2]. No vendor is named.
7. **Resilience is part of its identity.** Hurricane Sandy (October 2012) forced the evacuation of about 300 patients after backup generators failed [14]; services reopened 59 days later [15]. In January 2025 its "resiliency program and design standards were published as part of the U.S. Climate Resilience for Health Care" toolkit [1].
8. **No public Cisco footprint found.** We found no Cisco, Webex, Splunk, ThousandEyes or Meraki case study or press release naming NYU Langone. The one third-party database entry that mentions Webex is unverified (section J).

## B) Organisation profile

| Item | Value | Source |
|---|---|---|
| Legal structure | "NYULH System is a subsidiary of New York University" and "the sole corporate member of NYU Langone Hospitals" | [1] |
| Dean and CEO | Alec C. Kimmelman, MD, PhD ("led by Dean and CEO Alec C. Kimmelman, MD, PhD"). Robert I. Grossman, MD "served as Dean and CEO from 2007 to 2025" | [2] |
| Staff | "more than 54,000 staff members" | [2] |
| Physicians | "a professional staff of 6,537 doctors, of whom 4,486 were full-time or part-time employees of NYUGSOM or NYU Langone Hospitals, and the remaining 2,051 were private practice doctors" (as of May 31, 2026) | [2] |
| Inpatient facilities (bond disclosure count) | "five inpatient acute care facilities and over 40 New York State Public Health Law Article 28-licensed facilities in Manhattan, Brooklyn, Queens, Staten Island, and Long Island" | [2] |
| Inpatient locations (press boilerplate count) | "seven inpatient locations" (October 2026); Suffolk described as "NYU Langone's seventh inpatient facility" (Spring 2025) | [13], [5] |
| Tisch Hospital and Kimmel Pavilion (with Hassenfeld Children's Hospital), Manhattan | "the Kimmel Pavilion (which also houses the Hassenfeld Children's Hospital) and Tisch Hospital, both of which are located on the main 34th Street campus and have a combined 813-beds" | [1], [2] |
| NYU Langone Orthopedic Hospital | "a 225-bed facility specializing in orthopedic, neurologic, and rheumatologic services" | [1] |
| NYU Langone Hospital—Brooklyn | "a 444-bed facility in the Sunset Park neighborhood of Brooklyn" | [1], [2] |
| NYU Langone Hospital—Long Island (Mineola) | "a 591-bed facility located in Mineola, New York" | [1], [2] |
| NYU Langone Hospital—Suffolk (Patchogue), formerly Long Island Community Hospital | "a 306-bed facility in Patchogue, New York" | [1], [2] |
| Total beds | 2,379 (our sum of 813 + 225 + 444 + 591 + 306; the disclosure does not print a total) | [2] |
| Ambulatory | "more than 330 ambulatory locations in the New York metropolitan area and eight practice locations in Palm Beach County, Florida" (July 2026). Press releases in autumn 2026 say "more than 400 ambulatory practices" and "more than 400 outpatient locations" | [2], [4], [13] |
| Outpatient volume | "12.4 million outpatient visits" a year | [13] |
| Revenue FY2025 | Operating revenue $15,424.7 million; operating gain $482.8 million; operating margin 3.1% (twelve months ended August 31, 2025) | [1] |
| Revenue FY2026 year to date | Operating revenue $12,765.2 million; operating gain $437.7 million; margin 3.4% (nine months ended May 31, 2026) | [2] |
| Total assets | "$24.8 billion" as of May 31, 2026 | [2] |
| Capital spending | "capital expenditures of $1.3 billion to support strategic capital investments" in FY2025 | [1] |
| Liquidity | Obligated Group days cash on hand 151 at August 31, 2025; 150 at May 31, 2026 | [1], [2] |
| Research | "$982 million active National Institutes of Health ("NIH") awards as of May 2026"; "over 1,000 principal investigators" | [2] |
| Medical schools | NYU Grossman School of Medicine and NYU Grossman Long Island School of Medicine, both with full-tuition scholarships | [1], [2] |
| Credit ratings | "In January 2026, Moody's reaffirmed its A1 rating with a stable outlook"; "In February 2026, S&P Global Ratings affirmed its A+ rating with a stable outlook" | [2] |

### Quality rankings

| Ranking | Statement | Source |
|---|---|---|
| Vizient | No. 1 health system for "the fifth consecutive year"; Manhattan campus first in a comprehensive academic medical center cohort that "includes 122 institutions nationwide"; ambulatory network No. 1 "out of 70 participating networks" | [4] |
| Vizient, other campuses | "NYU Langone Long Island and NYU Langone Brooklyn were both ranked in the top ten in the large, specialized complex medical center cohort"; Suffolk "elevated from the community hospital cohort to the complex care medical center cohort" | [1] |
| Leapfrog | Manhattan, Brooklyn and Long Island hospitals "have earned an 'A' grade for 12 consecutive grading rounds or more, an honor attained by only 1% of hospitals across the country. NYU Langone Suffolk advanced from a 'C' to a 'B' grade eight months after completing its merger" | [2] |
| U.S. News & World Report | "more specialties ranked as No. 1 than any other health system in the United States, according to U.S. News & World Report's 2025-2026 rankings"; on the "Best Hospitals" Honor Roll "of the top 20 hospitals in the nation" | [2] |
| CMS | "five-star rating on the CMS Hospital Compare for 2025, a rating received by only 10.1% of evaluated hospitals" | [1] |
| CHIME | "Level 10 Digital Health Most Wired Ambulatory and Acute Care Organization"; "the only institution in New York State to receive Level 10 designation" (revalidated November 2025) | [2] |
| Epic | "In September 2025, Epic named 64 U.S. health systems to its Honor Roll for 2025, including honoring NYU Langone Health in the summa cum laude category" | [1], [2] |
| Newsweek | "one of The World's Best Smart Hospitals, with electronic functionalities and virtualization being named as standout categories" (September 2024) | [1] |

### Mergers and expansions, 2023 to 2026

| Date | Event | Source |
|---|---|---|
| March 1, 2022 | Affiliation: "NYULH System became the sole corporate member of LICH" | [1] |
| March 1, 2025 | "Effective March 1, 2025, LICH merged with and into NYU Langone Hospitals" and "is now known as NYU Langone Hospital – Suffolk" | [1] |
| Spring 2025 | Suffolk integration included "implementation of Epic, NYU Langone's electronic health record system"; reported results include "Average wait time in the Emergency Department has dropped from 24 minutes to less than 10 minutes" | [5] |
| September 2025 | "NYU Langone Ambulatory Care Commack" opened, 18,000 square feet | [1] |
| May 2026 | "NYU Langone Hospitals closed on the acquisition of a 45-acre property in Melville, New York, near the border of Nassau and Suffolk counties, which will become the site of the new campus" | [2] |
| July 2026 | Patchogue 54,000 square foot ambulatory surgery and multi-specialty center "opened to patients in July 2026" | [2] |
| August 2026 | Brookhaven Town Board approved "a 270,000-square-foot, seven-story inpatient pavilion at NYU Langone Hospital-Suffolk", part of a "$650 million expansion", "creating space for 144 beds in the new pavilion" | [6] |
| September 2026 (expected) | Orthopedic Center at 338 East 38th Street: "265,000 square foot major renovation", "18 new operating rooms"; "Phased opening is expected to begin in September 2026" | [2] |
| November 2026 (expected) | Manhasset hub, "approximately 162,000 square feet", "72 exam rooms, six endoscopy rooms, and eight operating rooms" | [2] |
| November 2026 (expected) | Brooklyn "new 120,000 square foot ambulatory hub" adjacent to the hospital | [2] |
| December 2026 (expected) | West Palm Beach "new 180,000 square foot, free-standing multi-specialty ambulatory hub", expected to "serve 150,000 patients annually across Florida" | [2] |
| Standing statement | "No binding documents have been executed with other hospitals in connection with potential affiliations." | [2] |

### Leadership relevant to IT

| Name | Title as published | Source |
|---|---|---|
| Alec C. Kimmelman, MD, PhD | Dean and CEO | [2] |
| Nader Mherabi | "executive vice president and vice dean, chief digital and information officer, NYU Langone Health"; "responsible for all information technology (IT) activities for NYU Langone Health"; remit includes "technology strategy, infrastructure engineering, networks, data centers, application architecture" | [13], [11] |
| Paul A. Testa, MD, JD, MPH | "chief health informatics officer, NYU Langone" | [10] |
| Eric K. Oermann, MD | "director of the Health AI Research Lab, NYU Langone"; senior author of the NYUTron paper | [10], [7] |
| Marc M. Triola, MD | "senior associate dean for medical education and founding director of the Institute for Innovations in Medical Education, NYU Grossman School of Medicine" | [10] |
| Miriam A. Bredella, MD, MBA | "director of the Clinical and Translational Science Institute" | [10] |
| Chief information security officer | Not found in public sources (see section J) | n/a |
| Chief AI officer | No such title found in public sources (see section J) | n/a |

Organisational note: AI delivery sits in "the Division of Applied AI Technologies ("DAAIT") in the MCIT Health Informatics department" [2]. The generative AI advisory board is "under the leadership of the Chief Digital Information Officer" [8].

## C) Technology and digital posture (public record only)

| Area | What is public | Source |
|---|---|---|
| EHR | Epic, "enterprise-wide"; Epic Honor Roll 2025 "summa cum laude"; laboratory "fully integrated with NYU Langone Health's Epic Beaker laboratory information system" | [2] |
| Digital maturity | CHIME Most Wired Level 10, acute and ambulatory | [2] |
| "Unified digital infrastructure" | AI symposium takeaway: "Our unified digital infrastructure makes responsible AI deployment possible at scale"; "Decades of investment in NYU Langone's information systems have created the foundation for safe systemwide deployment." | [10] |
| Cloud for generative AI | "private, HIPAA-compliant instances of GPT within Microsoft Azure Open AI"; "a custom, branded user-interface we named NYU GPT Studio" (2023) | [8] |
| Multi-cloud AI posture | "investing in robust infrastructure, privacy, and security across all cloud providers' AI offerings. This includes in-depth security and architecture reviews, risk assessments, compensatory controls where needed, and appropriate business associate agreement amendments." | [2] |
| Research computing | TOP500 lists "UltraViolet" at NYU Langone Health: manufacturer Dell, NVIDIA DGX H100, Xeon Platinum 8480C, 18,688 cores, Mellanox HDR InfiniBand, Rmax 5.56 PFlop/s; rank 193 (November 2024), 225 (June 2025), 255 (November 2025), 280 (June 2026) | [16] |
| Research computing, NYU statement | "NYU Langone Health's supercomputer, UltraViolet, is ranked No. 17 among the most powerful supercomputers at U.S. academic medical centers on the prestigious TOP500 list" (July 2026); earlier: "ranked No. 193 out of the top 500 super computers in the world" (November 2025) | [2], [1] |
| Model serving | NYUTron deployment used "a modified version of NVIDIA's Triton Inference Server that we named NYUTriton", interfacing with the EHR through FHIR, "Following the signing of discharge summaries in Epic" | [7] |
| Real-time management dashboard | "a data-rich tool that tracks more than 800 metrics across the system in real time" (Fortune, August 2025) | [20] |
| Kimmel Pavilion digital rooms (2018) | "The pavilion is powered by NYU Langone Health's existing data centers"; "the IT staff splits applications into different virtual LANs for critical and noncritical devices"; "a 75-inch HD display — dubbed MyWall — at the foot of their bed" | [21] |
| Imaging equipment | Fortune reports a radiology equipment agreement with Siemens, "plus $100 million for NYU to serve as a showroom" | [20] |
| Hospital at home | Home Hospital Program at NYU Langone Hospital—Long Island reached its "1,000th patient"; "24/7 remote monitoring"; "Since first being established in 2022, the highly successful program has reported no cases of hospital-acquired infections or delirium in patients" | [17] |
| Clinical decision support in the EHR | "OpenEvidence will be embedded in NYU Langone's Epic electronic health record workflow" (October 29, 2026) | [13] |
| Network security controls (no vendor named) | "segmentation, such as isolating guest networks and controlling bring-your-own-device access, along with next-generation firewalls, intrusion detection and prevention systems, and continuous monitoring" | [2] |
| Identity controls (no vendor named) | "behavioral analytics to identify unusual identity behavior, secure password-less authentication to eliminate password theft, and robust user verification to prevent social engineering attacks on the Help Desk" | [2] |
| Security operations (no vendor named) | "Correlate vast amounts of security data across environments using AI-driven analytics"; "Automate triage, execute playbooks, and generate first-draft reports to reduce analyst workload" | [2] |
| Cyber insurance | "NYU Langone Health maintains privacy liability and network security insurance through claims-made policies. NYU Langone Health is self-insured, with a primary insurance carrier who provides coverage above the self-insurance layer." | [2] |
| Energy and plant | "ultra-efficient chiller plants and on-site cogeneration"; "continuous monitoring and building automation" | [1] |
| Network, wireless, WAN, data center, collaboration, observability vendors | Not named in any public source found | section J |
| Cisco, Webex, Splunk, ThousandEyes, Meraki | No NYU Langone case study, press release or disclosure found | section J |

## D) AI programme

| Item | What is public | Outcome numbers | Source |
|---|---|---|---|
| Portfolio size | "more than 128 models in production and 150 models in development" (July 2026); "over 80 models in production" (November 2025) | n/a | [2], [1] |
| NYUTron | Large language model trained on clinical notes: "7.25 million clinical notes" "from 387,144 patients across four hospitals", "a 4.1 billion-word corpus curated from January 2011 to May 2020" | "NYUTron has an area under the curve (AUC) of 78.7–94.9%, with an improvement of 5.36–14.7% in the AUC" over traditional models. Prospective trial January to April 2022: "29,286 discharged encounters"; "NYUTron predicted 2,692 of the 3,271 readmissions (82.30% recall) with 20.58% precision"; "NYUTron had an AUC of 78.70%" | [7] |
| NYUTron 3.0 | "In early 2025, NYU Langone Health released the next generation of NYUTron. NYUTron 3.0 is a 1 billion parameter model based on an improved modern BERT encoder model." | n/a | [1] |
| Private generative AI | "one of the first institutions to use a private HIPAA-compliant ChatGPT instance, NYUGPT", now "UltraVioletAI", "the institution's private, HIPAA-compliant generative AI tool launched in 2025. Built with strict role-based access and comprehensive logging" | "12 GPT-based models in production, with nearly 20 in active development" (November 2025) | [1], [2] |
| Prompt-a-thon | "the Prompt-a-thon was held on August 18, 2023"; "There were 70 attendees and 56 staff members on the day of the event"; supervised by "the NYULH MCIT Department of Health Informatics and the Predictive Analytics Unit" | "Nearly all participants (95.1%; n = 58) agreed that their ability to engineer prompts was improved by the event"; "Only 57.4% (n = 35) reported the event improved their trust in GenAI" | [8] |
| AI drafts of patient message replies (Epic In Basket) | Study "conducted at NYU Langone Health using private patient-HCP communications" | "A total of 16 PCPs (8 [50.0%] female) reviewed 344 messages (175 GenAI drafted; 169 HCP drafted)"; usable draft proportion "0.69 [0.48] vs 0.65 [0.47], P = .49"; GenAI drafts "numerically longer (mean [SD] word count, 90.5 [32.0] vs 65.4 [62.6]; difference, 38.4%)"; "GenAI drafts were less readable than HCPs'" | [9] |
| Ambient documentation | "Implemented in late 2025, ambient AI documentation tools now support over 1,500 inpatient and emergency department providers across NYU Langone Health (and further expanding)" | Qualitative only: "Providers who use the tool are reporting improved note quality and time savings" | [2] |
| Ambient documentation vendor | Abridge: NYU Langone "has chosen Abridge as an enterprise-wide AI-powered ambient clinical intelligence platform"; "deployed to over 1,000 clinicians across 30+ specialties" (September 3, 2025) | VENDOR-REPORTED | [12] |
| Patient-facing agent | "Find a Doctor Agentic AI. Launched in February 2026 on NYU Langone Health's Find a Doctor website, an AI agent now offers a conversational, intelligent way to navigate NYU Langone Health's clinical network." | "Early data show increased conversion–over 5%–to completed appointments" | [2] |
| Internal agents | "MCIT has deployed agentic AI chatbots within the employee intranet and other portals, enabling staff, clinicians, students, and researchers to quickly access policies, HR information, IT guidance, and workflow instructions" | n/a | [2] |
| Agents in technology transfer and finance | "The TOV AI team has created a series of agentic AI tools (12 in total)"; "multi-agent models that automate financial review and key performance indicator reporting" | "from months to approximately 15 minutes"; "16 hours or more of manual effort into streamlined, fully validated outputs delivered in under 3 minutes" (self-reported) | [1], [3] |
| Agents in medical education | "NYU Langone Health employs multiple AI agents throughout NYUGSOM to assist students and faculty": GradeGPT, AI Resident Summaries, AI Assist | n/a | [3] |
| Evidence search in the EHR | OpenEvidence embedded in Epic, announced October 29, 2026 | n/a | [13] |
| Radiology: fastMRI | "the fastMRI initiative established by NYU Langone Health and Meta AI Research (formerly Facebook) in 2018" | "four times faster than standard scans"; "a total of 170 participants received a diagnostic knee MRI"; radiologists "judged the AI-reconstructed images to be diagnostically equivalent to the conventional images" (Radiology, January 17, 2023) | [18] |
| Radiology, other | "using generative AI to identify incidental findings in radiology exams" | n/a | [1] |
| Governance | UltraVioletAI "adheres to an AI governance framework that includes validation, bias assessment, and clinical oversight"; goal "to rigorously evaluate impact with experimental designs, including randomized controlled trials" | n/a | [2] |
| AI symposium | Inaugural symposium October 6, 2025, "more than 450 attendees"; Paul A. Testa: "It's not AI for its own sake. It's AI in service of better care" | n/a | [10] |

## E) Public security and resilience record

| Date | Event | What is public | Source |
|---|---|---|---|
| October 29 to 30, 2012 | Hurricane Sandy | About 300 patients evacuated ("starting the evacuation of the remaining 300 patients at about 7:30 p.m."), "After two backup generators failed" | [14] |
| December 27, 2012 | Reopening | "As the operating rooms, intensive care units and other services reopened Thursday — 59 days after the storm"; "The damage totaled an estimated $1 billion."; "the emergency room had flooded, expensive diagnostic equipment was destroyed by the influx of brackish water and research projects were ruined when power was lost." | [15] |
| February 2013 | Cost estimate | A senior NYU Langone executive estimated Sandy cost about $1.2 billion including damage and lost revenue (as reported by KFF Health News) | [19] |
| January 2025 | Resilience standards published | "the institution's resiliency program and design standards were published as part of the U.S. Climate Resilience for Health Care ("CR4HC") Toolkit" led by HHS | [1] |
| Late 2024 | Case study | Practice Greenhealth case study "NYU Langone Health: Hardening Infrastructure Against Climate Disruptions" | [1] |
| April 2025 | Mass casualty exercise | "In April 2025, NYU Langone Health conducted a Mass Casualty Incident Full-Scale Exercise at the Watch Hill Ferry Terminal in Patchogue." | [1] |
| 2024 to 2026 | Cyber incidents, outages, HHS OCR breach reports | None found in public sources for NYU Langone Health. Not checked against the HHS OCR breach portal directly (section J) | n/a |

Published cyber preparedness statement (verbatim): "Cybersecurity remains a strategic priority for NYU Langone Health across all its campuses. NYU Langone Health's approach is dynamic, constantly adapting as new technologies, attacker tactics, and business needs emerge." [2]

## F) Stated priorities, 2025 to 2027

| Priority | Evidence | Source |
|---|---|---|
| New Long Island inpatient campus | "long-range plans for NYU Langone Long Island, which include the development of a new inpatient hospital campus over the next ten years"; 45-acre Melville site acquired May 2026; "Master planning for the campus is underway and will require environmental reviews, rezoning, and county and town approvals." | [2] |
| Bring Suffolk to the system standard | Merged March 1, 2025; Leapfrog C to B in eight months; "working towards the goal of NYU Langone Suffolk achieving Magnet® Recognition" | [2], [1] |
| Expand Suffolk | $650 million, seven-story, 270,000 square foot inpatient pavilion approved August 2026 | [6] |
| Ambulatory growth, including Florida | Manhasset and Brooklyn (November 2026), West Palm Beach (December 2026), Orthopedic Center renovation | [2] |
| Manhattan campus renewal | "major renovation projects are underway at the Medical Science Building and the Schwartz Health Care Center", including "a new comprehensive heart center" | [2] |
| "One standard" of care across sites | "one consistently high standard of care across all its locations" | [1] |
| AI at scale with evaluation | Section D | [2] |
| Cybersecurity | "Cybersecurity remains a strategic priority" | [2] |
| Research growth | "$982 million active" NIH awards; laboratory renovations at 540 First Avenue and the Medical Science Building | [2], [1] |
| Medical education | Three-year MD pathway; full-tuition scholarships at both schools; AI agents in education | [2], [3] |
| Sustainability and resilience | "committed to becoming a carbon neutral health system by 2050"; "a 50% reduction in Scope 1 & 2 emissions intensity ... by 2030 from a 2021 baseline" | [1] |
| Funding of capital | "costs associated with any specific plans or projects will be funded from a combination of income generated from operations, philanthropy, and additional debt" | [2] |

Bond rating commentary mentioning IT or cyber: none found. The rating actions cited in [2] are reported without analyst commentary. The cyber statement above is NYU Langone's own disclosure to bondholders, not a rating agency view.

## G) Four account-specific use cases

Each use case is anchored on a cited public fact. The "today" beats are vendor-neutral descriptions of how such work is typically done; they are not claims about NYU Langone's internal process. Every "with Cisco" beat is a hypothesis to validate, and every outcome is modeled, not measured.

### G1. New hospitals and hubs, one operating standard (`nyu-new-sites-one-standard`)

- **Anchor fact.** Long Island Community Hospital merged into NYU Langone Hospitals effective March 1, 2025 [1]; a 45-acre Melville property was acquired in May 2026 for a new inpatient campus; Manhasset and Brooklyn hubs are expected in November 2026 and West Palm Beach in December 2026 [2]. The stated aim is "one consistently high standard of care across all its locations" [1].
- **Today (vendor-neutral).** Each opening is a separate project across network, security, clinical application and facilities teams. An acquired hospital arrives with its own equipment and exceptions. Day-one problems go to a bridge call.
- **With Cisco (hypothesis to validate).** One readiness view per site in Cloud Control (Topology, Inventory, AI Canvas) fed by whichever campus, branch and WAN controllers are connected; a named person approves each remediation; modeled outcome is more repeatable openings.
- **Discovery question.** For the Manhasset, Brooklyn and West Palm Beach openings, how do you confirm each site matches the system network and security standard before day one, and how long did that take at Suffolk?
- **Stays with the hospital.** EHR build and go-live, biomedical onboarding, construction and commissioning, change advisory.

### G2. Keeping 128 production AI models dependable (`nyu-ai-in-production`)

- **Anchor fact.** "more than 128 models in production and 150 models in development"; ambient AI for "over 1,500 inpatient and emergency department providers"; investment in "robust infrastructure, privacy, and security across all cloud providers' AI offerings" [2].
- **Today (vendor-neutral).** AI runs across local GPUs, a research supercomputer, cloud services and vendor platforms; a slow ambient note has many suspects; governance evidence is gathered by hand for each review.
- **With Cisco (hypothesis to validate).** One investigation across device, network, cloud path and AI service (AI Canvas, ThousandEyes, Splunk, Nexus, Intersight, AI Defense, Agent Observability); the informatics owner approves any change that touches a clinical AI tool; modeled outcome is a shorter time to name the faulty layer.
- **Discovery question.** When an ambient note or an AI answer inside the record is slow for an emergency physician, who owns finding the faulty layer today, and how many tools do they open?
- **Stays with the hospital and its vendors.** Model development, validation, bias assessment, clinical oversight, AI governance, Epic and each AI vendor's platform.

### G3. Stopping a help desk identity attack (`nyu-help-desk-identity-attack`)

- **Anchor fact.** The bond disclosure lists "secure password-less authentication to eliminate password theft, and robust user verification to prevent social engineering attacks on the Help Desk" and AI to "Automate triage, execute playbooks, and generate first-draft reports to reduce analyst workload" [2].
- **Today (vendor-neutral).** Help desk, identity, remote access and network evidence sit in separate tools; containment during a shift is a judgment call; the report is written afterwards.
- **With Cisco (hypothesis to validate).** One identity timeline (Duo, Cisco Identity, ISE, Splunk, Federated Search, AI Canvas); a named security lead approves revocation and quarantine; modeled outcome is faster containment and a generated first-draft report.
- **Discovery question.** Your disclosure names help desk social engineering as a threat: when a reset looks suspicious, how long does it take to see what that identity then touched on the network?
- **Stays with the hospital.** Help desk verification procedure, identity provider, HR and credentialing records, incident command, regulatory notification.

### G4. Storm night: one view of plant and network (`nyu-storm-night-operations`)

- **Anchor fact.** During Hurricane Sandy NYU Langone evacuated about 300 patients after two backup generators failed [14] and reopened 59 days later [15]; in January 2025 its resiliency program and design standards were published in the HHS climate resilience toolkit [1].
- **Today (vendor-neutral).** Plant and IT are watched on separate screens; dependencies between power, closets and clinical units live in people's heads; communication fragments under stress.
- **With Cisco (hypothesis to validate).** One shared operating picture joining building and power telemetry with network state (Data Fabric, Splunk, Meraki sensors, Spaces, Topology); incident command approves each step that affects a care area; modeled outcome is earlier warning and a complete decision record.
- **Discovery question.** Since the rebuild after Sandy, can your facilities command post and your network operations team see each other's alarms on one timeline during a storm drill?
- **Stays with the hospital.** Emergency management, incident command, building management system, generators and switchgear, evacuation decisions, clinical downtime procedures.
- **Caveat.** NYU Langone's resilience programme is published as a reference for others. This story must not imply a gap.

## H) Claims that must NOT be made

1. Do not say NYU Langone uses, has bought, has standardised on or is evaluating any Cisco, Webex, Splunk, ThousandEyes or Meraki product. No source says so.
2. Do not name NYU Langone's network, wireless, WAN, firewall, identity, SIEM, data center or collaboration vendors. None is named in a source we could verify.
3. Do not say NYU Langone has had a ransomware attack, a cyber outage or an HHS OCR-reported breach in 2024 to 2026. None was found.
4. Do not attribute cyber incidents at New York University (the university) to NYU Langone Health. Search results describe a March 2025 incident at the university; we did not read a primary source, and the health system is a separately operated organisation with its own IT department [11].
5. Do not present any "with Cisco" outcome as measured at NYU Langone. All are modeled.
6. Do not say ambient documentation at NYU Langone saves a specific number of minutes. Only qualitative results are published [2].
7. Do not quote "seven hospitals" and "five inpatient facilities" interchangeably. Bond disclosure says five inpatient acute care facilities [2]; press boilerplate says seven inpatient locations [13]. Say which count is being used.
8. Do not cite "No. 193" as UltraViolet's current TOP500 rank. That was the November 2024 list; the June 2026 list shows rank 280 [16].
9. Do not say the Sandy generator failure reflects current infrastructure. The campus was rebuilt, and the resilience standards are now published by HHS [1].
10. Do not describe Paul Testa as chief AI officer or name a CISO. Neither is supported by a source.
11. Do not claim that Cloud Control or Data Fabric integrates with NYU Langone's building management, Epic or AI vendor platforms. That is discovery work.

## I) Sources

1. NYU Langone Health, "Annual Report, Fiscal Year 2025: Management's Discussion and Analysis" (FY2025-Q4 Annual Report, NYU Langone Hospitals Obligated Group, unaudited), issued November 2025. https://nyulangone.org/files/2025-annual-report.pdf
2. NYU Langone Health, "Quarterly Report, Fiscal Year 2026: Management's Discussion and Analysis" (FY2026-Q3 Quarterly Report, nine months ended May 31, 2026, unaudited), issued July 2026. https://nyulangone.org/files/2026-q3-report.pdf
3. NYU Langone Health, "Quarterly Report, Fiscal Year 2026" (FY2026-Q1 Quarterly Report, three months ended November 30, 2025), issued January 2026. https://nyulangone.org/files/2026-annual-report.pdf (the file name says annual report; the document is the first-quarter report)
4. NYU Langone Health, "NYU Langone Health Is Named No. 1 Health System for 5th Consecutive Year by Vizient", press release, September 24, 2026. https://nyulangone.org/news/nyu-langone-health-named-no-1-health-system-5th-consecutive-year-vizient
5. NYU Langone Health News, "A Community Hospital Reimagined: NYU Langone Hospital—Suffolk Joins Our Top-Ranked Health System", Spring 2025. https://nyulangone.org/news/community-hospital-reimagined-nyu-langone-hospital-suffolk-joins-our-top-ranked-health-system
6. Denise Civiletti, "NYU Langone deepens Suffolk footprint with $650 million hospital expansion in E. Patchogue", RiverheadLOCAL, August 31, 2026. https://riverheadlocal.com/2026/08/31/nyu-langone-suffolk-patchogue-hospital-expansion/
7. Jiang LY, ... Oermann EK, "Health system-scale language models are all-purpose prediction engines", Nature 619, 357–362, published June 7, 2023. https://www.nature.com/articles/s41586-023-06160-y (open copy read: https://pmc.ncbi.nlm.nih.gov/articles/PMC10338337/)
8. Small WR, ... Austrian JS, "The First Generative AI Prompt-A-Thon in Healthcare: A Novel Approach to Workforce Engagement with a Private Instance of ChatGPT", PLOS Digital Health 3(7):e0000394, July 23, 2024. https://pmc.ncbi.nlm.nih.gov/articles/PMC11265701
9. Small WR, Wiesenfeld B, Brandfield-Harvey B, et al., "Large Language Model–Based Responses to Patients' In-Basket Messages", JAMA Network Open 2024;7(7):e2422399, July 16, 2024. https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2821167
10. NYU Langone Health, "Five Big Takeaways from NYU Langone's AI Symposium", news article on the October 6, 2025 symposium (page date not captured). https://nyulangone.org/news/five-big-takeaways-nyu-langones-ai-symposium
11. NYU Langone Health, "Nader Mherabi" executive leadership page, read November 13, 2026. https://nyulangone.org/our-story/our-leadership/executive-leadership/nader-mherabi
12. Abridge, "NYU Langone Selects Abridge to Advance Modern Healthcare Delivery", vendor blog, September 3, 2025. VENDOR-REPORTED. https://www.abridge.com/blog/nyu-selects-abridge
13. NYU Langone Health, "OpenEvidence and NYU Langone Health Partner to Bring Patient-Aware Intelligence to 12 Million Visits in New York City", press release, October 29, 2026. https://nyulangone.org/news/openevidence-and-nyu-langone-health-partner-bring-patient-aware-intelligence-12-million-visits-new-york-city
14. CBS News with The Associated Press, "NYC hospital successfully evacuates 300 patients after Superstorm Sandy", November 1, 2012. https://www.cbsnews.com/news/nyc-hospital-successfully-evacuates-300-patients-after-superstorm-sandy/
15. NBC New York (Associated Press), "NYU Langone Medical Center Reopens 2 Months After Sandy", December 27, 2012. https://www.nbcnewyork.com/news/local/nyu-langone-medical-center-sandy-evacuated-patients-federal-aid-power/2095324/
16. TOP500, "UltraViolet - NVIDIA DGX H100, Xeon Platinum 8480C 56C 3.8GHz, NVIDIA H100 80GB, Mellanox HDR Infiniband, Ubuntu 22.04", system page, read November 13, 2026. https://top500.org/system/180229
17. NYU Langone Health, "Home Hospital Program of NYU Langone Hospital—Long Island Celebrates Its 1,000th Patient", March 19, 2025. https://nyulangone.org/news/home-hospital-program-nyu-langone-hospital-long-island-celebrates-its-1000th-patient
18. NYU Langone Health, "Artificial Intelligence Reconstructs Missing Data from Rapid MRI Scans", January 17, 2023. https://nyulangone.org/news/artificial-intelligence-reconstructs-missing-data-rapid-mri-scans
19. Jenny Gold, "Post-Sandy, NYU Langone Has Reopened, But Can It Regain Market Share?", KFF Health News, February 1, 2013. https://kffhealthnews.org/health-industry/nyu-market-share-after-sandy/
20. Erika Fry, "How two friends turned NYU Langone into a $14 billion hospital powerhouse", Fortune, August 15, 2025. https://fortune.com/article/nyu-langone-hospital-robert-grossman-ken-langone-health-data
21. Wylie Wong, "Hospitals Look to Innovation to Inspire Design", HealthTech Magazine, October 22, 2018. https://healthtechmagazine.net/article/2018/10/hospitals-look-innovation-inspire-design

## J) Gaps / unverified

- **Cisco footprint.** No Cisco, Webex, Splunk, ThousandEyes or Meraki case study, press release or disclosure naming NYU Langone was found. A third-party sales-intelligence database (Apps Run The World) lists NYU Langone Health as having selected Cisco Webex Meetings in 2020; this is an automated profile without a primary source and is unverified. Do not use it.
- **Infrastructure vendors.** Network, wireless, WAN, firewall, identity, SIEM, data center, colocation and collaboration vendors are not named in any source we verified. NYU Langone job postings seen in search results (for example a network security role whose title mentions a firewall vendor) could not be opened (HTTP 404) and are not relied on. A 2018 trade article says the Kimmel Pavilion "is powered by NYU Langone Health's existing data centers" and names no network vendor for NYU Langone [21].
- **Data center and colocation locations.** Not found.
- **Command center.** Fortune describes a real-time dashboard of "more than 800 metrics" [20]; a Tableau customer story that appears to give more detail (VENDOR-REPORTED) returned HTTP 403 and was not read. No physical operations command center is described in a source we read.
- **CISO, chief AI officer, CMIO.** No CISO name found. No chief AI officer title found. Paul A. Testa's current published title is chief health informatics officer [10].
- **Predictive Analytics Unit and Institute for Innovations in Medical Education leadership.** The units are named in [8] and [10]; the Predictive Analytics Unit's current director was not verified.
- **HHS OCR breach portal.** Not queried directly. Secondary sites report small historical incidents (a 2022 mailing vendor error and earlier stolen-device notices); these were not verified at the primary source and are not listed in section E.
- **Sandy evacuation count.** Reports range from about 215 to about 322 patients. This brief uses "about 300" from the Associated Press report [14]. FEMA funding totals for the rebuild were not verified (the archived FEMA page could not be read).
- **Sandy cost quote.** The $1.2 billion figure in [19] is a paraphrase from the automated page reader; check the article before quoting.
- **Becker's Hospital Review articles** (FY2025 results; "NYU Langone moves beyond AI 'at the edges'"; "Why NYU Langone Health combined informatics, IT") returned HTTP 403 and were not read. Financial figures here come from the primary disclosure instead.
- **Epic generative AI in production.** The JAMA Network Open study [9] covers a pilot at three internal medicine practices; the current rollout scale of AI-drafted replies is not published in a source we read.
- **Virtual urgent care and remote patient monitoring volumes.** Not found.
- **Other 2026 items seen only in search results and not read:** a Dana-Farber and NYU Langone oncology decision tool ("Solavia"), a MedCity News February 2026 interview on autonomous clinical AI, and a research collaboration with Function Health.
- **Inpatient count discrepancy** (five facilities in bond disclosure versus seven locations in press boilerplate) is unresolved; it probably reflects how Tisch, Kimmel and Hassenfeld Children's are counted, but no source explains it.
- **Leapfrog count in [4].** The automated reader returned "10 consecutive A ratings" from the Vizient press release, which conflicts with "12 consecutive grading rounds or more" in [2]; this brief uses [2].
- **Rating agency commentary on IT or cyber.** None found.
