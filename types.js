class MatchedContestSheet {
  constructor() {
    /** @type {SpreadsheetApp.Sheet} */
    this.sheet;
    /** @type {number} */
    this.contestId;
  }
}

class EditEvent {
  constructor() {
  /** @type {ScriptApp.AuthMode} */
  this.authMode;
  /** @type {SpreadsheetApp.Range} */
  this.range;
  /** @type {SpreadsheetApp.Spreadsheet} */
  this.source;
  /** @type {User} */
  this.user;
  /** @type {String} */
  this.value;
  }
}

class Contest {
  constructor() {
    /** @type {string} */
    this.formal_name;
    /** @type {number} */
    this.penalty_time;
    /** @type {Date|string} */
    this.start_time;
    /** @type {Date|string} */
    this.end_time;
    /** @type {string} */
    this.duration;
    /** @type {string} */
    this.scoreboard_freeze_duration;
    /** @type {string} */
    this.id;
    /** @type {string} */
    this.external_id;
    /** @type {string} */
    this.name;
    /** @type {string} */
    this.shortname;
  }
}

class Problem {
  constructor() {
    /** @type {number} */
    this.ordinal;
    /** @type {string} */
    this.id;
    /** @type {string} */
    this.short_name;
    /** @type {string} */
    this.label;
    /** @type {number} */
    this.time_limit;
    /** @type {string} */
    this.name;
    /** @type {string} */
    this.rgb;
    /** @type {string} */
    this.color;
  }
}

class Scoreboard {
  constructor() {
    /** @type {string} */
    this.event_id;
    /** @type {string} */
    this.time;
    /** @type {string} */
    this.contest_time;
    this.state = {
      /** @type {Date|string} */
      started,
      /** @type {Date|string} */
      ended,
      /** @type {Date|string} */
      frozen,
      /** @type {Date|string} */
      thawed,
      /** @type {Date|string} */
      finalized,
      /** @type {Date|string} */
      end_of_updates,
    };
    /** @type {Array<ScoreboardRow>} */
    this.rows;
  }
}

class ScoreboardRow {
  constructor() {
    /** @type {number} */
    this.rank;
    /** @type {string} */
    this.team_id;
    this.score = {
      /** @type {number} */
      num_solved,
      /** @type {number} */
      total_time,
    };
    /** @type {Array<ScoreboardRowProblem>} */
    this.problems;
  }
}

class ScoreboardRowProblem {
  constructor() {
    /** @type {string} */
    this.label;
    /** @type {string} */
    this.problem_id;
    /** @type {number} */
    this.num_judged;
    /** @type {number} */
    this.num_pending;
    /** @type {boolean} */
    this.solved;
    /** @type {number} */
    this.time;
    /** @type {boolean} */
    this.first_to_solve;
  }
}

class Team {
  constructor() {
    /** @type {Array<string>} */
    this.group_ids;
    /** @type {string} */
    this.affiliation;
    /** @type {string} */
    this.id;
    /** @type {string} */
    this.icpc_id;
    /** @type {string} */
    this.name;
    /** @type {string} */
    this.display_name;
    /** @type {string} */
    this.organization_id;
    this.members;
  }
}
