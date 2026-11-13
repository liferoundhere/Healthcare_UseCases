# Healthcare Facilities Pillar: Cited Research Brief

Compiled: Thursday, Nov 12, 2026. Vendor-neutral. Sources are mostly 2023 to 2026; older sources are flagged where they remain the best primary evidence. Statements marked "Analysis" are inferences, not cited facts. Where no published number exists, this brief says so rather than inventing one. Some sources are non-Cisco vendor or analyst documents; they are described generically in the text and flagged in the source list.

Key finding for standards citations: on January 1, 2026, the Joint Commission replaced its hospital "Environment of Care" (EC) and "Life Safety" (LS) chapters with a single "Physical Environment" (PE) chapter [58][59]. Older EC standard numbers (for example EC.02.05.07) should be labeled as pre-2026.

---

## A) Facility-type matrix

### National baseline

- **Hospitals:** 6,100 U.S. hospitals; 5,121 community hospitals; 907,216 staffed beds; 1,797 rural and 3,324 urban community hospitals (2024 AHA Annual Survey, published 2026) [1].
- **Systems:** 397 U.S. health systems; 68% of hospitals and 77% of beds are system-affiliated; systems range from 1 to 157 hospitals (FY2023 data) [2].
- **Device density:** a typical U.S. hospital has about 10 to 15 medical devices per bed, so a 1,000-bed hospital could have about 15,000 devices [23]. One security vendor's 2024 study of 45 organizations and over 2 million assets found about 50% of assets were IoMT, IoT, OT, or unmanaged devices, averaging over 2,500 IoMT devices per organization [25].

### Matrix

| Facility type | Scale and definition (cited) | Network demands | Uptime and failure stakes |
|---|---|---|---|
| Acute hospital | 5,121 community hospitals; 3,567 in systems [1] | Highest device density: monitors, pumps, nurse call, RTLS, imaging, BMS (building management system), clinical voice | 24/7. Ascension's May 2024 ransomware attack hit a 140-hospital system, took the EHR, patient portal, some phones, and ordering systems offline, forced ambulance diversion at some hospitals, and full restoration was reported June 20, 2024 [69] |
| Critical access hospital (CAH) | 1,377 CAHs (Oct 2025) [3]. No more than 25 inpatient beds, 24/7 ED, annual average length of stay of 96 hours or less, generally more than 35 miles from another hospital (15 miles in mountainous terrain or secondary roads) [5]. Median average daily census 2.9; median ED volume 5,467 (2024) [4] | Small footprint but full hospital functions; thin WAN (wide area network) and thin IT staffing | 54% independent, 32% system-owned, 14% contract-managed [4]. Analysis: a single WAN link often carries transfers, teleconsults, and remote imaging reads, so it is a single point of failure for the whole facility |
| Medical office building or clinic | No authoritative national count found (gap) | Voice, EHR, check-in, small imaging, printers, building systems | Analysis: usually business-hours uptime, but outages push patients toward the ED. Acquired clinics often arrive on flat networks (see M&A below) |
| Ambulatory surgery center (ASC) | 6,308 Medicare-certified ASCs in 2023, up 2.5% from 2022; 250 opened and 95 closed or merged in 2023 [6] | OR video, anesthesia records, infusion pumps, generator and transfer switch | Joint Commission reports that ASCs often miss generator batteries and transfer switches during required weekly inspections [56] |
| Imaging center | No authoritative national count found (gap) | Moving large studies to PACS (the image archive) and remote readers; modality worklists | CT studies grew from 229 to 765 MB and MRI from 84.7 to 216 MB per study (2009 to 2022, one Swedish tertiary center) [71] |
| Lab | Digital pathology: about 1 GB per whole-slide image at 40x; scanning 300 slides a day needs about 50 TB for a six-month archive [75] | Analyzer middleware, LIS (lab information system), sustained bulk transfers, freezer sensors | Analysis: result turnaround stalls, and the ED and ICU wait on results |
| Pharmacy | No national hospital-pharmacy count found (gap) | Automated dispensing cabinets, infusion pump drug libraries, cold-chain sensors | During the Ascension attack, pharmacies in multiple states went offline; some fell back to phone and fax or cash payment [69] |
| Data center or colocation | Power causes 54% (2024 survey) and 45% (2025 survey) of impactful data center outages; 57% of respondents said their most recent major outage cost more than $100,000 [67] | Redundant power, cooling, carrier diversity | Top power-related causes: UPS failure (42%), transfer switch failure (36%), generator failure (28%) [67]. Fiber and connectivity outages are rising and more likely to cause extended disruptions (Uptime 2026) [67] |
| Hospital-at-home | 358 approved hospital certification numbers (CCNs) across 134 health systems in 37 states (CMS, updated Oct 19, 2026) [79] | Cellular RPM (remote patient monitoring) kits, tablets, on-demand audio link | Required: immediate on-demand remote audio connection, and emergency personnel at the home within 30 minutes [83] |

### M&A pain: acquired clinic on a flat network

- In an HHS OCR enforcement case, an acquired orthopedic practice stayed on its own pre-acquisition IT vendor and network. About 18 months after acquisition it suffered three ransomware attacks in two months, compromising PHI of 85,000 patients. Findings included shared generic administrator credentials, open Remote Desktop Protocol access, a firewall not configured to monitor access, no DMZ separating the private network from the internet, and unsupported operating systems. The acquirer was held responsible even though the networks were never integrated [10]. This is a law-firm summary; verify against the OCR notice.
- One cited study found the likelihood of a breach doubles in the year before and the year after a hospital merger closes; an IBM survey cited in the same piece found more than 30% of acquirers had a breach during integration [11]. Consulting source citing studies.
- A record 43.5% of 2025 hospital transactions involved a financially distressed party [7]. Analysis: distressed sellers are the least likely to have invested in segmentation, so acquirers should expect flat networks.

