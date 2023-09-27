<template>
  <div class="meter">
    <div class="meter__percentage" :style="{ width: `${computedPercentage}%` }">
      <div
        class="meter__percentage-child"
        :style="[
          { backgroundColor: percentageBackground },
          { color: percentageColor },
        ]"
      >
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
  tresholds: { type: Object as PropType<Tresholds>, required: true },
  showReversedMeter: Boolean,
  score: { type: String, required: true },
})

// Note:
// The following displays the correct position of the meter bar.
// However, with the 1/3 meter design, it would make it seem like it's not rendering correctly.
// To fix this, the bars (meter__unit) would have to change from a 1fr with in the grid to the correct
// proportion of each segment depending on the tresholds given.

// Example:
// lowWidth = (treshold[1]-treshold[0]) / (treshold[3]-treshold[0])
// mediumWidth = ...
// highWidth = ...

// Styling:
// .medium__container {grid-template-columns: lowWidth mediumWidh highWidth;}

const computedPercentage: ComputedRef<number> = computed(() => {
  const min = +props.tresholds[0]
  const max = +props.tresholds[3]
  const fullValue = max - min
  return ((+props.percentage - min) / fullValue) * 100
})

const percentageBackground: ComputedRef<string> = computed(() => {
  if (props.score === 'low')
    return props.showReversedMeter ? Colors.GREEN : Colors.RED
  if (props.score === 'medium') return Colors.YELLOW
  else return props.showReversedMeter ? Colors.RED : Colors.GREEN
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
</style>
