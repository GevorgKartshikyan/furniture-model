import React, {FC} from "react";
import FurnitureShow from "../components/FurnitureShow";
import {furniture} from "../helpers/data";
import {useDispatch} from "react-redux";
import {selectModel} from "../store/actions/furniture";


const FurnitureModels: FC = () => {
    const dispatch = useDispatch()
    const selectFurniture = (id: string): void => {
        const selectedModel = furniture.filter((e) => e.id === id)
        dispatch(selectModel(selectedModel[0]))
    }
    return (
        <div className='furniture-show-container'>
            <h3 className='title'>All Models</h3>
            {furniture.map((e) => (
                <FurnitureShow
                    key={e.id}
                    {...e}
                    handleSelect={() => selectFurniture(e.id)}
                />
            ))}
        </div>
    )
}
export default FurnitureModels
