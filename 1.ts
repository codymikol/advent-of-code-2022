import * as fs from 'fs';
import * as path from "path";
import * as R from 'ramda'

const input = fs.readFileSync(path.join(__dirname, './input/1.txt')).toString();

const lines = input.split('\n')

const calorieListPerElf = R.splitWhenever(R.equals(''), lines)

const mapInt = (value: string) => parseInt(value)

const totalCaloriesPerElf = calorieListPerElf.map((group: Array<string>) => R.sum(group.map(mapInt)))

const sortedTotalCaloriesPerElfDesc = R.sort((a, b) => b - a, totalCaloriesPerElf)

const highestCalorieCount = sortedTotalCaloriesPerElfDesc[0]

const topThreeCalorieCount = R.take(3)(sortedTotalCaloriesPerElfDesc)

const topThreeCalorieCountSum = R.sum(topThreeCalorieCount)

console.log(`Elf with highest calorie count: ${highestCalorieCount}`)

console.log(`Sum of three highest calorie counts: ${topThreeCalorieCountSum}`)