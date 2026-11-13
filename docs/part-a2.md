# Healthcare Infrastructure Storyboard: Context Document (continued)

**Phase 1 (vendor-neutral today-state) plus three pillars. Prepared November 12, 2026.**

This is file 2 of 2 of Part A. File 1 (`part-a1.md`) contains How to use this document, Part 0 (Executive framing and glossary), and Part 1 (Ten use cases). This file contains the three full pillars. The same conventions apply: citations [C-n], [S-n], [F-n], [A-n] map to the four research briefs; ESTIMATE, VENDOR-REPORTED, Analysis, and Gap labels must be preserved; section-level citations such as [S-gaps 1] point to a brief's own section.

---

## Pillar: Healthcare security

### S.1 Threat landscape

**System intrusion leads healthcare breaches.** In Verizon's 2025 DBIR, system intrusion overtook miscellaneous errors as the top healthcare breach pattern [S-5]. In the 2026 DBIR it held the top spot for a second year, with 1,492 incidents and 1,438 confirmed disclosures [S-6].

**How attackers get in (2026 DBIR, healthcare).** Vulnerability exploitation 20%, phishing 14%, credential abuse 11% [S-6]. Patching is slow: only 26% of critical vulnerabilities were fully remediated in 2025, with a median of 43 days to fix [S-7].

**Healthcare is the top ransomware target in FBI data.** The FBI IC3 2025 report ranks healthcare and public health as the most targeted critical-infrastructure sector, with 460 ransomware complaints and 182 data-breach complaints [S-13]. One trade outlet reported 278 ransomware complaints instead; the primary IC3 PDF was not retrieved, so the conflict is unresolved [S-gaps 4].

**Encryption is giving way to pure data theft.** In Sophos's 2025 healthcare survey, only 34% of attacks encrypted data (down from 74% in 2024), and extortion without encryption tripled since 2023 (VENDOR-REPORTED) [S-10]. Interlock is a current double-extortion group: the July 22, 2025 joint advisory from CISA, the FBI, HHS, and MS-ISAC recommends segmentation to limit lateral movement, MFA, patching, and DNS filtering [S-93], and Health-ISAC describes Interlock's primary focus as health and other critical infrastructure [S-115]. Kettering (2025) and DaVita (2025) were Interlock victims [S-84][S-92].

**Business email compromise.** Ponemon's 2025 survey found BEC was the attack type most likely to delay procedures and tests that led to poor outcomes (65% of affected organizations) [S-11]. IC3 reported about $3.0 billion in BEC losses across all sectors in 2025 [S-13].

**Third-party and clearinghouse compromise.** Third parties were involved in 32% of healthcare breaches in the 2026 DBIR [S-6]. Ponemon 2025: 87% of organizations hit by a supply-chain attack reported disruption to patient care [S-11]. Change Healthcare is the defining case; after it, Ascension said it diversified its claims clearinghouses [S-61].

**Insider misuse and error.** Internal actors were behind 19% of healthcare breaches (2026 DBIR) [S-6]. The human element was involved in 54% of incidents, and misdelivery was about 40% of human-error incidents [S-7].

**Legacy medical-device exposure.** 14% of connected medical devices ran unsupported or end-of-life operating systems, and imaging made up 32% of those devices (2023 data; VENDOR-REPORTED) [S-34]. 22% of hospitals had devices bridging guest and internal networks [S-34]. Devices with known exploited vulnerabilities appeared in 99% of studied organizations (2025; VENDOR-REPORTED) [S-35]. ECRI ranks legacy-device cybersecurity #8 for 2026 [S-36].

**Clinic-to-hospital lateral movement (risk pattern).** At Change Healthcare, attackers entered through a legacy remote-access portal without MFA and moved laterally for nine days before deploying ransomware [S-51]. At Ascension, a senator's investigation found the attack began with one contractor laptop and escalated to the central identity directory [S-64]. The pattern: compromise of one less-protected entry point can reach enterprise-wide identity, which is why CISA and HHS stress segmentation and separating user from privileged accounts [S-25][S-93].

**Regional spillover.** Neighboring EDs during a 2021 San Diego attack saw a 35.2% rise in ambulance arrivals and a 113.6% rise in confirmed strokes [S-111].

**Patient-care consequences (survey).** Ponemon 2025: 72% of organizations reported patient-care disruption from cyberattacks, and 29% reported higher mortality [S-11][S-12].

### S.2 Network security architecture

**HICP zoning.** HHS 405(d) HICP practice 6.M.B describes splitting the network into zones [S-27]:

| Zone | HICP guidance | Typical occupants (Analysis) |
|---|---|---|
| Clinical workstations | Separate from general access; restrict east-west traffic | Workstations on wheels, nurse station PCs, physician workstations, BCA downtime PCs |
| General access | Assets in one general-access network should not talk to assets in another; HICP calls this a critical control against ransomware spread | Business PCs, printers, back office |
| Guest | Explicitly barred from reaching the internal network | Patient and visitor Wi-Fi |
| Medical device networks | Dedicated, highly restricted; traffic limited to what operation requires; scanners kept away from devices; monitor with firewalls, flow data, IPS, and deception logs; count unsegmented devices monthly | Infusion pumps, monitors, modalities, lab analyzers |
| Building management systems | Separate zone; NIST treats BMS as OT | HVAC, BMS controllers, medical gas alarm interfaces, elevators |
| IoT | Separate zone | Cameras, badge readers, RTLS gateways, smart TVs |
| Perimeter, data center, vendor | Vendor access need-based, temporary, segmented; inventory vendor-managed remote-access systems; beware unattended sessions | Internet edge, DMZ, EHR and PACS servers, vendor jump hosts |

Sources for the zone guidance: [S-27][F-12][F-16]. The occupant column is Analysis.

**Macro- versus microsegmentation.** Macrosegmentation zones by function (clinical, device, guest, building, research). Microsegmentation restricts traffic between individual assets inside a zone; HICP's 2023 edition added a micro-segmentation section and zero-trust discussion [F-13]. Network segmentation is an Enhanced goal in the HHS CPGs [S-25], and the 2025 HIPAA proposal would require it outright [S-19]. NIST reference designs show what "good" looks like: SP 1800-8 uses a nine-zone architecture for wireless infusion pumps [F-14], and SP 1800-24 limits PACS communications to the minimum necessary [F-15].

**How flat networks still are.** 72% of healthcare VLANs mixed IT and IoT assets (2020, older; VENDOR-REPORTED) [F-24]; 49% of sampled deployments had medical devices spread across 10 or fewer segments (about 2020; VENDOR-REPORTED) [F-26].

**Uncited practitioner framing.** 802.1X and NAC for device onboarding, east-west inspection between zones, EVPN-VXLAN fabrics carrying segmentation tags, and firewall versus SASE/SSE design patterns are common practice, but no primary healthcare source was found for them [S-gaps 5]. Storyboards may show them as design patterns, not as cited requirements.

**Remote vendor access for biomed and modality service.** HICP lists vendor-managed remote-access systems as assets to inventory and warns about unattended sessions [S-27]. Change Healthcare's entry point was a remote-access portal without MFA [S-51][S-52]. New York's hospital rule (10 NYCRR 405.46) requires third-party service-provider policies and MFA or risk-based authentication [S-45][S-46].

### S.3 Identity

- **Tap-and-go SSO.** HICP advises tying the badge to an individual identity, requiring a full login at shift start, then allowing badge taps, with a session-lock timeout under 15 to 30 minutes [S-27]. Measured benefit: reconnect login 29.3 s to 8.9 s across 19 hospitals [C-77].
- **One identity per person.** "One-person, one-identity, multiple contexts," with automated provisioning and deprovisioning [S-28].
- **Privileged access.** CPG Essential goals include separating user and privileged accounts, unique credentials, and revoking credentials when staff leave [S-25].
- **Break-glass.** Pre-staged emergency accounts with minimum necessary privileges; extra auditing by reviewers who did not create them; a documented, tested procedure that is not a helpdesk substitute; an alternate login path if the central identity system fails [S-114].
- **Third-party vendor accounts.** CPGs cover vendor/supplier cybersecurity requirements (Essential) and third-party incident reporting (Enhanced) [S-25]. The HIPAA proposal would require business associates to verify safeguards and report contingency plan activation within 24 hours [S-19].
- **Identity as the crown jewel.** Ascension's escalation to the central directory [S-64], Lurie's credential compromise [S-95], and UNM's unverified attacker claim of directory and cloud tenant compromise [C-73] all point to the identity tier as the place where a local incident becomes an enterprise outage.

