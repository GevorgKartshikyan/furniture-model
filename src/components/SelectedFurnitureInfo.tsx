import React, {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import {FurnitureShowAction} from "../helpers/types";
import {useDispatch, useSelector} from "react-redux";
import {addBasket, changeColor} from "../store/actions/furniture";
import {toast} from "react-toastify";
import {sides as sidesArr, boards, variants, options} from "../helpers/data";
import Select from 'react-select';
import Model from "./Model";
import Modal from "react-modal";

const SelectedFurnitureInfo: FC<FurnitureShowAction> = ({image, width, height, desc, depth, id, price, color}) => {
    const dispatch = useDispatch()
    // @ts-ignore
    const [selectedSizes, setSelectedSizes] = useState({
        width: '',
        height: '',
        depth: ''
    })
    const [isOpen, setIsOpen] = useState(false)
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
    const [selectedId, setSelectedId] = useState('')
    const [imageIndex, setImageIndex] = useState(1)
    const [coating, setCoatings] = useState('')
    const [selectedWood, setSelectedWood] = useState({})
    const [edge, setEdge] = useState('2')
    const [sidesBoard, setSidesBoard] = useState({
        sides: {
            material: options[0].value,
            coating: {
                size: 0,
                coatingMaterial: '',
                edge: ''
            },
            color: ''
        },
        back: {
            material: options[0].value,
            color: '' || variants[2].color
        },
    })
    const handleSetCoating = (material: string, selectedKey: string) => {
        setCoatings(material);
        // @ts-ignore
        setSidesBoard((prevSidesBoard) => ({
            ...prevSidesBoard,
            'sides': {
                // @ts-ignore
                ...sidesBoard[selectedKey],
                coating: {
                    // @ts-ignore
                    ...sidesBoard[selectedKey]['coating'],
                    coatingMaterial: material,
                    size: (4 * (+depth * +height)) / 1000000
                }
            }
        }));
    }

    const handleChangeWood = (selectedOption: any, selectedKey: string) => {
        setSelectedWood(selectedOption);
        setSidesBoard((prevSidesBoard) => ({
            ...prevSidesBoard,
            [selectedKey]: {
                // @ts-ignore
                ...sidesBoard[selectedKey],
                material: selectedOption.label
            }
        }));
    };
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
    const handleChangeColor = (id: string, color: string, selectedKey: string): void => {
        dispatch(changeColor({id, color}))
        // @ts-ignore
        setSidesBoard((prevSidesBoard) => ({
            ...prevSidesBoard,
            [selectedKey]: {
                // @ts-ignore
                ...sidesBoard[selectedKey],
                color: color || variants[2].color
            }
        }));
    }
    const handleSelectSize = (id: string): void => {
        setSizes((prevSizes) =>
            prevSizes.map((size) => ({
                ...size,
                checked: size.id === id,
            }))
        );
        setSelectedId(id)
        setSelectedSizes(sizes.filter((e) => e.id === id)[0])
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
                desc,
                sidesDetails: sidesBoard,
            }))
        } else {
            toast.error('Please select model :)')
        }
    }, [selectedId, sizes, sidesBoard])
    return (
        <>
            {id === "1" && <button onClick={() => setIsOpen(true)} className='save-button'>open 3D</button>}
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
                    <div style={{marginLeft: 20}}>
                        <p className='furniture-show-price'>Select Color</p>
                        <div style={{display: "flex"}}>
                            {variants.map((e) => (
                                <div
                                    onClick={() => handleChangeColor(e.id, e.color, sidesArr[imageIndex - 1].key)}
                                    className={`variant ${color === e.color ? 'selected' : ''}`}
                                    key={e.id}
                                    style={{backgroundColor: e.color}}
                                />
                            ))}
                        </div>
                        {sidesArr[imageIndex - 1].key === 'sides' ? (
                            <>
                                <p style={{marginTop: 20}}
                                   className='furniture-show-price'
                                >
                                    Select coating
                                </p>
                                <div style={{display: "flex"}}>
                                    {boards.map((e) => (
                                        <div
                                            onClick={() => handleSetCoating(e.material, 'sides')}
                                            key={e.id}
                                            className={`variant ${coating === e.material ? 'selected' : ''}`}
                                            style={{backgroundImage: `url(${e.image})`, width: 50, height: 50}}
                                        />
                                    ))}
                                </div>
                                <div className='input-block'>
                                    <p className='furniture-show-price' style={{marginTop: 15}}>Select Edge
                                        Thickness</p>
                                    <input min={2} max={12} type="number" value={edge}
                                           onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                               setSidesBoard((prevSidesBoard) => ({
                                                   ...prevSidesBoard,
                                                   'sides': {
                                                       // @ts-ignore
                                                       ...sidesBoard['sides'],
                                                       coating: {
                                                           // @ts-ignore
                                                           ...sidesBoard['sides']['coating'],
                                                           edge: event.target.value
                                                       }
                                                   }
                                               }));
                                               setEdge(event.target.value)
                                           }}/>
                                    <span>MM</span>
                                    <p>(min 2mm max 12mm)</p>
                                </div>
                            </>
                        ) : null}
                        <p style={{marginTop: 20}}
                           className='furniture-show-price'>Select material
                            of {sidesArr[imageIndex - 1]['label']} {imageIndex === 2 || imageIndex === 3 ? 'Sides' : 'Side'}
                        </p>
                        <div style={{marginTop: 20}}>
                            <Select
                                // value={selectedWood}
                                placeholder='Select Wood'
                                onChange={(selectedOption) => handleChangeWood(selectedOption, sidesArr[imageIndex - 1].key)}
                                options={options}
                            />
                        </div>
                    </div>
                    <div className='selected-furniture-desc'>
                        <p className='furniture-show-price'>{price}</p>
                        <p className='furniture-show-desc'>{desc}</p>
                        <p style={{textTransform: 'uppercase'}} className='furniture-show-desc'>{color}</p>
                        <p className='furniture-show-desc'>
                            {(selectedSizes.width && selectedSizes.height && selectedSizes.depth) ?
                                (selectedSizes.width + ' x ' + selectedSizes.height + 'x' + selectedSizes.depth) :
                                (width + 'x' + height + 'x' + depth)
                            }
                        </p>
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
            <Modal
                onRequestClose={() => setIsOpen(false)}
                shouldCloseOnOverlayClick={true}
                isOpen={isOpen}
            >
                <Model onCloseModal={() => { setIsOpen(false) }}/>
            </Modal>
        </>
    )
}
export default SelectedFurnitureInfo
