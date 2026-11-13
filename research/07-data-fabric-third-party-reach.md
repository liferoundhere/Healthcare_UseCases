# Research Brief 07: How Cisco Data Fabric connects Cisco and third-party systems, and what that means in a hospital

Research date: Friday, November 13, 2026
Builds on: Brief 05 (`05-cisco-cloud-control-data-fabric.md`, November 12, 2026). This brief does not repeat brief 05. It deepens section B on third-party reach, hospital data sources, healthcare customers, economics, governance, and how the data feeds agents.

## How to read this brief

- Bracketed numbers such as [12] refer to the numbered sources in section J.
- **Status** is given in the source's own words (for example "generally available", "controlled availability", "in beta", "coming soon"). Where a source gives no status word, the cell says "no status label".
- Short phrases in quotation marks are exact quotes. The page-reading tool used for this research returns quotes of at most about 125 characters, so long sentences are quoted in parts.
- Splunkbase version numbers and download counts were read from each listing on November 13, 2026.
- "Positioning" marks reasoning by the researcher, not a Cisco or Splunk claim.
- Guardrail kept throughout: Data Fabric is an aggregation layer for **machine data** (network, security, identity, device connectivity, system events, application performance telemetry). It is not a clinical data repository and it does not replace the EHR.

## Executive summary

1. **Splunk's own description of the architecture has three layers.** "At the data layer, data management helps unify access across Splunk indexes, Machine Data Lake, and federated sources." "At the context layer, capabilities such as data catalog, knowledge graph, and business context make data understandable." "At the action layer, AI capabilities turn data and context into operational workflows." [3]
2. **Third-party reach comes through four routes**, each with a different status:
   - **Ingest through Splunkbase apps and add-ons.** Splunk says Splunkbase "lists more than 2,000 apps and add-ons" [27]. Current listings exist for ServiceNow, CrowdStrike, Okta, Palo Alto Networks, Zscaler, Microsoft Defender, AWS, Azure, VMware, Nutanix, Citrix NetScaler, Claroty xDome, and Armis [54]-[69].
   - **Federated Search in place.** Splunk's current documentation (Splunk Cloud Platform 10.7, updated October 17, 2026) lists Amazon S3, Azure Data Lake Storage and Azure Blob Storage, Azure Databricks, Snowflake, Splunk DDSS, Cisco Security Analytics and Logging, CloudWatch Unified Data Store, and Federated Analytics for Amazon Security Lake [11].
   - **Landing in Machine Data Lake** through forwarders, Edge Processor, HEC, or "an OTel Collector path that exports through HEC" [16].
   - **Agent access through MCP.** The Splunk MCP Server gives "AI assistants and agents" a governed interface to Splunk data [21][22], and Agent Launchpad connects out to MCP providers "Splunk, Atlassian, Slack, PagerDuty, GitHub, and GitLab" plus custom MCP connections [23].
3. **Federated Search has a hard platform limit a hospital must know.** It is "not currently available for Splunk Cloud Platform deployments on Microsoft Azure or Google Cloud" or in FedRAMP Moderate, FedRAMP High, IRAP, or DoD IL5 environments, and "It is not a replacement for Splunk-indexed data for real-time detections" [12].
4. **No EHR vendor connector was found.** No Splunkbase app for Epic or Oracle Health was found. Splunk Lantern says Splunk can collect and correlate audit data from Epic, Oracle Health (formerly Cerner), Meditech, and Veradigm (formerly Allscripts), but that is custom onboarding of audit logs, not a packaged connector [47]. EHR audit logs contain patient identifiers, so that use case sits on the PHI side of the boundary (see section E).
5. **Healthcare customers exist for Splunk, not yet for Data Fabric by name.** Named stories: NewYork-Presbyterian (patient privacy platform that integrates with Epic), Children's National Hospital (40% increase in threat detection), NYC Health + Hospitals (Splunk AppDynamics and Cisco ThousandEyes, including PACS monitoring), an anonymized research university health system (60%+ reduction in MTTD), and Imprivata [41]-[45]. No published healthcare customer story names Cisco Data Fabric, Machine Data Lake, or Federated Search.
6. **Economics are documented in more detail than brief 05 had.** The Cisco data benefit is named Integrated Enterprise Value: eligible Cisco data "counts at a 0.5x weighted rate", it applies to ingest-based licenses only, and non-Cisco data is not eligible [19]. Splunk Cloud's "included capacity package" gives eligible environments up to 10 TB in Machine Data Lake, 100 weighted federated searches per day, and 500 GB per day of Ingest Processor [12].
7. **HIPAA is a Splunk Cloud add-on environment with a BAA, and its scope is narrow.** Splunk Cloud Platform "is compliant with the HIPAA Security Rule and HITECH Breach Notification Requirements" [12]. The Splunk BAA "applies only to paid subscriptions to the HIPAA-certified Hosted Services and does not apply to on-premise component(s) of a hybrid Offering" [50]. Cisco Cloud Control and AI Canvas remain third-party content under Cisco terms [38].
8. **Five points in brief 05 need updating** (section H): the "object storage cost" wording is now verified; Iceberg and Delta Lake table formats are documented under the Amazon S3 option; Machine Data Lake availability is now documented as all commercial AWS regions; Activity-Based Pricing is in controlled availability and in the service documentation; and the Splunk MCP Server carries a "beta" label on Splunkbase while the docs say GA.

---

## A) Architecture, as Cisco and Splunk describe it

### A1. The layers

| Layer | Exact wording | What sits in it | Source |
|---|---|---|---|
| Data | "At the data layer, data management helps unify access across Splunk indexes, Machine Data Lake, and federated sources." | Splunk indexes, Machine Data Lake, Federated Search, Edge Processor and Ingest Processor pipelines | [3] |
| Context | "At the context layer, capabilities such as data catalog, knowledge graph, and business context make data understandable." Also: "The Context Layer catalogs every source, maps how entities relate across domains in a knowledge graph, and indexes operational history for semantic search." | Catalog, knowledge graph, lineage | [3][2] |
| Action | "At the action layer, AI capabilities turn data and context into operational workflows." | AI Assistant, Agent Launchpad, MCP Server, AI Canvas | [3] |

Positioning statements, exact:

- "Cisco Data Fabric powered by the Splunk Platform is the system of record and intelligence for the agentic enterprise." (August 4, 2026) [1]
- "designed to become the system of record and intelligence layer for the agentic enterprise." (June 2, 2026) [5]
- "Cisco Data Fabric, powered by the Splunk Platform, is the system of operational records and data intelligence layer" (June 15, 2026; sentence continues) [3]
- "This unified data layer eliminates fragmented tools, data pipelines, and redundant storage." (June 2, 2026) [4]
- "Open formats and the Model Context Protocol keep the data accessible to any model or agent." (August 13, 2026) [2]
- Cisco Data Fabric was first announced on September 8, 2025, at .conf25 as "a revolutionary new architecture that will empower organizations to harness the value of their machine data with AI." [9]

Note: the August 4, 2026 GA blog does not use the three-layer framing. It names three outcomes: Federate Data, Correlate at Scale, and Unlock Machine Data for AI [1]. The three-layer wording comes from the June 15, 2026 leadership blog [3]. A Cisco Connect deck uses a different breakdown with a separate processing layer (brief 05, source 26).

### A2. Component status matrix

