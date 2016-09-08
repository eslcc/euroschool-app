// @flow

import { rgbToString, hexToRgb } from './colors';

const lerp = (a, b, f) => a + f * (b - a);

export default (color1 : string | {r : number, g : number, b : number},
                color2 : string | {r : number, g : number, b : number},
                stops : number) => {
    let c1 = color1;
    let c2 = color2;
    if (typeof c1 === 'string')
        c1 = hexToRgb(c1);

    if (typeof c2 === 'string')
        c2 = hexToRgb(c2);

    console.log(c1);
    const result = [];

    for (let i = 0; i < stops; i++) {
        const point = (1 / stops) * (i + 1);
        const out = {
            r: lerp(c1.r, c2.r, point).toFixed(0),
            g: lerp(c1.g, c2.g, point).toFixed(0),
            b: lerp(c1.b, c2.b, point).toFixed(0),
        };
        result.push(rgbToString(out));
    }
    return result;
};
