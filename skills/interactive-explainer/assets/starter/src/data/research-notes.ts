// Hand-written notes that refine generated research data. Kept apart from research.ts so regeneration never drops them.

/**
 * Hand-written corrections from briefs 06 and 07 (13 Nov 2026) that refine a catalog status.
 * Appended to the status line in the platform explorer.
 */
export const UPDATES: Record<string, string> = {
  nexus: "Cisco's Topology documentation (3 Nov 2026) says data center and compute relationships currently show at Layer 1 and Layer 2 only [CC10].",
  intersight: "Topology shows data center and compute relationships at Layer 1 and Layer 2 only [CC10].",
  identity: "Identity for AI Canvas is currently in beta [CC15].",
  actions: "Agentic Actions for networking moved to Controlled Availability on 26 Oct 2026 [CC27].",
  canvas: "In Reasoning mode a person approves the investigation plan before agents run. AI model training on AI Canvas data is enabled by default per tenant; an Environment Admin can switch it off [CC6][CC12].",
  assistant: "AI model training on AI Assistant data is enabled by default per tenant; an Environment Admin can switch it off [CC6][CC12].",
  workflows: "Workflows can perform write actions and need an explicit Run [CC6][CC11].",
  lake: "Splunk's current service documentation (19 Oct 2026) lists AWS regions except GovCloud; it is not offered on Azure or Google Cloud stacks [DF12].",
  fedsearch: "Current documentation also lists Amazon Security Lake and Cisco Security Analytics and Logging. Not available for Splunk Cloud stacks on Azure or Google Cloud, and not a replacement for indexed data in real-time detection [DF11][DF12].",
  mcp: "Documentation calls it generally available; its Splunkbase listing (v2.1.0, 24 Oct 2026) says beta [DF22].",
  hospital: "Splunkbase lists more than 2,000 apps and add-ons, including Claroty xDome, Armis, Citrix and ServiceNow. No Epic, Oracle Health, nurse call or building-management integration was found [DF27].",
  autoloop: "Cisco's loop has five stages: sense, diagnose, remediate, validate and deploy [CC21].",
};

export const QUOTES: Record<string, { text: string; who: string; src: string }> = {
  "opening:3": { text: "This isn't a single pane of glass; glass is passive. Cisco Cloud Control is active execution, with policy and identity built into the control path itself.", who: "DJ Sampath, Cisco, 2 Jun 2026", src: "CC16" },
  "opening:5": { text: "A model in which governed AI agents help operators correlate information across domains, investigate, and take action on issues that need attention.", who: "Cisco's definition of AgenticOps", src: "CC13" },
};
