class AnalyserProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.port.onmessage = (event) => {
            if (event.data === 'check') {
                this.port.postMessage('audioprocess');
            }
        };
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0];
        const output = outputs[0];

        if (input.length > 0 && output.length > 0) {
            for (let channel = 0; channel < input.length; ++channel) {
                output[channel].set(input[channel]);
            }
        }

        return true;
    }
}

registerProcessor('analyser-processor', AnalyserProcessor);
