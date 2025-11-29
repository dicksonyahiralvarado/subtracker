export type Currency = 'USD' | 'HNL';
export type Frequency = 'MONTHLY' | 'ANNUAL';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  frequency: Frequency;
  paymentDate?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSubscriptionDTO {
  name: string;
  price: number;
  currency: Currency;
  frequency: Frequency;
  paymentDate?: number;
}

export interface UpdateSubscriptionDTO {
  name?: string;
  price?: number;
  currency?: Currency;
  frequency?: Frequency;
  paymentDate?: number;
}
