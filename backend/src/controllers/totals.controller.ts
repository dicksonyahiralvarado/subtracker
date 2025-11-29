import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Tasa de cambio USD a HNL (configurable)
const USD_TO_HNL_RATE = 26;

interface SubscriptionData {
  id: string;
  name: string;
  price: number;
  currency: string;
  frequency: string;
  paymentDate: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export const getSubscriptionTotals = async (req: Request, res: Response) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      orderBy: { createdAt: 'desc' }
    });

    let totalMonthlyHNL = 0;
    let totalMonthlyUSD = 0;

    // Calcular totales normalizados a mensual
    subscriptions.forEach((sub: SubscriptionData) => {
      let monthlyPrice = sub.price;

      // Normalizar precio anual a mensual
      if (sub.frequency === 'ANNUAL') {
        monthlyPrice = sub.price / 12;
      }

      // Sumar según la moneda
      if (sub.currency === 'HNL') {
        totalMonthlyHNL += monthlyPrice;
      } else if (sub.currency === 'USD') {
        totalMonthlyUSD += monthlyPrice;
      }
    });

    // Redondear a 2 decimales
    totalMonthlyHNL = Math.round(totalMonthlyHNL * 100) / 100;
    totalMonthlyUSD = Math.round(totalMonthlyUSD * 100) / 100;

    // Calcular total combinado en HNL
    const totalCombinedHNL = Math.round((totalMonthlyHNL + (totalMonthlyUSD * USD_TO_HNL_RATE)) * 100) / 100;

    // Calcular total combinado en USD
    const totalCombinedUSD = Math.round((totalMonthlyUSD + (totalMonthlyHNL / USD_TO_HNL_RATE)) * 100) / 100;

    res.json({
      totalMonthlyHNL,
      totalMonthlyUSD,
      totalCombinedHNL,
      totalCombinedUSD,
      exchangeRate: USD_TO_HNL_RATE,
      subscriptions: subscriptions.map((sub: SubscriptionData) => ({
        ...sub,
        monthlyEquivalent: sub.frequency === 'ANNUAL' 
          ? Math.round((sub.price / 12) * 100) / 100 
          : sub.price
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating totals' });
  }
};
