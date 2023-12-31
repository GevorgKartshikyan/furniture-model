import React, {FC} from "react";
import {FurnitureShowProps} from "../helpers/types";
const FurnitureShow: FC<FurnitureShowProps> = ({image,price,desc,id,width,height,depth,handleSelect,color}) => {
    return (
        <div  className='furniture-show'>
            <img onClick={handleSelect} className='furniture-show-image' src={image[0]} alt="furniture"/>
            <p className='furniture-show-price'>{price}</p>
            <p className='furniture-show-desc'>{desc}</p>
            <p style={{textTransform:'uppercase'}} className='furniture-show-desc'>{color}</p>
            <p className='furniture-show-desc'>{width + ' x ' + height + ' x ' + depth}</p>
        </div>
    )
}
export default FurnitureShow
