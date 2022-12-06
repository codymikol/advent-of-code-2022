import java.io.File
import java.nio.file.Paths


fun main() {
    val input = File(Paths.get("/home/cody/dev/src/advent-of-code-2022/input/6.txt").toUri()).readText()
    listOf(4, 14).forEach { println("The start of message for for count $it is: ${findStartOfMessage(it, input)}") }
}

fun findStartOfMessage(encoderSize: Int, message: String): Int = message.windowed(encoderSize)
    .indexOfFirst { s -> s.toList().let { it.distinct().size == it.size } } + encoderSize
