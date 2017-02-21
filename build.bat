set SENTRY_TOKEN=0417b5778dea471eb263fbe97851b88c0cab23796f0e4d108b0fd6d391e35457

for /f "delims=" %%i in ('git rev-parse HEAD') do set RELEASE=%%i

echo Bundling release: %RELEASE%

react-native bundle  --dev false  --platform ios --entry-file index.ios.js --bundle-output main.jsbundle --sourcemap-output main.jsbundle.map

echo Uploading bundle and source map to Sentry

curl https://sentry.io/api/0/projects/eslcc/euroschool-app/releases/ -X POST -H "Authorization: Bearer %SENTRY_TOKEN%" -H "Content-Type: application/json" -d "{"""version""": """%RELEASE%"""}"

curl https://sentry.io/api/0/projects/eslcc/euroschool-app/releases/%RELEASE%/files/ -X POST -H "Authorization: Bearer %SENTRY_TOKEN%" -F "file=@main.jsbundle" -F "name="""/main.jsbundle""""

curl https://sentry.io/api/0/projects/eslcc/euroschool-app/releases/%RELEASE%/files/ -X POST -H "Authorization: Bearer %SENTRY_TOKEN%" -F "file=@main.jsbundle.map" -F "name="""/main.jsbundle.map""""

