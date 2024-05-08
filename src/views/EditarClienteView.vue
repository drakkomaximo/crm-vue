<script setup>
import { reactive, onMounted } from "vue";
import ClienteService from "@/services/ClienteServices";
import { FormKit } from "@formkit/vue";
import { useRouter, useRoute } from "vue-router";
import RouterLink from "@/components/ui/RouterLink.vue";
import Heading from "@/components/ui/Heading.vue";

const route = useRoute();
const router = useRouter();

const formData = reactive({});

onMounted(() => {
  ClienteService.obtenerCliente(route.params.id)
    .then((respuesta) => {
        Object.assign(formData, respuesta.data);
    })
    .catch((error) => console.log(error.response.data));
});

defineProps({
  titulo: String,
});

const handleSubmit = (data) => {
  ClienteService.editarCliente(route.params.id, data)
    .then(() => {
      router.push({ name: "inicio" });
    })
    .catch((error) => console.log(error.response.data));
};
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="inicio"> Volver </RouterLink>
    </div>

    <Heading>{{ titulo }}</Heading>

    <div class="mx-auto mt-10 bg-white shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6">
        <FormKit
          type="form"
          submit-label="Guardar Cambios"
          incomplete-message="Por favor, completa todos los campos"
          @submit="handleSubmit"
          :value="cliente"
        >
          <FormKit
            type="text"
            label="Nombre"
            name="nombre"
            placeholder="Nombre del cliente"
            validation="required"
            :validation-messages="{
              required: 'El nombre del cliente es requerido',
            }"
            v-model="formData.nombre"
          />

          <FormKit
            type="text"
            label="Apellido"
            name="apellido"
            placeholder="Apellido del cliente"
            validation="required"
            :validation-messages="{
              required: 'El apellido del cliente es requerido',
            }"
            v-model="formData.apellido"
          />

          <FormKit
            type="text"
            label="Correo Electrónico"
            name="correo"
            placeholder="Correo electrónico del cliente"
            validation="required|email"
            :validation-messages="{
              required: 'El correo electrónico del cliente es requerido',
              email: 'El correo electrónico no es válido',
            }"
            v-model="formData.correo"
          />

          <FormKit
            type="text"
            label="Teléfono"
            name="telefono"
            placeholder="Teléfono: XXX-XXX-XXXX"
            validation="?matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
            :validation-messages="{
              matches: 'El teléfono no es válido',
              required: 'El teléfono del cliente es requerido',
            }"
            v-model="formData.telefono"
          />

          <FormKit
            type="text"
            label="Empresa"
            name="empresa"
            placeholder="Empresa del cliente"
            v-model="formData.empresa"
          />

          <FormKit
            type="text"
            label="Puesto"
            name="puesto"
            placeholder="Puesto del cliente"
            v-model="formData.puesto"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style>
.formkit-wrapper {
  max-width: 100%;
}
</style>
