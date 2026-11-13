# Healthcare Infrastructure Storyboard: Context Document (Part C)

# Part 4: Storyboard scenes and visual cues

**For 3D and 2D builds. Prepared November 12, 2026.**

This file turns `part-a1.md`, `part-a2.md`, and `part-b-phase2.md` into buildable scenes. It contains three flagship sequences (Security, Facilities, AI; 6 scenes each), four scenes for each of the ten use cases, and a reusable object library. Citations use the same prefixes as Part B: [C], [S], [F], [A] from Phase 1, and [K] from `research/05-cisco-cloud-control-data-fabric.md`.

---

## 4.0 Global visual conventions (apply to every scene)

**Color states.**
- **Green (healthy):** steady glow, slow pulse on data-flow lines.
- **Amber (degraded):** faster pulse, dashed data-flow lines, a small warning glyph above the object.
- **Red (down):** solid red, data-flow lines broken with a visible gap, object desaturated except for the red outline.
- **Blue (human decision pending):** used only on the approval modal and on any object waiting for a human approval. This keeps "waiting for a person" visually distinct from "broken."
- **Gray (unknown / not instrumented):** used honestly for parts of the path no tool can see (patient home cellular, vendor upstream model provider).

**Status chips on every Cisco UI element.** A small pill in the corner of each Cisco panel: **GA** (solid green outline), **CA** (amber outline, with "beta" or "alpha" text), **Roadmap** (dotted gray outline). Cloud Control panels also carry "US" in the chip. Roadmap items appear only in clearly labeled "future" frames, never in the main action.

**Metric overlays.**
- Cited figures show a tiny citation tag in the corner of the callout, for example "[C-37]".
- Proposed KPIs (MTTA, MTTK, MTTInn) appear as a stopwatch labeled "measured locally; no industry benchmark."
- Phase 2 outcomes appear with a "MODELED" watermark and no percentage. Example: "Modeled: one investigation instead of five consoles."
- Clock values (T+00:12 and similar) are illustrative timestamps for pacing, not measured outcomes. Put "illustrative timeline" in small type under any clock.

**Rules for every frame.**
- No real patient data on any screen. Use "Patient A," "Bed 12," "Room 5E-14." No MRNs, names, or dates of birth.
- No attacker procedures: show detections as abstract shapes ("unusual connection pattern") with no commands, tools, or exploit names.
- Changes execute in the domain controller. When a change happens, show a short "executed in: Meraki / Catalyst Center / ISE / SD-WAN Manager / Security Cloud Control" chip, never "executed by Cloud Control alone" [K-1].
- The approval modal (see object library) appears before every change that can touch a clinical system [K-10].
- Never use the phrase "clinical data fabric." Data Fabric panels are labeled "Machine data" [A-107][K-PHI].
- Cisco Spaces panels carry the caption "Connector health, not location" [K-3b].

**Camera language.**
- **Isometric 3D** (default): 30 degree top-down cutaway of buildings with roofs and selected walls removed.
- **Over-the-shoulder:** for any person working a screen.
- **Split screen:** "today" on the left in desaturated tones, "with Cloud Control" on the right in full color.
- **2D:** flat floor plans and topology diagrams with callout bubbles; same color states.

---

## 4.1 Flagship: Security (6 scenes)

### Title: "Containment with a human still in the loop"

Narrative arc: an overnight detection on the infusion pump segment is scoped, handed from the SOC to biomed, approved by humans, contained in the domain controller, and verified, while the rest of the hospital stays green. Built from use cases 2 and 3.

**Scene SEC-1: 03:10, two rooms, one signal**
- **Setting:** split screen. Left: a dim ICU at night, Bed 12 with an infusion pump on an IV pole, monitor glowing. Right: the SOC, three analysts, wall of screens.
- **Camera:** slow push-in on the pump's network port, then a cut along a glowing cable through the ceiling to the SOC wall.
- **Objects:** infusion pump, IV pole, bedside monitor, ceiling AP, SOC desks, Splunk ES detection tile.
- **Data-flow overlay:** a thin green line from pump to drug library server; a new amber dotted line branching toward a file server icon it has never talked to. No command text, only the shape.
- **Color state:** pump amber; everything else green.
- **Metric overlay:** "Median dwell time, global: 14 days [S-8]" in small type; stopwatch "MTTA: measured locally; no industry benchmark."
- **People:** SOC analyst leaning forward; ICU nurse at the central station, unaware.

**Scene SEC-2: Blast radius**
- **Setting:** isometric cutaway of the full hospital tower, floors stacked, each floor's segments drawn as translucent colored zones (clinical workstations, pump segment, imaging, building systems, guest).
- **Camera:** pull back from the SOC wall into the 3D tower, rotating 45 degrees.
- **Objects:** topology map projected as glowing lines between IDF racks on each floor; small icons for pumps, CT gantry, BMS controller, badge reader.
- **Data-flow overlay:** the pump segment zone pulses amber; faint dotted "possible reach" lines extend toward adjacent zones and stop at segment boundaries.
- **Color state:** pump zone amber; adjacent zones green with a thin amber edge where they touch.
- **Metric overlay:** "10 to 15 medical devices per bed [F-23]"; "Global MTTC: 64 days [C-1]."
- **People:** none in frame; voiceover pacing.

