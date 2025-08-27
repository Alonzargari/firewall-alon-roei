export const validRequests = [
    { values: ['1.1.1.1'], mode: 'blacklist' },
    { values: ['8.8.8.8', '8.8.4.4'], mode: 'whitelist' },
    { values: ['https://example.com'], mode: 'blacklist' }
];

export const invalidModeRequests = [
    { values: ['1.1.1.1'], mode: '' },
    { values: ['1.1.1.1'], mode: 'block' },
    { values: ['1.1.1.1'], mode: 123 }
];

export const invalidValuesRequests = [
    { values: [], mode: 'blacklist' },
    { values: 'not-an-array', mode: 'whitelist' },
    { values: null, mode: 'blacklist' },
    { mode: 'blacklist' } // missing values
];

export const missingModeRequests = [
    { values: ['1.1.1.1'] },
    { values: ['8.8.8.8', '8.8.4.4'] }
];