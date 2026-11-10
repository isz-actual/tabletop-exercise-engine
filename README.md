# Tabletop Exercise Engine

**HSEEP-compliant tabletop exercise packages for corporate security teams.**

Generate professional, ready-to-run crisis exercises with complete documentation: Situation Manuals, Facilitator Guides, Master Scenario Events Lists, Evaluator Worksheets, and After-Action Report templates. All aligned to FEMA's Homeland Security Exercise and Evaluation Program (HSEEP), NIMS/ICS doctrine, and ASIS International standards.

---

## Why This Exists

Most corporate security teams know they should run tabletop exercises. Most do not, because building a professional exercise package from scratch takes 40-80 hours of specialized work. The few that do often produce exercises that lack doctrinal rigor, skip evaluation frameworks, or fail to generate actionable improvement plans.

This project provides the doctrinal foundation and ready-to-use templates to go from "we should do a tabletop" to "here is the complete exercise package" in hours instead of weeks.

## What You Get

Every exercise package includes **7 deliverables**:

| # | Document | Format | Purpose |
|---|----------|--------|---------|
| 1 | **Situation Manual (SitMan)** | .docx | Primary player document with scenario, modules, and discussion questions |
| 2 | **Facilitator Guide** | .docx | Run-of-show, contingency injects, SimCell scripts, facilitator tips |
| 3 | **Master Scenario Events List (MSEL)** | .xlsx | Timed injects with source, target, delivery method, expected actions, and objective mapping |
| 4 | **Exercise Overview** | .docx | One-page leadership approval document |
| 5 | **Evaluator Worksheet** | .docx | Observation forms organized by objective with S/AFI classification |
| 6 | **Participant Feedback Form** | .docx | Likert-scale ratings and open-ended gap analysis |
| 7 | **AAR/IP Template** | .docx | Full HSEEP-compliant After-Action Report / Improvement Plan structure |

## Doctrinal Foundation

This project is built on real doctrine, not generic templates:

- **HSEEP 2020** - Exercise design, conduct, evaluation, and improvement planning
- **NIMS/ICS** - Organizational structure, command roles, modular scalability
- **ANSI/ASIS WVPI AA-2020** - Workplace Violence and Active Assailant: Prevention, Intervention, and Response
- **ANSI/ASIS ORM.1-2017** - Security and Resilience in Organizations and Their Supply Chains
- **CISA** - Active shooter and critical infrastructure guidance
- **FEMA IS-120/IS-130** - Exercise evaluation principles

## Available Templates

### Tornado / Severe Weather
A 90-minute exercise for Security, Facilities, and EHS teams (8-12 players). An EF-2 tornado impacts a technology campus. Three modules escalate from NWS watch through facility damage and fleet protection to recovery operations and media response.

**Objectives tested:**
1. Employee notification and accountability
2. Facility damage assessment and business continuity
3. Fleet/vehicle asset protection
4. Crisis communications (internal and external)

**Included injects:** Contractor accountability gap, generator failure cascade, social media leak, competing media inquiries, VP demanding unsafe building entry, regulatory notification pressure, competitor PR attack.

All references are organization-agnostic. Find-and-replace the bracketed placeholders to customize for your organization.

## Scenario Library

| Scenario | Status |
|----------|--------|
| Tornado / Severe Weather | **Available.** Full 7-document package in `templates/tornado/` |
| All others below | **Roadmap.** Not yet built. The skill can draft a package from the design framework, but no pre-built, reviewed template exists |

Roadmap scenarios:

- **Active Assailant** - Armed intruder, lockdown, law enforcement coordination
- **Cyber Ransomware** - IT/OT systems compromise, BC activation, ransom decision
- **Insider Threat** - IP theft, investigation coordination, legal/HR interface
- **Workplace Violence** - Threat escalation, protective orders, employee support
- **Natural Disaster** - Earthquake, flood, wildfire impact on operations
- **Executive Threat** - Targeted threat against leadership, protective intelligence
- **Supply Chain Disruption** - Critical vendor failure, alternate sourcing, regulatory
- **Civil Unrest** - Protest activity near facilities, employee safety, access control

## Repository Structure