**Scene SEC-3: The war room opens**
- **Setting:** AI Canvas war-room wall in the SOC; network engineer joins remotely (inset video tile from home).
- **Camera:** over-the-shoulder of the SOC analyst, then a slow pan across canvas widgets.
- **Objects:** AI Canvas wall (GA, US) with widgets: correlated Action (GA), Cisco Identity card showing the device's ISE profile and session (GA), topology snippet with switch and VLAN (GA), Deep Reasoning hypothesis list (CA chip, "beta; confirm").
- **Data-flow overlay:** lines from Splunk ES, Security Cloud Control, Identity, and Topology converge into the canvas.
- **Color state:** canvas neutral; pump segment widget amber.
- **Metric overlay:** "MODELED: one investigation instead of five consoles." Stopwatch "MTTK: measured locally."
- **People:** SOC analyst, network engineer (remote).

**Scene SEC-4: SOC-to-biomed handoff**
- **Setting:** the biomed shop at 03:40: workbench, spare pumps, a tablet showing the same AI Canvas.
- **Camera:** close on the biomed engineer's hands testing a spare pump of the same model in standalone mode; rack focus to the tablet.
- **Objects:** spare infusion pump, CMMS record card, MDS2 binder, tablet with canvas, approval modal (blue).
- **Data-flow overlay:** a shared-canvas link line from the SOC wall to the tablet, labeled "same evidence."
- **Color state:** approval modal blue; pump segment amber.
- **Metric overlay:** approval modal text: "Proposed: restrict 3 addresses on pump segment to drug library server only. Requires: Biomed approver + Network approver. Trust level L3: execute after approval [K-10]." Chips: Agentic Workflow GA; run-from-canvas CA (beta).
- **People:** biomed engineer (approving), network engineer (approving), SOC analyst (watching).

**Scene SEC-5: Execute and verify**
- **Setting:** back to the isometric tower, pump floor highlighted; ICU Bed 12 inset.
- **Camera:** isometric hold; small inset zooms into Bed 12.
- **Objects:** "executed in: ISE / Catalyst Center" chip; topology map; the pump at Bed 12; two nurses at the bedside.
- **Data-flow overlay:** the amber dotted branch toward the file server cuts off; the green line to the drug library server stays.
- **Color state:** pump zone settles from amber to green-with-outline (contained); rest of hospital green.
- **Metric overlay:** "Post-change verification: traffic matches approved policy." Caption: "Rollback is a planned change in the domain controller, not automatic [K-5]."
- **People:** ICU nurse and a second nurse doing a manual rate double-check on one affected pump (manual verification still happens).

**Scene SEC-6: The clock that did not start everywhere**
- **Setting:** command center the next morning; downtime clock on the wall; audit log scrolling on a side screen.
- **Camera:** wide, then a slow dolly toward the downtime clock.
- **Objects:** downtime clock with per-system rows (EHR, PACS, pumps, phones, BMS); audit log panel (GA); persistent AI Canvas record.
- **Data-flow overlay:** none; static rows.
- **Color state:** only the "pump segment, 3 devices" row shows a short amber interval; all others green.
- **Metric overlay:** "Sentinel Event Alert 67: plan for 4+ weeks offline [C-19]." "MODELED: containment scoped to the devices involved." "Illustrative timeline."
- **People:** CISO, CNO, biomed lead, and network engineer reviewing the canvas together.

---

## 4.2 Flagship: Facilities (6 scenes)

### Title: "One estate, from the patient room to the rural clinic"

Narrative arc: a flyover of the whole health system, then down into a patient room, an IDF, an imaging suite, and a rural clinic, ending with facilities machine data shown next to network data. Built from use cases 4, 5, and 7.

**Scene FAC-1: The estate from above**
- **Setting:** dawn flyover of a hospital campus (tower, medical office building, central plant, parking structure, helipad, data center), then a rural highway to a clinic 40 miles away, a critical access hospital, and a home with an RPM kit.
- **Camera:** high drone arc, then descend toward the tower.
- **Objects:** campus buildings, ambulance on the approach road, clinic with SD-WAN edge on the roof icon, CAH, home.
- **Data-flow overlay:** glowing topology lines connect every building to the data center (Layer 3 topology, GA [K-3]).
- **Color state:** all green except the clinic link, faint amber.
- **Metric overlay:** "68% of hospitals are system-affiliated; systems range from 1 to 157 hospitals [F-2]."
- **People:** tiny figures: paramedics, a nurse walking into the clinic.

**Scene FAC-2: Patient room 5E-14**
- **Setting:** isometric cutaway of a med-surg patient room: bed, IV pole with pump, nurse call pillow speaker, wall-mounted monitor, ceiling AP, workstation on wheels in the hallway.
- **Camera:** isometric, slow 90 degree orbit.
- **Objects:** ceiling AP, voice badge on the nurse, RTLS tag on the pump, nurse call dome light over the door.
- **Data-flow overlay:** badge-to-AP Wi-Fi arcs; an amber flicker as the nurse walks toward the stairwell (roam).
- **Color state:** room green; stairwell AP coverage amber.
- **Metric overlay:** "Voice roam target under 100 ms; WPA3-SAE without FT about 174 ms vs about 31 ms with FT [C-44][C-45]."
- **People:** bedside nurse, elderly patient, family member in the chair.

