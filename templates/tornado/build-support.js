const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageBreak, LevelFormat, PageNumber, VerticalAlign
} = require("docx");

const border = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const borders = { top: border, bottom: border, left: border, right: border };
const cm = { top: 60, bottom: 60, left: 100, right: 100 };
const hFill = { fill: "1B3A5C", type: ShadingType.CLEAR };
const aFill = { fill: "EDF2F7", type: ShadingType.CLEAR };

function hC(t, w) {
  return new TableCell({ borders, width: { size: w, type: WidthType.DXA }, shading: hFill, margins: cm, verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, color: "FFFFFF", font: "Arial", size: 20 })] })] });
}
function dC(t, w, o={}) {
  return new TableCell({ borders, width: { size: w, type: WidthType.DXA }, shading: o.s, margins: cm, verticalAlign: VerticalAlign.TOP,
    children: [new Paragraph({ children: [new TextRun({ text: t, font: "Arial", size: 20, bold: o.b, italics: o.i, color: o.c || "333333" })] })] });
}
function p(t, o={}) {
  return new Paragraph({ spacing: { before: o.sb||120, after: o.sa||120 }, alignment: o.a||AlignmentType.LEFT,
    children: [new TextRun({ text: t, font: "Arial", size: o.sz||22, bold: o.b, italics: o.i, color: o.c||"333333" })] });
}
function h(t, l) {
  return new Paragraph({ heading: l, spacing: { before: 240, after: 120 }, children: [new TextRun({ text: t, font: "Arial", bold: true })] });
}
function pageProps() {
  return { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } };
}

// ============================================
// 1. EXERCISE OVERVIEW (One-Pager)
// ============================================
async function buildOverview() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Arial", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 32, bold: true, font: "Arial", color: "1B3A5C" }, paragraph: { spacing: { before: 200, after: 160 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 26, bold: true, font: "Arial", color: "2E5C8A" }, paragraph: { spacing: { before: 160, after: 100 }, outlineLevel: 1 } },
      ]
    },
    sections: [{
      properties: pageProps(),
      children: [
        p("EXERCISE - FOR OFFICIAL USE ONLY", { a: AlignmentType.CENTER, b: true, c: "CC0000", sz: 20 }),
        new Paragraph({ spacing: { before: 200 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "EXERCISE OVERVIEW DOCUMENT", font: "Arial", size: 36, bold: true, color: "1B3A5C" })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "1B3A5C", space: 8 } },
          children: [new TextRun({ text: "Operation Thunderstrike - Severe Weather / Tornado TTX", font: "Arial", size: 24, color: "555555" })] }),

        new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [3000, 6360], rows: [
          ["Exercise Name", "Operation Thunderstrike"],
          ["Exercise Type", "Tabletop Exercise (TTX)"],
          ["Date / Time", "[TO BE DETERMINED] / 90 minutes"],
          ["Location", "[ORGANIZATION], [CITY], [STATE]"],
          ["Exercise Director", "[NAME / TITLE]"],
          ["Point of Contact", "[NAME / EMAIL / PHONE]"],
          ["Classification", "EXERCISE - FOR OFFICIAL USE ONLY"]
        ].map((r,i) => new TableRow({ children: [dC(r[0], 3000, {b:true, s: i%2===0?aFill:undefined}), dC(r[1], 6360, {s: i%2===0?aFill:undefined})] })) }),

        h("Purpose", HeadingLevel.HEADING_2),
        p("This tabletop exercise tests [ORGANIZATION]'s ability to respond to a tornado threatening or impacting the [ORGANIZATION] campus. The exercise will evaluate notification protocols, facility damage assessment, autonomous vehicle fleet protection, and crisis communications across the Security, Facilities, and EHS departments."),

        h("Scope", HeadingLevel.HEADING_2),
        p("In scope: Employee notification and accountability, facility damage assessment and business continuity activation, AV fleet asset protection and IP security, crisis communications (internal and external)."),
        p("Not in scope: IT disaster recovery, financial modeling of losses, insurance claim processing, long-term reconstruction planning."),

        h("Objectives", HeadingLevel.HEADING_2),
        p("1. Evaluate the organization's ability to notify employees and account for all personnel during a severe weather emergency.", { b: true }),
        p("2. Assess facility damage assessment and business continuity activation procedures following a tornado impact.", { b: true }),
        p("3. Test decision-making processes for protecting and securing autonomous vehicle fleet assets during and after a severe weather event.", { b: true }),
        p("4. Examine crisis communications procedures for internal employee messaging and external stakeholder and media coordination.", { b: true }),

        h("Participants", HeadingLevel.HEADING_2),
        p("Security Department (3-4 personnel), Facilities Department (3-4 personnel), EHS Department (2-3 personnel). Total: 8-12 participants."),

        h("Structure", HeadingLevel.HEADING_2),
        p("Three scenario modules (20 minutes each) plus a 15-minute hot wash and 5-minute opening/closing. Total: 90 minutes."),

        h("Authorization", HeadingLevel.HEADING_2),
        p("Approved by: ________________________________     Date: ______________", { sb: 300 }),
        p("[Exercise Director Name and Title]", { i: true, c: "666666" }),
      ]
    }]
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/claude/exercise-overview.docx", buf);
  console.log("Exercise Overview created");
}

