import React from 'react';
import {Audio} from '@remotion/media';
import {Composition as RemotionComposition, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {NarrationCaptions} from './NarrationCaptions';
import {SceneWipe} from './SceneWipe';
import {Compounding} from './scenes/Compounding';
import {Finale} from './scenes/Finale';
import {FirstShare} from './scenes/FirstShare';
import {InvestorPortrait} from './scenes/InvestorPortrait';
import {Patience} from './scenes/Patience';
import {TaxReturn} from './scenes/TaxReturn';

const sequenceDurations = [84, 84, 83, 83, 82, 79] as const;
const transitionFrames = 9;
const starts = [0, 75, 150, 224, 298, 371] as const;
const durationInFrames = 450;

const Soundtrack: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames: totalFrames, fps} = useVideoConfig();
  const voiceVolume = frame < 8 ? frame / 8 : frame > totalFrames - 13 ? Math.max(0, (totalFrames - frame) / 13) : 1;
  const bedVolume = frame < 15 ? frame / 15 * 0.2 : frame > totalFrames - 20 ? Math.max(0, (totalFrames - frame) / 20 * 0.2) : 0.2;
  return (
    <>
      <Audio src={staticFile('assets/underscore.wav')} volume={bedVolume} premountFor={fps} />
      <Audio src={staticFile('assets/narration.mp3')} volume={voiceVolume} premountFor={fps} />
    </>
  );
};

export const BuffettVideo: React.FC = () => {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();
  const active = (index: number) => frame >= starts[index] && frame < starts[index] + sequenceDurations[index];
  return (
    <>
      {active(0) && <Sequence name="01 · Первая акция" from={starts[0]} durationInFrames={sequenceDurations[0]} premountFor={fps}><FirstShare /></Sequence>}
      {active(1) && <Sequence name="02 · Налоговый вычет" from={starts[1]} durationInFrames={sequenceDurations[1]} premountFor={fps}><SceneWipe direction="from-right" frames={transitionFrames}><TaxReturn /></SceneWipe></Sequence>}
      {active(2) && <Sequence name="03 · Уоррен Баффет" from={starts[2]} durationInFrames={sequenceDurations[2]} premountFor={fps}><SceneWipe direction="from-left" frames={transitionFrames}><InvestorPortrait /></SceneWipe></Sequence>}
      {active(3) && <Sequence name="04 · Сложный процент" from={starts[3]} durationInFrames={sequenceDurations[3]} premountFor={fps}><SceneWipe direction="from-bottom" frames={transitionFrames}><Compounding /></SceneWipe></Sequence>}
      {active(4) && <Sequence name="05 · Терпение" from={starts[4]} durationInFrames={sequenceDurations[4]} premountFor={fps}><SceneWipe direction="from-left" frames={transitionFrames}><Patience /></SceneWipe></Sequence>}
      {active(5) && <Sequence name="06 · Время" from={starts[5]} durationInFrames={sequenceDurations[5]} premountFor={fps}><SceneWipe direction="from-right" frames={transitionFrames}><Finale /></SceneWipe></Sequence>}
      <NarrationCaptions />
      <Soundtrack />
    </>
  );
};

export const MyComposition = () => (
  <RemotionComposition
    id="Buffett15"
    component={BuffettVideo}
    durationInFrames={durationInFrames}
    fps={30}
    width={1920}
    height={1080}
  />
);
