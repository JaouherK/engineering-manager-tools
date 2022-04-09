export class ParamHelper {
  static getParamOrDefault(param: string, defaultValue: any): any {
    const value = process.env[param];
    return typeof value !== 'undefined' ? value : defaultValue;
  }

  static getParam(param: string): any {
    const value = process.env[param];
    if (typeof value === 'undefined') {
      throw new Error(`Please set the param ${param} value as environment`);
    }
    return value;
  }

  static getParamFromBase64(value: string): any {
    const buff = Buffer.from(value, 'base64');
    return JSON.parse(buff.toString('ascii'));
  }

  static getBooleanParamByDefault(
    param: string,
    defaultValue: boolean,
  ): boolean {
    const value = process.env[param];
    return typeof value === 'undefined'
      ? defaultValue
      : [0, '0', false, 'false', 'False'].indexOf(value) === -1;
  }
}
