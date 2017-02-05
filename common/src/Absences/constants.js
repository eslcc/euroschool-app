/**
 * Some teachers have duplicate surnames, leading the timetable absence resolver to get confused.
 * To avoid shenanigans, blacklist them and prevent notifications from being sent, just in case.
 * @type {Array<string>}
 */
// eslint-disable-next-line import/prefer-default-export
export const DUPLICATE_SURNAME_BLACKLIST = [
    'cloarec',
    'de vries',
    'duncombe',
    'heins',
    'kornemark',
    'körnemark', // duplicate because umlaut
    'kos',
    'malt',
];
