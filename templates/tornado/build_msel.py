import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

wb = openpyxl.Workbook()

# --- MSEL Sheet ---
ws = wb.active
ws.title = "MSEL"

hdr_font = Font(name="Arial", size=10, bold=True, color="FFFFFF")
hdr_fill = PatternFill("solid", fgColor="1B3A5C")
data_font = Font(name="Arial", size=10)
bold_font = Font(name="Arial", size=10, bold=True)
wrap = Alignment(wrap_text=True, vertical="top")
center_wrap = Alignment(wrap_text=True, vertical="top", horizontal="center")
thin_border = Border(
    left=Side(style="thin", color="CCCCCC"),
    right=Side(style="thin", color="CCCCCC"),
    top=Side(style="thin", color="CCCCCC"),
    bottom=Side(style="thin", color="CCCCCC")
)
alt_fill = PatternFill("solid", fgColor="EDF2F7")
warn_fill = PatternFill("solid", fgColor="FFF3CD")
red_fill = PatternFill("solid", fgColor="F8D7DA")
green_fill = PatternFill("solid", fgColor="D4EDDA")

headers = [
    "Event #", "Module", "Exercise Time", "Scenario Time", "Event Type",
    "From (Source)", "To (Target)", "Delivery Method", "Inject Content",
    "Expected Player Action", "Objective Tested", "Controller Notes", "Key Event"
]

col_widths = [8, 9, 13, 13, 12, 14, 14, 14, 45, 40, 14, 30, 10]

for i, (h, w) in enumerate(zip(headers, col_widths), 1):
    cell = ws.cell(row=1, column=i, value=h)
    cell.font = hdr_font
    cell.fill = hdr_fill
    cell.alignment = center_wrap
    cell.border = thin_border
    ws.column_dimensions[get_column_letter(i)].width = w

