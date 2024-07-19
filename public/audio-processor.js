class AudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.audioBuffer = [];
        this.port.onmessage = (event) => {
            if (event.data === 'flush') {
                this.flush();
            }
        };
    }

    process(inputs) {
        const input = inputs[0][0];

        if (input) {
            const buffer = new ArrayBuffer(input.length * 2);
            const outputData = new DataView(buffer);

            for (let i = 0; i < input.length; i++) {
                let s = Math.max(-1, Math.min(1, input[i]));
                outputData.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
            }

            this.audioBuffer.push(new Int16Array(buffer));

            // 디버그 로그: 처리된 오디오 데이터 확인
            console.log('Processed audio data:', new Int16Array(buffer));
        } else {
            console.log('No input received');
        }

        return true;
    }

    flush() {
        // 누적된 데이터를 메인 스레드로 전송
        const flatBuffer = this.audioBuffer.flat();
        console.log('Flushed audio data:', flatBuffer);
        this.port.postMessage(flatBuffer);
        this.audioBuffer = [];
    }
}

registerProcessor('audio-processor', AudioProcessor);
