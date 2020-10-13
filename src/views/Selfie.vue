<template>
  <section class="selfie">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col col-6">
          <div class="video-container text-dark">
            <video
              v-if="state.stream"
              autoplay
              class="video-container__video"
              style="--grayscale: 0; --blur: 0px; --hue: 0deg"
              ref="video"
              :srcObject="state.stream"
            ></video>
            <canvas ref="canvas" class="video-container__canvas"></canvas>
            <img
              :src="state.imageSrc"
              alt=""
              class="video-container__image"
              v-show="state.showImage"
            />
            <button
              class="video-container__btn video-container__btn--delete"
              v-show="state.showTrash"
              @click.prevent="reset"
            >
              <i class="fa fa-trash-alt"></i>
            </button>
            <button
              class="video-container__btn video-container__btn--shoot"
              v-show="state.showCamera"
              @click.prevent="takePicture"
            >
              <i class="fa fa-camera"></i>
            </button>
          </div>
          <form class="video-container__form">
            <label class="video-container__label" for="slider-grayscale"
              >Grayscale</label
            >
            <input
              type="range"
              name="grayscale"
              min="0"
              max="10"
              value="0"
              class="video-container_input"
              @input="sliderOnInput"
            />

            <label for="slider-hue">Hue</label>
            <input
              type="range"
              name="hue"
              min="0"
              max="36"
              value="0"
              class="video-container__input"
              @input="sliderOnInput"
            />

            <label class="video-container__label" for="slider-blur">Blur</label>
            <input
              type="range"
              name="blur"
              min="0"
              max="10"
              value="0"
              class="video-container__input"
              @input="sliderOnInput"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { SelfieState } from '@/interfaces/selfie';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Selfie',
  setup() {
    const store = useStore();

    const state = reactive<SelfieState>({
      stream: null,
      showTrash: false,
      showCamera: true,
      showImage: false,
      imageSrc: computed({
        get() {
          return store.state.selfie;
        },
        set(src) {
          store.dispatch('SET_SELFIE', src);
        },
      }),
    });
    const canvas = ref<HTMLCanvasElement>();
    const video = ref<HTMLVideoElement>();

    let blurValue = '0px';
    let grayscaleValue = 0;
    let hueValue = '0deg';

    function updateGrayscale(value: number) {
      grayscaleValue = value;
      video.value?.style.setProperty('--grayscale', value.toString());
    }

    function updateHue(value: string) {
      hueValue = value;
      video.value?.style.setProperty('--hue', value);
    }

    function updateBlur(value: string) {
      blurValue = value;
      video.value?.style.setProperty('--blur', value);
    }

    function sliderOnInput(e: InputEvent) {
      const { value } = e.target as HTMLInputElement;
      switch ((e.target as HTMLInputElement).name) {
        case 'grayscale':
          updateGrayscale(parseInt(value, 10) / 10);
          break;
        case 'hue':
          updateHue(`${parseInt(value, 10) * 10}deg`);
          break;
        case 'blur':
          updateBlur(`${value}px`);
          break;
      }
    }

    function reset() {
      state.showImage = false;
      state.showTrash = false;
      state.showCamera = true;
    }

    function takePicture() {
      const context = canvas.value?.getContext('2d');
      if (context && canvas.value && video.value) {
        canvas.value.width = video.value.videoWidth;
        canvas.value.height = video.value.videoHeight;
        context.filter = `grayscale(${grayscaleValue}) blur(${blurValue}) hue-rotate(${hueValue})`;
        context.drawImage(video.value, 0, 0);

        state.imageSrc = canvas.value.toDataURL('image/png');

        state.showImage = true;
        state.showTrash = true;
        state.showCamera = false;
      }
    }

    async function getVideoStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 600,
            height: 600,
          },
        });
        state.stream = stream;
      } catch (err) {
        console.error(err.message);
      }
    }

    //ts-lint ignore-next-lint
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      getVideoStream();
    }

    return {
      state,
      reset,
      takePicture,
      canvas,
      video,
      sliderOnInput,
    };
  },
});
</script>

<style>
.video-container {
  position: relative;
  overflow: hidden;
  border: 20px solid #f0f0f0;
  border-radius: 10px;
}

.video-container__form {
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 1rem;
  font-size: 1.5rem;
}

.video-container__label {
  margin-right: 1rem;
}

.video-container__input {
  flex-grow: 1;
}

.video-container__video {
  width: 100%;
  height: 100%;
  filter: grayscale(var(--grayscale)) blur(var(--blur)) hue-rotate(var(--hue));
  overflow: hidden;
}

.video-container__btn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  background-color: #333;
  outline: 0;
  border: 0px;
  border-radius: 50%;
  transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out;
}

.video-container__btn--shoot {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}

.video-container__btn--delete {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}

.video-container__btn-shoot:hover {
  color: salmon;
}

.video-container__canvas {
  display: none;
  position: absolute;
  width: 200px;
  height: 200px;
  top: 0;
  left: 0;
  border: 5px solid black;
}

.video-container__image {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.video-container__image--hidden {
  opacity: 0;
}
</style>
