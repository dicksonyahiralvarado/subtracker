import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { CreateSubscriptionDTO, UpdateSubscriptionDTO } from '../types/subscription.types';

// GET all subscriptions
export const getAllSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching subscriptions' });
  }
};

// GET single subscription by ID
export const getSubscriptionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subscription = await prisma.subscription.findUnique({
      where: { id }
    });
    
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching subscription' });
  }
};

// POST create new subscription
export const createSubscription = async (req: Request, res: Response) => {
  try {
    const data: CreateSubscriptionDTO = req.body;
    
    // Validation
    if (!data.name || !data.price || !data.currency || !data.frequency) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (!['USD', 'HNL'].includes(data.currency)) {
      return res.status(400).json({ error: 'Invalid currency. Must be USD or HNL' });
    }
    
    if (!['MONTHLY', 'ANNUAL'].includes(data.frequency)) {
      return res.status(400).json({ error: 'Invalid frequency. Must be MONTHLY or ANNUAL' });
    }
    
    if (data.paymentDate && (data.paymentDate < 1 || data.paymentDate > 31)) {
      return res.status(400).json({ error: 'Payment date must be between 1 and 31' });
    }
    
    const subscription = await prisma.subscription.create({
      data: {
        name: data.name,
        price: data.price,
        currency: data.currency,
        frequency: data.frequency,
        paymentDate: data.paymentDate || null
      }
    });
    
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'Error creating subscription' });
  }
};

// PUT/PATCH update subscription
export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: UpdateSubscriptionDTO = req.body;
    
    // Check if subscription exists
    const existing = await prisma.subscription.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    
    // Validation
    if (data.currency && !['USD', 'HNL'].includes(data.currency)) {
      return res.status(400).json({ error: 'Invalid currency. Must be USD or HNL' });
    }
    
    if (data.frequency && !['MONTHLY', 'ANNUAL'].includes(data.frequency)) {
      return res.status(400).json({ error: 'Invalid frequency. Must be MONTHLY or ANNUAL' });
    }
    
    if (data.paymentDate && (data.paymentDate < 1 || data.paymentDate > 31)) {
      return res.status(400).json({ error: 'Payment date must be between 1 and 31' });
    }
    
    const subscription = await prisma.subscription.update({
      where: { id },
      data
    });
    
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'Error updating subscription' });
  }
};

// DELETE subscription
export const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if subscription exists
    const existing = await prisma.subscription.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    
    await prisma.subscription.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting subscription' });
  }
};
