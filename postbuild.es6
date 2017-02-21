/* eslint-env node */
import request from 'superagent';
import { execSync } from 'child_process';

const argv = require('yargs').argv;

const pkg = require('./package.json');

const DEV = !!argv.dev;

const release = argv.release || `${pkg.version}-${execSync('git rev-parse HEAD').toString().replace(/\r?\n|\r/g, "")}-${new Date().getSeconds()}${DEV ? '-dev' : ''}`;

console.log(`Building release ${release}`);

const command = `react-native bundle  --dev ${DEV}  --platform android --entry-file index.android.js --bundle-output main.jsbundle --sourcemap-output main.jsbundle.map`;

console.log(`Runnong command ${command}...`);
const rnbuild = execSync(command);

console.log('Uploading bundle and sourcemap to Sentry...');

const token = argv.sentryToken || process.env.SENTRY_TOKEN;

request
    .post('https://sentry.io/api/0/projects/eslcc/euroschool-app/releases/')
    .type('application/json')
    .set('Authorization', 'Bearer ' + token)
    .send({ version: release.toString() })
    .end((err, res) => {
        if(err) throw err;
        request
            .post(`https://sentry.io/api/0/projects/eslcc/euroschool-app/releases/${release}/files/`)
            .type('application/json')
            .set('Authorization', 'Bearer ' + token)
            .attach('file', 'main.jsbundle')
            .field('name', DEV ? '/index.android.bundle?platform=android&dev=true&hot=false&minify=false' : '/main.jsbundle')
            .on('progress', e => {
                console.log(`Bundle uploaded ${((e.loaded / e.total) * 100).toFixed(2)}%`)
            })
            .end((err, res2) => {
                if(err) throw err;
                request
                    .post(`https://sentry.io/api/0/projects/eslcc/euroschool-app/releases/${release}/files/`)
                    .type('application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .attach('file', 'main.jsbundle.map')
                    .field('name', DEV ? '/index.android.map?platform=android&dev=true&hot=false&minify=false' : '/main.jsbundle.map')
                    .on('progress', e => {
                        console.log(`Sourcemap uploaded ${((e.loaded / e.total) * 100).toFixed(2)}%`)
                    })
                    .end((err, res3) => {
                        if(err) throw err;
                        console.log('Done! Ensure you update the version in `index.android.js` and `index.ios.js` to:');
                        console.log(release);
                        console.log('/out')
                    })
            })

    });
