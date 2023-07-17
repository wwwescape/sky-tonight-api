const Sky = require('./sky');
const config = require('../config');

function getBoolean(value, defaultValue) {
    if (!value) {
        return defaultValue;
    }
    return value.toLowerCase() === 'true';
}

module.exports = (req, res, next) => {
    const latitude = Number(req.query.latitude) || config.defaults.latitude;
    const longitude = Number(req.query.longitude) || config.defaults.longitude;
    const elevation = Number(req.query.elevation) || config.defaults.elevation;
    const time = new Date(req.query.time || config.defaults.time);
    const showCoords = getBoolean(req.query.showCoords, config.defaults.showCoords);
    const aboveHorizon = getBoolean(req.query.aboveHorizon, config.defaults.aboveHorizon);

    const sky = new Sky({
        time,
        latitude,
        longitude,
        elevation,
    });

    const data = sky.get({ showCoords, aboveHorizon });
    const links = {
        self: 'https://' + req.get('host') + req.originalUrl,
        engine: `https://www.npmjs.com/package/astronomy-engine`,
    };

    return res.json({
        meta: {
            latitude,
            longitude,
            elevation,
            time,
            showCoords,
            aboveHorizon,
            engineVersion: sky.engine_version
        },
        data,
        links
    });
}