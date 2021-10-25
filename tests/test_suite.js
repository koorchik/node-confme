const test = require('ava');
const confme = require('../src/confme');

test('test default config', t => {
    const config = confme(`${__dirname}/simple/basic.json`);

    t.is(config.key, 'value');
});

test('test environment variable interpolation', t => {
    const randomPositive = 1286124;

    process.env.VALUE = randomPositive;
    const config = confme(
        `${__dirname}/inherited/basic.json`,
        `${__dirname}/inherited/config-schema.json`
    );

    t.is(config.key, randomPositive);
});

test('test schema fail', t => {
    const randomNegative = -1263;

    process.env.VALUE = randomNegative;
    try {
        confme(
            `${__dirname}/inherited/basic.json`,
            `${__dirname}/inherited/config-schema.json`
        );

        t.fail('LIVR validation should have failed');
    } catch (ex) {
        t.pass();
    }
});


test('bad configuration', t => {
    try {
        confme(`${__dirname}/badconfig/basic.json`);

        t.fail('should have been unable to parse bad configuration file');
    } catch (ex) {
        t.pass();
    }
});

test('test missing variable', t => {
    try {
        confme(`${__dirname}/error/basic.json`);

        t.fail('should have received an exception for missing env var');
    } catch (ex) {
        t.pass();
    }
});

