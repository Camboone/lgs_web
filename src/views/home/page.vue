<template>
  <div>
    <div v-if="store.is_loading">
      <div
        class="w-full h-screen overflow-y-hidden flex justify-center items-center mx-auto"
      >
        <span class="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    </div>
    <div v-if="!store.is_loading" class="p-2 w-full lg:px-[10%]">
      <div class="flex flex-row justify-end pb-2">
        <div class="space-x-2">
          <button
            class="btn bg-orange-400 text-white hover:bg-orange-500"
            @click="store.onReorderItem"
          >
            {{ store.is_reorder ? "Update" : "Reorder" }}
          </button>

          <button class="btn btn-success text-white" @click="onOpenModal">
            Add Contact
          </button>
        </div>
      </div>
      <div v-if="store.is_reorder">
        <VueDraggableNext
          class="dragArea list-group w-full"
          ghost-class="ghost"
          :list="store.items"
        >
          <div
            v-for="(item, index) in store.items"
            :key="index"
            class="mb-1"
            @click=""
          >
            <contact-card
              :id="item.id"
              :label="item.label"
              :value="item.value"
              :link="item.go_to"
              :icon="item.icon"
              :is_reorder="true"
              :is_check="item.is_check"
            />
          </div>
        </VueDraggableNext>
      </div>
      <div v-if="!store.is_reorder">
        <div
          v-for="(item, index) in store.items"
          :key="index"
          class="mb-1"
          @click=""
        >
          <contact-card
            :id="item.id"
            :label="item.label"
            :value="item.value"
            :link="item.go_to"
            :icon="item.icon"
            :is_reorder="false"
            :is_check="item.is_check"
          />
        </div>
      </div>
    </div>
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <form @submit.prevent="store.onCreateItem()">
          <div class="p-2 space-y-3">
            <div class="font-semibold">CREATE CONTACT</div>
            <div class="flex flex-row items-center space-x-2">
              <input
                v-model="store.labelCtl"
                class="input w-full input-bordered bg-gray-50 dark:bg-gray-700"
                placeholder="eg. telegram"
                required
              />
              <input
                type="checkbox"
                v-model="store.is_check"
                class="checkbox bg-gray-100 dark:bg-gray-700 checkbox-lg"
                @click="store.onChecked"
              />
            </div>
            <input
              v-model="store.valueCtl"
              class="input w-full input-bordered bg-gray-50 dark:bg-gray-700"
              placeholder="eg. +85512342"
              required
            />
            <input
              v-model="store.imageCtl"
              class="input w-full input-bordered bg-gray-50 dark:bg-gray-700"
              placeholder="eg. https://telegram_logo.png"
              required
            />
            <input
              v-if="!store.is_check"
              v-model="store.linkCtl"
              class="input w-full input-bordered bg-gray-50 dark:bg-gray-700"
              placeholder="eg. https://go_to.com"
              required
            />
            <div
              v-if="store.is_check"
              v-for="(_, index) in store.list_phone"
              :key="index"
              class="space-y-2"
            >
              <div class="flex flex-row space-x-2">
                <input
                  v-model="store.list_phone[index]"
                  class="input w-full input-bordered bg-gray-50 dark:bg-gray-700"
                  :placeholder="`Phone ${index + 1}`"
                  required
                />
                <button
                  type="button"
                  class="btn btn-error"
                  @click="store.onRemovePhone(index)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <button
              v-if="store.is_check"
              type="button"
              class="btn btn-warning w-full text-center text-white"
              @click="store.onAddPhone"
            >
              Add
            </button>
          </div>
          <div class="p-2 flex justify-end">
            <button type="submit" class="btn text-white btn-success w-full">
              Create
            </button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { homeStore } from "../../../stores/home.ts";
import ContactCard from "../../components/contact-card.vue";
import { VueDraggableNext } from "vue-draggable-next";

const store = homeStore();

function onOpenModal() {
  const modal = document.getElementById(
    "my_modal_3"
  ) as HTMLDialogElement | null;
  if (modal) {
    modal.showModal();
  }
}

onMounted(() => {
  store.getItems();
});
</script>
