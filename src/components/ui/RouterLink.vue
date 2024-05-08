<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <RouterLink
      :to="{ name: to }"
      class="bg-slate-500 text-white px-4 py-2 rounded-md uppercase font-semibold inline-block mt-4 cursor-pointer hover:bg-slate-600 transition-colors duration-300"
    >
      <slot></slot>
    </RouterLink>
  </div>
</template>