| Component | What it does | Status, in the source's words | Source and date |
|---|---|---|---|
| Machine Data Lake | "a Splunk-managed environment for landing and retaining full-fidelity machine data at scale"; retains "supported logs and events in economical object storage"; promote slices to a Splunk index or Analytics Table | "currently in Alpha" (June 2, 2026) [5]. "now generally available" (August 4, 2026) [1]. "generally available for Splunk Cloud Platform 10.5.2605.5" in "US-East, Frankfurt, Tokyo, and Sydney" (August 11, 2026) [6]. Service Details 10.7: AWS "Available, except GovCloud US-West and GovCloud US-East regions"; Google Cloud and Azure "Not currently available" (October 19, 2026) [12] | [1][5][6][12][16] |
| Machine Data Lake landing paths | Universal Forwarder, Heavy Forwarder, and Edge Processor routes; HEC token; "an OTel Collector path that exports through HEC"; events already in Splunk Cloud Platform | Documented for 10.5.2605, 10.6, and 10.7. No status label on the page | [16], October 21, 2026 |
| Machine Data Lake promotion | "static promotion to an analytics table", "static promotion to a Splunk index", "streaming promotion to a Splunk index". 10.7 adds: "You can continuously promote selected Machine Data Lake data into an analytics table." | Shipped in 10.5.2605; extended in 10.7. No status label | [15][17] |
| Catalog | "Catalog makes data across Cisco Data Fabric easier to find, understand, and use." In 10.7: "Catalog is now the single place to discover and manage your federated and MDL raw datasets and their connections." | "generally available" August 4, 2026 [1][6]. 10.7 feature, no status label [15] | [1][6][15] |
| MCP-enabled Catalog Discovery | Agent-driven dataset discovery | "highlighted today at .conf" (September 15, 2026). No availability statement | [7] |
| Knowledge graph and lineage (Context Layer) | "maps how entities relate across domains in a knowledge graph"; "captures complete lineage for every record, where it originated, how it was transformed, and who has accessed it" | No status label in any source read. Treat as architecture description | [2][3] |
| Federated Search | Search external stores in place with SPL2 | See section B1 for per-target status | [11][12] |
| Federated Analytics for Amazon Security Lake | Threat detection on ingested data plus ad hoc federated searches over S3-resident Security Lake data | Listed option; AWS "Available, except GovCloud US-West and GovCloud US-East regions" | [11][12] |
| AI-powered Data Management (Guided Onboarding, Auto Schematization, Self-Healing Pipelines) | Onboarding, CIM mapping suggestions, CIM drift detection with AI-generated remediation for administrator review | "now generally available" (August 4, 2026) | [1] |
| Edge Processor | Filter, mask, and route data near the source; one of the Machine Data Lake landing routes | Listed for AWS regions in Service Details 10.7; other providers "Not currently available" (table mapping inferred by the reading tool) | [12][16] |
| Ingest Processor | Cloud-side pipeline that "filters and masks the incoming data so that only a desired subset of that data gets sent to a destination"; "Mask confidential information in the data." | Listed for AWS regions; "does not require any additional infrastructure in your Splunk Cloud Platform environment". Included capacity 500 GB per day. Not named as a Machine Data Lake landing path on the page read | [12][51] |
| Data Management Service Cloud API | "programmatic management of Edge Processor and Ingest Processor pipelines" | New in Splunk Cloud Platform 10.6. No status label | [14], September 16, 2026 |
| OpenTelemetry | (a) Machine Data Lake landing via an OTel Collector through HEC. (b) Observability Studio: "a developer-first experience for instrumenting apps with OpenTelemetry from the start" | (a) Documented, no status label. (b) "Observability Studio — Available Now" (September 16, 2026) | [16][34] |
| Cisco Time Series Model (in Splunk: Cisco Deep Time Series Model) | Zero-shot forecasting and anomaly detection on machine data; "250-million-parameter model" | September 8, 2025: "Time Series Foundation Model" is "coming soon" [9]. November 24, 2025: "v1.0-preview" [26]. June 23, 2026: Cisco Time Series Model 1.0 is "open-weight, Apache 2.0 licensed, and available now", used in Splunk through "AI Toolkit 5.7.4" [25]. September 15, 2026: listed as a self-hosted model on Cisco AI POD for Splunk [8]. More models: "just the first", with "future Foundation Models" and no timing [7] | [7][8][9][25][26] |
| AI Canvas connection | "AI Canvas in Cisco Cloud Control provides the collaborative surface where humans and agents inspect telemetry" (sentence continues). AI Canvas "can access Splunk data and Splunk-specific skills" | Splunk Cloud Platform 10.6 release notes label the "Cisco AI Canvas integration" **GA** [14]. Requires Splunk Cloud Platform 10.5 or later on a US Commercial AWS stack [38]. Splunk ITSI integration with AI Canvas "will be available in controlled availability in fall to winter" (June 2, 2026) [4] | [3][4][14][38] |
| Splunk MCP Server | "standardized, secure, and scalable interface" between AI assistants or agents and Splunk data; explore data, run SPL searches; "Built-in authentication, authorization, and Role-Based Access Control (RBAC)" | Docs: "As of version 1.0.0, the Splunk MCP Server is generally available (GA)", and "specific tools or capabilities within the server might be released in preview or beta status" [20]. Splunkbase listing (version 2.1.0, October 24, 2026, Splunk Supported) describes it as available to Enterprise and Cloud customers "in beta" [22] | [20][21][22] |
| Agent Launchpad (Splunk AI Toolkit) | "Agent Launchpad can help you build, run, review, and manage operational agents directly in Splunk." No-code; MCP tools; skills; human approval per tool; run history | "now generally available" (August 4, 2026) [1]; "the newly-GA Agent Launchpad" (September 24, 2026) [35]. Requires "a Splunk Cloud Platform customer running the AI Toolkit in a supported region" (13 AWS regions listed) [23]. "On-premises users of the AI Toolkit can get Agent Launchpad through the Splunk Cloud Connect app." [23]. The September 15, 2026 Cisco press release says "coming later this year" [8], which brief 05 reads as the on-prem AI POD scope | [1][8][23][35] |
| Splunk agent skills | Open-source skills on GitHub (github.com/splunk/splunk-agent-skills), Apache-2.0 | August 4, 2026: "the first three Splunk-built skills" [1]. Repository on November 13, 2026 lists 32 skills and warns "These skills are experimental." [24] | [1][24] |
| Splunk Agent Observability with Tokenomics | Monitors and evaluates agents; tracks token cost | "now available in Splunk Observability Cloud and in Cisco Cloud Control" [8]; "available September 2026 on-premises and in Cisco Cloud Control and Observability Cloud" [34] | [8][34] |
| Network Intelligence App | "brings Cisco network topology, device health, and event data into Splunk" | "Network Intelligence App — Available September 30, 2026" | [32][34] |
| Cisco AI POD for Splunk | "turnkey and pre-validated hardware-and-software stack" for on-premises, private cloud, or air-gapped use | "available today" (September 15, 2026) | [8][35] |

---

## B) Third-party reach, concretely

### B1. Federated Search and Federated Analytics targets

Scope rules that apply to every row except Splunk-to-Splunk:

- Available "only for Splunk Cloud Platform deployments", and "you must contact your Splunk sales representative" to activate [11].
- "not currently available for Splunk Cloud Platform deployments on Microsoft Azure or Google Cloud" or in FedRAMP Moderate, FedRAMP High, IRAP, or DoD IL5 environments [12]. In plain terms: the Splunk Cloud stack must run on AWS, even when the data being searched sits in Azure.
- "designed for historical investigations, ad hoc reporting, dataset exploration, and compliance-oriented lookbacks." "It is not a replacement for Splunk-indexed data for real-time detections." [12]
- Data in archive storage classes (for example S3 Glacier) "may not be immediately searchable" [12].

| Target | What is searched | Status, in the source's words | Source |
|---|---|---|---|
| Splunk to Splunk | Remote Splunk Cloud Platform or Splunk Enterprise deployments | "available to users of Splunk Cloud Platform and Splunk Enterprise". "designed to work only with remote deployments running the Splunk platform." | [11] |
| Amazon S3 | "remote datasets in your Amazon S3 buckets" | Listed in 10.7 docs. September 2025 press release: "Amazon S3 (available now)". GA May 18, 2026 per brief 05 (source 21 there) | [9][11] |
| Apache Iceberg and Delta Lake tables on S3 (through AWS Glue) | "Select Iceberg if your Glue table supports the Apache Iceberg format." "Select Delta if your Glue table supports the Delta Lake format." | Documented in Splunk Cloud Platform 10.6 docs (updated September 16, 2026); requires 10.4.2604 or higher. The AWS Glue Iceberg REST catalog interface is not supported. No GA label on the page | [13] |
| Azure Blob Storage and Azure Data Lake Storage | Datasets "located in Microsoft Azure Data Lake Storage (ADLS) and Azure Blob Storage (ABS) containers" | Listed in 10.7 docs. "in controlled availability now" on June 2, 2026 [4]. GA July 6, 2026 per brief 05 (source 22 there) | [4][11][12] |
| Iceberg and Delta Lake on Azure Blob | Table formats on Azure storage | "(both when ABS-based) are in controlled availability now"; "will be generally available in summer to fall" (June 2, 2026). No later confirmation found | [4] |
| Azure Databricks | "Azure Databricks tables stored remotely in Unity Catalog"; authentication through Databricks Delta Sharing | Listed in 10.7 docs | [11] |
| Databricks (not Azure) | Described by Splunk as "Databricks" and by TechTarget as "Databricks on AWS" | "Today we are extending" Federated Search to "AWS CloudWatch Lake and Databricks" (September 15, 2026) [7][30]. The 10.7 docs list only Azure Databricks [11]. See Gaps | [7][11][30] |
| Snowflake | "Snowflake tables and views" | Listed in 10.7 docs. GA July 6, 2026 per brief 05 | [11] |
| Splunk DDSS | "Dynamic Data Self Storage (DDSS) datasets that you are storing in Amazon S3 locations" | Listed. "does not support federated search of DDSS datasets that are located in Azure or GCP" | [11] |
| Cisco Security Analytics and Logging | Cisco "firewall event logs stored in Amazon Web Services (AWS)" | New feature in Splunk Cloud Platform 10.6: "brings Cisco SAL data into the standard Federation search model." | [11][14] |
| Amazon CloudWatch (CloudWatch Unified Data Store, also called CloudWatch Lake) | CloudWatch log data; the store "centralizes metrics, logs, and traces from AWS services and third-party sources" | New feature in 10.6 [14]; "Today we are extending" (September 15, 2026) [7] | [7][11][14] |
| Amazon Security Lake (Federated Analytics) | "Amazon Security Lake security data that is stored in your Amazon Web Services (AWS) account" | Listed; AWS except GovCloud | [11][12] |
| Microsoft Fabric, Microsoft Sentinel, Google BigQuery, Google SecOps (Chronicle) | Not applicable | **Not found.** No Splunk source names any of these as a federated target | Gaps |

Product-page wording is looser than the documentation. The Federated Search product page says it is "ideal for low-frequency, ad-hoc searches on data stored in Amazon S3, Snowflake, Delta Lake, Iceberg, Azure Blob, and more" [28]. Use the documentation list above for anything a customer will rely on.

### B2. Agent-side connections (MCP)

