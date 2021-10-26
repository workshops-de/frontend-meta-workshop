<template>
  <section class="notes">
    <div class="container mt-5">
      <div class="row">
        <div class="col-sm">
          <form
            class="needs-validation text-left"
            :class="formClasses"
            novalidate
            ref="form"
            @submit.prevent="submit"
          >
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control"
                v-model="state.note.title"
                required
                autofocus
              />
              <div class="invalid-feedback">Please enter a valid title.</div>
            </div>
            <div class="form-group">
              <label for="text">Note</label>
              <textarea
                class="form-control"
                v-model="state.note.text"
                cols="50"
                rows="8"
                required
              ></textarea>
              <div class="invalid-feedback">Please enter your note.</div>
            </div>
            <div class="form-group">
              <label for="color">Color</label>
              <select class="form-control" v-model="state.note.color" required>
                <option value="">Select a color</option>
                <option value="danger">Red</option>
                <option value="success">Green</option>
                <option value="primary">Blue</option>
                <option value="warning">Yellow</option>
              </select>
              <div class="invalid-feedback">Please select a valid color.</div>
            </div>
            <button type="submit" class="btn btn-primary mt-2">Submit</button>
          </form>
        </div>
      </div>
      <div class="row mt-5">
        <NotesItem
          v-for="note in state.notes"
          :key="note.id"
          v-bind="note"
          @removed="remove"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import moment from 'moment';
import NotesItem from '@/components/NotesItem.vue';
import generateId from '@/utils/generate-id';

import { NotesState, Note } from '@/interfaces/notes';
import { useStore } from 'vuex';

moment.locale('de');

export default defineComponent({
  name: 'Notes',
  components: {
    NotesItem,
  },
  setup() {
    const store = useStore();

    const state = reactive<NotesState>({
      notes: computed({
        get() {
          return store.state.notes;
        },
        set(notes) {
          store.dispatch('SET_NOTES', notes);
        },
      }),
      note: {
        title: '',
        text: '',
        color: '',
      },
      valid: true,
    });
    const formClasses = computed(() => (state.valid ? [] : ['was-validated']));
    const form = ref<HTMLFormElement>();

    function submit() {
      state.valid = form.value?.checkValidity() ?? false;
      if (!state.valid) {
        return;
      }

      state.notes = [
        ...state.notes,
        {
          id: generateId(),
          title: state.note.title,
          text: state.note.text,
          color: state.note.color,
          date: moment().valueOf(),
        },
      ];

      state.note = {
        title: '',
        text: '',
        color: '',
      };
    }

    function remove({ id }: { id: string }) {
      state.notes = state.notes.filter((note: Note) => note.id !== id);
    }

    return {
      state,
      submit,
      remove,
      form,
      formClasses,
    };
  },
});
</script>
