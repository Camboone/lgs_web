import {defineStore} from "pinia";
import axios from 'axios'


export interface ContactItem {
    id: string;
    label: string;
    value: string;
    go_to: string;
    icon: string;
}

export const homeStore = defineStore({
    id: "home",
    state: () => ({
        count: 0,
        items: [] as ContactItem[],
        labelCtl: "",
        valueCtl: "",
        linkCtl: "",
        imageCtl: "",
        is_loading: false,
        is_reorder: false,
        original_items: [] as String[],
    }),
    actions: {
        async onCreateItem() {
            const body = {
                "label": this.labelCtl,
                "value": this.valueCtl,
                "go_to": this.linkCtl,
                "icon": this.imageCtl,
            }
            console.log(body);
            const response = await axios.post("https://lgs-cambodia-229a6a10aacf.herokuapp.com/contact", body);
            if(response.status === 200) {
                return;
            }
        },
        async onReorderItem() {
            if(this.is_reorder) {
                const arrayOfIds: string[] = this.items.map(obj => obj.id);
                if(JSON.stringify(arrayOfIds) === JSON.stringify(this.original_items)) {
                    this.is_reorder = !this.is_reorder;
                    return;
                }
                const response = await axios.put("https://lgs-cambodia-229a6a10aacf.herokuapp.com/reorder", arrayOfIds);
                if (response.status === 200) {
                    await this.getItems();
                }
            }
            this.is_reorder = !this.is_reorder;
        },
        async getItems() {
            this.is_loading = true;
            const response = await axios.get("https://lgs-cambodia-229a6a10aacf.herokuapp.com/contact");
            if (response.status === 200) {
                this.items = await response.data.data;
                this.original_items = await response.data.data.map((obj: any) => obj.id);
            }
            this.is_loading = false;
        },
    },
});
