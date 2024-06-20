class Analyser {
  private audioContext: AudioContext;
  private analyserNode: AnalyserNode;
  private oscillatorNode: OscillatorNode;
  private gainNode: GainNode;
  private oscillators: OscillatorNode[] = [];

  constructor() {
    this.audioContext = new (window.AudioContext)();
    this.analyserNode = this.audioContext.createAnalyser();
    this.oscillatorNode = this.audioContext.createOscillator();
    this.gainNode = this.audioContext.createGain();

    this.gainNode.connect(this.analyserNode);
    this.analyserNode.connect(this.audioContext.destination);
  }

  playMorseCode(morseCode: string, Done: () => void) {
    const dotDuration = 0.07; // speed
    const dashDuration = dotDuration * 3;
    const gapDuration = dotDuration;
    let time = this.audioContext.currentTime;
    
    morseCode.split('').forEach((symbol, index, array) => {
      if (symbol === '.') {
        this.playBeep(time, dotDuration);
        time += dotDuration + gapDuration;
      } else if (symbol === '-') {
        this.playBeep(time, dashDuration);
        time += dashDuration + gapDuration;
      } else {
        time += gapDuration * 2; // space between words
      }

      if (index === array.length - 1) {
        setTimeout(Done, Math.round((time - this.audioContext.currentTime) * 1000));
      }
    });
  }

  private playBeep(startTime: number, duration: number) {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.frequency.setValueAtTime(500, startTime);

    osc.start(startTime);
    osc.stop(startTime + duration);
    this.oscillators.push(osc);
  }

  start() {
    this.oscillatorNode.connect(this.gainNode);
    this.oscillatorNode.start();
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.connect(this.analyserNode);
  }
  stop() {
    this.oscillatorNode.stop();
    this.oscillatorNode.disconnect();
    this.gainNode.disconnect();
  }
  stopBeep() {
    this.oscillators.forEach((osc) => {
      osc.disconnect();
    });
    this.oscillators = [];
  }

  setVolume(volume: number) {
    this.gainNode.gain.value = volume;
  }

  setFrequency(frequency: number) {
    this.oscillatorNode.frequency.setValueAtTime(frequency, 0);
  }

  setFFTSize(fftSize: number) {
    this.analyserNode.fftSize = fftSize;
  }

  getAnalyserNode() {
    return this.analyserNode;
  }

  getOscillatorNode() {
    return this.oscillatorNode;
  }

  getGainNode() {
    return this.gainNode;
  }
}

export default Analyser;
