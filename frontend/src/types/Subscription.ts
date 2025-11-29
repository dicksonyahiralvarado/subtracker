export type Currency = 'USD' | 'HNL';
export type Frequency = 'MONTHLY' | 'ANNUAL';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  frequency: Frequency;
  paymentDate?: number | null;
  createdAt: string;
  updatedAt: string;
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

export interface SubscriptionWithMonthly extends Subscription {
  monthlyEquivalent: number;
}

export interface TotalsResponse {
  totalMonthlyHNL: number;
  totalMonthlyUSD: number;
  totalCombinedHNL: number;
  totalCombinedUSD: number;
  exchangeRate: number;
  subscriptions: SubscriptionWithMonthly[];
}
