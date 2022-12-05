import java.io.File
import java.nio.file.Paths
import java.util.*

data class InstructionSet(
    val count: Int,
    val from: Int,
    val to: Int,
)

fun main() {

    val input = File(Paths.get("./input/5.txt").toUri()).readText()

    val indexOfStackInstructionDelimiter = input.split('\n').indexOfFirst { it.trim() === "" }

    val lines = input.split('\n')

    val stackLines = lines.take(indexOfStackInstructionDelimiter - 1)

    val instructionLines = lines.takeLast(lines.size - indexOfStackInstructionDelimiter - 1)

    val instructions = instructionSets(instructionLines)

    val stacksFor9000 = makeStackList(lines, stackLines)

    val stacksFor9001 = makeStackList(lines, stackLines)

    val stack9000Result = runStack9000Manipulator(stacksFor9000, instructions)

    val stack9001Result = runStack9001Manipulator(stacksFor9001, instructions)

    println("Stack 9000 Bots result: " + stack9000Result.joinToString(separator = ""))
    println("Stack 9001 Bots result: " + stack9001Result.joinToString(separator = ""))

}

private fun runStack9000Manipulator(stacks: Array<Stack<Char>>, instructions: List<InstructionSet>): List<Char> {
    instructions.forEach {
        val fromStack = stacks[it.from - 1]
        val toStack = stacks[it.to - 1]
        for (i in 1..it.count) toStack.push(fromStack.pop())
    }
    return stacks.map { it.peek() }
}

private fun runStack9001Manipulator(stacks: Array<Stack<Char>>, instructions: List<InstructionSet>): List<Char> {
    instructions.forEach { instructionSet ->
        val fromStack = stacks[instructionSet.from - 1]
        val toStack = stacks[instructionSet.to - 1]
        val temp = mutableListOf<Char>()
        for (i in 1..instructionSet.count) temp.add(fromStack.pop())
        temp.reversed().forEach { toStack.push(it) }
    }
    return stacks.map { it.peek() }
}

private fun makeStackList(lines: List<String>, stackLines: List<String>): Array<Stack<Char>> {

    val stacks = Array(9) { Stack<Char>() }

    stackLines.reversed().forEach {
        for (i in 1..33 step 4) it[i].also { char ->
            if (char.isLetter()) {
                println(char)
                val stackIndex = lines[8][i].digitToInt() - 1
                stacks[stackIndex].push(char)
            }
        }
    }

    return stacks
}

private fun instructionSets(instructionLines: List<String>) = instructionLines.map {

    val (count, from, to) = it
        .replace("move ", "")
        .replace(" from ", ",")
        .replace(" to ", ",")
        .split(",")

    InstructionSet(count.toInt(), from.toInt(), to.toInt())

}