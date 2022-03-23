function updateStatus() {
  const db = new Database();
  const contestSheets = db.getMatchedContestSheets();
  contestSheets.forEach(contestSheet => updateSheet(contestSheet.sheet, contestSheet.contestId));
}

/**
 * @param {SpreadsheetApp.Sheet} sheet
 * @param {number} contestId
 */
function updateSheet(sheet, contestId) {
  const sheetName = sheet.getName();
  Logger.log(`🔎 Checking sheet: ${sheetName}`);
  if (Database.isFullfilled(sheet)) {
    Logger.log(`🏆 Sheet "${sheetName}" is fullfilled, skip.`);
    return;
  }

  Logger.log(`→ Setting problem names in sheet "${sheetName}"`);
  const problems = DOMjudgeApp.getProblems(contestId);
  Database.setProblems(sheet, problems);

  Logger.log(`→ Fetching scoreboard of contest ${contestId} for sheet ${sheetName}`);
  const scoreboard = DOMjudgeApp.getScoreboard(contestId);

  Logger.log(`→ Updating progresses in sheet "${sheetName}"`);
  const lastRow = sheet.getLastRow();
  Logger.log(lastRow);
  for (let rowIndex = DATA_START_ROW; rowIndex <= lastRow; rowIndex++) {
    const studentId = sheet.getRange(rowIndex, ID_COLUMN).getValue();

    let record = scoreboard.rows.find(team => team.team_id == studentId);
    if (!record) {
      if (debug) Logger.log(`Debug:  Score of team not found, fetching team info.`);
      const teams = DOMjudgeApp.getTeams(contestId);
      const realTeam = teams.find(team => team.name == studentId);
      if (!realTeam) {
        if (debug) Logger.log(`Debug: Team not found.`);
        return;
      }
      if (debug) Logger.log(`Debug: Team found: ${JSON.stringify(realTeam)}`);
      record = scoreboard.rows.find(team => team.team_id == realTeam.id);
    }
    if (debug) Logger.log(`Debug:  index=${rowIndex},sudentId=${studentId},record=${JSON.stringify(record)}`);
    if (!record) continue;

    for (let problemIndex = 0; problemIndex < problems.length; problemIndex++) {
      const columnIndex = DATA_START_COLUMN + problemIndex;
      const cell = sheet.getRange(rowIndex, columnIndex);
      const isPassed = record.problems[problemIndex].solved;
      cell.setValue((isPassed ? ICON_PASSED : ICON_NOT_PASSED) + record.problems[problemIndex].num_judged);
    }
  }
  Logger.log(`✅ Updated sheet: ${sheetName}`);
}
