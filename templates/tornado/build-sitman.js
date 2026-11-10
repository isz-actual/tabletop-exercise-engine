const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageBreak, PageNumber, LevelFormat
} = require("docx");

const border = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };
const headerFill = { fill: "1B3A5C", type: ShadingType.CLEAR };
const altFill = { fill: "EDF2F7", type: ShadingType.CLEAR };

function headerCell(text, width) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA }, shading: headerFill, margins: cellMargins,
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, font: "Arial", size: 20, color: "FFFFFF" })] })]
  });
}
function cell(text, width, opts = {}) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA }, margins: cellMargins,
    shading: opts.shaded ? altFill : undefined,
    children: [new Paragraph({ children: [new TextRun({ text, font: "Arial", size: 20, bold: !!opts.bold, italics: !!opts.italic })] })]
  });
}
function para(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, font: "Arial", size: 22, bold: !!opts.bold, italics: !!opts.italic, color: opts.color })]
  });
}
function bullet(text, ref) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 }, spacing: { after: 80 },
    children: [new TextRun({ text, font: "Arial", size: 22 })]
  });
}

const pageProps = {
  page: {
    size: { width: 12240, height: 15840 },
    margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
  }
};

const stdHeader = new Header({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
  new TextRun({ text: "EXERCISE - FOR OFFICIAL USE ONLY", font: "Arial", size: 16, bold: true, color: "CC0000" })
]})] });
const stdFooter = new Footer({ children: [new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [
    new TextRun({ text: "Operation Prairie Warning - Situation Manual | Page ", font: "Arial", size: 16, color: "666666" }),
    new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: "666666" })
  ]
})] });

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "1B3A5C" },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "2D5F8A" },
        paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: "3A7CA5" },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "questions", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [
    // COVER PAGE
    {
      properties: { ...pageProps },
      children: [
        new Paragraph({ spacing: { before: 3000 } }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
          new TextRun({ text: "EXERCISE - FOR OFFICIAL USE ONLY", font: "Arial", size: 20, bold: true, color: "CC0000" })
        ]}),
        new Paragraph({ spacing: { before: 600 }, alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: "OPERATION PRAIRIE WARNING", font: "Arial", size: 48, bold: true, color: "1B3A5C" })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [
          new TextRun({ text: "Severe Weather / Tornado Response", font: "Arial", size: 28, color: "2D5F8A" })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [
          new TextRun({ text: "Tabletop Exercise", font: "Arial", size: 26, bold: true })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [
          new TextRun({ text: "Situation Manual (SitMan)", font: "Arial", size: 24 })
        ]}),
        new Paragraph({ spacing: { before: 600 }, alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: "[Exercise Date]", font: "Arial", size: 22 })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [
          new TextRun({ text: "[Exercise Location]", font: "Arial", size: 22 })
        ]}),
        new Paragraph({ spacing: { before: 800 }, alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: "[ORGANIZATION LOGO]", font: "Arial", size: 20, color: "999999", italics: true })
        ]}),
        new Paragraph({ spacing: { before: 1200 }, alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: "This document contains exercise information only.", font: "Arial", size: 18, italics: true, color: "666666" })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: "It is not to be used to direct actual emergency response.", font: "Arial", size: 18, italics: true, color: "666666" })
        ]}),
      ]
    },
    // HANDLING + OVERVIEW + SCENARIO + MODULES + APPENDICES
    {
      properties: { ...pageProps },
      headers: { default: stdHeader },
      footers: { default: stdFooter },
      children: [
        // HANDLING INSTRUCTIONS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Handling Instructions")] }),
        para("The Operation Prairie Warning Situation Manual (SitMan) is intended for use by exercise participants only. This document contains information that may be considered sensitive. The material should be handled accordingly and should not be distributed to non-participants or released publicly."),
        para("All exercise participants are expected to protect the contents of this document. No portion may be reproduced, distributed, or shared outside the exercise without written authorization from the Exercise Director."),
        new Paragraph({ spacing: { before: 300 } }),
        new Table({
          width: { size: 9360, type: WidthType.DXA }, columnWidths: [3120, 6240],
          rows: [
            new TableRow({ children: [headerCell("Field", 3120), headerCell("Details", 6240)] }),
            new TableRow({ children: [cell("Exercise Name", 3120, { bold: true }), cell("Operation Prairie Warning", 6240)] }),
            new TableRow({ children: [cell("Exercise Type", 3120, { bold: true, shaded: true }), cell("Tabletop Exercise (TTX)", 6240, { shaded: true })] }),
            new TableRow({ children: [cell("Date", 3120, { bold: true }), cell("[DATE - TO BE DETERMINED]", 6240)] }),
            new TableRow({ children: [cell("Duration", 3120, { bold: true, shaded: true }), cell("90 Minutes", 6240, { shaded: true })] }),
            new TableRow({ children: [cell("Location", 3120, { bold: true }), cell("[CONFERENCE ROOM / FACILITY]", 6240)] }),
            new TableRow({ children: [cell("Classification", 3120, { bold: true, shaded: true }), cell("EXERCISE - FOR OFFICIAL USE ONLY", 6240, { shaded: true })] }),
            new TableRow({ children: [cell("Exercise Director", 3120, { bold: true }), cell("[NAME, TITLE]", 6240)] }),
            new TableRow({ children: [cell("Lead Facilitator", 3120, { bold: true, shaded: true }), cell("[NAME, TITLE]", 6240, { shaded: true })] }),
          ]
        }),

        // SECTION 1: EXERCISE OVERVIEW
        new Paragraph({ children: [new PageBreak()] }),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 1: Exercise Overview")] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Purpose")] }),
        para("Operation Prairie Warning is a discussion-based tabletop exercise designed to evaluate [ORGANIZATION]'s preparedness and response capabilities for a severe weather event affecting the [CITY] metropolitan area. This exercise will stress-test employee notification and accountability procedures, facility damage assessment protocols, autonomous vehicle fleet protection, and crisis communications during and following a tornado impact."),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scope")] }),
        para("This exercise focuses on Security, Facilities, and EHS response to a tornado striking [ORGANIZATION] facilities and surrounding areas during normal business hours. The exercise tests decision-making from initial weather warning through damage assessment and early recovery."),
        para("This exercise does NOT test: IT disaster recovery, financial claims processing, long-term facility reconstruction, or legal proceedings.", { italic: true }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Exercise Objectives")] }),
        para("Objective 1: Evaluate employee notification and accountability procedures following a severe weather event, including shelter-in-place activation, headcount reconciliation, and communication with remote and field personnel.", { bold: true }),
        new Paragraph({ spacing: { after: 80 } }),
        para("Objective 2: Assess facility damage assessment and business continuity activation processes, including initial damage triage, building safety determination, and alternate work location decisions.", { bold: true }),
        new Paragraph({ spacing: { after: 80 } }),
        para("Objective 3: Test fleet and vehicle asset protection protocols for autonomous vehicles operating on public roads and stored at maintenance facilities during severe weather.", { bold: true }),
        new Paragraph({ spacing: { after: 80 } }),
        para("Objective 4: Evaluate crisis communication effectiveness across internal audiences (employees, leadership) and external audiences (media, community, regulators).", { bold: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Exercise Structure")] }),
        new Table({
          width: { size: 9360, type: WidthType.DXA }, columnWidths: [2000, 2360, 5000],
          rows: [
            new TableRow({ children: [headerCell("Time", 2000), headerCell("Activity", 2360), headerCell("Description", 5000)] }),
            new TableRow({ children: [cell("T+0:00-0:10", 2000), cell("Welcome / Setup", 2360), cell("Introductions, ground rules, scenario background", 5000)] }),
            new TableRow({ children: [cell("T+0:10-0:35", 2000, { shaded: true }), cell("Module 1", 2360, { shaded: true, bold: true }), cell("Warning and Initial Response", 5000, { shaded: true })] }),
            new TableRow({ children: [cell("T+0:35-1:00", 2000), cell("Module 2", 2360, { bold: true }), cell("Impact and Assessment", 5000)] }),
            new TableRow({ children: [cell("T+1:00-1:20", 2000, { shaded: true }), cell("Module 3", 2360, { shaded: true, bold: true }), cell("Crisis Management and Communications", 5000, { shaded: true })] }),
            new TableRow({ children: [cell("T+1:20-1:30", 2000), cell("Hot Wash", 2360, { bold: true }), cell("Facilitated debrief", 5000)] }),
          ]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Exercise Rules")] }),
        bullet("This is an exercise. No real-world actions should be taken based on exercise play.", "bullets"),
        bullet("There are no wrong answers. This exercise generates discussion, not grades.", "bullets"),
        bullet("All discussions are governed by the Chatham House Rule.", "bullets"),
        bullet("Respond as you would in a real incident using existing plans and procedures.", "bullets"),
        bullet("Cell phones silenced. Step out if you must take a call.", "bullets"),
        bullet("The facilitator manages time. Move on when directed.", "bullets"),
        bullet("All participants are encouraged to contribute.", "bullets"),
        bullet("Do not share exercise materials outside this room without authorization.", "bullets"),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Assumptions and Artificialities")] }),
        bullet("The exercise timeline is compressed. Hours unfold in minutes.", "bullets"),
        bullet("Not all organizational functions are represented.", "bullets"),
        bullet("The scenario is designed to stress the response system beyond typical conditions.", "bullets"),
        bullet("External entities (NWS, emergency services, media) are simulated by the facilitator.", "bullets"),
        bullet("AV technology and operational routes are simplified for exercise purposes.", "bullets"),

        // SECTION 2: SCENARIO BACKGROUND
        new Paragraph({ children: [new PageBreak()] }),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 2: Scenario Background")] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("General Conditions")] }),
        para("It is a Tuesday in late May. Normal business operations are underway at [ORGANIZATION]'s [CITY] headquarters and supporting facilities. The weather forecast called for partly cloudy skies with a chance of afternoon thunderstorms. Temperatures are in the upper 70s with high humidity."),
        para("Approximately 150 employees are on-site at the main office. The engineering lab and maintenance facility are staffed with approximately 30 additional personnel. Three (3) [ORGANIZATION] autonomous test vehicles are actively operating on designated routes in the greater [CITY] area. Two (2) additional AV trucks are parked at the maintenance facility undergoing scheduled service."),
        para("At 11:00 AM, the National Weather Service issued a Tornado Watch for [COUNTY] and surrounding areas, valid through 8:00 PM. The [ORGANIZATION] Security Operations Center noted the watch and disseminated an informational notification per standard operating procedure."),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Current Organizational Status")] }),
        new Table({
          width: { size: 9360, type: WidthType.DXA }, columnWidths: [3120, 6240],
          rows: [
            new TableRow({ children: [headerCell("Element", 3120), headerCell("Status", 6240)] }),
            new TableRow({ children: [cell("HQ Building", 3120, { bold: true }), cell("Normal operations, ~150 personnel on-site", 6240)] }),
            new TableRow({ children: [cell("Maintenance Facility", 3120, { bold: true, shaded: true }), cell("Normal ops, ~30 personnel, 2 AV trucks in service bays", 6240, { shaded: true })] }),
            new TableRow({ children: [cell("AV Fleet (Active)", 3120, { bold: true }), cell("3 trucks on designated routes, all telemetry nominal", 6240)] }),
            new TableRow({ children: [cell("Weather Status", 3120, { bold: true, shaded: true }), cell("Tornado Watch since 1100 hrs, no warnings active", 6240, { shaded: true })] }),
            new TableRow({ children: [cell("Key Leadership", 3120, { bold: true }), cell("All department heads on-site or reachable", 6240)] }),
            new TableRow({ children: [cell("Emergency Systems", 3120, { bold: true, shaded: true }), cell("Mass notification operational, shelter areas designated", 6240, { shaded: true })] }),
          ]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Threat Context")] }),
        para("Western [STATE] is susceptible to tornadic activity, though tornadoes are less frequent than in the central United States. [ORGANIZATION]'s facilities were not purpose-built for tornado resistance beyond standard commercial building codes. The maintenance facility is a single-story steel-frame structure more vulnerable to wind damage than the multi-story HQ. [ORGANIZATION]'s AV fleet operates on public roads in mixed traffic. Severe weather protocols include safe-harbor procedures, but tornado formation speed may outpace the ability to recall vehicles."),

        // MODULE 1
        new Paragraph({ children: [new PageBreak()] }),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 3: Exercise Modules")] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Module 1: Warning and Initial Response")] }),
        para("Duration: 25 minutes  |  Objectives Tested: 1, 3", { bold: true, color: "2D5F8A" }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Scenario Update")] }),
        para("It is now 2:15 PM. The National Weather Service has upgraded the Tornado Watch to a TORNADO WARNING for [COUNTY], including the area containing [ORGANIZATION] facilities. Radar has detected a confirmed tornado approximately 8 miles southwest of your location, tracking northeast at 35 mph. Estimated arrival time to your area: 12 to 15 minutes."),
        para("The [ORGANIZATION] SOC receives the NWS push alert simultaneously with local media breaking news. Weather sirens are audible outside the building. Cell phones throughout the building receive Wireless Emergency Alerts."),
        para("Your three active AV trucks are operating at the following locations:"),
        bullet("Truck 1: [HIGHWAY] corridor, approximately 4 miles south of HQ", "bullets"),
        bullet("Truck 2: Route 28 corridor, approximately 6 miles northeast of HQ", "bullets"),
        bullet("Truck 3: Local arterial road, approximately 2 miles west of maintenance facility", "bullets"),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Key Information")] }),
        para("NWS Tornado Warning Text:", { bold: true }),
        para("\"TORNADO WARNING for [COUNTY] until 3:15 PM EDT. A confirmed tornado was located 8 miles southwest of [CITY] International Airport at 2:12 PM, moving northeast at 35 mph. TAKE COVER NOW. This is a life-threatening situation.\"", { italic: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Discussion Questions")] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "What is your immediate first action upon receiving the Tornado Warning? Walk us through the first 60 seconds.", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "How do you activate shelter-in-place across all [ORGANIZATION] facilities? What system do you use, and what is the message?", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "You have 150 employees at HQ and 30 at the maintenance facility. What are your designated shelter areas? How do you account for visitors, contractors, and employees in transit between buildings?", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "Three AV trucks are on the road. What is the protocol for the fleet during a tornado warning? Who makes the call, and what are the safe-harbor options?", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "An employee on the second floor refuses to leave their desk because they are on a critical customer call. How do you handle this?", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "The maintenance facility is a single-story steel-frame building. What additional measures do you take for personnel there versus the multi-story HQ?", font: "Arial", size: 22 })] }),

        // MODULE 2
        new Paragraph({ children: [new PageBreak()] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Module 2: Impact and Assessment")] }),
        para("Duration: 25 minutes  |  Objectives Tested: 1, 2, 3", { bold: true, color: "2D5F8A" }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Scenario Update")] }),
        para("It is now 2:45 PM. The tornado has passed through the area. Duration of the event was approximately 4 minutes. NWS has not yet issued an all-clear. Initial reports are coming in from multiple sources. Information is incomplete and some reports are conflicting."),

        para("HQ Building Status:", { bold: true }),
        bullet("Partial roof damage on the northwest corner (3rd floor). Water entering the building.", "bullets"),
        bullet("Multiple windows blown out on the north-facing side, 2nd and 3rd floors.", "bullets"),
        bullet("Power out in approximately 40% of the building. Emergency generators activated.", "bullets"),
        bullet("Fire suppression system triggered on the 3rd floor. No confirmed fire.", "bullets"),
        bullet("Structural integrity unknown.", "bullets"),

        para("Maintenance Facility Status:", { bold: true }),
        bullet("Significant structural damage. A section of the roof has collapsed.", "bullets"),
        bullet("All personnel evacuated to shelter areas prior to impact. No injuries reported.", "bullets"),
        bullet("2 AV trucks in service bays have unknown status. Building cannot be safely entered.", "bullets"),

        para("Employee Accountability:", { bold: true }),
        bullet("HQ shelter areas: 147 of 150 employees accounted for.", "bullets"),
        bullet("3 unaccounted: one last seen heading to parking garage, one reportedly in a 3rd floor conference room, one field technician with unknown location.", "bullets"),
        bullet("One employee in HQ lobby sustained a laceration from broken glass. First aid being administered.", "bullets"),

        para("AV Fleet Status:", { bold: true }),
        bullet("Truck 1: Emergency stop on [HIGHWAY] shoulder. Intact, systems nominal.", "bullets"),
        bullet("Truck 2: Operating normally on Route 28. Area unaffected.", "bullets"),
        bullet("Truck 3: Lost telemetry at 2:28 PM. Last known position 1.5 miles west of maintenance facility. Status unknown.", "bullets"),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Discussion Questions")] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "You have 3 unaccounted employees. What is your immediate protocol? How do you prioritize when one may be on the damaged 3rd floor?", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "The HQ building has unknown structural integrity. Who decides whether to keep people sheltered versus evacuating? What information do you need first?", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "The maintenance facility roof collapsed with 2 AV trucks inside containing proprietary LiDAR. How do you balance asset protection with the building safety restriction?", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "Truck 3 lost telemetry near the tornado path. What is your process for locating and recovering this vehicle? Who do you coordinate with?", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "Truck 1 is on the shoulder of [HIGHWAY] blocking the emergency lane. Local authorities are managing widespread damage. What do you do?", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "An unaccounted employee's spouse calls asking if their partner is safe. What do you tell them?", font: "Arial", size: 22 })] }),

        // MODULE 3
        new Paragraph({ children: [new PageBreak()] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Module 3: Crisis Management and Communications")] }),
        para("Duration: 20 minutes  |  Objectives Tested: 2, 3, 4", { bold: true, color: "2D5F8A" }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Scenario Update")] }),
        para("It is now 4:30 PM. The situation has stabilized but significant challenges remain."),

        para("Updated Status:", { bold: true }),
        bullet("All 3 previously unaccounted employees located. Parking garage employee sheltered in vehicle (uninjured). Conference room employee found in adjacent shelter area (headcount error). Field technician checked in from client site.", "bullets"),
        bullet("Structural engineer preliminary assessment: 3rd floor unsafe for occupancy. Floors 1-2 may be usable pending interior inspection. Full assessment timeline: 24-48 hours.", "bullets"),
        bullet("Maintenance facility condemned pending full evaluation. Both AV trucks sustained debris damage. LiDAR arrays potentially compromised.", "bullets"),
        bullet("Truck 3 located. Physically intact but blocked by downed trees and power lines on a residential street. Autonomous systems in safe-stop mode. Downed power line within 20 feet.", "bullets"),

        para("External Pressures:", { bold: true }),
        bullet("[LOCAL TV STATION] reporter calls: \"We understand one of your self-driving trucks was caught in the tornado and is stranded near a downed power line in a residential area. Can you confirm?\"", "bullets"),
        bullet("Employee social media post gaining traction: \"Tornado just ripped through our office. Roof is gone. [ORGANIZATION] had us sheltering in a hallway. This company needs to do better.\"", "bullets"),
        bullet("Insurance carrier requests initial damage estimate for both facilities within 24 hours.", "bullets"),
        bullet("Regional emergency management requests all businesses in the corridor report operational status and hazardous conditions.", "bullets"),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Discussion Questions")] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "HQ is partially unusable. Where do 150+ employees work tomorrow? What triggers BCP activation, and who makes that call?", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "[LOCAL TV STATION] is asking about the AV truck near the power line. Draft your response. What are the key messages, and who speaks to media?", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "The employee social media post contains inaccuracies but also legitimate criticism. What is your response strategy?", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "Truck 3 is near a downed power line on a residential street. Who coordinates recovery? What are the liability considerations of a stranded AV in a residential disaster zone?", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "Two AV trucks in the condemned maintenance facility have potentially compromised proprietary LiDAR. How do you secure these assets?", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "questions", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: "It is 5:00 PM. Most employees released. What communication goes to all [ORGANIZATION] employees tonight? What do they need before tomorrow morning?", font: "Arial", size: 22 })] }),

        // APPENDICES
        new Paragraph({ children: [new PageBreak()] }),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 4: Appendices")] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Appendix A: Participant Roster")] }),
        new Table({
          width: { size: 9360, type: WidthType.DXA }, columnWidths: [2340, 2340, 2340, 2340],
          rows: [
            new TableRow({ children: [headerCell("Exercise Role", 2340), headerCell("Corporate Title", 2340), headerCell("Name", 2340), headerCell("Department", 2340)] }),
            new TableRow({ children: [cell("Incident Commander", 2340, { bold: true }), cell("Director of Security", 2340), cell("[NAME]", 2340), cell("Security", 2340)] }),
            new TableRow({ children: [cell("Safety Officer", 2340, { bold: true, shaded: true }), cell("EHS Director", 2340, { shaded: true }), cell("[NAME]", 2340, { shaded: true }), cell("EHS", 2340, { shaded: true })] }),
            new TableRow({ children: [cell("Logistics Chief", 2340, { bold: true }), cell("Facilities Director", 2340), cell("[NAME]", 2340), cell("Facilities", 2340)] }),
            new TableRow({ children: [cell("Planning Chief", 2340, { bold: true, shaded: true }), cell("Emergency Coordinator", 2340, { shaded: true }), cell("[NAME]", 2340, { shaded: true }), cell("Security/BC", 2340, { shaded: true })] }),
            new TableRow({ children: [cell("Operations Chief", 2340, { bold: true }), cell("Security Ops Mgr", 2340), cell("[NAME]", 2340), cell("Security Ops", 2340)] }),
            new TableRow({ children: [cell("AV Fleet Liaison", 2340, { bold: true, shaded: true }), cell("Fleet Ops Manager", 2340, { shaded: true }), cell("[NAME]", 2340, { shaded: true }), cell("Vehicle Ops", 2340, { shaded: true })] }),
          ]
        }),
        para("For this small-format TTX, some ICS roles are combined. Each participant may represent multiple functions.", { italic: true }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Appendix B: Key Plans Reference")] }),
        bullet("[ORGANIZATION] Emergency Action Plan (EAP)", "bullets"),
        bullet("Severe Weather Standard Operating Procedure", "bullets"),
        bullet("Business Continuity Plan (BCP)", "bullets"),
        bullet("Crisis Communications Plan", "bullets"),
        bullet("Autonomous Vehicle Fleet Emergency Procedures", "bullets"),
        para("[Copies available during exercise or insert relevant excerpts]", { italic: true, color: "999999" }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Appendix C: Acronym List")] }),
        new Table({
          width: { size: 9360, type: WidthType.DXA }, columnWidths: [2000, 7360],
          rows: [
            new TableRow({ children: [headerCell("Acronym", 2000), headerCell("Definition", 7360)] }),
            new TableRow({ children: [cell("AV", 2000, { bold: true }), cell("Autonomous Vehicle", 7360)] }),
            new TableRow({ children: [cell("BCP", 2000, { bold: true, shaded: true }), cell("Business Continuity Plan", 7360, { shaded: true })] }),
            new TableRow({ children: [cell("EAP", 2000, { bold: true }), cell("Emergency Action Plan", 7360)] }),
            new TableRow({ children: [cell("EHS", 2000, { bold: true, shaded: true }), cell("Environmental Health and Safety", 7360, { shaded: true })] }),
            new TableRow({ children: [cell("EF", 2000, { bold: true }), cell("Enhanced Fujita (tornado damage scale)", 7360)] }),
            new TableRow({ children: [cell("ICS", 2000, { bold: true, shaded: true }), cell("Incident Command System", 7360, { shaded: true })] }),
            new TableRow({ children: [cell("LiDAR", 2000, { bold: true }), cell("Light Detection and Ranging", 7360)] }),
            new TableRow({ children: [cell("MSEL", 2000, { bold: true, shaded: true }), cell("Master Scenario Events List", 7360, { shaded: true })] }),
            new TableRow({ children: [cell("NWS", 2000, { bold: true }), cell("National Weather Service", 7360)] }),
            new TableRow({ children: [cell("SOC", 2000, { bold: true, shaded: true }), cell("Security Operations Center", 7360, { shaded: true })] }),
            new TableRow({ children: [cell("TTX", 2000, { bold: true }), cell("Tabletop Exercise", 7360)] }),
          ]
        }),
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/claude/Operation-Prairie-Warning-SitMan.docx", buffer);
  console.log("SitMan created successfully");
});
