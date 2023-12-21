import React, {FC, useCallback, useState} from "react";
import {FieldsAction, FurnitureShowAction} from "../helpers/types";
import {variants} from "../helpers/data";
import {useDispatch} from "react-redux";
import {addBasket, changeColor} from "../store/actions/furniture";
import {toast} from "react-toastify";

const SelectedFurnitureInfo: FC<FurnitureShowAction> = ({image, width, height, desc, depth, id, price, color}) => {
    const dispatch = useDispatch()
    const [selectedId, setSelectedId] = useState('')
    const [error, setError] = useState('')
    const handleChangeColor = (id: string, color: string): void => {
        dispatch(changeColor({id, color}))
    }
    const [sizes, setSizes] = useState([
        {
            id: "1",
            width: '806',
            height: "300",
            depth: "462",
            price: "2408",
            facades: "facades 716x296",
            checked: false,
            quantity: 0
        },
        {
            id: "2",
            width: '806',
            height: "890",
            depth: "462",
            price: "4116",
            facades: "facades 716x296",
            checked: false,
            quantity: 0
        },
        {
            id: "3",
            width: '806',
            height: "350",
            depth: "462",
            price: "2212",
            facades: "facades 716x296",
            checked: false,
            quantity: 0
        },
        {
            id: "4",
            width: '806',
            height: "300",
            depth: "462",
            price: "2212",
            facades: "facades 716x296",
            checked: false,
            quantity: 0
        },
    ])
    const handleSelectSize = (id: string): void => {
        setSizes((prevSizes) =>
            prevSizes.map((size) => ({
                ...size,
                checked: size.id === id,
            }))
        );
        setSelectedId(id)
    };
    const handleQuantity = (method: string, id: string) => {
        setSizes(sizes.map((e) => {
            if (e.id === id && method === '+') {
                e.quantity += 1
            } else if (e.id === id && method === '-' && e.quantity > 1) {
                e.quantity -= 1
            }

            return e
        }))
    };
    const handleSave = useCallback(() => {
        const fields = sizes.filter((e) => e.id === selectedId)[0]
        if (selectedId) {
            // @ts-ignore
            dispatch(addBasket({
                ...fields,
                id,
                color,
                image,
                desc
            }))
        } else {
            toast.error('Please select model :)')
        }
    }, [selectedId, sizes])
    return (
        <div className='selected-furniture'>
            <img src={image} alt='furniture'/>
            <div className='variants'>
                <div style={{display: "flex"}}>
                    {variants.map((e) => (
                        <div
                            onClick={() => handleChangeColor(e.id, e.color)}
                            className={`variant ${color === e.color ? 'selected' : ''}`}
                            key={e.id}
                            style={{backgroundColor: e.color}}
                        />
                    ))}
                </div>
                <div className='selected-furniture-desc'>
                    <p className='furniture-show-price'>{price}</p>
                    <p className='furniture-show-desc'>{desc}</p>
                    <p style={{textTransform: 'uppercase'}} className='furniture-show-desc'>{color}</p>
                    <p className='furniture-show-desc'>{width + ' x ' + height + ' x ' + depth}</p>
                </div>
            </div>
            <div style={{width: "53.3333%", marginLeft: 30, marginTop: '50px'}}>
                <table className="data-table">
                    <thead>
                    <tr>
                        <th className="header-cell">Art</th>
                        <th className="header-cell">Size</th>
                        <th className="header-cell">Facades</th>
                        <th className="header-cell">Price</th>
                        <th className="header-cell">Quantity</th>
                        <th className="header-cell">Selected</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sizes.map((e) => (
                        <tr key={e.id} className='table-row' onClick={() => handleSelectSize(e.id)}>
                            <td className="data-cell">{e.id}</td>
                            <td className="data-cell">
                                {e.width}X{e.height}X{e.depth}
                            </td>
                            <td className="data-cell">
                                {e.facades}
                            </td>
                            <td className="data-cell">
                                {e.price}$
                            </td>
                            <td className="data-cell button">
                                <p>{e.quantity}</p>
                                <div className='button-box'>
                                    <button onClick={() => handleQuantity('+', e.id)} className='button-count'>+
                                    </button>
                                    <button onClick={() => handleQuantity('-', e.id)} className='button-count'>
                                        -
                                    </button>
                                </div>
                            </td>
                            <td className="data-cell">
                                {e.checked ? (<svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                >
                                    <path
                                        d="M10.063 16.4L6.06299 12.4L7.46299 11L10.063 13.6L16.663 7L18.063 8.4L10.063 16.4Z"
                                        fill="blue"
                                    />
                                </svg>) : <div className='square'/>}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick={handleSave} className='save-button'>Save</button>
            </div>
        </div>
    )
}
export default SelectedFurnitureInfo
