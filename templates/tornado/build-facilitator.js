const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageBreak, LevelFormat, PageNumber, VerticalAlign
} = require("docx");

const border = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };
const headerFill = { fill: "1B3A5C", type: ShadingType.CLEAR };
const altFill = { fill: "EDF2F7", type: ShadingType.CLEAR };
const warnFill = { fill: "FFF3CD", type: ShadingType.CLEAR };
const redFill = { fill: "F8D7DA", type: ShadingType.CLEAR };
const greenFill = { fill: "D4EDDA", type: ShadingType.CLEAR };

function hCell(text, width) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA }, shading: headerFill, margins: cellMargins,
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: "FFFFFF", font: "Arial", size: 20 })] })]
  });
}
function dCell(text, width, opts = {}) {
  const runs = [];
  if (opts.label) {
    runs.push(new TextRun({ text: opts.label + " ", bold: true, font: "Arial", size: 20, color: opts.labelColor || "333333" }));
  }
  runs.push(new TextRun({ text, font: "Arial", size: 20, bold: opts.bold || false, italics: opts.italics || false, color: opts.color || "333333" }));
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: opts.shading || undefined, margins: cellMargins,
    verticalAlign: VerticalAlign.TOP,
    children: [new Paragraph({ children: runs })]
  });
}
function multiCell(lines, width, opts = {}) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: opts.shading || undefined, margins: cellMargins,
    verticalAlign: VerticalAlign.TOP,
    children: lines.map(l => new Paragraph({
      spacing: { before: 40, after: 40 },
      children: [new TextRun({ text: l.text || l, font: "Arial", size: 20, bold: l.bold || false, italics: l.italics || false, color: l.color || "333333" })]
    }))
  });
}
function p(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.sb || 120, after: opts.sa || 120 },
    alignment: opts.align || AlignmentType.LEFT,
    children: [new TextRun({ text, font: "Arial", size: opts.size || 22, bold: opts.bold || false, italics: opts.italics || false, color: opts.color || "333333" })]
  });
}
function heading(text, level) {
  return new Paragraph({ heading: level, spacing: { before: 240, after: 120 }, children: [new TextRun({ text, font: "Arial", bold: true })] });
}

const children = [];

// COVER
children.push(
  new Paragraph({ spacing: { before: 3000 }, children: [] }),
  p("EXERCISE - FOR OFFICIAL USE ONLY", { align: AlignmentType.CENTER, bold: true, color: "CC0000" }),
  new Paragraph({ spacing: { before: 800 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "OPERATION THUNDERSTRIKE", font: "Arial", size: 52, bold: true, color: "1B3A5C" })] }),
  p("Severe Weather / Tornado Tabletop Exercise", { align: AlignmentType.CENTER, size: 28, color: "555555" }),
  new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "FACILITATOR GUIDE", font: "Arial", size: 36, bold: true, color: "1B3A5C" })] }),
  p("[DATE TO BE DETERMINED]", { align: AlignmentType.CENTER, size: 24, color: "555555", sb: 600 }),
  p("[ORGANIZATION], [CITY], [STATE]", { align: AlignmentType.CENTER }),
  p("THIS DOCUMENT IS FOR EXERCISE STAFF ONLY", { align: AlignmentType.CENTER, bold: true, color: "CC0000", sb: 1200 }),
  p("Do not distribute to exercise participants.", { align: AlignmentType.CENTER, italics: true, color: "666666" }),
  new Paragraph({ children: [new PageBreak()] })
);

// PRE-EXERCISE CHECKLIST
children.push(
  heading("PRE-EXERCISE CHECKLIST", HeadingLevel.HEADING_1),
  heading("72 Hours Before", HeadingLevel.HEADING_2),
  p("[ ] Confirm room reservation and AV setup (projector, screen, speakers)"),
  p("[ ] Send participant confirmation with date, time, location, and parking instructions"),
  p("[ ] Print SitMan copies (one per participant plus 3 extras)"),
  p("[ ] Print Evaluator Worksheets (one per evaluator)"),
  p("[ ] Print Participant Feedback Forms (one per participant)"),
  p("[ ] Confirm facilitator and evaluator availability"),
  p("[ ] Brief Exercise Director on scenario and objectives"),

  heading("Day of Exercise", HeadingLevel.HEADING_2),
  p("[ ] Arrive 45 minutes early for room setup"),
  p("[ ] Arrange seating: U-shape or hollow square preferred for group of 8-12"),
  p("[ ] Place name tents at each seat (name, title, department)"),
  p("[ ] Place SitMan and pen at each seat (face down until exercise start)"),
  p("[ ] Test projector and load presentation slides (if using)"),
  p("[ ] Set up facilitator station with this guide, MSEL, and timer"),
  p("[ ] Place clock or timer visible to facilitator"),
  p("[ ] Set up water/coffee if available"),
  p("[ ] Ensure evaluators are positioned to observe without disrupting"),
  p("[ ] Brief evaluators on evaluation criteria (15 minutes before start)"),
  new Paragraph({ children: [new PageBreak()] })
);