| Connection | What it is | Status | Source |
|---|---|---|---|
| Splunk MCP Server (inbound: outside agents reach Splunk) | Splunkbase app 7931. Tools with a `splunk_` prefix, plus `saia_generate_spl`, `saia_explain_spl`, and `saia_ask_splunk_question`, which require the Splunk AI Assistant. Role needs the `mcp_tool_execute` capability for AI Canvas use | Docs: GA as of version 1.0.0. Splunkbase summary: "in beta". Version 2.1.0, October 24, 2026; 26,830 downloads | [20][21][22][38] |
| Agent Launchpad MCP connections (outbound: Splunk agents reach other systems) | "Supported MCP providers include Splunk, Atlassian, Slack, PagerDuty, GitHub, and GitLab." Custom MCP connections with Basic Auth, API key, Bearer Token, or OAuth 2.0. Each tool can be set to "Approval required" | Generally available in Splunk Cloud in supported regions. ServiceNow is not on the named MCP provider list | [1][23] |
| Agent Launchpad model providers | OpenAI, Anthropic, Azure OpenAI, Amazon Bedrock, and Splunk hosted models. "Custom LLM and Ollama connections are not supported with Agent Launchpad." | Same as above | [23] |
| Cloud Control ecosystem | Cloud Control "connects to a large ecosystem, including AWS, Linear, Microsoft, PagerDuty, ServiceNow, Slack" (sentence continues) | See brief 05 section D for per-item status | [10] |

### B3. Splunkbase apps and add-ons relevant to a hospital

Splunk states: "The site lists more than 2,000 apps and add-ons with curated collections of top apps tied to key business outcomes." (July 9, 2026) [27]

| System | Integration | Type | Support and currency (read November 13, 2026) | Source |
|---|---|---|---|---|
| ServiceNow | Splunk Add-on for ServiceNow. Pulls incident, event, change, user, group, location, and CMDB data through REST APIs; creates and updates ServiceNow incidents and events from Splunk | Splunkbase add-on (two-way) | Splunk Supported. Version 11.2.1, October 30, 2026. 69,788 downloads | [54] |
| CrowdStrike | CrowdStrike Falcon Event Streams Technical Add-On. Streams detection, event, incident, and audit data through the Event Streams API | Splunkbase add-on | Developer Supported (CrowdStrike). Version 3.7.2, June 12, 2026. 89,322 downloads | [55] |
| Microsoft Defender | Splunk Add-on for Microsoft Security. Incidents and alerts from Microsoft 365 Defender; alerts from Microsoft Defender for Endpoint | Splunkbase add-on | Splunk Supported. Version 5.0.0, November 5, 2026. 241,502 downloads. The listing does not mention Entra or Sentinel | [59] |
| Microsoft Azure and Entra | Splunk Add-on for Microsoft Cloud Services. Activity logs through Event Hubs; Azure audit and resource data; Azure Storage Table and Blob data | Splunkbase add-on | Splunk Supported. Version 6.3.3, September 10, 2026. 517,696 downloads. The listing does not name Entra ID sign-in logs explicitly | [60] |
| Okta | Splunk Add-on for Okta Identity Cloud. Okta System Log events and Universal Directory users, groups, and apps | Splunkbase add-on | Splunk Supported. Version 5.1.0, July 30, 2026. 280,663 downloads | [56] |
| Palo Alto Networks | Splunk Add-on for Palo Alto Networks. Logs from Cortex XDR, IoT Security, firewalls, Panorama, and Strata Logging Service | Splunkbase add-on | Splunk Supported. Version 4.0.0, August 14, 2026. 26,869 downloads | [57] |
| Zscaler | Zscaler Technical Add-On for Splunk. Zscaler events mapped to the Common Information Model | Splunkbase add-on | Developer Supported (Zscaler). Version 4.1.5, May 14, 2026. 92,996 downloads | [58] |
| AWS | Splunk Add-on for Amazon Web Services. CloudTrail, CloudWatch logs and metrics, S3 access logs, Security Lake events, Config, Inspector, Kinesis, SQS | Splunkbase add-on | Splunk Supported. Version 8.3.1, October 21, 2026. 1,168,385 downloads | [61] |
| Claroty xDome (the healthcare product was formerly Medigate) | Claroty xDome Add-on for Splunk. Maps xDome data to the Common Information Model, Splunk Enterprise Security, and the Splunk Add-On for OT Security; for "healthcare and industrial network environments". Claroty's brief says asset attributes and communication events are "fed into Splunk's Enterprise Security (ES) platform" | Splunkbase add-on | Developer Supported (Claroty, "an official Splunk Partner"). Version 1.2.1, September 8, 2025. 1,478 downloads | [62][76] |
| Medigate (legacy) | Medigate app | Splunkbase app | **Archived.** Version 1.1.2, June 29, 2020. Do not present as current | [63] |
| Armis | Armis App for Splunk. The Armis platform discovers managed, unmanaged, and IoT devices, including medical devices | Splunkbase app | Developer Supported. Version 1.5.2, April 17, 2025. 2,852 downloads | [64] |
| Ordr | ORDR + Splunk integration. "This rich and accurate asset intelligence along with up-to-date security alerts can be sent to either Splunk Cloud or Splunk Enterprise platforms." "These security events are shared with Splunk in real time." | Vendor integration (transport not stated in the brief) | Solution brief copyright 2025. No Splunkbase listing found | [65] |
| VMware | Splunk Add-on for VMware. vCenter, ESXi host, and virtual machine data through VMware APIs | Splunkbase add-on | Splunk Supported. Version 4.2.1, July 14, 2026. 47,282 downloads | [66] |
| Nutanix | TA for Nutanix Prism Central. Data from the Prism Central REST API | Splunkbase add-on | Developer Supported (Nutanix Inc). Version 1.1.0, June 16, 2026. 331 downloads. Listing shows Splunk Enterprise compatibility only | [67] |
| Citrix NetScaler | Splunk Add-on for Citrix NetScaler. Syslog, IPFIX, and NITRO API data; CIM- and ITSI-compatible | Splunkbase add-on | Splunk Supported. Version 8.2.5, September 24, 2026. 38,832 downloads | [68] |
| Citrix and endpoint experience | uberAgent UXM - Digital Employee Experience (DEX). Logon duration, application unresponsiveness, network reliability on physical and virtual endpoints | Splunkbase app | Developer Supported (vast limits GmbH). Version 8.1.0, August 11, 2026. 5,836 downloads | [69] |
| Building management (BACnet) | Perseeva LakeView Add-on. LakeView "discovers and monitors BACnet building devices such as HVAC controllers, VAV boxes, and meters" and sends readings, device states, alerts, and inventory through HEC | Splunkbase add-on | Developer Supported (Perseeva, not Splunk). Version 1.0.0, October 16, 2026. **4 downloads.** Very new; do not present as proven | [70] |
| Building and OT (general) | Splunk OT Intelligence. "supports key industry protocols like MQTT, OPC-UA, and SNMP thru Edge Hub OS"; dashboard templates for "manufacturing, retail, building management, and data center environments" | Premium Splunkbase app plus Splunk Edge Hub hardware | "Edge Hub is available through Splunk OT Specialist partners". Certified Cisco devices are "coming soon". BACnet is not named | [53] |
| OT security content | OT Security Add-on for Splunk. Requires Splunk Enterprise Security | Splunkbase add-on | **Not Supported** (Splunk Works). Version 3.0.2, October 12, 2026. Listing says it will be removed from Splunkbase after January 31, 2027 and offered as part of Splunk OT Intelligence | [71] |
| Epic, Oracle Health (Cerner) | No Splunkbase app found. Lantern guidance covers custom collection of clinical application audit data | Custom onboarding | Guidance only | [47] |
| Imprivata | No Splunkbase app found. Imprivata is itself a Splunk Cloud customer | None found | Gap | [45] |
| Nuvolo | No Splunk integration found | None found | Gap | Gaps |
| Johnson Controls, Siemens, Honeywell building systems | No vendor-specific Splunk app or add-on found | None found | Gap | Gaps |

### B4. Cisco-side sources (the "Cisco" half of the story)

The Integrated Enterprise Value documentation lists which Cisco products map to which supported add-on [19]:

| Cisco product | Supported Splunk add-on or app | Listing detail (read November 13, 2026) | Source |
|---|---|---|---|
| Secure Firewall, AI Defense, Secure Client, Duo, Email Threat Defense, XDR, Identity Intelligence, Isovalent, Multicloud Defense, Secure Endpoint, Secure Malware Analytics, Secure Network Analytics, Secure Workload, Vulnerability Intelligence | Cisco Security Cloud | Cisco Supported. Version 4.1.3, October 26, 2026. 62,947 downloads | [19][72] |
| Meraki | Cisco Meraki Add-on for Splunk. REST APIs and webhooks: security events, Air Marshal, device availability, wireless and switching performance, environmental sensor data, configuration changes | Cisco Supported. Version 3.5.0, September 24, 2026. 17,222 downloads | [19][73] |
| Catalyst Center, Catalyst SD-WAN, Cyber Vision, ISE, IOS devices | Cisco Catalyst Add-on for Splunk (listed as Cisco Enterprise Networking Add-on). API, syslog, and NetFlow data | Cisco Supported. Version 4.0.60, October 20, 2026. 10,844 downloads | [19][75] |
| Identity Services Engine | Splunk Add-on for Cisco ISE | Listed in the IEV table | [19] |
| ThousandEyes | Cisco ThousandEyes App for Splunk. Test results from Cloud and Enterprise Agents and Endpoint agents; event and activity logs. Feeds the "Content Pack for Cisco ThousandEyes" in Splunk ITSI | Cisco Supported. Version 0.9.0, August 24, 2026. 3,135 downloads | [19][52][74] |
| ACI, Nexus Dashboard, Nexus | Cisco DC Networking | Listed in the IEV table | [19] |
| Intersight, UCS | Cisco Intersight Add-on for Splunk; Splunk Add-on for Cisco UCS | Listed in the IEV table | [19] |
| Secure Access, Umbrella | Cisco Secure Access Add-on for Splunk | Listed in the IEV table | [19] |
| Webex | Cisco Webex (app 5781) | Listed in the IEV table | [19] |
| Cisco Spaces, Unified Communications Manager, Expressway, and other collaboration sources | No add-on listed; sourcetypes are eligible as listed in the documentation | Listed in the IEV table | [19] |
| Cisco firewall logs held in Security Analytics and Logging | Federated Search (no ingest) | New in Splunk Cloud Platform 10.6 | [11][14] |

