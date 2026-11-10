---
name: tabletop-exercise-engine
description: Design, build, and deploy HSEEP-compliant tabletop exercises (TTX) for corporate security teams. Generates full exercise packages including situation manuals, Master Scenario Events Lists (MSEL) with timed injects, role assignments mapped to ICS/NIMS positions, facilitator guides, evaluator worksheets, and After-Action Report/Improvement Plan (AAR/IP) templates. Use this skill whenever the user mentions tabletop exercises, TTX, crisis simulations, emergency exercises, incident response drills, MSEL development, exercise injects, AAR/IP creation, HSEEP exercises, corporate crisis management exercises, executive crisis simulations, or wants to test organizational response to security scenarios. Also trigger when user asks about exercise planning for workplace violence, active assailant, cyber incident, natural disaster, IP theft, insider threat, supply chain disruption, executive protection, or any corporate security scenario.
---

# Tabletop Exercise Engine

A skill for building and deploying HSEEP-compliant tabletop exercises (TTX) tailored to corporate security teams, with stakeholder participation up to C-suite level.

## Doctrinal Foundation

This skill is grounded in:

- **HSEEP** (Homeland Security Exercise and Evaluation Program, 2020 Doctrine) for exercise design, conduct, evaluation, and improvement planning methodology
- **NIMS** (National Incident Management System) for command structure and common terminology
- **ICS** (Incident Command System) for organizational roles and modular scalability
- **ASIS International Standards** including ANSI/ASIS WVPI AA-2020 (Workplace Violence and Active Assailant: Prevention, Intervention, and Response) and ANSI/ASIS ORM.1-2017 (Security and Resilience in Organizations and Their Supply Chains)
- **CISA** guidance on active shooter planning and response
- **FEMA IS-120** (Introduction to Exercises) and **IS-130** (Exercise Evaluator) principles

## Workflow Overview

When this skill triggers, follow this sequence:

### Phase 1: Exercise Scoping (User Input Required)

Collect the following from the user. Present as structured questions, not a wall of text.

**Round 1 questions:**
1. **Scenario type** -- what threat or incident? (e.g., active assailant, cyber ransomware, insider threat, natural disaster, workplace violence, IP theft, supply chain disruption, executive threat, civil unrest, pandemic, combination)
2. **Organization profile** -- what kind of company, how many employees, how many sites, what industry?
3. **Audience** -- who will participate? (security team only, cross-functional, up to C-suite, board members)
4. **Exercise objectives** -- what 2-4 things do you want to test or validate? (e.g., communication protocols, decision authority, evacuation procedures, crisis comms, coordination with law enforcement)

**Round 2 questions (after initial answers):**
5. **Duration** -- how long? (90 min, 2 hours, half-day)
6. **Format** -- in-person, virtual, hybrid?
7. **Existing plans** -- does the organization have an EAP, crisis management plan, business continuity plan, or workplace violence prevention program already in place?
8. **Sensitive constraints** -- any scenarios that are off-limits or that need careful handling given recent events?

### Phase 2: Exercise Design and Development

Once scoping is complete, generate the full exercise package. Read `references/exercise-design-guide.md` for detailed structure and formatting of each deliverable.

The exercise package consists of these deliverables:

1. **Exercise Overview Document** -- one-page summary for leadership approval
2. **Situation Manual (SitMan)** -- the primary player document
3. **Facilitator Guide** -- detailed guide for the exercise director/facilitator
4. **Master Scenario Events List (MSEL)** -- timed injects with delivery instructions
5. **Role Assignment Matrix** -- maps ICS/corporate positions to exercise roles
6. **Evaluator Worksheets** -- observation forms aligned to objectives
7. **Controller/Evaluator (C/E) Briefing** -- pre-exercise briefing for staff
8. **Participant Feedback Form** -- post-exercise survey
9. **After-Action Report/Improvement Plan (AAR/IP) Template** -- pre-formatted for findings

Generate all deliverables as files. Use the `docx` skill for the SitMan, Facilitator Guide, and AAR/IP. Use spreadsheet format for the MSEL and Role Matrix. Use markdown for the overview and feedback form.

### Phase 3: MSEL Construction

The MSEL is the engine of the exercise. Read `references/msel-construction.md` for the full MSEL development methodology.

Key MSEL principles:
- Every inject must map to at least one exercise objective
- Injects follow a realistic timeline with escalation built in
- Include contingency injects for when players go off-script
- Each inject specifies: Event #, Time, From, To, Inject Method (verbal, email, phone, slide), Inject Content, Expected Player Action, Objective Tested, Controller Notes
- Build in decision points that force cross-functional coordination
- Include at least one inject that requires C-suite decision authority
- Include media/public affairs pressure injects if comms is an objective

### Phase 4: Role Design

Map exercise roles using dual structure: ICS/NIMS positions AND corporate titles. Read `references/role-mapping.md` for the complete role taxonomy.

**Exercise Staff Roles (not playing the scenario):**
- Exercise Director -- overall exercise authority
- Lead Facilitator -- guides discussion
- Controllers -- deliver injects, keep exercise on track
- Evaluators -- observe and document player actions
- SimCell Operators -- simulate external entities (law enforcement, media, regulators)

**Player Roles (playing the scenario):**
- Incident Commander (maps to: CSO, VP Security, Director of Security)
- Operations Section Chief (maps to: Security Operations Manager)
- Planning Section Chief (maps to: Business Continuity Manager)
- Logistics Section Chief (maps to: Facilities Director)
- Finance/Admin Section Chief (maps to: CFO delegate)
- Public Information Officer (maps to: VP Communications, PR Director)
- Safety Officer (maps to: EHS Director)
- Liaison Officer (maps to: Government Affairs, Legal)
- **Executive Decision Makers** -- CEO, COO, CHRO, General Counsel as needed per scenario

