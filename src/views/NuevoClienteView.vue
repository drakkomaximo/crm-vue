<script setup>
import ClienteService from "@/services/ClienteServices";
import { FormKit } from "@formkit/vue";
import { useRouter} from "vue-router";
import RouterLink from "@/components/ui/RouterLink.vue";
import Heading from "@/components/ui/Heading.vue";

const router = useRouter();

defineProps({
  titulo: String,
});

const handleSubmit = (data) => {
  data.estado = 1;
  ClienteService.agregarCliente(data)
  .then(respuesta => {
    console.log(respuesta);
    router.push({ name: "inicio" });
  })
  .catch( error => console.log(error.response.data));
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
          submit-label="Agregar Cliente"
          incomplete-message="Por favor, completa todos los campos"
          @submit="handleSubmit"
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
          />

          <FormKit
            type="text"
            label="Empresa"
            name="empresa"
            placeholder="Empresa del cliente"
          />

          <FormKit
            type="text"
            label="Puesto"
            name="puesto"
            placeholder="Puesto del cliente"
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