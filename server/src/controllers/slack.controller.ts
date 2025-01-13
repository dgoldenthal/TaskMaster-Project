// server/src/controllers/slack.controller.ts
import { Request, Response } from 'express';
import { WebClient } from '@slack/web-api';
import { createEventAdapter } from '@slack/events-api';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/database';

const slackToken = process.env.SLACK_BOT_TOKEN || '';
const slackClient = new WebClient(slackToken);

/**
 * Connect to Slack OAuth
 */
export const connectSlack = async (req: Request, res: Response): Promise<void> => {
  try {
    const redirectUri = `${process.env.SLACK_REDIRECT_URI}`;
    const slackOAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=channels:read,chat:write&redirect_uri=${redirectUri}`;
    res.redirect(slackOAuthUrl);
  } catch (error) {
    console.error('Error in connectSlack:', error);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * Handle Slack OAuth callback
 */
export const handleOAuthCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await slackClient.oauth.v2.access({
      client_id: process.env.SLACK_CLIENT_ID || '',
      client_secret: process.env.SLACK_CLIENT_SECRET || '',
      code: req.query.code as string,
    });

    const accessToken = response.access_token;

    if (!accessToken) {
      console.error('Error: access_token is undefined');
      res.status(500).send('Failed to retrieve access token');
      return;
    }

    console.log('Slack Access Token:', accessToken);
    res.status(200).send('OAuth successful');
  } catch (error) {
    console.error('Error in handleOAuthCallback:', error);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * Get Slack channels
 */
export const getChannels = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await slackClient.conversations.list();
    const channels = result.channels || [];
    res.status(200).json(channels);
  } catch (error) {
    console.error('Error fetching Slack channels:', error);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * Update Slack configuration
 */
export const updateConfig = (req: Request, res: Response): void => {
  try {
    const { channelId } = req.body;

    if (!channelId) {
      res.status(400).send('channelId is required');
      return;
    }

    // Example logic for updating configuration
    console.log(`Updating Slack configuration for channel: ${channelId}`);
    res.status(200).send(`Configuration updated for channel: ${channelId}`);
  } catch (error) {
    console.error('Error in updateConfig:', error);
    res.status(500).send('Internal Server Error');
  }
};