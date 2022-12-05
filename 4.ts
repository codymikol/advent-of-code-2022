import * as fs from 'fs';
import * as path from "path";
import * as R from 'ramda'

const input = fs.readFileSync(path.join(__dirname, './input/4.txt')).toString();

function getRange(line: string): number[] {
    const [start, end] = line.split('-');
    if (!start || !end) throw 'InvalidRange ' + line;
    return R.range(parseInt(start), parseInt(end) + 1)
}

function getAllMatching(strategy: (smaller: number[], bigger: number[]) => boolean) {
    return input.split('\n').filter((line) => {
        const [elfA, elfB] = line.split(',')
        if (!elfA || !elfB) throw 'Invalid Elf ' + line;
        const [smaller, bigger] = [getRange(elfA), getRange(elfB)].sort((a, b) => a.length - b.length)
        if (!smaller || !bigger) throw 'Invalid Sort'
        return strategy(smaller, bigger)
    }).length
}

const isFullOverlap = (smaller: number[], bigger: number[]): boolean => R.intersection(smaller, bigger).length === smaller.length

const isAnyOverlap = (smaller: number[], bigger: number[]): boolean => R.intersection(smaller, bigger).length > 0

console.log("Badge lists where once is fully intersects with the other: " + getAllMatching(isFullOverlap))

console.log("Badge lists where there is any intersection: " + getAllMatching(isAnyOverlap))