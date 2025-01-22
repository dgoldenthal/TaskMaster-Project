"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConfig = exports.getChannels = exports.handleOAuthCallback = exports.connectSlack = void 0;
const web_api_1 = require("@slack/web-api");
const slackToken = process.env.SLACK_BOT_TOKEN || '';
const slackClient = new web_api_1.WebClient(slackToken);
const connectSlack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const redirectUri = `${process.env.SLACK_REDIRECT_URI}`;
        const slackOAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=channels:read,chat:write&redirect_uri=${redirectUri}`;
        res.redirect(slackOAuthUrl);
    }
    catch (error) {
        console.error('Error in connectSlack:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.connectSlack = connectSlack;
const handleOAuthCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield slackClient.oauth.v2.access({
            client_id: process.env.SLACK_CLIENT_ID || '',
            client_secret: process.env.SLACK_CLIENT_SECRET || '',
            code: req.query.code,
        });
        const accessToken = response.access_token;
        if (!accessToken) {
            console.error('Error: access_token is undefined');
            res.status(500).send('Failed to retrieve access token');
            return;
        }
        console.log('Slack Access Token:', accessToken);
        res.status(200).send('OAuth successful');
    }
    catch (error) {
        console.error('Error in handleOAuthCallback:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.handleOAuthCallback = handleOAuthCallback;
const getChannels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield slackClient.conversations.list();
        const channels = result.channels || [];
        res.status(200).json(channels);
    }
    catch (error) {
        console.error('Error fetching Slack channels:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.getChannels = getChannels;
const updateConfig = (req, res) => {
    try {
        const { channelId } = req.body;
        if (!channelId) {
            res.status(400).send('channelId is required');
            return;
        }
        console.log(`Updating Slack configuration for channel: ${channelId}`);
        res.status(200).send(`Configuration updated for channel: ${channelId}`);
    }
    catch (error) {
        console.error('Error in updateConfig:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.updateConfig = updateConfig;
//# sourceMappingURL=slack.controller.js.map