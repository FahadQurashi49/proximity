import {Schema, model} from 'mongoose';

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
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
        // remove Rs. $ etc on client end
    },
    inStock: {
        type: Boolean,
        required: [true, 'product date is required']
    }
});

export default model('product', ProductSchema);