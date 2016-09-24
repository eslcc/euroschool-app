
export default function () {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                'M. Fuckface, N.',
            ]);
        }, 1000);
    });
}