### S.4 Detection and response: MTTx

| Metric | Figure | Year / organization | Source |
|---|---|---|---|
| MTTI (IBM: mean time to identify; not mean time to innocence) | 183 days global | 2026 / IBM | [S-3] |
| MTTC (mean time to contain) | 64 days global | 2026 / IBM | [S-3] |
| Breach lifecycle, healthcare | 279 days | 2025 / IBM | [S-1][S-2] |
| Breach lifecycle, global | 247 days (2026); 241 days (2025) | IBM | [S-3][S-1] |
| Lifecycle when found internally | 209 days | 2026 / IBM | [S-3] |
| MTTD proxy: median dwell time | 14 days global (up from 11) | 2026 / Mandiant | [S-8][S-9] |
| Detected internally | 52% of all cases; 41% of ransomware | 2026 / Mandiant | [S-9] |
| MTTR: ransomware recovery | 58% within a week; 97% within 3 months | 2025 / Sophos (VENDOR-REPORTED) | [S-10] |
| MTTR: breach recovery | 42% fully recovered; 19% needed over 150 days | 2026 / IBM | [S-3] |
| MTTA (acknowledge) | **No published benchmark** | none | [S-gaps 1] |
| MTTK (know root cause) | **No published benchmark** | none | [S-gaps 1] |
| Mean time to innocence (EHR vs PACS vs pump VLAN vs Wi-Fi vs WAN) | **No published benchmark.** Proposed KPI. | none | [S-gaps 1] |
| Healthcare breach cost | $6.64M (2026); $7.42M (2025); $9.77M (2024) | IBM | [S-3][S-1] |
| Global / U.S. breach cost | $4.99M global (2026); $10.22M U.S. (2025); $11.5M U.S. (2026) | IBM | [S-3][S-2][C-3] |
| Ransomware recovery cost, healthcare | $1.02M (down from $2.57M) | 2025 / Sophos (VENDOR-REPORTED) | [S-10] |
| Ransom paid, healthcare | 36% paid | 2025 / Sophos (VENDOR-REPORTED) | [S-10] |
| Cost of most significant attack | $3.9M | 2025 / Ponemon | [S-11] |

**Caveats on IBM figures.** IBM's own documents describe healthcare as the costliest industry for the 12th year (2025) and 13th year (2026); IBM web pages and press say 14th or 15th. Healthcare was about 2% of IBM's 2025 sample [S-gaps 3][S-4].

**Proposed KPIs where no benchmark exists.** HICP's monthly count of unsegmented medical devices is a sourced building block [S-27]. This document proposes, without benchmarks: MTTA (alert to human acknowledgment), MTTK (acknowledgment to root cause known), and mean time to innocence (symptom to every candidate domain cleared or implicated). These should be shown in storyboards as "measured locally; no industry benchmark."

### S.5 Medical device security

- **FDA section 524B** (added by FDORA, December 2022; effective March 29, 2023) requires cyber-device makers to submit cybersecurity information in premarket filings, including an SBOM, a postmarket vulnerability monitoring plan, and update/patch processes [S-30][S-31][C-21][C-23].
- **FDA guidance updates.** A final premarket cybersecurity guidance was issued June 27, 2025 [S-30], superseded by a newer version on February 3, 2026 [S-29].
- **SBOM content.** Machine-readable, using NTIA baseline attributes, with each component's support level and end-of-support date [S-31].
- **MDS2.** ANSI/NEMA HN 1-2019, voluntary, about 240 questions across 23 security capabilities, including SBOM availability; typically requested during procurement [S-32][S-33].
- **The installed base predates 524B.** Device hardware stays in service 10 to 30 years while software support can end within months; in January 2022, 53% of connected medical and IoT devices in hospitals had known critical vulnerabilities (FBI) [F-22]. Devices remain vulnerable an average of 3.2 years even when patches exist (VENDOR-REPORTED) [C-24].
- **The HTM and security handoff.** HICP calls for visibility into each device type per segment and inventories broken down by device type and vendor [S-27]; ECRI's 2026 legacy-device hazard points to joint ownership [S-36]. No authoritative workflow standard for the handoff between clinical engineering and security was found (Gap) [S-A4]. IEC 80001-1:2021 sets organizational risk-management requirements for connecting devices to shared networks [F-28].
- **Scanning can hurt.** HICP says vulnerability scanners should be kept away from clinical devices because a rogue scan could disrupt them [F-12].

### S.6 Resilience

- **Planning horizon.** Joint Commission Sentinel Event Alert 67: plan for life- and safety-critical technology offline for four weeks or longer; keep pharmacy, medical records, lab, radiology, blood bank, and ICU running [S-17].
- **Paper downtime is the norm.** Kettering [S-84], Ascension [S-60], UMMC [S-102], and Signature [S-103] all ran on paper.
- **Ambulance diversion** occurred at Ardent [S-68], Prospect [S-86], Kettering [S-85], Signature [S-103], and UNM [S-110].
- **Backups.** The CISA Interlock advisory calls for tested backups [S-93]; healthcare's use of backups to restore fell to 51% in 2025 (VENDOR-REPORTED) [S-10].
- **Restore targets.** The HIPAA proposal would require written procedures to restore critical systems and data within 72 hours [S-19]. Every multi-week incident in the file below exceeded that.
- **Communications first.** UMMC's phones and email failed alongside the EHR [S-102]; Lurie's lesson was to restore communications systems first [S-C].
- **ECRI 2026** hazard #2: "Unpreparedness for a Digital Darkness Event" [S-36][S-37].
- **CRR program.** In 2026 the Joint Commission and AHA launched Cyber Resilience Readiness (launched May 2026; certification June 2026) aimed at outages of 30 days or more [S-14][S-15][S-16].
- **OT continuity.** AHA (January 2026) recommends manual overrides and off-network operation for life-critical and mission-critical OT [F-17].

### S.7 Compliance matrix (status as of November 12, 2026)

