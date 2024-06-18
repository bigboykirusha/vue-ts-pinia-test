export interface IUnit {
   text: string;
   value: number;
}

export interface IName {
   text: string;
   value: string;
}

export interface IItem {
   id: number;
   unit: IUnit;
   cost: number;
   count: number;
   name: IName;
   total: number;
}

export interface ITableColumn {
   id: number;
   head: string;
   field: string;
}

export interface IState {
   items: IItem[];
   changed: boolean;
   tableStructure: ITableColumn[];
   tableStructureCopy: ITableColumn[];
   total: number;
   totalCount: number;
   totalWeight: number;
}