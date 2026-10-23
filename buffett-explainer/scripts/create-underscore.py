import math
import struct
import wave
from pathlib import Path


SAMPLE_RATE = 44_100
DURATION = 15
OUTPUT = Path(__file__).resolve().parent.parent / 'public/assets/underscore.wav'

# Quiet, original four-chord bed: warm and unobtrusive under spoken Russian.
CHORDS = [
    (0.0, 4.0, (110.00, 130.81, 164.81, 196.00)),
    (3.5, 4.0, (87.31, 110.00, 130.81, 164.81)),
    (7.0, 4.0, (130.81, 164.81, 196.00, 246.94)),
    (10.5, 4.5, (98.00, 123.47, 146.83, 164.81)),
]

def envelope(t: float, start: float, length: float) -> float:
    local = t - start
    if local < 0 or local > length:
        return 0.0
    attack = min(1.0, local / 0.55)
    release = min(1.0, (length - local) / 0.75)
    return max(0.0, min(attack, release))

def tone(t: float, frequency: float) -> float:
    # A softly detuned sine and its quiet upper partial sound like a paper-soft pad.
    return math.sin(2 * math.pi * frequency * t) + 0.16 * math.sin(2 * math.pi * frequency * 2.005 * t)


frames = []
for n in range(SAMPLE_RATE * DURATION):
    t = n / SAMPLE_RATE
    sample = 0.0
    for start, length, notes in CHORDS:
        amp = envelope(t, start, length)
        if amp:
            sample += amp * sum(tone(t, note) for note in notes) * 0.011
    # Sparse, soft bell-like notes add a little movement between the scene wipes.
    beat = t % 1.5
    note_index = int(t / 1.5) % 4
    pluck_note = (440.0, 392.0, 329.63, 392.0)[note_index]
    if beat < 0.45:
        sample += 0.018 * math.exp(-beat * 7.0) * math.sin(2 * math.pi * pluck_note * beat)
    # Fade the whole bed at the edges and keep headroom for the voice.
    edge = min(1.0, t / 0.6, (DURATION - t) / 0.7)
    sample *= max(0.0, edge)
    value = max(-0.7, min(0.7, sample))
    pcm = int(value * 32767)
    frames.append(struct.pack('<hh', pcm, pcm))

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(OUTPUT), 'wb') as wav:
    wav.setnchannels(2)
    wav.setsampwidth(2)
    wav.setframerate(SAMPLE_RATE)
    wav.writeframes(b''.join(frames))
print(f'Created {OUTPUT}')