```
tabletop-exercise-engine/
  SKILL.md                          # AI skill definition (for Claude/LLM integration)
  references/
    exercise-design-guide.md        # SitMan structure, module design, discussion frameworks
    msel-construction.md            # MSEL columns, inject types, pacing patterns
    role-mapping.md                 # ICS-to-corporate role mapping, scaling guidance
    aar-ip-guide.md                 # Evaluation methodology, AAR/IP structure, hot wash script
  templates/
    tornado/
      01-SitMan.docx                # Ready-to-use Situation Manual
      02-Facilitator-Guide.docx     # Facilitator playbook with contingency injects
      03-MSEL-Workbook.xlsx         # Timed injects + Evaluation Tracker + Improvement Plan
      04-Exercise-Overview.docx     # Leadership approval one-pager
      05-Evaluator-Worksheet.docx   # Observation and rating forms
      06-Feedback-Form.docx         # Participant feedback survey
      07-AAR-IP-Template.docx       # After-Action Report / Improvement Plan
      build-sitman.js               # Source: SitMan generator (docx-js)
      build-facilitator.js          # Source: Facilitator Guide generator (docx-js)
      build-support.js              # Source: Overview, Evaluator, Feedback, AAR generators
      build_msel.py                 # Source: MSEL spreadsheet generator (openpyxl)
```

## How to Use

### Option 1: Use a Template Directly
1. Download the template files from `templates/tornado/`
2. Open each `.docx` and `.xlsx` file
3. Find-and-replace the bracketed placeholders:
   - `[ORGANIZATION]` - Your company name
   - `[CITY]` - Your city
   - `[STATE]` - Your state
   - `[COUNTY]` - Your county
   - `[NEARBY TOWN]` - A town near your facility
   - `[HIGHWAY]` - A major highway near your facility
   - `[LOCAL TV STATION]` - Local TV news outlet
   - `[LOCAL NEWSPAPER]` - Local print/digital newspaper
   - `[UTILITY COMPANY]` - Your electric utility provider
4. Fill in the remaining fields (dates, names, campus headcount)
5. Print and run

### Option 2: Build a Custom Exercise
1. Read the reference guides in `references/` for doctrinal context
2. Use the build scripts as starting points for your scenario
3. Modify the scenario, injects, and discussion questions
4. Generate your package

### Option 3: AI-Assisted Generation
The `SKILL.md` file is designed for use with Claude or other LLMs that support skill-based workflows. Point the AI at the skill file and ask it to generate an exercise for your scenario. The references provide the doctrinal grounding for high-quality output.

## Building from Source

The template generators use Node.js (docx-js) for Word documents and Python (openpyxl) for Excel:

```bash
# Word documents
npm install -g docx
node templates/tornado/build-sitman.js
node templates/tornado/build-facilitator.js
node templates/tornado/build-support.js

# MSEL spreadsheet
pip install openpyxl
python templates/tornado/build_msel.py
```

## Contributing

Contributions welcome. The most valuable additions are:

1. **New scenario templates** - Follow the tornado template structure. Keep all references organization-agnostic with bracketed placeholders.
2. **Reference guide improvements** - Corrections, additional doctrine references, or expanded guidance.
3. **Translations** - Exercise materials in other languages.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting.

## License

This project uses a **dual license**. See [LICENSE](LICENSE) for full details.

- **Code** (build scripts, `.js` and `.py` files): [MIT License](https://opensource.org/licenses/MIT). Fork it, modify it, use it however you want.
- **Content** (templates, reference guides, exercise documents): [Creative Commons BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Free for internal use by any organization. Attribution required. Commercial use (resale, consulting deliverables, paid training) requires a commercial license from the author.

**What this means in practice:** Download the templates, customize them for your organization, and run exercises. That is free and always will be. If you want to resell the content or package it into a commercial offering, reach out for licensing terms.

## Author

**Tim Reed, CPP**

26+ years in corporate security across aerospace, autonomy, high-tech, and intelligence programs. Author of *Signals in the Noise: Security, Technology, and the Hidden Patterns of Modern Risk*.

- Newsletter: [Northern Signal](https://northernsignal.beehiiv.com)
- LinkedIn: [Tim Reed](https://linkedin.com/in/timreed)
- Book: [Signals in the Noise](https://amazon.com/dp/B0DR2B76G3)

---

*This project is not affiliated with or endorsed by FEMA, DHS, ASIS International, or any government agency. Doctrinal references are used for educational purposes and professional alignment.*
