import {defineStore} from "pinia";
import axios from "axios";
import {ContactItem} from "./home";
import {router} from '../routes';

export const contactStore = defineStore({
    id: "contact",
    state: () => ({
        contact_data: {} as ContactItem | null,
        labelCtl: "",
        valueCtl: "",
        linkCtl: "",
        imageCtl: "",
        is_loading: false,
    }),
    actions: {
        async getContact(id: string) {
            this.is_loading = true;
            const response = await axios.get(`https://lgs-cambodia-229a6a10aacf.herokuapp.com/contact/${id}`);
            if (response.status === 200) {
                this.contact_data = response.data.data;
                this.labelCtl = response.data.data.label;
                this.valueCtl = response.data.data.value;
                this.linkCtl = response.data.data.go_to;
                this.imageCtl = response.data.data.icon;
            }
            this.is_loading = false;
        },
        async updateContact(id: string) {
            const body = {
                "label": this.labelCtl,
                "value": this.valueCtl,
                "go_to": this.linkCtl,
                "icon": this.imageCtl,
            }
            const original_body = {
                "label": this.contact_data?.label,
                "value": this.contact_data?.value,
                "go_to": this.contact_data?.go_to,
                "icon": this.contact_data?.icon,
            }
            if (JSON.stringify(body) === JSON.stringify(original_body)) {
                console.log("No change");
                return;
            }
            const response = await axios.put(`https://lgs-cambodia-229a6a10aacf.herokuapp.com/contact/${id}`, body);
            console.log(response);
            if (response.status === 200) {
                return;
            }
        },
        async deleteContact(id: string) {

            const response = await axios.delete(`https://lgs-cambodia-229a6a10aacf.herokuapp.com/contact/${id}`);
            if (response.status === 200) {
                await router.push({path: "/", replace: true})
                return;
            }
        },
    },
});