require('dotenv-defaults').config();

const fs = require('fs');
// eslint-disable-next-line more/no-numeric-endings-for-variables
const JSON5 = require('json5');

function confme(configPath, livrSchemaPath) {
    // eslint-disable-next-line no-sync
    const template = fs.readFileSync(configPath).toString();
    const configStr = replace(template, process.env);

    let config = {};

    try {
        config = JSON5.parse(configStr);
    } catch (error) {
        console.error('CANNOT PARSE JSON5:', configStr);
        throw error;
    }

    if (livrSchemaPath) {
        config = validateConfig(config, livrSchemaPath);
    }

    return config;
}

function validateConfig(config, livrSchemaPath) {
    const LIVR = require('livr');
    const livrExtraRules = require('livr-extra-rules');

    // eslint-disable-next-line no-sync
    const livrRules = JSON5.parse(fs.readFileSync(livrSchemaPath).toString());
    const validator = new LIVR.Validator(livrRules, true);

    validator.registerRules(livrExtraRules);

    const validConfig = validator.validate(config);

    if (!validConfig) {
        const error = {
            FAILED_CONFIG : config,
            ERRORS        : validator.getErrors()
        };

        // eslint-disable-next-line no-magic-numbers
        throw new Error(JSON.stringify(error, null, 2));
    }

    return validConfig;
}

function replace(template, vars) {
    return template.replace(/\{\{\s*(.+?)\s*\}\}/g, (match, p1) => {
        if (vars.hasOwnProperty(p1)) {
            return vars[p1];
        }

        throw new Error(`Variable "${p1}" not set!`);
    });
}

module.exports = confme;
