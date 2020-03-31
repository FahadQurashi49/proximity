import {Schema, model} from 'mongoose';

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

let OrderSchema: Schema = new Schema({
    name: {
        type: String,
        minlength: [2, 'Name must be of atleast 2 characters'],
        maxlength: [50, 'Name must be of atmost 50 characters'],
        required: [true, 'title is required']
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        required: [true, 'customer is required']
    }, 
    totalPrice: {
        type: Number,
        get: getPrice,
        set: setPrice
        // remove Rs. $ etc on client end
    },
    orderDate: {
        type: Date, // use Date.now()
        required: [true, 'order date is required']
    },
    completionDate: {
        type: Date, // use Date.now()
        required: [true, 'completion date is required']
    },
    status: {
        type: Number,
        required: [true, 'order status is required']
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: [true, 'product is required']
        },
        quantity: {
            type: Number,
            required: [true, 'quantity is required']
        }
    }]
});

export default model('order', OrderSchema);