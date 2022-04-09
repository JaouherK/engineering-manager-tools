// import { ParamHelper } from '../common/helpers/paramHelper';
//
// const defaultConfig = {
//   // App
//   port: ParamHelper.getParamOrDefault('PORT', 80),
//   isDevelopment: ParamHelper.getBooleanParamByDefault('IS_DEVELOPMENT', false),
//   isTempJwtToken: ParamHelper.getBooleanParamByDefault('IS_TMP_JWT', false),
//   jsonLimit: '20mb',
//   jsonContentTypes: [
//     'application/json',
//     'application/ld+json',
//     'application/vnd.api+json',
//   ],
//   textLimit: '20mb',
//   textContentTypes: ['text/*'],
//   jwtConfig: {
//     aud: 'eqs-product',
//     iss: 'puppeteer',
//     sub: 'jwt',
//     exp: '12h',
//     signature: 'HS512',
//     key: 'secret',
//   },
//   defaultUserAgent: 'Unknown user agent',
//   allowedDomains: ParamHelper.getParamOrDefault('ALLOWED_DOMAINS', 'localhost'), // ex. '*',
//   // DB
//   db_dialect: ParamHelper.getParamOrDefault('DB_DIALECT', 'mysql'),
//   db_host: ParamHelper.getParam('DB_HOST'),
//   db_name: ParamHelper.getParam('DB_NAME'),
//   db_user: ParamHelper.getParam('DB_USER'),
//   db_pass: ParamHelper.getParam('DB_PASS'),
//
//   cookiesMaxAge: 1000 * 60 * 60,
//   sessionIdName: 'session_uuid',
//   sessionName: 'connect.sid.local',
//
//   // parameters for logger
//   timestamp: ParamHelper.getBooleanParamByDefault('TIMESTAMP_AVAILABLE', false),
//   colorsOutput: ParamHelper.getBooleanParamByDefault('COLOR_LOGS', true),
// };
//
// export const config = defaultConfig;
