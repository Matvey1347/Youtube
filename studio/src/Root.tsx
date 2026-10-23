import React from 'react';
import {StudioComposition} from './renderer/StudioComposition';
import projectData from '../../projects/smoke-test/project.json';
import {projectSchema} from './contracts';

export const RemotionRoot: React.FC = () => <StudioComposition project={projectSchema.parse(projectData)} />;