---

## C) Hospital data-source map

Read this as: what a hospital already runs, what machine data it produces, and the documented route into Data Fabric. Rows marked "PHI caution" can carry patient identifiers and belong in a HIPAA environment under a BAA, or should be masked at ingest (section E).

| Source system | Example machine data | How it reaches Data Fabric | Status | Source |
|---|---|---|---|---|
| Meraki campus and clinic network | Device availability, wireless performance, Air Marshal events, sensor readings | Cisco Meraki Add-on (API and webhooks). Eligible for the 0.5x Cisco weighting | Current listing, Cisco Supported | [19][73] |
| Catalyst Center, SD-WAN, Cyber Vision | API, syslog, and NetFlow data | Cisco Catalyst Add-on. Eligible for the 0.5x Cisco weighting | Current listing, Cisco Supported | [19][75] |
| Cisco ISE and Duo | Authentication and network access events | Splunk Add-on for Cisco ISE; Cisco Security Cloud for Duo | Listed in IEV table | [19][72] |
| Cisco Secure Firewall | Connection and intrusion events | Cisco Security Cloud (ingest), or Federated Search for Cisco Security Analytics and Logging (in place) | Add-on current; federated option new in 10.6 | [11][14][72] |
| ThousandEyes (EHR, telehealth, SaaS paths) | Synthetic test results, endpoint agent data, alerts | Cisco ThousandEyes App for Splunk; ITSI content pack | Current listing (version 0.9.0) | [52][74] |
| Nexus, ACI, UCS, Intersight | Fabric and compute events | Cisco DC Networking; Intersight and UCS add-ons | Listed in IEV table | [19] |
| Cisco Spaces | Spaces sourcetypes | No add-on listed; sourcetypes eligible for the Cisco weighting | Listed in IEV table | [19] |
| Okta | System Log events; users, groups, apps | Splunk Add-on for Okta Identity Cloud | Current listing, Splunk Supported | [56] |
| Microsoft Defender | Incidents and alerts | Splunk Add-on for Microsoft Security | Current listing, Splunk Supported | [59] |
| Microsoft Azure | Activity logs through Event Hubs, audit data | Splunk Add-on for Microsoft Cloud Services | Current listing, Splunk Supported | [60] |
| CrowdStrike | Detections, incidents, audit events | Falcon Event Streams Technical Add-On | Current listing, Developer Supported | [55] |
| Palo Alto Networks | Firewall, Panorama, Cortex XDR logs | Splunk Add-on for Palo Alto Networks | Current listing, Splunk Supported | [57] |
| Zscaler | Web and access events | Zscaler Technical Add-On | Current listing, Developer Supported | [58] |
| ServiceNow | Incidents, changes, CMDB items; Splunk can open and update incidents | Splunk Add-on for ServiceNow | Current listing, Splunk Supported | [54] |
| AWS accounts | CloudTrail, CloudWatch logs, Security Lake events | Splunk Add-on for AWS (ingest), or Federated Search for S3, CloudWatch, and Federated Analytics for Security Lake (in place) | Add-on current; federated options listed in 10.7 docs | [11][61] |
| Azure storage and Azure Databricks | Archived logs in Blob or ADLS; Unity Catalog tables | Federated Search (Splunk Cloud stack must be on AWS) | Listed in 10.7 docs | [11][12] |
| Snowflake | Tables and views | Federated Search | Listed in 10.7 docs | [11] |
| Medical device security platform: Claroty xDome | Device asset attributes, communication events, alerts | Claroty xDome Add-on, mapped to CIM and Enterprise Security | Current listing, Developer Supported (last version September 2025) | [62][76] |
| Medical device security platform: Armis | Device risk and alert information | Armis App for Splunk | Current listing, Developer Supported (last version April 2025) | [64] |
| Medical device security platform: Ordr | Asset intelligence and security alerts | Vendor integration to Splunk Cloud or Splunk Enterprise | Vendor brief (2025); no Splunkbase listing found | [65] |
| EHR access audit logs (Epic, Oracle Health, Meditech, Veradigm). **PHI caution** | User, action, time, and medical record number per access | Custom onboarding; no packaged connector found | Lantern guidance only | [47] |
| EHR delivery path (Citrix) | NetScaler syslog and IPFIX; logon duration and session experience | Splunk Add-on for Citrix NetScaler; uberAgent UXM | Current listings | [68][69] |
| Virtualization (VMware, Nutanix) | Host and virtual machine performance and inventory | Splunk Add-on for VMware; TA for Nutanix Prism Central | Current listings | [66][67] |
| Imaging (PACS) performance | Application response and network path timing | Shown in a customer story with Splunk AppDynamics and ThousandEyes; no PACS add-on cited | Customer story | [43] |
| Building management (BACnet HVAC controllers, meters) | Readings, device states, alerts, device inventory | Perseeva LakeView Add-on over HEC; or Splunk OT Intelligence with Edge Hub (MQTT, OPC-UA, SNMP) | LakeView is new (4 downloads). Johnson Controls, Siemens, Honeywell: none found | [53][70] |
| Any syslog, HEC, or OpenTelemetry source (nurse call servers, RTLS servers, interface engines) | System events and health | Forwarders, Edge Processor, HEC, or OTel Collector through HEC into an index or Machine Data Lake. Positioning: no vendor-specific add-on was found for nurse call or RTLS vendors | Generic paths documented | [16] |

---

## D) Healthcare: Splunk solutions and published customer stories

### D1. Splunk's healthcare positioning

- Healthcare industry page headline: "Protect what's mission critical across the care continuum". Sections cover patient care optimization, security control monitoring and privacy compliance, medical device security, and telehealth. The page contains no numeric metrics and does not mention Epic by name [40].
- Lantern use case "Monitoring medical record numbers for anomalous access": aimed at monitoring access to ePHI, with the goal to "Identify anomalous user activity". It names Epic, Oracle Health (formerly Cerner), Meditech, and Veradigm (formerly Allscripts) as clinical applications and recommends patient access, user access, and peer comparison dashboards. It provides no SPL and names no customer [47].
- HIMSS25 blog (March 24, 2025): states that Cisco XDR is integrated with Splunk Enterprise Security for healthcare security operations. It names no customer [77].
- No Splunk IT Service Intelligence content pack for Epic was found. The documented ITSI path for EHR experience is ThousandEyes: the "Content Pack for Cisco ThousandEyes" builds on data ingested by the Cisco ThousandEyes App for Splunk [52].

### D2. Published customer stories

None of these stories names Cisco Data Fabric, Machine Data Lake, or Federated Search. They show Splunk in hospitals, which is the base Data Fabric builds on.

| Organization | What they did | Metrics stated | Exact quotes | Source |
|---|---|---|---|---|
| NewYork-Presbyterian | Built a security operations center on Splunk, then a patient privacy platform that integrates with clinical systems such as Epic and alerts privacy officers to inappropriate record access. Extended it to medication analytics for opioid diversion. **PHI caution: this is a privacy-audit use case, not machine-data aggregation** | None quantified | Jennings Aske, Senior Vice President and Chief Information Security Officer: "we wanted to have a platform to help us make sure people weren't snooping"; "We have an ethical and moral obligation to not simply rely on manual auditing" | [41] (undated page) |
| Children's National Hospital (Washington, D.C.) | Moved from on-premises to Splunk Cloud; with Trustwave built about 80 use cases and ported them to Splunk Enterprise Security; centralized data from devices, identity systems, and network traffic | 80+ security use cases; 40% increase in threat detection; 25% increase in analyst productivity; 25% reduction in weekly time on routine administration | Sharon Finney, director of cybersecurity operations: "The bad actors only have to be right one time, but I have to be right every time." Nathan Lesser, CISO: "we gain the visibility needed to protect data, no matter where it lives." | [42] (undated page) |
| NYC Health + Hospitals (70+ locations, 43,000 healthcare professionals) | Adopted Splunk AppDynamics and Cisco ThousandEyes for full-stack observability; traced slow VPN access to ServiceNow; found a latency issue long blamed on the network was an overloaded application server CPU; improved PACS monitoring for remote radiology reads | None quantified | Jeffrey Lutz, Chief Technology Officer: "If our services go down, we let them down, and that's not an option."; "The fact that our radiologists can reliably read and assess PACS imaging from any location is a game changer." | [43] (undated page) |
| Research university with a health system (anonymized) | Health system security team adopted Splunk Enterprise Security and Risk-Based Alerting; used the asset database to prove endpoint detection coverage | 60%+ reduction in MTTD; 40% reduction in ticket investigation times; hundreds of unmanaged endpoints secured | SIEM Engineer, health system: "Before, we'd have to check at least four systems to figure out why a machine wasn't allowed on the network," | [44] (undated page) |
| Imprivata (healthcare identity vendor) | Moved from Splunk Enterprise to Splunk Cloud; centralized logs from cloud infrastructure, applications, appliances, AWS, and firewalls; relied on Splunk Cloud's BAA to support HIPAA compliance | About 150 GB per day; in the first month, Level 1 and Level 2 staff handled 100% of production incidents without escalating to DevOps | Manager, Cloud Platform Team: "Splunk Cloud lowers our infrastructure cost of ownership while freeing IT time for high-value work," | [45] (undated page) |
| Banner Health (Cisco-published quote) | Customer quote in a Cisco Newsroom article on the Cisco and Splunk combination | None | Elevsis Delgadillo, Vice President, IT Infrastructure, Operations and Service Delivery: "At Banner Health, we rely on Cisco for our network and Splunk to keep it healthy." | [46] (URL path dated March 2024) |
| UnitedHealth Group (payer; press interview, not a customer story) | Comment on federated data during incidents | None | Karun Subramanian, Senior Director of AI for Infrastructure and Operations: "You cannot really wait for an hour for data to be rehydrated" | [30], September 18, 2026 |

