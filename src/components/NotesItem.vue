<template>
  <div class="col col-sm-3">
    <div class="card text-white mb-3" :class="state.bgColor">
      <div class="card-header">
        <h2 class="m-0">{{ title }}</h2>
      </div>
      <div class="card-body">
        <p class="card-text">
          {{ text }}
        </p>
        <small class="card-text text-white-50">
          {{ state.timePassed }}
        </small>
      </div>
      <div class="card-footer" v-if="!hideDelete">
        <a
          href="#"
          class="btn btn-outline-light.btn-light.btn-block"
          @click.prevent="remove"
        >
          Löschen
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue';
import moment from 'moment';

moment.locale('de');

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    hideDelete: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    removed: (payload) => payload.id,
  },
  setup(props, { emit }) {
    const state = reactive({
      bgColor: computed(() => `bg-${props.color}`),
      timePassed: computed(() => moment(props.date).fromNow()),
    });

    function remove() {
      emit('removed', {
        id: props.id,
      });
    }

    return {
      state,
      remove,
    };
  },
});
</script>

<style></style>