**Scene FAC-3: The IDF on 5 East**
- **Setting:** a telecom room: two racks, access switches, patch panels, UPS, red critical-branch outlet, cable trays overhead.
- **Camera:** door opens; slow push to the rack; inventory card floats out of the switch.
- **Objects:** IDF rack, access switch with PoE ports lit, UPS, red outlet, TIA cable bundles.
- **Data-flow overlay:** uplinks from the IDF to the core; downlinks fanning out to patient rooms on a floor plan overlay.
- **Color state:** green, with one switch port group amber (the stairwell AP).
- **Metric overlay:** "Clinical IT network equipment on the NEC critical branch: restore within 10 s of power loss [F-53][F-55]." Inventory card: Catalyst Center via Meraki Global Overview (GA).
- **People:** network engineer with a laptop.

**Scene FAC-4: Imaging suite**
- **Setting:** CT room with gantry and table, adjacent control room with tech workstation, PACS reading workstation down the hall.
- **Camera:** isometric across the shielded wall; follow a glowing "study" packet from gantry to PACS to the WAN.
- **Objects:** CT gantry, control room console, PACS server rack, WAN edge.
- **Data-flow overlay:** a thick data stream from gantry to PACS, then a WAN arc to the comprehensive stroke center.
- **Color state:** gantry green; WAN arc amber when the overnight prefetch shares the link.
- **Metric overlay:** "CT study median 787 MB [F-72]; 1 GB over 100 Mbps at 70% usable: about 114 s; over 1 Gbps: about 11 s (ESTIMATE) [C-101]."
- **People:** CT tech, radiologist in the distant reading room.

**Scene FAC-5: Rural clinic in a storm**
- **Setting:** a small clinic at dusk in rain; front desk, exam rooms, a wall-mounted SD-WAN edge with LTE antenna.
- **Camera:** exterior push through the window; interior over-the-shoulder at the front desk.
- **Objects:** SD-WAN edge, fiber entering the building, LTE antenna, front-desk workstation.
- **Data-flow overlay:** fiber line turns red and breaks; LTE arc lights up as backup transport.
- **Color state:** fiber red; LTE green; EHR session on the workstation briefly amber, then green.
- **Metric overlay:** "Configuration/change 34%, hardware 26%, third-party provider and line breakage 17% each of network-caused outages [C-81]." AI Insights in Topology (GA) card ranks this clinic first.
- **People:** medical assistant, patient at the desk.

**Scene FAC-6: Facilities machine data next to network data**
- **Setting:** facilities operations office: VP of Facilities and a network engineer at a shared screen; BMS console on a separate monitor.
- **Camera:** over-the-shoulder; then the screen fills the frame.
- **Objects:** Data Fabric panel titled "Machine data": BMS system events, access-control system events, nurse call controller health, RTLS gateway health; Cisco Spaces connector health tile with caption "Connector health, not location"; topology view of the whole estate.
- **Data-flow overlay:** small streams from building system icons into a "Machine Data Lake (GA)" cylinder, then into the Cloud Control topology.
- **Color state:** one nurse call controller gateway amber; network path to it green, which tells the team where to look.
- **Metric overlay:** "Onboarded with Guided Onboarding and Auto Schematization (GA) [K-17]. No native nurse call, RTLS, or BMS connector [K-E 20]." "MODELED: facilities and network teams look at one view."
- **People:** VP of Facilities, network engineer, CNO on a call tile.

---

## 4.3 Flagship: AI (6 scenes)

### Title: "Governed AI, from the exam room to the reading room"

Narrative arc: AI shows up as a clinical experience (an ambient scribe, an imaging triage flag), not as a GPU rack. The sequence follows two data paths (clinical PHI path and machine-data path), a slowdown investigation, a human approval gate, and a clinical user finishing the day. Built from use cases 5 and 10.

**Scene AI-1: Exam room, ambient scribe**
- **Setting:** primary care exam room: exam table, physician on a stool facing the patient, a phone or small device running the scribe on the counter, ceiling AP.
- **Camera:** warm, eye-level two-shot; then a ceiling-up shot following the audio arc.
- **Objects:** scribe device, ceiling AP, workstation with the EHR (screen shows placeholder "Patient A").
- **Data-flow overlay:** a soft audio waveform arc from the room to the AP, out the internet edge, to a "Scribe vendor cloud (BAA)" cloud icon. Label: "Clinical PHI path. Not in Data Fabric."
- **Color state:** green.
- **Metric overlay:** "Ambient scribe time in notes per appointment: 10.3 to 8.2 minutes (n=46) [A-14]."
- **People:** physician, patient.

**Scene AI-2: Reading room, AI triage**
- **Setting:** dark radiology reading room: two diagnostic monitors, worklist on a side monitor, headset.
- **Camera:** over-the-shoulder; worklist row slides to the top with a flag.
- **Objects:** reading workstation, worklist, CT image thumbnail (no identifiers), inset of an on-prem inference server.
- **Data-flow overlay:** CT gantry to PACS to an on-prem AI orchestrator to an inference server labeled "UCS C885A M8 (GA) [A-98]" or "Unified Edge (GA) [A-103]"; result returns to the worklist.
- **Color state:** green.
- **Metric overlay:** "AI PE triage, work hours: 68.9 to 46.7 minutes report turnaround; off-hours not significant [C-50]."
- **People:** radiologist.

