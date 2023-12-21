import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {decrement, deleteModel, increment, saveBasket} from "../store/actions/furniture";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Basket: FC = () => {
    const dispatch = useDispatch()
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
        toast.success('SAVED :)')
    }
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {basket.length > 0 ? (
                <div className='basket'>
                    <h3 className='title'>Your Basket</h3>
                    {basket.map((e: any) => (
                        <div key={e.id} className='basket-row'>
                            <div className='row-info'>
                                <img src={e.image} alt="furniture" className='basket-image'/>
                                <p className='furniture-show-desc'>{e.desc}</p>
                            </div>
                            <div className='row-info'>
                                <button onClick={() => handleDecrement(e.id)} className='button-count'>-</button>
                                <p className='furniture-show-desc'>Quantity {e.quantity ? e.quantity : '1'}</p>
                                <button onClick={() => handleIncrement(e.id)} className='button-count'>+</button>
                                <p className='furniture-show-price'>Price {e.finallyPrice ? e.finallyPrice : e.price}$</p>
                            </div>
                            <div className='row-info'>
                                <button onClick={() => handleDelete(e.id)} className='action'>Delete</button>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleSave} className='action-save'>Save</button>
                </div>
            ) : null}
        </>
    )
}
export default Basket
