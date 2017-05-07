import * as moment from 'moment';

export function buildGridRows(dataIn) {
    const data = dataIn.slice(0);
    const lengths = [1, 1];
    const defaultLength = 2;
    const result = [];

    const yesterday = moment().subtract(1, 'd');
    data.push({
        NOW_MARKER: 1,
        start: yesterday,
    });

    data.sort(
        (a, b) => {
            const ma = moment(a.start);
            const mb = moment(b.start);
            if (ma.isBefore(mb)) {
                return -1;
            }
            if (ma.isAfter(mb)) {
                return 1;
            }
            return 0;
        }
    );

    let currentLength = 0;
    while (data.length > 0) {
        if (data[0].NOW_MARKER) {
            result.push(data.splice(0, 1));
        } else {
            const thisLength = currentLength < lengths.length ? lengths[currentLength] : defaultLength;
            result.push(data.splice(0, thisLength));
            currentLength++;
        }
    }
    return result;
}