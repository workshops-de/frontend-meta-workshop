<template>
  <section id="dashboard">
    <div class="container mt-5">
      <div class="row">
        <div class="col col-4">
          <div class="card mx-auto mb-3">
            <h4 class="card-header">Notes</h4>

            <div class="card-body text-dark">
              <div class="row">
                <NotesItem
                  v-for="note in state.notes"
                  :key="note.id"
                  v-bind="note"
                  :hide-delete="true"
                  class="col-sm-12"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col col-4">
          <div class="card mx-auto mb-3">
            <h4 class="card-header">Weather</h4>

            <div class="card-body bg-primary text-dark">
              <WeatherInfo :weather="state.weather" />
            </div>
          </div>
        </div>
        <div class="col col-4">
          <div class="card mx-auto mb-3">
            <h4 class="card-header">Selfie</h4>

            <div class="card-body text-dark">
              <img
                :src="state.selfie"
                alt=""
                class="dashboard__selfie"
                v-show="state.selfie"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import NotesItem from '@/components/NotesItem.vue';
import WeatherInfo from '@/components/WeatherInfo.vue';

export default defineComponent({
  name: 'Home',
  components: {
    NotesItem,
    WeatherInfo,
  },
  setup() {
    const store = useStore();

    const state = reactive({
      notes: computed(() => store.state.notes.slice(0, 2)),
      weather: computed(() => store.state.weather.data),
      selfie: computed(() => store.state.selfie),
    });

    return {
      state,
    };
  },
});
</script>

<style lang="scss">
.dashboard {
  &__selfie {
    width: 100%;
  }
}
</style>
