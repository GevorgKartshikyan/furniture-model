import React, {FC} from "react";
import {useSelector} from "react-redux";
import {FurnitureShowAction} from "../helpers/types";
import SelectedFurnitureInfo from "../components/SelectedFurnitureInfo";

const SelectedFurniture: FC = () => {
    const selectedFurniture = useSelector((state: {
        furniture: { selectedModel: FurnitureShowAction }
    }) => state.furniture.selectedModel)
    return (
        <>
            {Object.keys(selectedFurniture).length > 0 ?
                <SelectedFurnitureInfo {...selectedFurniture}/>
                : null}
        </>
    )
}
export default SelectedFurniture
