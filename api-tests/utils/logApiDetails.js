import logger from '../utils/logger.js';

export function logApiDetails(logLevel, request, response) {
    const log = {
        Method: request.method,
        Url: request.url,
        Status: response.status,
        RequestHeaders: request.headers,
        RequestBody: request.body,
        ResponseHeaders: response.headers,
        ResponseBody: response.body,
    };
    const serialized = JSON.stringify(log, null, 2);
    logger[logLevel]?.(serialized);
}
