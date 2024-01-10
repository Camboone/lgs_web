<script setup lang="ts">
import { defineProps } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  label: String,
  link: String,
  value: String,
  icon: String,
  is_reorder: Boolean,
});

const openLink = () => {
  window.open(props.link, '_blank');
};

</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="flex flex-row p-3 justify-between items-center">
      <div class="flex flex-row items-center">
        <div v-if="is_reorder" class="light:bg-white h-full p-3">
          <Icon icon="eva:menu-2-outline" :style="{ fontSize: '24px' }"/>
        </div>
        <div class="avatar">
          <div class="w-16 rounded-md">
            <img :src="icon"  alt="logo"/>
          </div>
        </div>
        <div>
          <div class="flex flex-col h-full justify-center px-3">
            <p class="font-normal"> {{ label }} </p>
            <span class="text-sm text-opacity-50 dark:text-gray-500 text-gray-700"> {{ value }} </span>
          </div>
        </div>
      </div>
      <button class="btn" @click="openLink">
        <Icon icon="material-symbols:arrow-forward-ios-rounded" />
      </button>
    </div>
  </div>
</template>
