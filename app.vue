<template>
  <div class="app">
    <HealthScore
      v-for="({ title, value, tresholds, showReversedMeter }, index) in data"
      :key="index"
      :title="title"
      :value="value!"
      :tresholds="tresholds"
      :show-reversed-meter="showReversedMeter"
    />
  </div>
</template>

<script setup lang="ts">
const data: HealthScoreExtended[] = [
  {
    title: 'Engagement',
    value: '0.15',
    tresholds: ['0.05', '0.10', '0.15', '0.20'],
  },
  {
    title: 'Retention',
    value: null,
    tresholds: ['0.05', '0.10', '0.15', '0.20'],
  },
  {
    title: 'Exit Rate',
    value: '0.75',
    tresholds: ['0.10', '0.20', '0.50', '0.80'],
    showReversedMeter: true,
  },
  {
    title: 'Other',
    value: '0.25',
    tresholds: ['0.10', '0.20', '0.50', '0.80'],
  },
]
</script>

<style scoped>
.app {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(3, 1fr);
  width: fit-content;
}
</style>
