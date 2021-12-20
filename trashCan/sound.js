const startFreq=30;
const osc = new Tone.Oscillator(startFreq, "sine").toDestination().start();
osc.partials=[1,0.2,0.001]