// ============================================
// 2. EVALUATOR WORKSHEET
// ============================================
async function buildEvalWorksheet() {
  const objectives = [
    ["1", "Employee notification and accountability"],
    ["2", "Facility damage assessment and business continuity"],
    ["3", "Fleet/vehicle asset protection (AV trucks, test vehicles)"],
    ["4", "Crisis communications (internal + external)"]
  ];

  const children = [
    p("EXERCISE - FOR OFFICIAL USE ONLY", { a: AlignmentType.CENTER, b: true, c: "CC0000", sz: 20 }),
    new Paragraph({ spacing: { before: 200, after: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "EVALUATOR WORKSHEET", font: "Arial", size: 36, bold: true, color: "1B3A5C" })] }),
    p("Operation Thunderstrike - Tornado TTX", { a: AlignmentType.CENTER, c: "555555", sa: 200 }),
    p("Evaluator Name: ________________________________     Date: ______________"),
    p("Instructions: Record observations during the exercise. For each observation, note whether it is a Strength (S) or Area for Improvement (AFI). Reference the specific plan, procedure, or protocol being evaluated. Use third person and role titles, not individual names.", { i: true, c: "555555", sa: 300 }),
  ];

  for (const [num, desc] of objectives) {
    children.push(
      h(`Objective ${num}: ${desc}`, HeadingLevel.HEADING_2),
      new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [1000, 4360, 2500, 1500], rows: [
        new TableRow({ children: [hC("S / AFI", 1000), hC("Observation", 4360), hC("Analysis / Impact", 2500), hC("Reference", 1500)] }),
        ...Array(5).fill(0).map((_, i) => new TableRow({ children: [
          dC("", 1000, { s: i%2===0?aFill:undefined }),
          dC("", 4360, { s: i%2===0?aFill:undefined }),
          dC("", 2500, { s: i%2===0?aFill:undefined }),
          dC("", 1500, { s: i%2===0?aFill:undefined })
        ] }))
      ] }),
      p("", { sb: 100 })
    );
  }

  children.push(
    new Paragraph({ children: [new PageBreak()] }),
    h("Overall Assessment", HeadingLevel.HEADING_2),
    p("Performance Rating per Objective (P = Performed without challenges, S = Some challenges, M = Major challenges, U = Unable to perform):", { sa: 200 }),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [5360, 2000, 2000], rows: [
      new TableRow({ children: [hC("Objective", 5360), hC("Rating", 2000), hC("Confidence", 2000)] }),
      ...objectives.map((o, i) => new TableRow({ children: [
        dC(`${o[0]}. ${o[1]}`, 5360, { s: i%2===0?aFill:undefined }),
        dC("", 2000, { s: i%2===0?aFill:undefined }),
        dC("", 2000, { s: i%2===0?aFill:undefined })
      ] }))
    ] }),
    p("", { sb: 200 }),
    h("Additional Notes", HeadingLevel.HEADING_2),
    p("________________________________________________________________________"),
    p("________________________________________________________________________"),
    p("________________________________________________________________________"),
    p("________________________________________________________________________"),
    p("________________________________________________________________________"),
  );

  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Arial", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 32, bold: true, font: "Arial", color: "1B3A5C" }, paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 26, bold: true, font: "Arial", color: "2E5C8A" }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      ]
    },
    sections: [{ properties: pageProps(), children }]
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/claude/evaluator-worksheet.docx", buf);
  console.log("Evaluator Worksheet created");
}

