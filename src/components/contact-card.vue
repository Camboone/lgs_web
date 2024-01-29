<script setup lang="ts">
import { defineProps } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  id: String,
  label: String,
  link: [String, Array<String>],
  value: String,
  icon: String,
  is_reorder: Boolean,
  is_check: Boolean,
});

const openLink = () => {
  if (props.is_check) {
    const modal = document.getElementById(props.id ?? "") as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  } else if (props.link !== undefined && !Array.isArray(props.link)) {
    const firstLink = props.link as string;
    window.open(firstLink, '_blank');
  }
};


</script>

<template>
  <div>
    <div class="card bg-base-100 shadow-xl">
      <div class="flex flex-row p-3 justify-between items-center">
        <router-link :to="{ name: 'Contact', params: { id: props.id } }" class="block w-full"> 
          <div class="flex flex-row items-center  justify-start">
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
        </router-link>
        <button class="btn" @click="openLink">
          <Icon icon="material-symbols:arrow-forward-ios-rounded" />
        </button>
      </div>
    </div>
    <dialog :id="props.id" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h2 class="font-semibold text-2xl text-center uppercase font-sans">Phone</h2>
        <div v-for="(value, index) in props.link" :key="index">
          {{ value }}
        </div>
        <div class="modal-action">
          <form method="dialog" class="space-x-2">
            <button class="btn w-36">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
