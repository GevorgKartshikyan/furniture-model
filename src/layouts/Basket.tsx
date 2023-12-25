import React, {FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {decrement, deleteModel, increment, saveBasket} from "../store/actions/furniture";
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-modal";
import ShowFinalBasket from "../components/ShowFinalBasket";

const Basket: FC = () => {
    const dispatch = useDispatch()
    const [showModalBasket , setShowModalBasket] = useState(false)

    // @ts-ignore
    const basket = useSelector((state => state.furniture.basket))
    const handleIncrement = (id: string): void => {
        dispatch(increment({id}))
    }
    const handleDecrement = (id: string): void => {
        dispatch(decrement({id}))
    }
    const handleDelete = (id: string): void => {
        dispatch(deleteModel({id}))
    }

    const handleSave = (): void => {
        dispatch(saveBasket())
        setShowModalBasket(true)
    }
    console.log(basket)
    return (
        <>
            {basket.length > 0 ? (
                <div className='basket'>
                    <h3 className='title'>Your Basket</h3>
                    {basket.map((e: any) => (
                        <div key={e.id} className='basket-row'>
                            <div className='row-info'>
                                <img src={e.image[0]} alt="furniture" className='basket-image'/>
                                <p className='furniture-show-desc'>{e.desc}</p>
                            </div>
                            <div className='row-info'>
                                <button onClick={() => handleDecrement(e.id)} className='button-count'>-</button>
                                <p className='furniture-show-desc'>Quantity {e.quantity ? e.quantity : '1'}</p>
                                <button onClick={() => handleIncrement(e.id)} className='button-count'>+</button>
                                <p className='furniture-show-price'>Price {e.finallyPrice && !e.quantity ? e.finallyPrice : +e.price * +e.quantity}$</p>
                            </div>
                            <div className='row-info'>
                                <button onClick={() => handleDelete(e.id)} className='action'>Delete</button>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleSave} className='action-save'>Save</button>
                </div>
            ) : null}
            <Modal
                onRequestClose={() => setShowModalBasket(false)}
                shouldCloseOnOverlayClick={true}
                isOpen={showModalBasket}
            >
                <ShowFinalBasket onCloseModal={()=>setShowModalBasket(false)}/>
            </Modal>
        </>
    )
}
export default Basket
