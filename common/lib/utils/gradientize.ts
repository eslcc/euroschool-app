import { rgbToString, hexToRgb } from './colors';

type RgbColor = {r: number, g: number, b: number};

const lerp = (a: number, b: number, f: number) => a + f * (b - a);

export default (color1: string | RgbColor,
                color2: string | RgbColor,
                stops: number) => {
    let c1 = color1;
    let c2 = color2;
    if (typeof c1 === 'string') {
        c1 = hexToRgb(c1);
    }

    if (typeof c2 === 'string') {
        c2 = hexToRgb(c2);
    }

    const result = [];

    for (let i = 0; i < stops; i++) {
        const point = (1 / stops) * (i + 1);
        const out = {
            r: lerp(c1.r, c2.r, point),
            g: lerp(c1.g, c2.g, point),
            b: lerp(c1.b, c2.b, point),
        };
        result.push(rgbToString(out));
    }
    return result;
};
