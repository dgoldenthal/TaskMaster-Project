import { Request, Response, NextFunction } from 'express';

/**
 * Handle incoming Slack events.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function for error handling
 */
export const handleSlackEvents = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { type, event } = req.body;

    // Handle URL verification for Slack
    if (type === 'url_verification') {
      res.status(200).send(req.body.challenge);
      return;
    }

    // Log the event for debugging
    console.log('Slack Event:', event);

    // Process specific events
    if (event && event.type === 'message') {
      console.log('Message Event:', event.text);
      // Add your custom message processing logic here
    }

    res.status(200).send('Event processed');
  } catch (error) {
    console.error('Error handling Slack event:', error);
    next(error);
  }
};

/**
 * Handle interactive Slack components (e.g., buttons, modals).
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function for error handling
 */
export const slackInteractiveResponse = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const payload = JSON.parse(req.body.payload); // Parse the payload sent by Slack

    console.log('Interactive Payload:', payload);

    // Process block actions or other interactions
    if (payload.type === 'block_actions') {
      console.log('Block Actions:', payload.actions);
      // Add your logic for handling block actions here
    }

    res.status(200).send('Interactive response processed');
  } catch (error) {
    console.error('Error handling Slack interactive response:', error);
    next(error);
  }
};
