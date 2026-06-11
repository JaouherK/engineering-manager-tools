import { Injectable } from '@nestjs/common';
import { Gitlab } from '@gitbeaker/node';

// eslint-disable-next-line @typescript-eslint/no-var-requires
@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    const gitlab = new Gitlab({
      token: process.env.GITLAB_TOKEN,
      rejectUnauthorized: false,
      requestTimeout: 60000,
      host: 'https://gitlab.eqs.tools',
    });

    return await gitlab.MergeRequests.changes(304, 115);

    // return 'Hello World!';
  }
}
