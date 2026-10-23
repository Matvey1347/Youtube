import React from 'react';
import {Audio, staticFile} from 'remotion';
import type {VideoProject} from '../contracts';

export const AudioTracks: React.FC<{tracks: VideoProject['audio']}> = ({tracks}) => <>{tracks.map((track) => <Audio key={`${track.kind}-${track.src}`} src={staticFile(track.src)} volume={track.volume} startFrom={track.startFrom}/>)}</>;