// ============================================
// 3. PARTICIPANT FEEDBACK FORM
// ============================================
async function buildFeedback() {
  const children = [
    p("EXERCISE - FOR OFFICIAL USE ONLY", { a: AlignmentType.CENTER, b: true, c: "CC0000", sz: 20 }),
    new Paragraph({ spacing: { before: 200, after: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PARTICIPANT FEEDBACK FORM", font: "Arial", size: 36, bold: true, color: "1B3A5C" })] }),
    p("Operation Thunderstrike - Tornado TTX", { a: AlignmentType.CENTER, c: "555555", sa: 200 }),
    p("Department: ________________________     Role: ________________________", { sa: 200 }),
    p("Please complete this form and return it to the Exercise Director within 48 hours. Your candid feedback is essential for improving our preparedness. Responses are anonymous.", { i: true, c: "555555", sa: 300 }),

    h("Part 1: Exercise Design and Conduct", HeadingLevel.HEADING_2),
    p("Rate each item on a scale of 1 (Strongly Disagree) to 5 (Strongly Agree).", { sa: 200 }),
  ];

  const ratings = [
    "The exercise scenario was realistic and plausible.",
    "The exercise objectives were clear and relevant.",
    "The exercise was well organized and facilitated.",
    "The pace of the exercise was appropriate.",
    "I had adequate opportunity to participate in discussions.",
    "The exercise revealed meaningful gaps in our preparedness.",
    "The exercise was a valuable use of my time."
  ];

  children.push(new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [5360, 800, 800, 800, 800, 800], rows: [
    new TableRow({ children: [hC("Statement", 5360), hC("1", 800), hC("2", 800), hC("3", 800), hC("4", 800), hC("5", 800)] }),
    ...ratings.map((r, i) => new TableRow({ children: [
      dC(r, 5360, { s: i%2===0?aFill:undefined }),
      ...Array(5).fill(0).map(_ => dC("", 800, { s: i%2===0?aFill:undefined }))
    ] }))
  ] }));

  children.push(
    p("", { sb: 200 }),
    h("Part 2: Organizational Readiness", HeadingLevel.HEADING_2),
    p("Rate our current readiness in each area on a scale of 1 (Not Prepared) to 5 (Fully Prepared).", { sa: 200 }),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [5360, 800, 800, 800, 800, 800], rows: [
      new TableRow({ children: [hC("Capability Area", 5360), hC("1", 800), hC("2", 800), hC("3", 800), hC("4", 800), hC("5", 800)] }),
      ...["Employee notification and accountability", "Facility damage assessment and business continuity", "Fleet/vehicle asset protection", "Crisis communications (internal + external)"].map((r, i) => new TableRow({ children: [
        dC(r, 5360, { s: i%2===0?aFill:undefined }),
        ...Array(5).fill(0).map(_ => dC("", 800, { s: i%2===0?aFill:undefined }))
      ] }))
    ] }),
    p("", { sb: 200 }),
    h("Part 3: Open Response", HeadingLevel.HEADING_2),
    p("What was the most significant gap or vulnerability revealed during this exercise?", { b: true }),
    p("________________________________________________________________________"),
    p("________________________________________________________________________"),
    p("________________________________________________________________________"),
    p("", { sb: 100 }),
    p("What one action would most improve our readiness for this type of event?", { b: true }),
    p("________________________________________________________________________"),
    p("________________________________________________________________________"),
    p("________________________________________________________________________"),
    p("", { sb: 100 }),
    p("What additional topics or scenarios should future exercises address?", { b: true }),
    p("________________________________________________________________________"),
    p("________________________________________________________________________"),
    p("________________________________________________________________________"),
    p("", { sb: 100 }),
    p("Any other comments or feedback?", { b: true }),
    p("________________________________________________________________________"),
    p("________________________________________________________________________"),
    p("________________________________________________________________________"),
  );

  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Arial", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 32, bold: true, font: "Arial", color: "1B3A5C" }, paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 26, bold: true, font: "Arial", color: "2E5C8A" }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      ]
    },
    sections: [{ properties: pageProps(), children }]
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/claude/feedback-form.docx", buf);
  console.log("Feedback Form created");
}

