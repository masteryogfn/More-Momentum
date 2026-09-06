import os from "os";

class logger {
    public backend(message: string) {
        console.log(`\x1b[37m[\x1b[32mMOMENTUM - BACKEND\x1b[0m\x1b[37m] ${message}`);
    }

    public bot(message: string) {
        console.log(`\x1b[37m[\x1b[35mMOMENTUM - BOT\x1b[0m\x1b[37m] ${message}`)
    }

    public xmpp(message: string) {
        console.log(`\x1b[37m[\x1b[35mMOMENTUM - XMPP\x1b[0m\x1b[37m] ${message}`)
    }
    public error(message: string) {
        console.log(`\x1b[37m[\x1b[31mMOMENTUM - ERROR\x1b[0m\x1b[37m] ${message}`);
    }

    public request(message: string) {
        console.log(`\x1b[37m[\x1b[36mMOMENTUM - REQUEST\x1b[0m\x1b[37m] ${message}`);
    }

    public panel(message: string) {
        console.log(`\x1b[37m[\x1b[33mMOMENTUM - PANEL\x1b[0m\x1b[37m] ${message}`);
    }

    public debug(message: string) {
        if (process.env.DEBUG_LOG === "true") {
            console.log(`\x1b[37m[\x1b[34mMOMENTUM - DEBUG\x1b[0m\x1b[37m] ${message}`);
        }
    }

    public warn(message: string) {
        console.log(`\x1b[37m[\x1b[33mMOMENTUM - WARN\x1b[0m\x1b[37m] ${message}`);
    }

    public api = (message: string) => {
        console.log(`\x1b[37m[\x1b[36mMOMENTUM - API\x1b[0m\x1b[37m] ${message}`);
    }

}

export default new logger();
