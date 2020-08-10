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

export function sequenceColor(char: unknown): string{
    return char === "A" ? "#8CC152" :
        char === "T" ? "#3BAFDA" :
            char === "C" ? "#E9573F" :
                char === "G" ? "#F6BB42" :
                    char === " " ? "white":
                        "lightgrey";

}

/*
    takes an array with class names and removes it from all elements
     */
export function decolor(name: string[]): void{
    for (let i = 0; i < name.length; i++) {
        const coloredCells = document.getElementsByClassName(name[i]);
        while (coloredCells.length > 0) {
            coloredCells[0].classList.remove(name[i]);
        }
    }
}
