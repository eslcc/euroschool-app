const fs = require('fs');
const path = require('path');
const exists = require('fs-exists-sync');
const execSync = require('child_process').execSync;
const replace = require('replace-in-file');
const request = require('superagent');
const rimraf = require('rimraf');
const copy = require('recursive-copy');
const logUpdate = require('log-update');

console.log('Cleaning up...');
rimraf('build', () => {
    rimraf('release-build', () => {
        console.log('Running tsc...');
        try {
            execSync('tsc', { stdio: [0, 1, 2] });
        } catch (e) {
            console.error('Error: tsc errored. Exiting.');
            process.exit(1);
        }

        console.log('Copying assets...');
        copy('common', 'build', {
            filter: fname => /.*\.(jpg|png)$/.test(fname),
            overwrite: true,
        }, err => {
            if (err) {
                console.error(`Asset copying failed: ${JSON.stringify(err)}`);
            } else {
                console.log('Building debug APK...');
                fs.mkdirSync('release-build');
                try {
                    execSync('gradlew assembleDebug', { stdio: [0, 1, 2], cwd: path.join(__dirname, 'android') });
                } catch (e) {
                    console.error('Error: gradle errored. Exiting.');
                    process.exit(1);
                }
            }
        });
    });
});

