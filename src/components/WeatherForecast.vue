<template>
  <div class="col p-2 text-light">
    <h3>{{ weekDay }}</h3>
    <img :src="weatherIcon" />
    <p>
      {{ max }}° <span class="text-primary">{{ min }}°</span>
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    weekDay: {
      type: String,
      required: true,
    },
    max: {
      type: String,
      required: true,
    },
    min: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const weatherIcon = computed(
      () => `http://openweathermap.org/img/wn/${props.icon}@2x.png`,
    );

    return {
      weatherIcon,
    };
  },
});
</script>

<style></style>
