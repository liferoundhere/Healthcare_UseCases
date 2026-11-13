// AI use case AI2: Patient access agents. One data file: page copy, node placement and the inline narrative.
// Narrative source: experience/src/story/ai.ts. Facts and sources: research/data/ai-use-cases.json. See atlas/AUTHORING.md.
export default {
  id: 'ai-access',
  code: 'AI2',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'AI',
  pillars: [ 'AI', 'Security' ],
  short: 'Patient access agents',
  name: 'When the phone agent cannot reach the EHR',
  setting: 'A patient on the phone, the contact center and agent vendors, and the EHR scheduling interface',
  situation: 'A voice agent answers scheduling, refill and billing calls at any hour and depends on a chain of cloud services the hospital does not run.',
  personas: [ 'Patient access director', 'Contact center manager', 'EHR integration lead', 'CISO', 'Clinic operations manager' ],
  vision: 'A booking the agent confirmed but the EHR rejected is caught the same day, and the patient access director approves the reroute to staff before call routing changes (modeled).',
  legacy: {
    banner: 'A voice agent confirms an appointment while the write to the schedule fails. The containment dashboard counts the call as resolved, and the patient arrives for a visit that does not exist.',
    strip: 'Today: carrier, contact center, models and EHR interface have four owners [H]',
    who: 'Overnight calls (sim)',
    silos: [
      [ 'Carrier portal', 'trunk up or down [H]', 'p', 'phone' ],
      [ 'Contact center console', 'routing and containment [H]', 'p', 'cloud' ],
      [ 'Agent vendor dashboard', 'calls marked resolved [H]', 'p', 'chat' ],
      [ 'EHR interface error queue', 'write-back errors [H]', '', 'server' ],
      [ 'Model status page', 'speech and language models [H]', 'p', 'gpu' ],
      [ 'Front desk complaints', 'found at arrival [H]', '', 'doc' ]
    ],
    gaps: [
      'Nothing reconciles agent confirmations against EHR write-back responses [H]',
      'Identity checks and transfer rules sit in the vendor console, outside change control [H]',
      'Agent service accounts often hold broad EHR scopes [H]',
      'Transfers to staff lose the session context [H]',
      'Call volumes and containment are vendor-reported; no independent audit was found'
    ],
    big: [ '>50%', 'of the time knowledge-based caller authentication is bypassed, per one voice-security vendor [Pindrop 2026, vendor-reported]' ],
    recap: 'The caller hears a confirmation, the schedule has no appointment, and the dashboard counts the call as resolved.'
  },
  tobe: {
    banner: "AI Canvas would show the call path, the agent's steps and the EHR interface in one investigation. Rerouting calls to staff or narrowing the agent's permission waits for the patient access director.",
    strip: 'AI Canvas, Agent Observability, ThousandEyes, Splunk',
    console: {
      title: 'Cloud Control | the call path',
      body: 'Agent steps and tool calls sit next to EHR write-back responses, with path tests to the model and EHR endpoints. Routing changes run in the contact center platform after approval.',
      foot: 'Needs the agent vendor to expose traces',
      rows: [
        [ 'Confirmations checked against the EHR', 'not reconciled', 'joined in one view', 0, 'database' ],
        [ 'Where the delay is', 'four status pages', 'path tests by hop', 0, 'eye' ],
        [ 'Failed write-backs', 'found at the front desk', 'flagged the same day', 0, 'bell' ],
        [ 'Reroute to staff', 'vendor console', 'approved by a person', 1, 'person' ],
        [ 'Agent script and accuracy', 'vendor', 'vendor', 2, 'lock' ]
      ]
    },
    stays: "The agent's script, voice, accuracy and identity-verification method stay with the agent vendor and patient access; EHR scopes stay with the EHR team.",
    recap: [
      'One investigation shows where bookings stop between the agent and the schedule.',
      'Outcomes are modeled and depend on the agent vendor exposing traces. Accuracy and tone stay with the vendor.'
    ]
  },
  hops: {
    legacy: [
      [ 'Patient call', 'carrier trunk', 'phone' ],
      [ 'Contact center', 'vendor console', 'cloud' ],
      [ 'Voice agent', 'says confirmed', 'chat' ],
      [ 'EHR scheduling', 'write fails silently', 'server' ]
    ],
    tobe: [
      [ 'Agent Observability', 'steps and tool calls', 'database' ],
      [ 'ThousandEyes', 'voice and API paths', 'eye' ],
      [ 'AI Canvas', 'one investigation', 'canvas' ],
      [ 'Approval', 'patient access director', 'person' ]
    ]
  },
  pathNote: { legacy: 'A confirmation with no appointment behind it [H]', tobe: 'Agent steps joined to EHR write-backs' },
  outcomes: {
    legacy: [
      [ '2.2M+', "calls handled by one health system's voice agent since 2024 [HIT Consultant 2026, vendor-reported]", 'S' ],
      [ '40%', 'AI containment reported by one health network [Webex Blog 2026, vendor-reported]', 'S' ],
      [ '>50%', 'of the time knowledge-based caller authentication is bypassed [Pindrop 2026, vendor-reported]', 'S' ]
    ],
    tobe: [
      [ 'Same day', 'failed bookings caught before the visit (modeled)', 'H' ],
      [ '1 investigation', 'call path, agent steps and EHR interface (modeled)', 'H' ],
      [ '1 approval', 'before calls are rerouted to staff (modeled)', 'H' ]
    ]
  },
  kpis: [
    'Confirmed bookings with no EHR appointment',
    'Time to detect a write-back failure',
    'Calls transferred to staff with context',
    'EHR scopes held by the agent service account'
  ],
  ask: 'How would you find out that your phone agent confirmed appointments last night that never reached the schedule?',
  tiles: [
    { l: 'Calls handled by one voice agent since 2024 [HIT Consultant 2026, vendor-reported]', a: '2.2M+', b: '2.2M+', tag: 'S' },
    { l: 'AI containment at one health network [Webex Blog 2026, vendor-reported]', a: '40%', b: '40%', tag: 'S' },
    { l: 'Caller authentication bypassed [Pindrop 2026, vendor-reported]', a: '>50%', b: '>50%', tag: 'S' },
    { l: 'Failed bookings found', a: 'At the front desk', b: 'The same day', tag: 'H' },
    { l: 'Confirmations checked against the EHR', a: 'No', b: 'Joined in one view', tag: 'H' },
    { l: 'Reroute to staff', a: 'Vendor console', b: 'Approved by a person', tag: 'H' }
  ],
  scene: {
    decor: 'home',
    zoneLabels: { house: 'Patient calling', net: 'Vendor cloud services', hosp: 'Hospital' },
    pos: {
      caller: [ 112, 150 ],
      ccx: [ 330, 150 ],
      agent: [ 330, 296 ],
      staff: [ 520, 150 ],
      desk: [ 660, 150 ],
      sched: [ 600, 296 ],
      obs: [ 110, 418 ],
      canvas: [ 280, 418 ],
      te: [ 450, 418 ],
      appr: [ 620, 418 ]
    }
  },
  narr: {
    subtitle: "A voice agent answers scheduling, refill and billing calls around the clock. It depends on the contact center platform, a speech model, identity checks and the EHR's scheduling interface all working together.",
    caveat: 'Call volumes and containment rates here are vendor-reported, with no independent audit found. The Cisco story is a hypothesis about visibility and approval, and the outcome is modeled.',
    nodes: [
      { id: 'caller', icon: 'phone', title: 'Patient calling', sub: { exec: 'Books by phone', dir: 'At any hour', eng: 'Carrier trunk, SIP' }, hidden: false, r: 30 },
      {
        id: 'ccx',
        icon: 'cloud',
        title: 'Contact center platform',
        sub: { exec: 'Routes every call', dir: 'Vendor console', eng: 'SIP trunks, routing rules' },
        hidden: false,
        r: 30
      },
      {
        id: 'agent',
        icon: 'chat',
        title: 'Voice agent',
        sub: { exec: 'Answers routine calls', dir: 'Run by a vendor', eng: 'Speech and language models' },
        hidden: false,
        r: 30
      },
      {
        id: 'sched',
        icon: 'server',
        title: 'EHR scheduling interface',
        sub: { exec: 'Where bookings land', dir: 'EHR team', eng: 'API write-back, error queue' },
        hidden: false,
        r: 30
      },
      {
        id: 'staff',
        icon: 'people',
        title: 'Staffed access queue',
        sub: { exec: 'People who take over', dir: 'Patient access team', eng: 'Transfers lose session context' },
        hidden: false,
        r: 30
      },
      {
        id: 'desk',
        icon: 'building',
        title: 'Clinic front desk',
        sub: { exec: 'Meets the patient', dir: 'Clinic staff', eng: 'Reads the schedule' },
        hidden: false,
        r: 30
      },
      {
        id: 'canvas',
        icon: 'canvas',
        title: 'AI Canvas',
        sub: { exec: 'One investigation', dir: 'Call path and interface', eng: 'Calls joined to write-backs' },
        hidden: true,
        r: 30
      },
      {
        id: 'obs',
        icon: 'database',
        title: 'Agent Observability',
        sub: { exec: 'What the agent did', dir: 'Each step and tool call', eng: "Needs the vendor's traces" },
        hidden: true,
        r: 30
      },
      {
        id: 'te',
        icon: 'eye',
        title: 'ThousandEyes',
        sub: { exec: 'Where the delay is', dir: 'Voice and API paths', eng: 'Tests to model, EHR endpoints' },
        hidden: true,
        r: 30
      },
      {
        id: 'appr',
        icon: 'person',
        title: 'Patient access director',
        sub: { exec: 'Decides on rerouting', dir: 'Owns the patient line', eng: 'L3: execute after approve' },
        hidden: true,
        r: 30
      }
    ],
    zones: [
      { id: 'house', label: 'Patient calling', hidden: false, cisco: false },
      { id: 'net', label: 'Vendor cloud services', hidden: false, cisco: false },
      { id: 'hosp', label: 'Hospital', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true }
    ],
    links: [
      { id: 'caller-ccx', a: 'caller', b: 'ccx', bend: 0 },
      { id: 'ccx-agent', a: 'ccx', b: 'agent', bend: 0 },
      { id: 'agent-sched', a: 'agent', b: 'sched', bend: 0 },
      { id: 'sched-desk', a: 'sched', b: 'desk', bend: 0 },
      { id: 'ccx-staff', a: 'ccx', b: 'staff', bend: 0.12 },
      { id: 'obs-agent', a: 'obs', b: 'agent', bend: 0 },
      { id: 'te-sched', a: 'te', b: 'sched', bend: 0.1 },
      { id: 'canvas-obs', a: 'canvas', b: 'obs', bend: 0 },
      { id: 'canvas-te', a: 'canvas', b: 'te', bend: 0 },
      { id: 'canvas-appr', a: 'canvas', b: 'appr', bend: 0.1 },
      { id: 'appr-ccx', a: 'appr', b: 'ccx', bend: 0.1 }
    ],
    steps: [
      {
        phase: 'today',
        title: 'Routine calls move to an agent',
        say: {
          exec: 'The agent takes routine calls at any hour, so patient access now depends on a chain of cloud services the hospital does not run.',
          dir: 'The telephony carrier, contact center platform, speech and language models and the EHR interface each have a different owner and status page.',
          eng: 'A call crosses SIP trunks, the contact center platform, speech-to-text, a language model and EHR API calls; added latency in any hop is audible to the caller.'
        },
        l: { 'caller-ccx': 'ok', 'ccx-agent': 'ok', 'agent-sched': 'ok', 'sched-desk': 'ok' },
        facts: [
          { v: '2.2M+', l: "Patient calls handled by MUSC Health's voice agent since its 2024 launch", s: 'HIT Consultant 2026, vendor-reported' },
          { v: '160,000+', l: "Patient calls a month handled by WellSpan Health's voice agent", s: 'WellSpan Health 2026, vendor-reported' }
        ]
      },
      {
        phase: 'today',
        title: 'A booking that never reaches the schedule',
        say: {
          exec: 'A caller can hear a confirmation while the write to the schedule fails silently. The patient then arrives for an appointment that does not exist.',
          dir: 'Containment dashboards would count that call as resolved, so the failure surfaces as complaints, not as an alert.',
          eng: "Nothing reconciles the agent's confirmations against EHR write-back responses or the interface error queue."
        },
        n: { sched: 'unknown', desk: 'warn' },
        l: { 'agent-sched': 'unknown', 'sched-desk': 'warn' },
        callout: { node: 'desk', text: 'The patient has a confirmation. The schedule has no appointment.' },
        clock: { label: 'Time before anyone notices', mode: 'run' }
      },
      {
        phase: 'today',
        title: 'Identity and handoff are the weak points',
        say: {
          exec: 'A caller who is not who they claim to be can reach refill or billing details, and a distressed caller can loop instead of reaching a person.',
          dir: "Identity checks and transfer rules are configured in the vendor's console, outside the hospital's change control.",
          eng: 'Agent service accounts often hold broad EHR scopes, and transfers lose context when the staffed queue and the agent platform do not share session data.'
        },
        n: { caller: 'unknown', agent: 'warn', staff: 'warn' },
        l: { 'caller-ccx': 'unknown', 'ccx-staff': 'down', 'agent-sched': 'warn' },
        label: { caller: 'Identity not verified' },
        facts: [ { v: '>50%', l: 'Share of the time knowledge-based caller authentication is bypassed, per one voice-security vendor', s: 'Pindrop 2026, vendor-reported' } ]
      },
      {
        phase: 'cisco',
        title: 'One investigation across the call path',
        say: {
          exec: "Same silent failure. This time one investigation shows the call path, the agent's steps and the EHR interface together, so the team sees where bookings stop.",
          dir: 'AI Canvas would combine contact center data (Webex Contact Center where deployed), ThousandEyes tests to the model and EHR endpoints, and Splunk logs.',
          eng: 'Agent Observability would trace each agent step and tool call, ThousandEyes would measure voice and API paths, and Splunk would join write-back errors to call records.'
        },
        show: [ 'cc', 'canvas', 'obs', 'te' ],
        n: { caller: 'ok', agent: 'ok', staff: 'ok', desk: 'ok', sched: 'warn', canvas: 'ok', obs: 'ok', te: 'ok' },
        l: {
          'caller-ccx': 'ok',
          'ccx-staff': 'idle',
          'agent-sched': 'warn',
          'sched-desk': 'ok',
          'obs-agent': 'ok',
          'te-sched': 'warn',
          'canvas-obs': 'ok',
          'canvas-te': 'ok'
        },
        label: { caller: '' },
        callout: { node: 'obs', text: 'The agent said confirmed. The scheduling interface returned an error.' },
        facts: [ { v: '40%', l: 'AI containment reported by Community Health Network on its contact center', s: 'Webex Blog 2026, vendor-reported' } ],
        clock: { label: '', mode: 'hide' }
      },
      {
        phase: 'cisco',
        title: 'A person approves the failover',
        say: {
          exec: "Before calls are rerouted to staff or the agent's permissions are narrowed, the patient access director approves the change and sees who is affected.",
          dir: 'The Actions queue would hold the routing change for approval and the Audit log would keep the record.',
          eng: "The approved change runs in the contact center platform's routing configuration; Duo would verify the approver."
        },
        show: [ 'appr' ],
        n: { appr: 'pending' },
        l: { 'canvas-appr': 'pending' },
        modal: {
          title: 'Reroute calls from agent to staff',
          lines: [
            "Send scheduling calls to the staffed queue and suspend the agent's booking permission until write-back errors clear.",
            'Approver: Patient access director',
            'Trust level: L3, execute after approve',
            'Executes in: Contact center platform routing (Webex Contact Center where deployed)'
          ],
          button: 'Approve'
        }
      },
      {
        phase: 'cisco',
        title: 'Modeled: failed bookings caught the same day',
        say: {
          exec: "Modeled outcome: silent booking failures are caught the same day instead of at the front desk. The agent's accuracy and tone stay the vendor's to fix.",
          dir: 'The model assumes the agent vendor exposes traces and the EHR interface logs are searchable; many vendors do not expose both.',
          eng: 'This outcome is modeled, not measured. Third-party agent platforms are visible only through their telemetry exports and from network path tests.'
        },
        n: { appr: 'ok', staff: 'ok', sched: 'ok' },
        l: { 'canvas-appr': 'ok', 'appr-ccx': 'ok', 'ccx-staff': 'ok', 'agent-sched': 'off', 'te-sched': 'ok' },
        label: { agent: 'Booking paused' },
        chips: [ [ 'AI Canvas', 'GA (US)' ], [ 'Agent Observability', 'GA' ], [ 'ThousandEyes', 'GA (US)' ], [ 'Splunk', 'GA (US)' ] ]
      }
    ]
  }
};
