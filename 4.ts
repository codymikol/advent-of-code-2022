import * as fs from 'fs';
import * as path from "path";
import * as R from 'ramda'

const input = fs.readFileSync(path.join(__dirname, './input/4.txt')).toString();

function getRange(line: string): number[] {
    const split = line.split('-');
    if (!split[0] || !split[1]) throw 'InvalidRange ' + line;
    return R.range(parseInt(split[0]), parseInt(split[1]) + 1)
}

function getAllMatching(strategy: (smaller: number[], bigger: number[]) => boolean) {
    return input.split('\n').map((line) => {
        const sections = line.split(',')
        if (!sections[0] || !sections[1]) throw 'Invalid Elf ' + line;
        const [smaller, bigger] = [getRange(sections[0]), getRange(sections[1])]
            .sort((a, b) => a.length - b.length)
        if (!smaller || !bigger) throw 'Invalid Sort'
        return strategy(smaller, bigger)
    }).filter((b) => b).length
}

const isFullOverlap = (smaller: number[], bigger: number[]): boolean => R.intersection(smaller, bigger).length === smaller.length

const isAnyOverlap = (smaller: number[], bigger: number[]): boolean => R.intersection(smaller, bigger).length > 0

console.log("Badge lists where once is fully intersects with the other: " + getAllMatching(isFullOverlap))

console.log("Badge lists where there is any intersection: " + getAllMatching(isAnyOverlap))