// RUN OF SHOW
children.push(
  heading("RUN OF SHOW", HeadingLevel.HEADING_1),
  p("This is the minute-by-minute guide for the facilitator. Times shown are exercise clock (relative to exercise start)."),
);

// Run of show table
const rosRows = [
  ["0:00 - 0:10", "Welcome and Setup", "Welcome participants. State: 'This is an exercise. All discussions today are for exercise purposes only.' Introductions around the table (name, role, department). Review ground rules (Chatham House Rule, no wrong answers, phones silent, stay in role). Overview exercise structure: 3 modules plus hot wash. Review exercise objectives. Direct participants to open SitMan to Section 3 (Scenario). Read aloud the General Conditions and Initial Conditions.", "Set the tone: professional, conversational, candid. Make eye contact. Emphasize this is a learning exercise, not a test."],
  ["0:10 - 0:30", "MODULE 1: Alert and Notification", "Read the Module 1 Situation Update aloud. Pause after each major development (Watch, Warning, funnel sighting). Ask discussion questions in sequence. Ensure all three departments contribute. Probe for specifics: 'Who specifically does that? What system do you use? How long does that take?'", "Key probe: If participants say 'we would notify everyone,' push for mechanism, timeline, and accountability. Ask 'what if the mass notification system is down?' as a contingency."],
  ["0:30 - 0:50", "MODULE 2: Impact and Assessment", "Read Module 2 Situation Update aloud. This module has the most content; pace yourself. Start with the life safety question (injured employee), then facility, then fleet. Allow natural debate on priorities. Push the fleet protection discussion: these trucks contain proprietary technology.", "Watch for: Are participants defaulting to their own silo or collaborating across departments? Note any confusion about decision authority. The Building B generator failure is designed to create cascading problems."],
  ["0:50 - 1:10", "MODULE 3: Recovery and Communications", "Read Module 3 Situation Update aloud. Start with the media inquiry and social media post to create urgency. Push hard on the CEO/Board briefing question: what format, what content, what decisions needed? End with return-to-work and regulatory questions.", "The social media post is designed to create tension between employee empathy and operational security. There is no perfect answer. Let participants wrestle with it."],
  ["1:10 - 1:25", "HOT WASH", "Transition: 'That concludes the scenario. Let us step out of the exercise and talk about what we just experienced.' Use the Hot Wash questions from the SitMan. Go around the table for each question. Capture responses on whiteboard or flip chart if available. Ask for the 1-5 ratings for each objective area. Ask for top 3 improvement actions.", "This is the most valuable part of the exercise. Do not rush it. If time is short, prioritize the gaps/actions discussion over the strengths discussion."],
  ["1:25 - 1:30", "Closing", "Thank participants. Explain AAR/IP timeline (draft within 14 days, final within 60 days). Collect all SitMan copies and exercise materials. Distribute Participant Feedback Forms (can be completed now or returned within 48 hours). State: 'This exercise is now concluded. Thank you for your time and candor.'", "Collect materials before participants leave. Remind evaluators to complete their worksheets within 24 hours."]
];

children.push(new Table({
  width: { size: 9360, type: WidthType.DXA }, columnWidths: [1300, 1700, 3680, 2680],
  rows: [
    new TableRow({ children: [hCell("Time", 1300), hCell("Segment", 1700), hCell("Facilitator Actions", 3680), hCell("Notes / Guidance", 2680)] }),
    ...rosRows.map((r, i) => new TableRow({
      children: [
        dCell(r[0], 1300, { bold: true, shading: i % 2 === 0 ? altFill : undefined }),
        dCell(r[1], 1700, { bold: true, shading: i % 2 === 0 ? altFill : undefined }),
        dCell(r[2], 3680, { shading: i % 2 === 0 ? altFill : undefined }),
        dCell(r[3], 2680, { italics: true, shading: i % 2 === 0 ? altFill : undefined })
      ]
    }))
  ]
}));

