import { AsyncStorage } from 'react-native';

const CACHE_KEY_PARENT = 'euroschool.cache.master$';
const DEFAULT_OPTIONS = {
    expires: 604800 , // one week
};

export default class Cache {
    static async _getAllMyKeys() {
        const keys = await AsyncStorage.getAllKeys();
        return keys.filter(
            key => key.startsWith(CACHE_KEY_PARENT)
        );
    }
    static async get(key: string, defaultReturn: any = null) {
        const result = await AsyncStorage.getItem(CACHE_KEY_PARENT + key);
        const item = JSON.parse(result);
        if (item) {
            return item;
        } else {
            return defaultReturn;
        }
    }
    static async set(key: string, value: any, options = DEFAULT_OPTIONS) {
        return await AsyncStorage.setItem(CACHE_KEY_PARENT + key, JSON.stringify({
            _cachemeta: {
                expires: (new Date().getTime() / 1000) + options.expires ,
            },
            ...value ,
        }));
    }
    static async remove(key: string) {
        return await AsyncStorage.removeItem(CACHE_KEY_PARENT + key);
    }
    static async clear() {
        const keysToDelete = await Cache._getAllMyKeys();
        return await AsyncStorage.multiRemove(keysToDelete);
    }
    /* POSSIBLE OPTIMIZATION
     * If you find that GC is getting slow, constider separately
     * caching expiration times from the values themselves (in the current
     * implementation, each GC operation needs deserializing every single cache
     * entry, which can grow out of scale). Maybe store like
     * "key1:expire1;key2:expire2;..."(which does not require parsing JSON on
     * every GC). Since the performance of GC is bound by object deserialization
     * speed more than remove count, this could be a worthwhile operation
     * (~O(1) cache GC instead of O(n)). However, I'm too lazy for it.
     */
    static async gc() {
        
        try {
            const start = new Date();

            const keys = await Cache._getAllMyKeys();
            const values = await AsyncStorage.multiGet(keys);
            const keysToDelete: string[] = [];

            // If keys are expired, mark them for deletion
            values.forEach(keyval => {
                const val = JSON.parse(keyval[1]);
                if (val._cachemeta.expires < (new Date().getTime() / 1000)) {
                    keysToDelete.push(keyval[0]);
                }
            });
            
            if (keysToDelete.length === 0) {
                return;
            }

            const result = await AsyncStorage.multiRemove(keysToDelete);

            const end = new Date();
            const time = end.getTime() - start.getTime();
            
            if (time > 250) {
                console.warn(
                    `WARNING! Cache GC performance slow (${time}ms for ${keysToDelete} keys), check yourself!`
                );
            }
            return result;
        } catch(e) {
            console.warn(`GC failed!`, e);
        }
    }
}