# MSEL data
msel = [
    # Module 1
    ["M1-01", "1", "0:10", "1:15 PM", "Primary", "Facilitator", "All Players", "Narration",
     "National Weather Service issues Tornado Watch for [COUNTY] and surrounding areas, effective until 9:00 PM. Conditions favorable for tornadoes and severe thunderstorms.",
     "Security: Acknowledge watch, determine if notification to employees is warranted. EHS: Review severe weather procedures. Facilities: Check emergency generator status and shelter readiness.",
     "1", "This is the opening inject. Read slowly. Let participants discuss before moving on.", "Y"],

    ["M1-02", "1", "0:13", "1:30 PM", "Primary", "Facilitator (as NWS)", "All Players", "Narration",
     "Sky darkens significantly. Doppler radar shows strong line of storms approaching from southwest. NWS issues Severe Thunderstorm Warning for immediate area.",
     "Security: Consider activating mass notification system. Facilities: Prepare to activate shelter-in-place protocol. All: Determine notification thresholds.",
     "1", "Push participants: At what point do we move from monitoring to action?", "N"],

    ["M1-03", "1", "0:16", "1:42 PM", "Primary", "Facilitator (as NWS)", "All Players", "Slide/Narration",
     "NWS upgrades to TORNADO WARNING for [COUNTY]. Radar indicates strong rotation 8 miles SW of campus, tracking NE at 35 mph. Tornado reported on the ground near [NEARBY TOWN].",
     "Security: Activate shelter-in-place immediately. Activate mass notification system. Facilities: Open shelter areas, activate emergency protocols. EHS: Confirm shelter areas are accessible.",
     "1", "This should trigger immediate action. If participants are still deliberating, prompt: 'A tornado has been confirmed on the ground 8 miles away moving toward you at 35 mph. You have approximately 14 minutes.'", "Y"],

    ["M1-04", "1", "0:19", "1:48 PM", "Primary", "Facilitator (as field crew)", "Security", "Simulated radio/phone",
     "Field test crew reports: 'We can see a funnel cloud about 3 miles to the southwest. We are in the outdoor staging lot with 3 trucks. What do we do?'",
     "Security: Direct crew to abandon vehicles and move to nearest shelter immediately. Initiate accountability check for all field personnel. Notify vehicle operations of truck exposure.",
     "1", "This creates urgency around life safety vs. asset protection. The correct answer is always life safety first.", "Y"],

    ["M1-05", "1", "0:22", "1:50 PM", "Primary", "Facilitator", "All Players", "Narration",
     "Shelter-in-place is active. The SOC is attempting to account for all personnel. Current status: 87% of badge-in employees accounted for in shelter areas. 13% unaccounted. Visitor log shows 4 visitors signed in today. Status of 6-person HVAC contractor crew unknown.",
     "Security: Identify unaccounted personnel and determine last known locations. Facilities: Confirm contractor crew location (they should be on Building A roof per work order). All: Discuss accountability gaps.",
     "1", "The contractor crew is a deliberate gap. Most accountability systems do not capture contractors. Push on this.", "N"],

    # Module 2
    ["M2-01", "2", "0:30", "1:55 PM", "Primary", "Facilitator", "All Players", "Narration",
     "EF-2 tornado passes 0.4 miles south of campus. Sustained winds 70-85 mph with debris on campus. Power lost at 1:57 PM. Emergency generators activate except Building B generator which fails to start.",
     "All: Transition from shelter-in-place to damage assessment mode. Security: Establish incident command. Facilities: Dispatch assessment teams. EHS: Assess for immediate hazards before sending anyone outside.",
     "2, 3", "Read this update slowly. There is a lot of information. Pause and let participants absorb before asking questions.", "Y"],

    ["M2-02", "2", "0:33", "2:05 PM", "Primary", "Facilitator (as SOC)", "Security", "Simulated report",
     "SOC initial damage report: Building B roof membrane peeled back, water entering facility. 5 AV trucks inside. 3 AV trucks in outdoor lot exposed to wind/debris. At least 1 truck with visible body damage and bent sensor mast. Building A minor window damage, south side floor 3. Large tree blocking main campus access road.",
     "Security: Prioritize assessment (life safety first, then critical assets). Facilities: Assess structural integrity before entry. Coordinate with EHS on safe entry protocols. All: Begin documenting damage for insurance.",
     "2, 3", "Push: Who leads this assessment? What is the priority order? Is anyone going into Building B?", "Y"],

    ["M2-03", "2", "0:36", "2:10 PM", "Primary", "Facilitator (as employee)", "EHS/Security", "Simulated report",
     "Employee reports minor laceration from broken glass on Building A floor 3. Employee is ambulatory but bleeding and requesting medical attention. First aid kit is in the lobby.",
     "EHS: Activate first aid response. Assess injury severity. Security: Document incident for OSHA recordkeeping. Determine if employee needs transport to medical facility. Consider that main access road is blocked.",
     "2", "If participants focus only on the injury, redirect: 'The main access road is blocked by a tree. How does an ambulance get in if needed?'", "N"],

    ["M2-04", "2", "0:39", "2:15 PM", "Primary", "Facilitator", "All Players", "Narration",
     "Building B update: Water continues to enter through damaged roof sections. The 5 trucks inside are in varying positions. Two appear to have water on their roofs and hoods. The facility has no power (generator failed). Vehicle sensor and compute systems are powered down but water exposure is a concern for electronics and data integrity.",
     "Facilities: Coordinate emergency tarping or water mitigation. Security: Assess whether vehicles can be moved to dry area. All: Discuss risk to proprietary technology and data from water damage. Determine if VP Engineering or fleet management needs to be notified.",
     "2, 3", "This is the IP protection discussion point. Push: What is the cost of losing sensor data? Can it be backed up remotely? Who decides to move the trucks?", "Y"],

    ["M2-05", "2", "0:43", "2:30 PM", "Primary", "Facilitator", "All Players", "Narration",
     "Neighboring commercial building 200 yards south reports significant structural damage. Their facility manager calls [ORGANIZATION] Facilities asking if we can provide temporary shelter for 15 of their displaced employees. They have minor injuries.",
     "All: Discuss mutual aid response. EHS: Assess capacity and safety of hosting external personnel. Security: Consider access control implications. Facilities: Identify available space that is confirmed safe.",
     "2", "Tests mutual aid decision-making. There is no wrong answer but it reveals how participants balance neighborly duty with operational priorities.", "N"],

    # Module 3
    ["M3-01", "3", "0:50", "3:00 PM", "Primary", "Facilitator", "All Players", "Narration",
     "Storm has passed. NWS Tornado Warning expired. All employees accounted for. One employee transported to urgent care for laceration. [COUNTY] declares local state of emergency. Emergency services at capacity region-wide.",
     "All: Transition to recovery operations. Begin systematic damage documentation. Develop initial timeline for return to operations.",
     "3, 4", "Clear transition point. Set the scene for recovery phase.", "N"],

    ["M3-02", "3", "0:53", "3:05 PM", "Primary", "Facilitator (as receptionist)", "Security/Comms", "Simulated phone call",
     "[LOCAL TV STATION] reporter calls main line: 'We have reports of significant damage at the [ORGANIZATION] campus. Can you confirm? Were any of your self-driving trucks damaged? Is anyone injured? We would like to send a camera crew.'",
     "Security: Route to designated spokesperson or communications team. Do NOT confirm or deny details to media. Develop holding statement. Determine authorized spokesperson and key messages.",
     "4", "This is the first media pressure point. Watch whether participants have a clear media protocol or improvise.", "Y"],

    ["M3-03", "3", "0:56", "3:15 PM", "Primary", "Facilitator", "All Players", "Narration",
     "Employee social media post discovered: Photos of damaged Building B roof posted to personal account with caption 'our trucks got hammered.' Post shared 47 times and climbing. A second inquiry from [CITY] [LOCAL NEWSPAPER] arrives.",
     "All: Discuss social media policy during incidents. Determine response to employee (not punitive during a crisis). Develop proactive media strategy rather than reactive. Consider what information is now public.",
     "4", "Push the tension: Do you contact the employee? What do you say? How does this change your media strategy?", "Y"],

    ["M3-04", "3", "1:00", "3:30 PM", "Primary", "Facilitator (as CEO office)", "Security", "Simulated message",
     "CEO requests executive briefing within the hour. Board liaison also requests status update. CEO wants to know: (1) Is everyone safe? (2) What is the damage? (3) What is the impact on operations and timeline for recovery? (4) What are we telling the public?",
     "Security: Prepare structured briefing. Include: personnel status, facility status, fleet status, business impact, communications status, key decisions needed from leadership. Determine what decisions require CEO/Board authority.",
     "4", "Push for specifics: What format is the briefing? What decisions do you need from the CEO that you cannot make at your level?", "Y"],

    ["M3-05", "3", "1:04", "4:00 PM", "Primary", "Facilitator", "All Players", "Narration",
     "Insurance carrier advises 48-72 hours for adjuster. Advises documenting everything now. Building A floors 1-2 cleared for limited reoccupancy. Floor 3 south closed. Building B closed pending structural assessment. Power restoration estimated 8-12 hours. Generators have 18 hours of fuel (except Bldg B).",
     "Facilities: Develop return-to-work plan and criteria. Security: Assess ongoing security for damaged areas and exposed fleet. EHS: Define clearance criteria for Building B reentry. All: Determine remote work activation and employee communication plan.",
     "2, 3, 4", "This is the recovery planning capstone. Push for timeline and decision criteria, not just 'we will figure it out.'", "N"],
]

