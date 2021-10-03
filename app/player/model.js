const mongoose = require('mongoose');

let playerSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: [true, 'email harus di isi'],
        },
        name: {
            type: String,
            require: [true, 'nama harus di isi'],
            maxlength: [225, 'panjang nama harus antara 3 - 225'],
            minlength: [3, 'panjang nama harus antara 3-225'],
        },
        username: {
            type: String,
            require: [true, 'username harus di isi'],
            maxlength: [225, 'panjang username harus antara 3 - 225'],
            minlength: [3, 'panjang username harus antara 3-225'],
        },
        password: {
            type: String,
            require: [true, 'password harus di isi'],
            maxlength: [225, 'panjang password maksimal 225 karakter'],
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'admin',
        },
        status: {
            type: String,
            enum: ['Y', 'N'],
            default: 'Y',
        },
        avatar: {
            type: String,
        },
        filename: {
            type: String,
        },
        phoneNumber: {
            type: String,
            require: [true, 'nomor telepon  harus di isi'],
            maxlength: [
                13,
                'panjang nomor telepon harus antara 9 - 13 karakter',
            ],
            minlength: [
                9,
                'panjang nomor telepon harus antara 9 - 13 karakter',
            ],
        },
        favorite: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Player', playerSchema);
