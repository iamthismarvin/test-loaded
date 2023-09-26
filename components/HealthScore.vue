<template>
  <div class="health-score">
    <p class="health-score__title">{{ title }}</p>
    <p class="health-score__score">{{ score || '---' }}</p>
    <div class="health-score__meter">
      <HealthScoreMeter
        v-if="value && score"
        :percentage="value"
        :tresholds="tresholds"
        :score="score"
        :show-reversed-meter="showReversedMeter"
      />
      <div v-else>Not Enough Data</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: String, default: null },
  tresholds: { type: Object as PropType<Tresholds>, required: true },
  showReversedMeter: { type: Boolean, default: false },
})

const score: ComputedRef<Score | null> = computed(() => {
  if (props.value) {
    if (
      +props.value >= +props.tresholds[0] &&
      +props.value < +props.tresholds[1]
    ) {
      return 'low'
    } else if (
      +props.value >= +props.tresholds[1] &&
      +props.value < +props.tresholds[2]
    )
      return 'medium'
    else return 'high'
  } else return null
})
</script>

<style scoped>
.health-score {
  background-color: #202a44;
  border-radius: 0.25rem;
  padding: 0.75rem;
  width: 300px;
}

.health-score__meter {
  background-color: #26314d;
  border-radius: 0.25rem;
  padding: 1rem;
}

.health-score__score {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}

.health-score__title {
  color: #bdc0c6;
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0.75rem 0;
  text-transform: uppercase;
}
</style>
