# Healthcare Security Pillar: Research Brief (as of Nov 12, 2026)

The latest benchmarks are in. IBM's 2026 report puts the average healthcare breach at **$6.64M**, down from $7.42M in 2025 and still the highest of any industry. The January 2025 HIPAA Security Rule update is **still not final**; HHS's regulatory agenda now targets July 2027. The incident file runs from Change Healthcare to University Hospitals Cleveland (October 2026).

Three things to know before using this:
- **No published benchmarks exist** for mean time to acknowledge (MTTA), mean time to kill (MTTK) or mean time to innocence. The MTTx table marks those rows as frameworks only.
- **Some architecture claims are uncited.** Statements on 802.1X, network access control and SASE/SSE are practitioner framing. No primary source turned up for them.
- **Several sources conflict.** Where an IBM or FBI figure differs between the primary and secondary sources, it is flagged in the text and in section E.

Square brackets refer to the numbered sources in section F. The brief is vendor-neutral and contains no exploit or attack procedures.

---

## A) Threat and architecture brief

### 1. Threat landscape

**Ransomware and double extortion**
- **System intrusion leads healthcare breaches.** In Verizon's 2025 DBIR it overtook miscellaneous errors as the top pattern [5]. In the 2026 DBIR it held the top spot for a second year, with 1,492 incidents and 1,438 confirmed disclosures [6].
- **Initial access in the 2026 DBIR (healthcare):** vulnerability exploitation 20%, phishing 14%, credential abuse 11% [6].
- **Patching is slow.** Verizon found only 26% of critical vulnerabilities were fully remediated in 2025, with a median of 43 days to fix [7].
- **Healthcare is the top ransomware target in FBI data.** The FBI IC3 2025 report ranks healthcare and public health as the most targeted critical-infrastructure sector: 460 ransomware complaints and 182 data-breach complaints [13][14]. One trade outlet reported 278 ransomware complaints instead; see section E.
- **Attackers are shifting from encryption to data theft.** In Sophos's 2025 healthcare survey, only 34% of attacks encrypted data (down from 74% in 2024), and extortion without encryption tripled since 2023 [10].
- **Interlock** is one current double-extortion group. A July 22, 2025 joint advisory from CISA, the FBI, HHS and MS-ISAC recommends segmentation to limit lateral movement, MFA, patching and DNS filtering [93]. Health-ISAC describes Interlock's primary focus as health and other critical infrastructure [115].

**Business email compromise (BEC)**
- Ponemon's 2025 survey found BEC was the attack type most likely to delay procedures and tests that led to poor outcomes (65% of affected organizations) [11].
- IC3 reported BEC losses across all sectors of about $3.0B in 2025 [13].

**Third-party and clearinghouse compromise**
- Third parties were involved in 32% of healthcare breaches in the 2026 DBIR [6].
- Ponemon 2025: 87% of organizations hit by a supply-chain attack reported disruption to patient care [11].
- Change Healthcare is the defining case (see section C). After it, Ascension said it diversified its claims clearinghouses [61].

**Insider misuse and error**
- Internal actors were behind 19% of healthcare breaches in the 2026 DBIR [6].
- The human element was involved in 54% of incidents. Misdelivery was about 40% of human-error incidents [7].

**Legacy medical-device exposure**
- Claroty's research on 2023 data found 14% of connected medical devices ran unsupported or end-of-life operating systems. Imaging made up 32% of those unsupported devices [34].
- The same research found 22% of hospitals had devices bridging the guest and internal networks [34].
- Claroty's 2025 report found devices with known exploited vulnerabilities in 99% of the healthcare organizations it studied [35].
- Note that Claroty is a vendor; these are vendor research figures (see section E).
- ECRI ranks "Cybersecurity risks from legacy medical devices" #8 on its 2026 hazards list [36].

**Clinic-to-hospital lateral movement (risk pattern only)**
- **Change Healthcare:** after entering through a legacy remote-access portal without MFA, the attackers moved laterally before deploying ransomware nine days later [51].
- **Ascension:** per a senator's investigation, it began with one contractor laptop and escalated to the central identity directory [64].
- **What it means:** compromise of one less-protected entry point can reach enterprise-wide identity. That is why CISA and HHS stress segmentation and separating user from privileged accounts [25][93].
- **Regional spillover:** a JAMA Network Open study of a 2021 San Diego attack found neighboring EDs saw a 35.2% rise in ambulance arrivals and a 113.6% rise in confirmed strokes [111].

### 2. Network security architecture

**Zoning.** HHS 405(d) HICP practice 6.M.B describes splitting the network into zones [27]:
- Clinical workstations
- General access
- Guest
- Medical device networks
- Building management systems
- IoT
- Perimeter, data-center and vendor zones

**What HICP says about each zone:**
- **Guest networks** should be explicitly barred from reaching the internal network [27].
- **Vendor access** should be need-based, temporary, and segmented from other networks [27].
- **Monitoring the medical-device zone:** firewalls, flow data, intrusion prevention and deception logs. HICP also suggests a monthly metric counting medical devices that are not segmented [27].

