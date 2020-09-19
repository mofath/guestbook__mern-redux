const { NotificationModel } = require('../models/notification');
const DBManager = require('../utils/DBManager');
const { serverErrMsg } = require('../utils/data')
ObjectId = require('mongodb').ObjectID;

const notificationController = {

    createNotification: async (req, res, next) => {
        console.log('\x1b[33m%s\x1b[0m', "...NOTIFICATION CREATED...");
        let recievers = [];
        let notifiers = [];
        let notifications = [];
        const sender = req.userInfo.id;
        const post = req.params.id;

        recievers.push((req.post.writer._id).toString());

        req.post.replies.forEach((reply) => recievers.push((reply.writer._id).toString()));

        notifiers = recievers.filter((element, index, arr) =>
            arr.indexOf(element) == index && element !== sender.toString())


        notifiers.forEach((el) => notifications.push({ post, sender, receipient: el }))

        try {
            const saved = await NotificationModel.insertMany(notifications)
            console.log(saved);
        }
        catch (err) {
            console.log(err);
        }


    }

};

module.exports = notificationController;