**Scene AI-3: Two lanes, one gate**
- **Setting:** abstract 2D or stylized 3D: two parallel highways.
- **Camera:** side-on tracking shot along both lanes.
- **Objects:** upper lane "Clinical PHI": EHR, PACS, scribe vendor (BAA); lower lane "Machine data": network, security, identity, IoMT connectivity, EHR performance, nurse call and RTLS system events. A gate between them that stays closed.
- **Data-flow overlay:** lower lane flows into "Cisco Data Fabric: Machine Data Lake, Federated Search, Catalog (GA)", then to "Cloud Control" and "AI Canvas." Upper lane stays in clinical systems.
- **Color state:** both green; the gate glows blue with the label "Designated record set stays in the EHR [A-61]."
- **Metric overlay:** "HIPAA alignment of Cloud Control and AI Canvas: customer responsibility [K-29]." Optional inset: "AI POD for Splunk (GA): on-prem or air-gapped [K-27]."
- **People:** none; voiceover.

**Scene AI-4: The Monday-morning slowdown**
- **Setting:** clinical apps and network team area; AI Canvas on a large screen.
- **Camera:** start on a physician's "note not generating" spinner, whip-pan to the team screen.
- **Objects:** AI Canvas with ThousandEyes path widget (GA), exam-room Wi-Fi health (GA), internet edge health (GA), Agent Observability trace panel (GA).
- **Data-flow overlay:** path from exam room to edge green; edge to scribe vendor endpoint amber; beyond the vendor, a gray cloud labeled "Upstream model provider: not visible."
- **Color state:** hospital side green; vendor endpoint amber; upstream gray.
- **Metric overlay:** "2026 scribe outages: 1 h 35 min to 2 h 10 min, tied to upstream dependencies [A-39][A-40][A-41][A-42]." Stopwatch "MTTInn: measured locally." "MODELED: hospital side cleared in one view."
- **People:** CMIO, network engineer, clinical apps analyst.

**Scene AI-5: The approval gate**
- **Setting:** same team area; approval modal fills the center of the screen.
- **Camera:** push into the modal; then cut to a hand hovering over "Approve."
- **Objects:** approval modal (blue) with: proposer ("Agentic Workflow"), proposed change ("apply QoS priority for scribe traffic on exam-room SSID, Clinic Building B"), approvers required (network owner, CMIO delegate), trust level L3 [K-10], "executed in: Meraki." AI Defense shield icon (GA [A-83]) and Tokenomics cost card from Agent Observability (GA [K-27]).
- **Data-flow overlay:** a thin line from the modal to the Meraki controller icon, dashed until approval, solid after.
- **Color state:** blue until approved, then green.
- **Metric overlay:** caption "Agents propose. Humans approve [K-5]." Future-frame sidebar (dotted Roadmap chip): "Agent Builder, autonomous loop: Roadmap."
- **People:** network engineer approving; CMIO delegate approving on a phone.

**Scene AI-6: The clinical user finishes the day**
- **Setting:** split: left, the physician closing her last note at 5:30 p.m. in the clinic; right, the radiologist reading the flagged study. Background, behind glass, a GPU rack with soft light (secondary, out of focus).
- **Camera:** gentle pull-back revealing both, then the rack, then the estate topology.
- **Objects:** clinic workstation, reading workstation, GPU rack (out of focus), small "AI Defense discovery" card listing one unsanctioned AI app found (no names).
- **Data-flow overlay:** both clinical paths green; machine-data lane gently flowing below the floor.
- **Color state:** green.
- **Metric overlay:** "GPU rack 120 to 132 kW vs about 9 kW typical [A-49][A-50][A-51]." "40% of surveyed workers encountered unauthorized AI tools [A-55]." "MODELED: fewer hours lost to unexplained AI slowdowns."
- **People:** physician, radiologist.

---

## 4.4 Per use case scenes (4 scenes each)

Each use case uses the same four beats: **Setting**, **Trigger**, **Today**, **Cloud Control + outcome**. Visual notes: "3D" for isometric objects; "2D" for overlays and callouts.

### Use case 1: EHR availability and clinical application performance

**UC1-1 Setting: ED at shift change**
- ED registration desk, treatment bays, bed board on the wall, command center window in the background.
- People: registration clerk, ED nurse, physician, chest-pain patient.
- 3D: isometric ED with bays as open boxes; workstations on wheels in the corridor.
- 2D: floor plan with bed board overlay.
- Color: all green.

**UC1-2 Trigger: "Epic slow, multiple units"**
- Registration screen hangs at eligibility; a results tab spins; the bed board goes stale (timestamp frozen).
- 3D: spinner icons above three workstations; bed board dims.
- 2D: ticket card "P1: EHR slow, multiple units."
- Color: workstations amber.
- Metric: "ICA RTT warning 300 ms; critical 400 ms [C-37]."

**UC1-3 Today: five consoles, one bridge**
- Five engineers in five boxes, each with their own dashboard (virtualization, app, network, storage, service desk); speech bubbles "not us."
- 3D: five separate desks connected only by a phone line.
- 2D: stopwatch "MTTInn: measured locally; no benchmark" running.
- Nurse inset writing vitals on a glove.
- Metric: "Up to $1M per hour lost charges, large hospital (ESTIMATE) [C-78]."

