import React, {FC, useCallback, useEffect, useState} from "react";
import {FurnitureShowAction} from "../helpers/types";
import {useDispatch} from "react-redux";
import {addBasket, changeColor} from "../store/actions/furniture";
import {toast} from "react-toastify";
import {sides as sideArr, boards, variants, options} from "../helpers/data";
import Select from 'react-select';

const SelectedFurnitureInfo: FC<FurnitureShowAction> = ({image, width, height, desc, depth, id, price, color}) => {
    const dispatch = useDispatch()
    const [selectedId, setSelectedId] = useState('')
    const [imageIndex, setImageIndex] = useState(1)
    const [coating, setCoatings] = useState(boards[0])
    const [sidesBoard, setSidesBoard] = useState({
        front: options[0].value,
        sides: options[0].value,
        back: options[0].value
    })
    const handleChangeWood = (selectedOption: any, imageIndex: number, selectedKey: string) => {
        setSelectedWood(selectedOption);
        setSidesBoard((prevSidesBoard) => ({
            ...prevSidesBoard,
            [selectedKey]: selectedOption.label
        }));
    };
    console.log(sidesBoard)
    const [selectedWood ,setSelectedWood] = useState({})
    useEffect(() => {
        setImageIndex(1)
    }, [id]);
    const changeSide = (method: string) => {
        if (method === '+') {
            setImageIndex((prevState: number): number => {
                let newValue = prevState + 1
                if (prevState === image.length - 1) {
                    newValue = 1
                }
                return newValue
            })
        }
        if (method === '-') {
            setImageIndex((prevState: number): number => {
                let newValue = prevState - 1
                if (prevState === 1) {
                    newValue = image.length - 1
                }
                return newValue
            })
        }
    }
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
            <div className='image-block'>
                <button onClick={() => changeSide('-')} className='arrow-button'>
                    <span className='arrow'>&#8592;</span>
                </button>
                <img src={image[imageIndex]} alt='furniture'/>
                <button onClick={() => changeSide('+')} className='arrow-button'>
                    <span className='arrow'>&#8594;</span>
                </button>
            </div>
            <div className='variants'>
                <div>
                    <p className='furniture-show-price'>Select Color</p>
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
                    <p style={{marginTop: 20}}
                       className='furniture-show-price'
                    >
                        Select coating
                    </p>
                    <div style={{display: "flex"}}>
                        {boards.map((e) => (
                            <div
                                onClick={() => setCoatings(e)}
                                key={e}
                                className={`variant ${coating === e ? 'selected' : ''}`}
                                style={{backgroundImage: `url(${e})`, width: 50, height: 50}}
                            />
                        ))}
                    </div>
                    <p style={{marginTop: 20}}
                       className='furniture-show-price'>Select material
                        of {sideArr[imageIndex - 1]['label']} {imageIndex === 2 || imageIndex === 4 ? 'Sides' : 'Side'}
                    </p>
                    <div style={{marginTop:20}}>
                        <Select
                            // value={selectedWood}
                            placeholder='Select Wood'
                            onChange={(selectedOption)=>handleChangeWood(selectedOption, imageIndex - 1, sideArr[imageIndex - 1].key)}
                            options={options}
                        />
                    </div>
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
