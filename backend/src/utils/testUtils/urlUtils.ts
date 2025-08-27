export const validURLs = [
    'https://example.com',
    'http://example.org',
    'https://sub.domain.com/path?query=123',
    'ftp://ftp.example.com',
    'https://example.co.uk',
    'www.example.com',
];

export const invalidURLs = [
    'http://example..com',
    'https:///example.com',
    12345,
    null,
    true,
    {},
    'example .com'
]