// Please fill in domjudge URL, for example: http://123.123.123.123/dj
const URL_BASE = "";
// Basic Auth token will be a base64 string.
const basicAuthToken = "BASIC_AUTH_TOKEN_HERE";

const FETCH_HEADER_GET = {
  "method": "GET",
  "headers": {
    "Authorization": "Basic " + basicAuthToken,
  },
};

class DOMjudgeApp {
  /**
   * Fetch all contests from server.
   * 
   * @return {Array<Contest>} Array of all contests
   */
  static getContests() {
    const uri = "/api/v4/contests";
    /** @type {string} raw responsed body */
    const responsedText = UrlFetchApp.fetch(URL_BASE + uri, FETCH_HEADER_GET).getContentText();
    return JSON.parse(responsedText);
  }

  /**
   * Fetch all problems in a contest.
   * 
   * @params {number} cid Contest ID
   * 
   * @return {Array<Problem>} Array of all problems
   */
  static getProblems(cid) {
    const uri = `/api/v4/contests/${cid}/problems`;
    /** @type {string} raw responsed body */
    const responsedText = UrlFetchApp.fetch(URL_BASE + uri, FETCH_HEADER_GET).getContentText();
    return JSON.parse(responsedText);
  }

  /**
   * Fetch whole scoreboard of a contest.
   * 
   * @params {number} cid Contest ID
   * 
   * @return {Scoreboard} Whole scoreboard
   */
  static getScoreboard(cid) {
    const uri = `/api/v4/contests/${cid}/scoreboard`;
    /** @type {string} raw responsed body */
    const responsedText = UrlFetchApp.fetch(URL_BASE + uri, FETCH_HEADER_GET).getContentText();
    return JSON.parse(responsedText);
  }

  /**
   * Fetch all teams in a contest.
   * 
   * @params {number} cid Contest ID
   * 
   * @return {Array<Team>} Teams
   */
  static getTeams(cid) {
    const uri = `/api/v4/contests/${cid}/teams`;
    /** @type {string} raw responsed body */
    const responsedText = UrlFetchApp.fetch(URL_BASE + uri, FETCH_HEADER_GET).getContentText();
    return JSON.parse(responsedText);
  }
}