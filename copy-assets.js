const copy = require('recursive-copy');
copy('common', 'build', {
            filter: fname => /.*\.(jpg|png)$/.test(fname),
            overwrite: true,
        }, err => {
            if (err) {
                console.error(`Asset copying failed: ${JSON.stringify(err)}`);
            } else {
                console.log('Copying complete.');
            }
        });