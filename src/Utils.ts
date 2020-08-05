export function findHighestValue(a: number, b: number, c: number) {
    return Math.max(Math.max(a, b), c);
}

export function findLowestValue(a: number, b: number, c: number) {
    return Math.min(Math.min(a, b), c);
}

export function findBestOverZero(a: number, b: number, c: number) {
    const best = Math.max(Math.max(a, b), c);
    return best > 0 ? best : 0;
}

export function copyArray<T>(ts: T[]): T[] {
    const ret = [];
    for (let i = 0; i < ts.length; i++) {
        ret.push(ts[i]);
    }
    return ret;
}