// ============================================
// 4. AAR/IP TEMPLATE
// ============================================
async function buildAAR() {
  const children = [
    // Cover
    new Paragraph({ spacing: { before: 2000 }, children: [] }),
    p("EXERCISE - FOR OFFICIAL USE ONLY", { a: AlignmentType.CENTER, b: true, c: "CC0000" }),
    new Paragraph({ spacing: { before: 600 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AFTER-ACTION REPORT /", font: "Arial", size: 44, bold: true, color: "1B3A5C" })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "IMPROVEMENT PLAN (AAR/IP)", font: "Arial", size: 44, bold: true, color: "1B3A5C" })] }),
    new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Operation Thunderstrike", font: "Arial", size: 32, color: "555555" })] }),
    p("Severe Weather / Tornado Tabletop Exercise", { a: AlignmentType.CENTER, sz: 24, c: "555555" }),
    p("[DATE]", { a: AlignmentType.CENTER, sz: 24, c: "555555", sb: 400 }),
    p("[ORGANIZATION], [CITY], [STATE]", { a: AlignmentType.CENTER }),
    p("[DRAFT / FINAL]", { a: AlignmentType.CENTER, b: true, c: "CC0000", sb: 600 }),
    p("Publish date: [WITHIN 60 DAYS OF EXERCISE]", { a: AlignmentType.CENTER, c: "666666", sb: 200 }),
    new Paragraph({ children: [new PageBreak()] }),

    // Admin page
    h("ADMINISTRATIVE HANDLING INSTRUCTIONS", HeadingLevel.HEADING_1),
    p("The title of this document is Operation Thunderstrike After-Action Report / Improvement Plan (AAR/IP)."),
    p("The information in this AAR/IP is designated as For Official Use Only (FOUO) and should be handled accordingly. This document should be safeguarded, handled, transmitted, and stored in accordance with appropriate security directives. Reproduction of this document, in whole or in part, without prior approval from the Exercise Director is prohibited."),
    p("At a minimum, the attached materials will be disseminated on a need-to-know basis."),
    p("Points of contact:"),
    p("Exercise Director: [NAME, TITLE, EMAIL, PHONE]"),
    p("Lead Facilitator: [NAME, TITLE, EMAIL, PHONE]"),
    p("Program Manager: [NAME, TITLE, EMAIL, PHONE]"),
    new Paragraph({ children: [new PageBreak()] }),

    // Ch 1
    h("CHAPTER 1: EXERCISE OVERVIEW", HeadingLevel.HEADING_1),
    h("1.1 Exercise Details", HeadingLevel.HEADING_2),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [3000, 6360], rows: [
      ["Exercise Name", "Operation Thunderstrike"],
      ["Type", "Tabletop Exercise (TTX)"],
      ["Date", "[DATE]"],
      ["Duration", "90 minutes"],
      ["Location", "[ORGANIZATION], [CITY], [STATE]"],
      ["Sponsor", "[NAME / TITLE]"],
      ["Participants", "Security, Facilities, EHS departments (8-12 personnel)"],
      ["Exercise Director", "[NAME]"],
      ["Lead Facilitator", "[NAME]"]
    ].map((r,i) => new TableRow({ children: [dC(r[0], 3000, {b:true, s:i%2===0?aFill:undefined}), dC(r[1], 6360, {s:i%2===0?aFill:undefined})] })) }),

    h("1.2 Exercise Objectives", HeadingLevel.HEADING_2),
    p("Objective 1: Evaluate the organization's ability to notify employees and account for all personnel during a severe weather emergency.", { b: true }),
    p("Objective 2: Assess facility damage assessment and business continuity activation procedures following a tornado impact.", { b: true }),
    p("Objective 3: Test decision-making processes for protecting and securing autonomous vehicle fleet assets during and after a severe weather event.", { b: true }),
    p("Objective 4: Examine crisis communications procedures for internal employee messaging and external stakeholder and media coordination.", { b: true }),
    new Paragraph({ children: [new PageBreak()] }),

    // Ch 2
    h("CHAPTER 2: EXERCISE DESIGN SUMMARY", HeadingLevel.HEADING_1),
    p("[Provide a summary of the exercise scenario and structure. Include the number of modules, the general progression of the scenario, and the key decision points tested. This section helps readers who were not present understand the context of the findings.]"),
    p("", { sb: 600 }),
    new Paragraph({ children: [new PageBreak()] }),

    // Ch 3 - the main chapter
    h("CHAPTER 3: ANALYSIS OF CAPABILITIES", HeadingLevel.HEADING_1),
    p("This chapter presents the key findings from the exercise, organized by exercise objective. Each finding is categorized as a Strength or an Area for Improvement. Analysis includes the organizational impact and references to relevant plans, policies, or procedures.", { sa: 300 }),

    h("3.1 Objective 1: Employee Notification and Accountability", HeadingLevel.HEADING_2),
    h("Strengths", HeadingLevel.HEADING_3 || HeadingLevel.HEADING_2),
    p("[Document strengths observed during the exercise related to this objective. Use third person and role titles, not individual names. Be specific and factual.]"),
    p("Example: The Security Operations Center demonstrated effective use of the mass notification system, initiating an all-campus alert within 3 minutes of the Tornado Warning issuance."),
    h("Areas for Improvement", HeadingLevel.HEADING_3 || HeadingLevel.HEADING_2),
    p("[Document areas for improvement. Include specific gaps, unclear procedures, or decision-making delays observed.]"),
    p("Example: The organization lacked a reliable mechanism to account for non-employee personnel (contractors, visitors) during shelter-in-place operations. The current badge-access system only tracks employee headcount."),

    h("3.2 Objective 2: Facility Damage Assessment and Business Continuity", HeadingLevel.HEADING_2),
    h("Strengths", HeadingLevel.HEADING_3 || HeadingLevel.HEADING_2),
    p("[Document strengths]"),
    h("Areas for Improvement", HeadingLevel.HEADING_3 || HeadingLevel.HEADING_2),
    p("[Document areas for improvement]"),

    h("3.3 Objective 3: Fleet/Vehicle Asset Protection", HeadingLevel.HEADING_2),
    h("Strengths", HeadingLevel.HEADING_3 || HeadingLevel.HEADING_2),
    p("[Document strengths]"),
    h("Areas for Improvement", HeadingLevel.HEADING_3 || HeadingLevel.HEADING_2),
    p("[Document areas for improvement]"),

    h("3.4 Objective 4: Crisis Communications", HeadingLevel.HEADING_2),
    h("Strengths", HeadingLevel.HEADING_3 || HeadingLevel.HEADING_2),
    p("[Document strengths]"),
    h("Areas for Improvement", HeadingLevel.HEADING_3 || HeadingLevel.HEADING_2),
    p("[Document areas for improvement]"),
    new Paragraph({ children: [new PageBreak()] }),

    // Ch 4
    h("CHAPTER 4: CONCLUSION", HeadingLevel.HEADING_1),
    p("[Provide overall assessment of organizational readiness. Summarize the most critical findings and their implications. State whether exercise objectives were met. Recommend next steps including follow-on exercises.]"),
    p("", { sb: 600 }),
    new Paragraph({ children: [new PageBreak()] }),

    // Appendix A: Improvement Plan
    h("APPENDIX A: IMPROVEMENT PLAN", HeadingLevel.HEADING_1),
    p("The following improvement actions were identified during the exercise. Each action has been assigned a responsible party and target completion date. Progress should be reviewed quarterly until all actions are complete or formally closed.", { sa: 200 }),
    p("[See the Improvement Plan tab in the accompanying MSEL workbook for the detailed tracking spreadsheet.]", { i: true, c: "555555" }),

    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [500, 2200, 2200, 1200, 1200, 1060, 1000], rows: [
      new TableRow({ children: [hC("#", 500), hC("Observation", 2200), hC("Corrective Action", 2200), hC("Element", 1200), hC("Owner", 1200), hC("Target Date", 1060), hC("Status", 1000)] }),
      ...Array(8).fill(0).map((_, i) => new TableRow({ children: [
        dC(`${i+1}`, 500, { s: i%2===0?aFill:undefined }),
        dC("", 2200, { s: i%2===0?aFill:undefined }),
        dC("", 2200, { s: i%2===0?aFill:undefined }),
        dC("", 1200, { s: i%2===0?aFill:undefined }),
        dC("", 1200, { s: i%2===0?aFill:undefined }),
        dC("", 1060, { s: i%2===0?aFill:undefined }),
        dC("", 1000, { s: i%2===0?aFill:undefined }),
      ] }))
    ] }),
    p("Capability Elements: Planning (P), Organization (O), Equipment (E), Training (T), Exercise (Ex)", { i: true, c: "666666", sb: 200 }),
    p("Status Options: Open, In Progress, Complete, Closed (No Action)", { i: true, c: "666666" }),
    new Paragraph({ children: [new PageBreak()] }),

    // Appendix B
    h("APPENDIX B: PARTICIPANT FEEDBACK SUMMARY", HeadingLevel.HEADING_1),
    p("[Compile and summarize the participant feedback forms here. Include aggregate ratings and key themes from open-ended responses. Do not attribute feedback to individuals.]"),
    p("", { sb: 400 }),
    new Paragraph({ children: [new PageBreak()] }),

    // Appendix C
    h("APPENDIX C: EXERCISE EVENTS SUMMARY", HeadingLevel.HEADING_1),
    p("[Provide a chronological summary of the exercise scenario events and key participant decisions. Reference the MSEL for detailed inject information.]"),
    p("", { sb: 400 }),
    new Paragraph({ children: [new PageBreak()] }),

    // Appendix D
    h("APPENDIX D: ACRONYMS", HeadingLevel.HEADING_1),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [2000, 7360], rows: [
      ["AAR", "After-Action Report"], ["AV", "Autonomous Vehicle"], ["BCP", "Business Continuity Plan"],
      ["EF", "Enhanced Fujita Scale"], ["EHS", "Environment, Health, and Safety"],
      ["EMA", "Emergency Management Agency"], ["FOUO", "For Official Use Only"],
      ["HSEEP", "Homeland Security Exercise and Evaluation Program"],
      ["ICS", "Incident Command System"], ["IP", "Improvement Plan"],
      ["MSEL", "Master Scenario Events List"], ["NHTSA", "National Highway Traffic Safety Administration"],
      ["NIMS", "National Incident Management System"], ["NWS", "National Weather Service"],
      ["OSHA", "Occupational Safety and Health Administration"],
      ["SOC", "Security Operations Center"], ["TTX", "Tabletop Exercise"]
    ].map((r,i) => new TableRow({ children: [dC(r[0], 2000, {b:true, s:i%2===0?aFill:undefined}), dC(r[1], 7360, {s:i%2===0?aFill:undefined})] })) }),
  ];

  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Arial", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 32, bold: true, font: "Arial", color: "1B3A5C" }, paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 26, bold: true, font: "Arial", color: "2E5C8A" }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      ]
    },
    sections: [{
      properties: pageProps(),
      headers: {
        default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "EXERCISE - FOR OFFICIAL USE ONLY  |  Operation Thunderstrike AAR/IP", font: "Arial", size: 16, color: "999999", italics: true })] })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, border: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 4 } }, children: [
          new TextRun({ text: "[DRAFT / FINAL]  |  Page ", font: "Arial", size: 16, color: "999999" }),
          new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: "999999" })
        ] })] })
      },
      children
    }]
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/claude/aar-ip-template.docx", buf);
  console.log("AAR/IP Template created");
}

// Build all
(async () => {
  await buildOverview();
  await buildEvalWorksheet();
  await buildFeedback();
  await buildAAR();
  console.log("All supporting documents created");
})();
