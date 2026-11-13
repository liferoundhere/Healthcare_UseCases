# Presenter guide

How to run the explainer in front of a healthcare customer. Twenty minutes is the default; cut or extend by choosing stories.

## Before you start

- Open `healthcare-cloud-control.html`, press **F** for full screen.
- Pick the audience with **1** (Executive), **2** (IT director) or **3** (Engineering). The caption and every label change with it.
- Press **N** once to see the presenter notes panel, then close it. It has the line for the other two audiences, the question to ask, and the caveat to say out loud.

## Before an account meeting

1. Choose the workspace in the top bar: Generic, NYU Langone or MSK. An account workspace adds a brief built from public sources and four use cases written for that account. They are hypotheses: say so, and let the customer correct them.
2. Pick the view. The 2D plan keeps the whole hospital on screen and is the default. Press **V** for the isometric model if you want more atmosphere.
3. Press **/** to find any story or platform block by name.

## During the meeting: capture what they say

On the closing beat of every story there is a question for the room. Under it, rate how much the problem hurts (1 to 5) and type what the customer said. It saves as you type, per account, in your browser.

## After the meeting: the account plan

Press **A**. The plan lists the rated stories in order, the building blocks they need (tick the ones the customer already has), how many are generally available, and suggested next steps. Copy it as Markdown into your notes, download it, or print it.

## A 20-minute run

| Minutes | What to show | What to land |
|---|---|---|
| 0 to 4 | **Start the story** (8 beats) | The hospital is one estate run from many rooms. When something breaks, people become the integration layer. Cloud Control connects the work; Data Fabric is the machine data underneath; agents propose and a person approves. |
| 4 to 9 | One **operating lens** that matches the room: network, security, clinical or workplace | The change is the operating model, not a product. Click the approval yourself. |
| 9 to 15 | One **use case** the customer named in discovery | Walk the Today beats slowly. Let them recognize their own bridge call. Then the Cloud Control beats. |
| 15 to 18 | **Explore the platform** (P) | Click two or three blocks. Show the status tags. Show "+ Announced" so nobody mistakes direction for delivery. |
| 18 to 20 | **Build a combination** (C) | Tick their two or three problems. Read the number of building blocks. Ask which they already own. |

## How each story is built

1. **Today** (amber). Any infrastructure, vendor-neutral. The rooms in the story are lit; the rest recede.
2. **With Cisco Cloud Control** (blue). The same event again. The deck above the hospital lights the building blocks in use.
3. **An approval.** Where a change could touch care, the story stops. Press Right or click Approve. Say who approves and where the change executes.
4. **The closing beat.** The combination with its availability, the question to ask the room, and the caveat.

## Which story for which conversation

| If the customer says | Open |
|---|---|
| "Our teams spend the first hour arguing whose problem it is" | `ehr` (EHR slow) or the `netops` lens |
| "We cannot see or segment our medical devices" | `iomt` (Medical devices), then `security` |
| "We are worried about ransomware and downtime" | `ransom` (Downtime), then the `secops` lens |
| "Nurses complain about badges and Wi-Fi" | `wifi` (Clinical Wi-Fi) |
| "We just bought a clinic or a hospital" | `wan` (Acquired clinic) |
| "Ambient AI is rolling out and we do not know who owns it" | `aiwork`, `ai`, then the `clinops` lens |
| "We are starting hospital at home" | `home` |
| "The surveyors are coming" | `compliance`, `identity` |
| "What about our offices and contact center?" | the `workops` lens |
| "We are putting cameras and virtual nurses in every room" | `ai-vision` |
| "Patients talk to an AI agent before they talk to us" | `ai-access` |
| "We want to run models on our own GPUs" | `ai-factory` |
| "Our sepsis alerts fire too often" | `ai-bedside` |
| "Agents are getting access to the EHR" | `ai-agents` |
| "Pathology is going digital" | `ai-pathology` |
| "Nobody can tell me what AI costs us" | `ai-cost` |
| "How is this different from another dashboard?" | The opening film beat 4, then the platform explorer |

## Say these out loud

The explainer shows them on screen. Saying them earns trust.

- Cloud Control is generally available in the United States only, since 25 August 2026.
- The Cloud Control outcomes shown are modeled. There is no published healthcare customer metric for Cloud Control yet.
- Data Fabric holds machine data: network, security, identity, device and system telemetry. The clinical record stays in the EHR.
- Your domain controllers stay the systems of record. Meraki, Catalyst Center, ISE and Splunk do not go away.
- Anything that can touch care waits for a named person.
- Customer numbers from other Cisco products (for example Dayton Children's, Community Health Network) are vendor-reported.

## Questions you will get

| Question | Where the answer is |
|---|---|
| "Is that generally available?" | Click the block in the platform explorer. Status and sources are on the card. |
| "Do we need Splunk?" | Explorer, Splunk block. Using your Splunk data in AI Canvas needs Splunk Cloud Platform 10.5 or later on US Commercial AWS. |
| "Is our data used to train models?" | Explorer, AI Canvas block. Training on AI Canvas and AI Assistant data is on by default per tenant; an Environment Admin can switch it off. |
| "Does it talk to Epic or our nurse call?" | Explorer, Hospital systems block. No native EHR, nurse call or RTLS connector was found; their machine data arrives through Splunk. |
| "Where is the source for that number?" | Press S, or N for the numbers on the current beat. |
| "What does it cost?" | Cisco states Cloud Control and AI Canvas are included with eligible Essential and Advantage subscriptions and reserves the right to change this. Confirm eligibility per product. |

## If something goes wrong

- A beat looks cramped: press **H** to hide the interface, or wheel to zoom.
- You lost your place: **Esc** goes home; the URL hash always holds the current story and beat.
- The projector is 4:3 or low resolution: the layout adapts down to 1280 x 720.
