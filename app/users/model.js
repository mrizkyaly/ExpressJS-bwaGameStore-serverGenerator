const mongoose = require('mongoose');
let userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: [true, 'email harus di isi'],
        },
        name: {
            type: String,
            require: [true, 'nama harus di isi'],
        },
        password: {
            type: String,
            require: [true, 'password harus di isi'],
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
        phoneNumber: {
            type: String,
            require: [true, 'nomor telepon harus di isi'],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