**Macro- versus microsegmentation.**
- Macrosegmentation means zoning by function (clinical, device, guest, building, research), as above.
- HICP also tells organizations to stop assets in one general-access network from talking to assets in another, which it calls a critical control against ransomware spread [27]. That is a sourced form of east-west restriction.
- Network segmentation is an "Enhanced" goal in the HHS Cybersecurity Performance Goals (CPGs) [25].
- The 2025 HIPAA proposal would require segmentation outright [19][21].

**Uncited practitioner framing (no primary source found):**
- 802.1X and network access control for onboarding devices
- East-west inspection between zones
- Firewall versus SASE/SSE design patterns

**Remote vendor access for biomed and imaging-modality service.**
- HICP warns about "unattended sessions" in vendor remote-access tools and lists vendor-managed remote-access systems as assets to inventory [27].
- The Change Healthcare entry point was a remote-access portal without MFA [51][52].
- New York's hospital rule (10 NYCRR 405.46) requires third-party service-provider policies and MFA or risk-based authentication [45][46].

### 3. Identity

- **Tap-and-go single sign-on:** HICP advises tying the badge to an individual identity, requiring a full login at the start of a shift, then allowing badge taps, with a session-lock timeout under 15 to 30 minutes [27].
- **One identity per person:** the 405(d) access-management guidance calls for "one-person, one-identity, multiple contexts" with automated provisioning and deprovisioning [28].
- **Privileged access:** the CPG Essential goals include separating user and privileged accounts, using unique credentials, and revoking credentials when staff leave [25].
- **Break-glass (emergency access):**
  - **Accounts:** pre-staged emergency accounts with the minimum necessary privileges [114].
  - **Monitoring:** extra auditing, with reviewers who did not create the accounts [114].
  - **Limits:** a documented, tested procedure that is not a substitute for the helpdesk [114].
  - **Identity outage:** an alternate way to log in if the central identity system fails [114].
- **Third-party vendor accounts:** the CPGs cover vendor/supplier cybersecurity requirements (Essential) and third-party incident reporting (Enhanced) [25]. The 2025 HIPAA proposal would require business associates to verify their safeguards and to report activating their contingency plan within 24 hours [19][21].

### 4. Medical device security

- **FDA section 524B** was added by FDORA in December 2022. It requires cyber-device makers to submit cybersecurity information in premarket filings, including a software bill of materials (SBOM) [30][31].
- **FDA guidance has been updated twice since 2023:**
  - **June 27, 2025:** a final premarket cybersecurity guidance [30].
  - **February 3, 2026:** a newer version that supersedes it [29].
- **SBOM recommendations:** machine-readable, using NTIA baseline attributes, with each component's support level and end-of-support date [31].
- **MDS2 form:** ANSI/NEMA HN 1-2019 is the voluntary security-disclosure form [32]. It has about 240 questions covering 23 security capabilities, including whether an SBOM is available [33]. Hospitals typically request it during procurement [33].
- **Handoff between clinical engineering (HTM) and security.** HICP calls for visibility into each device type per segment, and for inventories broken down by device type and vendor [27]. The ECRI 2026 legacy-device hazard points to the same need for joint ownership [36]. No authoritative workflow standard for this handoff was found (see section E).

### 5. Resilience

- **Planning horizon:** Joint Commission Sentinel Event Alert 67 says to plan for life- and safety-critical technology being offline for four weeks or longer [17].
- **What to keep running:** the alert names pharmacy, medical records, lab, radiology, blood bank and ICU [17].
- **Paper downtime is the norm.** Kettering [84], Ascension [60], UMMC [102] and Signature [103] all ran on paper during their outages.
- **Ambulance diversion** happened at Ardent [68], Prospect [86], Kettering [85], Signature [103] and UNM [110].
- **Backups:** the CISA Interlock advisory calls for tested backups [93]. Sophos found healthcare's use of backups to restore data fell to 51% in 2025 [10].
- **Restore targets:** the 2025 HIPAA proposal would require written procedures to restore critical systems and data within 72 hours [19].
- **ECRI 2026:** hazard #2 is "Unpreparedness for a Digital Darkness Event" [36][37].
- **CRR program:** in 2026 the Joint Commission and AHA launched a Cyber Resilience Readiness program aimed at outages of 30 days or more [14][15][16].

---

## B) Compliance matrix (status as of Nov 12, 2026)

