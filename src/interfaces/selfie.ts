import { WritableComputedRef } from 'vue';

export interface SelfieState {
  stream: MediaStream | null;
  showCamera: boolean;
  showTrash: boolean;
  showImage: boolean;
  imageSrc: WritableComputedRef<string>;
}
