import {Schema, model} from 'mongoose';

let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

let ShopSchema: Schema = new Schema({
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
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    online: {
        type: Boolean,
        required: [true, 'online is required']
    },
    phone: {
        type: String,
        minlength: [9, 'Name must be of atleast 9 characters'],
        maxlength: [25, 'Name must be of atmost 25 characters'],
        required: [true, 'phone number is required'],
        dropDups: true
    },

});

export default model('shop', ShopSchema);