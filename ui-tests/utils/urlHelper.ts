export function getParallelBaseUrl(url: string): string {
    const index = process.env.TEST_PARALLEL_INDEX || '0';
    const baseUrl = process.env[`BASE_USER_${index}`];
    if (!baseUrl) {
        throw new Error(`BASE_USER_${index} is not defined in environment variables.`);
    }
    return `${baseUrl}${url}`;
}