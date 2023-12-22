import React, {FC} from "react";
import FurnitureShow from "../components/FurnitureShow";
import {furniture} from "../helpers/data";
import {useDispatch} from "react-redux";
import {selectModel} from "../store/actions/furniture";
import Carousel from "nuka-carousel";


const FurnitureModels: FC = () => {
    const dispatch = useDispatch()
    const selectFurniture = (id: string): void => {
        const selectedModel = furniture.filter((e) => e.id === id)
        dispatch(selectModel(selectedModel[0]))
    }
    const carouselItemStyle = {
        width: '100%',
        height: '100%',
    };

    return (
        <div style={{flexDirection:'column'}} className='furniture-show-container'>
            <h3 className='title'>All Models</h3>
            <Carousel
                wrapAround={true}
                autoplay
                renderCenterRightControls={()=>null}
                renderCenterLeftControls={()=>null}
                cellAlign='center'
                autoplayInterval={1500}
                renderBottomCenterControls={()=>null}
            >
                {furniture.map((e) => (
                    <div key={e.id} style={carouselItemStyle}>
                        <FurnitureShow
                            key={e.id}
                            {...e}
                            handleSelect={() => selectFurniture(e.id)}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
export default FurnitureModels
