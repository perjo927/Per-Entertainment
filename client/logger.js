export function logger(text, level = "log") {
    const logger = console;
    logger[level](text);
}