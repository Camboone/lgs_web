import {defineStore} from "pinia";
import { BaseRepository } from './../core/base';


export interface ContactItem {
    id: string;
    label: string;
    value: string;
    go_to: any;
    icon: string;
    is_check: boolean;
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
        is_loading: true,
        is_reorder: false,
        original_items: [] as String[],
        repository: new BaseRepository(),
        is_check: false,
        list_phone: [] as String[],
    }),
    actions: {
        async onCreateItem() {
            const body = {
                "label": this.labelCtl,
                "value": this.valueCtl,
                "go_to": this.is_check ? this.list_phone : this.linkCtl,
                "icon": this.imageCtl,
                "is_check": this.is_check,
            }
            const response = await this.repository.post("/contact", body);
            if(response.data.code === 200) {
                await this.getItems();
                this.labelCtl = "";
                this.valueCtl = "";
                this.linkCtl = "";
                this.imageCtl = "";
                this.is_check = false;
                this.list_phone = [];
            }
        },
        async onReorderItem() {
            console.log(this.is_reorder);
            if(this.is_reorder) {
                const arrayOfIds: string[] = this.items.map(obj => obj.id);
                if(JSON.stringify(arrayOfIds) === JSON.stringify(this.original_items)) {
                    this.is_reorder = !this.is_reorder;
                    return;
                }
                const response = await this.repository.put("/reorder", arrayOfIds);
                if (response.data.code === 200) {
                    await this.getItems();
                }
            }
            this.is_reorder = !this.is_reorder;
        },
        async getItems() {
            this.is_loading = true;
            const model = document.getElementById("my_modal_3") as HTMLDialogElement | null;
            if(model) {
                model.close();
            }
            const response = await this.repository.get("/contact");
            if (response.data.code === 200) {
                this.items = await response.data.data;
                this.original_items = await response.data.data.map((obj: any) => obj.id);
            }
            this.is_loading = false;
        },
        onChecked(){
            this.is_check = !this.is_check;
            if(this.is_check){
                this.list_phone.push("");
            } else{
                this.list_phone = [];
            }
        },

        onRemovePhone(index: number){
            if(this.list_phone.length === 1){
                return;
            }
            this.list_phone.splice(index, 1);
        },

        onAddPhone(){
            this.list_phone.push("");
        },
    },
});
