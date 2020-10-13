import { WritableComputedRef } from 'vue';

export interface Note {
  id: string;
  title: string;
  text: string;
  color: string;
  date: number;
}

export interface NotesState {
  notes: WritableComputedRef<Note[]>;
  note: {
    title: string;
    text: string;
    color: string;
  };
  valid: boolean;
}
