const { Body, Observer, Equator, Horizon, Illumination, MoonPhase, Constellation, SearchRiseSet } = require('astronomy-engine');
const config = require('../config');

const NakedEyeObjects = [
    Body.Sun, Body.Moon, Body.Mercury, Body.Venus, Body.Earth, Body.Mars, Body.Jupiter, Body.Saturn,
];

const IncludedBodies = [
    Body.Sun, Body.Moon, Body.Mercury, Body.Venus, Body.Mars, Body.Jupiter, Body.Saturn, Body.Uranus, Body.Neptune, Body.Pluto
];

class Sky {

    constructor(opts = {}) {
        let options = Object.assign({}, config.defaults, opts);
        this.engine_version = config.engineVersion;
        this.location = new Observer(options.latitude, options.longitude, options.elevation);
        this.time = options.time;
    }

    getDMS(x) {
        var a = {};

        a.negative = (x < 0);
        if (a.negative) {
            x = -x;
        }

        a.degrees = Math.floor(x);
        x = 60.0 * (x - a.degrees);
        a.arcminutes = Math.floor(x);
        x = 60.0 * (x - a.arcminutes);
        a.arcseconds = Math.round(10.0 * x) / 10.0;   // Round to the nearest tenth of an arcsecond.

        return a;
    }

    getHMS(x) {
        var a = {};

        a.negative = (x < 0);
        if (a.negative) {
            x = -x;
        }

        a.hours = Math.floor(x);
        x = 60.0 * (x - a.hours);
        a.minutes = Math.floor(x);
        x = 60.0 * (x - a.minutes);
        a.seconds = Math.round(10.0 * x) / 10.0;   // Round to the nearest tenth of an arcsecond.

        return a;
    }

    getStartOfDay(originalDate) {
        let startOfDay = new Date(originalDate);
        // Set hours, minutes, seconds, and milliseconds to 0
        startOfDay.setHours(0, 0, 0, 0);

        return startOfDay;
    }

    getMoonPhaseName(phaseValue) {
        const phaseMappings = [
            { name: 'New Moon', range: [0, 45] },
            { name: 'Waxing Crescent', range: [45, 90] },
            { name: 'First Quarter', range: [90, 135] },
            { name: 'Waxing Gibbous', range: [135, 180] },
            { name: 'Full Moon', range: [180, 225] },
            { name: 'Waning Gibbous', range: [225, 270] },
            { name: 'Last Quarter', range: [270, 315] },
            { name: 'Waning Crescent', range: [315, 360] }
        ];

        const normalizedPhaseValue = (phaseValue % 360 + 360) % 360; // Normalize phase value to range between 0 and 359

        for (const mapping of phaseMappings) {
            const [minRange, maxRange] = mapping.range;
            if (normalizedPhaseValue >= minRange && normalizedPhaseValue < maxRange) {
                return mapping.name;
            }
        }

        return 'Unknown'; // If no matching range is found
    }

    get(options = {}) {
        let output = []
        Object.keys(Body).filter(key => IncludedBodies.includes(key)).forEach(body => {
            let item = {
                name: body,
            }

            const eq = new Equator(Body[body], this.time, this.location, true, true)
            const hc = new Horizon(this.time, this.location, eq.ra, eq.dec, 'normal')
            const constellation = new Constellation(eq.ra, eq.dec)
            let rise = new SearchRiseSet(Body[body], this.location, +1, this.getStartOfDay(this.time), 300);
            let set = new SearchRiseSet(Body[body], this.location, -1, this.getStartOfDay(this.time), 300);

            // If the body has already set, get the next day's rise and set times
            if (set.date < this.time) {
                const nextDate = new Date(this.time);
                nextDate.setDate(nextDate.getDate() + 1);
                rise = new SearchRiseSet(Body[body], this.location, +1, this.getStartOfDay(nextDate), 300);
                set = new SearchRiseSet(Body[body], this.location, -1, this.getStartOfDay(nextDate), 300);
            }

            item.rise = rise.date;
            item.set = set.date;
            item.constellation = constellation.name
            item.rightAscension = this.getHMS(hc.ra)
            item.declination = this.getDMS(hc.dec)
            item.rightAscension.raw = hc.ra
            item.declination.raw = hc.dec
            item.altitude = hc.altitude
            item.azimuth = hc.azimuth
            item.aboveHorizon = hc.altitude > 0

            if (body == Body.Moon) {
                const moonPhase = MoonPhase(this.time);
                const phase = (moonPhase / 360) * 100;
                item.phase = phase;
                item.phaseName = this.getMoonPhaseName(moonPhase);
            }

            const illumination = new Illumination(Body[body], this.time)
            item.magnitude = illumination.mag

            item.nakedEyeObject = NakedEyeObjects.indexOf(body) > -1

            if ((item.aboveHorizon && options.aboveHorizon) || !options.aboveHorizon) {
                output.push(item)
            }
        })

        return output
    }

}

module.exports = Sky