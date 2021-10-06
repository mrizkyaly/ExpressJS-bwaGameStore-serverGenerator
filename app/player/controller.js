const Player = require('./model');
const Voucher = require('../voucher/model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');
const Bank = require('../bank/model');
const Payment = require('../payment/model');
const Transaction = require('../transaction/model');

module.exports = {
    landingPage: async (req, res) => {
        try {
            const voucher = await Voucher.find()
                .select('_id name status category thumbnail')
                .populate('category');
            res.status(200).json({ data: voucher });
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error !!',
            });
        }
    },
    detailPage: async (req, res) => {
        try {
            const { id } = req.params;
            const voucher = await Voucher.findOne({ _id: id })
                .populate('category')
                .populate('nominals')
                .populate('user', '_id name phoneNumber');

            if (!voucher) {
                res.status(404).json({
                    message: 'Voucher game tidak ditemukan !!',
                });
            }

            res.status(200).json({ data: voucher });
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error !!',
            });
        }
    },
    category: async (req, res) => {
        try {
            const category = await Category.find();
            res.status(200).json({ data: category });
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error !!',
            });
        }
    },
    checkout: async (req, res) => {
        try {
            const { accountUser, name, nominal, voucher, payment, bank } =
                req.body;
            const res_voucher = await Voucher.findOne({ _id: voucher })
                .select('name category _id thumbnail user')
                .populate('category')
                .populate('user');

            if (!res_voucher)
                return res
                    .status(404)
                    .json({ message: 'Voucher game tidak ditemukan' });

            const res_nominal = await Nominal.findOne({ id: nominal });

            if (!res_nominal)
                return res
                    .status(404)
                    .json({ message: 'Nominal game tidak ditemukan' });

            const res_payment = await Payment.findOne({ id: payment });

            if (!res_payment)
                return res
                    .status(404)
                    .json({ message: 'Payment game tidak ditemukan' });

            const res_bank = await Bank.findOne({ id: bank });

            if (!res_bank)
                return res
                    .status(404)
                    .json({ message: 'Bank game tidak ditemukan' });

            let tax = (10 / 100) * res_nominal._doc.price;
            let value = res_nominal._doc.price - tax;

            const payload = {
                historyVoucherTopup: {
                    gameName: res_voucher._doc.name,
                    category: res_voucher._doc.category
                        ? res_voucher._doc.category_name
                        : '',
                    thumbnail: res_voucher._doc.thumbnail,
                    coinName: res_nominal._doc.coinName,
                    coinQuantity: res_nominal._doc.coinQuantity,
                    price: res_nominal._doc.price,
                },
                historyPayment: {
                    name: res_bank._doc.name,
                    type: res_payment._doc.type,
                    bankName: res_bank._doc.bankName,
                    noRekening: res_bank._doc.noRekening,
                },
                name: name,
                accountUser: accountUser,
                tax: tax,
                value: value,
                player: req.player._id,
                historyUser: {
                    name: res_voucher._doc.user?.name,
                    phoneNumber: res_voucher._doc.user?.phoneNumber,
                },

                category: res.voucher._doc.category?._id,
                user: res_voucher._doc.user?._id,
            };
            const transaction = Transaction(payload);
            await transaction.save();

            res.status(201).json({ data: payload });
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error !!',
            });
        }
    },
};
