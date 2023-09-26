<template>
  <div>
    <HealthScore
      v-for="({ title, value, tresholds }, index) in data"
      :key="index"
      :title="title"
      :value="value"
      :tresholds="tresholds"
    />
  </div>
</template>

<script setup lang="ts">
import { HealthScore } from './utils/types'

const data: HealthScore[] = [
  {
    title: 'Engagement',
    value: '0.19',
    tresholds: ['0.05', '0.10', '0.15', '0.20'],
  },
  {
    title: 'Engagement',
    value: null,
    tresholds: ['0.05', '0.10', '0.15', '0.20'],
  },
]
</script>