**UC1-4 Cloud Control + outcome: one investigation**
- AI Canvas wall (GA, US): ThousandEyes EHR test widget (failing from some sites), topology green, Intersight and Nexus Dashboard widgets, Splunk logon-duration panel (requires Splunk Cloud 10.5+ US AWS).
- Domains turn green one by one with evidence; storage path turns amber and is circled.
- 3D: the five desks slide together around one wall.
- 2D: "MODELED: one investigation instead of five consoles"; Deep Reasoning chip CA (beta; confirm).
- Charge nurse receives one status message.

### Use case 2: IoMT and medical device security plus visibility

**UC2-1 Setting: post-surgical unit, night**
- Patient room with smart infusion pump on auto-programming; nurse station with central monitor.
- 3D: pump with a thin green line to the drug library server and EHR.
- 2D: device count callout "10 to 15 devices per bed [F-23]."
- People: patient asleep, night nurse.

**UC2-2 Trigger: unusual connection pattern**
- Abstract amber dotted line from a pump-segment address toward an unfamiliar server (no technique shown).
- 3D: pump glows amber; SOC inset.
- 2D: three cards that disagree: inventory "pump," CMMS "retired," MDS2 "older OS, no agent."
- Metric: "75% of 200,000 pumps analyzed had known security gaps (VENDOR-REPORTED) [C-24]."

**UC2-3 Today: blunt ACL at 2 a.m.**
- NetOps types an emergency ACL; biomed on the phone; whole pump segment drops to standalone.
- 3D: every pump on the floor turns amber; two nurses double-checking at a bedside.
- 2D: "No tested rollback" stamp.
- Color: entire pump zone amber.

**UC2-4 Cloud Control + outcome: scoped and approved**
- AI Canvas with Splunk ES detection, Identity (ISE) card, topology snippet; Agentic Workflow proposal; approval modal with biomed plus network approvers (L3).
- "Executed in: ISE" chip; only the addresses involved are restricted.
- 3D: three pumps outlined, the rest green.
- 2D: "MODELED: biomed and SOC review the same evidence." Workflow GA; run-from-canvas CA (beta).

### Use case 3: Ransomware resilience and downtime procedures

**UC3-1 Setting: regional health system at night**
- Hospital tower, a second hospital, clinics, and the data center on a 3D map; ambulance en route.
- 3D: estate topology lines all green.
- 2D: compact map with region boundaries.
- People: paramedics, SOC analyst on night shift.

**UC3-2 Trigger: widespread detections**
- Multiple abstract amber alerts across file servers and an identity server; no technique detail.
- 3D: amber glyphs on data center racks.
- 2D: HICS activation banner; downtime clock starts "T+00:00 (illustrative timeline)."
- Metric: "Detected internally: 41% of ransomware cases [S-9]."

**UC3-3 Today: shut it all off**
- CIO pulls a giant lever labeled "internet and tunnels"; the whole estate goes red, including phones and e-prescribing.
- 3D: ambulance turns around; runners carry paper; CD courier leaves imaging.
- 2D: downtime binder, paper MAR.
- Metric: "Kettering Epic 13 days; Lurie about 33 days; Synnovis about 6 months [C-62][C-69][C-67]."

**UC3-4 Cloud Control + outcome: segment-by-segment decisions**
- AI Canvas war room (GA, US) persisting across shifts (shift-change marker on the canvas timeline); Identity risk; Security Cloud Control; topology blast-radius view.
- Isolation steps appear as approval modals, one per segment, approved by the incident commander; "executed in" chips.
- 3D: infected segments red; segments shown clean with evidence stay green (modeled).
- 2D: sidebar "If internet is severed, plan out-of-band access to domain controllers (Analysis)." "MODELED: containment decided from one shared segment map." Paper downtime still visible on clinical floors.

### Use case 4: Clinical mobility and Wi-Fi reliability

**UC4-1 Setting: 5 East med-surg**
- Corridor, patient rooms, elevator lobby, stairwell; ceiling APs; nurses with voice badges.
- 3D: isometric floor with AP coverage bubbles.
- 2D: floor plan heat map.
- People: bedside nurse, elderly patient, charge nurse.

**UC4-2 Trigger: call drops near the elevators**
- Charge nurse on a badge call during a rapid response; waveform breaks up near the elevator.
- 3D: coverage bubble near the elevator shrinks and turns amber.
- 2D: "Badges drop calls on 5 East near the elevators" ticket.
- Metric: "Roam target under 100 ms; WPA3-SAE without FT about 174 ms [C-44][C-45]."

**UC4-3 Today: fix breaks the scanner**
- Wireless engineer enables 802.11r; a barcode scanner icon on the same SSID turns red.
- 3D: scanner at the med cart fails; nurse frowns.
- 2D: change request with three signatures (network, biomed, nursing informatics).
- Inset: RTLS screen says "pump on 5 East" with no room.

**UC4-4 Cloud Control + outcome: ranked before the call**
- AI Insights in Topology (GA) flags 5 East first; AI Assistant (GA) answers which APs show client issues; fix executed in Meraki or Catalyst Center.
- Spaces connector health tile (GA): "Connector health, not location."
- Future frame (dotted): Digital Twin CA (alpha) "validate before production."
- 2D: "MODELED: RF, authentication, and controller health seen together." Expanded Experience Metrics chip CA (beta).

