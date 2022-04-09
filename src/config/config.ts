import {stagingConfig} from './staging/config';
import {qaConfig} from './qa/config';
import {prodConfig} from './prod/config';
import {ParamHelper} from '../utils/paramHelper';

const defaultConfig = {
    applicationName: ParamHelper.getParamByDefault('NEWRELIC_HOST_DISPLAY_NAME', 'emissary'),
    // NewRelic
    newRelicName: ParamHelper.getParamByDefault('NEWRELIC_APPNAME_PREFIX', 'Local') +
        '-'  + ParamHelper.getParamByDefault('NEWRELIC_HOST_DISPLAY_NAME', 'emissary'),
    newRelicLicense: ParamHelper.getParamByDefault('NEWRELIC_APM_LICENSE', '098ae755e5a21b4b6ce652dc9a2a2bb8a474cb7e'),
    newRelicDistributedTracing: ParamHelper.getParamByDefault('NEW_RELIC_DISTRIBUTED_TRACING_ENABLED', true),
    // App
    port: ParamHelper.getParamByDefault('PORT', 80),
    isDevelopment: ParamHelper.getBooleanParamByDefault('IS_DEVELOPMENT', false),
    useWhitelist: false,
    isTempJwtToken: ParamHelper.getBooleanParamByDefault('IS_TMP_JWT', false),
    jsonLimit: '20mb',
    jsonContentTypes: ['application/json', 'application/ld+json', 'application/vnd.api+json'],
    textLimit: '20mb',
    textContentTypes: ['text/*'],
    jwtConfig: {
        aud: "eqs-product",
        iss: "puppeteer",
        sub: "jwt",
        exp: '12h',
        signature: "HS512",
        key: "secret"
    },
    defaultUserAgent: 'Unknown user agent',
    fileUploadDir: ParamHelper.getParamByDefault('FILE_UPLOAD_DIR', 'uploads'),
    emailUploadDir: ParamHelper.getParamByDefault('EMAIL_UPLOAD_DIR', 'uploads/email'),
    fileStorageUri: ParamHelper.getParam('FILE_STORAGE_URI'),
    allowedDomains: ParamHelper.getParamByDefault('ALLOWED_DOMAINS', '.eqs.com'), // ex. '*', '.eqs.intra', '.eqs.com, .eqs.net'
    // DB
    dialect: ParamHelper.getParamByDefault('DB_DIALECT', "mysql"),
    host: ParamHelper.getParam('DB_HOST'),
    database: ParamHelper.getParam('DB_NAME'),
    username: ParamHelper.getParam('DB_USER'),
    password: ParamHelper.getDefaultEnvParamFromFile('DB_PASS_FILE', 'DB_PASS'),
    // RabbitMQ
    amqpExchange: ParamHelper.getParamByDefault('AMQP_EXCHANGE', 'raven'),
    amqpUrl: ParamHelper.getParam('AMQP_URL'),
    retryTimeOut: 10000,
    maxRetry: 5,
    replyTo: 'amq.rabbitmq.reply-to',
    contentType: 'application/json',
    responseWaitTime: 6000,
    // Cookie (60) minutes to miliseconds
    cookiesMaxAge: 1000 * 60 * 60,
    sessionIdName: 'session_uuid',
    sessionName: 'connect.sid.local',
    authProcessCookieName: 'auth_process_uuid',
    cookieAccessTimeOutName: 'access_timeout',
    cookieTokenName: 'platform_access_token',
    cookiesDomain: ParamHelper.getParamByDefault('COOKIES_DOMAIN', '.eqs.dev'),
    cookiesSecure: ParamHelper.getBooleanParamByDefault('COOKIES_SECURE', true),
    cookiesHttpOnly: ParamHelper.getBooleanParamByDefault('COOKIES_HTTP_ONLY', true),
    cookiesSameSite: ParamHelper.getParamByDefault('COOKIES_SAME_SITE', 'Lax'),
    cookiesPath: ParamHelper.getParamByDefault('COOKIES_PATH', '/'),
    fileDownload: true,
    whitelist: [],
    unsignedWhitelist: [],
    secureErrorResponse: ParamHelper.getBooleanParamByDefault('SECURE_ERROR_RESPONSE', true),

    // Used endpoint URI
    crmApiUri: ParamHelper.getParam('CRM_API_URI'),
    legacyCockpitAPIURL: ParamHelper.getParam('LEGACY_COCKPIT_API_URL'),
    userServiceUrl: ParamHelper.getParam('USER_SERVICE_URI'),
    keycloakAdminUri: ParamHelper.getParam('KEYCLOAK_ADMIN_URI'),

    // parameters for logger
    timestamp: ParamHelper.getBooleanParamByDefault('TIMESTAMP_AVAILABLE', false),
    colorsOutput: ParamHelper.getBooleanParamByDefault('COLOR_LOGS', true),

    // blacklist for console log
    logAnonymousFields: ['password', 'cookies', 'access_token', 'old_password', 'new_password', 'confirm_password'],

    // Api keys
    apiKey: ParamHelper.getParamByDefault('STATIC_API_KEY', '2a137d7b0ca78c50dba1de4242576b8ac2af89de76eec5a42c9f'),

    // Trusted Proxy
    trustedProxy: ParamHelper.getParamByDefault('TRUSTED_PROXY', ['loopback', 'linklocal', 'uniquelocal']),
    // Redis
    redisUrl: ParamHelper.getParam('REDIS_URL'),
    storageSession: ParamHelper.getParamByDefault('STORAGE_SESSION', null),
    uris: {
        kcAdminUpdatePassword: '/eqsPlatform/users/update-password',
        kcAdminUsers: '/eqsPlatform/users',
        platformUser: '/users/{id}',
        platformUserPersonalInfo: '/users/me/information',
        company: '/companies/{id}?region=1&features=1',
    },
    // KeycloakMiddleware configuration
    keycloak: ParamHelper.getParamFromBase64(
        ParamHelper.getDefaultEnvParamFromFile('EMISSARY_KEYCLOAK_CONFIG_FILE', 'KEYCLOAK_CONFIG_BASE64')
    ),
    keycloakIdpHint: ParamHelper.getParamByDefault('KEYCLOAK_IDP_HINT', 'eqs-platform-realm'),
    sessionSecret: ParamHelper.getParamByDefault('SESSION_SECRET', '8db8fef6-5ad6-4941-ac2b-f5e0de8b61e1'),
    logoutUrl: '/sso/logout',
    logoutCallbackUrl: '/sso/logout-callback',
    msTeamsWebHookURL: ParamHelper.getParamByDefault('MS_TEAMS_WEBHOOK_URL', ''),
    environment: ParamHelper.getParamByDefault('SSO_AUTH_ENV', 'local-dev'),
    defaultRegion: 'de',
    defaultLanguage: 'en',
    featureSwissRegulatory: 'SWISS_REGULATORY',
    userManagerApiKey: ParamHelper.getParam('PLATFORM_USER_API_KEY'),
    keycloakApiKeys: ParamHelper.getParamFromBase64ByDefault(process.env.KEYCLOAK_ADMIN_API_BASE64_KEYS, ['123456']),
    // This the configuration for running cron job to calculate simple and advanced routing changes to start process
    proxyRouteHashCronInterval: ParamHelper.getParamByDefault('PROXY_ROUTE_HASH_CRON_INTERVAL', '0/15 * * * * *'),
};

function buildConfig(env: any) {
    let envConfig = {};

    switch (env.ENV_NAME) {
        case 'prod': {
            envConfig = prodConfig;
            break;
        }

        case 'qa': {
            envConfig = qaConfig;
            break;
        }

        case 'staging': {
            envConfig = stagingConfig;
            break;
        }

        default: {
            break;
        }
    }

    return {...defaultConfig, ...envConfig};
}

export const config = buildConfig(process.env);
