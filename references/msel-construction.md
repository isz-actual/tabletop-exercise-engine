# MSEL Construction Guide

Detailed reference for building the Master Scenario Events List (MSEL) for tabletop exercises.

## Table of Contents

1. [What is the MSEL](#what-is-the-msel)
2. [MSEL Column Structure](#msel-column-structure)
3. [Inject Types](#inject-types)
4. [Inject Delivery Methods](#inject-delivery-methods)
5. [MSEL Development Process](#msel-development-process)
6. [Inject Writing Rules](#inject-writing-rules)
7. [Pacing and Escalation](#pacing-and-escalation)
8. [Contingency Injects](#contingency-injects)
9. [SimCell Operations](#simcell-operations)
10. [Example MSEL Entries by Scenario Type](#example-msel-entries-by-scenario-type)

---

## What is the MSEL

The Master Scenario Events List is a chronological timeline of expected actions and scripted events to be injected into exercise play by facilitators and controllers to generate or prompt player activity. Per HSEEP doctrine, the MSEL ensures that all exercise objectives are adequately tested through scenario-driven events.

For tabletop exercises, the MSEL serves as the facilitator's script and pacing guide. Unlike full-scale exercises where injects drive physical actions, TTX injects drive discussion and decision-making.

---

## MSEL Column Structure

Every MSEL entry should contain these fields. When generating the MSEL as a spreadsheet, use these as column headers:

| Column | Description |
|--------|-------------|
| **Event #** | Sequential number (use format: M1-001, M1-002 for Module 1 events; M2-001 for Module 2, etc.) |
| **Module** | Which exercise module this inject belongs to (1, 2, 3, 4) |
| **Exercise Time** | Relative time from exercise start (e.g., T+00:05, T+00:15) |
| **Real-World Time** | Simulated time in the scenario (e.g., "Tuesday 0915 hrs") |
| **Event Type** | Inject / Contingency Inject / Expected Action / Controller Action / Facilitator Note |
| **From** | Who or what organization the information comes from (e.g., "SOC Analyst", "Local PD Dispatch", "CNN Breaking News") |
| **To** | Who receives the information (e.g., "Security Operations Center", "Crisis Management Team", "All Players") |
| **Delivery Method** | How the inject is delivered (see Inject Delivery Methods below) |
| **Inject Content** | The actual text, message, or description of what happens. Write this as the exact words to be read, shown, or delivered. |
| **Expected Player Action** | What players should do in response. This is the evaluator's benchmark. |
| **Objective Tested** | Which exercise objective(s) this event is designed to test. Use objective numbers. |
| **Controller Notes** | Instructions for the person delivering this inject. Timing cues, delivery guidance, what to watch for. |
| **Key Event** | Yes/No flag. Key events are critical to exercise flow and cannot be skipped. |

---

## Inject Types

### Primary Injects
Events that move the exercise forward. These are pre-planned and delivered on schedule regardless of player actions.

**Examples:**
- Initial incident report
- Escalation of situation
- New information from external source
- Media inquiry
- Regulatory notification requirement
- Employee/family inquiry
- Resource failure or complication

### Contingency Injects
Pre-written events deployed only if needed to redirect exercise play or fill gaps.

**Sub-types:**
- **Accelerator**: Used when players resolve an issue too quickly and need additional challenge
- **Hint/Assist**: Used when players are stuck and need information to move forward
- **Redirect**: Used when discussion has gone off-topic
- **Complication**: Adds a second problem to force prioritization

### Expected Actions
Not injected; these document what players SHOULD do in response to an inject. They are the evaluator's checklist.

### Controller Actions
Administrative events: start module, pause for discussion, call time, transition between modules.

---

## Inject Delivery Methods

Choose the delivery method based on what is most realistic for the scenario and feasible for the exercise format:

| Method | Description | Best For |
|--------|-------------|----------|
| **Facilitator Narration** | Facilitator reads the inject aloud to all players | Scenario updates, situation changes, environmental conditions |
| **Slide/Screen Display** | Information displayed on projector | News alerts, social media posts, surveillance images, data |
| **Printed Handout** | Physical document distributed to specific player(s) | Reports, emails, official documents, intelligence summaries |
| **Phone Call (Simulated)** | Controller calls or approaches a player and delivers information verbally | Law enforcement notifications, employee reports, executive calls |
| **Email (Simulated)** | Message delivered via actual email, chat, or printed email format | Regulatory inquiries, media questions, vendor notifications |
| **Breaking News Chyron** | Mock news banner displayed on screen | Media pressure, public awareness of incident |
| **Social Media Post** | Mock screenshot displayed on screen | Viral employee post, eyewitness video, misinformation |
| **Audio/Video Clip** | Pre-recorded audio or video played | 911 call recording, security camera footage, voicemail |

For virtual TTX, all methods can be adapted: facilitator narration via video, slides via screen share, handouts via direct message or email, phone calls via breakout room.

---

## MSEL Development Process

Follow these steps in order:

### Step 1: Map Objectives to Events
For each exercise objective, identify a minimum of 2-3 events that will force players to demonstrate the capability being tested. Write these on a matrix:

```
Objective 1: Evaluate notification procedures
  -> Event: Initial incident report (tests initial notification chain)
  -> Event: Escalation requiring executive notification (tests escalation protocol)
  -> Event: External agency notification requirement (tests outbound notification)

Objective 2: Assess crisis communication protocols
  -> Event: Media inquiry (tests media response)
  -> Event: Employee communication need (tests internal comms)
  -> Event: Social media misinformation (tests monitoring and response)
```

### Step 2: Build the Timeline
Arrange events in chronological order within the scenario. Ensure:
- Events build logically (cause and effect)
- Information flow is realistic (players learn things in the order they would in real life)
- Pacing allows discussion between injects (for TTX, typically 3-5 min per inject discussion cycle)
- Escalation is gradual, not all-at-once

### Step 3: Write the Injects
For each event, write the complete inject content. See "Inject Writing Rules" below.

### Step 4: Write Expected Actions
For each inject, document what a well-performing team would do. Be specific enough for evaluators to assess but not so prescriptive that only one approach counts as "correct."

### Step 5: Add Contingency Injects
For each module, write 2-3 contingency injects:
- One accelerator (adds complexity if players are handling things too easily)
- One hint (provides missing information if players are stuck)
- One redirect (steers back to objectives if discussion wanders)

### Step 6: Assign Controllers
For each inject that requires active delivery (phone call, SimCell), assign a specific controller.

### Step 7: Dry Run
Walk through the MSEL end-to-end with the facilitator and controllers. Check for:
- Timing feasibility (does the math work for the exercise duration?)
- Logical consistency (do events make sense in sequence?)
- Coverage (does every objective get tested at least twice?)
- Realism (would this actually happen this way?)

---

## Inject Writing Rules

### Write What You Want Said
The inject content field should contain the EXACT text to be read, displayed, or delivered. Do not write "Controller tells player about the fire." Write the actual words: "We have a fire alarm activation on the 3rd floor, east wing. Building management is reporting visible smoke. No injuries reported at this time."

### Be Specific on Details
Include specific details that players need to make decisions:
- Numbers (how many, how much, how long)
- Locations (which building, which floor, which entrance)
- Time references within the scenario
- Names of simulated people and organizations
- Status of systems, resources, personnel

### Include Ambiguity Deliberately
Real incidents come with incomplete and conflicting information. Build this into injects:
- "Reports are unconfirmed at this time"
- Conflicting information from different sources
- Missing details that players must decide whether to wait for or act without
- Evolving situation where initial reports prove inaccurate

### Use Realistic Source Language
Write injects in the voice of whoever is supposedly delivering them:
- SOC analyst: technical, factual, abbreviation-heavy
- HR manager: concerned about employee welfare, policy-focused
- Law enforcement: procedural, command-oriented
- Media: probing, looking for quotes, deadline-driven
- Executive: strategic, bottom-line-focused
- Employee: emotional, potentially panicked, incomplete information

---

## Pacing and Escalation

### Standard TTX Pacing (2-hour exercise):

```
T+00:00 to T+00:10  -- Welcome, ground rules, scenario background (Facilitator)
T+00:10 to T+00:40  -- Module 1: Detection/Initial Response (3-4 injects, discussion)
T+00:40 to T+01:10  -- Module 2: Escalation/Assessment (3-4 injects, discussion)
T+01:10 to T+01:40  -- Module 3: Crisis Management/Decision (3-4 injects, discussion)
T+01:40 to T+01:50  -- Module 4: Recovery/Transition (1-2 injects, brief discussion)
T+01:50 to T+02:00  -- Hot Wash
```

### Escalation Pattern:

**Module 1 -- Low Complexity:**
Single-thread problem. Security team can handle with existing procedures. Tests basic notification, initial assessment, standard operating procedures.

**Module 2 -- Medium Complexity:**
Problem expands. Requires cross-functional coordination. Introduces competing priorities or resource constraints. Tests communication between departments, information sharing.

**Module 3 -- High Complexity:**
Problem is now a crisis. Requires executive decision-making. External stakeholders are involved (law enforcement, regulators, media, public). Introduces ethical dilemmas, legal considerations, or reputational risk. Tests leadership decision authority, crisis communications, coordination with external entities.

**Module 4 -- Transition:**
Situation is stabilizing. Shift from response to recovery. Tests transition protocols, long-term planning, lessons learned recognition.

---

## Contingency Injects

Pre-build these for every exercise:

### If players are too fast / too confident:
**Complication inject:** "You receive a call from [external entity] indicating that the situation is more complex than initially believed..." Add a second dimension to the problem that forces re-evaluation.

### If players are stuck:
**Information inject:** Provide a piece of information through a realistic channel that points toward a course of action without dictating it. E.g., "Your SOC analyst has found an additional data point that may be relevant..."

### If discussion goes off-topic:
**Redirect inject:** Introduce a time-sensitive event that forces attention back to the scenario. E.g., "You receive an urgent call from [stakeholder] who needs an answer in the next 10 minutes."

### If a key player role is absent:
**Role consolidation note:** Pre-identify which player absorbs the absent role's responsibilities. Note this in the MSEL as a controller action at T+00:00.

---

## SimCell Operations

For more complex TTX exercises, a Simulation Cell (SimCell) may be used. The SimCell consists of exercise staff who role-play external entities.

### Common SimCell Roles:
- Local law enforcement dispatch/commander
- Fire department
- EMS/hospital
- Media (TV reporter, print journalist)
- Regulatory agency (OSHA, FBI, SEC, state AG)
- Corporate headquarters (if site-level exercise)
- Vendor/supplier
- Employee family member
- Social media public

### SimCell Setup:
- SimCell operators sit at a separate table or in a separate room
- Each operator has a script (subset of MSEL relevant to their role)
- SimCell operators deliver injects via the designated method (phone, email, walk-up)
- SimCell operators improvise within pre-defined parameters if players ask questions not covered in the script

---

## Example MSEL Entries by Scenario Type

### Active Assailant -- Module 1 Example Injects:

**M1-001:** Facilitator narration. "It is Tuesday at 10:15 AM. Normal business operations are underway. Approximately 200 employees are on-site. You receive the following report from the front desk receptionist..."

**M1-002:** Phone call (SimCell). "This is Sarah at the front desk. I just heard what sounded like gunshots on the second floor. People are running. I can hear screaming. What do I do?"

**M1-003:** Expected Action. Players should initiate lockdown procedures, call 911, activate crisis management team notification.

**M1-004:** Slide display. Mock 911 call transcript excerpt showing what dispatch has been told by multiple callers.

### Cyber Ransomware -- Module 2 Example Injects:

**M2-001:** Facilitator narration. "It is now 4 hours since the initial detection. Your IT team has completed a preliminary scope assessment."

**M2-002:** Printed handout to CISO/IT lead. Preliminary incident report showing 40% of file servers encrypted, backup status unknown, 3 business-critical applications offline.

**M2-003:** Email (simulated). Ransom demand email with Bitcoin wallet address, 72-hour deadline, threat to publish stolen data.

**M2-004:** Expected Action. Players should assess ransom payment policy, engage legal counsel, evaluate backup recovery options, begin regulatory notification assessment, draft employee communication.

### Insider Threat -- Module 3 Example Injects:

**M3-001:** Facilitator narration. "Digital forensics has completed their initial analysis. The results are troubling."

**M3-002:** Printed handout to Security Director. Forensics summary showing subject has exfiltrated proprietary design files to personal cloud storage over 6-week period. Subject is a senior engineer with 8 years of tenure. Subject's badge shows recent after-hours access patterns.

**M3-003:** Phone call (SimCell as HR Director). "Legal just told me we need to decide today whether to confront the employee, place them on leave, or involve law enforcement. The employee is currently in the building. What is our plan?"

**M3-004:** Slide display. LinkedIn notification showing the subject has updated their profile and is connected to 3 people at a direct competitor.
