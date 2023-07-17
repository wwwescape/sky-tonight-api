# Skt Tonight API

## Get realtime planetary positions in your sky.
A free JSON API powered by [Don Cross' JS Astronomy Engine](http://cosinekitty.com/astronomy.js).

## Run

```
npm install
npm start
```

Remember to update volume path, port and timezone as needed.

## Running using Docker compose

```
docker compose up -d
```

Remember to update volume path, port and timezone as needed.

## Usage

Get a list of planets, the sun and the moon above the horizon.
```
GET https://{IP Address or Domain with/without port}/v3?latitude=32&longitude=-98
```

Get a list of planets, the sun and the moon with their declination and right ascension coordinates.
```
GET https://{IP Address or Domain with/without port}/v3?latitude=32&longitude=-98&showCoords=true
```

## Query Parameters

| Param | Default Value | Description | Minimum Version Compatible |
| ----- | ------------- | ----------- | -------------------------- |
| latitude | 28.627222 | Latitude of observer | v1 |
| longitude | -80.620833 | Longitude of observer | v1 |
| elevation | 0 | Elevation of observer in meters above sea level | v1 |
| time | null | Time of observation in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format, defaults to time of request | v2 |
| showCoords | false | Display declination and right ascension of each body, expects true or false | v2 |
| aboveHorizon | true | Set to false to display all planetary bodies even if they are below the horizon. | v2 |

## TODOs and Known Issues:
- Reduce the size of the Docker image created
- Figure out why Node isn't picking up the correct timezone from the Docker container.