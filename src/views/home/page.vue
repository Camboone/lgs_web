<template>
  <div>
    <div v-if="store.is_loading">
      <div class="w-full h-screen overflow-y-hidden">
        <progress class="progress"></progress>
      </div>
    </div>
    <div v-if="!store.is_loading" class="p-2 w-full lg:px-[10%]">
      <div class="flex flex-row justify-end pb-2">
        <div class="space-x-2">
          <button class="btn bg-orange-400 text-white hover:bg-orange-500" @click="store.onReorderItem">
            {{ store.is_reorder ? 'Update' : 'Reorder' }}
          </button>

          <button class="btn btn-success text-white" @click="onOpenModal">
            Add Contact
          </button>
        </div>
      </div>
      <div v-if="store.is_reorder">
        <VueDraggableNext class="dragArea list-group w-full" ghost-class="ghost" :list="store.items" >
          <div v-for="item in store.items" :key="item.id" class="mb-1" @click="">
            <router-link :to="{ name: 'Contact', params: { id: item.id } }">
              <contact-card
                  :label="item.label"
                  :value="item.value"
                  :link="item.go_to"
                  :icon="item.icon"
                  :is_reorder="true"
              />
            </router-link>
          </div>
        </VueDraggableNext>
      </div>
      <div v-if="!store.is_reorder">
        <div v-for="item in store.items" :key="item.id" class="mb-1" @click="">
          <router-link :to="{ name: 'Contact', params: { id: item.id } }">
            <contact-card
                :label="item.label"
                :value="item.value"
                :link="item.go_to"
                :icon="item.icon"
                :is_reorder="false"
            />
          </router-link>
        </div>
      </div>
    </div>
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <form @submit="store.onCreateItem()">
          <div class="p-2 space-y-3">
            <div class="font-semibold">CREATE CONTACT</div>
            <input v-model="store.labelCtl" class="input w-full input-bordered bg-gray-50 dark:bg-gray-700" placeholder="eg. telegram" required>
            <input v-model="store.valueCtl" class="input w-full input-bordered bg-gray-50 dark:bg-gray-700" placeholder="eg. +85512342" required>
            <input v-model="store.imageCtl" class="input w-full input-bordered bg-gray-50 dark:bg-gray-700" placeholder="eg. https://telegram_logo.png" required>
            <input v-model="store.linkCtl" class="input w-full input-bordered bg-gray-50 dark:bg-gray-700" placeholder="eg. https://go_to.com" required>
          </div>
          <div class="p-2 flex justify-end">
            <button type="submit" class="btn text-white btn-success w-full">Create</button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {homeStore} from "../../../stores/home.ts";
import ContactCard from "../../components/contact-card.vue";
import { VueDraggableNext } from 'vue-draggable-next'

const store = homeStore();

function onOpenModal() {
  const modal = document.getElementById("my_modal_3") as HTMLDialogElement | null;
  if (modal) {
    modal.showModal();
  }
}

onMounted(() => {
  store.getItems();
});

</script>