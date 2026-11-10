# Contributing to Tabletop Exercise Engine

Thanks for your interest in making crisis exercises more accessible.

## What We Need Most

1. **New scenario templates** - Active assailant, cyber ransomware, insider threat, executive protection, supply chain disruption, civil unrest, workplace violence. Follow the tornado template structure.
2. **Industry-specific variants** - Healthcare, manufacturing, education, government, financial services. Same doctrinal backbone, different operational context.
3. **Reference guide improvements** - Doctrine corrections, additional standards references, expanded evaluation criteria.
4. **Translations** - Exercise materials in languages other than English.
5. **Build script improvements** - Better formatting, additional output formats, accessibility improvements.

## Template Standards

All templates must follow these rules:

- **Organization-agnostic**: Use bracketed placeholders for all company, location, and personnel references. No real organization names.
- **HSEEP-aligned**: Exercise structure, evaluation methodology, and improvement planning must follow HSEEP 2020 doctrine.
- **Complete packages**: Every scenario template must include all 7 deliverables (SitMan, Facilitator Guide, MSEL, Overview, Evaluator Worksheet, Feedback Form, AAR/IP Template).
- **Realistic injects**: Scenario injects should reflect how events actually unfold, not how we wish they would. Include messy, ambiguous, competing-priority situations.
- **Contingency injects**: Include at least 4 contingency injects (accelerators, redirects, complications) to give facilitators flexibility.
- **Objective mapping**: Every inject in the MSEL must map to at least one exercise objective.

## File Naming

Templates follow this numbering:
- `01-SitMan-[Exercise Name].docx`
- `02-Facilitator-Guide.docx`
- `03-MSEL-Workbook.xlsx`
- `04-Exercise-Overview.docx`
- `05-Evaluator-Worksheet.docx`
- `06-Participant-Feedback-Form.docx`
- `07-AAR-IP-Template.docx`

Build scripts use the naming pattern: `build-[document].js` (Node/docx-js) or `build_[document].py` (Python/openpyxl).

## How to Submit

1. Fork the repository
2. Create a branch: `feature/scenario-[type]` or `fix/[description]`
3. Add your template to `templates/[scenario-type]/`
4. Update the README scenario library section
5. Open a pull request with a description of the scenario and what it tests

## License Terms for Contributions

This project uses a dual license. By submitting a contribution, you agree that:

- **Code contributions** (build scripts, `.js` and `.py` files) are licensed under the MIT License.
- **Content contributions** (templates, reference guides, scenario text, exercise documents) are licensed under Creative Commons BY-NC-SA 4.0.

This means your contributed content will be freely available for internal organizational use with attribution, but cannot be commercially resold without permission. If you are not comfortable with these terms, please open an issue to discuss before submitting.

## Questions

Open an issue or reach out via LinkedIn.
