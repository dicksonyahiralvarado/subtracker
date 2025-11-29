import { ref, computed } from 'vue';
import type { Subscription, CreateSubscriptionDTO, UpdateSubscriptionDTO, TotalsResponse } from '../types/Subscription';

const API_URL = 'http://localhost:3000/api/subscriptions';

export function useSubscriptions() {
  const subscriptions = ref<Subscription[]>([]);
  const totals = ref<TotalsResponse | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Cargar todas las suscripciones
  const fetchSubscriptions = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al cargar suscripciones');
      subscriptions.value = await response.json();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido';
    } finally {
      loading.value = false;
    }
  };

  // Cargar totales
  const fetchTotals = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${API_URL}/totals`);
      if (!response.ok) throw new Error('Error al cargar totales');
      totals.value = await response.json();
      subscriptions.value = totals.value?.subscriptions || [];
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido';
    } finally {
      loading.value = false;
    }
  };

  // Crear suscripción
  const createSubscription = async (data: CreateSubscriptionDTO) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear suscripción');
      }
      await fetchTotals(); // Recargar con totales
      return true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido';
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Actualizar suscripción
  const updateSubscription = async (id: string, data: UpdateSubscriptionDTO) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar suscripción');
      }
      await fetchTotals(); // Recargar con totales
      return true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido';
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Eliminar suscripción
  const deleteSubscription = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar suscripción');
      }
      await fetchTotals(); // Recargar con totales
      return true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido';
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Computed: Total mensual estimado
  const totalMonthlyEstimated = computed(() => {
    return totals.value?.totalCombinedHNL || 0;
  });

  return {
    subscriptions,
    totals,
    loading,
    error,
    totalMonthlyEstimated,
    fetchSubscriptions,
    fetchTotals,
    createSubscription,
    updateSubscription,
    deleteSubscription,
  };
}
