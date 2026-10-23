import type {z} from 'zod';
import {assetRequestSchema} from '../contracts';

export type AssetRequest = z.infer<typeof assetRequestSchema>;
export type AssetProviderId = AssetRequest['provider'];

export type AssetProviderResult = {
  provider: AssetProviderId;
  requestId: string;
  outputPath: string;
  metadata?: Record<string, string | number | boolean>;
};

/** Provider adapters implement this contract; invoking them is always an explicit production action. */
export interface AssetProvider {
  readonly id: AssetProviderId;
  generate(request: AssetRequest): Promise<AssetProviderResult>;
}
