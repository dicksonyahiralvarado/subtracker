<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SubscriptionCard from './SubscriptionCard.vue';
import SubscriptionForm from './SubscriptionForm.vue';
import { useSubscriptions } from '../composables/useSubscriptions';
import type { Subscription, CreateSubscriptionDTO, UpdateSubscriptionDTO } from '../types/Subscription';

const {
  subscriptions,
  totals,
  loading,
  error,
  fetchTotals,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} = useSubscriptions();

const editingSubscription = ref<Subscription | null>(null);
const showForm = ref(false);

onMounted(() => {
  fetchTotals();
});

const handleEdit = (subscription: Subscription) => {
  editingSubscription.value = subscription;
  showForm.value = true;
};

const handleDelete = async (id: string) => {
  if (!confirm('¿Estás seguro de eliminar esta suscripción?')) return;
  await deleteSubscription(id);
};

const handleSubmit = async (data: CreateSubscriptionDTO | UpdateSubscriptionDTO) => {
  let success = false;
  
  if (editingSubscription.value) {
    success = await updateSubscription(editingSubscription.value.id, data as UpdateSubscriptionDTO);
  } else {
    success = await createSubscription(data as CreateSubscriptionDTO);
  }
  
  if (success) {
    editingSubscription.value = null;
    showForm.value = false;
  }
};

const handleCancel = () => {
  editingSubscription.value = null;
  showForm.value = false;
};

const formatCurrency = (amount: number, currency: string) => {
  return `${currency === 'HNL' ? 'L' : '$'} ${amount.toFixed(2)}`;
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
    <!-- Header con Totales -->
    <div class="relative bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-xl border-b border-cyan-500/20 py-12 px-4 shadow-2xl overflow-hidden">
      <!-- Efectos de fondo -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDYsIDE4MiwgMjEyLCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      <div class="max-w-6xl mx-auto relative z-10">
        <h1 class="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          SubTracker
        </h1>
        
        <div v-if="totals" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105">
            <p class="text-sm text-cyan-300/80 mb-2">Total Mensual (HNL)</p>
            <p class="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">{{ formatCurrency(totals.totalCombinedHNL, 'HNL') }}</p>
          </div>
          
          <div class="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105">
            <p class="text-sm text-purple-300/80 mb-2">Total Mensual (USD)</p>
            <p class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">{{ formatCurrency(totals.totalCombinedUSD, 'USD') }}</p>
          </div>
          
          <div class="bg-gradient-to-br from-pink-500/10 to-pink-600/10 backdrop-blur-xl rounded-2xl p-6 border border-pink-500/30 shadow-xl hover:shadow-pink-500/20 transition-all duration-300 hover:scale-105">
            <p class="text-sm text-pink-300/80 mb-2">Tasa de Cambio</p>
            <p class="text-3xl font-bold bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent">1 USD = {{ totals.exchangeRate }} HNL</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Contenido Principal -->
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Error -->
      <div v-if="error" class="mb-6 bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-500/30 text-red-300 px-6 py-4 rounded-xl backdrop-blur-sm">
        {{ error }}
      </div>
      
      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-cyan-500"></div>
        <p class="mt-4 text-cyan-300">Cargando...</p>
      </div>
      
      <template v-else>
        <!-- Botón para mostrar formulario -->
        <div class="mb-8">
          <button
            v-if="!showForm"
            @click="showForm = true"
            class="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all font-bold shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 border border-cyan-400/30"
          >
            Nueva Suscripción
          </button>
        </div>
        
        <!-- Formulario -->
        <div v-if="showForm" class="mb-8">
          <SubscriptionForm
            :editing-subscription="editingSubscription"
            @submit="handleSubmit"
            @cancel="handleCancel"
          />
        </div>
        
        <!-- Lista de Suscripciones -->
        <div v-if="subscriptions.length === 0" class="text-center py-20">
          <p class="text-cyan-300/70 text-xl mb-2">No hay suscripciones registradas</p>
          <p class="text-slate-500">Crea tu primera suscripción para comenzar</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SubscriptionCard
            v-for="subscription in subscriptions"
            :key="subscription.id"
            :subscription="subscription"
            @edit="handleEdit"
            @delete="handleDelete"
          />
        </div>
      </template>
    </div>
  </div>
</template>
