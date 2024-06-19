import { IName, ITableColumn, IUnit } from "./typesTable";

export const TABLE: ITableColumn[] = [
   { id: 1, head: "Номер", field: "drag" },
   { id: 2, head: "Действие", field: "options" },
   { id: 3, head: "Наименование еденицы", field: "unit" },
   { id: 4, head: "Цена", field: "cost" },
   { id: 5, head: "Кол-во", field: "count" },
   { id: 6, head: "Название товара", field: "name" },
   { id: 7, head: "Итого", field: "total" },
];

export const OPTIONS_UNIT: IUnit[] = [
   { text: 'Мраморный щебень фр. 2-5 мм, 25кг', value: 25 },
   { text: 'Мраморный щебень фр. 2-5 мм, 25кг (белый)', value: 25 },
   { text: 'Мраморный щебень фр. 2-5 мм, 25кг (вайт)', value: 25 },
   { text: 'Мраморный щебень фр. 2-5 мм, 25кг, возврат', value: 25 },
   { text: 'Мраморный щебень фр. 2-5 мм, 1т', value: 1000 },
];

export const OPTIONS_NAME: IName[] = [
   { text: 'Мраморный щебень', value: 'marble' },
   { text: 'Гранитный щебень', value: 'granit' },
   { text: 'Гравийный щебень', value: 'gravel' },
];