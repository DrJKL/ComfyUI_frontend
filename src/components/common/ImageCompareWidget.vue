<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<template>
  <ImageCompare v-if="!oneError && !twoError">
    <template #left>
      <span v-if="oneLoading">Loading Image</span>
      <span v-else-if="oneError">Image Failed to Load</span>
      <img v-else :src="imageOne" alt="" :class="imageClasses" />
    </template>
    <template #right>
      <span v-if="twoLoading">Loading Image</span>
      <span v-else-if="twoError">Image Failed to Load</span>
      <img v-else :src="imageTwo" alt="" :class="imageClasses" />
    </template>
  </ImageCompare>
  <div v-else class="size-full grid place-content-center">
    Could not load images to compare
  </div>
</template>

<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { ImageCompare } from 'primevue'

export interface Props {
  imageOne: string
  imageTwo: string
}

const { imageOne, imageTwo } = defineProps<Props>()

const imageClasses = 'object-cover'

const { isLoading: oneLoading, error: oneError } = useImage({ src: imageOne })
const { isLoading: twoLoading, error: twoError } = useImage({ src: imageTwo })
console.log({ oneLoading, oneError, twoLoading, twoError })
</script>