| Framework | Status | What it requires (brief) | Source |
|---|---|---|---|
| HIPAA Security Rule (current) | In force | Risk-based safeguards; OCR's enforcement drive focuses on risk analysis | [23][24] |
| HIPAA Security Rule proposed update (published Jan 6, 2025) | Proposed, not final | MFA, encryption, segmentation, asset inventory and network map, 72-hour restore, annual testing, business-associate verification | [19][21] |
| HIPAA update finalization timeline | Final action projected July 2027 (moved from May 2026); "Long-Term Actions"; no legal deadline | Planning estimate only | [20][21] |
| HITECH | In force | Breach portal for breaches of 500+ people; mitigation for "recognized security practices" | [49][97] |
| OCR enforcement 2025 to 2026 | Active | 19 ransomware settlements by Apr 2026; Lehigh Valley Health Network $800K (Oct 29, 2026) | [23][24] |
| HHS 405(d) HICP (2023 edition) | Voluntary | Practices mapped to the CPGs | [26][27] |
| HHS Healthcare CPGs (Jan 2024) | Voluntary | 10 Essential and 10 Enhanced goals | [25] |
| FDA section 524B | In force | Cyber-device premarket content, SBOM | [29][30][31] |
| Joint Commission | Accreditation standard | Cyberattacks in hazard vulnerability analysis (EM.11.01.01), continuity (EM.13), recovery (EM.14); analysis reviewed every 2 years | [17][18] |
| Joint Commission/AHA CRR | Voluntary (launched May 2026; certification June 2026) | Clinical continuity during outages of 30+ days | [14][15][16] |
| CMS Conditions of Participation (emergency preparedness) | In force | All-hazards plan including cyberattacks; reviewed yearly | [38][39] |
| CMS cybersecurity Conditions of Participation | Reported in draft (Jan 2025); no published proposed rule found | Basic cyber defenses for hospitals | [40][22] |
| CMS proposed rule, Nov 5, 2026 | Proposed; comments due Jan 11, 2027 | Regulatory relief and power-system codes; not a cyber rule | [41] |
| ONC/ASTP information blocking | Enforcement stepped up Sep 2025 | Disincentives through CMS programs; penalties up to $1M per violation for IT developers and health information exchanges | [42][43][44] |
| NY 10 NYCRR 405.46 | In force; full compliance Oct 2, 2025 | CISO, MFA, incident response, report within 72 hours | [45][46] |
| S.3315 Health Care Cybersecurity and Resiliency Act | Passed Senate Sep 30, 2026; held at the House desk | Minimum cyber practices, HHS and CISA coordination | [47][48] |

---

## C) Incident file

**Change Healthcare (UnitedHealth/Optum), February 2024**
- **What failed:** a legacy remote-access portal had no MFA. Attackers moved laterally and deployed ransomware nine days after entering on Feb 12 [51].
- **Duration:**
  - Pharmacy claims were near normal by Mar 13 [56].
  - Processing of the $14B claims backlog began Mar 22 [57].
  - Payments were still at about 86% of pre-incident levels on Apr 22 [56].
- **Clinical impact:**
  - 74% of hospitals reported a direct impact on patient care [55].
  - 94% reported a financial impact [55].
  - A small clinic in Yorkville, NY lost about $25K per week in cash flow [58].
- **Financial:**
  - $22M ransom paid [52].
  - $3.09B total impact in 2024 [53].
  - $799M more in Q4 2025 [54].
- **Records:** about 192.7M people [49][50].
- **Infrastructure lesson:** require MFA on every external access path; clearinghouse concentration is a single point of failure.

**Ascension, May 8, 2024**
- **What failed:** malware on a contractor or employee device, then escalation to the central identity directory [63][64].
- **Duration:** 37 days to full restore [60].
- **Clinical impact:**
  - The EHR, imaging and ordering systems were down, and runners carried printed scans to surgeons [60].
  - Staff reported delayed lab results and medication errors [62].
  - Volumes were 8% to 12% lower in May and June [61].
- **Financial:**
  - About $130M in response costs [60].
  - The incident contributed to a $1.8B FY24 operating loss [61].
- **Records:** 5,599,699 [59].
- **Infrastructure lesson:** harden service accounts and the identity tier, and isolate contractor endpoints.

**CommonSpirit Health, Oct 2, 2022** (outside the 2023 to 2026 window, included as requested)
- **What failed:** ransomware, with EHR and patient-portal outages [67].
- **Duration:** more than a month at some facilities [67].
- **Clinical impact:** disruption varied by site; it also hit former hospitals that still relied on CommonSpirit IT [67].
- **Financial:** $150M, later raised to $160M [65][66].
- **Records:** 623,774 [65].
- **Infrastructure lesson:** shared IT services spread impact to affiliates.

**Ardent Health, Nov 23, 2023**
- **What failed:** ransomware; the network was taken offline proactively [68].
- **Duration:**
  - Epic was restored Dec 6 to 7 [69].
  - The patient portal was fully restored by Jan 2024 [69].
- **Clinical impact:** ambulance diversion across six states [68][69].
- **Financial:** about $74M pre-tax impact in 2023 [70].
- **Records:** a class action covers about 38,000 people [71]. The full count was not confirmed (see section E).
- **Infrastructure lesson:** shutting everything down to contain an attack also shuts down care, so segmentation decides how much has to go dark.

**Synnovis / NHS, June 3, 2024**
- **What failed:** ransomware at a third-party pathology provider [72].
- **Duration:** services fully restored by December 2024 [72].
- **Clinical impact:**
  - More than 11,000 appointments delayed [72].
  - Nearly 600 incidents linked to the attack, including 1 involving severe harm [75].
  - The attack was a contributing factor in one patient death [74].
  - It caused a strain on O-negative blood supplies [78].
- **Financial:** £32.7M [73].
- **Records:** not published; outside estimates exceed 900,000 [76][77].
- **Infrastructure lesson:** diagnostic suppliers are clinical-critical dependencies.

**CrowdStrike faulty update, July 19, 2024** (not an attack)
- **What failed:** a defective content update crashed Windows hosts [79].
- **Duration:**
  - Median hospital downtime was about 5 hours [81].
  - 58% of services were back within 6 hours [82].
- **Clinical impact:**
  - Disruptions were detected at 759 of 2,232 hospitals scanned; 239 services were patient-facing [81].
  - Mass General Brigham canceled non-urgent visits and procedures [79].
  - Other U.S. hospitals postponed elective surgeries and ran clinics on paper [80].
