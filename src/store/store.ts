import axios from 'axios';
import { defineStore } from 'pinia';
import { IItem, IState, ITableColumn } from '../@types/typesTable';
import { TABLE } from '../@types/data';

export const useTableStore = defineStore({
   id: 'table',
   state: (): IState => ({
      items: [],
      changed: false,
      tableStructure: [...TABLE],
      tableStructureCopy: [...TABLE],
      total: 0,
      totalCount: 0,
      totalWeight: 0,
   }),
   getters: {
      getChanged: (state): boolean => state.changed,
      getItems: (state): IItem[] => state.items,
      getLastId: (state): number => (state.items.length > 0 ? state.items[state.items.length - 1].id : 1),
      getItemsWithTotal: (state): IItem[] => {
         return state.items.map((item) => {
            item.total = item.cost * item.count;
            return item;
         });
      },
      getTotal: (state): number => state.items.reduce((acc, item) => acc + item.total, 0),
      getTotalCount: (state): number => state.items.reduce((acc, item) => acc + item.count, 0),
      getTotalWeight: (state): number => state.items.reduce((acc, item) => acc + item.unit.value * item.count, 0),
      getTableStructureCopy: (state): ITableColumn[] => state.tableStructureCopy,
   },
   actions: {
      setItems(items: IItem[]) {
         this.items = items.map(item => ({ ...item, total: item.cost * item.count }));
         this.changed = true;
      },
      deleteItem(index: number) {
         this.items.splice(index, 1);
         this.changed = true;
      },
      setChanged(bool: boolean) {
         this.changed = bool;
      },
      addItem(item: IItem) {
         item.total = item.cost * item.count;
         this.items.push(item);
         this.changed = true;
      },
      setTableStructure(tableStructure: ITableColumn[]) {
         this.tableStructure = tableStructure;
      },
      async fetchItems() {
         try {
            this.setChanged(false);
            const response = await axios.get<IItem[]>('https://fee0606356a4e8e2.mokky.dev/items');
            this.setItems(response.data);
         } catch (error) {
            console.error('Error fetching items:', error);
         }
      },
      async saveItems() {
         try {
            this.setChanged(false);
            const changedItems = this.items;
            await axios.patch('https://fee0606356a4e8e2.mokky.dev/items', changedItems);
         } catch (error) {
            console.error('Error saving items:', error);
         }
      },
   },
});