---

## E) Economics and governance for a hospital CIO and CISO

| Claim | What the source says | Limits and caveats | Source |
|---|---|---|---|
| 50% weighting for Cisco data | "Integrated Enterprise Value (IEV) is a Splunk benefit for eligible Cisco-generated data." Eligible data counts at a 0.5x weighted rate, so 20 GB per day of eligible Cisco data counts as 10 GB per day. "twice the license value for eligible Cisco data compared with standard ingest treatment." | Ingest-based licenses only (Splunk Cloud ingest license; Splunk Enterprise ingest licenses above 100 GB per day). Does not apply to workload, vCPU, search, or federated search metrics unless the contract says so. Data must use a supported sourcetype. **Non-Cisco data is not eligible.** It "does not change how much data is stored, indexed, retained, or searched" | [1][19] |
| Included capacity | "Eligible Splunk Cloud Platform environments include fixed capacity for selected features at no additional charge." "Land and retain up to 10TB of machine data in Machine Data Lake"; promote up to 1 TB per year to a static Splunk index and up to 10 GB per day to an Analytics Table; Federated Search 100 searches per day, weighted by compressed GB scanned; Ingest Processor 500 GB per day | "Included capacities are consumed before your purchased capacity." Subject to "service limits, regional availability, cloud provider support, and your environment's configuration." October 2026: Machine Data Lake included capacity rose to "10 TB of included retained Landing capacity, increased from 9 TB." | [12][18] |
| Storage economics | "Raw data lands in open formats at commodity object storage cost as an immutable source of truth." Docs: retain "supported logs and events in economical object storage". Kamal Hathi: "What you need in this agentic era is to grow your data maybe 10x, without having your bill go up in proportion" | Vendor statements; no price list published | [2][16][30] |
| Activity-Based Pricing | "a licensing model that enables you to commit to an annual dollar amount." TechTarget: rolled out "in controlled availability last month" (reported September 18, 2026). Partner blog: "Activity-Based Pricing (coming fall 2026)" | Sources disagree on status. Present as controlled availability and confirm | [12][30][35] |
| Masking and tokenization at ingest | "Sensitive data is masked or tokenized at ingest before it enters the platform, and because federation queries data in place, regulated data can stay in its home region instead of being copied to a central store." Ingest Processor: "Mask confidential information in the data."; "Specifying a regular expression that selects and masks data" | Masking is configured by the customer in pipelines with regular expressions. No source describes automatic PHI detection | [2][51] |
| Field-level redaction at search time | Field filters, labeled GA and on by default in Splunk Cloud Platform 10.6, redact or obfuscate sensitive fields in search results | Release notes warn of downstream impacts on accelerated data models | [14] |
| Federation leaves data in place | Federated Search runs "without moving or duplicating data". Mangesh Pimpalkhare, SVP and GM, Splunk Platform at Cisco: "Cost is directly addressed by this federated approach." | Splunk Cloud on AWS only; not for real-time detections | [12][28][31] |
| Data residency | "You can store your data in one of the available AWS, Azure, or Google Cloud regions." "Data is kept in the region you choose." | Cisco Cloud Control's Splunk connection is hosted in AWS US West; customers should "identify any regional data requirements" before connecting | [12][38] |
| On-premises option | Cisco AI POD for Splunk is "available today" (September 15, 2026). Splunk names "industries such as healthcare, finance, and government" as needing on-premises deployment. Analyst Bob Laliberte: "This is great news for organizations that require on-premises solutions due to privacy or sovereignty demands." | Federated Search to third-party stores and Machine Data Lake are Splunk Cloud features, not on-premises features | [7][8][11][33] |
| HIPAA: Splunk Cloud Platform | Splunk Cloud Platform "is compliant with the HIPAA Security Rule and HITECH Breach Notification Requirements". HIPAA region availability: "All regions". "You must provide IP allow list rules to access your Splunk Cloud Platform HIPAA environment." Sold as an add-on: "Add a HIPAA or PCI DSS cloud environment." | "Not all features may be available in regulated cloud environments." Whether Machine Data Lake, Federated Search, and Agent Launchpad are available inside a HIPAA environment was not confirmed | [12] |
| HIPAA: attestation | "specified Splunk products are reviewed and evaluated by an independent third-party auditor against the HIPAA requirements". Customers who want to use HIPAA-compliant Cloud products with PHI "must review and accept Splunk's Business Associate Agreement (BAA)." | Page states its information is current as of February 2026 and points to the Customer Trust Portal for scope | [48] |
| HIPAA: BAA | Available to "Companies who have licensed or subscribed to HIPAA-certified Hosted Services". "This BAA applies only to paid subscriptions to the HIPAA-certified Hosted Services and does not apply to on-premise component(s) of a hybrid Offering or to Hosted Services that are not HIPAA-certified." | "Splunk BAAs are not available for and do not apply to: Trials, Evaluations, Beta or Free Licenses." Exemplar is marked "v. 10.23" | [49][50] |
| HIPAA: Cloud Control and AI Canvas | Governed by Cisco terms; the customer must review them to confirm alignment, "including the Health Insurance Portability and Accountability Act (HIPAA), the Payment Card Industry (PCI) standard" | No Cisco BAA statement for Cloud Control was found (brief 05, gap 9) | [38] |

### The PHI boundary (positioning, with supporting evidence)

- Data Fabric is positioned for machine data: logs, metrics, traces, flows, and events from network, security, identity, device connectivity, and application performance systems. Splunk's own description of the data is "logs, traces, metrics, flows, anomalies, sequences, and time series" [3].
- The Splunk BAA states: "The Parties acknowledge and agree that Splunk does not maintain Protected Health Information in a Designated Record Set." [50] This supports the statement that Splunk is not the system of record for patient data.
- Some hospital use cases do touch PHI, most clearly EHR access-audit monitoring, which correlates medical record numbers with user activity [41][47]. For those, the supported path is a Splunk Cloud HIPAA environment under a signed BAA, or masking in Edge Processor or Ingest Processor pipelines before the data lands [12][50][51].
- Clinical records stay in the EHR. Nothing in any source positions Data Fabric as a store for clinical documentation, orders, results, or images.

---

## F) How Data Fabric feeds agents

| Step | Exact wording | Source |
|---|---|---|
| One data layer for people and agents | "People and agents work from a single data layer, sharing the same operational context" (Cisco, June 2, 2026; sentence continues) | [10] |
| Agents reach across stores | "Agents and analysts need to reach across real-time data, historical data, federated sources, third-party systems," (sentence continues with external stores) | [3] |
| Context before action | "The agent queries the knowledge graph for every affected service, host, and user, then runs federated searches across Splunk indexes, the Machine Data Lake, and external stores to gather corroborating evidence." | [2] |
| Traceability | "Lineage back to the immutable raw tier makes every output traceable, which is what trust depends on." | [2] |
| MCP as the governed interface | "MCP Server extends those workflows across systems through a governed interface," (sentence continues) | [3] |
| AI Canvas as the shared surface | "AI Canvas in Cisco Cloud Control provides the collaborative surface where humans and agents inspect telemetry," (sentence continues) | [3] |
| AI Canvas reaches Splunk | AI Canvas "can access Splunk data and Splunk-specific skills"; "Splunk access controls preserved"; needs the Splunk MCP Server and Splunk AI Assistant apps and the `mcp_tool_execute` capability | [38] |
| Build your own agents | "Use powerful tools like Splunk MCP server and AI Toolkit to connect and build your own custom agents" in Cisco Cloud Control | [37] |
| Human role | "Rather than replacing operators with autonomous agents, the goal is to give every operator a trusted team of agents" | [3] |
| Human approval | In Agent Launchpad each MCP tool can be set to "Approval required"; reviewers can approve, reject, or reject with guidance | [23] |
| Agent oversight | Agent Observability "lets you monitor and evaluate generative AI and agentic applications" (Cloud Control release note, September 15, 2026). TechTarget: it "grades all agent traffic, rather than a sample" | [29][39] |
| Analyst framing | "Before an AI agent can act, it needs the context around the action and the control over what it is permitted to do." | [29] |

Known limit: "The Splunk AI Assistant may generate SPL that includes the rest command, which the Splunk MCP cannot execute." Workaround listed: "None." [39]

---

## G) New since .conf26 (October and November 2026)