# Contingency injects
contingency = [
    ["C-01", "1", "As needed", "-", "Contingency (Accelerator)", "Facilitator", "All Players", "Narration",
     "NWS issues Particularly Dangerous Situation (PDS) tornado warning. Radar-confirmed large tornado on the ground tracking directly toward campus.",
     "Immediate maximum shelter-in-place response. All non-essential movement ceases.", "1",
     "USE IF: Module 1 discussion lacks urgency or participants treat scenario casually.", "N"],

    ["C-02", "2", "As needed", "-", "Contingency (Redirect)", "Facilitator (as VP Engineering)", "Security", "Simulated call",
     "VP Engineering demands to send team into Building B immediately to assess truck sensor systems and download data before it is potentially lost. Says data is irreplaceable.",
     "Balance life safety vs. IP protection. Building must be structurally cleared before entry. Develop alternative data recovery plan.", "2, 3",
     "USE IF: Participants have not addressed tension between life safety and asset/IP protection.", "N"],

    ["C-03", "2", "As needed", "-", "Contingency (Redirect)", "Facilitator (as vehicle ops)", "Security", "Simulated call",
     "One of two AV trucks on route has lost connectivity. Last known position: [HIGHWAY] near [HIGHWAY TUNNEL], 15 minutes ago.",
     "Attempt to reestablish contact. Determine safe harbor protocol for remote vehicles. Coordinate with remote operations team.", "3",
     "USE IF: Participants have not discussed remote fleet or autonomous operations implications.", "N"],

    ["C-04", "3", "As needed", "-", "Contingency (Complication)", "Facilitator", "All Players", "Narration",
     "Second employee social media post goes viral: video of damaged AV truck with visible Lidar unit hanging off roof rack. Picked up by tech blogs. Reuters reporter calls.",
     "Escalate media response. Consider proactive press statement. Engage executive communications. Assess competitive intelligence exposure.", "4",
     "USE IF: Module 3 communications discussion needs more pressure or resolving too easily.", "N"],

    ["C-05", "3", "As needed", "-", "Contingency (Complication)", "Facilitator", "All Players", "Narration",
     "NHTSA contacts [ORGANIZATION] regulatory affairs team requesting preliminary report on any damage to autonomous driving systems and whether any AV incidents occurred during the storm.",
     "Engage regulatory affairs and legal. Determine reporting obligations. Prepare preliminary assessment of AV system integrity.", "3, 4",
     "USE IF: Participants have not addressed regulatory notification requirements.", "N"],

    ["C-06", "3", "As needed", "-", "Contingency (Complication)", "Facilitator", "All Players", "Narration",
     "Competitor PR team issues public statement expressing concern about safety of autonomous vehicles operating in severe weather, indirectly referencing [ORGANIZATION].",
     "Assess competitive threat. Develop response strategy. Coordinate with CEO/Board on messaging.", "4",
     "USE IF: Discussion is only tactical. Push strategic communications angle.", "N"],
]

