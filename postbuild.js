
var _superagent=require('superagent');var _superagent2=_interopRequireDefault(_superagent);
var _child_process=require('child_process');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var argv=require('yargs').argv;

var pkg=require('./package.json');

var DEV=!!argv.dev;

var commit=process.env['TRAVIS_COMMIT']||(0,_child_process.execSync)('git rev-parse HEAD').toString().replace(/\r?\n|\r/g,"");

var release=argv.release||pkg.version+'-$}-'+new Date().getSeconds()+(DEV?'-dev':'');

console.log('Building release '+release);

var command='react-native bundle  --dev '+DEV+'  --platform android --entry-file index.android.js --bundle-output main.jsbundle --sourcemap-output main.jsbundle.map';

console.log('Runnong command '+command+'...');
var rnbuild=(0,_child_process.execSync)(command);

console.log('Uploading bundle and sourcemap to Sentry...');

var token=argv.sentryToken||process.env.SENTRY_TOKEN;

_superagent2.default.
post('https://sentry.io/api/0/projects/eslcc/euroschool-app/releases/').
type('application/json').
set('Authorization','Bearer '+token).
send({version:release.toString()}).
end(function(err,res){
if(err)throw err;
_superagent2.default.
post('https://sentry.io/api/0/projects/eslcc/euroschool-app/releases/'+release+'/files/').
type('application/json').
set('Authorization','Bearer '+token).
attach('file','main.jsbundle').
field('name',DEV?'/index.android.bundle?platform=android&dev=true&hot=false&minify=false':'/main.jsbundle').
on('progress',function(e){
console.log('Bundle uploaded '+(e.loaded/e.total*100).toFixed(2)+'%');
}).
end(function(err,res2){
if(err)throw err;
_superagent2.default.
post('https://sentry.io/api/0/projects/eslcc/euroschool-app/releases/'+release+'/files/').
type('application/json').
set('Authorization','Bearer '+token).
attach('file','main.jsbundle.map').
field('name',DEV?'/index.android.map?platform=android&dev=true&hot=false&minify=false':'/main.jsbundle.map').
on('progress',function(e){
console.log('Sourcemap uploaded '+(e.loaded/e.total*100).toFixed(2)+'%');
}).
end(function(err,res3){
if(err)throw err;
console.log('Done! Ensure you update the version in `index.android.js` and `index.ios.js` to:');
console.log(release);
console.log('/out');
});
});

});