- **Financial:** no healthcare total found.
- **Infrastructure lesson:** plan for mass failures of security tooling, and rehearse fixing endpoints at scale.

**Kettering Health, May 20, 2025**
- **What failed:** Interlock ransomware; the attackers were inside from Apr 9 [84].
- **Duration:**
  - Epic was back June 2 [83].
  - Normal operations resumed June 10 [84].
- **Clinical impact:** canceled elective procedures and ED diversion [83][85].
- **Financial:** not disclosed.
- **Records:** 1,695,382 [84].
- **Infrastructure lesson:** a six-week dwell time means detection gaps; Kettering added segmentation afterward [83].

**Prospect Medical Holdings, Aug 3, 2023**
- **What failed:** Rhysida ransomware [86][87].
- **Duration:** about 40 days [89].
- **Clinical impact:** ED closures and diversion; paper records [87].
- **Financial:** not found.
- **Records:** 342,376 [88].
- **Infrastructure lesson:** multi-state systems need regional isolation.

**DaVita, Apr 12, 2025**
- **What failed:** Interlock ransomware; attackers were inside from Mar 24, centered on the lab database [92].
- **Duration:** the attacker was evicted on the day it was detected [92].
- **Clinical impact:** dialysis care continued [90].
- **Financial:**
  - $13.5M in Q2 2025 [90].
  - $25M for 2025 overall [91].
  - $15M class-action settlement [91].
- **Records:** 2,689,826 [90].
- **Infrastructure lesson:** protect lab data stores.

**Lurie Children's Hospital, Jan 31, 2024**
- **What failed:** credential compromise and ransomware [95].
- **Duration:** the EHR returned in early March; the threat was declared cleared May 20 [94].
- **Records:** 791,784 [94].
- **Infrastructure lesson:** defend identity, and restore communications systems first.

**Other 2025 incidents**
- **Yale New Haven Health:** 5,556,702 records; care was not affected [96].
- **Episource (a business associate):** 5,418,866 records [96].
- **Frederick Health (Jan 27, 2025):** 934,326 records; nearby hospitals saw more patients [96].
- **Covenant Health (May 18, 2025):** Qilin ransomware; the count was revised from 7,864 to 478,188 [99].

**University of Mississippi Medical Center, Feb 19, 2026**
- **What failed:** ransomware [100].
- **Duration:**
  - Clinics reopened Mar 2, 2026 [101].
  - Full Epic access and reconciliation were still in progress at that point [102].
- **Clinical impact:** all of its roughly 35 clinics closed; electives canceled; hospitals stayed on downtime procedures [100][102].
- **Infrastructure lesson:** phones and email failed alongside the EHR, so out-of-band communications are needed [102].

**Signature Healthcare, Brockton, MA, Apr 6, 2026**
- **What failed:** an undisclosed cyber incident [103].
- **Duration:** ambulance diversion until Apr 15 [103].
- **Clinical impact:** chemotherapy canceled Apr 7; retail pharmacies could not fill prescriptions [103][104].

**University Hospitals Cleveland, Oct 22, 2026**
- **What failed:** unusual server activity; systems disconnected from the internet [105].
- **Duration:** the patient portal was restored Nov 7 [107].
- **Clinical impact:** some procedures rescheduled; prior-authorization problems [106].

**UNM Health, Oct 26, 2026**
- **What failed:** ransomware [108].
- **Duration:** about two days [109].
- **Clinical impact:** the state temporarily lost its only Level 1 trauma capability [110].
- **Infrastructure lesson:** UNM reported that only end-user devices were affected, not core servers [108].

**HealthAlliance (NY), October 2023**
- **What failed:** an unpatched remote-access appliance [112].
- **Clinical impact:** ambulance diversion [112].
- **Financial:** $550K state fine (about $1.4M, with $850K suspended) [112].
- **Records:** about 242,000 [112].

---

## D) MTTx and cost table

