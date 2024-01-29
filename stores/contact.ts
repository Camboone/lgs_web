import { BaseRepository } from "./../core/base";
import { defineStore } from "pinia";
import { ContactItem } from "./home";
import { router } from "../routes";

export const contactStore = defineStore({
  id: "contact",
  state: () => ({
    contact_data: {} as ContactItem | null,
    labelCtl: "",
    valueCtl: "",
    linkCtl: "",
    imageCtl: "",
    is_loading: true,
    repository: new BaseRepository(),
    list_phone: [] as String[],
    is_check: false,
  }),
  actions: {
    async getContact(id: string) {
      this.is_loading = true;
      const response = await this.repository.get(`/contact/${id}`);
      if (response.data.code === 200) {
        this.contact_data = response.data.data;
        this.labelCtl = response.data.data.label;
        this.valueCtl = response.data.data.value;
        this.linkCtl = response.data.data.go_to;
        this.is_check = response.data.data.is_check;
        if (this.is_check) {
          this.list_phone = [...this.linkCtl];
          this.linkCtl = "";
        }
        this.imageCtl = response.data.data.icon;
      }
      this.is_loading = false;
    },

    async updateContact(id: string) {
      const body = {
        label: this.labelCtl,
        value: this.valueCtl,
        go_to: this.is_check ? [...this.list_phone] : this.linkCtl,
        icon: this.imageCtl,
        is_check: this.is_check,
      };

      const original_body = {
        label: this.contact_data?.label,
        value: this.contact_data?.value,
        go_to: this.contact_data?.go_to,
        icon: this.contact_data?.icon,
        is_check: this.contact_data?.is_check,
      };
      if (JSON.stringify(body) === JSON.stringify(original_body)) {
        console.log("No change");
        return;
      }
      const response = await this.repository.put(`/contact/${id}`, body);
      if (response.data.code === 200) {
        await this.getContact(id);
      }
    },
    async deleteContact(id: string) {
      const response = await this.repository.delete(`/contact/${id}`);
      if (response.data.code === 200) {
        await router.push({ path: "/", replace: true });
        return;
      }
    },
  },
});
