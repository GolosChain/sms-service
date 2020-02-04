const core = require('gls-core-service');
const BasicService = core.services.Basic;
const Moments = core.utils.Moments;
const Logger = core.utils.Logger;
const stats = core.utils.statsClient;
const env = require('../data/env');

class SmsSecondCheck extends BasicService {
    constructor(twilio) {
        super();

        this._twilio = twilio;
    }

    async start() {
        this.startLoop(env.GLS_SMS_SECOND_CHECK_INTERVAL, env.GLS_SMS_SECOND_CHECK_INTERVAL);
    }

    async stop() {
        this.stopLoop();
    }

    async iteration() {
        const history = await this._extractPhonesHistory();

        if (history.length) {
            this.emit(
                'recentList',
                history.map(phone => {
                    return { phone };
                })
            );
        }
    }

    async _extractPhonesHistory() {
        let history = [];

        try {
            history = await this._extractPhonesHistoryFromTWILIO();
        } catch (error) {
            Logger.error(`Get history from TWILIO - ${error}`);
            stats.increment('get_history_from_twilio_error');
        }

        return history;
    }

    async _extractPhonesHistoryFromTWILIO() {
        const ago = env.GLS_SMS_SECOND_CHECK_HISTORY_HOURS + 1;
        const query = { dateSent: Moments.ago(ago) };
        const result = [];

        this._twilio.messages.each(query, message => result.push(message.from));

        return result;
    }
}

module.exports = SmsSecondCheck;
