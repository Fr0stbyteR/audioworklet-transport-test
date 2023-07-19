class TransportProcessor extends AudioWorkletProcessor {
    constructor(options) {
        super(options);
        this.port.addEventListener("message", this.handleMessage);
        this.port.start();
        this.interval = 1;
        this.origin = currentTime;
        this.next = this.origin + this.interval;
    }
    handleMessage = (message) => {
        if (message.data === "start") {
            this.origin = currentTime;
            this.next = this.origin + this.interval;
        }
    };
    process(inputs, outputs, parameters) {
        if (currentTime >= this.next) {
            while (this.next < currentTime) this.next += this.interval;
            this.port.postMessage("bang");
        }
        return true;
    }
}

registerProcessor("transport", TransportProcessor);