| Metric | Figure | Year / organization | Source |
|---|---|---|---|
| MTTI (IBM's mean time to identify; not the "mean time to innocence" from the brief) | 183 days (global) | 2026 / IBM | [3] |
| MTTC (mean time to contain) | 64 days (global) | 2026 / IBM | [3] |
| Breach lifecycle, healthcare | 279 days | 2025 / IBM | [1][2] |
| Breach lifecycle, global | 247 days (2026); 241 days (2025) | IBM | [3][1] |
| Lifecycle when found internally | 209 days | 2026 / IBM | [3] |
| MTTD proxy: dwell time | 14-day median (global, up from 11) | 2026 / Mandiant | [8][9] |
| Detected internally | 52% (all cases); 41% (ransomware) | 2026 / Mandiant | [9] |
| MTTR: ransomware recovery | 58% recovered within a week; 97% within 3 months | 2025 / Sophos | [10] |
| MTTR: breach recovery | 42% fully recovered; 19% needed over 150 days | 2026 / IBM | [3] |
| MTTA / MTTK / mean time to innocence (EHR vs. PACS vs. pump VLAN) | **No published benchmark found** | none | section E |
| Healthcare breach cost | $6.64M (2026); $7.42M (2025); $9.77M (2024) | IBM | [3][1] |
| Global / U.S. breach cost | $4.99M global (2026); $10.22M U.S. (2025) | IBM | [3][2] |
| Ransomware recovery cost, healthcare | $1.02M (down from $2.57M) | 2025 / Sophos | [10] |
| Ransom paid, healthcare | 36% paid | 2025 / Sophos | [10] |
| Cost of most significant attack | $3.9M | 2025 / Ponemon | [11] |
| Patient-care disruption | 72%; 29% reported higher mortality | 2025 / Ponemon | [11][12] |
| OCR breach portal 2025 | 710 breaches / 61.6M people (Jan 2026 snapshot); later 804 / over 140M | HIPAA Journal from OCR data | [97][98] |
| OCR breach portal H1 2026 | 397 breaches / 33.77M people | HIPAA Journal from OCR data | [98] |
| OCR breach portal 2024 | 289.2M people affected | HIPAA Journal from OCR data | [97] |

---

## E) Gaps

1. **Missing MTTx benchmarks.**
   - **What's missing:** HHS 405(d), IBM, Mandiant and Verizon publish no healthcare figures for MTTA, MTTK or mean time to innocence.
   - **How to use these metrics:** treat them as proposed KPIs. HICP's monthly unsegmented-device metric is a sourced building block [27].
2. **No healthcare-specific IBM 2026 lifecycle.** IBM's 2026 report gave no healthcare-specific lifecycle figure; the 279-day figure is from 2025.
3. **IBM "consecutive years" wording is inconsistent.**
   - IBM's own documents say 12th year (2025) and 13th year (2026) as the costliest industry [1][3].
   - IBM web pages and press coverage say 14th or 15th.
   - Healthcare was also only about 2% of IBM's 2025 sample [4].
4. **FBI IC3 count conflict.** 460 healthcare ransomware complaints [13][14] versus 278 in one TechTarget article. The primary IC3 report PDF was not retrieved.
5. **Uncited architecture claims.** No primary source was found for 802.1X/NAC, SASE/SSE or east-west inspection designs.
6. **Missing incident data.**
   - **Records not disclosed:** Ardent's full count, and Synnovis's (Synnovis publishes no total).
   - **Costs not disclosed:** Kettering, Prospect, UMMC, Signature, University Hospitals and UNM.
   - **Still open:** the University Hospitals incident is ongoing, with its cause undisclosed.
7. **CMS cybersecurity Conditions of Participation.** A draft was reported in January 2025, but no published proposed rule was found.
8. **"Yorkville" is not a separate incident.** It is a physical therapy clinic affected by Change Healthcare [58]. No standalone Yorkville incident was found.
9. **Vendor research.** Claroty is vendor research, not neutral; cite it with that caveat. Conduent's 62.2M count comes from a secondary source [113].
10. **State privacy laws.** Only New York's hospital rule is covered. State laws such as Washington's My Health My Data Act were not researched.

---

## F) Sources

1. IBM Cost of a Data Breach 2025 (PDF): https://www-api.ibm.com/adobe/assets/urn:aaid:aem:607b9590-38e0-4c91-b433-aa8a17f5b5e8/original/as/cost-of-a-breach-2025-full-report.pdf
2. IBM newsroom, Jul 30, 2025: https://newsroom.ibm.com/2025-07-30-ibm-report-13-of-organizations-reported-breaches-of-ai-models-or-applications,-97-of-which-reported-lacking-proper-ai-access-controls
3. IBM Cost of a Data Breach 2026 (PDF): https://assets.ibm.com/adobe/assets/urn:aaid:aem:21111142-1251-4369-86fb-57b82f5bb108/original/as/Cost%20of%20a%20Data%20Breach%20Report%202026.pdf
4. TechTarget, IBM 2025 healthcare: https://www.techtarget.com/healthtechsecurity/news/366628031/Healthcare-remains-costliest-industry-for-breaches-at-742M
5. Verizon 2025 DBIR Healthcare Snapshot: https://www.verizon.com/business/resources/infographics/2025-dbir-healthcare-snapshot.pdf
6. Verizon 2026 DBIR Healthcare Snapshot: https://www.verizon.com/business/resources/reports/2026-dbir-healthcare-snapshot.pdf
7. HIPAA Journal, Verizon 2026: https://www.hipaajournal.com/verizon-dbir-2026-healthcare/
8. Mandiant M-Trends 2026 blog: https://cloud.google.com/blog/topics/threat-intelligence/m-trends-2026
9. M-Trends 2026 Executive Edition: https://cloud.google.com/security/resources/m-trends-executive-edition
10. Sophos State of Ransomware in Healthcare 2025: https://assets.sophos.com/X24WTUEQ/at/cq9bfnh5g9kpw874qqg5th/sophos-state-of-ransomware-in-healthcare-2025.pdf
11. Proofpoint/Ponemon 2025 release: https://www.proofpoint.com/us/newsroom/press-releases/nearly-three-four-us-healthcare-organizations-report-patient-care-disruption
12. Ponemon-Sullivan 2025 report: https://ponemonsullivanreport.com/2025/11/the-2025-study-on-cyber-insecurity-in-healthcare-the-cost-and-impact-on-patient-safety-and-care/
13. HIPAA Journal, FBI IC3 2025: https://www.hipaajournal.com/fbi-internet-crime-complaint-report-2025/
14. Joint Commission CRR, May 4, 2026: https://www.jointcommission.org/en-us/knowledge-library/news/2026-05-cyber-resilience-readiness
15. Joint Commission CRR Phase 2, Jun 29, 2026: https://www.jointcommission.org/en-us/knowledge-library/news/2026-06-crr-phase-2
16. AHA News CRR, May 4, 2026: https://www.aha.org/news/headline/2026-05-04-aha-joint-commission-announce-cybersecurity-readiness-effort
17. Joint Commission Sentinel Event Alert 67: https://digitalassets.jointcommission.org/api/public/content/8bd6addf4df943f383a074f2d9d4af64
18. Joint Commission HVA FAQ: https://www.jointcommission.org/en-us/knowledge-library/support-center/standards-interpretation/standards-faqs/000001112
19. Federal Register, HIPAA Security Rule NPRM: https://www.federalregister.gov/documents/2025/01/06/2024-30983/hipaa-security-rule-to-strengthen-the-cybersecurity-of-electronic-protected-health-information
20. Reginfo RIN 0945-AA22: https://www.reginfo.gov/public/do/eAgendaViewRule?RIN=0945-AA22&pubId=202510
21. Fierce Healthcare, delay to July 2027: https://www.fiercehealthcare.com/health-tech/feds-push-back-hipaa-security-rule-overhaul-july-2027
22. Bloomberg Law, Jul 17, 2025: https://news.bloomberglaw.com/privacy-and-data-security/insurers-hospitals-urge-hhs-to-cut-biden-era-cyber-rule-updates
23. HHS OCR four ransomware settlements, Apr 23, 2026: https://www.hhs.gov/press-room/ocr-settles-four-ransomware-investigations.html
24. HHS OCR Lehigh Valley Health Network, Oct 29, 2026: https://www.hhs.gov/press-room/hhs-ocr-settles-ransomware-investigation-lehigh-valley-health-network.html
25. HHS Healthcare CPGs: https://hhscyber.hhs.gov/Documents/cybersecurity-performance-goals.pdf
26. 405(d) CPG highlights: https://405d.hhs.gov/Documents/405d-cpg-highlights-2024.pdf
27. HICP Technical Volume 2: https://405d.hhs.gov/Documents/tech-vol2-508.pdf
28. 405(d) Identity and Access Management poster: https://405d.hhs.gov/Documents/Access-Management-Poster-R.pdf
29. FDA cybersecurity guidance page: https://www.fda.gov/medical-devices/medical-device-cybersecurity/cybersecurity-resources-medical-device-manufacturers-guidance-resources-and-faqs
30. Federal Register FDA notice, Jun 27, 2025: https://www.govinfo.gov/content/pkg/FR-2025-06-27/html/2025-11669.htm
31. FDA premarket cybersecurity guidance: https://www.fda.gov/media/119933/download
32. ANSI/NEMA HN 1-2019 (MDS2): https://webstore.ansi.org/standards/nema/ansinemahn2019
33. TechNation, MDS2: https://1technation.com/manufacturer-disclosure-statement-for-medical-device-security-and-you/
34. Claroty 2024 release (2023 data): https://www.claroty.com/press-releases/63-of-known-vulnerabilities-tracked-by-cisa-are-on-healthcare-organization-networks-clarotys-team82-finds
35. Claroty 2025 healthcare report: https://www.claroty.com/blog/clarotys-state-of-cps-security-report-healthcare-exposures-2025
36. ECRI 2026 Top 10 hazards: https://home.ecri.org/blogs/ecri-news/misuse-of-ai-chatbots-tops-annual-list-of-health-technology-hazards
37. ECRI, digital darkness: https://home.ecri.org/blogs/ecri-news/examining-the-greatest-health-technology-threats-of-2026
38. CMS emergency preparedness core elements: https://www.cms.gov/medicare/health-safety-standards/quality-safety-oversight-emergency-preparedness/core-ep-rule-elements
39. CMS Homeland Security Threats: https://www.cms.gov/medicare/health-safety-standards/quality-safety-oversight-emergency-preparedness/homeland-security-threats
40. Politico Pro, Jan 14, 2025: https://subscriber.politicopro.com/article/2025/01/biden-admin-to-issue-new-regulations-to-boost-hospital-cybersecurity-00198117
41. AHA News, Nov 5, 2026: https://www.aha.org/news/headline/2026-11-05-cms-proposes-rule-reduce-administrative-burden-hospitals-other-providers
42. ONC enforcement alert: https://healthit.gov/information-blocking/enforcement-alert/
43. HHS press, Sep 3, 2025: https://www.hhs.gov/press-room/hhs-crackdown-health-data-blocking.html
44. ONC disincentives fact sheet: https://healthit.gov/wp-content/uploads/2024/06/Disincentives-Final-Rule-Overview-Fact-Sheet.pdf
45. NY 10 NYCRR 405.46: https://regs.health.ny.gov/content/section-40546-hospital-cybersecurity-requirements
46. Nixon Peabody, NY rule: https://www.nixonpeabody.com/insights/alerts/2025/09/29/new-york-cybersecurity-regulations-for-general-hospitals-take-effect-october-2-2025
47. Congress.gov S.3315: https://www.congress.gov/bill/119th-congress/senate-bill/3315
48. Sen. Warner press release: https://www.warner.senate.gov/newsroom/press-releases/senate-passes-warner-legislation-to-strengthen-cybersecurity-in-health-care/
49. HHS Change Healthcare FAQ: https://www.hhs.gov/hipaa/for-professionals/special-topics/change-healthcare-cybersecurity-incident-frequently-asked-questions/index.html
50. Reuters, Aug 14, 2025: https://www.reuters.com/business/hack-unitedhealths-tech-unit-impacted-1927-million-people-us-health-dept-website-2025-08-14/
51. TechTarget, Change Healthcare portal without MFA: https://www.techtarget.com/news/Change-Healthcare-breached-via-Citrix-portal-with-no-MFA/837237/
52. CNBC, $22M ransom: https://www.cnbc.com/2024/05/01/unitedhealth-ceo-says-company-paid-hackers-22-million-ransom.html
53. Becker's, Change Healthcare financial toll: https://www.beckershospitalreview.com/healthcare-information-technology/cybersecurity/the-financial-toll-of-the-change-healthcare-hack-7-numbers/
54. The Stack, $799M: https://www.thestack.technology/unitedhealth-reports-another-800m-in-ransomware-losses-two-years-on/
55. AHA survey, March 2024: https://www.aha.org/system/files/media/file/2024/03/aha-survey-change-healthcare-cyberattack-significantly-disrupts-patient-care-hospitals-finances.pdf
56. UHG update, Apr 22, 2024: https://www.unitedhealthgroup.com/newsroom/2024/2024-04-22-uhg-updates-on-change-healthcare-cyberattack.html
57. Reuters, Mar 22, 2024: https://www.reuters.com/technology/cybersecurity/unitedhealth-says-several-services-handling-medical-claims-unit-change-will-go-2024-03-22/
58. Fortune (Yorkville clinic): https://fortune.com/2024/04/23/change-healthcare-cyberattack-unitedhealth-hack-ransomware/
59. Becker's, Ascension 5.6M: https://www.beckershospitalreview.com/healthcare-information-technology/cybersecurity/ascension-ransomware-attack-affects-5-million/
60. Becker's, Ascension at the UN: https://www.beckershospitalreview.com/hospital-management-administration/ascension-president-addresses-un-on-cyberattacks/
61. Fierce Healthcare, Ascension FY24: https://www.fiercehealthcare.com/ai-and-machine-learning/ascensions-spring-ransomware-attack-sidelines-fy24s-financial-recovery
62. TechCrunch, Ascension: https://techcrunch.com/2024/12/20/ransomware-attack-on-health-giant-ascension-hits-5-6-million-patients/
63. BleepingComputer, Ascension root cause: https://www.bleepingcomputer.com/news/security/ascension-hacked-after-employee-downloaded-malicious-file/
64. Ars Technica, Ascension/Wyden: https://arstechnica.com/security/2025/09/how-weak-passwords-and-other-failings-led-to-catastrophic-breach-of-ascension/
65. TechTarget, CommonSpirit $150M: https://www.techtarget.com/healthtechsecurity/news/366594457/CommonSpirit-Health-Ransomware-Attack-Leads-to-150M-in-Losses-To-Date
66. TechTarget, CommonSpirit $160M: https://www.techtarget.com/healthtechsecurity/news/366594086/CommonSpirit-Raises-Estimated-Losses-From-Ransomware-Attack-to-160M
67. HealthcareInfoSecurity, CommonSpirit: https://www.healthcareinfosecurity.com/2022-cyberattack-has-cost-commonspirit-150-million-so-far-a-21223
68. Ardent press release: https://ardenthealth.com/our-stories/ardent-health-services-reports-information-technology-security-incident
69. Healthcare Dive, Ardent: https://www.healthcaredive.com/news/ardent-health-services-ransomware-attack/700775/
70. Ardent SEC 424B4: https://www.sec.gov/Archives/edgar/data/1756655/000119312524181092/d754933d424b4.htm
71. Ardent SEC filing (R16): https://www.sec.gov/Archives/edgar/data/1756655/000162828026031299/R16.htm
72. NHS England, Synnovis: https://www.england.nhs.uk/synnovis-cyber-incident/
73. Digital Health, Synnovis £32.7M: https://www.digitalhealth.net/2025/01/cyber-attack-cost-synnovis-estimated-32-7m-in-2024/
74. Reuters, Synnovis-linked death: https://www.reuters.com/business/healthcare-pharmaceuticals/uk-health-officials-say-patients-death-partially-down-cyberattack-2025-06-26/
75. BBC, Synnovis: https://www.bbc.co.uk/news/articles/cp3ly4v2kp2o
76. Synnovis forensic review: https://synlab.co.uk/synnovis-completes-forensic-review-following-2024-cyberattack-notifications-under-way/
77. The Register, Synnovis: https://www.theregister.com/security/2025/11/13/nhs-supplier-ends-18-month-probe-into-cyberattack/2475401
78. HIPAA Journal, Synnovis: https://www.hipaajournal.com/patient-death-linked-to-ransomware-attack/
79. Boston Globe, Mass General Brigham (Jul 19, 2024): https://www.bostonglobe.com/2024/07/19/metro/software-outage-massachusetts-new-england/
80. AP, outage and hospitals: https://apnews.com/article/outage-hospitals-medical-treatment-surgery-microsoft-af05486467f61d2e79558c1e16ed5d1e
81. JAMA Network Open, CrowdStrike study: https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2836824
82. WIRED, CrowdStrike study: https://www.wired.com/story/at-least-750-us-hospitals-faced-disruptions-during-last-years-crowdstrike-outage-study-finds/
83. Kettering outage page: https://ketteringhealth.org/system-wide-technology-outage/
84. HIPAA Journal, Kettering: https://www.hipaajournal.com/kettering-health-ransomware-attack/
85. Becker's, Kettering: https://www.beckershospitalreview.com/healthcare-information-technology/cybersecurity/kettering-health-resumes-ehr-use-warns-of-scams-after-outage/
86. The Record, Prospect: https://therecord.media/prospect-hospitals-still-recovering
87. HHS 405(d) Rhysida SBAR: https://405d.hhs.gov/Documents/405d-sbar-rhysida-ransomware-20230816_R.pdf
88. HIPAA Journal, Prospect: https://www.hipaajournal.com/healthcare-data-breach-round-up-november-16-2023/
89. Becker's, Prospect 40 days: https://www.beckershospitalreview.com/healthcare-information-technology/cybersecurity/prospect-medicals-16-hospitals-back-online-40-days-after-cyberattack/
90. Healthcare Dive, DaVita 2.7M: https://www.healthcaredive.com/news/davita-ransomware-attack-data-breach-2-7-million/758391/
91. Healthcare Dive, DaVita $15M: https://www.healthcaredive.com/news/davita-agrees-to-pay-15m-to-settle-claims-from-data-breach/829445/
92. BleepingComputer, DaVita: https://www.bleepingcomputer.com/news/security/davita-ransomware-attack-exposed-data-of-nearly-27-million-people/
93. CISA AA25-203A, Interlock: https://www.cisa.gov/news-events/cybersecurity-advisories/aa25-203a
94. Chicago Sun-Times, Lurie: https://chicago.suntimes.com/crime/2024/07/02/lurie-childrens-hospital-cybersecurity-breach-healthcare-tech-data-medical-records-files-fbi
95. Lurie notice to Maryland AG: https://oag.maryland.gov/resources-info/SBN%20Documents/2024/ITU-375092.pdf
96. TechTarget, 10 largest 2025 breaches: https://www.techtarget.com/healthtechsecurity/feature/10-largest-healthcare-data-breaches-reported-to-OCR-in-2025
97. HIPAA Journal, 2025 breach report: https://www.hipaajournal.com/2025-healthcare-data-breach-report/
98. HIPAA Journal, H1 2026 report: https://www.hipaajournal.com/h1-2026-healthcare-data-breach-report/
99. Healthcare IT News, Covenant: https://www.healthcareitnews.com/news/covenant-health-patient-data-breach-numbers-skyrocket
100. AP, UMMC: https://apnews.com/article/cyberattack-university-mississippi-clinics-hospital-4b27a578a5e095c5a7d25c90768a5312
101. Becker's, UMMC (Mar 2, 2026): https://www.beckershospitalreview.com/healthcare-information-technology/cybersecurity/u-of-mississippi-medical-center-restores-phone-lines-after-cyberattack/
102. HealthExec, UMMC: https://healthexec.com/topics/health-it/cybersecurity/ummc-reopens-clinics-shut-down-ransomware-attack-recovery-progresses
103. Signature Healthcare alerts: https://signature-healthcare.org/pages/alerts
104. Boston Globe, Brockton (Apr 6, 2026): https://www.bostonglobe.com/2026/04/06/metro/brockton-hospital-diverting-ambulances-amid-cybersecurity-incident/
105. University Hospitals incident page: https://www.uhhospitals.org/cybersecurity-incident
106. Becker's, University Hospitals: https://www.beckershospitalreview.com/healthcare-information-technology/cybersecurity/university-hospitals-reschedules-procedures-as-cyber-incident-disruptions-continue/
107. Ideastream, University Hospitals (Nov 9, 2026): https://www.ideastream.org/health/2026-11-09/university-hospitals-websites-mychart-restored-following-cybersecurity-incident
108. BleepingComputer, UNM: https://www.bleepingcomputer.com/news/security/unm-health-ransomware-attack-disrupts-patient-care-surgeries/
109. The Record, UNM: https://therecord.media/new-mexico-cyberattack-hospital
110. AP, UNM: https://apnews.com/article/new-mexico-health-cybersecurity-hack-7a3593f8a3cee4ca895774ab1574919f
111. JAMA Network Open, adjacent EDs study: https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2804585
112. DataBreachToday, HealthAlliance fine: https://ransomware.databreachtoday.com/ny-health-group-fined-550k-in-unpatched-vulnerability-hack-a-27043
113. Breached.Company, H1 2026 (secondary): https://breached.company/mid-year-review-healthcare-breaches-h1-2026/
114. Yale, break-glass procedure: https://hipaa.yale.edu/security/break-glass-procedure-granting-emergency-access-critical-ephi-systems
115. Health-ISAC, Interlock: https://health-isac.org/feds-warn-health-other-sectors-of-interlock-threats/