| Date | What changed | Status wording | Source |
|---|---|---|---|
| September 30, 2026 | Network Intelligence App | "Available September 30, 2026" | [34] |
| October 13, 2026 | Agent Launchpad documentation (AI Toolkit 6.2.0) lists 13 supported AWS regions, MCP providers, human approval per tool, and the Splunk Cloud Connect route for on-premises AI Toolkit users | Documentation update | [23] |
| October 17 to 22, 2026 | Splunk Cloud Platform 10.7: Catalog becomes "the single place to discover and manage your federated and MDL raw datasets and their connections"; continuous promotion from Machine Data Lake into an analytics table; editable streaming promotions; Machine Data Lake across multiple search heads | Release notes; no GA or preview labels | [15] |
| October 19, 2026 | Service Details 10.7: Machine Data Lake on AWS "Available, except GovCloud US-West and GovCloud US-East regions"; included capacity package documented | Service documentation | [12] |
| October 2026 | Cloud Monitoring Console 4.9.0: optimization advisor with "recommendations for Machine Data Lake and Activity Based Pricing"; included Machine Data Lake capacity "increased from 9 TB" to 10 TB; Activity Based Pricing breakdown showing "raw ingestion, effective license usage, and Cisco data benefits" | Release notes (page header dated October 17 while listing an October 22 release) | [18] |
| October 24, 2026 | Splunk MCP Server version 2.1.0 on Splunkbase | Listing summary says "in beta" | [22] |
| October 26 to 27, 2026 | Cisco Partner Summit. Cisco recap (November 5): "Powered by the Splunk Platform, the Cisco Data Fabric provides an AI-ready data architecture" | No new Data Fabric capability or status in the recap | [36] |
| October 27 to November 10, 2026 | Cisco Cloud Control release notes: environments, Secure Access notifications, bulk actions, Catalyst Center setup, Cisco Spaces. **No entry mentions Splunk, Data Fabric, or MCP** | Release notes | [39] |
| November 2026 (planned) | Splunk Observability Cloud Essentials and Premier editions | "Essentials and Premier editions are coming in November" (stated September 16, 2026). Not confirmed as shipped | [34] |
| November 5, 2026 | Splunk Add-on for Microsoft Security version 5.0.0 | Splunkbase listing | [59] |

Not confirmed by fetch: a Splunk Community post, "The Data Connection - October 2026", and a companion post on Catalog. Both returned HTTP 403. A search-result summary says the October post describes continuous promotion into "an Iceberg-based Analytics Table". Treat as unverified until read directly.

---

## H) Where this brief updates or contradicts brief 05

| Brief 05 statement | What this research found | Source |
|---|---|---|
| Section B and claim 12: the exact phrase "object storage cost" is not verified; use "low-cost tier" | **Now verified.** Splunk blog, August 13, 2026: "Raw data lands in open formats at commodity object storage cost as an immutable source of truth." Machine Data Lake docs: "economical object storage" | [2][16] |
| Section B and claim 9: Iceberg and Delta Lake are unverified with "no GA date or connector documentation" | **Connector documentation exists.** Federated Search for Amazon S3 supports AWS Glue tables in Iceberg or Delta format (10.4.2604 or higher). They are table formats under the S3 option, not separate providers. Azure-based Iceberg and Delta were in controlled availability on June 2, 2026, with no later confirmation. Still no explicit "GA" label for the table formats | [4][13] |
| Claim 16: Machine Data Lake GA regions are US-East, Frankfurt, Tokyo, and Sydney only | **Likely out of date.** Service Details 10.7 (October 19, 2026): AWS "Available, except GovCloud US-West and GovCloud US-East regions"; Google Cloud and Azure "Not currently available". The four-region list is from the August 11 blog | [6][12] |
| Section B and claim 18: Activity-Based Pricing is Roadmap ("Set to release this Fall") | **Sources now conflict.** TechTarget (September 18): rolled out "in controlled availability last month". Service Details 10.7 documents the subscription model. Partner blog (September 24): "coming fall 2026". Safer wording: controlled availability | [12][30][35] |
| Section B: Splunk MCP Server is GA | **Partly contradicted.** Docs say GA as of version 1.0.0 with some tools possibly in preview or beta. The Splunkbase listing for version 2.1.0 still says "in beta" | [20][22] |
| Section B: Cisco Deep Time Series Model "Announced September 15, 2026" | **Earlier.** Preview November 24, 2025. Cisco Time Series Model 1.0 "available now" under Apache 2.0 on June 23, 2026, integrated in Splunk as Cisco Deep Time Series Model | [25][26] |
| Section B: agent skills are "first three Splunk-built skills" | The repository now lists 32 skills and labels them experimental | [24] |
| Sources 24 and 25: publication dates not confirmed | Confirmed: August 13, 2026 (Sancha Norris) and June 15, 2026 (Hanlin Fang) | [2][3] |
| Section B: Federated Search for "AWS CloudWatch Lake and Databricks" | Docs name the first "Federated Search for CloudWatch Unified Data Store". Docs list only Azure Databricks; TechTarget says "Databricks on AWS". Naming nuance, not a contradiction | [11][14][30] |
| Section B: 50% weighted ingest verified | Confirmed and sharpened: the benefit is named Integrated Enterprise Value, applies to ingest licenses only, and excludes generic sourcetypes | [19] |

---

## I) Claims that must NOT be made

1. Do not attach the word "clinical" to the Data Fabric name, and do not call it a clinical data repository, a patient data lake, or a replacement for the EHR. It aggregates machine data.
2. Do not say Data Fabric "connects to Epic" or "integrates with Oracle Health". No packaged connector was found. The accurate statement is that Splunk can ingest EHR audit logs through custom onboarding [47], and can monitor the EHR delivery path through ThousandEyes, Citrix, and infrastructure telemetry.
3. Do not say Federated Search works from any Splunk deployment. It is Splunk Cloud Platform only, and "not currently available for Splunk Cloud Platform deployments on Microsoft Azure or Google Cloud" [12].
4. Do not present Federated Search as a real-time detection path. "It is not a replacement for Splunk-indexed data for real-time detections." [12]
5. Do not list Microsoft Fabric, Microsoft Sentinel, Google BigQuery, or Google SecOps as federated targets. None was found.
6. Do not call Iceberg and Delta Lake standalone "connectors" or label them GA. They are documented table formats under the Amazon S3 option [13].
7. Do not say the 50% Cisco weighting applies to all data or all license types. It applies to eligible Cisco data on ingest-based licenses, and non-Cisco data is not eligible [19].
8. Do not say third-party data (ServiceNow, CrowdStrike, Okta, Epic, medical device platforms) gets the 50% weighting.
9. Do not say Splunk "automatically finds and masks PHI". Masking is configured by the customer in pipelines [51].
10. Do not say Splunk or Data Fabric is "HIPAA certified" as a blanket statement. The accurate statement: Splunk Cloud Platform offers a HIPAA environment as an add-on, with a BAA that covers only paid HIPAA-certified Hosted Services and excludes on-premises components [12][50].
11. Do not say Cisco Cloud Control or AI Canvas is covered by the Splunk BAA. They are third-party content under Cisco terms [38].
12. Do not say Machine Data Lake, Federated Search, or Agent Launchpad are available inside a Splunk Cloud HIPAA environment. This was not confirmed. "Not all features may be available in regulated cloud environments." [12]
13. Do not cite Splunk healthcare customers as Data Fabric customers. NewYork-Presbyterian, Children's National, NYC Health + Hospitals, and the others used Splunk Enterprise Security, Splunk Cloud, AppDynamics, or ThousandEyes [41]-[45].
14. Do not present the NewYork-Presbyterian privacy platform as a machine-data use case. It is a PHI audit use case and belongs on the regulated side of the boundary.
15. Do not show Johnson Controls, Siemens, Honeywell, Nuvolo, or Imprivata logos as Splunk integrations. None was found.
16. Do not present the Perseeva LakeView BACnet add-on as an established integration. It was published October 16, 2026 and shows 4 downloads [70].
17. Do not present the Medigate Splunk app as current. It is archived; the current listing is the Claroty xDome Add-on [62][63].
18. Do not say the knowledge graph or lineage capability is GA. No status label was found [2][3].
19. Do not say the Splunk MCP Server is GA without noting that the Splunkbase listing says "in beta" [20][22].
20. Do not say "thousands of integrations" beyond Splunk's own number. The stated figure is "more than 2,000 apps and add-ons" [27], and many listings are developer supported or not supported.
21. Do not say agents act on hospital systems without approval. The documented control is per-tool "Approval required" in Agent Launchpad [23], and Splunk's stated goal is "to give every operator a trusted team of agents" rather than replace operators [3].
22. Do not quote Autodesk's "28% lower ingest costs" or the keynote's "30% capacity expansion at zero added cost" as healthcare results. They are non-healthcare examples [32][35].

---

## J) Sources