---

## B) Clinical-space matrix

### Published targets that exist

| Traffic | Target | Source |
|---|---|---|
| Interactive voice | 150 ms or less one-way delay | ITU-T G.114 [38] |
| Wi-Fi voice certification | Packet loss under 1%, no more than 3 consecutive lost packets, latency under 50 ms, jitter under 50 ms | Wi-Fi Alliance Voice-Enterprise [39] |
| Voice Wi-Fi design | Latency under 100 ms end to end, jitter under 30 ms, loss under 1%, -67 dBm cell edge, about 20% cell overlap (30% in critical environments), roaming under 150 ms, 5 GHz, 20 MHz channels | Non-Cisco vendor design guide, 2018 [43] |
| Patient monitor to central station | Round-trip peak latency 800 ms or less, packet-to-packet jitter 400 ms or less, 99.9% network uptime over 24 hours, no gaps longer than 4 seconds, signal -65 dBm or better, SNR 15 dB | One patient-monitor manufacturer's published network requirement, not a standard [31] |
| Medical gas area alarms | Must signal a line-pressure change of plus or minus 20% from normal | NFPA 99 [61] |
| OR video over IP | Under 5 ms end-to-end delay for uncompressed video | Manufacturer claim, not a standard [77] |

### Published targets that do not exist

IEC TR 80001-2-3 does not set a universal Wi-Fi latency or packet-loss threshold for medical devices. Each organization defines a clinical service level from the device's intended use and verifies it [29]. AAMI notes that the streaming ECG waveform tolerates some lost packets, but lost telemetry alarms could injure patients [30]. No AAMI, IEC, TIA, ASHRAE, or Joint Commission numeric latency target was found for RTLS, DICOM, or OR video (see Gaps).

### Matrix

| Space | Typical devices | Latency and loss sensitivity | Who suffers, and which workflow stops |
|---|---|---|---|
| ED | Monitors, telemetry, voice badges, CT, tracking boards, registration | Voice and alarms are latency-critical; registration and EHR are throughput-sensitive | Downtime triggers ambulance diversion. When a neighboring system suffered a month-long ransomware attack in May 2021, two adjacent San Diego EDs saw daily census rise 15.1%, ambulance arrivals rise 35.2%, median waiting-room time rise 47.6%, and stroke code activations rise from 59 to 103 [68] |
| ICU | Networked bedside monitors, central station, ventilators, infusion pumps | Alarm loss is a patient-safety event [30] | Joint Commission reviewed 98 alarm-related sentinel events from January 2009 to June 2012, 80 of them deaths, and believes these are under 10% of actual alarm-related harm [63]. Analysis: remote surveillance stops and staff revert to bedside watch |
| OR and hybrid OR | 4K and 8K surgical cameras, video routing and recording, anesthesia records, intraoperative imaging | Uncompressed video needs very high, steady bandwidth (see section G) | Analysis: video loss can halt minimally invasive cases. Building systems also matter: ORs must stay positively pressurized relative to adjoining spaces at all times, at least +0.01 in. water column (2.5 Pa) [20] |
| Med-surg room | Nurse call, pumps, spot-check vitals, RTLS tags, voice badges | Nurse call must report faults within 15 seconds (secondary summary of UL 1069 by a nurse-call vendor) [51] | Measured call-light response times average about 3 to 4 minutes, with one hospital averaging 17 min 27 s [47][48][49]. Analysis: calls go unseen, assistance is delayed, and falls risk rises |
| Imaging suite | CT, MRI, X-ray, modality worklist, PACS, reading workstations | Throughput-heavy and delay-tolerant; no published latency target | Imaging devices were involved in 51% of IoMT threats, and 83% of medical imaging devices ran unsupported operating systems (2020) [24]. Analysis: studies cannot reach readers, so diagnosis is delayed |
| Lab | Analyzers, LIS, middleware, slide scanners, freezer and cold-room sensors | Bulk and continuous transfers; environmental monitoring is safety-relevant | Analysis: result turnaround stalls. Chilled-water or ventilation faults can force disposal of sterile products [21] |
| Pharmacy | Automated dispensing cabinets, pump drug libraries, cold-chain monitoring | Moderate latency sensitivity; data integrity matters most | Analysis: medication pulls revert to manual overrides. Ascension pharmacies went offline during its 2024 attack [69] |
| Hospital command center | Real-time dashboards drawing on EHR, bed management, transport, and other systems | Depends on many feeds at once; a gap in any feed blinds the room | Johns Hopkins' command center monitors 14 IT systems around the clock [89]. It raised flagship occupancy from 85% to 92% while reducing delays, improved acceptance of complex transfers by 46%, assigned ED admits a bed 38% (3.5 hours) faster, and cut OR transfer delays by 83% [89] |

---

## C) Building and OT systems brief

### Building systems now on the network

NIST SP 800-82r3 (September 2023) explicitly treats building automation systems as operational technology (OT): HVAC, fire, electrical, lighting, physical access control, physical security, and other utilities [16]. TIA-1179-B sizes structured cabling to support non-IP and IP RFID, building automation, nurse call, security, access control, and pharmaceutical inventory systems [64]. Cameras and badge readers fall under physical security and access control systems [16].

IP-connected building and life-safety systems covered in this pillar: nurse call, RTLS, patient monitoring, infusion pumps, BMS and HVAC, medical gas alarms, access control, cameras, and wayfinding.

