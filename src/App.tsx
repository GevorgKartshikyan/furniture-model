import React, {FC, useEffect, useRef} from 'react';
import FurnitureModels from "./layouts/FurnitureModels";
import SelectedFurniture from "./layouts/SelectedFurniture";
import Basket from "./layouts/Basket";
import {useSelector} from "react-redux";
import {FurnitureShowAction} from "./helpers/types";

const App: FC = () => {
    const conversation = useRef();
    // @ts-ignore
    const basket = useSelector((state => state.furniture.basket))
    const selectedFurniture = useSelector((state: {
        furniture: { selectedModel: FurnitureShowAction }
    }) => state.furniture.selectedModel)
    useEffect(() => {
        // @ts-ignore
        conversation.current.scrollIntoView({ behavior: 'smooth' })
    }, [selectedFurniture,basket]);

    return (
        <>
            <FurnitureModels/>
            {/*// @ts-ignore*/}
            <div ref={conversation}>
                <SelectedFurniture/>
            </div>
            {/*// @ts-ignore*/}
            <div ref={conversation}>
                <Basket/>
            </div>
        </>
    )
}

export default App;
