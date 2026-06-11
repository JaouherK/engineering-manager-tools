import { Gitlab, MergeRequestDiscussions, MergeRequests, Users } from "@gitbeaker/node";

export class GitlabIntegrations {
  source: string;
  token: string;
  userID: number;

  constructor(source, token, userID, startDate, endDate) {
    this.token = token;
    this.source = source;
    this.userID = userID;
    if (!source) {
      throw Error('[Contributions] Please provide the Gitlab URL');
    }
    if (!token) {
      throw Error('[Contributions] Please provide a GITLAB_TOKEN');
    }
    if (!userID || userID < 0) {
      throw Error(
        '[Contributions] Please set a valid User Id to create the reports',
      );
    }
  }

  async getContributions() {
    const [profile, mergedMR, reviews] = await Promise.all([
      this.getUserProfile(),
      this.fetchMRCountPerMonth(),
      this.fetchMRComments(),
    ]);

    return {
      profile,
      mergedMR,
      reviews,
    };
  }

  private async fetchMRCountPerMonth() {
    const startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000); // One year ago
    const endDate = new Date();

    const users = new Users({
      host: this.source,
      token: this.token,
      rejectUnauthorized: false,
      requestTimeout: 60000,
    });

    const events = await users.events(this.userID, {
      after: startDate.toISOString(),
      before: endDate.toISOString(),
      action: 'merged',
      targetType: 'merge_request',
    });

    console.log(events);

    const mrMap = new Map<string, { count: number; titles: string[] }>();

    for (const event of events) {
      const createdAt = new Date(event.created_at);


      const yearMonthKey = createdAt.toLocaleDateString('en-DE', {
        year: 'numeric',
        month: 'long',
      });

      if (!mrMap.has(yearMonthKey)) {
        mrMap.set(yearMonthKey, { count: 0, titles: [] });
      }

      const mrTitle = event.target_title;
      mrMap.get(yearMonthKey).titles.push(mrTitle);
      mrMap.get(yearMonthKey).count++;
    }

    return Object.fromEntries(mrMap);
  }

  private getUserProfile() {
    const users = new Users({
      host: this.source,
      token: this.token,
      rejectUnauthorized: false,
      requestTimeout: 60000,
    });

    return users.show(this.userID);
  }

  private async fetchMRComments() {
    const startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000); // One year ago
    const endDate = new Date();

    const users = new Users({
      host: this.source,
      token: this.token,
      rejectUnauthorized: false,
      requestTimeout: 60000,
    });

    const notes = {};
    const comments = {};
    const events = await users.events(this.userID, {
      after: startDate.toISOString(),
      before: endDate.toISOString(),
      sort: 'desc',
      action: 'commented',
    });

    for (const event of events as any) {
      const date = new Date(event.created_at);
      const yearMonth = date.toLocaleDateString('en-DE', {
        year: 'numeric',
        month: 'long',
      });
      const item = {
        title: event.target_title,
        body: event.note?.body,
        date: event.note?.created_at,
      };
      if (event.target_type === 'Note') {
        if (!notes[yearMonth]) notes[yearMonth] = [];
        notes[yearMonth].push(item);
      } else if (event.target_type === 'DiffNote') {
        if (!comments[yearMonth]) comments[yearMonth] = [];
        comments[yearMonth].push(item);
      }
    }
    return {
      total: events.length,
      notes,
      comments,
    };
  }

  getGitlabMRChanges() {
    const gitlab = new Gitlab({
      token: this.token,
      host: 'https://gitlab.eqs.tools/api/v4',
    });

    gitlab.MergeRequests.changes('466', 413)
      .then(({ changes }) => {
        changes.forEach((file) => {
          console.log(`Changes for file: ${file.new_path}`);

          console.log(file.diff);
          // file.diff.forEach((diff) => {
          //     console.log(`Line number: ${diff.new_line}`);
          //     console.log(`Change type: ${diff.diff_type}`);
          //     console.log(`Content: ${diff.content}`);
          // });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

}
