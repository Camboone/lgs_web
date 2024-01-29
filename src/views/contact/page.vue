<template>
  <div>
    <div v-if="store.is_loading">
      <div
        class="w-full h-screen overflow-y-hidden flex justify-center items-center mx-auto"
      >
        <span class="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    </div>
    <div v-if="!store.is_loading">
      <div class="pt-2 pl-6 uppercase font-semibold text-center">
        {{ store.contact_data?.label }}
      </div>
      <div class="flex flex-row justify-center items-start mx-auto space-x-3">
        <div class="card w-96 bg-base-100 dark:bg-gray-800 shadow-xl">
          <figure class="px-10 pt-10">
            <img
              :src="store.contact_data?.icon"
              alt="Shoes"
              class="rounded-xl"
            />
          </figure>
          <div class="card-body items-center text-center">
            <form
              class="space-y-2"
              @submit.prevent="store.updateContact(props.id)"
            >
              <input
                v-model="store.labelCtl"
                class="input w-full input-bordered bg-gray-50 dark:bg-gray-700"
                placeholder="eg. telegram"
                required
              />
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
              <div v-if="store.is_check" v-for="(_, index) in store.list_phone">
                <input
                  v-model="store.list_phone[index]"
                  class="input w-full input-bordered bg-gray-50 dark:bg-gray-700"
                  placeholder="eg. telegram"
                  required
                />
              </div>
              <div class="card-actions w-full">
                <button type="submit" class="btn btn-success w-full text-white">
                  Update
                </button>
                <div class="divider w-full">OR</div>
                <button
                  type="button"
                  class="btn btn-error w-full text-center text-white"
                  @click="onOpenModal"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Are you sure to deleted this item ?</h3>
        <div class="modal-action">
          <form
            method="dialog"
            class="space-x-2"
            @submit.prevent="store.deleteContact(props.id)"
          >
            <button class="btn w-36">Close</button>
            <button type="submit" class="btn btn-error text-white w-36">
              Yes
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, defineProps } from "vue";
import { contactStore } from "../../../stores/contact.ts";

const props = defineProps(["id"]);
const store = contactStore();

onMounted(() => {
  if (props.id === undefined) {
    window.location.href = "/";
    return;
  }
  store.getContact(props.id);
});

function onOpenModal() {
  const modal = document.getElementById(
    "my_modal_5"
  ) as HTMLDialogElement | null;
  if (modal) {
    modal.showModal();
  }
}
</script>
