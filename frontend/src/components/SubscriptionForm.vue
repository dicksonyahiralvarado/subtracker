<script setup lang="ts">
import { ref } from 'vue';
import type { CreateSubscriptionDTO, UpdateSubscriptionDTO, Subscription, Currency, Frequency } from '../types/Subscription';

interface Props {
  editingSubscription?: Subscription | null;
}

interface Emits {
  (e: 'submit', data: CreateSubscriptionDTO | UpdateSubscriptionDTO): void;
  (e: 'cancel'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const name = ref(props.editingSubscription?.name || '');
const price = ref(props.editingSubscription?.price || 0);
const currency = ref<Currency>(props.editingSubscription?.currency || 'USD');
const frequency = ref<Frequency>(props.editingSubscription?.frequency || 'MONTHLY');
const paymentDate = ref(props.editingSubscription?.paymentDate || undefined);

const handleSubmit = () => {
  const data = {
    name: name.value,
    price: Number(price.value),
    currency: currency.value,
    frequency: frequency.value,
    paymentDate: paymentDate.value ? Number(paymentDate.value) : undefined,
  };
  
  emit('submit', data);
  resetForm();
};

const resetForm = () => {
  name.value = '';
  price.value = 0;
  currency.value = 'USD';
  frequency.value = 'MONTHLY';
  paymentDate.value = undefined;
};

const handleCancel = () => {
  resetForm();
  emit('cancel');
};
</script>

<template>
  <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl p-6 border border-cyan-500/30">
    <h3 class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
      {{ editingSubscription ? 'Editar Suscripción' : 'Nueva Suscripción' }}
    </h3>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-cyan-300 mb-2">
          Nombre *
        </label>
        <input
          v-model="name"
          type="text"
          required
          placeholder="Ej: Netflix, Spotify, Gimnasio..."
          class="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-slate-500 transition-all"
        />
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-cyan-300 mb-2">
            Precio *
          </label>
          <input
            v-model="price"
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="0.00"
            class="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-slate-500 transition-all"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-cyan-300 mb-2">
            Moneda *
          </label>
          <select
            v-model="currency"
            class="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white transition-all"
          >
            <option value="USD" class="bg-slate-800">USD ($)</option>
            <option value="HNL" class="bg-slate-800">HNL (L)</option>
          </select>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-cyan-300 mb-2">
            Frecuencia *
          </label>
          <select
            v-model="frequency"
            class="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white transition-all"
          >
            <option value="MONTHLY" class="bg-slate-800">Mensual</option>
            <option value="ANNUAL" class="bg-slate-800">Anual</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-cyan-300 mb-2">
            Día de Pago (1-31)
          </label>
          <input
            v-model="paymentDate"
            type="number"
            min="1"
            max="31"
            placeholder="Ej: 15"
            class="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-slate-500 transition-all"
          />
        </div>
      </div>
      
      <div class="flex gap-3 pt-4">
        <button
          type="submit"
          class="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all font-semibold shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
        >
          {{ editingSubscription ? 'Actualizar' : 'Crear' }}
        </button>
        
        <button
          v-if="editingSubscription"
          type="button"
          @click="handleCancel"
          class="flex-1 bg-slate-700/50 text-slate-300 py-3 px-6 rounded-lg hover:bg-slate-700 transition-all font-semibold border border-slate-600"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>
