export const validPorts = [
    0,
    65535,
    840,
    1023,
    1,

];

export const invalidPorts = [
    '80',
    4.4,
    55.55,
    'a',
    true,
    null
];

export const outOfRangePorts=[
    65536,
    -1,
    100000,
    -20
]