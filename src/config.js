/**
 * Created by guanzhenxing on 2017-03-09.
 */

const config = {
    host: {
        local: {
            rule: 'localhost',
            target: '',
            dispatch: '',
            version: 'v0.1',
        },
        dev: {
            rule: '',
            target: '',
            dispatch: '',
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
            rule: '',
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
    },
    cs:{
        local: {
            rule: 'localhost',
            url: 'http://betacs.101.com',
            host: 'betacs.101.com',
        },
        dev: {
            rule: 'nd-project-admin.dev.web.nd',
            url: 'http://betacs.101.com',
            host: 'betacs.101.com',
        },
        qa: {
            rule: '',
            url: 'http://betacs.101.com',
            host: 'betacs.101.com',
        },
        beta: {
            rule: '',
            url: 'http://betacs.101.com',
            host: 'betacs.101.com',
        },
        prod: {
            rule: '',
            url: 'http://cs.101.com',
            host: 'cs.101.com',
        }
    }

};

module.exports = config;

