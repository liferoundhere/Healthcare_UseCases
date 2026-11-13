/**
 * What sits in the operating layer above the hospital.
 * Every entry carries the availability wording and the source ids that support it (see sources.ts).
 * Status wording follows research/05 and research/06: do not upgrade a status without a source.
 */
export type Layer = "experience" | "domain" | "fabric" | "ecosystem" | "roadmap";
export type Tag = "GA" | "GA (US)" | "Beta" | "Alpha" | "Controlled Availability" | "Announced" | "Roadmap" | "Via Splunk";

export interface Item {
  id: string;
  name: string;
  short: string;
  layer: Layer;
  /** Vendor-neutral name of the console a hospital runs today. */
  generic?: string;
  group?: string;
  does: string;
  stays?: string;
  tag: Tag;
  status: string;
  src: string[];
  zones?: string[];
}

export const LAYER_NAME: Record<Layer, string> = {
  experience: "Cisco Cloud Control: where people and agents work",
  domain: "Connected Cisco domains",
  fabric: "Cisco Data Fabric, powered by Splunk",
  ecosystem: "Third-party systems and data",
  roadmap: "Announced, not yet generally available",
};

export const CATALOG: Item[] = [
  // ---- Cloud Control experience -------------------------------------------------
  { id: "canvas", name: "AI Canvas", short: "AI Canvas", layer: "experience", does: "A shared, persistent workspace where people and Cisco agents investigate one problem across domains, with the reasoning kept on the page.", tag: "GA (US)", status: "In the US general-availability experience since 25 Aug 2026. The Workflows agent inside AI Canvas is beta.", src: ["C1", "C6", "C3", "CC6", "CC12"] },
  { id: "assistant", name: "AI Assistant", short: "AI Assistant", layer: "experience", does: "The natural-language front door: ask a question across products, get an answer and supported, authorized actions.", tag: "GA (US)", status: "Generally available in the US.", src: ["C1", "C10"] },
  { id: "topology", name: "Topology", short: "Topology", layer: "experience", does: "One map across campus, branch and data center, down to Layer 3 (VLAN, VRF, subnet), with AI insights on which site needs attention first.", tag: "GA (US)", status: "Layer 3 topology shipped 11 Aug 2026; AI Insights in Topology 25 Aug 2026.", src: ["C3"] },
  { id: "inventory", name: "Inventory", short: "Inventory", layer: "experience", does: "One view of the assets behind every connected product, with AI-powered search.", tag: "GA (US)", status: "Generally available in the US. Sync intervals are product-specific.", src: ["C1", "C3"] },
  { id: "actions", name: "Actions", short: "Actions", layer: "experience", does: "Correlated alerts and incidents with site-level summaries. Assign, dismiss or resolve by role.", tag: "GA (US)", status: "The Actions view is shipped.", src: ["C3", "CC7", "CC27"] },
  { id: "workflows", name: "Agentic Workflows", short: "Workflows", layer: "experience", does: "Turn a recommendation or a repeat task into a reusable automation that waits for a named approver.", tag: "GA (US)", status: "Introduced at US general availability. Running a workflow from inside AI Canvas is beta.", src: ["C1", "C3"] },
  { id: "identity", name: "Cisco Identity", short: "Identity", layer: "experience", does: "Identity posture and risk in one view, drawing on Okta, Cisco ISE and Microsoft Active Directory.", tag: "GA (US)", status: "Generally available in the US. Non-Cisco sources need Duo Advantage+ or ISE Advantage+.", src: ["C3", "CC15"] },
  { id: "audit", name: "Audit log", short: "Audit log", layer: "experience", does: "A record of who changed and who approved what, in one place.", tag: "GA (US)", status: "Generally available in the US.", src: ["C3"] },
  { id: "deepreason", name: "Deep Reasoning", short: "Deep Reasoning", layer: "experience", does: "A structured investigation: competing hypotheses, evidence, impact, root cause and next steps, with a plan a person approves before agents run.", tag: "Beta", status: "Beta in June 2026. An October 2026 Cisco deck labels it Available.", src: ["C6", "C7", "C10"] },

  // ---- Connected Cisco domains ---------------------------------------------------
  { id: "meraki", name: "Cisco Meraki", short: "Meraki", layer: "domain", group: "Networking", generic: "Cloud network dashboard", does: "Alerts, Layer 3 topology and shared workflows surface in Cloud Control.", stays: "Device configuration stays in the Meraki dashboard.", tag: "GA (US)", status: "Connected at US general availability, 25 Aug 2026.", src: ["C1", "C3"], zones: ["ward", "clinic", "net"] },
  { id: "catc", name: "Catalyst Center", short: "Catalyst Center", layer: "domain", group: "Networking", generic: "Campus controller", does: "Inventory, topology and status reach AI Canvas through Meraki Global Overview.", stays: "Campus fabric and policy stay in Catalyst Center.", tag: "GA (US)", status: "Connected at US general availability.", src: ["C1", "C3", "C3b"], zones: ["ward", "net", "imaging"] },
  { id: "sdwan", name: "Catalyst SD-WAN", short: "SD-WAN", layer: "domain", group: "Networking", generic: "WAN manager", does: "WAN interfaces appear in inventory and topology.", stays: "Routing and WAN policy stay in SD-WAN Manager.", tag: "GA (US)", status: "Connected at US general availability.", src: ["C1", "C3"], zones: ["clinic", "net", "home"] },
  { id: "nexus", name: "Nexus Dashboard and Hyperfabric", short: "Nexus", layer: "domain", group: "Data center", generic: "Data center fabric manager", does: "The data center fabric appears in inventory and topology beside campus and WAN.", stays: "Fabric operations stay in Nexus Dashboard.", tag: "GA (US)", status: "Connected at US general availability.", src: ["C1", "C3", "CC10"], zones: ["dc"] },
  { id: "intersight", name: "Cisco Intersight", short: "Intersight", layer: "domain", group: "Data center", generic: "Compute manager", does: "Compute inventory and health are available to AI Canvas and AI Assistant.", stays: "Server lifecycle stays in Intersight (SaaS, US-East).", tag: "GA (US)", status: "SaaS US-East only; no Intersight Virtual Appliance support.", src: ["C1", "C14"], zones: ["dc"] },
  { id: "scc", name: "Security Cloud Control", short: "Security Cloud Control", layer: "domain", group: "Security", generic: "Firewall manager", does: "Security context, notifications and licensing visibility sit beside the network view.", stays: "Firewall policy stays in Security Cloud Control.", tag: "GA (US)", status: "Connected at US general availability.", src: ["C1", "C3", "C3b"], zones: ["dc", "net"] },
  { id: "secureaccess", name: "Cisco Secure Access", short: "Secure Access", layer: "domain", group: "Security", generic: "Remote access console", does: "Secure Access notifications and licensing surface through Security Cloud Control.", stays: "Per-app access policy stays in Secure Access.", tag: "GA (US)", status: "Notifications added 27 Oct 2026.", src: ["C3b"], zones: ["home", "clinic", "outside"] },
  { id: "ise", name: "Cisco ISE", short: "ISE", layer: "domain", group: "Security", generic: "Network access control", does: "An identity source for Cisco Identity. Approved segmentation executes here.", stays: "Access and segmentation policy stay in ISE.", tag: "GA (US)", status: "Identity source at US general availability.", src: ["C3"], zones: ["ward", "net"] },
  { id: "duo", name: "Cisco Duo", short: "Duo", layer: "domain", group: "Security", generic: "MFA console", does: "Sign-in posture feeds Cisco Identity.", stays: "MFA policy stays in Duo.", tag: "GA (US)", status: "Duo Advantage+ unlocks non-Cisco identity sources.", src: ["C3"], zones: ["office", "clinic"] },
  { id: "aidefense", name: "Cisco AI Defense", short: "AI Defense", layer: "domain", group: "Security", generic: "AI usage controls", does: "Guardrails for AI use and for agents: what each can do, and what needs a person.", stays: "AI policy stays in AI Defense.", tag: "GA", status: "AI Defense is a shipping product. Agent policy through Cloud Control Studio is announced.", src: ["C5", "C16"], zones: ["office", "outside"] },
  { id: "te", name: "ThousandEyes", short: "ThousandEyes", layer: "domain", group: "Observability", generic: "Path and SaaS monitoring", does: "Path, internet and SaaS evidence inside AI Canvas.", stays: "Tests and agents stay in ThousandEyes.", tag: "GA (US)", status: "AI features must be enabled in ThousandEyes for AI Canvas.", src: ["C1", "C4"], zones: ["outside", "home", "clinic"] },
  { id: "splunk", name: "Splunk", short: "Splunk", layer: "domain", group: "Observability", generic: "SIEM and log platform", does: "Single sign-on, cross-launch, and Splunk data and skills inside AI Canvas.", stays: "Detections and searches stay in Splunk.", tag: "GA (US)", status: "Needs Splunk Cloud Platform 10.5 or later on US Commercial AWS.", src: ["C3", "C4", "C28"], zones: ["office"] },
  { id: "webex", name: "Webex Control Hub", short: "Webex", layer: "domain", group: "Collaboration", generic: "Collaboration admin", does: "Collaboration inventory appears without extra setup.", stays: "Calling and meetings stay in Control Hub.", tag: "GA (US)", status: "Inventory added 4 Aug 2026.", src: ["C1", "C3"], zones: ["office", "ward"] },
  { id: "spaces", name: "Cisco Spaces", short: "Spaces", layer: "domain", group: "Workplace", generic: "Location services console", does: "Spaces Connector health, inventory and topology, with cross-launch.", stays: "Location services stay in Cisco Spaces. No patient or asset location is shown here.", tag: "GA (US)", status: "Added 10 Nov 2026. Connector health only.", src: ["C3b"], zones: ["ward", "office"] },
  { id: "ciscoiq", name: "Cisco IQ", short: "Cisco IQ", layer: "domain", group: "Lifecycle", generic: "Support and lifecycle portal", does: "Support, lifecycle and assessment insight, integrated into Cloud Control.", stays: "Cases and contracts stay with Cisco support.", tag: "GA (US)", status: "Integrated at US general availability.", src: ["C1", "C2"], zones: ["dc", "net"] },

  // ---- Data Fabric ----------------------------------------------------------------
  { id: "lake", name: "Machine Data Lake", short: "Machine Data Lake", layer: "fabric", does: "Keeps full-fidelity machine data in a low-cost, Splunk-managed tier. Promote only the slice an investigation needs.", tag: "GA", status: "GA 4 Aug 2026 on Splunk Cloud Platform.", src: ["C17", "C18", "DF12"] },
  { id: "catalog", name: "Catalog", short: "Catalog", layer: "fabric", does: "Find datasets by name, owner, type and field before you move anything. Governed by Splunk role-based access.", tag: "GA", status: "GA 4 Aug 2026 with Machine Data Lake.", src: ["C17", "C18"] },
  { id: "fedsearch", name: "Federated Search", short: "Federated Search", layer: "fabric", does: "Search data where it already lives, without ingesting it first.", tag: "GA", status: "Amazon S3 (18 May 2026); Azure Blob, ADLS Gen2, Azure Databricks, Snowflake, Splunk DDSS (6 Jul 2026); CloudWatch Lake and Databricks (15 Sep 2026). Splunk Cloud Platform only.", src: ["C21", "C22", "C19", "DF11", "DF12"] },
  { id: "datamgmt", name: "AI-powered Data Management", short: "Data Management", layer: "fabric", does: "Guided onboarding, automatic schema mapping and self-healing pipelines for unusual log formats such as medical devices and building systems.", tag: "GA", status: "GA 4 Aug 2026.", src: ["C17"] },
  { id: "launchpad", name: "Agent Launchpad", short: "Agent Launchpad", layer: "fabric", does: "Build an agent on your Splunk data without code: choose the model, tools and skills. Every run is traceable.", tag: "GA", status: "GA 4 Aug 2026 in Splunk Cloud. On-premises is stated as coming later.", src: ["C17", "C27"] },
  { id: "agentobs", name: "Agent Observability with Tokenomics", short: "Agent Observability", layer: "fabric", does: "Trace what every agent did and what it cost. Also surfaces in Cloud Control.", tag: "GA", status: "GA 15 Sep 2026.", src: ["C19", "C27"] },
  { id: "mcp", name: "Splunk MCP Server", short: "MCP Server", layer: "fabric", does: "Governed access for agents to Splunk data and skills. Required for the Cloud Control integration.", tag: "GA", status: "Needs the mcp_tool_execute capability on the right roles.", src: ["C4", "DF22"] },
  { id: "aipod", name: "Cisco AI POD for Splunk", short: "AI POD for Splunk", layer: "fabric", does: "Run Splunk AI in your own data center or air-gapped, for data that cannot leave the building.", tag: "GA", status: "Available 15 Sep 2026. Splunk names healthcare among the industries that need this.", src: ["C27", "C20"] },

  // ---- Third-party ----------------------------------------------------------------
  { id: "servicenow", name: "ServiceNow", short: "ServiceNow", layer: "ecosystem", group: "Service management", does: "Tickets and change records connect to the investigation.", tag: "GA (US)", status: "Named as available at Cloud Control general availability.", src: ["C1"] },
  { id: "atlassian", name: "Atlassian", short: "Atlassian", layer: "ecosystem", group: "Service management", does: "Issue tracking connects to the investigation.", tag: "GA (US)", status: "Named as available at Cloud Control general availability.", src: ["C1"] },
  { id: "infoblox", name: "Infoblox", short: "Infoblox", layer: "ecosystem", group: "DNS, DHCP, IP addressing", does: "Address and name context for every device.", tag: "GA (US)", status: "Named as available at Cloud Control general availability.", src: ["C1"] },
  { id: "bluecat", name: "BlueCat", short: "BlueCat", layer: "ecosystem", group: "DNS, DHCP, IP addressing", does: "Address and name context for every device.", tag: "GA (US)", status: "Named as available at Cloud Control general availability.", src: ["C1"] },
  { id: "okta", name: "Okta", short: "Okta", layer: "ecosystem", group: "Identity", does: "An identity source for Cisco Identity.", tag: "GA (US)", status: "Needs Duo Advantage+ or ISE Advantage+.", src: ["C3"] },
  { id: "msad", name: "Microsoft Active Directory", short: "Active Directory", layer: "ecosystem", group: "Identity", does: "An identity source for Cisco Identity.", tag: "GA (US)", status: "Needs Duo Advantage+ or ISE Advantage+.", src: ["C3"] },
  { id: "s3", name: "Amazon S3", short: "Amazon S3", layer: "ecosystem", group: "Data stores", does: "Archived logs searched in place by Federated Search.", tag: "GA", status: "GA 18 May 2026 on Splunk Cloud in AWS regions.", src: ["C21"] },
  { id: "azure", name: "Azure Blob and Data Lake Storage", short: "Azure storage", layer: "ecosystem", group: "Data stores", does: "Azure-held data searched in place by Federated Search.", tag: "GA", status: "GA 6 Jul 2026.", src: ["C22"] },
  { id: "snowflake", name: "Snowflake", short: "Snowflake", layer: "ecosystem", group: "Data stores", does: "Warehouse data searched in place by Federated Search.", tag: "GA", status: "GA 6 Jul 2026.", src: ["C22"] },
  { id: "databricks", name: "Databricks", short: "Databricks", layer: "ecosystem", group: "Data stores", does: "Lakehouse data searched in place by Federated Search.", tag: "GA", status: "Azure Databricks 6 Jul 2026; Databricks 15 Sep 2026.", src: ["C22", "C19"] },
  { id: "hospital", name: "Hospital systems: EHR performance, nurse call, RTLS, building management", short: "Hospital systems", layer: "ecosystem", group: "Clinical and building systems", does: "Their machine data (system events, health, performance) reaches the fabric through Splunk. The clinical record stays in the EHR.", tag: "Via Splunk", status: "No native EHR, nurse call, RTLS or Citrix connector was found in Cloud Control.", src: ["C29", "C24", "DF27"] },

  // ---- Announced --------------------------------------------------------------------
  { id: "studio", name: "Cloud Control Studio: Agent Builder and App Builder", short: "Studio", layer: "roadmap", does: "Describe an agent or an app in plain language; test it in a sandbox; publish it with version control and rollback.", tag: "Announced", status: "Announced 2 Jun 2026. Press reported a late-2026 target. No general-availability statement found.", src: ["C2", "C5", "C11", "C12"] },
  { id: "marketplace", name: "Cloud Control Marketplace", short: "Marketplace", layer: "roadmap", does: "Partner-built and certified agents.", tag: "Announced", status: "Described without an availability date.", src: ["C1", "C2", "C11"] },
  { id: "foundry", name: "Cisco Model Foundry", short: "Model Foundry", layer: "roadmap", does: "Discover, evaluate, fine-tune and run Cisco models, including the Deep Network Model, on your own data.", tag: "Controlled Availability", status: "Controlled Availability began with Cisco partners on 26 Oct 2026. Press reports a June 2027 general-availability plan.", src: ["CC26", "CC28"] },
  { id: "twin", name: "Digital Twin", short: "Digital Twin", layer: "roadmap", does: "Emulate devices, topology and configuration to validate a change before it reaches a live clinical network.", tag: "Alpha", status: "Alpha in July 2026. No later status found.", src: ["C7"] },
  { id: "autoloop", name: "Autonomous agentic loop", short: "Autonomous loop", layer: "roadmap", does: "Sense, diagnose, remediate, validate and deploy within policy.", tag: "Roadmap", status: "Described in future tense. In a hospital, the supported model today is a person approving.", src: ["C2", "C7", "C10", "CC21"] },
];

export const ITEM = new Map(CATALOG.map((i) => [i.id, i]));
export const byLayer = (l: Layer) => CATALOG.filter((i) => i.layer === l);

/** Trust ladder as shown in Cisco's October 2026 Cisco Connect deck [C10]. */
export const TRUST = [
  { level: "L1", name: "Diagnose only", line: "Show me why" },
  { level: "L2", name: "Recommend", line: "Pick the fix" },
  { level: "L3", name: "Supervised", line: "Execute after I click approve" },
  { level: "L4", name: "Autonomous", line: "Act within policy" },
];
