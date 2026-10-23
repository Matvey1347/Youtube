import {z} from 'zod';
import sceneData from '../../../../projects/editorial-typography/scene-data.json';
const shotSchema=z.discriminatedUnion('kind',[
 z.object({id:z.string().min(1),from:z.number().int().nonnegative(),durationInFrames:z.number().int().positive(),kind:z.literal('bust'),headline:z.string(),kicker:z.string()}),
 z.object({id:z.string().min(1),from:z.number().int().nonnegative(),durationInFrames:z.number().int().positive(),kind:z.literal('chess'),headline:z.string(),kicker:z.string()}),
 z.object({id:z.string().min(1),from:z.number().int().nonnegative(),durationInFrames:z.number().int().positive(),kind:z.literal('interstitial'),lead:z.string(),accent:z.string()}),
 z.object({id:z.string().min(1),from:z.number().int().nonnegative(),durationInFrames:z.number().int().positive(),kind:z.literal('phone'),headline:z.string(),kicker:z.string(),support:z.string()}),
 z.object({id:z.string().min(1),from:z.number().int().nonnegative(),durationInFrames:z.number().int().positive(),kind:z.literal('typing'),headline:z.string(),kicker:z.string()}),
 z.object({id:z.string().min(1),from:z.number().int().nonnegative(),durationInFrames:z.number().int().positive(),kind:z.literal('cta'),headline:z.string()})
]);
export const editorialProject=z.object({id:z.string(),format:z.object({width:z.literal(1920),height:z.literal(1080),fps:z.union([z.literal(30),z.literal(60)]),durationInFrames:z.number().int().positive()}),scenes:z.array(shotSchema).min(1)}).parse(sceneData);
