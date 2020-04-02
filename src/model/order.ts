import {Schema, model} from 'mongoose';
import product from './Product';
import customer from './Customer';

function getPrice(num: number): string {
    return (num/100).toFixed(2);
}

function setPrice(num: number): Number {
    return num*100;
}

function getDate(date: any) {
    return new Date(date).getTime();
}

let OrderSchema: Schema = new Schema({
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
        required: [true, 'order date is required'],
        get: getDate
    },
    completionDate: {
        type: Date, // use Date.now()
        required: false,
        get: getDate
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
}, {
    toObject : {getters: true},
    toJSON : {getters: true}
});

export default model('order', OrderSchema);