### Why facilities gear cannot share a flat clinical network

1. **HHS guidance says so directly.** HHS HICP (the 405(d) practices) says medical devices should be segmented from general access and data-center networks onto "dedicated, highly-restricted networks," with traffic limited to what device operation requires, restricted management access, and vulnerability scanners kept away from clinical devices because a rogue scan could disrupt them [12]. The 2023 edition added a micro-segmentation section and zero-trust discussion [13].
2. **NIST reference designs.** NIST SP 1800-8 (wireless infusion pumps, 2018) uses a nine-zone architecture with firewalls enforcing limited trust between zones [14]. NIST SP 1800-24 (PACS imaging archives, 2020) prescribes network zoning that limits communications to the minimum necessary [15].
3. **Measured exposure.**
   - 63% of CISA's Known Exploited Vulnerabilities appear on healthcare networks; 23% of medical devices have at least one known exploited vulnerability; 14% run an unsupported or end-of-life operating system (2023 research reported in 2024) [23].
   - 22% of hospitals had connected devices bridging guest and internal networks, and 4% of surgical devices were reachable from guest networks [23].
   - 72% of healthcare VLANs mixed IT and IoT assets (2020, older) [24].
   - 49% of sampled healthcare deployments had medical devices spread across 10 or fewer segments (undated, about 2020) [26].
4. **Device lifespan.** Medical device hardware often stays in service 10 to 30 years while software support can end within months. As of January 2022, 53% of connected medical and IoT devices in hospitals had known critical vulnerabilities (FBI, 2022) [22].
5. **Physical consequences.** AHA says hospitals should assess how losing OT such as building automation and HVAC affects clinical continuity, and recommends manual overrides and the ability to operate independently off-network for life-critical and mission-critical OT (January 2026) [17]. ASHE lists cyber threats to mechanical, electrical, and plumbing systems including disabling a life-safety system, equipment damage, disrupted operations, and a cyber entry point to the wider hospital network [18]. Chilled-water or ventilation faults can cancel surgeries, trigger an MRI quench, or force disposal of sterile stock [21].
6. **Ventilation management.** ASHRAE/ASHE Guideline 43 recommends using the BMS and computerized maintenance management system to monitor temperature, humidity, and pressure relationships, with excursion response plans [19]. Analysis: if the BMS shares a flat network with clinical endpoints, an attack on either side threatens both.
7. **Legacy devices remain a top hazard.** ECRI's 2026 Top 10 Health Technology Hazards lists unpreparedness for a "digital darkness" event at #2 and cybersecurity risks from legacy medical devices at #8 [27].

### Medical gas alarms

NFPA 99 requires master alarm panels in at least two separate locations: one in the work space of the person responsible for medical gas maintenance, and one in a continuously staffed area such as the telephone switchboard or security office. Area alarms must sit at a nurse station or similar supervised location. Local alarms monitor compressors, vacuum pumps, and other source equipment, and must also trigger the master alarm [61].

### Governance

IEC 80001-1:2021 sets organizational risk-management requirements for connecting health IT systems and medical devices to shared networks, covering safety, effectiveness, and security across the device lifecycle [28].

### Frameworks not verified

ISA/IEC 62443 text was not pulled. NIST SP 800-82r3 states alignment with other OT security standards [16].

---

## D) Plant, cabling, and Wi-Fi standards

### Cabling: ANSI/TIA-1179-B (published June 2023)

- Two Category 6A (or higher) cabling runs required for every wireless access point, with more recommended [64].
- Minimum telecommunications room size increased to 16 m² (170 ft²) [64].
- Recommended outlets per work area range from 2 to 6 in low-density areas to more than 14 in high-density areas [64].
- Single twisted-pair (single-pair Ethernet) cabling added as recognized media [64].
- Supersedes TIA-1179-A (2017) [65].
- FGI 2022 Guidelines (errata): the telecommunications main grounding busbar must bond to the building main electrical service ground, and telecom room busbars connect back to it [52].

### Power

- **Which code is enforced:** CMS enforces the 2012 editions of NFPA 101 (Life Safety Code) and NFPA 99 (Health Care Facilities Code), effective July 5, 2016. NFPA 99 chapters 7, 8, 12, and 13 are excluded; chapter 7 is the IT and communications chapter [60].
- **10-second restoration:** the life safety and critical branches must be restored within 10 seconds of losing normal power, fed by automatic transfer switches. The equipment branch may transfer later [55].
- **Network and nurse call on emergency power:** NEC 517.34(A) places nurse call systems, telephone and data rooms, clinical IT network equipment, and wireless phone and paging equipment for clinical staff on the critical branch; the IT network and wireless items were added in the 2020 NEC [53][54].
- **Generator testing:** monthly test from a cold start under load for at least 30 continuous minutes, with diesel generators at 30% or more of nameplate rating; plus a 4-hour test every 36 months at 30% or more of nameplate [56][57].

### What happens to monitoring and nurse call in a power event

Nurse call and network closets ride the critical branch, which must be back within 10 seconds [53][55]. Analysis: switches and access points without UPS (battery backup) will reboot in that gap, so wireless monitoring, voice badges, and IP nurse call drop until the network reconverges, unless closets have UPS sized to cover the generator transfer. In a 1992 case where both primary and backup power failed in a 45-bed cardiothoracic ICU, monitors and ventilators stopped, staff used pneumatic ventilators and battery transport monitors, and electronic phones, electric door openers, and security locks failed [66]. This source is old but remains the most direct evidence found.

### Wireless medical telemetry: dedicated band versus Wi-Fi

