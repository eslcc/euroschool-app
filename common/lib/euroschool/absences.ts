const { load: loadHTML } = require('cheerio-without-node-native');

const URL = 'http://www.euroschool.lu/luxschool/absences_student.php';

const parse = (html: string) =>
    Array.from<any>(loadHTML(html)('img'))
    .map(star => star.nextSibling.nodeValue.trim());

export default function getAbsences() {
    return fetch(URL)
    .then(response => response.text())
    .then(parse);
}
