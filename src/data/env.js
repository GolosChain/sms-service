const env = process.env;

module.exports = {
    GLS_SMS_GATE_HOST: env.GLS_SMS_GATE_HOST || '0.0.0.0',
    GLS_SMS_GATE_PORT: Number(env.GLS_SMS_GATE_PORT) || 8090,
    GLS_SMS_GATE_SECRET_SID: env.GLS_SMS_GATE_SECRET_SID,
    GLS_SMS_GATE_LOGIN: env.GLS_SMS_GATE_LOGIN,
    GLS_SMS_GATE_PASS: env.GLS_SMS_GATE_PASS,
    GLS_TWILIO_SECRET: env.GLS_TWILIO_SECRET,
    GLS_TWILIO_PHONE_FROM: env.GLS_TWILIO_PHONE_FROM,
    GLS_SMS_SECOND_CHECK_HISTORY_HOURS: Number(env.GLS_SMS_SECOND_CHECK_HISTORY_HOURS) || 1,
    GLS_SMS_SECOND_CHECK_INTERVAL: Number(env.GLS_SMS_SECOND_CHECK_INTERVAL) || 61 * 1000,
    GLS_REGISTRATION_CONNECT: env.GLS_REGISTRATION_CONNECT,
};
