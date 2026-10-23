import { MyComposition } from "./Composition";
import {BuffettPilotComposition} from './Pilot';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <BuffettPilotComposition />
    </>
  );
};