children.push(new Paragraph({ children: [new PageBreak()] }));

// CONTINGENCY INJECTS
children.push(
  heading("CONTINGENCY INJECTS", HeadingLevel.HEADING_1),
  p("Use these injects as needed to redirect, accelerate, or complicate the exercise. Only deploy if the discussion stalls, runs ahead of schedule, or misses a key objective."),
);

children.push(new Table({
  width: { size: 9360, type: WidthType.DXA }, columnWidths: [1100, 1300, 4500, 2460],
  rows: [
    new TableRow({ children: [hCell("Type", 1100), hCell("Module", 1300), hCell("Inject Content", 4500), hCell("Trigger Condition", 2460)] }),
    // Accelerators
    new TableRow({ children: [
      dCell("Accelerator", 1100, { bold: true, shading: warnFill }),
      dCell("1", 1300, { shading: warnFill }),
      dCell("'The NWS has just issued a Particularly Dangerous Situation (PDS) tornado warning. This is the highest level of tornado warning. Radar-confirmed large tornado on the ground and tracking directly toward the campus.'", 4500, { shading: warnFill }),
      dCell("Discussion is slow in Module 1. Participants are treating the scenario casually.", 2460, { shading: warnFill })
    ]}),
    new TableRow({ children: [
      dCell("Accelerator", 1100, { bold: true, shading: warnFill }),
      dCell("2", 1300, { shading: warnFill }),
      dCell("'Facilities reports that a section of the Building B wall has partially collapsed on the south side. One of the AV trucks inside may be pinned under debris. Fire suppression system in that section has been triggered.'", 4500, { shading: warnFill }),
      dCell("Module 2 discussion lacks urgency or participants are not engaging on the fleet protection objective.", 2460, { shading: warnFill })
    ]}),
    // Redirectors
    new TableRow({ children: [
      dCell("Redirect", 1100, { bold: true, shading: greenFill }),
      dCell("1", 1300, { shading: greenFill }),
      dCell("'A contractor crew of 6 was working on the HVAC system on the Building A roof when the warning was issued. They are not in your employee headcount system. How do you account for them?'", 4500, { shading: greenFill }),
      dCell("Participants assume complete accountability without considering non-employees on campus.", 2460, { shading: greenFill })
    ]}),
    new TableRow({ children: [
      dCell("Redirect", 1100, { bold: true, shading: greenFill }),
      dCell("2", 1300, { shading: greenFill }),
      dCell("'One of the two AV trucks on route has lost connectivity with the operations center. Last known position was on [HIGHWAY] near the [HIGHWAY TUNNEL], approximately 15 minutes ago.'", 4500, { shading: greenFill }),
      dCell("Participants have not discussed the remote fleet or autonomous operations implications.", 2460, { shading: greenFill })
    ]}),
    new TableRow({ children: [
      dCell("Redirect", 1100, { bold: true, shading: greenFill }),
      dCell("3", 1300, { shading: greenFill }),
      dCell("'Your VP of Engineering calls: she wants to send her team into Building B immediately to assess the truck sensor systems and download data before it is lost. She says the data on those trucks is irreplaceable.'", 4500, { shading: greenFill }),
      dCell("Module 2 discussion has not addressed the tension between life safety and asset/IP protection.", 2460, { shading: greenFill })
    ]}),
    // Complications
    new TableRow({ children: [
      dCell("Complication", 1100, { bold: true, shading: redFill }),
      dCell("3", 1300, { shading: redFill }),
      dCell("'A second employee social media post has gone viral. This one shows video of the damaged AV truck with a visible Lidar unit hanging off the roof rack. The post has been picked up by a tech blog and a Reuters reporter has now called.'", 4500, { shading: redFill }),
      dCell("Module 3 communications discussion needs more pressure or is resolving too easily.", 2460, { shading: redFill })
    ]}),
    new TableRow({ children: [
      dCell("Complication", 1100, { bold: true, shading: redFill }),
      dCell("3", 1300, { shading: redFill }),
      dCell("'A competitor's PR team has issued a statement expressing concern about the safety of autonomous vehicles operating in severe weather conditions, indirectly referencing [ORGANIZATION].'", 4500, { shading: redFill }),
      dCell("Push the strategic communications discussion if participants are only focused on tactical response.", 2460, { shading: redFill })
    ]}),
    new TableRow({ children: [
      dCell("Complication", 1100, { bold: true, shading: redFill }),
      dCell("2-3", 1300, { shading: redFill }),
      dCell("'NHTSA has seen the media coverage and has contacted [ORGANIZATION]'s regulatory affairs team asking for a preliminary report on any damage to autonomous driving systems and whether any AV incidents occurred during the storm.'", 4500, { shading: redFill }),
      dCell("Inject if participants have not addressed regulatory notification requirements.", 2460, { shading: redFill })
    ]}),
  ]
}));

