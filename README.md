# Sky Tonight API

[![GH-release](https://img.shields.io/github/v/release/wwwescape/sky-tonight-api.svg?style=flat-square)](https://github.com/wwwescape/sky-tonight-api/releases)
[![GH-last-commit](https://img.shields.io/github/last-commit/wwwescape/sky-tonight-api.svg?style=flat-square)](https://github.com/wwwescape/sky-tonight-api/commits/master)
[![GH-code-size](https://img.shields.io/github/languages/code-size/wwwescape/sky-tonight-api.svg?color=red&style=flat-square)](https://github.com/wwwescape/sky-tonight-api)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg?style=flat-square)](https://github.com/hacs/default)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/wwwescape/sky-tonight-api/main.svg?style=flat-square)](https://codecov.io/gh/wwwescape/sky-tonight-api/)
[![CodeFactor](https://www.codefactor.io/repository/github/wwwescape/sky-tonight-api/badge?style=flat-square)](https://www.codefactor.io/repository/github/wwwescape/sky-tonight-api)


#### Get list of visible planetary bodies in your sky.

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
GET https://{IP Address or Domain with/without port}?latitude=32&longitude=-98
```

Get a list of planets, the sun and the moon with their declination and right ascension coordinates.
```
GET https://{IP Address or Domain with/without port}?latitude=32&longitude=-98&showCoords=true
```

## Query Parameters

| Param         | Default       | Description                                                                                                   |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------------- |
| latitude      | 28.627222     | Latitude of the observer                                                                                      |
| longitude     | -80.620833    | Longitude of the observer                                                                                     |
| elevation     | 0             | Elevation of the observer in meters above sea level                                                           |
| time          | null          | Time of observation in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format, defaults to time of request |
| showCoords    | false         | Display declination and right ascension of each body, expects true or false                                   |
| aboveHorizon  | true          | Set to false to display all planetary bodies even if they are below the horizon                               |

## TODO
- [ ] Reduce the size of the Docker image created
- [ ] Fix issue with Node not picking up the correct timezone from the Docker container