export interface FurnitureShowProps {
    id: string
    image: string[]
    desc: string
    price: string
    width: string
    height: string
    depth: string
    color:string
    handleSelect:()=>void
}
export interface FurnitureShowAction {
    id: string
    image: string[]
    desc: string
    price: string
    width: string
    height: string
    depth: string
    color:string
}
export interface ChangeColorAction {
    id:string
    color:string
}
export interface FieldsAction{
    id: string
    width: string
    height: string
    depth: string
    price: string
    facades: string
    checked: false
    quantity: number
    color:string
}
export interface Quantity {
    id:string
}
