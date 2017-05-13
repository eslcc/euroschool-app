export default function serialize(obj: any, prefix?: string): string {
    return Object.keys(obj).map(name => {
        const key = prefix ?
            `${prefix}[${name}]` :
            name;
        const val = obj[name];

        return typeof val === 'object' ?
            serialize(val, key) :
            `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
    }).join('&');
}
