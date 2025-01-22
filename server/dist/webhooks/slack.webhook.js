"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slackInteractiveResponse = exports.handleSlackEvents = void 0;
const handleSlackEvents = (req, res, next) => {
    try {
        const { type, event } = req.body;
        if (type === 'url_verification') {
            res.status(200).send(req.body.challenge);
            return;
        }
        console.log('Slack Event:', event);
        if (event && event.type === 'message') {
            console.log('Message Event:', event.text);
        }
        res.status(200).send('Event processed');
    }
    catch (error) {
        console.error('Error handling Slack event:', error);
        next(error);
    }
};
exports.handleSlackEvents = handleSlackEvents;
const slackInteractiveResponse = (req, res, next) => {
    try {
        const payload = JSON.parse(req.body.payload);
        console.log('Interactive Payload:', payload);
        if (payload.type === 'block_actions') {
            console.log('Block Actions:', payload.actions);
        }
        res.status(200).send('Interactive response processed');
    }
    catch (error) {
        console.error('Error handling Slack interactive response:', error);
        next(error);
    }
};
exports.slackInteractiveResponse = slackInteractiveResponse;
//# sourceMappingURL=slack.webhook.js.map