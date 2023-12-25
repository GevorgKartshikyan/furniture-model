import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {boards} from "../helpers/data";
import {clearBasket, deleteSelectedModel} from "../store/actions/furniture";
import {toast} from 'react-toastify';

interface Props {
    onCloseModal: () => void
}
const ShowFinalBasket: FC<Props> = ({onCloseModal}) => {
    const dispatch = useDispatch()
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
                                    <p className='furniture-show-price'>{e.desc}</p>
                                </div>
                                <div className='basket-shop-row details'>
                                    <h3 className='show-details'>Details</h3>
                                    <div className='show-details-info'>
                                        {e.sidesDetails?.back?.color ? (
                                            <div className='show-details-info-text'>
                                                <p>Back side Color</p>
                                                <p className='furniture-show-desc'>{e.sidesDetails?.back.color}</p>
                                            </div>
                                        ) : null}
                                        {e.sidesDetails?.back?.material ? (
                                            <div className='show-details-info-text'>
                                                <p>Back side Material</p>
                                                <p className='furniture-show-desc'>{e.sidesDetails?.back.material}</p>
                                            </div>
                                        ) : null}
                                        {e.sidesDetails?.sides?.coating?.coatingMaterial ? (
                                            <div className='show-details-info-text'>
                                                <p>Coating</p>
                                                <p className='furniture-show-desc'>Material
                                                    ({e.sidesDetails?.sides?.coating?.coatingMaterial})</p>
                                            </div>
                                        ) : null}
                                        {e.sidesDetails?.sides?.coating?.coatingMaterial ? (
                                            <div className='show-details-info-text'>
                                                <p>Coating Style</p>
                                                <div style={{
                                                    width: 60,
                                                    height: 60,
                                                    backgroundImage: `url(${boards.filter(({material}) => material === e.sidesDetails?.sides?.coating?.coatingMaterial)[0].image})`,
                                                    borderRadius: '50%'
                                                }}/>
                                            </div>
                                        ) : null}
                                        {e.sidesDetails?.sides?.coating?.size ? (
                                            <div className='show-details-info-text'>
                                                <p>Coating Size</p>
                                                <p className='furniture-show-desc'>{e.sidesDetails?.sides?.coating?.size}(m<sup>2</sup>)
                                                </p>
                                            </div>
                                        ) : null}
                                        {e.sidesDetails?.sides?.coating?.edge ? (
                                            <div className='show-details-info-text'>
                                                <p>Coating Edge</p>
                                                <p className='furniture-show-desc'>{e.sidesDetails?.sides?.coating?.edge}(mm)</p>
                                            </div>
                                        ) : null}
                                        {e.sidesDetails?.sides?.color ? (
                                            <div className='show-details-info-text'>
                                                <p>Sides color</p>
                                                <p className='furniture-show-desc'>{e.sidesDetails?.sides?.color}</p>
                                            </div>
                                        ) : null}
                                        {e.sidesDetails?.sides?.material ? (
                                            <div className='show-details-info-text'>
                                                <p>Sides Material</p>
                                                <p className='furniture-show-desc'>{e.sidesDetails?.sides?.material}</p>
                                            </div>
                                        ) : null}
                                        <div className='show-details-info-text'>
                                            <p>Sizes</p>
                                            <p className='furniture-show-desc'>{e.width}X{e.height}X{e.depth}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='basket-shop-row'>
                                    <p className='furniture-show-price'>Quantity ({e.quantity ? e.quantity : '1'})</p>
                                    <p style={{marginTop: 10}}
                                       className='furniture-show-price'>Price {e.finallyPrice && !e.quantity ? e.finallyPrice : +e.price * +e.quantity}$</p>
                                </div>
                            </div>
                        ))}
                        <div className='total-price'>
                            <p className='furniture-show-price'>Total Price</p>
                            <p className='furniture-show-price'>{basket.reduce((accumulator: number, currentValue: {
                                quantity: number;
                                price: string | number; })=>{
                                return accumulator + +currentValue.price * +currentValue.quantity
                            },0)}$</p>
                        </div>
                        <div className='basket-buttons'>
                            <button onClick={()=>onCloseModal()}>Close</button>
                            <button onClick={()=>{
                                toast.success('Your order is accepted')
                                dispatch(clearBasket())
                                dispatch(deleteSelectedModel())
                                onCloseModal()
                            }}>Buy</button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default ShowFinalBasket