### Use case 5: Imaging and PACS data movement

**UC5-1 Setting: community hospital CT and a stroke center**
- Community hospital CT suite; 30 miles away, comprehensive stroke center angio suite; WAN arc between them.
- 3D: two buildings linked by a glowing WAN arc.
- 2D: map with door-to-device target.
- People: CT tech, transfer nurse, neurointerventionalist.

**UC5-2 Trigger: stroke CTA crawls**
- CTA completes; packet stream crawls along the WAN arc, which is already thick with prefetch traffic.
- 3D: WAN arc amber and crowded with small "prior study" packets.
- 2D: phone icon "did it send?" twice.
- Metric: "Transfer door-to-device: 60 minutes for 50% or more [C-89]."

**UC5-3 Today: three teams, three logs**
- PACS admin, NetOps, VNA team each pointing at the other; cloud AI engine icon pulling every CT.
- 3D: three desks, three log screens.
- 2D: "a week of change requests" calendar flipping.
- Radiologist inset watching a STAT head CT stream slice by slice.

**UC5-4 Cloud Control + outcome: one path view**
- AI Canvas with SD-WAN link utilization and Layer 3 path (GA), ThousandEyes tests to AI orchestrator and cloud endpoint (GA), Nexus Dashboard, Hyperfabric, and Intersight widgets (GA); DICOM transfer logs in Splunk (onboarded).
- Approval modal: move prefetch window and add STAT QoS; "executed in: SD-WAN Manager."
- 3D: WAN arc clears; STAT packet travels in a priority lane.
- 2D: "MODELED: WAN, fabric, compute cleared in one view." "Images and DICOM headers stay out of Data Fabric."

### Use case 6: Telehealth, virtual care, and hospital-at-home

**UC6-1 Setting: a living room and a virtual care command center**
- Living room with hospital-at-home kit: tablet, pulse oximeter, blood pressure cuff, cellular hub. Command center with a wall of patient tiles.
- 3D: home cutaway connected by a long arc to the hospital.
- 2D: two-panel layout.
- People: patient, family member, virtual nurse.

**UC6-2 Trigger: video freezes; SpO2 tile goes gray**
- Video visit freezes twice; the patient presses the on-demand audio button.
- 3D: arc from home flickers gray near the cellular hub.
- 2D: tile grayed; timers "15 min unreachable process; 30 min emergency response [F-83]."
- Metric: "33.5% of over-threshold alarms traced to damaged devices or inadequate cellular [F-37]."

**UC6-3 Today: "could not reproduce"**
- Engineer staring at six possible causes on a whiteboard (patient cellular, hub, platform cloud, SSE, clinician Wi-Fi, VPN); none instrumented.
- 3D: path segments all gray.
- 2D: ticket closes "could not reproduce."

**UC6-4 Cloud Control + outcome: clear what you can see**
- AI Canvas with ThousandEyes tests to the video platform (GA) and Secure Access status (GA); hospital and platform segments turn green.
- Home segment stays gray with label "Outside Cisco visibility."
- 3D: arc green from hospital to platform, gray at the home end.
- 2D: "MODELED: platform and hospital paths cleared from one view." Virtual nurse escalation workflow unchanged.

### Use case 7: Multi-site WAN, M&A integration, and clinic connectivity

**UC7-1 Setting: Day 1 of an acquisition**
- Parent health system campus plus a newly acquired family medicine clinic with a different sign out front.
- 3D: acquired clinic floats slightly apart from the estate, connected by a dotted line.
- 2D: two org charts merging.
- People: network engineer, security engineer, clinic front desk.

**UC7-2 Trigger: what is on that network?**
- Discovery reveals overlapping 10.x addressing, a flat VLAN with printers, cameras, and an X-ray unit, and open remote desktop to the internet.
- 3D: flat red-amber zone inside the clinic with all devices in one bubble.
- 2D: overlapping subnet bars.
- Metric: "43.5% of 2025 deals involved a distressed party [C-75]."

**UC7-3 Today: separate tools, slow circuits**
- Spreadsheets of IP ranges; a circuit order calendar measured in weeks; business pressure for SSO and EHR access.
- 3D: clinic still floating apart; storm cloud over a single circuit.
- 2D: "weeks" stamp on the circuit order.

**UC7-4 Cloud Control + outcome: same inventory, same topology**
- Tenant group and Environments (GA) bring the clinic's Meraki org into view; Layer 3 topology shows its subnets next to the parent's (operator spots overlap); Security Cloud Control and Identity (GA); Cisco IQ lifecycle card (GA).
- Clinic stays behind a firewall icon until baseline is met; SD-WAN edge with broadband plus LTE provisioned in SD-WAN Manager.
- 3D: clinic docks into the estate; dotted line becomes solid.
- 2D: "MODELED: acquired site appears in the same inventory." Note: "one ThousandEyes and one Security tenant per tenant group [K-3]."

### Use case 8: Identity, zero trust, and clinician access