- WMTS (Wireless Medical Telemetry Service) operates at 608 to 614, 1395 to 1400, and 1427 to 1432 MHz. The FCC created it in 2002 with 14 MHz of spectrum. It is licensed by rule, but every deployment must be registered with ASHE/AHA, the FCC-designated frequency coordinator [32][33].
- The founding incident: in 1998, digital TV test broadcasts by a Dallas station disrupted wireless heart monitors at Baylor University Medical Center; the hospital brought in bedside monitors and no patients were harmed [34][35]. FDA reported that DTV transmissions disrupted telemetry in two Texas hospitals that year and urged migration to WMTS [36].
- Wi-Fi or cellular telemetry shifts the risk to network design. In a Mayo Clinic pilot of a cellular-connected continuous cardiac monitor in 162 patients, 33.5% of alarms exceeding the 30-second threshold were attributed to damaged devices or inadequate cellular connections [37].

### Wi-Fi 6E and Wi-Fi 7

- The 6 GHz band more than doubles the available channels [42]. 6 GHz is not globally harmonized, so devices must support the full local channel set or may fail to connect in some areas [40].
- One hospital network carried about 7,148 staff devices, 6,306 guest devices, 1,327 medical devices, 3,086 IoT devices, and 1,100 voice badges (2025 case study) [41]. Analysis: in hospitals, AP (access point) density is driven by capacity and voice roaming, not just coverage.
- Wi-Fi 7 deployments may require multi-gigabit switching and higher PoE (Power over Ethernet) budgets; Wi-Fi 6E can be a more cost-effective step to 6 GHz [42].

### Joint Commission 2026 structure

- Effective January 1, 2026, the EC and LS chapters were replaced by the Physical Environment chapter to mirror the CMS Conditions of Participation; Emergency Management remains its own chapter [58].
- The PE chapter has 8 standards, including PE.04.01.01 (building safety and facility management) and PE.04.01.03 (utility systems); key concepts are unchanged [59].
- Clinical alarm safety moved from NPSG.06.01.01 to NPG.01.05.01 (secondary source; confirm with the Joint Commission) [62].

---

## E) Multi-site and M&A notes

### Consolidation

- 46 announced hospital and health system transactions in 2025, down from 72 in 2024 [7].
- $18.5 billion transacted revenue, the lowest since Kaufman Hall began tracking [7].
- 17 transactions in Q4 2025, including four "mega mergers"; 43.5% of deals involved a financially distressed party; 45.6% involved a divestiture [7].

### Outpatient shift