1. Splunk Blog, "From Vision to Value: New Splunk Platform Innovations Supporting Cisco Data Fabric Are Generally Available," Mangesh Pimpalkhare, August 4, 2026. https://www.splunk.com/en_us/blog/platform/splunk-platform-innovations-cisco-data-fabric-generally-available.html
2. Splunk Blog, "Cisco Data Fabric: Solving for Visibility, Economics, and AI Readiness," Sancha Norris, August 13, 2026. https://www.splunk.com/en_us/blog/platform/cisco-data-fabric-solving-for-visibility-economics-and-ai-readiness.html
3. Splunk Blog, "From Alert Fatigue to Operational Clarity: Turning Cisco Data Fabric Vision, powered by Splunk, into Agentic Operations Reality," Hanlin Fang, June 15, 2026. https://www.splunk.com/en_us/blog/leadership/turning-cisco-data-fabric-vision-into-agentic-operations-reality.html
4. Splunk Blog, "Splunk at Cisco Live: Building the Intelligence Layer for Trusted Agentic Operations," Mangesh Pimpalkhare, June 2, 2026. https://www.splunk.com/en_us/blog/leadership/splunk-cisco-live-agentic-operations.html
5. Splunk Blog, "Accelerating the Agentic Enterprise: New Splunk Platform Innovations at Cisco Live Las Vegas 2026," JK Lialias, June 2, 2026. https://www.splunk.com/en_us/blog/platform/new-splunk-platform-innovations-cisco-live-2026.html
6. Splunk Blog, "From Data at Rest to Data in Action: Machine Data Lake and Catalog," Piyush Revuri and Teja Gattupalli, August 11, 2026. https://www.splunk.com/en_us/blog/platform/machine-data-lake-and-catalog.html
7. Splunk Blog, "The Agentic Era Demands a New Data Foundation: How Cisco is Delivering It with Splunk," Mangesh Pimpalkhare, September 15, 2026. https://www.splunk.com/en_us/blog/platform/the-agentic-era-demands-a-new-data-foundation-how-cisco-is-delivering-it-with-splunk.html
8. Cisco Newsroom, "Cisco Delivers Trusted AI at Scale Through New Splunk Advancements," September 15, 2026. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m09/cisco-delivers-trusted-ai-at-scale-through-new-splunk-advancements.html
9. Cisco Newsroom, "Cisco Data Fabric Transforms Machine Data into AI-Ready Intelligence," September 8, 2025. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2025/m09/cisco-data-fabric-transforms-machine-data-into-ai-ready-intelligence.html
10. Cisco Newsroom, "Cisco Unveils Agentic Platform for Operating and Defending Critical IT Infrastructure," June 2, 2026. https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m06/cisco-unveils-agentic-platform-for-operating-and-defending-critical-it-infrastructure.html
11. Splunk Docs, "Overview of the federated search options for the Splunk platform," Splunk Cloud Platform 10.7, last updated October 17, 2026. https://help.splunk.com/en/splunk-cloud-platform/search/federated-search/10.7/welcome-to-splunk-federated-search/overview-of-the-federated-search-options-for-the-splunk-platform
12. Splunk Docs, "Splunk Cloud Platform Service Details," version 10.7, last updated October 19, 2026. https://help.splunk.com/en/splunk-cloud-platform/get-started/service-terms-and-policies/10.7
13. Splunk Docs, "Create an Amazon S3 dataset for federated search that is backed by an AWS Glue catalog table," Splunk Cloud Platform 10.6, last updated September 16, 2026. https://help.splunk.com/en/splunk-cloud-platform/search/federated-search/10.6/run-federated-searches-over-amazon-s3-datasets/define-an-amazon-s3-dataset/create-an-amazon-s3-dataset-for-federated-search-that-is-backed-by-an-aws-glue-catalog-table
14. Splunk Docs, "What's new," Splunk Cloud Platform 10.6 release notes, last updated September 16, 2026. https://help.splunk.com/en/splunk-cloud-platform/release-notes/10.6/splunk-cloud-platform-release-notes/whats-new
15. Splunk Docs, "What's new," Splunk Cloud Platform 10.7 release notes, last updated October 17, 2026. https://help.splunk.com/en/splunk-cloud-platform/release-notes/10.7/splunk-cloud-platform-release-notes/whats-new
16. Splunk Docs, "Get started with Machine Data Lake," version 10.7, last updated October 21, 2026. https://help.splunk.com/en/splunk-cloud-platform/land-data-in-machine-data-lake/10.7/get-started-with-machine-data-lake
17. Splunk Docs, "Release notes" (Machine Data Lake), last updated October 22, 2026. https://help.splunk.com/en/splunk-cloud-platform/land-data-in-machine-data-lake/10.7/release-notes
18. Splunk Docs, "Cloud Monitoring Console" release notes, Splunk Cloud Platform 10.7, page header dated October 17, 2026. https://help.splunk.com/en/splunk-cloud-platform/release-notes/10.7/splunk-cloud-platform-release-notes/cloud-monitoring-console
19. Splunk Docs, "Integrated Enterprise Value for Cisco data," Splunk Cloud Platform 10.5.2605, last updated August 3, 2026. https://help.splunk.com/en/splunk-cloud-platform/get-started/get-data-in/10.5.2605/cisco-source-type-benefit
20. Splunk Docs, "About MCP Server for Splunk platform," version 1.0, last updated March 19, 2026. https://help.splunk.com/en/splunk-cloud-platform/mcp-server-for-splunk-platform/1.0/about-mcp-server-for-splunk-platform
21. Splunk Docs, "About the MCP server for Splunk platform," version 2.1, last updated October 23, 2026. https://help.splunk.com/en/splunk-cloud-platform/mcp-server-for-splunk-platform
22. Splunkbase, "Splunk MCP Server" (app 7931), version 2.1.0, October 24, 2026. https://splunkbase.splunk.com/app/7931
23. Splunk Docs, "AI Toolkit Agent Launchpad," AI Toolkit 6.2.0, last updated October 13, 2026. https://help.splunk.com/en/splunk-enterprise/apply-machine-learning/use-ai-toolkit/6.2.0/ai-toolkit-connections-containers-and-agents/ai-toolkit-agent-launchpad
24. GitHub, "splunk/splunk-agent-skills" (README), accessed November 13, 2026. https://github.com/splunk/splunk-agent-skills
25. Splunk Blog, "Gen-AI Anomaly Detection Powered by the Cisco Deep Time Series Model," Brian Goleno, June 23, 2026. https://www.splunk.com/en_us/blog/platform/gen-ai-anomaly-detection-powered-by-the-cisco-deep-time-series-model.html
26. Splunk Blog, "Introducing the Cisco Time Series Model: Unlock Machine Data Insights with Gen AI," Liang Gou and Sonal Pardeshi, November 24, 2025. https://www.splunk.com/en_us/blog/artificial-intelligence/introducing-the-cisco-time-series-model.html
27. Splunk Blog, "Celebrating 20 Years of Splunkbase and What Comes Next," Rinita Datta and Dan Hosaka, July 9, 2026. https://www.splunk.com/en_us/blog/platform/celebrating-20-years-of-splunkbase.html
28. Splunk, "Federated Search" product page, accessed November 13, 2026. https://www.splunk.com/en_us/products/federated-search.html
29. TechTarget, "Splunk .conf26: Context, control for Cisco's AI agents at scale," Torsten Volk, September 17, 2026. https://www.techtarget.com/news/Splunk-conf26-Context-control-for-Ciscos-AI-agents-at-scale/856956/
30. TechTarget, "Seismic shift in Splunk pricing spotlights AI data management," Beth Pariseau, September 18, 2026. https://www.techtarget.com/it-infrastructure/news/366650721/Seismic-shift-in-Splunk-pricing-spotlights-AI-data-management
31. SiliconANGLE, "Splunk rebuilds its platform around agents," Paul Gillin, September 15, 2026. https://siliconangle.com/2026/09/15/splunk-rebuilds-its-platform-around-agents/ (read through https://siliconangle.com/?p=846799)
32. Network World, "Highlights from Splunk .conf26 and what the news means to network engineers," Zeus Kerravala, September 15, 2026. https://www.networkworld.com/article/4222273/highlights-from-splunk-conf26-and-what-the-news-means-to-network-engineers.html
33. Network World, "Cisco brings Splunk AI on-premises, expands agent observability, monitors token costs," Denise Dubie, September 15, 2026. https://www.networkworld.com/article/4222333/cisco-brings-splunk-ai-on-premises-expands-agent-observability-monitors-token-costs.html
34. Splunk Blog, "Splunk Observability at .conf26: Optimize AI at Scale," Dave Hickman, September 16, 2026. https://www.splunk.com/en_us/blog/observability/splunk-observability-at-conf26-optimize-ai-at-scale.html
35. Splunk Blog, "The Partner Advantage: Reimagine the Foundation for the Agentic Era," Jason Conger, September 24, 2026. https://www.splunk.com/en_us/blog/partners/reimagine-the-foundation-for-the-agentic-era.html
36. Cisco Blogs, "Partner Summit 26: Building Trusted AI at Scale, Together," Shannon Leininger, November 5, 2026. https://blogs.cisco.com/partner/partner-summit-26-building-trusted-ai-at-scale-together
37. Splunk Blog, "Turning Machine Data into Agentic Action: Splunk Now Available in Cisco Cloud Control," Coty Sugg, August 27, 2026. https://www.splunk.com/en_us/blog/platform/splunk-now-available-in-cisco-cloud-control.html
38. Splunk Lantern, "Integrating Splunk Cloud Platform with Cisco Cloud Control and AI Canvas," accessed November 13, 2026 (no date shown). https://lantern.splunk.com/Splunk_and_Cisco_Use_Cases/Integrating_Splunk_Cloud_Platform_with_Cisco_Cloud_Control_and_AI_Canvas
39. Cisco, "Cisco Cloud Control Release Notes" (HTML; header dated October 30, 2026; entries through November 10, 2026). https://www.cisco.com/c/en/us/td/docs/ai/cisco-cloud-control/release-notes/cisco-cloud-control-release-notes.html
40. Splunk, "Healthcare" industry page, accessed November 13, 2026. https://www.splunk.com/en_us/solutions/industries/healthcare.html
41. Splunk customer story, "NewYork-Presbyterian" (undated). https://www.splunk.com/en_us/customers/success-stories/new-york-presbyterian.html
42. Splunk customer story, "Children's National Hospital" (undated). https://www.splunk.com/en_us/customers/success-stories/childrens-national-hospital.html
43. Splunk customer story, "NYC Health + Hospitals" (undated). https://www.splunk.com/en_us/customers/success-stories/nyc-health-and-hospitals.html
44. Splunk customer story, "Research University" (anonymized, undated). https://www.splunk.com/en_us/customers/success-stories/research-university.html
45. Splunk customer story, "Imprivata" (undated). https://www.splunk.com/en_us/customers/success-stories/imprivata.html
46. Cisco Newsroom, "Cisco and Splunk: Powering and protecting the AI revolution" (no date on page; URL path dated March 2024). https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2024/m03/powering-and-protecting-the-ai-revolution.html
47. Splunk Lantern, "Monitoring medical record numbers for anomalous access," accessed November 13, 2026 (no date shown). https://lantern.splunk.com/Platform_Data_Management/Protect_Data/Monitoring_medical_record_numbers_for_anomalous_access
48. Splunk, "Compliance at Splunk" (states information is current as of February 2026). https://www.splunk.com/en_us/about-splunk/splunk-data-security-and-privacy/compliance-at-splunk.html
49. Splunk, "Splunk's Business Associate Agreement," accessed November 13, 2026. https://www.splunk.com/en_us/legal/splunk-baa.html
50. Splunk, "Splunk Business Associate Agreement" exemplar PDF, marked "v. 10.23". https://www.splunk.com/en_us/pdfs/legal/splunk-baa.pdf
51. Splunk Docs, "Filter and mask data using Ingest Processor," last updated June 16, 2026. https://help.splunk.com/en/splunk-cloud-platform/process-data-at-ingest-time/use-ingest-processors/process-data-using-pipelines/filter-and-mask-data-using-ingest-processor
52. ThousandEyes Documentation, "Splunk ITSI Integration," accessed November 13, 2026. https://docs.thousandeyes.com/product-documentation/integration-guides/custom-built-integrations/splunk-app/itsi
53. Splunk, "Operational Technology Intelligence" solution page, accessed November 13, 2026. https://www.splunk.com/en_us/solutions/operational-technology-intelligence.html
54. Splunkbase, "Splunk Add-on for ServiceNow" (app 1928). https://splunkbase.splunk.com/app/1928
55. Splunkbase, "CrowdStrike Falcon Event Streams Technical Add-On" (app 5082). https://splunkbase.splunk.com/app/5082
56. Splunkbase, "Splunk Add-on for Okta Identity Cloud" (app 6553). https://splunkbase.splunk.com/app/6553
57. Splunkbase, "Splunk Add-on for Palo Alto Networks" (app 7523). https://splunkbase.splunk.com/app/7523
58. Splunkbase, "Zscaler Technical Add-On for Splunk" (app 3865). https://splunkbase.splunk.com/app/3865
59. Splunkbase, "Splunk Add-on for Microsoft Security" (app 6207). https://splunkbase.splunk.com/app/6207
60. Splunkbase, "Splunk Add-on for Microsoft Cloud Services" (app 3110). https://splunkbase.splunk.com/app/3110
61. Splunkbase, "Splunk Add-on for Amazon Web Services (AWS)" (app 1876). https://splunkbase.splunk.com/app/1876
62. Splunkbase, "Claroty xDome Add-on for Splunk" (app 6488). https://splunkbase.splunk.com/app/6488
63. Splunkbase, "Medigate" (app 4820, archived). https://splunkbase.splunk.com/app/4820
64. Splunkbase, "Armis App for Splunk" (app 4873). https://splunkbase.splunk.com/app/4873
65. ORDR, "ORDR + Splunk" solution brief (PDF, copyright 2025). https://ordr.net/api/media/file/ORDR-Splunk-Solution-Brief_layout.pdf
66. Splunkbase, "Splunk Add-on for VMware" (app 3215). https://splunkbase.splunk.com/app/3215
67. Splunkbase, "TA for Nutanix Prism Central" (app 8349). https://splunkbase.splunk.com/app/8349
68. Splunkbase, "Splunk Add-on for Citrix NetScaler" (app 2770). https://splunkbase.splunk.com/app/2770
69. Splunkbase, "uberAgent UXM - Digital Employee Experience (DEX)" (app 1448). https://splunkbase.splunk.com/app/1448
70. Splunkbase, "Perseeva LakeView Add-on" (app 10063). https://splunkbase.splunk.com/app/10063
71. Splunkbase, "OT Security Add-on for Splunk" (app 5151). https://splunkbase.splunk.com/app/5151
72. Splunkbase, "Cisco Security Cloud" (app 7404). https://splunkbase.splunk.com/app/7404
73. Splunkbase, "Cisco Meraki Add-on for Splunk" (app 5580). https://splunkbase.splunk.com/app/5580
74. Splunkbase, "Cisco ThousandEyes App for Splunk" (app 7719). https://splunkbase.splunk.com/app/7719
75. Splunkbase, "Cisco Enterprise Networking Add-on for Splunk" / Cisco Catalyst Add-on (app 7538). https://splunkbase.splunk.com/app/7538
76. Claroty, "Claroty xDome for Healthcare and Splunk Integration Brief" (landing page, no date). https://claroty.com/resources/integration-briefs/claroty-xdome-for-healthcare-and-splunk-integration-brief
77. Splunk Blog, "HIMSS25: Digital Resilience in Healthcare - What It Really Means," Sean Price, March 24, 2025. https://www.splunk.com/en_us/blog/industries/himss25-digital-resilience-in-healthcare-what-it-means

