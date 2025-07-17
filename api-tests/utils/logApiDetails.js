import logger from '../utils/logger.js';

export function logApiDetails(logLevel, request, response) {
    const { method, url, headers, body } = request;
    const { status, headers: responseHeaders, body: responseBody } = response;

    if(logLevel === 'info') {
        logger.info(
            JSON.stringify(
                {
                    Method: method,
                    Url: url,
                    Status: status,
                    RequestHeaders: headers,
                    RequestBody: body,
                    ResponseHeaders: responseHeaders,
                    ResponseBody: responseBody,
                },
                null,
                2
            )
        );
    } else if (logLevel === 'error') {
        logger.error(
            JSON.stringify(
                {
                    Method: method,
                    Url: url,
                    Status: status,
                    RequestHeaders: headers,
                    RequestBody: body,
                    ResponseHeaders: responseHeaders,
                    ResponseBody: responseBody,
                },
                null,
                2
            )
        );
    }
}
