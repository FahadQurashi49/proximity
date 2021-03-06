import {Schema, model} from 'mongoose';
import shop from '../model/Shop';


function getPrice(num: number): string {
    return (num/100).toFixed(2);
}

function setPrice(num: number): Number {
    return num*100;
}

let ProductSchema: Schema = new Schema({
    title: {
        type: String,
        minlength: [2, 'Name must be of atleast 2 characters'],
        maxlength: [50, 'Name must be of atmost 50 characters'],
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: false
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'shop',
        required: [true, 'shop is required']
    }, 
    price: {
        type: Number,
        get: getPrice,
        set: setPrice
    },
    inStock: {
        type: Boolean,
        required: [true, 'inStock is required']
    }
}, {
    toObject : {getters: true},
    toJSON : {getters: true}
});

export default model('product', ProductSchema);