### Phase 5: Exercise Conduct Guidance

Generate a facilitator run-of-show that covers:
- T-30 min: Controller/Evaluator briefing
- T-15 min: Player registration and seating
- T-0: Welcome, ground rules, exercise artificialities statement
- Scenario modules (typically 3-4 modules of escalating complexity)
- Hot wash (immediate debrief, 15-20 min)
- Adjournment and next steps

**Critical facilitation rules:**
- "This is an exercise" must be stated at open and close
- No attribution of individual comments in the AAR (Chatham House Rule)
- Exercise is discussion-based; no physical movement unless specified
- "Exercise artificialities" acknowledged upfront (compressed timeline, simplified org chart, etc.)

### Phase 6: Evaluation and AAR/IP

Read `references/aar-ip-guide.md` for the complete evaluation and after-action methodology.

Generate the AAR/IP template pre-populated with:
- Exercise overview (name, date, type, scope, objectives, participants)
- Capability analysis sections aligned to each objective
- Observation format: Strength/Area for Improvement with Analysis
- Improvement Plan table: Observation, Corrective Action, Capability Element, Primary Responsible Org, Start Date, Completion Date
- Performance ratings (optional): Performed without Challenges (P), Performed with Some Challenges (S), Performed with Major Challenges (M), Unable to be Performed (U)

## Scenario Library

When the user selects a scenario type, reference the following for realistic scenario construction. These are starting frameworks; always customize to the user's organization.

| Scenario Type | Key Injects | Typical Stakeholders | Duration |
|---|---|---|---|
| Active Assailant | Initial report, lockdown decision, LE coordination, medical response, parent/family notification, media inquiry | Security, HR, Comms, Legal, Facilities, C-suite | 2-3 hr |
| Cyber Ransomware | Detection alert, scope assessment, ransom demand, data exfiltration discovery, regulatory notification trigger, customer impact | IT/CISO, Legal, Comms, Finance, C-suite, Board | 2-4 hr |
| Insider Threat / IP Theft | Behavioral indicators, digital forensics trigger, HR investigation, legal hold, law enforcement referral, media leak | Security, IT, HR, Legal, Business Unit Lead | 2 hr |
| Workplace Violence (Threat) | Threat report, threat assessment activation, protective measures, LE coordination, employee communications, return-to-work | Security, HR, Legal, EAP, Comms | 90 min-2 hr |
| Natural Disaster | Warning/watch, impact assessment, evacuation/shelter decision, business continuity activation, employee accountability, recovery | Security, Facilities, BCP, HR, Comms, C-suite | 2-3 hr |
| Executive Threat | Protective intelligence report, threat escalation, travel modification, residence security, family notification, LE coordination | Executive Protection, Security, Legal, Comms | 90 min-2 hr |
| Supply Chain Disruption | Supplier incident notification, impact assessment, alternate sourcing, customer communication, regulatory implications | Security, Supply Chain, Legal, Comms, Finance | 2 hr |
| Civil Unrest / Protest | Intelligence warning, facility hardening, employee safety advisory, protest escalation, property damage, media inquiry | Security, Facilities, HR, Comms, Legal | 2 hr |

## File Generation Instructions

When generating the exercise package:

1. Create all files in `/home/claude/` workspace first
2. For the SitMan and Facilitator Guide, read the `docx` skill SKILL.md and follow its instructions for professional formatting
3. For the MSEL spreadsheet, read the `xlsx` skill SKILL.md
4. Copy final deliverables to `/mnt/user-data/outputs/`
5. Present files to the user with a summary of the package contents

## Important Notes

- **Classification/Sensitivity**: All exercise materials should be marked "EXERCISE - FOR OFFICIAL USE ONLY" or equivalent organizational marking. Include "THIS IS AN EXERCISE" watermark guidance.
- **Legal review**: Recommend user have Legal review scenarios involving termination, law enforcement action, or regulatory notification before exercise conduct.
- **Psychological safety**: For scenarios involving violence, include content warnings and offer opt-out provisions. Reference ANSI/ASIS WVPI AA-2020 guidance.
- **After the exercise**: The AAR/IP should be completed within 60 days per HSEEP doctrine. Corrective actions should be tracked to completion.
- **Progressive exercise program**: Recommend the user plan exercises of increasing complexity over time (seminar -> workshop -> TTX -> functional exercise -> full-scale exercise) per HSEEP progressive planning approach.

## Available Templates

Pre-built, organization-agnostic exercise packages are available in `templates/`. These can be used as-is (fill in bracketed placeholders) or as reference implementations for building new scenarios.

### Tornado / Severe Weather (`templates/tornado/`)
- **Scenario**: EF-2 tornado impacts an autonomous vehicle / technology campus
- **Players**: Security + Facilities + EHS (8-12 people)
- **Duration**: 90 minutes (3 modules + hot wash)
- **Objectives**: Employee notification/accountability, facility damage assessment/BC, fleet asset protection, crisis communications
- **Files**: SitMan, Facilitator Guide, MSEL (xlsx), Exercise Overview, Evaluator Worksheet, Feedback Form, AAR/IP Template
- **Build scripts**: JS (docx-js) and Python (openpyxl) source files included for regeneration or customization

To use a template: Copy the generated .docx and .xlsx files, find-and-replace the bracketed placeholders ([ORGANIZATION], [CITY], [STATE], [COUNTY], etc.) with your organization's details.

## Quick Start

If the user wants to jump straight to building, ask the minimum:
1. What scenario? (one sentence)
2. Who is playing? (list of departments/roles)
3. How long? (duration)

Then generate a complete package using sensible defaults for everything else. You can always refine later.
