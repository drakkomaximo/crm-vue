<script setup>
import { ref, onMounted, computed } from "vue";
import ClienteService from "@/services/ClienteServices";
import RouterLink from "@/components/ui/RouterLink.vue";
import Heading from "@/components/ui/Heading.vue";
import Cliente from "@/components/Cliente.vue";

const clientes = ref([]);

onMounted(() => {
  ClienteService.obtenerClientes()
    .then(({ data }) => {
      clientes.value = data;
    })
    .catch((error) => console.log(error));
});

defineProps({
  titulo: String,
});

const existeClientes = computed(() => clientes.value.length > 0);

const actualizarEstadoCliente = ({id, estado}) => {
  ClienteService.cambiarEstadoCliente(id, !estado)
    .then(() => {
      const index = clientes.value.findIndex((cliente) => cliente.id === id);
      clientes.value[index].estado = !estado;
    })
    .catch((error) => console.log(error));
};

const eliminarCliente = (id) => {
  if(confirm("¿Estás seguro de eliminar este cliente?")) {
    ClienteService.eliminarCliente(id)
      .then(() => {
        clientes.value = clientes.value.filter((cliente) => cliente.id !== id);
      })
      .catch((error) => console.log(error));
  }
};

</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="agregar-cliente"> Agregar Cliente </RouterLink>
    </div>

    <Heading>{{ titulo }}</Heading>

    <div
      v-if="existeClientes"
      class="flow-root mx-auto mt-10 p-5 bg-white shadow"
    >
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="p-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  class="p-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Empresa
                </th>
                <th
                  scope="col"
                  class="p-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  class="p-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <Cliente
                v-for="cliente in clientes"
                :key="cliente.id"
                :cliente="cliente"
                @actualizar-estado-cliente="actualizarEstadoCliente"
                @eliminar-cliente="eliminarCliente"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <h2>No hay Clientes</h2>
    </div>
  </div>
</template>