row = 2
for data in msel + contingency:
    is_contingency = data[4].startswith("Contingency")
    for col, val in enumerate(data, 1):
        cell = ws.cell(row=row, column=col, value=val)
        cell.font = data_font
        cell.alignment = wrap
        cell.border = thin_border
        if is_contingency:
            if "Accelerator" in data[4]:
                cell.fill = warn_fill
            elif "Redirect" in data[4]:
                cell.fill = green_fill
            elif "Complication" in data[4]:
                cell.fill = red_fill
        elif row % 2 == 0:
            cell.fill = alt_fill
    row += 1

ws.auto_filter.ref = f"A1:M{row-1}"
ws.freeze_panes = "A2"
ws.sheet_properties.pageSetUpPr = openpyxl.worksheet.properties.PageSetupProperties(fitToPage=True)
ws.page_setup.orientation = "landscape"
ws.page_setup.fitToWidth = 1
ws.page_setup.fitToHeight = 0

# --- Evaluation Tracker Sheet ---
ws2 = wb.create_sheet("Evaluation Tracker")

eval_headers = ["Objective #", "Objective Description", "Observation Type", "Observation", "Analysis", "Reference (Plan/Procedure)", "Rating"]
eval_widths = [10, 35, 15, 45, 35, 25, 10]

for i, (h, w) in enumerate(zip(eval_headers, eval_widths), 1):
    cell = ws2.cell(row=1, column=i, value=h)
    cell.font = hdr_font
    cell.fill = hdr_fill
    cell.alignment = center_wrap
    cell.border = thin_border
    ws2.column_dimensions[get_column_letter(i)].width = w

# Pre-populate with objective rows
obj_data = [
    ["1", "Employee notification and accountability", "", "", "", "", ""],
    ["1", "Employee notification and accountability", "", "", "", "", ""],
    ["1", "Employee notification and accountability", "", "", "", "", ""],
    ["2", "Facility damage assessment and business continuity", "", "", "", "", ""],
    ["2", "Facility damage assessment and business continuity", "", "", "", "", ""],
    ["2", "Facility damage assessment and business continuity", "", "", "", "", ""],
    ["3", "Fleet/vehicle asset protection", "", "", "", "", ""],
    ["3", "Fleet/vehicle asset protection", "", "", "", "", ""],
    ["3", "Fleet/vehicle asset protection", "", "", "", "", ""],
    ["4", "Crisis communications (internal + external)", "", "", "", "", ""],
    ["4", "Crisis communications (internal + external)", "", "", "", "", ""],
    ["4", "Crisis communications (internal + external)", "", "", "", "", ""],
]

for r, data in enumerate(obj_data, 2):
    for c, val in enumerate(data, 1):
        cell = ws2.cell(row=r, column=c, value=val)
        cell.font = data_font
        cell.alignment = wrap
        cell.border = thin_border
        if r % 2 == 0:
            cell.fill = alt_fill

ws2.freeze_panes = "A2"

# --- Improvement Plan Sheet ---
ws3 = wb.create_sheet("Improvement Plan")

ip_headers = ["Obs #", "Observation Summary", "Corrective Action", "Capability Element", "Responsible Org/Person", "Start Date", "Target Completion", "Status"]
ip_widths = [7, 35, 35, 18, 20, 12, 15, 12]

for i, (h, w) in enumerate(zip(ip_headers, ip_widths), 1):
    cell = ws3.cell(row=1, column=i, value=h)
    cell.font = hdr_font
    cell.fill = hdr_fill
    cell.alignment = center_wrap
    cell.border = thin_border
    ws3.column_dimensions[get_column_letter(i)].width = w

# Pre-populate capability element options as a note
ws3.cell(row=2, column=4).value = "Planning / Organization / Equipment / Training / Exercise"
ws3.cell(row=2, column=4).font = Font(name="Arial", size=9, italic=True, color="888888")
ws3.cell(row=2, column=8).value = "Open / In Progress / Complete"
ws3.cell(row=2, column=8).font = Font(name="Arial", size=9, italic=True, color="888888")

for r in range(2, 15):
    for c in range(1, 9):
        cell = ws3.cell(row=r, column=c)
        cell.border = thin_border
        cell.alignment = wrap
        if r % 2 == 0:
            cell.fill = alt_fill

ws3.freeze_panes = "A2"

wb.save("/home/claude/msel.xlsx")
print("MSEL workbook created with 3 sheets")
