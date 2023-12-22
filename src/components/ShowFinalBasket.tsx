import React,{FC} from "react";
import {useSelector} from "react-redux";
const ShowFinalBasket:FC = ()=>{
    // @ts-ignore
    const basket = useSelector((state => state.furniture.basket))
    console.log(basket)
    return (
        <div className=''>
            <div className="">
                {basket.length > 0 ? (
                    <div className='basket-shop'>
                        <h3 className='title'>Your Basket</h3>
                        {basket.map((e: any) => (
                            <div key={e.id} className='basket-shop-colum'>
                                <div className='basket-shop-row'>
                                    <img src={e.image[0]} alt="furniture" className='basket-shop-row-img'/>
                                    <p className='basket-shop-row-desc'>{e.desc}</p>
                                </div>
                                <div className='basket-shop-row'>
                                    <p className='basket-shop-row-quantity'>Quantity ({e.quantity ? e.quantity : '1'})</p>
                                    <p className='basket-shop-row-price'>Price {e.finallyPrice && !e.quantity ? e.finallyPrice : +e.price * +e.quantity}$</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default ShowFinalBasket
