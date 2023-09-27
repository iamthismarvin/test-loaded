<template>
  <div class="meter">
    <div class="meter__percentage" :style="{ width: `${computedPercentage}%` }">
      <div :class="['meter__percentage-child', percentageStyle]">
        {{ formatPercentage(percentage) }}%
      </div>
    </div>

    <div class="meter__container">
      <div
        class="meter__unit"
        :style="{
          backgroundColor: showReversedMeter ? Colors.GREEN : Colors.RED,
        }"
      ></div>
      <div class="meter__unit"></div>
      <div
        class="meter__unit"
        :style="{
          backgroundColor: showReversedMeter ? Colors.RED : Colors.GREEN,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  percentage: { type: String, required: true },
  thresholds: { type: Object as PropType<Thresholds>, required: true },
  showReversedMeter: Boolean,
  score: { type: String, required: true },
})

// Note:
// The following displays the correct position of the meter bar.
// However, with the 1/3 meter design, it would make it seem like it's not rendering correctly.
// To fix this, the bars (meter__unit) would have to calculate individual sectors in the grid and
// then get the percentage within that sector to position correctly in the meter__unit.
// There are other options, but it would depend on the UX we'd be looking for.

const computedPercentage: ComputedRef<number> = computed(() => {
  const min = +props.thresholds[0]
  const max = +props.thresholds[3]
  const result = ((+props.percentage - min) / (max - min)) * 100

  if (props.score === 'low' && result > 33) return 32.99
  else if (props.score === 'medium' && result <= 33) return 33
  else if (props.score === 'medium' && result > 66) return 65.99
  else if (props.score === 'high' && result <= 66) return 66
  return result
})

const percentageStyle: ComputedRef<string> = computed(() => {
  if (props.score === 'low')
    return props.showReversedMeter ? 'percentage--green' : 'percentage--red'
  if (props.score === 'medium') return 'percentage--yellow'
  else return props.showReversedMeter ? 'percentage--red' : 'percentage--green'
})

const formatPercentage = (percentage: string) => {
  return typeof +percentage === 'number'
    ? (+percentage * 100).toFixed(0)
    : percentage
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
  display: flex;
  font-weight: bold;
  font-size: 0.9rem;
  justify-content: flex-end;
  position: absolute;
  transform: translateY(0.25rem);
  width: 100%;
}

.meter__percentage-child {
  border-radius: 0.25rem;
  padding: 0.25rem;
  transform: translateX(50%);
}

.meter__unit {
  background-color: #ffc341;
  border-radius: 0.25rem;
  height: 3px;
}

.percentage--green {
  background-color: #60cd8d;
}

.percentage--red {
  background-color: #e40039;
  color: white;
}

.percentage--yellow {
  background-color: #ffc341;
}

.percentage--green,
.percentage--yellow {
  color: #182034;
}
</style>
