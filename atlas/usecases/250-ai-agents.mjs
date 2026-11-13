// AI use case AI5: Agents in the EHR. One data file: page copy, node placement and the inline narrative.
// Narrative source: experience/src/story/ai.ts. Facts and sources: research/data/ai-use-cases.json. See atlas/AUTHORING.md.
export default {
  id: 'ai-agents',
  code: 'AI5',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'AI',
  pillars: [ 'AI', 'Security' ],
  short: 'Agents in the EHR',
  name: 'Every agent in the chart needs an identity',
  setting: 'The EHR, the agents that read and write it, and the vendors they come from',
  situation: 'Agents from the EHR vendor, revenue-cycle vendors and staff read and write clinical systems, and few hospitals can list them.',
  personas: [ 'CISO', 'Identity and access lead', 'EHR application director', 'AI governance chair', 'Revenue cycle director' ],
  vision: 'Every agent has an identity, an owner and a record of what it did, and suspending one takes an approval from security and the agent owner (modeled).',
  legacy: {
    banner: 'Agents built in the EHR, by revenue-cycle vendors and by staff read and write clinical systems. There is no single register of agents, owners, permissions and credentials.',
    strip: 'Today: agents arrive through three doors and share service accounts [H]',
    who: 'Overnight batch (sim)',
    silos: [
      [ 'EHR audit log', 'the API client, not the agent [H]', '', 'server' ],
      [ 'EHR vendor console', 'built-in agents [H]', 'p', 'chat' ],
      [ 'Revenue-cycle vendor portal', 'its own agent logs [H]', 'p', 'doc' ],
      [ 'Identity directory', 'service accounts [H]', '', 'key' ],
      [ 'Access review', 'people, not agents [H]', '', 'people' ],
      [ 'Department scripts', 'no central register [H]', '', 'gear' ]
    ],
    gaps: [
      'No single register of agents, owners, permissions and credentials [H]',
      'Scopes are granted per integration, not per task, and tokens are long-lived [H]',
      'The audit trail shows a service account, not which agent acted or why [H]',
      'Agent credentials are reviewed, if at all, at contract renewal [H]',
      'No healthcare survey of agent identities was found'
    ],
    big: [ '94.4%', 'prompt-injection success rate against language models in simulated medical-advice dialogues [JAMA Network Open 2025]' ],
    recap: 'An injected instruction acts with real access, and the audit log shows only a shared service account.'
  },
  tobe: {
    banner: 'Cisco Identity would list agents with their identities and reach, Agent Observability would trace what each one did, and Secure Access would apply policy per agent. A permission change waits for security and the agent owner.',
    strip: 'Cisco Identity, Agent Observability, AI Defense, Secure Access',
    console: {
      title: 'Cloud Control | agents and their reach',
      body: 'One register of agents with identities, systems reached and recent actions. Network-side blocks run in Secure Access; EHR-side permissions are changed by the EHR team in the vendor console.',
      foot: 'Agents embedded in the EHR are visible only through vendor logs',
      rows: [
        [ 'Register of agents', 'none', 'one list with owners', 0, 'badge' ],
        [ 'Who acted', 'a service account', 'a named agent with a trace', 0, 'database' ],
        [ 'Scope against task', 'not reviewed', 'flagged when exceeded', 0, 'key' ],
        [ 'Suspend an agent', 'vendor ticket', 'approved by two people', 1, 'people' ],
        [ 'Rules inside the EHR', 'EHR vendor, governance', 'EHR vendor, governance', 2, 'lock' ]
      ]
    },
    stays: "What agents may do inside the EHR, clinical sign-off rules and each vendor's agent design stay with the EHR vendor, the agent vendors and hospital AI governance.",
    recap: [
      'One register lists agents, their identities, the systems they reach and what they did.',
      'Outcomes are modeled. Guardrails reduce prompt-injection risk; they do not remove it.'
    ]
  },
  hops: {
    legacy: [
      [ 'Incoming document', 'hidden instruction', 'doc' ],
      [ 'Vendor agent', 'reads it as a task', 'chat' ],
      [ 'Service account', 'shared, broad scopes', 'key' ],
      [ 'EHR', 'logs the API client', 'server' ]
    ],
    tobe: [
      [ 'Cisco Identity', 'register of agents', 'badge' ],
      [ 'Agent Observability', 'traces and tool calls', 'database' ],
      [ 'Approval', 'security and owner', 'people' ],
      [ 'Secure Access', 'network-side block', 'lock' ]
    ]
  },
  pathNote: { legacy: 'The audit log shows a service account [H]', tobe: 'A named agent, a trace and an owner' },
  outcomes: {
    legacy: [
      [ '94.4%', 'prompt-injection success in simulated medical dialogues [JAMA Network Open 2025]', 'S' ],
      [ '109:1', 'machine to human identities, cross-industry [Palo Alto Networks 2026, vendor-reported]', 'S' ],
      [ '129', 'agent features listed in the Epic Agent Factory [Healthcare IT Today 2026]', 'S' ]
    ],
    tobe: [
      [ '1 register', 'of agents, owners and reach (modeled)', 'H' ],
      [ 'Suspended', 'a misbehaving agent, with a full record (modeled)', 'H' ],
      [ '2 approvers', 'security and the agent owner (modeled)', 'H' ]
    ]
  },
  kpis: [ 'Agents with a named owner', 'Agents on a shared service account', 'Time to suspend a flagged agent', 'Scopes wider than the task' ],
  ask: 'Could you list tonight every AI agent that can read or write your EHR, who owns each one, and what it did yesterday?',
  tiles: [
    { l: 'Prompt-injection success, simulated dialogues [JAMA Network Open 2025]', a: '94.4%', b: '94.4%', tag: 'S' },
    { l: 'Best agent success on 300 physician-written tasks [NEJM AI 2025]', a: '69.67%', b: '69.67%', tag: 'S' },
    { l: 'IT leaders running AI workflows with limited oversight [Qventus CIO report 2026, vendor-reported]', a: '55%', b: '55%', tag: 'S' },
    { l: 'Register of agents', a: 'None', b: 'One list', tag: 'H' },
    { l: 'Audit trail', a: 'Service account', b: 'Named agent and trace', tag: 'H' },
    { l: 'Permission change', a: 'Vendor ticket', b: 'Approved by two people', tag: 'H' }
  ],
  scene: {
    decor: 'agents',
    pos: {
      diy: [ 113, 136 ],
      svc: [ 113, 292 ],
      ehr: [ 325, 136 ],
      ehra: [ 325, 216 ],
      rcm: [ 620, 264 ],
      inj: [ 610, 130 ],
      cid: [ 110, 418 ],
      appr: [ 280, 418 ],
      sa: [ 450, 418 ],
      obs: [ 620, 418 ]
    }
  },
  narr: {
    subtitle: 'Agents built in the EHR, by revenue-cycle vendors and by staff now read and write clinical systems. Few hospitals can list them, their permissions or what they did last night.',
    caveat: 'No healthcare survey of agent identities and no red-team of an agent with live EHR write access was found; identity ratios are cross-industry and vendor-reported. Cisco capabilities here are hypotheses, and the outcome is modeled.',
    nodes: [
      { id: 'ehra', icon: 'chat', title: 'EHR vendor agents', sub: { exec: 'Built into the chart', dir: 'EHR team', eng: 'Seen in vendor logs' }, hidden: false, r: 30 },
      { id: 'ehr', icon: 'server', title: 'EHR and charts', sub: { exec: 'What agents read, write', dir: 'EHR team', eng: 'FHIR and API access' }, hidden: false, r: 30 },
      {
        id: 'rcm',
        icon: 'doc',
        title: 'Prior-authorization agent',
        sub: { exec: 'From a revenue-cycle vendor', dir: 'Set up for claim status', eng: 'OAuth client credentials' },
        hidden: false,
        r: 30
      },
      {
        id: 'inj',
        icon: 'doc',
        title: 'Incoming document',
        sub: { exec: 'Carries hidden text', dir: 'Arrives from outside', eng: 'Read as an instruction' },
        hidden: false,
        r: 30
      },
      {
        id: 'diy',
        icon: 'gear',
        title: 'Staff-built agents',
        sub: { exec: 'Made in departments', dir: 'No central register', eng: 'API keys, MCP tools' },
        hidden: false,
        r: 30
      },
      {
        id: 'svc',
        icon: 'key',
        title: 'Shared service account',
        sub: { exec: 'One credential, many agents', dir: 'Reviewed at contract renewal', eng: 'Long-lived tokens, broad scopes' },
        hidden: false,
        r: 30
      },
      {
        id: 'cid',
        icon: 'badge',
        title: 'Cisco Identity',
        sub: { exec: 'One register of agents', dir: 'Identities and their reach', eng: 'Identity and agentic activity' },
        hidden: true,
        r: 30
      },
      {
        id: 'obs',
        icon: 'database',
        title: 'Agent Observability',
        sub: { exec: 'What each agent did', dir: 'Traces and tool calls', eng: 'Guardrail events in Splunk' },
        hidden: true,
        r: 30
      },
      { id: 'sa', icon: 'lock', title: 'Secure Access', sub: { exec: 'Policy per agent', dir: 'MCP and API traffic', eng: 'Network-side block' }, hidden: true, r: 30 },
      {
        id: 'appr',
        icon: 'people',
        title: 'Security and agent owner',
        sub: { exec: 'Two people decide', dir: 'Security lead, business owner', eng: 'L3: execute after approve' },
        hidden: true,
        r: 30
      }
    ],
    zones: [
      { id: 'hosp', label: 'Hospital', hidden: false, cisco: false },
      { id: 'vend', label: 'Vendors and the internet', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true }
    ],
    links: [
      { id: 'ehra-ehr', a: 'ehra', b: 'ehr', bend: 0 },
      { id: 'rcm-svc', a: 'rcm', b: 'svc', bend: 0 },
      { id: 'diy-svc', a: 'diy', b: 'svc', bend: 0.1 },
      { id: 'svc-ehr', a: 'svc', b: 'ehr', bend: 0 },
      { id: 'inj-rcm', a: 'inj', b: 'rcm', bend: 0 },
      { id: 'cid-svc', a: 'cid', b: 'svc', bend: 0 },
      { id: 'obs-rcm', a: 'obs', b: 'rcm', bend: 0 },
      { id: 'obs-cid', a: 'obs', b: 'cid', bend: 0.1 },
      { id: 'cid-appr', a: 'cid', b: 'appr', bend: 0 },
      { id: 'appr-sa', a: 'appr', b: 'sa', bend: 0 },
      { id: 'sa-rcm', a: 'sa', b: 'rcm', bend: 0.14 }
    ],
    steps: [
      {
        phase: 'today',
        title: 'Agents arrive from three directions',
        say: {
          exec: 'EHR vendor agents, revenue-cycle agents and staff-built agents all gain access to patient data, each approved through a different door.',
          dir: 'There is no single register of agents, owners, permissions and credentials, and service accounts are shared and rarely expire.',
          eng: 'Agents authenticate with OAuth client credentials, SMART on FHIR backend services or API keys, and MCP servers add a tool layer with its own authorization.'
        },
        l: { 'ehra-ehr': 'ok', 'rcm-svc': 'ok', 'diy-svc': 'ok', 'svc-ehr': 'ok' },
        facts: [
          { v: '129', l: "Agent features listed as available in Epic's Agent Factory at UGM 2026, with 78 in development", s: 'Healthcare IT Today 2026' },
          {
            v: '55%',
            l: 'Health-system IT leaders (60+ surveyed) who already run AI workflows with limited staff oversight',
            s: 'Qventus CIO report 2026, vendor-reported'
          }
        ]
      },
      {
        phase: 'today',
        title: 'Permissions wider than the task',
        say: {
          exec: 'An agent set up to check claim status can hold access broad enough to read whole charts, because narrowing it is work nobody owns.',
          dir: 'Access reviews cover people; agent credentials are reviewed, if at all, when a vendor contract renews.',
          eng: 'Scopes are granted per integration, not per task, and tokens are long-lived.'
        },
        n: { svc: 'warn', rcm: 'warn' },
        l: { 'rcm-svc': 'warn', 'svc-ehr': 'warn' },
        callout: { node: 'svc', text: 'Set up to check claim status. Able to read whole charts.' },
        facts: [ { v: '109:1', l: 'Machine identities, including AI agents, to human identities (cross-industry)', s: 'Palo Alto Networks 2026, vendor-reported' } ]
      },
      {
        phase: 'today',
        title: 'An injected instruction acts with real access',
        say: {
          exec: 'Text hidden in a document or message can redirect an agent, and the audit trail shows a service account, not which agent acted or why.',
          dir: 'In a published test, prompt injection succeeded in 94.4% of simulated medical-advice dialogues.',
          eng: "EHR audit logs record the API client; the agent's reasoning, tool calls and the prompt that triggered them live in a separate system or nowhere."
        },
        n: { inj: 'down', rcm: 'down', ehr: 'unknown' },
        l: { 'inj-rcm': 'down', 'rcm-svc': 'down', 'svc-ehr': 'down' },
        label: { svc: 'All the audit log shows' },
        facts: [
          { v: '94.4%', l: 'Prompt-injection success rate against language models in simulated medical-advice dialogues', s: 'JAMA Network Open 2025' },
          { v: '69.67%', l: 'Best agent success rate on 300 physician-written tasks in a FHIR test EHR', s: 'NEJM AI 2025' }
        ]
      },
      {
        phase: 'cisco',
        title: 'One register of agents and their reach',
        say: {
          exec: 'Same agents. This time one view lists them with their identities, the systems they reach and their recent actions, drawn from identity, network and agent telemetry.',
          dir: 'Cisco Identity would bring identity and agentic activity into one view. AI Defense would discover and test AI assets, and Agent Observability would trace agent behavior.',
          eng: 'Secure Access would apply per-agent policy to MCP and API traffic, with traces, tool calls and guardrail events held in Splunk.'
        },
        show: [ 'cc', 'cid', 'obs', 'sa' ],
        n: { inj: 'unknown', rcm: 'warn', svc: 'warn', ehr: 'ok', cid: 'ok', obs: 'ok', sa: 'ok' },
        l: { 'inj-rcm': 'warn', 'rcm-svc': 'warn', 'svc-ehr': 'warn', 'cid-svc': 'ok', 'obs-rcm': 'warn', 'obs-cid': 'ok' },
        label: { svc: '' },
        callout: { node: 'obs', text: 'Flagged: the prior-authorization agent acted outside its task.' }
      },
      {
        phase: 'cisco',
        title: 'A named owner approves each permission change',
        say: {
          exec: "Granting an agent write access, or suspending one that misbehaves, requires approval from the agent's named owner and from security.",
          dir: 'The Actions queue would hold the request and the Audit log would tie the decision to a person. Duo would verify the approvers.',
          eng: "Network-side blocks execute in Secure Access; EHR-side permissions are changed in the EHR vendor's console by the EHR team."
        },
        show: [ 'appr' ],
        n: { appr: 'pending' },
        l: { 'cid-appr': 'pending' },
        modal: {
          title: "Suspend an agent's access to records",
          lines: [
            "Block the prior-authorization agent's API traffic until its owner reviews it.",
            "Approvers: security lead, the agent's business owner",
            'Executes in: Cisco Secure Access'
          ],
          button: 'Approve'
        }
      },
      {
        phase: 'cisco',
        title: 'Modeled: a misbehaving agent stopped, with a record',
        say: {
          exec: 'Modeled outcome: a misbehaving agent is identified and suspended with a full record. What agents may do inside the EHR stays with the EHR vendor and hospital governance.',
          dir: "The model assumes agents are registered and their traffic passes through enforced paths; agents embedded inside the EHR are visible only through the vendor's own logs.",
          eng: 'This outcome is modeled, not measured. Guardrails reduce prompt-injection risk; they do not remove it.'
        },
        n: { appr: 'ok', rcm: 'ok', svc: 'ok', inj: 'ok' },
        l: { 'cid-appr': 'ok', 'appr-sa': 'ok', 'sa-rcm': 'ok', 'inj-rcm': 'off', 'rcm-svc': 'off', 'svc-ehr': 'ok', 'obs-rcm': 'ok' },
        label: { rcm: 'Suspended, owner reviewing' },
        chips: [ [ 'Cisco Identity', 'GA (US)' ], [ 'Agent Observability', 'GA' ], [ 'AI Defense', 'GA' ], [ 'Cisco Secure Access', 'GA (US)' ] ]
      }
    ]
  }
};
