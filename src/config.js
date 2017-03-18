/**
 * Created by guanzhenxing on 2017-03-09.
 */

const config = {
    host: {
        local: {
            rule: 'localhost',
            target: 'nd-project-admin.dev.web.nd',
            dispatch: 'nd-project.dev.web.nd',
            version: 'v0.1',
        },
        dev: {
            rule: 'nd-project-admin.dev.web.nd',
            target: 'nd-project-admin.dev.web.nd',
            dispatch: 'nd-project.dev.web.nd',
            version: 'v0.1',
        },
        qa: {
            rule: '',
            target: '',
            dispatch: '',
            version: '',
        },
        beta: {
            rule: '',
            target: '',
            dispatch: '',
            version: '',
        },
        prod: {
            rule: '',
            target: '',
            dispatch: '',
            version: '',
        }
    },
    uc: {
        local: {
            rule: 'localhost',
            url: 'https://ucbetapi.101.com/v0.93',
            host: 'ucbetapi.101.com',
        },
        dev: {
            rule: 'nd-project-admin.dev.web.nd',
            url: 'https://ucbetapi.101.com/v0.93',
            host: 'ucbetapi.101.com',
        },
        qa: {
            rule: '',
            url: 'https://ucbetapi.101.com/v0.93',
            host: 'ucbetapi.101.com',
        },
        beta: {
            rule: '',
            url: 'https://ucbetapi.101.com/v0.93',
            host: 'ucbetapi.101.com',
        },
        prod: {
            rule: '',
            url: 'https://aqapi.101.com/v0.93',
            host: 'aqapi.101.com',
        }
    }
};

module.exports = config;

