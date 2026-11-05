import { ValueTransformer } from 'typeorm';

export class PriceTransformer implements ValueTransformer {
  to(data?: number | null): number | null {
    if (data === undefined || data === null) return null;
    return data;
  }

  from(data?: string | number | null): number {
    if (data === undefined || data === null) return 0;
    return typeof data === 'number' ? data : parseFloat(data);
  }
}
