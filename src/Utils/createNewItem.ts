import { IItem } from "../@types/typesTable";
import { useTableStore } from "../store/store";

export const createNewItem = (tableStore: ReturnType<typeof useTableStore>): IItem => {
   return {
      id: tableStore.getLastId + 1,
      unit: { text: 'Мраморный щебень фр. 2-5 мм, 25кг', value: 25 },
      cost: 100,
      count: 15,
      name: { text: 'Мраморный щебень', value: 'marble' },
      total: 1500,
   };
};

export const addItem = (tableStore: ReturnType<typeof useTableStore>) => {
   const newItem = createNewItem(tableStore);
   tableStore.addItem(newItem);
};