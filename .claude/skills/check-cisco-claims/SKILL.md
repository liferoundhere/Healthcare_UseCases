---
name: check-cisco-claims
description: "Review any text that names a Cisco capability (Cloud Control, AI Canvas, Data Fabric, Splunk, Machine Data Lake, Federated Search, AI Defense, Spaces, ISE, Catalyst Center, Meraki) for overclaims before it ships. Use when writing or reviewing Phase 2 content, \"With Cloud Control\" steps, narration, tiles, slides, talk tracks or customer-facing copy, and when asked \"is this accurate\", \"can we say this\", \"check the claims\", or \"is that GA\"."
---

# Check Cisco claims

This material is shown to healthcare executives by a Cisco account team. One overclaim about availability, autonomy or HIPAA costs more trust than the whole storyboard earns. Check before it ships, every time.

## The canonical list

The 20 overclaim guardrails live in the pack, not here, so there is one copy to maintain:

- Condensed, with citations: `docs/part-b-phase2.md`, section **3.5 Overclaim guardrails**.
- Full version with sources: `research/05-cisco-cloud-control-data-fabric.md`, section **E) Claims that must NOT be made**.
- Capability status: the same brief, sections **A** (Cloud Control matrix), **B** (Data Fabric matrix) and **C** (connected products).

Read section 3.5 before reviewing:

```bash
grep -n "^## 3.5" -A 26 docs/part-b-phase2.md
```

## Procedure

1. **List every Cisco capability the text names.** For each, find its row in research 05 and confirm the status tag (GA, CA with the source's word, or Roadmap). Text that shows a capability without its tag fails. Roadmap items may appear only in a clearly labeled future frame, never in the main action.
2. **Read the text against the 20 guardrails**, one by one. Do not rely on memory of the list.
3. **Run the phrase scan** over what changed. It finds the usual wording, not every way of saying it:

   ```bash
   grep -rnEi "globally available|clinical data fabric|fully autonomous|autonomous(ly)? remediat|free forever|HIPAA[- ]certified|HIPAA compliant|no splunk license|object storage cost|replaces? (meraki|catalyst center|sd-wan manager|nexus dashboard|intersight|the ehr|your siem)|executed by cloud control|[0-9]+ ?% (faster|fewer|less|reduction|lower|improvement|better)" app/src/scenes.ts showcase/src
   ```

   The paths at the end are the story content. Swap in whatever file you are reviewing. Read each hit in context. A hit inside a caveat that tells the reader not to say it ("Do not call the platform HIPAA certified") is correct and stays; on 13 November 2026 every hit in the story content was a caveat of that kind. The guardrail list itself in `docs/part-b-phase2.md` matches by design, so do not scan that section.
4. **Check the outcome language.** Every "With Cloud Control" outcome is Modeled: qualitative, labeled, no percentage, no borrowed customer metric. Clock values are illustrative and say so.
5. **Check the change path.** Wherever something changes on the network: a named person approves first, the change executes in the domain controller (Meraki, Catalyst Center, ISE, SD-WAN Manager, Security Cloud Control), and the audit record shows who approved.
6. **Report** each finding with the file and line, the guardrail number it breaks, and a corrected wording. If the text is clean, say which checks you ran.

## The ones that get broken most

| Tempting line | Why it fails | Say instead |
|---|---|---|
| "Cloud Control is generally available" | GA is United States only, from 25 August 2026 | "Generally available in the US" |
| "Cloud Control fixes it automatically" | No autonomous remediation in clinical networks; supported framing is human-approved | "The agent proposes; a named person approves; it executes in ISE" |
| "The change is reversible" | Cited rollback is for agent versions only | Describe the tested rollback plan the customer owns, or drop the word |
| "Cuts time to resolution by 60%" | No Cisco healthcare metric exists | "Modeled: one investigation instead of five consoles" |
| "Data Fabric brings clinical and network data together" | Machine data only; not the EHR, not a clinical repository | "Machine data: network, security, identity, device connectivity, EHR performance telemetry" |
| "Spaces shows where the patient is" | In Cloud Control, Spaces is connector health | "Connector health, not location" |
| "HIPAA compliant platform" | HIPAA alignment is on the customer | "HIPAA alignment remains the customer's responsibility" |
| "No Splunk license needed" | True only for some surfaces; Splunk data in AI Canvas needs Splunk Cloud 10.5+ on US Commercial AWS | State the specific path and its requirement |
| "One console replaces five" | Cloud Control does not replace the domain controllers | "One shared investigation across the consoles that stay in place" |

## When the facts may have moved

Status tags and availability change. The pack was verified on 12 November 2026. If the user says something has since shipped, or the text depends on a status you cannot confirm from research 05, do not edit the tag from memory. Use `update-research` to re-verify against a current Cisco or Splunk source and record both the old and new wording.
