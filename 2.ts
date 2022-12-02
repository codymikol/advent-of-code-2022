import * as fs from 'fs';
import * as path from "path";
import * as R from 'ramda'

const input = fs.readFileSync(path.join(__dirname, './input/2.txt')).toString();

type Choice = { points: number }

const Rock: Choice = {points: 1}
const Paper: Choice = {points: 2}
const Scissors: Choice = {points: 3}

type Choices = { [key: string]: Choice }

const OpponentsChoices: Choices = {'A': Rock, 'B': Paper, 'C': Scissors}
const MyChoices: Choices = {'X': Rock, 'Y': Paper, 'Z': Scissors}

type Lookup = Map<Choice, Choice>

const Beats: Lookup = new Map<Choice, Choice>()
    .set(Rock, Paper)
    .set(Scissors, Rock)
    .set(Paper, Scissors)

const LosesTo: Lookup = new Map<Choice, Choice>()
    .set(Paper, Rock)
    .set(Rock, Scissors)
    .set(Scissors, Paper)


type Outcome = { points: number }

const Win: Outcome = {points: 6}
const Draw: Outcome = {points: 3}
const Lose: Outcome = {points: 0}

const lines = input.split('\n');

type Strategy = { mine: Choice, myCode: string, opponents: Choice, opponentsCode: string }

const originalStrategies: Array<Strategy> = lines.map(l => {
    const [opponentsCode, myCode] = l.split(' ')
    return {
        mine: MyChoices[myCode as string] as Choice,
        myCode: myCode as string,
        opponents: OpponentsChoices[opponentsCode as string] as Choice,
        opponentsCode: opponentsCode as string,
    }
})

function getOutcome(strategy: Strategy): Outcome {
    if (strategy.mine === strategy.opponents) return Draw;
    if (strategy.mine === Scissors && strategy.opponents === Paper) return Win
    if (strategy.mine === Rock && strategy.opponents === Scissors) return Win
    if (strategy.mine === Paper && strategy.opponents === Rock) return Win
    return Lose
}

function getNewChoice(myCode: string, opponentsChoice: Choice): Choice {
    switch (myCode) {
        case 'X':return LosesTo.get(opponentsChoice) as Choice
        case 'Y':return opponentsChoice
        case 'Z':return Beats.get(opponentsChoice) as Choice
        default:throw "Unknown user code " + myCode
    }
}

function getAlternateStrategy(strategy: Strategy): Strategy {
    return {
        mine: getNewChoice(strategy.myCode, strategy.opponents),
        myCode: strategy.myCode,
        opponents: strategy.opponents,
        opponentsCode: strategy.opponentsCode
    }
}

const strategiesToPoints = (strategies: Array<Strategy>) => strategies.map((strategy: Strategy): number => getOutcome(strategy).points + strategy.mine.points)

const pointsOriginalStrategy = strategiesToPoints(originalStrategies)
const totalOriginalStrategy = R.sum(pointsOriginalStrategy)

const alteredStrategies = originalStrategies.map(getAlternateStrategy)
const alteredStrategyPoints = strategiesToPoints(alteredStrategies)
const totalNewStrategyPoints = R.sum(alteredStrategyPoints)

console.log("The total points for the original strategy are: ", totalOriginalStrategy)

console.log("The total points for the new strategy are: ", totalNewStrategyPoints)


