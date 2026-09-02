/**
 * Procedural Cosmic Ambient Sound Synthesizer using Web Audio API
 * Generates an ethereal deep-space drone and subtle particle resonance.
 */

class CosmicSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isPlaying: boolean = false;

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Filter for muffled cosmic void
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(160, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(4, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // Deep sub-drone (43.65 Hz - F1 note)
    this.subOsc = this.ctx.createOscillator();
    this.subOsc.type = 'sine';
    this.subOsc.frequency.setValueAtTime(43.65, this.ctx.currentTime);
    this.subOsc.connect(this.filter);

    // Texture tone (65.41 Hz - C2 note with slight vibrato)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'triangle';
    this.osc1.frequency.setValueAtTime(65.41, this.ctx.currentTime);
    const osc1Gain = this.ctx.createGain();
    osc1Gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    this.osc1.connect(osc1Gain);
    osc1Gain.connect(this.filter);

    // High harmonic shimmering resonance (130.81 Hz - C3)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'sine';
    this.osc2.frequency.setValueAtTime(130.81, this.ctx.currentTime);
    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    this.osc2.connect(osc2Gain);
    osc2Gain.connect(this.filter);

    this.subOsc.start();
    this.osc1.start();
    this.osc2.start();
  }

  public toggle(): boolean {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return false;

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      if (this.isPlaying) {
        // Fade out
        this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.4);
        this.isPlaying = false;
      } else {
        // Fade in
        this.masterGain.gain.setTargetAtTime(0.12, this.ctx.currentTime, 1.2);
        this.isPlaying = true;
      }
      return this.isPlaying;
    } catch {
      return false;
    }
  }

  public playPulse(frequency = 520) {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    try {
      const pulseOsc = this.ctx.createOscillator();
      const pulseGain = this.ctx.createGain();
      
      pulseOsc.type = 'sine';
      pulseOsc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      pulseOsc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.35);

      pulseGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      pulseGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

      pulseOsc.connect(pulseGain);
      pulseGain.connect(this.ctx.destination);

      pulseOsc.start();
      pulseOsc.stop(this.ctx.currentTime + 0.4);
    } catch {
      // Ignored if audio blocked
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const cosmicAudio = new CosmicSoundEngine();
