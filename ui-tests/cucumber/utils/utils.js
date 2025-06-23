export function camelCaseTransformer(input) {
    return input
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]+/g, '')
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
        )
        .replace(/\s+/g, '');
}