children.push(new Paragraph({ children: [new PageBreak()] }));

// FACILITATOR TIPS
children.push(
  heading("FACILITATOR TIPS", HeadingLevel.HEADING_1),
  heading("Managing Discussion Flow", HeadingLevel.HEADING_2),
  p("If one participant is dominating, redirect: 'That is a good point. [Other participant], how does that look from the Facilities/EHS perspective?'"),
  p("If the group goes down a rabbit hole, redirect: 'That is an important issue. Let us capture it and come back to it. For now, let us focus on [current question].'"),
  p("If discussion stalls, try: 'Let me push you on this. What happens if [worst case]? Who owns that decision?'"),
  p("If a participant says 'I do not know,' that is a valid and valuable answer. Capture it as a gap."),

  heading("Time Management", HeadingLevel.HEADING_2),
  p("The 90-minute format is tight. You do not need to ask every discussion question. Prioritize the questions that directly test the four objectives."),
  p("If Module 1 runs long, cut it at the 25-minute mark even if you have not asked every question. Module 2 is the core of the exercise."),
  p("If you are running short on time in Module 3, focus on the media/social media questions and the CEO briefing question. Skip the regulatory questions if needed."),
  p("Protect the hot wash time. It is the most important segment for generating actionable improvements."),

  heading("Handling Difficult Moments", HeadingLevel.HEADING_2),
  p("If participants argue about the 'right' answer, let them debate briefly, then frame it: 'This disagreement is exactly why we run exercises. Let us capture both perspectives and resolve it in the improvement plan.'"),
  p("If a participant challenges the scenario realism, acknowledge it: 'You are right that the exact sequence might differ. For today, let us work with this scenario and see what it reveals about our preparedness.'"),
  p("If a participant gets visibly frustrated about gaps, normalize it: 'Every organization has gaps. The fact that we are finding them here is the purpose of this exercise.'"),

  heading("SimCell Responses", HeadingLevel.HEADING_2),
  p("If participants ask questions directed at external entities, you simulate the response:"),
  p("NWS / Emergency Management: '[COUNTY] EMA confirms the tornado warning. They advise sheltering in place and monitoring NOAA Weather Radio. No county shelter has been opened at this time.'"),
  p("[CITY] Bureau of Fire: 'Fire dispatch advises that multiple calls are active across the south hills. They cannot provide an ETA for response to your campus at this time.'"),
  p("Utility Company: '[UTILITY COMPANY] automated system reports widespread outages in your area. Estimated restoration is 8-12 hours. Priority restoration for critical infrastructure requests can be submitted online.'"),
  p("Insurance: 'Your carrier's 24-hour emergency line advises documenting all damage with photos and video. An adjuster will be assigned within 48-72 hours. Do not begin permanent repairs until the adjuster has inspected.'"),
  p("Media ([LOCAL TV STATION]): 'This is [reporter name] from [LOCAL TV STATION]. We have reports of damage to the [ORGANIZATION] facility. Can you confirm? Is anyone injured? Were any of your self-driving trucks damaged? Can we send a crew to film the damage?'"),
);

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "1B3A5C" },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "2E5C8A" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1080, bottom: 1440, left: 1080 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "FACILITATOR GUIDE - EXERCISE STAFF ONLY  |  Operation Thunderstrike", font: "Arial", size: 16, color: "CC0000", italics: true })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 4 } },
          children: [
            new TextRun({ text: "FACILITATOR GUIDE - NOT FOR DISTRIBUTION  |  Page ", font: "Arial", size: 16, color: "999999" }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: "999999" })
          ]
        })]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/claude/facilitator-guide.docx", buffer);
  console.log("Facilitator Guide created");
});
