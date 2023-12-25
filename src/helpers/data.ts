import furniture1 from "../asstest/images/furnitures/furniture1.jpeg";
import furniture1_2 from "../asstest/images/furnitures/furniture1-2.png";
import furniture1_3 from "../asstest/images/furnitures/furniture1-3.png";
import furniture1_4 from "../asstest/images/furnitures/furniture1-4.png";
import furniture2 from "../asstest/images/furnitures/furniture2.jpeg";
import furniture2_2 from "../asstest/images/furnitures/furniture2-2.png";
import furniture2_3 from "../asstest/images/furnitures/furniture2-3.png";
import furniture2_4 from "../asstest/images/furnitures/furniture2-4.png";
import furniture3 from "../asstest/images/furnitures/furniture3.jpeg";
import furniture3_2 from "../asstest/images/furnitures/furniture3-2.png";
import furniture3_3 from "../asstest/images/furnitures/furniture3-3.png";
import furniture3_4 from "../asstest/images/furnitures/furniture3-4.png";
import furniture4 from "../asstest/images/furnitures/furniture4.jpeg";
import furniture4_2 from "../asstest/images/furnitures/furniture4-2.png";
import furniture4_3 from "../asstest/images/furnitures/furniture4-3.png";
import furniture4_4 from "../asstest/images/furnitures/furniture4-4.png";
import furniture5 from "../asstest/images/furnitures/furniture5.png";
import furniture5_1 from "../asstest/images/furnitures/furniture5-1.png";
import furniture5_2 from "../asstest/images/furnitures/furniture5-2.png";
import furniture5_3 from "../asstest/images/furnitures/furniture5-3.png";
import boardBgAcacia from '../asstest/images/boards/board-acacia.jpg'
import boardBgOak from '../asstest/images/boards/board-oak.jpg'
import boardBgAruba from '../asstest/images/boards/board-aruba.jpg'

export const sides = [
    {key: "sides", label: 'Left and Right'},
    {key: 'back', label: 'Back'},
    {key: 'sides', label: 'Left and Right'}
]
export const options = [
    {value: 'Solid Wood', label: 'Solid Wood'},
    {value: 'Plywood', label: 'Plywood'},
    {value: 'MDF', label: 'MDF'},
];

export const testMaterials = [
    {value: 'Material-1', label: 'Material-1'},
    {value: 'Material-2', label: 'Material-2'},
    {value: 'Material-3', label: 'Material-3'},
]
export const boards = [
    {material:'Acacia', image: boardBgAcacia,id:1,},
    {material:'Oak', image: boardBgOak,id:2},
    {material:'Aruba', image: boardBgAruba,id:3}
]
export const furniture = [
    {
        id: "1",
        price: "2408$",
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        image: [furniture5, furniture5_1, furniture5_2, furniture5_3],
        width: '806',
        height: "296",
        depth: "536",
        color: "white"
    },
    {
        id: "11",
        price: "2408$",
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        image: [furniture1, furniture1_2, furniture1_3, furniture1_4],
        width: '806',
        height: "296",
        depth: "536",
        color: "white"
    },
    {
        id: "2",
        price: "4116$",
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        image: [furniture2, furniture2_2, furniture2_3, furniture2_4],
        width: '806',
        height: "890",
        depth: "462",
        color: "white"
    },
    {
        id: "3",
        price: "2212$",
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        image: [furniture3, furniture3_2, furniture3_3, furniture3_4],
        width: '806',
        height: "300",
        depth: "462",
        color: "white"
    },
    {
        id: "4",
        price: "2296$",
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        image: [furniture4, furniture4_2, furniture4_3, furniture4_4],
        width: '806',
        height: "350",
        depth: "462",
        color: "white"
    },
]
export const variants = [
    {id: "1", color: 'brown'},
    {id: "2", color: 'black'},
    {id: "3", color: 'white'},
]
export const sizes = [
    {
        id: "1",
        width: '806',
        height: "300",
        depth: "462",
        price: "2212$",
        facades: "facades 716x296",
        checked: false
    },
    {
        id: "2",
        width: '806',
        height: "890",
        depth: "462",
        price: "2212$",
        facades: "facades 716x296",
        checked: false
    },
    {
        id: "3",
        width: '806',
        height: "350",
        depth: "462",
        price: "2212$",
        facades: "facades 716x296",
        checked: false
    },
    {
        id: "4",
        width: '806',
        height: "300",
        depth: "462",
        price: "2212$",
        facades: "facades 716x296",
        checked: false
    },
    {
        id: "5",
        width: '806',
        height: "300",
        depth: "462",
        price: "2212$",
        facades: "facades 716x296",
        checked: false
    },

]
