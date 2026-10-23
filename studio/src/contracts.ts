import {z} from 'zod';

export const sceneSchema = z.discriminatedUnion('kind', [
  z.object({id: z.string().min(1), kind: z.literal('editorial-card'), from: z.number().int().nonnegative(), durationInFrames: z.number().int().positive(), title: z.string().min(1), kicker: z.string().optional(), body: z.string().optional(), transition: z.enum(['cut', 'paper-wipe']).default('cut')}),
  z.object({id: z.string().min(1), kind: z.literal('image-panel'), from: z.number().int().nonnegative(), durationInFrames: z.number().int().positive(), image: z.string().min(1), title: z.string().optional(), transition: z.enum(['cut', 'paper-wipe']).default('cut')}),
  z.object({id: z.string().min(1), kind: z.literal('stat-card'), from: z.number().int().nonnegative(), durationInFrames: z.number().int().positive(), label: z.string().min(1), value: z.string().min(1), note: z.string().optional(), transition: z.enum(['cut', 'paper-wipe']).default('cut')}),
]);

export const assetRequestSchema = z.object({
  id: z.string().min(1),
  provider: z.enum(['fal', 'lumean']),
  kind: z.enum(['image', 'video', 'voice', 'foley', 'music']),
  model: z.string().min(1),
  prompt: z.string().min(1),
  outputPath: z.string().min(1),
});

export const projectSchema = z.object({
  schemaVersion: z.literal(1),
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  brief: z.string().min(1),
  fps: z.union([z.literal(30), z.literal(60)]).default(30),
  width: z.literal(1920).default(1920),
  height: z.literal(1080).default(1080),
  style: z.object({background: z.string(), foreground: z.string(), accent: z.string(), muted: z.string()}),
  storyboard: z.array(z.object({sceneId: z.string(), intent: z.string().min(1), narration: z.string().default(''), visualDirection: z.string().default('')})).min(1),
  scenes: z.array(sceneSchema).min(1),
  captions: z.array(z.object({from: z.number().nonnegative(), to: z.number().positive(), text: z.string().min(1)})).default([]),
  audio: z.array(z.object({kind: z.enum(['narration', 'music', 'foley']), src: z.string().min(1), volume: z.number().min(0).max(1).default(1), startFrom: z.number().int().nonnegative().default(0)})).default([]),
  assets: z.array(z.string().min(1)).default([]),
  assetRequests: z.array(assetRequestSchema).default([]),
});

export type VideoProject = z.infer<typeof projectSchema>;
export type Scene = z.infer<typeof sceneSchema>;
