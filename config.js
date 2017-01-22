require('dotenv').load();

var config = {};

config.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
config.twilioAuthToken  = process.env.TWILIO_AUTH_TOKEN;
config.twilioPhoneNumber= process.env.TWILIO_PHONE_NUMBER;

console.log(config);

var requiredConfig = [config.twilioAccountSid,
 	config.twilioAuthToken, config.twilioPhoneNumber];
 var isConfigured = requiredConfig.every(function(configValue){
 	return configValue || false;
 });

 if (!isConfigured) {
 	var error = 'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER must be set.';

 	throw new Error(error);
 }

module.exports = config;