| Framework | Status | What it requires (brief) | Source |
|---|---|---|---|
| HIPAA Security Rule (current) | In force | Risk-based safeguards; OCR enforcement focuses on risk analysis | [S-23][S-24] |
| HIPAA Security Rule proposed update (published January 6, 2025) | Proposed, not final | MFA, encryption, segmentation, asset inventory and network map, 72-hour restore, annual testing, business associate verification | [S-19][S-21] |
| HIPAA update timeline | Final action projected July 2027 (moved from May 2026); "Long-Term Actions"; no legal deadline | Planning estimate only | [S-20][S-21] |
| HITECH | In force | Breach portal for 500+ breaches; mitigation credit for "recognized security practices" | [S-49][S-97] |
| OCR enforcement 2025 to 2026 | Active | 19 ransomware settlements by April 2026; Lehigh Valley Health Network $800,000 (October 29, 2026) | [S-23][S-24] |
| HHS 405(d) HICP (2023 edition) | Voluntary | Practices mapped to the CPGs | [S-26][S-27] |
| HHS Healthcare CPGs (January 2024) | Voluntary | 10 Essential and 10 Enhanced goals | [S-25] |
| FDA section 524B | In force | Cyber-device premarket content, SBOM | [S-29][S-30][S-31] |
| Joint Commission | Accreditation standard | Cyberattacks in HVA (EM.11.01.01), continuity (EM.13), recovery (EM.14); HVA reviewed every 2 years | [S-17][S-18] |
| Joint Commission/AHA CRR | Voluntary (launched May 2026; certification June 2026) | Clinical continuity during 30+ day outages | [S-14][S-15][S-16] |
| CMS CoP emergency preparedness | In force | All-hazards plan including cyberattacks; reviewed yearly | [S-38][S-39] |
| CMS cybersecurity CoP | Reported in draft (January 2025); no published proposed rule found | Basic cyber defenses for hospitals | [S-40][S-22] |
| CMS proposed rule, November 5, 2026 | Proposed; comments due January 11, 2027 | Regulatory relief and power-system codes; not a cyber rule | [S-41] |
| ONC/ASTP information blocking | Enforcement stepped up September 2025 | Disincentives through CMS programs; up to $1M per violation for IT developers and HIEs | [S-42][S-43][S-44] |
| NY 10 NYCRR 405.46 | In force; full compliance October 2, 2025 | CISO, MFA, incident response, report within 72 hours | [S-45][S-46] |
| S.3315 Health Care Cybersecurity and Resiliency Act | Passed Senate September 30, 2026; held at the House desk | Minimum cyber practices; HHS and CISA coordination | [S-47][S-48] |
| State privacy laws beyond NY | **Gap.** Not researched (for example, Washington's My Health My Data Act). | n/a | [S-gaps 10] |

### S.8 Incident file (condensed)

**Change Healthcare (UnitedHealth/Optum), February 2024.** Attackers entered on February 12 through a legacy remote-access portal that had no MFA, moved laterally, and deployed ransomware nine days later [S-51]. Pharmacy claims were near normal by March 13, processing of a $14 billion claims backlog began March 22, and payments were still at about 86% of pre-incident levels on April 22 [S-56][S-57]. In an AHA survey, 74% of hospitals reported a direct impact on patient care and 94% a financial impact [S-55]; about 60% of affected hospitals reported revenue impact of $1 million per day or more [F-70]. UnitedHealth paid a $22 million ransom, reported $3.09 billion in 2024 costs, and reported $799 million more in Q4 2025 [S-52][S-53][S-54]. About 192.7 million people were affected [S-49][S-50]. Lesson: require MFA on every external access path; clearinghouse concentration is a single point of failure for the whole sector.

**Note on Yorkville.** "Yorkville" is not a separate incident. It refers to a small physical therapy clinic in Yorkville, New York that lost about $25,000 per week in cash flow because of the Change Healthcare outage; it was a Change Healthcare victim clinic, and no standalone Yorkville incident exists [S-58][S-gaps 8].

**Ascension, May 8, 2024.** Malware on a contractor or employee device escalated to the central identity directory [S-63][S-64]. The EHR, imaging, and ordering systems went down; runners carried printed scans to surgeons; staff reported delayed lab results and medication errors; some hospitals diverted ambulances; and pharmacies in multiple states fell back to phone, fax, or cash [S-60][S-62][F-69][C-92]. Restoration dates conflict across sources: EHR access restored across the system by June 30 (about 7 weeks; HIPAA Journal says "around 6 weeks") [C-11][C-98]; 37 days to full restore [S-60]; full restoration reported June 20 [F-69]. Volumes were 8% to 12% lower in May and June; response costs were about $130 million; and the incident contributed to a $1.8 billion FY24 operating loss [S-60][S-61][C-10]. 5,599,699 records [S-59]. Lesson: harden service accounts and the identity tier, and isolate contractor endpoints.

**CommonSpirit Health, October 2, 2022 (outside the 2023 to 2026 window; included for pattern).** Ransomware caused EHR and patient-portal outages lasting more than a month at some facilities, and the disruption reached former hospitals that still relied on CommonSpirit IT [S-67]. Losses were estimated at $150 million, later raised to $160 million; 623,774 records [S-65][S-66]. Lesson: shared IT services spread impact to affiliates and divested entities.

**Ardent Health, November 23, 2023.** Ardent took its network offline proactively after a ransomware attack, causing ambulance diversion across six states [S-68][S-69]. Epic was restored December 6 to 7, and the patient portal was fully restored by January 2024 [S-69]. Pre-tax impact was about $74 million in 2023 [S-70]. A class action covers about 38,000 people; the full record count was not confirmed [S-71][S-gaps 6]. Lesson: shutting everything down to contain an attack also shuts down care, so segmentation decides how much has to go dark.

**Synnovis / NHS, June 3, 2024.** Ransomware hit a third-party pathology provider serving London hospitals [S-72]. Counts differ by source and reporting date: 10,152 acute outpatient appointments and 1,710 elective procedures postponed [C-66], or more than 11,000 appointments delayed [S-72]; 170 patient-care incidents including 1 severe-harm case [C-66][C-97], or nearly 600 incidents including 1 involving severe harm [S-75], with one report headlined "at least two cases of severe patient harm" [C-66]. The attack was a contributing factor in one patient death and strained O-negative blood supplies [S-74][S-78]. Services were fully restored by December 2024 (about 6 months); direct losses were GBP 32.7 million [S-72][S-73]. Synnovis published no record total; outside estimates exceed 900,000 [S-76][S-77]. Lesson: diagnostic suppliers are clinical-critical dependencies.

**CrowdStrike faulty update, July 19, 2024 (not an attack).** A defective security content update crashed Windows hosts [S-79]. Disruptions were detected at 759 of 2,232 U.S. hospitals scanned, with 239 patient-facing services affected; median hospital downtime was about 5 hours; 58.1% of services were back within 6 hours and 7.8% took more than 48 hours [S-81][C-64]. Mass General Brigham cancelled non-urgent visits and procedures, and other hospitals postponed elective surgeries and ran clinics on paper [S-79][S-80]. CrowdStrike disputes the study methodology [C-65]. No healthcare cost total was found. Lesson: plan for mass failure of security tooling itself, and rehearse fixing endpoints at scale.

**Kettering Health, May 20, 2025.** Interlock ransomware; the attackers had been inside since April 9 [S-84]. Elective procedures were cancelled and the ED diverted; call centers and phones were down [S-83][S-85][C-62]. Core Epic was restored June 2 (13 days) and normal operations including MyChart and phones resumed June 10 to 11 (about 3 weeks) [C-62][S-83]. 1,695,382 records; costs not disclosed [S-84]. Lesson: a six-week dwell time means detection gaps; Kettering added segmentation, enhanced monitoring, and updated access controls afterward [S-83][C-63].

**Prospect Medical Holdings, August 3, 2023.** Rhysida ransomware caused ED closures, ambulance diversion, and paper records across a multi-state system [S-86][S-87]. Recovery took about 40 days [S-89]. 342,376 records; costs not found [S-88]. Lesson: multi-state systems need regional isolation so one region can be cut off without darkening all of them.

**DaVita, April 12, 2025.** Interlock ransomware; attackers had been inside since March 24, centered on a lab database, and were evicted the day the intrusion was detected [S-92]. Dialysis care continued [S-90]. Costs were $13.5 million in Q2 2025 and $25 million for 2025, plus a $15 million class-action settlement [S-90][S-91]. 2,689,826 records [S-90]. Lesson: protect lab data stores; fast eviction limited clinical impact.

**Lurie Children's Hospital, January 31, 2024.** Attackers accessed systems January 26 to 31 "through credential compromise and ransomware" [C-103][S-95]. Epic and MyChart were taken offline; Epic returned March 4 (about 33 days), and the threat was declared cleared May 20 [C-69][S-94]. 791,784 records [S-94]. Lesson: defend identity, and restore communications systems first.

**University of Mississippi Medical Center (UMMC), February 19, 2026.** Ransomware closed all of UMMC's roughly 35 clinics and cancelled elective procedures while hospitals stayed on downtime procedures [S-100][S-102]. Phones and email failed alongside the EHR [S-102]. Clinics reopened March 2, 2026, with full Epic access and reconciliation still in progress [S-101][S-102]. Costs not disclosed [S-gaps 6]. Lesson: out-of-band communications are needed when phones, email, and the EHR fail together.

**Signature Healthcare, Brockton, Massachusetts, April 6, 2026.** An undisclosed cyber incident put the hospital on ambulance diversion until April 15 (9 days) [S-103][C-71]. Chemotherapy was cancelled April 7, and retail pharmacies could not fill prescriptions [S-103][S-104]. Paper downtime was expected for about two more weeks after diversion lifted [C-72]. Attribution to the Anubis group is a trade-press claim not confirmed by the hospital [C-gaps 17]. Costs not disclosed [S-gaps 6].

**University Hospitals Cleveland, October 22, 2026.** After unusual server activity, UH disconnected systems from the internet [S-105]. Some procedures were rescheduled and prior-authorization processes were disrupted [S-106]. The patient portal and websites were restored November 7 [S-107]. The incident is ongoing as of this document, with the cause undisclosed and no cost figure [S-gaps 6].

**UNM Health, October 26, 2026.** Ransomware disrupted patient care and surgeries [S-108][C-73]. Systems came back after about two days [S-109][C-74], but the state temporarily lost its only Level 1 trauma capability [S-110]. UNM reported that only end-user devices were affected, not core servers [S-108]. A threat actor claimed compromise of directory forests, Group Policy, and the cloud identity tenant across 36,000 systems; that claim and the "Byod" attribution are unverified attacker claims [C-73][C-gaps 17]. Costs not disclosed. Lesson: a short outage at a sole regional trauma center has statewide consequences.

**Other incidents worth knowing.**
- **HealthAlliance (New York), October 2023:** unpatched remote-access appliance; ambulance diversion; about 242,000 records; $550,000 state fine (about $1.4 million with $850,000 suspended) [S-112].
- **Yale New Haven Health (2025):** 5,556,702 records; care not affected [S-96].
- **Episource (business associate, 2025):** 5,418,866 records [S-96].
- **Frederick Health (January 27, 2025):** 934,326 records; nearby hospitals saw more patients [S-96].
- **Covenant Health (May 18, 2025):** Qilin ransomware; count revised from 7,864 to 478,188 [S-99].
- **Conduent:** 62.2 million count from a secondary source only [S-113][S-gaps 9].

### S.9 Security pillar gaps
- No published MTTA, MTTK, or mean time to innocence benchmarks [S-gaps 1].
- No healthcare-specific IBM 2026 lifecycle [S-gaps 2].
- FBI IC3 healthcare ransomware count conflict (460 vs 278) [S-gaps 4].
- No primary source for 802.1X/NAC, SASE/SSE, or east-west inspection design patterns [S-gaps 5].
- Undisclosed records or costs for Ardent, Synnovis, Kettering, Prospect, UMMC, Signature, University Hospitals, and UNM [S-gaps 6].
- No published CMS cybersecurity CoP proposed rule [S-gaps 7].

---

## Pillar: Healthcare facilities

**Standards note.** On January 1, 2026, the Joint Commission replaced its hospital Environment of Care (EC) and Life Safety (LS) chapters with a single Physical Environment (PE) chapter that mirrors the CMS Conditions of Participation; Emergency Management remains its own chapter [F-58][F-59]. Older EC numbers (for example, EC.02.05.07) should be labeled "pre-2026" in any storyboard.

### F.1 National baseline

- **Hospitals:** 6,100 U.S. hospitals; 5,121 community hospitals; 907,216 staffed beds; 1,797 rural and 3,324 urban community hospitals (2024 AHA Annual Survey, published 2026) [F-1].
- **Systems:** 397 U.S. health systems; 68% of hospitals and 77% of beds are system-affiliated; systems range from 1 to 157 hospitals (FY2023) [F-2].
- **Device density:** about 10 to 15 medical devices per bed, so a 1,000-bed hospital could have about 15,000 devices [F-23]. A 2024 study of 45 organizations and over 2 million assets found about 50% were IoMT, IoT, OT, or unmanaged devices, averaging over 2,500 IoMT devices per organization (VENDOR-REPORTED) [F-25].

### F.2 Facility-type matrix

| Facility type | Scale and definition | Network demands | Uptime and failure stakes |
|---|---|---|---|
| Acute hospital | 5,121 community hospitals; 3,567 in systems [F-1] | Highest device density: monitors, pumps, nurse call, RTLS, imaging, BMS, clinical voice | 24/7. Ascension's 2024 attack on a 140-hospital system took the EHR, portal, some phones, and ordering offline and forced diversion at some hospitals [F-69] |
| Critical access hospital | 1,377 CAHs (October 2025); 25 beds or fewer; 24/7 ED; average stay 96 hours or less; generally over 35 miles from another hospital; median average daily census 2.9; median ED volume 5,467 (2024) [F-3][F-4][F-5] | Full hospital functions on a small footprint; thin WAN and thin IT staffing | 54% independent, 32% system-owned, 14% contract-managed [F-4]. Analysis: a single WAN link often carries transfers, teleconsults, and remote reads, so it is a single point of failure |
| Medical office building or clinic | **Gap:** no authoritative national count [F-gaps 4] | Voice, EHR, check-in, small imaging, printers, building systems | Analysis: business-hours uptime, but outages push patients to the ED; acquired clinics often arrive on flat networks |
| Ambulatory surgery center | 6,308 Medicare-certified ASCs in 2023 (+2.5%); 250 opened, 95 closed or merged [F-6] | OR video, anesthesia records, pumps, generator and transfer switch | ASCs often miss generator batteries and transfer switches in required weekly inspections [F-56] |
| Imaging center | **Gap:** no authoritative national count [F-gaps 4] | Large study transfer to PACS and remote readers; modality worklists | CT studies grew from 229 to 765 MB and MRI from 84.7 to 216 MB per study (2009 to 2022, one center) [F-71] |
| Lab | About 1 GB per whole-slide image at 40x; 300 slides a day needs about 50 TB for six months [F-75] | Analyzer middleware, LIS, sustained bulk transfers, freezer sensors | Analysis: result turnaround stalls; ED and ICU wait on results. DaVita's 2025 attack centered on a lab database [S-92] |
| Pharmacy | **Gap:** no national hospital pharmacy count [F-gaps 4] | Automated dispensing cabinets, pump drug libraries, cold-chain sensors | Ascension pharmacies in multiple states went offline; some fell back to phone, fax, or cash [F-69] |
| Data center or colocation | Power caused 54% (2024 survey) and 45% (2025 survey) of impactful data center outages [F-67] | Redundant power, cooling, carrier diversity | Top power causes: UPS failure 42%, transfer switch 36%, generator 28%; fiber and connectivity outages rising and more likely to be extended [F-67] |
| Hospital-at-home | 358 CCNs, 134 systems, 37 states (CMS, October 19, 2026) [F-79] | Cellular RPM kits, tablets, on-demand audio | On-demand remote audio required; emergency personnel at the home within 30 minutes [F-83] |

### F.3 Clinical-space matrix

**Published targets that exist.**

| Traffic | Target | Source |
|---|---|---|
| Interactive voice | 150 ms or less one-way delay | ITU-T G.114 [F-38] |
| Wi-Fi voice certification | Loss under 1%, no more than 3 consecutive lost packets, latency under 50 ms, jitter under 50 ms | Wi-Fi Alliance Voice-Enterprise [F-39] |
| Voice Wi-Fi design | Latency under 100 ms end to end, jitter under 30 ms, loss under 1%, -67 dBm cell edge, about 20% overlap (30% in critical areas), roaming under 150 ms, 5 GHz, 20 MHz channels | Networking vendor design guide, 2018 (VENDOR-REPORTED) [F-43] |
| Patient monitor to central station | Round-trip peak 800 ms or less; jitter 400 ms or less; 99.9% uptime over 24 hours; no gaps over 4 s; -65 dBm; SNR 15 dB | One manufacturer's requirement, not a standard [F-31] |
| Medical gas area alarms | Signal line-pressure change of plus or minus 20% from normal | NFPA 99 [F-61] |
| OR video over IP | Under 5 ms end-to-end delay for uncompressed video | Manufacturer claim, not a standard [F-77] |

**Published targets that do not exist.** IEC TR 80001-2-3 sets no universal Wi-Fi latency or loss threshold for medical devices; each organization defines a clinical service level from the device's intended use [F-29]. AAMI notes streaming ECG waveforms tolerate some lost packets, but lost telemetry alarms could injure patients [F-30]. No AAMI, IEC, TIA, ASHRAE, or Joint Commission numeric latency target exists for RTLS, DICOM, or OR video (Gap) [F-gaps 1].

| Space | Typical devices | Latency and loss sensitivity | Who suffers, and which workflow stops |
|---|---|---|---|
| ED | Monitors, telemetry, voice badges, CT, tracking boards, registration | Voice and alarms latency-critical; registration and EHR throughput-sensitive | Downtime triggers diversion. Adjacent San Diego EDs (2021): daily census +15.1%, ambulance arrivals +35.2%, median waiting-room time +47.6%, stroke codes 59 to 103 [F-68] |
| ICU | Bedside monitors, central station, ventilators, pumps | Alarm loss is a patient-safety event [F-30] | 98 alarm-related sentinel events (2009 to 2012), 80 deaths, believed under 10% of actual harm [F-63]. Analysis: remote surveillance stops, staff revert to bedside watch |
| OR and hybrid OR | 4K/8K cameras, video routing and recording, anesthesia records, intraoperative imaging | Uncompressed video needs very high, steady bandwidth | Analysis: video loss can halt minimally invasive cases. ORs must stay positively pressurized, at least +0.01 in. water column (2.5 Pa) [F-20] |
| Med-surg room | Nurse call, pumps, spot vitals, RTLS tags, voice badges | Nurse call faults reported within 15 s (UL 1069 via secondary summary) [F-51] | Call-light response averages about 3 to 4 minutes; one hospital averaged 17 min 27 s [F-47][F-48][F-49]. Analysis: unseen calls, delayed help, fall risk |
| Imaging suite | CT, MRI, X-ray, worklist, PACS, reading workstations | Throughput-heavy, delay-tolerant; no published latency target | Imaging devices were 51% of IoMT threats and 83% ran unsupported OS (2020; VENDOR-REPORTED) [F-24]. Analysis: studies cannot reach readers |
| Lab | Analyzers, LIS, middleware, slide scanners, freezer sensors | Bulk transfers; environmental monitoring is safety-relevant | Chilled-water or ventilation faults can force disposal of sterile products [F-21] |
| Pharmacy | Dispensing cabinets, pump drug libraries, cold-chain | Moderate latency sensitivity; integrity matters most | Analysis: medication pulls revert to manual override. Ascension pharmacies went offline [F-69] |
| Hospital command center | Dashboards fed by EHR, bed management, transport, other systems | Depends on many feeds; a gap in any feed blinds the room | Johns Hopkins monitors 14 IT systems; raised occupancy 85% to 92%, improved complex transfer acceptance 46%, assigned ED admits a bed 38% (3.5 hours) faster, cut OR transfer delays 83% [F-89] |

### F.4 Building and OT systems

**What is now on the network.** NIST SP 800-82r3 (September 2023) treats building automation as OT: HVAC, fire, electrical, lighting, physical access control, physical security, and utilities [F-16]. TIA-1179-B sizes cabling for RFID, building automation, nurse call, security, access control, and pharmaceutical inventory systems [F-64]. IP-connected building and life-safety systems in scope: nurse call, RTLS, patient monitoring, infusion pumps, BMS and HVAC, medical gas alarms, access control, cameras, and wayfinding.

**Why facilities gear cannot share a flat clinical network.**
1. **HHS says so.** HICP puts medical devices on "dedicated, highly-restricted networks," limits traffic to what operation requires, restricts management access, and keeps scanners away from clinical devices [F-12]. The 2023 edition added micro-segmentation and zero trust [F-13].
2. **NIST reference designs.** SP 1800-8 (infusion pumps) uses nine zones with firewalls enforcing limited trust [F-14]; SP 1800-24 (PACS) limits communications to the minimum necessary [F-15].
3. **Measured exposure.** 63% of CISA KEVs appear on healthcare networks; 23% of devices have a KEV; 14% run unsupported OS; 22% of hospitals have devices bridging guest and internal networks; 4% of surgical devices were reachable from guest networks (2023 data; VENDOR-REPORTED) [F-23].
4. **Physical consequences.** AHA recommends assessing how losing BMS and HVAC affects clinical continuity, with manual overrides and off-network operation for life-critical OT (January 2026) [F-17]. ASHE lists disabling a life-safety system, equipment damage, disrupted operations, and a cyber entry point to the wider network as cyber threats to mechanical, electrical, and plumbing systems [F-18]. Chilled-water or ventilation faults can cancel surgeries, trigger an MRI quench, or force disposal of sterile stock [F-21].
5. **Ventilation management.** ASHRAE/ASHE Guideline 43 uses the BMS and CMMS to monitor temperature, humidity, and pressure relationships with excursion response plans [F-19]. Analysis: if the BMS shares a flat network with clinical endpoints, an attack on either side threatens both.

**Medical gas alarms.** NFPA 99 requires master alarm panels in at least two separate locations (one in the medical gas maintenance work space, one in a continuously staffed area such as the switchboard or security office); area alarms at a nurse station or similar supervised location; and local alarms at source equipment that also trigger the master alarm [F-61].

**Governance.** IEC 80001-1:2021 covers risk management for connecting health IT and medical devices to shared networks [F-28]. ISA/IEC 62443 text was not reviewed (Gap) [F-gaps 10].

### F.5 Plant: cabling, power, and wireless

**Cabling (ANSI/TIA-1179-B, published June 2023; supersedes TIA-1179-A of 2017).** Two Category 6A or higher runs per wireless access point, with more recommended; minimum telecom room size 16 m² (170 ft²); recommended outlets per work area from 2 to 6 in low-density areas to more than 14 in high-density areas; single-pair Ethernet recognized [F-64][F-65]. FGI 2022 errata: the telecom main grounding busbar bonds to the building main electrical service ground [F-52]. Full outlet-density tables are paywalled and unverified (Gap) [F-gaps 2].

**Power.**
- CMS enforces the 2012 editions of NFPA 101 and NFPA 99 (effective July 5, 2016), excluding NFPA 99 chapters 7, 8, 12, and 13; chapter 7 is the IT and communications chapter [F-60].
- The life safety and critical branches must be restored within **10 seconds** of losing normal power through automatic transfer switches; the equipment branch may transfer later [F-55].
- NEC 517.34(A) places nurse call, telephone and data rooms, clinical IT network equipment, and wireless phone and paging equipment for clinical staff on the critical branch (IT network and wireless items added in the 2020 NEC) [F-53][F-54].
- Generators: monthly cold-start load test of at least 30 continuous minutes at 30% or more of nameplate for diesel, plus a 4-hour test every 36 months [F-56][F-57].
- **What happens in the 10-second gap (Analysis).** Switches and APs without UPS reboot during the transfer, so wireless monitoring, voice badges, and IP nurse call drop until the network reconverges unless closets have UPS sized to cover the generator transfer [F-53][F-55]. The most direct evidence is old: in 1992, total power failure in a 45-bed cardiothoracic ICU stopped monitors and ventilators, and electronic phones, door openers, and security locks failed [F-66].

**Wireless medical telemetry: WMTS versus Wi-Fi.**
- WMTS bands: 608 to 614, 1395 to 1400, and 1427 to 1432 MHz; created by the FCC in 2002 with 14 MHz; licensed by rule; every deployment registered with ASHE/AHA as frequency coordinator [F-32][F-33].
- Origin: in 1998, digital TV test broadcasts by a Dallas station disrupted wireless heart monitors at Baylor University Medical Center; FDA reported DTV disrupted telemetry at two Texas hospitals and urged migration to WMTS; no patients were harmed [F-34][F-35][F-36].
- Moving telemetry to Wi-Fi or cellular shifts risk into network design: in a Mayo Clinic cellular cardiac monitor pilot (162 patients), 33.5% of alarms exceeding the 30-second threshold were attributed to damaged devices or inadequate cellular connections [F-37].
- No post-2002 counts of WMTS interference incidents were found (Gap) [F-gaps 3].

**Wi-Fi 6E and Wi-Fi 7.**
- 6 GHz more than doubles available channels [F-42]. It is not globally harmonized, so devices must support the full local channel set or may fail to connect [F-40].
- Wi-Fi 7 may require multi-gigabit switching and higher PoE budgets; Wi-Fi 6E can be a more cost-effective step to 6 GHz [F-42].
- Device mix in one hospital (2025 case study): about 7,148 staff devices, 6,306 guest, 1,327 medical, 3,086 IoT, and 1,100 voice badges [F-41].
- Voice handsets on 6 GHz roamed in about 83 ms in one interop test (VENDOR-REPORTED) [C-46].
- No authoritative data on Wi-Fi 7 adoption in hospitals (Gap) [F-gaps 6].

**RTLS.** Hospital trial (2016): Wi-Fi fingerprinting 1.21 m point accuracy, 96% room accuracy, 5.43 s latency; BLE 2.13 m, 79%, 3.06 s; ZigBee 1.99 m, 88% [F-45]. BLE is typically 1 to 3 m in published systems [F-46].

**OR video.** Uncompressed 4K60 over 12G-SDI is 11.88 Gb/s; over ST 2110, 4K60 10-bit 4:2:2 is about 10.4 Gbps on the wire, so plan 25GbE per path; uncompressed Full HD over IP is about 3.7 Gbps [F-77]. Uncompressed 8K60 is about 48 Gbps, and an 8K laparoscopic recording uses 8 TB per 50 minutes [F-78].

### F.6 Joint Commission 2026 structure
- Effective January 1, 2026, EC and LS were replaced by the PE chapter; Emergency Management remains separate [F-58].
- The PE chapter has 8 standards, including PE.04.01.01 (building safety and facility management) and PE.04.01.03 (utility systems); key concepts are unchanged [F-59].
- Clinical alarm safety moved from NPSG.06.01.01 to NPG.01.05.01 (secondary source; confirm with the Joint Commission) [F-62].
- Emergency Management standards still carry the cyber hooks: EM.11.01.01 HVA, EM.13 continuity, EM.14 recovery, EM.15 drills [S-17][C-19].

### F.7 Multi-site and M&A
- **Consolidation:** 46 announced transactions in 2025 (72 in 2024); $18.5 billion transacted revenue, the lowest on record; 17 in Q4 2025 including four mega mergers; 43.5% involved a distressed party; 45.6% involved a divestiture [F-7].
- **Outpatient shift:** outpatient services rose from 52% of hospital revenue (2020) to 57% (2024); outpatient visits up 9.8% and inpatient volumes up 5.3% in 2025; 2034 forecast: outpatient volume +17%, hospital outpatient and ASC +14%, home-based services +22% [F-8][F-9].
- **Acquired clinic on a flat network:** an acquired orthopedic practice left on its own IT vendor and network suffered three ransomware attacks in two months about 18 months after acquisition, compromising PHI of 85,000 patients; findings included shared generic admin credentials, open RDP, no DMZ, and unsupported OS; the acquirer was held responsible (law-firm summary; verify against the OCR notice) [F-10].
- **Integration risk:** breach likelihood doubles in the year before and after a merger closes; over 30% of acquirers had a breach during integration (consulting source citing studies) [F-11]. Analysis: distressed sellers are least likely to have invested in segmentation, so acquirers should expect flat networks.
- **Third-party connectivity is perimeter:** Change Healthcare financially affected 94% of hospitals and directly affected care at 74%; about 60% reported revenue impact of $1 million per day or more [F-70].
- **Imaging backhaul (Analysis from cited data):** remote reads move CT studies with a median of about 787 MB [F-72]; pathology about 1 GB per slide [F-75]; an 8K endoscope feed compressed from 48 Gbps to 300 Mbps over 68 km with about 0.15 s latency [F-78].
- **Not found:** counts of clinic SD-WAN adoption, campus fabric deployments, or typical buildings per health system (Gap) [F-gaps 6].

### F.8 Hospital-at-home (as of November 2026)
- **Status:** the AHCAH waiver runs through **September 30, 2030** under section 6210 of the Consolidated Appropriations Act, 2026 (P.L. 119-75) [F-80][F-79]. Inpatients must be discharged or returned to the hospital by that date absent Congressional action, and no new waiver requests are accepted after September 1, 2030 [C-29][C-30]. The QualityNet resources FAQ still carries older public-health-emergency text; the waiver page and CMS fact sheet carry the 2030 date [F-79][F-80].
- **Participation:** CMS lists **358 approved CCNs across 134 health systems in 37 states** (updated October 19, 2026) [F-79]. Becker's counts 365 campuses across 137 systems (cumulative, July 23, 2026) and AMA counts 366 programs across 139 systems; the difference likely reflects current versus ever-approved counts (inference) [F-84][F-85]. As of October 2024, 366 hospitals had participated, serving over 31,000 patients [F-81]. Each hospital requests the waiver under its own CCN [F-79].
- **Outcomes:** CMS's September 2024 study of 332 hospitals in 38 states (November 2020 to July 2024) found generally lower 30-day mortality than comparable inpatients, length of stay less than one day longer, and about 20% lower 30-day post-discharge Medicare spending for most top-25 diagnosis groups [F-81][F-82].
- **Requirements:** at least two in-person RN or paramedic visits daily; two sets of in-person vitals daily; one daily physician or APC visit (may be remote after the initial in-person exam); immediate on-demand remote audio; emergency personnel within 30 minutes; continuous or intermittent remote monitoring per hospital policy; a process for patients unreachable within 15 minutes of a scheduled visit [F-83][F-79].
- **Connectivity in practice:** programs favor provider-supplied cellular over patients' own internet [F-87]; a rural Michigan cellular RPM pilot saw failure under 10% [F-88]; more RPM could extend hospital-at-home to moderate-acuity and rural patients [F-86].
- **Data:** CMS released a second AHCAH data batch through ResDAC from March 17, 2026, covering April 1, 2023 through September 30, 2025 [F-80].
- **Telehealth context:** Medicare telehealth flexibilities run through December 31, 2027 [C-32].

### F.9 Facilities pillar gaps
- No standards-body latency, jitter, or loss targets for DICOM, RTLS, OR video, or wireless telemetry [F-gaps 1].
- Paywalled TIA-1179-B and NFPA 99 2024 text unverified [F-gaps 2].
- No national counts for clinics, MOBs, imaging centers, labs, or hospital pharmacies [F-gaps 4].
- No measured roaming data for voice badges or RTLS tags in hospitals; no healthcare-specific ASHRAE limits for telecom rooms [F-gaps 5].
- Older evidence used as best available: call-light studies (2009 to 2012), ICU power failure (1992), indoor positioning trial (2016), WMTS history (1998 to 2002) [F-gaps 8].

---

## Pillar: AI in healthcare (today state, vendor-neutral)

### A.1 Where AI shows up today

| Area | What it does | Adoption and evidence | Source |
|---|---|---|---|
| Overall physician use | Research summaries, notes, discharge instructions, coding, portal replies, translation, diagnosis support | 81% of physicians use AI professionally (38% in 2023; 66% in 2024); 2.3 use cases on average | [A-1][A-2][A-4] |
| Physician use cases (2026) | Research summaries 39%; discharge instructions, care plans, or progress notes 30%; billing codes, charts, or visit notes 28%; chart summaries 28%; portal replies 19%; translation 18%; assistive diagnosis 17% | AMA, n=1,692 | [A-3] |
| Ambient documentation | Streams exam-room audio to a model and drafts the note | Top clinical AI use case; 79% of organizations use it and report positive ROI (KLAS via TechTarget); early adopters ambulatory generalists; at least 75% of measuring organizations saw better EHR experience, efficiency, and lower burnout | [A-5][A-6][A-7] |
| Imaging and radiology AI | Flags urgent findings, reprioritizes worklists | About three in four FDA AI-enabled devices are radiology; list version of September 4, 2026 holds 1,614 devices; another count gives 1,357 as of December 2025 | [A-11][A-12][A-13] |
| Predictive AI in the EHR | Inpatient risk and trajectory prediction | 71% of non-federal acute hospitals in 2024 (66% in 2023); small, rural, independent, government, and CAH hospitals lag | [A-9] |
| Scheduling and capacity | Scheduling and staffing prediction | Among predictive-AI users, scheduling use rose from 51% to 67% (2023 to 2024) | [A-9] |
| Revenue cycle | Coding, documentation integrity, denials | Billing use rose from 36% to 61% among predictive-AI users; 80% of health systems exploring, piloting, or implementing generative AI for revenue cycle (vendor-commissioned survey) | [A-9][A-10] |
| Patient access and contact center | Chatbots for customer service | 10% of physicians used patient-facing chatbots in 2024 (8% in 2023) | [A-4] |
| Agentic AI | Autonomous multi-step task execution | Of more than 3,000 KLAS respondents, 17 mentioned agentic AI and one reported active use | [A-6] |

**Adoption conditions.** 86% of physicians say data privacy assurances and 88% say validation of safety and efficacy are important before adopting AI [A-2]. KLAS finds organizations favor lower-risk, well-defined workflows and are cautious about higher-stakes clinical applications [A-5].

**Measured benefit is real but modest.**
- Ambient scribes, time in notes per appointment: 10.3 to 8.2 minutes (-20.4%) with after-hours work down 30% (n=46) [A-14]; 6.2 to 5.3 minutes (n=100) [A-15]; adjusted -1.8 minutes (-15.9%) and EHR time -8.5% (125 users vs 478 controls) [A-16].
- Randomized trial (NEJM AI, November 2025): one scribe cut time-in-note 9.5% versus control; the other showed no significant change [A-17].
- At scale: 15,791 hours saved across 7,260 physicians and 2,576,627 encounters in one medical group (October 2023 to December 2024) [A-18][A-19].
- Multisite (JAMA 2026, 8,581 clinicians): 13.4 fewer EHR minutes and 16.0 fewer documentation minutes per 8 scheduled hours; after-hours EHR time unchanged [C-53].
- Stroke AI triage (cluster RCT): door-to-groin cut 11.2 minutes, CT-to-treatment cut 9.8 minutes, no significant difference in functional independence [A-23]. A vendor page claiming a 58% mortality reduction conflicts with the peer-reviewed trial; use the trial [A-24][A-gaps].
- PE AI triage: report TAT cut 12.3 minutes (59.9 to 47.6) in one study [A-25] and 22.2 minutes during work hours only in another [A-26].

**Documentation burden context.** Primary care EHR time rose 28.4 minutes per 8 scheduled hours from 2019 to 2023 [A-20]; older work found 5.9 hours of an 11.4-hour workday in the EHR [A-21].

### A.2 Failure modes

**Inaccurate scribe notes.**
- Two products, simulated encounters: 70% of notes (31 of 44) contained errors, 2.9 per note on average; omissions were 83% and 54% of errors by product [A-30].
- Five platforms: 26.3% of key clinical elements omitted or wrong; 3.0 errors per case with potential for moderate-to-severe harm; hallucinations included fabricated test results; medication errors most common [A-31].
- Seven primary-care products: omissions 83.8% of errors, hallucinations 7.8%, but hallucinations more often clinically serious; no product error-free (publication year not confirmed) [A-32].
- Physician comments: 85% of comments on accuracy (28 of 33) and 76% on completeness were negative [A-33].

**Model drift and dataset shift.** Across 24 hospitals, daily sepsis alerts rose 43% (953 to 1,363) in the three weeks after the first COVID-19 case while census fell 35%; the share of patients alerting went from 9% to 21% [A-35]. One academic system deactivated a widely used sepsis model in April 2020 after spurious alerting from dataset shift [A-36]. Across 9 hospitals, sepsis model performance correlated negatively with sepsis incidence (r = -0.80), comorbidity burden (r = -0.78), and cancer prevalence (r = -0.86) [A-37].

**Alert fatigue.** External validation of a widely deployed proprietary sepsis model (38,455 hospitalizations): AUC 0.63, alerts on 18% of hospitalizations, 67% of sepsis cases missed, sensitivity 33%, specificity 83%, PPV 12% (2021, older but canonical) [A-34].

**Bias.** A cost-proxy population health algorithm under-identified Black patients; fixing the label would raise the share automatically flagged for extra care from 17.7% to 46.5% (2019, older but canonical) [A-38].

**Third-party dependency outages (2026 vendor status pages).**
| Date | What happened | Duration | Source |
|---|---|---|---|
| April 27, 2026 | UK scribe unavailable after an upstream sub-processor database ran out of memory at Monday morning demand; vendor rated clinical risk moderate; April uptime 99.78% | 1 h 35 min | [A-42] |
| May 29, 2026 | Canadian scribe lost note generation during a cloud provider outage; recording continued, notes regenerated afterward | 8:50 to 11:00 a.m. MST | [A-41] |
| June 25, 2026 | U.S. ambient vendor third-party provider outage; audio rerouted to other models and backfilled | 11:55 a.m. to 1:38 p.m. | [A-39] |
| July 21, 2026 | Same U.S. vendor, cloud-hosted ambient scribe outage | 6:27 to 8:32 a.m. | [A-40] |

Common pattern: dependence on third-party model, speech, and cloud providers the health system does not contract with directly [A-B].

**Queueing and delayed reads.** In PE triage, a queueing model showed time savings depend on exam inter-arrival time, number of radiologists, read time, prevalence, and AI performance [A-26]. **Gap:** no peer-reviewed study ties GPU or network congestion to delayed reads; present it as a plausible risk, not a measured outcome [A-gaps].

### A.3 Infrastructure requirements

**Training versus inference fabrics.**
- Training is dominated by synchronous collective operations across GPUs; at 800 Gbps or more per GPU, tail latency and worst-case flow completion matter more than averages (VENDOR-REPORTED, GPU vendor paper) [A-43].
- RoCEv2 is the dominant transport in Ethernet AI clusters [A-43]. Known limits: head-of-line blocking and congestion spreading from PFC pause frames on lossless Ethernet; ECMP hash collisions that load links unevenly; DCQCN congestion control that is hard to tune for bursty collectives [A-43][A-44].
- In a GPU vendor simulation, noisy-neighbor traffic slowed standard Ethernet training steps 1.6x (735 ms to 1.18 s) (VENDOR-REPORTED) [A-44]. That vendor's reference design combines lossless PFC with sender-based congestion control and per-packet adaptive routing and reports 98% of theoretical line rate (VENDOR-REPORTED) [A-43][A-45].
- Multiplane designs split one 800 Gbps NIC into lower-speed interfaces (for example, 4 x 200 Gbps), each in an independent network plane [A-43].
- **Ultra Ethernet Consortium Specification 1.0** (June 11, 2025) defines Ultra Ethernet Transport with AI Base, AI Full, and HPC profiles; its congestion control "does not rely on a lossless network" and lets receivers limit sender transmissions [A-46][A-47][A-48].
- **Gap:** no neutral, current source on InfiniBand versus Ethernet market share; no neutral standards-body per-GPU bandwidth figure; IEEE DCB standards text not retrieved [A-gaps].

**Power and cooling: the facilities collision.**
| Measure | Figure | Source |
|---|---|---|
| One 72-GPU rack-scale system, cooling capacity | 120 kW, direct liquid cooling (VENDOR-REPORTED) | [A-49] |
| One OEM version of the same system | 132 kW (115 kW liquid, 17 kW air) (VENDOR-REPORTED) | [A-50] |
| Typical (modal) rack density across surveyed facilities | Almost 9 kW (7.5 kW excluding high-density sites); most growth in 10 to 30 kW; few above 30 kW | [A-51] |
| Vendor roadmaps | 200 kW per rack and above within a few years | [A-52] |
| Enterprise workloads still on premises | 45% | [A-51] |

Analysis: a single AI rack draws roughly 13 to 15 times the power of a typical rack (120 to 132 kW versus about 9 kW), which most hospital data centers, built around air cooling and the power causes listed in F.2, were not designed for [A-49][A-50][A-51][F-67].

**Edge inference (modality, OR, clinic).** Endoscopy pipeline benchmarks: 10 ms end-to-end at 4K 240 Hz versus 220 ms for a traditional 1080p 60 Hz pipeline; under 50 ms at 4K 60 Hz on an edge developer kit; multimodal surgical guidance fusing preoperative CT with live video under 75 ms (all VENDOR-REPORTED) [A-53][A-54].

**Data path from PACS and EHR into the model.** In one PE deployment, images went CT to PACS to an on-prem AI orchestrator that sent de-identified DICOM to a cloud AI tool, which moved positive studies to the top of the worklist [A-25]. In a stroke trial, all CT angiography went automatically to a cloud algorithm; transmission plus analysis averaged under 5 minutes, and alerts went to clinicians' phones with a mobile PACS viewer [A-23]. HTI-5 resets certification toward FHIR-based APIs, which ONC says will "support creative AI-enabled interoperability solutions" [A-68].

**Operators' trust boundary.** Most data center operators would allow AI for sensor-data analysis and predictive maintenance but not for configuration changes or equipment control [A-51].

### A.4 Data, PHI, and shadow AI

**PHI in prompts.** An AI or cloud vendor that creates, receives, maintains, or transmits PHI on behalf of a covered entity is a business associate and requires a BAA, even if it stores only encrypted ePHI without the key [A-57][A-58]. HHS's business associate FAQ, as retrieved November 12, 2026, lists a third-party "SI chatbot" on a patient portal as a business associate example (verify on the live page) [A-58]. Inference, not OCR guidance: PHI pasted into a consumer LLM account with no BAA is a disclosure outside HIPAA safeguards [A-D].

**Shadow AI (December 2025 survey, n=518).** 40% had encountered unauthorized AI tools at work; 17% admitted using one; 1 in 10 had used one for direct patient care. Of those using unapproved tools, 45% cited a faster workflow and 24% better functionality. Administrators were three times more likely than providers to be involved in AI policy development (30% vs 9%) [A-55][A-56].

**De-identification.** Safe Harbor (remove 18 identifier types, including names, dates, MRNs, device identifiers and serial numbers, URLs, and IP addresses, with no actual knowledge of re-identification) or Expert Determination (a qualified expert finds very small re-identification risk and documents the method) [A-59][A-60].

**Machine data versus the designated record set.** The designated record set is defined at 45 CFR 164.501 [A-61]. Telemetry, logs, and agent traces are operational data and not part of it by default, but they can become PHI if they carry Safe Harbor identifiers (MRNs, IP addresses tied to a patient, device serials) or capture prompt contents with patient details (inference from the regulation, not OCR guidance) [A-60][A-D].

**Governance practice today.** Among hospitals using predictive AI in 2024: 82% evaluated for accuracy, 74% for bias, 79% monitored after go-live; only 71% (accuracy) and 57% (bias) evaluated all or most models; 15% to 21% answered "don't know"; 74% to 75% name more than one accountable entity [A-9].

**No OCR guidance specific to HIPAA and generative AI** was found; the closest are the Security Rule NPRM's AI discussion, the January 10, 2025 Section 1557 Dear Colleague letter, and the business associate and cloud guidance [A-62][A-65][A-57][A-58].

### A.5 Agentic risk tiers (Analysis)

OWASP names the core risk "Excessive Agency": too much functionality, permission, or autonomy, triggered by hallucination, prompt injection, or a compromised tool. Mitigations include minimizing tools and permissions, executing in the user's security context, and requiring human approval for high-impact actions [A-79]. OWASP's agentic threat list adds untraceable agent actions (mitigation: signed, immutable logs) and attacks that overwhelm human reviewers (mitigation: risk-tiered review) [A-80]. HICP restricts high-impact assets such as medical devices into more restricted zones and limits third-party access [A-81][A-82]. Most operators would not trust AI with configuration changes [A-51].

The tiers below are this document's synthesis of those sources, not a cited standard.

| Tier | Example agent actions in hospital IT | Reversibility and blast radius | Minimum controls |
|---|---|---|---|
| 0: Observe | Read telemetry, summarize an incident, correlate alerts across EHR, PACS, Wi-Fi, and WAN | Read-only; no change | Least-privilege read access; logs that exclude or protect PHI |
| 1: Recommend and record | Open or enrich a ticket, draft a change request, propose a root cause | Easily reversed; no production change | Signed, immutable action logs; human review of recommendations |
| 2: Low-impact change | Adjust a non-clinical setting with automated rollback (for example, a guest SSID parameter) | Reversible; limited scope | Pre-approved change class; automatic rollback; post-change validation |
| 3: High-impact change | Change a firewall rule, a medical device (for example, infusion pump) VLAN, an identity or conditional access policy, or isolate a segment during an incident | Can affect patient safety or ePHI exposure | Pre-approval by a named human; change record (audit); tested rollback; pre-change validation in a test or twin environment |

### A.6 Regulatory landscape (status as of November 12, 2026)

| Instrument | Status | What it means for AI | Source |
|---|---|---|---|
| FDA Clinical Decision Support guidance | Revised January 6, 2026; reissued January 29, 2026, without public comment | Broader reading of the non-device CDS exemption; enforcement discretion for software giving a single clinically appropriate recommendation if other criteria are met; routine point-in-time vitals generally not a "pattern" | [A-70][A-74] |
| FDA PCCP guidance for AI-enabled device software | Final December 4, 2024; reissued August 18, 2025 | Planned model modifications can proceed without a new submission per change | [A-71][A-72] |
| FDA AI-Enabled Device Software Functions lifecycle guidance | Draft (January 7, 2025), still draft | Lifecycle and submission recommendations | [A-71][A-73] |
| HIPAA BAA rules | In force | AI vendors handling PHI are business associates | [A-57][A-58] |
| HIPAA Security Rule NPRM | Proposed; final action projected July 2027; 2013 rule text still governs | Technology asset inventory including AI software that touches ePHI or is trained on it; network map reviewed at least every 12 months; required segmentation | [A-62][A-63][A-64] |
| Section 1557 (45 CFR 92.210) | In force since May 1, 2025 | Identify decision support tools using race, color, national origin, sex, age, or disability as inputs and mitigate discrimination risk | [A-65][A-66] |
| ONC HTI-1 | Superseded in part | Required 31 source attributes for predictive and 13 for evidence-based decision support | [A-67] |
| ONC HTI-5 | Published October 28, 2026; effective **December 28, 2026** | Removes model-card source attributes and risk-management requirements for predictive decision support; keeps electronic feedback for evidence-based tools; ONC "identified no evidence" users relied on them | [A-68][A-69] |
| EU AI Act (Digital Omnibus, Regulation (EU) 2026/1744) | Published July 24, 2026; in force July 27, 2026 | High-risk rules for AI in medical devices and IVDs (Annex I) apply from **August 2, 2028** (was August 2, 2027); stand-alone high-risk (Annex III) from **December 2, 2027**; Article 50 transparency since **August 2, 2026**; notified bodies must apply for designation by **January 28, 2028**; devices face parallel AI Act and MDR/IVDR requirements | [A-75][A-76][A-77] |
| Executive Order 14434 | Signed September 29, 2026 | Federal agencies use "Super Intelligence (SI)" in new documents; statutory AI definition unchanged | [A-78] |

EU AI Act territorial reach to U.S. health systems (Article 2) was not verified (Gap) [A-gaps].

### A.7 How AI depends on, and stresses, the other two pillars
- **On facilities:** exam-room Wi-Fi uplink capacity for ambient audio; 120 to 132 kW racks versus a 9 kW norm; data center outages already driven mostly by power [C-10 jargon][A-49][A-50][A-51][F-67].
- **On security:** new BAAs and data flows; shadow AI in 40% of surveyed workplaces; agent permissions that could reach the pump VLAN or identity policy [A-57][A-55][A-79].
- **On visibility:** when a scribe stops, the network, the AI vendor, and the vendor's upstream model provider all look like suspects; no benchmark exists for the mean time to innocence of that chain (proposed KPI) [A-39][C-gaps 3].

### A.8 AI pillar gaps
- No peer-reviewed study of GPU or network congestion causing delayed reads [A-gaps].
- No HHS OCR guidance specific to generative AI [A-gaps].
- No MGMA AI adoption figures; no dedicated contact-center or staffing AI adoption statistic [A-gaps].
- No neutral per-GPU networking requirement or InfiniBand versus Ethernet share [A-gaps].
- Only non-U.S. stroke delay cost figures (309 euros per minute, Netherlands) [A-29].
- FDA AI device counts disagree by source and date (1,357 as of December 2025; 1,451 through 2025; 1,614 on the September 4, 2026 list; "over 1,600" per FDA) [A-11][A-13][C-56][C-58].
- Secondary sources to confirm: HFMA/AKASA (vendor-commissioned), KLAS 79% via TechTarget, HTI-5 details via law-firm summary, HIPAA timing via secondary site, EU dates partly via a regulatory brief [A-gaps].

---

*End of Part A. Phase 2 (vendor mapping) is in a separate file.*