**UC8-1 Setting: hallway workstation and the IAM team**
- Hospital corridor with a badge-tap workstation outside a patient room; IAM team office.
- 3D: badge reader glowing on the workstation.
- 2D: login timeline bar.
- People: hospitalist, IAM engineer, SOC analyst.

**UC8-2 Trigger: fragmented identities**
- A vendor shared account with no MFA; leavers' accounts still active; impossible-travel alerts for a physician across merged hospitals.
- 3D: three directory towers (one per legacy hospital) with amber lights.
- 2D: three identity cards for one physician.
- Metric: "Reconnect 29.3 s to 8.9 s with badge tap [C-77]."

**UC8-3 Today: the locker and the envelope**
- Physician walks to her locker for a second factor; in the ED, a charge nurse opens a sealed break-glass envelope during a directory outage.
- 3D: walking path from workstation to locker drawn as a long dotted line.
- 2D: "every action attributed to a shared emergency identity."

**UC8-4 Cloud Control + outcome: one identity view**
- Cisco Identity (GA) card showing Okta, ISE, and AD sources together with posture and risk (note: non-Cisco sources need Duo Advantage+ or ISE Advantage+); Splunk ES detection in the same canvas.
- Approval modal: disable stale vendor account and require MFA; "executed in: identity provider."
- 3D: three directory towers connect with lines into one panel.
- 2D: "MODELED: identity risk and network detections in one investigation." Break-glass envelope remains in the ED (still required).

### Use case 9: Compliance, audit, and data governance

**UC9-1 Setting: compliance office**
- Desk with an old network diagram pinned to a corkboard, four inventory printouts that disagree.
- 3D: corkboard and printouts as physical props.
- 2D: four inventory counts in different colors.
- People: compliance officer, network engineer, nurse manager.

**UC9-2 Trigger: "show me the ePHI network map"**
- An email request for a current network map and evidence that the pump segment was isolated on a given date.
- 3D: calendar page flips to a past date.
- 2D: NPRM callout "asset inventory, network map, 72-hour restore (proposed, not final) [C-13]."

**UC9-3 Today: screenshots and binders**
- Engineer pastes firewall screenshots into a document; nurse manager finds a dead extension in a downtime binder.
- 3D: stack of printed screenshots grows.
- 2D: "Audit evidence cycle time: no benchmark (Gap)."

**UC9-4 Cloud Control + outcome: query, do not assemble**
- Inventory and Layer 3 Topology (GA) as map inputs; audit log (GA); Machine Data Lake and Catalog (GA, listed regions) for retained telemetry on the date in question; ServiceNow integration (GA).
- 3D: the corkboard diagram dissolves into a live topology; printouts fold into one panel.
- 2D: "MODELED: evidence queried rather than assembled." Caption: "HIPAA alignment is the customer's responsibility [K-29]." People still annotate ePHI flows.

### Use case 10: AI workload delivery

**UC10-1 Setting: ambulatory clinic, Monday morning**
- Exam rooms with ambient scribes running; physicians moving between rooms; ceiling APs.
- 3D: audio arcs rising from each exam room toward the internet edge.
- 2D: clinic floor plan.
- People: family physician, resident, patient.

**UC10-2 Trigger: notes stop generating**
- Note spinners appear on several workstations at once.
- 3D: audio arcs go amber at the vendor end.
- 2D: "Scribe notes delayed" banner.
- Metric: "2026 scribe vendor outages: 1 h 35 min to 2 h 10 min [A-39][A-40][A-41][A-42]."

**UC10-3 Today: two hours on the wrong side**
- Network team checks Wi-Fi and the edge for two hours; vendor status page later names an upstream model provider.
- 3D: engineers crawling the hospital side with flashlights.
- 2D: resident pastes a case into a consumer chatbot (screen blurred); "17% admitted using an unauthorized AI tool [A-55]."

**UC10-4 Cloud Control + outcome: clear the hospital side, govern the AI**
- AI Canvas: ThousandEyes path to vendor endpoint (GA), exam-room Wi-Fi green (GA), Agent Observability with Tokenomics (GA); upstream provider gray.
- AI Defense (GA) discovery card flags unsanctioned AI apps; runtime guardrail shield.
- 3D: hospital side lights green; vendor end amber; upstream gray.
- 2D: "MODELED: hospital side cleared in one view; escalate to vendor with evidence." Physician review of the note remains the clinical control.

---

## 4.5 Suggested object library for 3D and 2D

Each object lists its look, states, and the scenes that use it. All objects support green, amber, red, gray, and (where relevant) blue states.

