// SMS Utility using Twilio (Structure)
// To enable, install twilio: npm install twilio
// And set env vars: TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER

const sendSMS = async (options) => {
    // Check if Twilio is configured
    if (!process.env.TWILIO_SID || !process.env.TWILIO_AUTH_TOKEN) {
        console.warn('[SMS SERVICE] Twilio credentials missing in .env. SMS not actually sent.');
        console.log(`[MOCK SMS] To: ${options.phone}, Message: ${options.message}`);
        return;
    }

    try {
        const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

        await client.messages.create({
            body: options.message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: options.phone
        });

        console.log(`[SMS SERVICE] SMS sent to ${options.phone}`);
    } catch (error) {
        console.error('[SMS SERVICE] Error sending SMS:', error.message);
        throw new Error('SMS could not be sent');
    }
};

module.exports = sendSMS;
