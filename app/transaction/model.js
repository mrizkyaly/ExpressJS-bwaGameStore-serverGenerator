const mongoose = require('mongoose');
let transactionSchema = mongoose.Schema(
    {
        historyVoucherTopup: {
            gameName: {
                type: String,
                require: [true, 'nama game harus di isi'],
            },
            category: {
                type: String,
                require: [true, 'kategori harus di isi'],
            },
            thumbnail: {
                type: String,
            },
            coinName: {
                type: String,
                require: [true, 'nama koin game harus di isi'],
            },
            coinQuantity: {
                type: String,
                require: [true, 'jumlah koin harus di isi'],
            },
            price: { type: Number },
        },
        historyPayment: {
            name: { type: String, require: [true, 'nama harus di isi'] },
            type: {
                type: String,
                require: [true, 'tipe pembayaran harus di isi'],
            },
            bankName: {
                type: String,
                require: [true, 'nama bank harus di isi'],
            },
            noRekening: {
                type: String,
                require: [true, 'nomor rekening harus di isi'],
            },
        },
        name: {
            type: String,
            require: [true, 'nama harus di isi'],
            maxlength: [225, 'panjang nama harus antara 3 - 225 karakter'],
            minlength: [3, 'panjang nama harus antara 3 - 225 karakter'],
        },
        accountUser: {
            type: String,
            require: [true, 'nama harus di isi'],
            maxlength: [225, 'panjang nama harus antara 3 - 225 karakter'],
            minlength: [3, 'panjang nama harus antara 3 - 225 karakter'],
        },
        tax: {
            type: Number,
            default: 0,
        },
        value: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['pending', 'success', 'failed'],
            default: 'pending',
        },
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        },
        historyUser: {
            name: { type: String, require: [true, 'nama yang harus di isi'] },
            phoneNumber: {
                type: Number,
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
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