---

## K) Gaps / unverified

1. **No healthcare customer story names Cisco Data Fabric, Machine Data Lake, or Federated Search.** All published hospital stories describe earlier Splunk products.
2. **Epic and Oracle Health:** no Splunkbase app and no Splunk ITSI content pack found. Splunkbase keyword search could not be run directly; the finding rests on web searches and Lantern.
3. **Splunk plus ThousandEyes for Epic:** no Cisco or Splunk page describing an Epic-specific ThousandEyes test or template was found. The ThousandEyes healthcare page and a "university medical center" case study both returned HTTP 403. A search summary says that case study "integrated ThousandEyes alerts into Splunk through a simple API"; not verified by reading.
4. **Imprivata, Nuvolo, Johnson Controls, Siemens, Honeywell:** no Splunk app, add-on, or documented integration found.
5. **Ordr:** transport method (syslog, API, or app) is not stated in the solution brief; no Splunkbase listing found.
6. **Microsoft Entra ID:** no current Splunk-supported listing was read that names Entra ID sign-in logs. The Microsoft Cloud Services add-on collects through Event Hubs, which is the usual route, but the listing does not say "Entra".
7. **Microsoft Fabric, Microsoft Sentinel, Google BigQuery, Google SecOps:** no federated or packaged integration found in Splunk sources.
8. **Databricks on AWS:** announced September 15, 2026, but the 10.7 federated search overview lists only Azure Databricks. Whether a non-Azure Databricks option is documented elsewhere is not confirmed.
9. **Federated Search GA dates** for Amazon S3 (May 18, 2026) and for Azure, Snowflake, and DDSS (July 6, 2026) are carried from brief 05. The Splunk Community post returned HTTP 403 in this session.
10. **Knowledge graph, lineage, and MCP-enabled Catalog Discovery:** no status label found.
11. **HIPAA environment feature scope:** whether Machine Data Lake, Federated Search, Ingest Processor, and Agent Launchpad are available inside a Splunk Cloud HIPAA environment is not stated in the text read. The compliance page's per-product HIPAA checkmarks were not readable.
12. **Activity-Based Pricing status:** controlled availability (TechTarget) versus "coming fall 2026" (Splunk partner blog). No GA statement found.
13. **Agent Launchpad status wording** differs across sources: "now generally available" (August 4), "coming later this year" (Cisco press release, September 15), "newly-GA" (September 24). The on-premises route is "through the Splunk Cloud Connect app" per the documentation; native on-premises availability on AI POD is not confirmed.
14. **Edge Processor and Ingest Processor regional availability** was read from a flattened table; column mapping for Google Cloud and Azure is inferred.
15. **Machine Data Lake storage format:** the docs read do not name Iceberg or Parquet for the raw tier. "Iceberg-based Analytics Table" appears only in a search summary of a Community post that returned HTTP 403.
16. **Splunk ITSI integration with AI Canvas:** "controlled availability in fall to winter" was stated on June 2, 2026. Current status not found.
17. **Observability Cloud Essentials and Premier:** announced for November 2026; shipment not confirmed.
18. **"The Data Connection - October 2026"** and the Catalog Community post returned HTTP 403. No November 2026 installment was found.
19. **Customer story dates:** all Splunk customer story pages are undated. The NewYork-Presbyterian and Imprivata stories are several years old by content; do not present them as 2026 results.
20. **Cisco Data Fabric product page:** https://www.splunk.com/en_us/products/cisco-data-fabric.html returned HTTP 404. No single canonical product page or the Cisco Data Fabric whitepaper was read.
21. **Splunk healthcare observability blog** (https://www.splunk.com/en_us/blog/observability-is-critical-to-digital-trust-in-healthcare.html) returned HTTP 404 and was not used.
22. **Armis** vendor page (https://www.armis.com/splunk/) returned HTTP 403; Armis details rest on the Splunkbase listing only.
