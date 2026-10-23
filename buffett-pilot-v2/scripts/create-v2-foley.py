"""Quiet, original editorial Foley timed to the five-scene V2 pilot."""
import math
import random
import struct
import wave
from pathlib import Path

SR = 22050
DURATION = 15
random.seed(1936)
samples = [0.0] * (SR * DURATION)


def add(at, length, sound):
    start = int(at * SR)
    for i in range(min(int(length * SR), len(samples) - start)):
        t = i / SR
        samples[start + i] += sound(t, i / max(1, length * SR))


def footstep(at, gain=0.018):
    add(at, 0.17, lambda t, p: gain * (1 - p) ** 2 *
        (0.55 * (random.random() * 2 - 1) + math.sin(2 * math.pi * 78 * t)))


def wood(at, gain=0.043):
    add(at, 0.24, lambda t, p: gain * math.exp(-17 * t) *
        (math.sin(2 * math.pi * 115 * t) + 0.18 * (random.random() * 2 - 1)))


def glass(at, gain=0.025):
    add(at, 0.45, lambda t, p: gain * math.exp(-9 * t) *
        (math.sin(2 * math.pi * 1350 * t) + 0.25 * math.sin(2 * math.pi * 2047 * t)))


def coin(at, gain=0.027):
    add(at, 0.51, lambda t, p: gain * math.exp(-8 * t) *
        (math.sin(2 * math.pi * 1773 * t) + 0.31 * math.sin(2 * math.pi * 2537 * t)))


for time in (0.28, 0.82, 1.37, 1.91, 2.46):
    footstep(time)
wood(3.06, 0.035)  # cut into the shop
wood(3.88, 0.052)  # six-pack set on wood
glass(4.03)
glass(5.62, 0.022)  # bottle close-up
wood(7.86, 0.037)  # door-to-door cut
glass(8.65, 0.030)  # single bottle exchange
coin(9.56, 0.022)   # one nickel sale
coin(10.46, 0.034)  # final arithmetic section
for index in range(6):
    coin(11.02 + index * 0.31, 0.013)
coin(13.69, 0.041)  # five-cent profit emphasis

out = Path(__file__).resolve().parent.parent / 'public/assets/v2/foley-v2.wav'
with wave.open(str(out), 'wb') as file:
    file.setnchannels(2)
    file.setsampwidth(2)
    file.setframerate(SR)
    data = bytearray()
    for t, value in enumerate(samples):
        fade = max(0, min(1, t / (SR * 0.18), (len(samples) - t) / (SR * 0.18)))
        pcm = int(max(-0.95, min(0.95, value * fade)) * 32767)
        data.extend(struct.pack('<hh', pcm, pcm))
    file.writeframes(data)
print(out)
