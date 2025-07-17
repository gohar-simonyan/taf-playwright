export function isEmpty(launches) {
    return launches.data
        ? launches.data.page.totalElements === 0
        : launches.page.totalElements === 0;
}
