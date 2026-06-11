import axios from 'axios';

export class JiraHelper {
  source: string;
  token: string;
  userID: string;

  // todo: get rid of pre-setters
  constructor(
    source = 'https://jira.eqs.com',
    token = '',
    userID = 'jkharrat',
  ) {
    this.token = token;
    this.source = source;
    this.userID = userID;
    if (!source) {
      throw Error('[Issues] Please provide the JIRA URL');
    }
    if (!token) {
      throw Error('[Issues] Please provide a JIRA PERSONAL TOKEN');
    }
    if (!userID) {
      throw Error('[Issues] Please set a valid User Id to create the report');
    }
  }

  async getJiraIssues() {
    const [profile, closedIssues, createdIssues] = await Promise.all([
      this.getUserProfile(),
      this.getClosedIssuesByMonth(),
      this.getCreatedIssuesByPerson(),
    ]);

    return {
      profile,
      closedIssues,
      createdIssues,
    };
  }

  async getClosedIssuesByMonth() {
    const jql = `status in (Resolved, Closed, Done, Live) AND assignee = ${this.userID} AND status changed to (Done, Live) AFTER startOfMonth(-12) ORDER BY resolutiondate ASC`;

    const response = await axios.get(this.source + '/rest/api/2/search', {
      params: {
        jql,
        maxResults: 1000, // maximum number of results to return per request
        fields:
          'resolutiondate, key, summary, resolution, priority, creator, issuetype, description, timeestimate, created, customfield_10006', // only retrieve the resolutiondate field to reduce the size of the response
      },
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });

    const issues = response.data.issues;

    // Define an object to store the results by month
    const resultsByMonth = {};

    // Sort the issues by resolution date
    issues.sort((a, b) => {
      return (
        new Date(b.fields.resolutiondate).getTime() -
        new Date(a.fields.resolutiondate).getTime()
      );
    });

    // Loop through the issues returned by the JQL query
    issues.forEach((issue) => {
      const resolutionDate = new Date(issue.fields.resolutiondate);
      const monthKey = resolutionDate.toLocaleDateString('en-DE', {
        year: 'numeric',
        month: 'long',
      });

      // If this is the first issue for this month, create an object to store the data
      if (!resultsByMonth[monthKey]) {
        resultsByMonth[monthKey] = {
          count: 0,
          issues: [],
        };
      }

      // Increment the count for this month
      resultsByMonth[monthKey].count++;

      // Add this issue to the array for this month
      resultsByMonth[monthKey].issues.push({
        ...issue,
      });
    });

    return resultsByMonth;
  }

  async getCreatedIssuesByPerson() {
    const jql = `creator = ${this.userID} AND created >= startOfMonth(-12) ORDER BY created ASC`;

    const response = await axios.get(this.source + '/rest/api/2/search', {
      params: {
        jql,
        maxResults: 1000, // maximum number of results to return per request
        fields:
          'created, key, summary, priority, assignee, issuetype, description, timeestimate, customfield_10006', // only retrieve the created date field to reduce the size of the response
      },
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });

    const issues = response.data.issues;

    // Define an object to store the results by month
    const resultsByMonth = {};

    // Loop through the issues returned by the JQL query
    issues.forEach((issue) => {
      const createdDate = new Date(issue.fields.created);
      const monthKey = createdDate.toLocaleDateString('en-DE', {
        year: 'numeric',
        month: 'long',
      });

      // If this is the first issue for this month, create an object to store the data
      if (!resultsByMonth[monthKey]) {
        resultsByMonth[monthKey] = {
          count: 0,
          issues: [],
        };
      }

      // Increment the count for this month
      resultsByMonth[monthKey].count++;

      // Add this issue to the array for this month
      resultsByMonth[monthKey].issues.push({
        ...issue,
      });
    });

    return resultsByMonth;
  }


  private async getUserProfile() {
    const result = await axios.get(this.source + '/rest/api/2/user', {
      params: {
        username: this.userID,
      },
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });

    return {
      ...result.data,
      url: `${this.source}/secure/ViewProfile.jspa?name=${this.userID}`,
    };
  }
}
