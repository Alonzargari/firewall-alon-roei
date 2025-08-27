export const validIPs = [
    '1.1.1.1',
    '8.8.8.8',
    '192.168.0.1',
    '127.0.0.1',
    '0.0.0.0',
    '255.255.255.255',
];

export const invalidIPs = [
    '999.999.999.999',
    '2001:db8::1',
    'abc.def.ghi.jkl',
    '4.4.4',
    123,
    true,
    null
];