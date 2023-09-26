<template>
  <div>
    <h3>{{ props.title }}</h3>
    <p>{{ props.value ?? 'Not Enough Data' }}</p>
    <p>{{ props.tresholds }}</p>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import { Tresholds } from '~/utils/types'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: String },
  tresholds: { type: Object as PropType<Tresholds>, required: true },
})
</script>

<style scoped></style>
