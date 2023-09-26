<template>
  <div class="meter">
    <div
      class="meter__percentage"
      :style="[
        { backgroundColor: percentageBackground },
        { color: percentageColor },
      ]"
    >
      {{ formatPercentage(percentage) }}%
    </div>

    <div class="meter__container">
      <div
        class="meter__unit"
        :style="{ backgroundColor: showReversedMeter ? '#60cd8d' : '#e40039' }"
      ></div>
      <div class="meter__unit"></div>
      <div
        class="meter__unit"
        :style="{ backgroundColor: showReversedMeter ? '#e40039' : '#60cd8d' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  percentage: { type: String, required: true },
  tresholds: { type: Object as PropType<Tresholds>, required: true },
  showReversedMeter: Boolean,
  score: { type: String, required: true },
})

const percentageBackground: ComputedRef<Score> = computed(() => {
  if (props.score === 'low')
    return props.showReversedMeter ? '#60cd8d' : '#e40039'
  if (props.score === 'medium') return '#ffc341'
  else return props.showReversedMeter ? '#e40039' : '#60cd8d'
})
const percentageColor: ComputedRef<string> = computed(() => {
  if (props.showReversedMeter) {
    return props.score === 'low' || props.score === 'medium'
      ? '#182034'
      : 'white'
  } else {
    return props.score === 'high' || props.score === 'medium'
      ? '#182034'
      : 'white'
  }
})

const formatPercentage = (percentage: string) => {
  return typeof +percentage === 'number' ? +percentage * 100 : percentage
}
</script>

<style scoped>
.meter {
  position: relative;
}

.meter__container {
  align-items: center;
  display: grid;
  gap: 0.25rem;
  grid-template-columns: repeat(3, 1fr);
  height: 2rem;
}

.meter__percentage {
  background-color: magenta;
  border-radius: 0.25rem;
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0.25rem;
  position: absolute;
}

.meter__percentage {
  content: attr(value) '%';
}

.meter__unit {
  background-color: #ffc341;
  border-radius: 0.25rem;
  height: 3px;
}
</style>
