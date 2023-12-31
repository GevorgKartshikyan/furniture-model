import {createAction} from "@reduxjs/toolkit";
import {ChangeColorAction, FurnitureShowAction, Quantity} from "../../helpers/types";

export const selectModel = createAction<FurnitureShowAction>('furniture/selectModel')
export const deleteSelectedModel = createAction('furniture/deleteSelectedModel')
export const changeColor = createAction<ChangeColorAction>('furniture/changeColor')
export const addBasket = createAction('furniture/addBasket')
export const increment = createAction<Quantity>('furniture/increment')
export const decrement = createAction<Quantity>('furniture/decrement')
export const deleteModel = createAction<Quantity>('furniture/deleteModel')
export const saveBasket = createAction('furniture/saveBasket')
export const clearBasket = createAction('furniture/clearBasket')
