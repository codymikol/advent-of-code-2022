import * as fs from 'fs';
import * as path from "path";
import * as R from 'ramda'
const input = fs.readFileSync(path.join(__dirname, './input/3.txt')).toString();

const values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const lines = input.split('\n');

const uniqueSymbols = lines.map(line => {
    const partitionSize = line.length / 2
    const rucksackA: string[] = R.take(partitionSize)(line).split('')
    const rucksackB: string[] = R.takeLast(partitionSize)(line).split('')
    const intersected = R.intersection(rucksackA, rucksackB)[0]
    if(intersected === undefined || intersected.length !== 1) throw `Unexpected Intersection Size: ${intersected}`
    const same = intersected[0]
    if(same === undefined) throw 'Unexpectedly undefined intersection'
    return values.indexOf(same) + 1
})

const uniquePrioritySum = R.sum(uniqueSymbols)

const elfGroups = R.splitEvery(3, lines)

const badges = elfGroups.map(group => {
    const a = group[0]
    const b = group[1]
    const c = group[2]
    if(undefined === a || undefined === b || undefined === c) throw 'Unexpectedly undefined group';
    const intersection = R.intersection(R.intersection(a.split(''), b.split('')), c.split(''))
    if(intersection === undefined || intersection.length !== 1) throw 'Unexpected intersection';
    return values.indexOf(intersection[0] as string) + 1
})

const badgeSum = R.sum(badges)

console.log('The priority sum is: ', uniquePrioritySum)

console.log('The badge sum is: ', badgeSum)