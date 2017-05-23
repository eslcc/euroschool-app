const fs = require('fs');
const path = require('path');
const exists = require('fs-exists-sync');
const execSync = require('child_process').execSync;
const replace = require('replace-in-file');
const request = require('superagent');
const rimraf = require('rimraf');
const copy = require('recursive-copy');
const ProgressBar = require('progress');

const argv = require('yargs').argv;

console.log(JSON.stringify(argv));

let release;

if (exists('APP_LAST_RELEASE')) {
    const lastRelease = parseInt(fs.readFileSync('APP_LAST_RELEASE', { encoding: 'utf-8' }).replace(/(Alpha|Beta)\-/i, ''));
    release = lastRelease + 1;
} else {
    release = 1;
}

console.log(`Releasing version 'Alpha-${release}'`);

console.log('Running tslint...');
try {
    execSync('tslint --project tsconfig.json common/**/*.{j,t}s{,x}', { stdio: [0, 1, 2] });
} catch (e) {
    console.error('Error: tslint errored. Exiting.');
    process.exit(1);
}

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

        console.log('Setting release number everywhere...');
        replace.sync({
            from: /\$\$RELEASE\$\$/g,
            to: `Alpha-${release}`,
            files: ['build/**/*.{j,t}s{,x}', 'index.ios.js', 'index.android.js'],
        });

        console.log('Copying assets...');
        copy('common', 'build', {
            filter: fname => /.*\.(jpg|png)$/.test(fname),
            overwrite: true,
        }, err => {
            if (err) {
                console.error(`Asset copying failed: ${JSON.stringify(err)}`);
            } else {
                console.log('Bundling...');
                fs.mkdirSync('release-build');
                try {
                    execSync('node node_modules/react-native/local-cli/cli.js bundle --platform android --dev false --entry-file ./index.android.js --bundle-output ./release-build/index.android.bundle --sourcemap-output ./release-build/index.android.bundle.map --assets-dest ./release-build', { stdio: [0, 1, 2] });
                } catch (e) {
                    console.error('Error: react-native errored. Exiting.');
                    process.exit(1);
                }

                console.log('Uploading to CodePush...');

                try {
                    execSync(`code-push release euroschool-app-android ./release-build ${argv.binaries | '1.0'} --noDuplicateReleaseError`, { stdio: [0, 1, 2] });
                } catch (e) {
                    console.error('Error: code-push errored. Exiting.');
                    process.exit(1);
                }

                console.log('Uploading to bugsnag...');

                let bar;
                let soFar = 0;

                request
                    .post('https://upload.bugsnag.com/')
                    .type('form')
                    .field('apiKey', 'a27061605ff410fe9b91bee65969ff85')
                    .field('codeBundleId', `Alpha-${release}`)
                    .field('minifiedUrl', 'index.android.bundle')
                    .field('overwrite', true)
                    .attach('minifiedFile', './release-build/index.android.bundle')
                    .attach('sourceMap', './release-build/index.android.bundle.map')
                    .attach('index.android.js', './index.android.js')
                    .on('progress', e => {
                        if (!bar) {
                            bar = new ProgressBar('Upload progress [:bar] :percent :etas', {
                                complete: '=',
                                incomplete: ' ',
                                width: 50,
                                total: e.total
                            });
                        }
                        bar.tick(e.loaded - soFar);
                        soFar = e.loaded;
                    })
                    .end((err, res) => {
                        console.log('\n');
                        if (err) {
                            console.error(`Bugsnag errored: ${JSON.stringify(err)}`);
                        } else {
                            console.log('Succeeded!')
                            replace.sync({
                                from: /Alpha-[0-9]+/g,
                                to: `$$$RELEASE$$$`,
                                files: ['build/**/*.{j,t}s{,x}', 'index.ios.js', 'index.android.js'],
                            });
                            if (argv.noCleanup) {
                                console.log('Saving release...');
                                fs.writeFileSync('APP_LAST_RELEASE', `Alpha-${release}`);
                                console.log('Done!');
                            } else {
                                console.log('Cleaning up...');
                                rimraf('build', () => {
                                    rimraf('release-build', () => {
                                        console.log('Saving release...');
                                        fs.writeFileSync('APP_LAST_RELEASE', `Alpha-${release}`);
                                        console.log('Done!');
                                    });
                                });
                            }
                        }
                    })
            }
        });
    });
});