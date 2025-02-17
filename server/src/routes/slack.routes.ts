import { Router } from 'express';
import { handleSlackEvents } from '../webhooks/slack.webhook';
import {
  connectSlack,
  handleOAuthCallback,
  getChannels,
  updateConfig,
} from '../controllers/slack.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// OAuth routes
router.get('/connect', authMiddleware, connectSlack);
router.get('/oauth/callback', handleOAuthCallback);

// Configuration routes
router.get('/channels', authMiddleware, getChannels);
router.put('/config', authMiddleware, updateConfig);

// Webhook route
router.post('/events', handleSlackEvents);

export default router;
