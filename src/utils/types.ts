export interface Equipment{
    id:string;
    name:string;
    type:string;
    amount:number;
    memo:string;
}
export const EquipmentType={
    TENT:'tent',CHAIR:'chair',TABLE:'table',CONTAINER:'container',COOK:'cook',FIRE:'fire'
}
export const initEquipment:Equipment={
id:'',
name:'',
type:EquipmentType.TENT,
amount:1,
memo:''
}
export interface MyEquipments{
    equipmentList:Equipment[]
}

export interface FormError{[key:string]:string}
