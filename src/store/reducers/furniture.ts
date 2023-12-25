import {createReducer, type PayloadAction} from '@reduxjs/toolkit'
import {
    addBasket,
    changeColor,
    clearBasket,
    decrement,
    deleteModel, deleteSelectedModel,
    increment,
    saveBasket,
    selectModel
} from "../actions/furniture";
import {ChangeColorAction, FurnitureShowAction} from "../../helpers/types";
// @ts-ignore
import { v4 as uuidV4 } from 'uuid'

const initialState = {
    selectedModel: {},
// @ts-ignore
    basket: JSON.parse(window.localStorage.getItem('furnitureList')) || []
}


export default createReducer(initialState, (builder) => {
    builder
        .addCase(selectModel, (state, action: PayloadAction<FurnitureShowAction>) => {
            state.selectedModel = action.payload
        })
        .addCase(changeColor, (state, action: PayloadAction<ChangeColorAction>) => {
            const {color} = action.payload
            state.selectedModel = {...state.selectedModel, color}
        })
        .addCase(addBasket, (state, action) => {
            // @ts-ignore
            state.basket = [...state.basket, {...action.payload , quantity:action.payload.quantity ? action.payload.quantity : 1,id:uuidV4()}]
        })
        .addCase(increment , (state,action)=>{
            const {id} = action.payload
            // @ts-ignore
            state.basket = state.basket.map((e:any)=>{
                if (e.id === id){
                    e.quantity +=1
                    e.finallyPrice =  +e.price * +e.quantity
                }
                return e
            })
        })
        .addCase(decrement , (state,action)=>{
            const {id} = action.payload
            // @ts-ignore
            state.basket = state.basket.map((e:any)=>{
                if (e.id === id && e.quantity > 1){
                    e.quantity -=1
                    e.finallyPrice =  +e.price * +e.quantity
                }
                return e
            })
        })
        .addCase(deleteModel , (state,action)=>{
            const {id} = action.payload
            // @ts-ignore
            state.basket=state.basket.filter((e)=>e.id !==id )
            window.localStorage.setItem('furnitureList' , JSON.stringify(state.basket))

        })
        .addCase(saveBasket ,(state) => {
            window.localStorage.setItem('furnitureList' , JSON.stringify(state.basket))
        })
        .addCase(clearBasket ,  (state)=>{
            state.basket = []
        })
        .addCase(deleteSelectedModel , (state)=>{
            state.selectedModel = {}
        })
})
