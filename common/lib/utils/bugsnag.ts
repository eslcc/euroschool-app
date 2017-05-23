const { Client, Configuration } = require('bugsnag-react-native');

const config = new Configuration('a27061605ff410fe9b91bee65969ff85');
config.codeBundleId = '$$RELEASE$$';
const bugsnag = new Client(config);

export default bugsnag;
