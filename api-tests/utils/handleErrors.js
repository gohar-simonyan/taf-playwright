import logger from '../utils/logger.js';

export function handleAxiosError(error) {
    if (error.response) {
        logger.error({
            statusCode: error.response.status,
            url: error.response.config.url,
            method: error.response.config.method.toUpperCase(),
            dataSent: error.response.config.data,
            responseData: error.response.data,
            headers: error.response.headers,
        });
    } else if (error.request) {
        logger.error({
            status: 'No response received from server.',
            url: error.response.config.url,
            method: error.response.config.method.toUpperCase(),
            dataSent: error.response.config.data,
        });
    } else {
        logger.error({
            error: error.message  || 'Unknown error',
            config: error.config || 'No config available',
        });
    }
}