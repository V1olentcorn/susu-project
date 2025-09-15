<template>
  <div
    ref="containerRef"
    class="w-full h-full relative z-[100] rounded-lg bg-transparent overflow-visible"
  >
    <div
      v-for="(image, i) in images"
      :key="`${variant}-${i}`"
      class="content__img w-[190px] aspect-[1.1] rounded-[15px] absolute top-0 left-0 opacity-0 overflow-hidden [will-change:transform,filter]"
    >
      <div
        class="content__img-inner bg-center bg-cover w-[calc(100%+20px)] h-[calc(100%+20px)] absolute top-[-10px] left-[-10px]"
        :style="`background-image: url(${image})`"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { variantMap } from "./trail-variants";

export type VariantType = "type1" | "type2" | "type3" | "type4" | "type5" | "type6" | "type7";

interface Props {
  images?: string[];
  variant?: VariantType;
}

interface TrailVariantInstance {
  destroy: () => void;
}

const { images = [], variant = "type1" } = defineProps<Props>();

const containerRef = ref<HTMLDivElement | null>(null);
let currentInstance: TrailVariantInstance | null = null;

function initializeVariant() {
  if (!containerRef.value) return;

  // Clean up previous instance
  if (currentInstance) {
    currentInstance.destroy();
    currentInstance = null;
  }

  const Variant = variantMap[variant] ?? variantMap.type1;
  currentInstance = new Variant(containerRef.value);
}

onMounted(() => {
  initializeVariant();
});

watch(
  () => variant,
  () => {
    initializeVariant();
  }
);

watch(
  () => images,
  () => {
    initializeVariant();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  if (currentInstance) {
    currentInstance.destroy();
    currentInstance = null;
  }
});
</script>