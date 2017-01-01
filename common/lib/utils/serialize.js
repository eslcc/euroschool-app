export default function serialize(obj, prefix) {
    return Object.keys(obj).map((name) => {
        const key = prefix ?
            `${prefix}[${name}]` :
            name;
        const val = obj[name];

        return typeof val === 'object' ?
            serialize(val, key) :
            `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
    }).join('&');
}