- Outpatient services rose from 52% of hospital revenue in 2020 to 57% in 2024 (Moody's data, cited by AHA) [8].
- Benchmark data show outpatient visits up 9.8% year over year in 2025, while inpatient volumes rose 5.3% [8].
- 2034 forecast: outpatient volume up 17%, hospital outpatient and ASC volume up 14%, home-based services up 22% [9].

### Systemic and third-party exposure

The Change Healthcare attack (February 2024) financially affected 94% of hospitals and directly affected patient care at 74%; about 60% of affected hospitals reported revenue impact of $1 million per day or more [70]. Analysis: third-party connectivity is effectively part of every facility's perimeter.

### Imaging backhaul and storage (Analysis, sized from cited data)

- Remote reads move CT studies with a median of about 787 MB including reconstructions [72].
- Pathology slide traffic runs about 1 GB per slide [75].
- An 8K endoscope feed was compressed from 48 Gbps to 300 Mbps for a 68 km link between two hospitals, with about 0.15 s latency [78].

### Not found

No authoritative published counts of clinic SD-WAN adoption, campus fabric deployments, or typical building counts per health system.

---

## F) Hospital-at-home status (as of November 2026)

### Status

The Acute Hospital Care at Home (AHCAH) waiver now runs through September 30, 2030, under section 6210 of the Consolidated Appropriations Act, 2026 (P.L. 119-75) [80][79]. Note: the CMS QualityNet resources FAQ still contains older text saying the waiver lasts only for the public health emergency [79]; the waiver page and CMS fact sheet carry the 2030 date [79][80].

### Participation

- CMS current list (updated Oct 19, 2026): 358 approved CCNs across 134 health systems in 37 states [79].
- Becker's (cumulative, last updated July 23, 2026): 365 hospital campuses across 137 systems in 37 states; three new hospitals approved in 2026, all at systems that already had programs [84].
- AMA: 366 programs across 139 health systems in 37 states [85].
- The figures likely differ because CMS lists currently approved hospitals while the others count everyone ever approved (inference).
- As of October 2024, 366 hospitals had participated, serving over 31,000 patients [81].
- Each hospital must request the waiver under its own CCN, even within one system [79].

### Outcomes

- CMS's September 2024 study covered 332 participating hospitals in 38 states, November 2020 through July 2024 [81][82].
- Hospital-at-home beneficiaries generally had lower 30-day mortality than comparable brick-and-mortar inpatients [81][82].
- Length of stay averaged less than one day longer; Medicare spending in the 30 days after discharge was about 20% lower for most of the top 25 diagnosis groups [81].

### Requirements [83][79]

- At least two in-person visits daily by an RN or mobile integrated health paramedic.
- At least two sets of in-person vital signs daily.
- At least one daily physician or advanced practice clinician visit, which may be remote after the initial in-person exam.
- Immediate on-demand remote audio connection to a team member who can connect an RN or physician.
- Emergency personnel at the home within 30 minutes if needed.
- Remote monitoring may be continuous or intermittent, consistent with hospital policy.
- A process for patients who cannot be reached within 15 minutes of a scheduled visit.

### Connectivity in practice

- Programs favor provider-supplied cellular connectivity over patients' own internet to avoid excluding patients and to remove cost concerns [87].
- A rural Michigan RPM pilot using cellular devices saw a failure rate under 10%; connectivity was far less of a barrier with cellular than with Bluetooth devices [88].
- More RPM (vital signs, continuous single-lead ECG, fall monitoring) could extend hospital-at-home to moderate-acuity and rural patients [86].

### Data

CMS released a second batch of AHCAH data through ResDAC beginning March 17, 2026, covering April 1, 2023 through September 30, 2025 [80].

---

## G) Published numbers (section 7 of the request) and gaps

### Requested numbers

| Metric | Figure | Source |
|---|---|---|
| Nurse call response time | Self-reported averages of 3.57 min (day), 3.70 min (evening), 3.42 min (night), four Midwestern hospitals (2010) [47]. Archived tracking data: three hospitals averaged 3 min 7 s to 3 min 10 s, a fourth averaged 17 min 27 s (2012) [48]. Single hospital unit averages of about 3 min 3 s to 3 min 31 s (2009) [49]. One QI project cut the average from 2:37 to 2:06 [50] | [47][48][49][50] |
| RTLS location accuracy (hospital trial) | Wi-Fi fingerprinting: 1.21 m point accuracy, 96% room accuracy, 5.43 s latency. BLE fingerprinting: 2.13 m, 79%, 3.06 s. ZigBee fingerprinting: 1.99 m, 88% (Belgian hospital, 2016) | [45] |
| RTLS accuracy (other) | BLE typically 1 to 3 m in published systems [46]; calculated BLE position usually accurate to 6 to 12 feet per a non-Cisco RTLS vendor [44] | [44][46] |
| Wireless medical telemetry interference | 1998 Dallas DTV test broadcasts disrupted wireless heart monitors (about a dozen at Baylor) and telemetry at two Texas hospitals; no patient harm | [34][35][36] |
| OR 4K video bandwidth | Uncompressed 4K60 over 12G-SDI is 11.88 Gb/s [77]. Over IP (SMPTE ST 2110), 4K60 10-bit 4:2:2 is about 9.95 Gbps active video and about 10.4 Gbps on the wire, so plan on 25GbE per path [77]. Uncompressed Full HD over IP is about 3.7 Gbps [77] | [77] |
| OR 8K video bandwidth | Uncompressed 8K60 is about 48 Gbps [78]. An 8K laparoscopic recording uses 8 TB per 50 minutes [78] | [78] |
| CT and MRI study size | CT: median 787 MB for the full study, 290 MB for the acquired axial series (2025) [72]. 2009 to 2022 at one center: CT 229 to 765 MB, MRI 84.7 to 216 MB [71]. Images per study 1999 to 2012: CT 109 to 774, MR 122 to 639 [73] | [71][72][73] |
| Digital pathology slide size | About 1.6 GB per slide and 19.5 GB per surgical case of 12.2 slides (2018) [74]; about 1 GB per slide at 40x [75]; uncompressed large specimens up to about 30 GB at 20x and 100 GB at 40x [76] | [74][75][76] |

### Gaps

1. No standards-body numeric latency, jitter, or loss target was found for DICOM, RTLS, OR video, or wireless medical telemetry. AAMI, IEC, TIA, and the Joint Commission defer to the organization's own clinical service level [29].
2. Full TIA-1179-B and NFPA 99 2024 text is paywalled, so outlet-density tables and NFPA 99 Chapter 7 specifics are unverified. CMS still enforces the 2012 edition and excludes Chapter 7 [60].
3. No post-2002 counts of WMTS interference incidents; the FDA adverse-event database (MAUDE) was not queried.
4. No national counts for clinics, medical office buildings, imaging centers, labs, or hospital pharmacies; no KLAS or HIMSS network infrastructure surveys found.
5. No measured roaming or handoff data for voice badges or RTLS tags in hospitals; no healthcare-specific ASHRAE environmental limits for telecom rooms.
6. No authoritative data on Wi-Fi 7 adoption in hospitals, clinic SD-WAN adoption, or campus fabric deployments.
7. The ITU-T G.114 page fetch timed out; the 150 ms figure is corroborated by voice-over-WLAN design guides [43].
8. Older sources used as best available evidence: Unit 42 (2020), WMTS history (1998 to 2002), call-light studies (2009 to 2012), ICU power failure (1992), indoor positioning trial (2016), and Forescout segmentation analysis (about 2020).
9. Secondary sources needing verification: the HHS OCR acquisition case (law-firm summary) [10], the Joint Commission move from NPSG.06.01.01 to NPG.01.05.01 [62], and the UL 1069 15-second fault notification detail [51].
10. ISA/IEC 62443 text was not reviewed.

---

## H) Numbered sources

1. AHA, Fast Facts on U.S. Hospitals 2026: https://www.aha.org/statistics/fast-facts-us-hospitals
2. AHA, Fast Facts U.S. Health Systems 2025 Infographic: https://www.aha.org/system/files/media/file/2025/06/Fast-Facts-US-Health-Systems-2025-Infographic.pdf
3. Flex Monitoring Team, Historical CAH Data (2025 counts): https://www.flexmonitoring.org/historical-cah-data-0
4. Flex Monitoring Team, 2025 National CAH Quality Inventory and Assessment: https://www.flexmonitoring.org/sites/flexmonitoring.umn.edu/files/media/2025_Assessment_National_Report.pdf
5. CMS, Critical Access Hospitals: https://www.cms.gov/medicare/health-safety-standards/certification-compliance/critical-access-hospitals
6. MedPAC, March 2025 Report to the Congress, Chapter 10 (ASCs): https://www.medpac.gov/wp-content/uploads/2025/03/Mar25_Ch10_MedPAC_Report_To_Congress_SEC.pdf
7. Kaufman Hall, 2025 hospital M&A review: https://www.kaufmanhall.com/news/hospital-and-health-system-ma-activity-ends-2025-momentum and https://www.kaufmanhall.com/sites/default/files/2026-01/KH-Report_M+A_2025-Review_0.pdf (divestiture share via Vizient: https://www.vizient.com/insights/infographics/2025-ma-from-uncertainty-to-momentum)
8. AHA, Costs of Caring: https://www.aha.org/costsofcaring
9. AHA, 2025 Environmental Scan: https://www.aha.org/system/files/media/file/2024/11/Environmental-Scan-2025.pdf
10. Law-firm summary (Lexology) of HHS OCR ransomware investigations involving an acquired entity: https://www.lexology.com/library/detail.aspx?g=e865158a-ae34-44e6-b4af-a4b0b3f997ca
11. Oliver Wyman, Cyber Risk Due Diligence for Healthcare M&A (Feb 2025): https://www.oliverwyman.com/our-expertise/perspectives/health/2025/february/cyber-risk-due-diligence-a-game-changer-for-healthcare.html
12. HHS 405(d), HICP Technical Volume 2 (medium and large organizations): https://hhscyber.hhs.gov/Documents/HICP/tech-vol2-508.pdf
13. HHS 405(d), Executive Summary of HICP 2023 revisions: https://405d.hhs.gov/Documents/405d-exec-summary-tech-updates.pdf
14. NIST SP 1800-8, Securing Wireless Infusion Pumps (2018): https://www.nccoe.nist.gov/publications/practice-guide/securing-wireless-infusion-pumps-healthcare-delivery-organizations-nist
15. NIST SP 1800-24, Securing PACS (2020): https://csrc.nist.gov/pubs/sp/1800/24/final
16. NIST SP 800-82 Rev. 3, Guide to OT Security (2023): https://csrc.nist.gov/pubs/sp/800/82/r3/final
17. AHA News, agencies issue guidance on secure OT connectivity (Jan 16, 2026): https://www.aha.org/news/headline/2026-01-16-agencies-issue-guidance-secure-connectivity-operational-technology
18. ASHE, Best Practices Framework for Health Care Cyber-Physical Protection: https://www.ashe.org/hdrcyber
19. ASHE, Overview of ASHRAE/ASHE Guideline 43: https://www.ashe.org/overview-ashraeashe-guideline-43-operations-guideline-ventilation-health-care-facilities
20. ASHE, Operating Room HVAC Setback Strategies: https://www.ashe.org/sites/default/files/ashe/mg2011love.pdf
21. Gillin (2021), University of Cambridge, Cybersecurity Risk in Healthcare: Hospital Building Services: https://www.construction.cam.ac.uk/files/gillin_-_2021.pdf
22. FBI Private Industry Notification 20220912-001, Unpatched and Outdated Medical Devices: https://www.ic3.gov/CSA/2022/220912.pdf
23. HIPAA Journal, 63% of Known Exploited Vulnerabilities Found in Hospital Networks (Mar 2024, reporting security-vendor research): https://www.hipaajournal.com/63pc-known-exploited-vulnerabilities-hospital-networks/
24. Unit 42, 2020 IoT Threat Report (security vendor research): https://www.paloaltonetworks.com/content/dam/pan/en_US/assets/pdf/reports/Unit_42/2020-unit-42-IoT-threat-report.pdf
25. Forescout Research, Isolating the Persistent Risk of IoMT Devices (Oct 2024, security vendor research): https://www.forescout.com/blog/research-isolating-the-persistent-risk-of-iomt-devices/
26. Forescout, network segmentation adoption in healthcare (undated, about 2020): https://www.forescout.com/blog/network-segmentation-is-a-security-best-practice-but-is-adoption-lagging-in-healthcare/
27. ECRI, Top 10 Health Technology Hazards for 2026: https://home.ecri.org/blogs/ecri-news/misuse-of-ai-chatbots-tops-annual-list-of-health-technology-hazards
28. ISO/IEC, IEC 80001-1:2021: https://www.iso.org/standard/72026.html
29. IEC TR 80001-2-3 (wireless networks) preview: https://webstore.ansi.org/preview-pages/IEC/preview_iec80001-2-3%7Bed1.0%7Den.pdf
30. AAMI, Biomedical Instrumentation and Technology, Management and Risk Assessment of Wireless Medical Devices in the Hospital: https://array.aami.org/doi/10.2345/0899-8205-45.3.243
31. Patient-monitor manufacturer, network installation best practices (published requirements): https://www.hillrom.com/content/dam/hillrom-aem/us/en/sap-documents/LIT/80017/80017361LITPDF.pdf
32. FCC, Wireless Medical Telemetry Service: https://www.fcc.gov/wireless/bureau-divisions/mobility-division/wireless-medical-telemetry-service-wmts
33. FCC, ASHE/AHA as WMTS frequency coordinator: https://www.fcc.gov/wireless/bureau-divisions/mobility-division/wireless-medical-telemetry-service-wmts/american-society
34. Circulation (1998), High-Definition Television and Telemetry: https://doi.org/10.1161/01.cir.98.6.492
35. FCC and FDA Joint Statement on DTV and medical telemetry (1998): https://transition.fcc.gov/Bureaus/Engineering_Technology/News_Releases/1998/nret8003.html
36. FDA Public Health Advisory on telemetry EMI (reprint): https://www.jenonline.org/article/S1075-4210(00)70004-6/fulltext
37. Mayo Clinic, Implementation of a Tiered Cardiac Telemetry System: https://pmc.ncbi.nlm.nih.gov/articles/PMC11975828/
38. ITU-T Recommendation G.114, One-way transmission time: https://www.itu.int/rec/T-REC-G.114-200305-I/en
39. Wi-Fi Alliance, Voice-Enterprise performance requirements: https://www.wi-fi.org/faq/does-voice-enterprise-test-performance-requirements
40. Wi-Fi Alliance, 6 GHz Wi-Fi in healthcare: https://www.wi-fi.org/beacon/matt-pekarske/wi-fi-7-market-momentum-6-ghz-wi-fi-empowers-connectivity-in-crucial
41. Dynamic Spectrum Alliance, Wi-Fi's Critical Role in Modern Healthcare (2025 case study): https://www.dynamicspectrumalliance.org/2025/DSA_case_study_healthcare.pdf
42. HealthTech Magazine, Wi-Fi 7 in Healthcare (Dec 2025): https://healthtechmagazine.net/article/2025/12/wifi-7-in-healthcare-perfcon
43. Non-Cisco networking vendor, VoIP best practices for WLAN (2018): https://documentation.extremenetworks.com/WiNG/Implementation_Guides/WING5X_Reference_VOIP_Best_Practices_and_Recommendations_v1.pdf
44. Non-Cisco RTLS vendor, comparison of RTLS technologies: https://www.tagnos.com/rtls-in-healthcare-comparing-real-time-location-systems/
45. Performance analysis of multiple indoor positioning systems in a healthcare environment (2016): https://pmc.ncbi.nlm.nih.gov/articles/PMC4740986/
46. A Meta-Review of Indoor Positioning Systems (2019): https://pmc.ncbi.nlm.nih.gov/articles/PMC6832486/
47. BMC Health Services Research (2010), staff nurse perspectives on patient-initiated call lights: https://link.springer.com/article/10.1186/1472-6963-10-52
48. BMC Health Services Research (2012), call light response time and fall rates: https://link.springer.com/article/10.1186/1472-6963-12-84
49. Journal of Clinical Nursing (2009), call light use, response time, and inpatient falls: https://doi.org/10.1111/j.1365-2702.2009.02916.x
50. Rochester Regional Health, No Pass Zone responsiveness QI project: https://scholar.rochesterregional.org/cgi/viewcontent.cgi?article=1009&context=nursingresearchday
51. UL 1069 Edition 8 (2024), Hospital Signaling and Nurse Call Equipment: https://www.shopulstandards.com/ProductDetail.aspx?productId=UL1069 (15-second fault notification detail via a nurse-call vendor summary: https://www.rft.com/understanding-industry-standards-for-wireless-call-systems/)
52. FGI Bulletin 23 and 2022 Hospital Guidelines errata: https://fgicodes.org/fgi-bulletin/bulletin-23/ and https://fgiguidelines.org/wp-content/uploads/2023/12/2022_FGI_H_errata-231211.pdf
53. California HCAI, A8 Electrical Guide for Health Care Facilities (2024 supplement): https://hcai.ca.gov/wp-content/uploads/2024/08/2022-w-2024-Supplement-Electrical-Guide_07102024-A-1.pdf
54. NEC code change summary for health care (electrical manufacturer): https://leviton.com/content/dam/leviton/digital-marketing/solutions---by-industry/health-care/documents/NEC_Code_Change_Summary_for_Health_Care_Q-899C.pdf
55. Critical power for healthcare electrical systems design guide (electrical manufacturer): https://www.eaton.com/content/dam/eaton/products/design-guides---consultant-audience/eaton-healthcare-design-guide-dg083001en.pdf
56. Joint Commission Standards FAQ, monthly emergency generator load test: https://www.jointcommission.org/standards/standard-faqs/ambulatory/environment-of-care-ec/000001257/ (ASC inspection findings: https://digitalassets.jointcommission.org/api/public/content/assets/1/7/ecn_25_2022_06.pdf)
57. Joint Commission Standards FAQ, combining load bank and 36-month tests: https://www.jointcommission.org/standards/standard-faqs/ambulatory/environment-of-care-ec/000001267/
58. Joint Commission Online, July 2, 2025 (EC and LS replaced by PE): https://www.jointcommission.org/en-us/knowledge-library/newsletters/joint-commission-online/02-jul-25
59. Joint Commission, Accreditation 360 Physical Environment chapter webinar transcript: https://digitalassets.jointcommission.org/api/public/content/e7ecc1b57fb14179b3e9a026d0a27a0e
60. CMS, Life Safety Code: https://www.cms.gov/medicare/health-safety-standards/conditions-coverage-participation/life-safety-code and CMS S&C 16-29-LSC: https://www.cms.gov/medicare/provider-enrollment-and-certification/surveycertificationgeninfo/downloads/survey-and-cert-letter-16-29.pdf
61. NFPA 99 committee input report (medical gas and vacuum alarms): https://docinfofiles.nfpa.org/files/AboutTheCodes/99/99_A2023_HEA_PIP_CIReport.pdf
62. Joint Commission R3 Report, clinical alarm safety NPSG: https://digitalassets.jointcommission.org/api/public/content/aa15f8d34283484d9947f6802aa14122?v=4e9c34ef (2026 renumbering via secondary source: https://open-exam-prep.com/study-guides/chtm/recalls-regulatory-compliance/joint-commission-compliance)
63. JAMA (2013), Joint Commission Warns of Alarm Fatigue: https://jamanetwork.com/journals/jama/article-abstract/1696094
64. TIA Fiber Optics Tech Consortium, ANSI/TIA-1179-B summary: https://www.tiafotc.org/tia-standards-update/tia-1179-b/
65. TIA, announcement of ANSI/TIA-1179-B (June 29, 2023): https://tiaonline.org/standardannouncement/tia-issues-new-healthcare-facility-telecommunications-infrastructure-standard/
66. Total electrical power failure in a cardiothoracic ICU (1992): https://pubmed.ncbi.nlm.nih.gov/1597040/
67. Uptime Institute, Annual Outage Analysis 2025 and 2026: https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.AnnualOutageAnalysis.pdf?version=0 and https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2026.AnnualOutageAnalysis.pdf (UPS, transfer switch, generator percentages via https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.Annual.Survey.Report.pdf)
68. JAMA Network Open (2023), Ransomware Attack Associated With Disruptions at Adjacent Emergency Departments: https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2804585
69. Healthcare Dive, impact of the Ascension cyberattack: https://www.healthcaredive.com/news/ascension-cyberattack-impact-ehr-pharmacy-ambulance-diversion/719139/ and state-by-state tracker: https://www.healthcaredive.com/news/tracking-ascension-healthcare-cyberattack-impact/716327/
70. AHA survey, Change Healthcare cyberattack impact (March 2024): https://www.aha.org/system/files/media/file/2024/03/aha-survey-change-healthcare-cyberattack-significantly-disrupts-patient-care-hospitals-finances.pdf
71. AuntMinnie, Complexity of radiology exams has skyrocketed (Linkoping study): https://www.auntminnie.com/practice-management/article/15659835/complexity-of-radiology-exams-has-skyrocketed
72. European Radiology (2025), greenhouse gas emissions from long-term CT data storage: https://link.springer.com/article/10.1007/s00330-025-12023-z
73. RSNA (2012), increased cross-sectional imaging workload in the PACS era: https://archive.rsna.org/2012/12022076.html
74. Whole-Slide Imaging: Thinking Twice Before Hitting the Delete Key: https://doi.org/10.1097/pcr.0000000000000283
75. Polish Society of Pathologists, digital pathology adoption guidelines: https://pmc.ncbi.nlm.nih.gov/articles/PMC12874716/
76. Whole slide image data utilization informed by digital diagnosis patterns: https://pmc.ncbi.nlm.nih.gov/articles/PMC9577055/
77. OR video bandwidth sources: optical connectivity white paper https://us.optohub.com/documents/optohub-beyond-4k-surgical-imaging-white-paper.pdf ; ST 2110 bandwidth calculator https://www.mdlcommunications.com/engineers-toolkit/st-2110-bandwidth-calculator/ ; OR integration video-over-IP paper (medical equipment manufacturer) https://www.getinge.com/dam/hospital/documents/english/tegris_video-over-ip_paper-74647-en.pdf
78. 8K medical video sources: SPIE (2023) 8K-UHD remote transmission https://doi.org/10.1117/12.2655686 ; 8K laparoscopic gynecologic surgery https://pmc.ncbi.nlm.nih.gov/articles/PMC5649501/
79. CMS QualityNet, Acute Hospital Care at Home resources and waiver: https://qualitynet.cms.gov/acute-hospital-care-at-home/resources and https://qualitynet.cms.gov/acute-hospital-care-at-home/waiver
80. CMS, Acute Hospital Care at Home Data Release Fact Sheet: https://www.cms.gov/newsroom/fact-sheets/acute-hospital-care-home-data-release-fact-sheet-0
81. CMS blog, Lessons from CMS' Acute Hospital Care at Home Initiative: https://www.cms.gov/newsroom/blog/lessons-cms-acute-hospital-care-home-initiative
82. CMS, Fact Sheet: Report on the Study of the AHCAH Initiative: https://www.cms.gov/newsroom/fact-sheets/fact-sheet-report-study-acute-hospital-care-home-initiative
83. JAMA Health Forum, Initial Findings From an Acute Hospital Care at Home Waiver Initiative: https://jamanetwork.com/journals/jama-health-forum/fullarticle/2811346
84. Becker's Hospital Review, hospitals approved for hospital at home in 2026: https://www.beckershospitalreview.com/healthcare-information-technology/innovation/hospitals-health-systems-approved-for-hospital-at-home-in-2026/
85. AMA, Lawmakers extend CMS hospital-at-home waiver for five years: https://www.ama-assn.org/public-health/population-health/lawmakers-extend-cms-hospital-home-waiver-five-years
86. The Next Frontier of Remote Patient Monitoring: Hospital at Home: https://pmc.ncbi.nlm.nih.gov/articles/PMC10132045/
87. Hospital Is Not the Home: Lessons From Implementing Remote Technology: https://pmc.ncbi.nlm.nih.gov/articles/PMC11512117/
88. Michigan Center for Rural Health, Remote Patient Monitoring playbook: https://edge.sitecorecloud.io/michigansta4a14-msu70a4-prod718c-8cd0/media/project/msu/mcrh/docs/resources/mcrh-rpm-playbook.pdf
89. Johns Hopkins command center: Joint Commission Journal on Quality and Patient Safety (2019) https://doi.org/10.1016/j.jcjq.2018.11.006 ; Johns Hopkins Medicine (2021) https://www.hopkinsmedicine.org/news/articles/2021/03/capacity-command-center-celebrates-5-years-of-improving-patient-safety-access ; ED Management (2017) https://pubmed.ncbi.nlm.nih.gov/29787661/
