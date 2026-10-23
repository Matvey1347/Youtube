"""Original low-key 15-second score and synchronized editorial foley."""
import math
import random
import struct
import wave
from pathlib import Path

SR = 22050
DUR = 15
COUNT = SR * DUR
OUT = Path(__file__).resolve().parent.parent / 'public/assets/pilot'
OUT.mkdir(parents=True, exist_ok=True)
random.seed(1938)


def save(name, samples):
    with wave.open(str(OUT / name), 'wb') as file:
        file.setnchannels(2)
        file.setsampwidth(2)
        file.setframerate(SR)
        data = bytearray()
        for value in samples:
            pcm = int(max(-0.95, min(0.95, value)) * 32767)
            data.extend(struct.pack('<hh', pcm, pcm))
        file.writeframes(data)


score = [0.0] * COUNT
foley = [0.0] * COUNT


def add(target, at, duration, shape):
    start = int(at * SR)
    for i in range(min(int(duration * SR), COUNT - start)):
        target[start + i] += shape(i / SR, i / max(1, duration * SR))


# Plucked upright bass, sparse muted piano and brushed pulse.
for at, freq in [(0.0, 82.41), (1.5, 123.47), (3, 110), (4.5, 82.41),
                 (6, 73.42), (7.5, 110), (9, 98), (10.5, 73.42), (12, 82.41), (13.5, 98)]:
    add(score, at, 1.15, lambda t, p, f=freq: 0.085 * math.exp(-3.6*t) *
        (math.sin(2*math.pi*f*t) + .18*math.sin(2*math.pi*2*f*t) + .06*math.sin(2*math.pi*3*f*t)))
for at, freq in [(0, 329.63), (3, 293.66), (6, 246.94), (9, 293.66), (12, 329.63)]:
    add(score, at+.24, 1.25, lambda t, p, f=freq: .023 * math.exp(-3.1*t) *
        (math.sin(2*math.pi*f*t) + .27*math.sin(2*math.pi*2.01*f*t)))
for beat in range(30):
    add(score, beat*.5+.04, .12, lambda t, p: (random.random()*2-1)*.012*(1-p)**2)


def thunk(at, gain=.08, pitch=120):
    add(foley, at, .23, lambda t, p: gain*math.exp(-18*t)*
        (math.sin(2*math.pi*pitch*t)+.25*(random.random()*2-1)))


def ring(at, freq=1850, gain=.045, dur=.6):
    add(foley, at, dur, lambda t, p: gain*math.exp(-7*t)*
        (math.sin(2*math.pi*freq*t)+.28*math.sin(2*math.pi*freq*1.37*t)))


thunk(.13, .026, 95)      # newspaper set down
add(foley, .05, .8, lambda t, p: .018*(random.random()*2-1)*(1-p))
ring(2.80, 2200, .04, .42)  # quarter on counter
thunk(3.47, .07, 105)       # crate
add(foley, 3.50, .54, lambda t, p: .018*(random.random()*2-1)*(1-p))
ring(5.23, 1520, .024, .46) # bottle cap/glass
thunk(5.39, .04, 180)
for when in [8.23, 9.18, 10.10]:
    ring(when, 1660, .024, .34)
    thunk(when+.11, .025, 185)
for when in [11.45, 11.60, 11.75, 11.90, 12.05, 12.20]:
    ring(when, 2100, .019, .3)
ring(12.76, 2450, .037, .48)  # profit nickel
add(foley, 13.47, 1.13, lambda t, p: .035*(random.random()*2-1)*math.sin(math.pi*p)**1.4) # page turn

for target in (score, foley):
    for i in range(COUNT):
        t = i / SR
        fade = min(1, t/.28, (DUR-t)/.18)
        target[i] *= max(0, fade)

save('music-original.wav', score)
save('foley-original.wav', foley)
print('Created original score and Foley in', OUT)
