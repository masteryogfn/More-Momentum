class logger {
    backend(message) {
        console.log(`\x1b[37m[\x1b[32mMOMENTUM - BACKEND\x1b[0m\x1b[37m] ${message}`);
    }
    bot(message) {
        console.log(`\x1b[37m[\x1b[35mMOMENTUM - BOT\x1b[0m\x1b[37m] ${message}`);
    }
    xmpp(message) {
        console.log(`\x1b[37m[\x1b[35mMOMENTUM - XMPP\x1b[0m\x1b[37m] ${message}`);
    }
    error(message) {
        console.log(`\x1b[37m[\x1b[31mMOMENTUM - ERROR\x1b[0m\x1b[37m] ${message}`);
    }
    request(message) {
        console.log(`\x1b[37m[\x1b[36mMOMENTUM - REQUEST\x1b[0m\x1b[37m] ${message}`);
    }
    panel(message) {
        console.log(`\x1b[37m[\x1b[33mMOMENTUM - PANEL\x1b[0m\x1b[37m] ${message}`);
    }
    debug(message) {
        if (process.env.DEBUG_LOG === "true") {
            console.log(`\x1b[37m[\x1b[34mMOMENTUM - DEBUG\x1b[0m\x1b[37m] ${message}`);
        }
    }
    warn(message) {
        console.log(`\x1b[37m[\x1b[33mMOMENTUM - WARN\x1b[0m\x1b[37m] ${message}`);
    }
    api = (message) => {
        console.log(`\x1b[37m[\x1b[36mMOMENTUM - API\x1b[0m\x1b[37m] ${message}`);
    };
}
export default new logger();
//# sourceMappingURL=log.js.map