<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

defineEmits(["actualizar-estado-cliente", "eliminar-cliente"]);

const props = defineProps({
  cliente: {
    type: Object,
    required: true,
  },
});

const nombreCompleto = computed(
  () => `${props.cliente.nombre} ${props.cliente.apellido}`
);
const estado = computed(() => !!props.cliente.estado);
const empresa = computed(() =>
  props.cliente.empresa ? props.cliente.empresa : "No especificada"
);
</script>

<template>
  <tr>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
      <p class="font-medium text-gray-900">{{ nombreCompleto }}</p>
      <p class="text-gray-500">{{ cliente.correo }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <p class="text-gray-900 font-bold">{{ empresa }}</p>
      <p class="text-gray-600">{{ cliente.puesto }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm">
      <button
        class="px-2 py-1 text-white text-xs font-bold rounded-full"
        :class="[
          estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
        ]"
        @click="$emit('actualizar-estado-cliente', { id: cliente.id, estado})"
      >
        {{ estado ? "Activo" : "Inactivo" }}
      </button>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <RouterLink
        :to="{ name: 'editar-cliente', params: { id: cliente.id } }"
        class="text-indigo-600 hover:text-indigo-900 cursor-pointer mr-6"
        >Editar</RouterLink
      >

      <button 
        class="text-red-600 hover:text-red-900 cursor-pointer"
        @click="$emit('eliminar-cliente', cliente.id)"
        >
        Eliminar
      </button>
    </td>
  </tr>
</template>
