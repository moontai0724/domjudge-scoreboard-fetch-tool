# domjudge-scoreboard-fetch-tool

A tool to fetch domjudge scoreboard to spreadsheet for further usage.

## What does this tool do?

This tool will fetch scoreboard data from DOMjudge then fill into sheets.

## How to use?

### 1. Initialize spreadsheet

Create a spreadsheet (or open an existing spreadsheet), then open apps script in `extension > Apps Script`.

### 2. Put code into Apps Script

After opened Apps Script editor, you can now put codes into editor.

Or you can use [clasp](https://developers.google.com/apps-script/guides/clasp), which is a CLI tool for interact with Apps Script.

### 3. Create target sheet

#### Sheet name

In order to make this script work, it requires sheet(s) named with the shortname of the contest.

For example, this is a table you will see at `/jury/contests` in DOMjudge:

| CID | shortname           | name                                    | active | start | end   | process balloons? | public? | teams | problems |
| --- | ------------------- | --------------------------------------- | ------ | ----- | ----- | ----------------- | ------- | ----- | -------- |
| 10  | Public_Example_0323 | Contest Example for contest on March 23 | 12:38  | 15:00 | 12:00 | yes               | yes     | 120   | 6        |
| 11  | 0323_Day_Formal     | Exam at Morning on March 23             | 00:00  | 08:00 | 12:00 | yes               | no      | 100   | 8        |

Then the name of target sheet should match one of any `shortname`.

#### Sheet content

The sheet content should contains an identifier column of the team id.

For example, there will have a sheet performs this:

| name | team_id | (empty) |
| ---- | ------- | ------- |
| t1   | 1       |         |
| t3   | 3       |         |
| s1   | 5       |         |
| s6   | 10      |         |

After code execution, it will become this:

| name | team_id | A   | B   | C   | D   |
| ---- | ------- | --- | --- | --- | --- |
| t1   | 1       | ✓6  | ✓1  | ✓3  | ✓1  |
| t3   | 3       | ✓2  | ✓1  | ✓1  | ✓2  |
| s1   | 5       | ⨯3  | ⨯11 | ⨯0  | ✓1  |
| s6   | 10      | ✓2  | ✓4  | ✓14 | ✓2  |

### 4. Configure variables

In `defines.js` and `DOMjudgeApp.js` files, there are some variables needs to be configured.

There are descriptions above every annotation of variable, please read it.

For example, variables in `defines.js` for above situation, it will be configured like this:

| name              | value |
| ----------------- | ----- |
| DATA_START_ROW    | 2     |
| DATA_START_COLUMN | 3     |
| ID_COLUMN         | 2     |
| ICON_PASSED       | ✓     |
| ICON_NOT_PASSED   | ⨯     |

### 5. Execute

Execute `updateStatus()` function in `main.js`!
