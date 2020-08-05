export function findHighestValue(a: number, b: number, c: number) {
    return Math.max(Math.max(a, b), c);
}

export function findLowestValue(a: number, b: number, c: number) {
    return Math.min(Math.min(a, b), c);
}

export function copyArray<T>(ts: T[]): T[] {
    let ret = [];
    for (let i = 0; i < ts.length; i++) {
        ret.push(ts[i]);
    }
    return ret;
}