| Object | Description (3D) | 2D equivalent | States / notes | Used in |
|---|---|---|---|---|
| Voice badge | Small clip-on badge with a speaker grille and status LED | Badge icon with signal bars | LED color follows state; waveform overlay for calls | FAC-2, UC4 |
| Clinician ID badge and tap reader | Proximity badge on a lanyard; reader puck on a workstation | Badge plus reader icon | Tap animation; amber when SSO slow | UC1, UC8 |
| Workstation on wheels | Cart with monitor, keyboard, scanner, battery | Laptop-on-cart icon | Spinner overlay for slow EHR | UC1, FAC-2 |
| Hallway shared workstation | Wall-mounted thin client with badge reader | Monitor icon | Login timeline bar | UC8 |
| Infusion pump | Pole-mounted pump with channel display and bag | Pump icon | Green line to drug library; amber when isolated; "manual verify" tag | SEC-1, SEC-4, SEC-5, UC2 |
| Bedside monitor and central station | Wall monitor with waveform; nurse-station screen with tiles | Waveform tile | Gray tile when disconnected | UC2 |
| CT gantry | Ring gantry, table, control room console behind glass | CT icon | Study packet emitter | FAC-4, AI-2, UC5 |
| PACS reading workstation | Dual diagnostic monitors, worklist, headset | Reading station icon | Worklist row with AI flag | AI-2, UC5 |
| IDF rack | Two-post rack, access switches with PoE LEDs, patch panel, UPS, red critical-branch outlet | Rack icon | Port groups change color; inventory card pops out | FAC-3, SEC-2 |
| Ceiling access point | Disc-shaped AP on a ceiling tile | AP icon with coverage bubble | Bubble size and color for coverage | FAC-2, UC4, AI-1 |
| Nurse call dome light and pillow speaker | Dome light over door; bedside pillow speaker | Bell icon | System-event health only | FAC-2, FAC-6 |
| RTLS tag | Small tag on equipment | Tag icon | Caption when showing room-level limits | UC4 |
| BMS controller | Gray panel in a mechanical room | Gear icon | System events only | FAC-6 |
| Access-control door reader | Door with reader | Lock icon | System events only | FAC-6 |
| SD-WAN edge | Small wall or rack appliance with LTE antenna | Router icon with two transport lines | Fiber red / LTE green failover | FAC-5, UC7 |
| Data center rack row | Row of server and fabric racks | Rack row icon | Intersight and Nexus Dashboard labels | UC1, UC5 |
| GPU rack | Dense rack with liquid-cooling manifolds, soft light | Rack with lightning icon | Always secondary or out of focus in AI scenes | AI-6, UC10 |
| Unified Edge chassis | Compact chassis in a clinic or hospital closet | Small chassis icon | On-prem inference label | AI-2 |
| AI Canvas war-room wall | Large curved wall display with widgets and a shared timeline | Canvas board with widget cards | GA (US) chip; shift-change markers; CA chips on beta widgets | SEC-3, AI-4, all UC-4 scenes |
| Approval modal | Floating blue panel: proposer, proposed change, approvers required, trust level L3, "executed in" target, Approve / Reject buttons | Blue dialog card | Blue until approved; never skipped for clinical-system changes | SEC-4, AI-5, UC2, UC3, UC5, UC8 |
| "Executed in" chip | Small tag naming the domain controller | Text pill | Always present when a change happens | SEC-5, UC2 to UC8 |
| Status chip | Pill reading GA, CA (beta/alpha), or Roadmap, plus "US" for Cloud Control | Same | Green outline / amber outline / dotted gray | Every Cisco panel |
| Topology map | Glowing node-and-line network projected over buildings | Network diagram | Layer 3 labels; AI Insights ranking badges | SEC-2, FAC-1, UC7 |
| Machine Data Lake cylinder | Translucent cylinder labeled "Machine data" with incoming streams | Database icon | Never labeled "clinical" | FAC-6, AI-3 |
| Two-lane data path | Parallel lanes: "Clinical PHI" and "Machine data" with a closed gate | Two arrows with a gate | Gate glows blue | AI-3 |
| Downtime clock | Wall clock with per-system rows | Timeline bar | "Illustrative timeline" caption | SEC-6, UC3 |
| Stopwatch (proposed KPI) | Small stopwatch hologram | Stopwatch icon | Caption "measured locally; no industry benchmark" | SEC-1, SEC-3, AI-4, UC1 |
| MODELED watermark | Faint diagonal stamp | Same | Required on every Phase 2 outcome | All Phase 2 frames |
| Ambulance | Ambulance with light bar | Ambulance icon | Diversion path animation | FAC-1, UC3 |
| Home RPM kit | Tablet, pulse oximeter, BP cuff, cellular hub on a side table | Kit icon | Gray when outside visibility | UC6 |
| Downtime binder and paper MAR | Red binder, printed MAR sheets | Binder icon | Shown in every downtime frame | UC3, UC9 |
| Break-glass envelope | Sealed envelope in a locked box | Envelope icon | Still present in Phase 2 frames | UC8 |
| CD courier | Person with a CD case leaving imaging | Courier icon | Today frames only | UC3 |
| Scribe device | Phone or small mic on an exam counter | Mic icon | Audio arc to "vendor cloud (BAA)" | AI-1, UC10 |
| Cloud icons | "Scribe vendor cloud (BAA)," "Video platform," "Upstream model provider" | Cloud icons | Upstream provider always gray | AI-1, AI-4, UC6, UC10 |
| AI Defense shield | Shield badge on AI data paths | Shield icon | GA chip | AI-5, UC10 |
| Tokenomics card | Small cost card on Agent Observability panel | Card | GA chip | AI-5, UC10 |
| Spaces connector tile | Tile with connector health status | Tile | Caption "Connector health, not location" | FAC-6, UC4 |
| Biomed bench | Workbench with spare pumps, CMMS screen, MDS2 binder | Bench icon | Tablet showing shared canvas | SEC-4 |
| Storm cloud | Rain and lightning over a building | Weather icon | Triggers circuit failure | FAC-5, UC7 |
