class Database {
  constructor() {
    this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  }

  /**
   * @return {MatchedContestSheet[]} Matched contest and corresponding contest id
   */
  getMatchedContestSheets() {
    const sheets = this.spreadsheet.getSheets();
    const contests = DOMjudgeApp.getContests();

    return sheets.map(sheet => {
      const sheetName = sheet.getName();
      const matchedContest = contests.find(contest => contest.shortname == sheetName);
      if (!matchedContest) return;

      const contestId = matchedContest.id;

      return { sheet, contestId };
    }).filter(sheet => !!sheet);
  }

  /**
   * @param {SpreadsheetApp.Sheet} sheet
   * 
   * @returns {boolean}
   */
  static isFullfilled(sheet) {
    const lastColumn = sheet.getLastColumn();
    const lastRow = sheet.getLastRow();
    try {
      const fillableRange = sheet.getRange(
        DATA_START_ROW,
        DATA_START_COLUMN,
        lastRow - DATA_START_ROW + 1,
        lastColumn - DATA_START_COLUMN + 1
      );

      return fillableRange.getDisplayValues().every(row => row.every(cell => cell != "" && parseInt(cell.replace(/[^\d]/g, "")) > 0));
    } catch(e) {
      return false;
    }
  }

  /**
   * @param {SpreadsheetApp.Sheet} sheet
   * 
   * @return {string[]}
   */
  static getQuestionTitles(sheet) {
    const lastColumn = sheet.getLastColumn();
    const titles = sheet.getRange(
      DATA_START_ROW - 1, 
      DATA_START_COLUMN,
      1, 
      lastColumn - DATA_START_COLUMN + 1
    ).getDisplayValues().shift();

    return titles;
  }

  /**
   * @param {SpreadsheetApp.Sheet} sheet
   * @param {Problem[]} problems
   * 
   * @return {string[]}
   */
  static getExistingProblemTitles(sheet) {
    const lastColumn = sheet.getLastColumn();
    const titleRange = sheet.getRange(DATA_START_ROW - 1, DATA_START_COLUMN, 1, lastColumn - DATA_START_COLUMN + 1)
    const titles = titleRange.getDisplayValues().shift();

    return titles;
  }

  /**
   * @param {SpreadsheetApp.Sheet} sheet
   * @param {Problem[]} problems
   * 
   * @returns {void}
   */
  static setProblems(sheet, problems) {
    for (let index = 0; index < problems.length; index++) {
      const lastColumn = sheet.getMaxColumns();
      if (DATA_START_COLUMN + index > lastColumn)
        sheet.insertColumnAfter(DATA_START_COLUMN + index - 1);

      const cell = sheet.getRange(
        DATA_START_ROW - 1,
        DATA_START_COLUMN + index
      );
      cell.setValue(problems[index].short_name);
    }
  }
}
