<script setup lang="ts">
import type { Subscription } from '../types/Subscription';

interface Props {
  subscription: Subscription;
}

interface Emits {
  (e: 'edit', subscription: Subscription): void;
  (e: 'delete', id: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formatPrice = (price: number, currency: string) => {
  return `${currency === 'HNL' ? 'L' : '$'} ${price.toFixed(2)}`;
};

const getFrequencyText = (frequency: string) => {
  return frequency === 'MONTHLY' ? 'Mensual' : 'Anual';
};
</script>

<template>
  <div class="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-cyan-500/20 overflow-hidden group">
    <!-- Efecto de brillo en hover -->
    <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div class="relative z-10">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{{ subscription.name }}</h3>
          <p class="text-sm text-cyan-300/70">
            {{ getFrequencyText(subscription.frequency) }}
            <span v-if="subscription.paymentDate"> • Día {{ subscription.paymentDate }}</span>
          </p>
        </div>
        <div class="flex gap-2">
          <button 
            @click="emit('edit', subscription)"
            class="text-cyan-400 hover:text-cyan-300 p-2 rounded-lg hover:bg-cyan-500/20 transition-all duration-200 backdrop-blur-sm"
            title="Editar"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            @click="emit('delete', subscription.id)"
            class="text-pink-400 hover:text-pink-300 p-2 rounded-lg hover:bg-pink-500/20 transition-all duration-200 backdrop-blur-sm"
            title="Eliminar"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <div class="flex items-baseline gap-2">
        <span class="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {{ formatPrice(subscription.price, subscription.currency) }}
        </span>
        <span class="text-cyan-300/60">
          / {{ subscription.frequency === 'MONTHLY' ? 'mes' : 'año' }}
        </span>
      </div>
      
      <div v-if="subscription.frequency === 'ANNUAL'" class="mt-3 text-sm text-purple-300/80 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20">
        ≈ {{ formatPrice(subscription.price / 12, subscription.currency) }} / mes
      </div>
    </div>
  </div>
</template>
