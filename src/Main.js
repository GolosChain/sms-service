const core = require('gls-core-service');
const stats = core.utils.statsClient;
const BasicMain = core.services.BasicMain;
const env = require('./data/env');
const twilio = require('twilio')(env.GLS_SMS_GATE_SECRET_SID, env.GLS_TWILIO_SECRET);
const Connector = require('./services/Connector');
const SmsGate = require('./services/SmsGate');
const SmsSecondCheck = require('./services/SmsSecondCheck');

class Main extends BasicMain {
    constructor() {
        super(stats, env);

        const smsGate = new SmsGate(twilio);
        const smsSecondCheck = new SmsSecondCheck(twilio);
        const connector = new Connector({ smsGate, smsSecondCheck });

        this.addNested(smsGate, smsSecondCheck, connector);
        this.defineMeta({ name: 'sms' });
    }
}

module.exports = Main;
