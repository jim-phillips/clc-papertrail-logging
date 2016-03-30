# papertrail-node
Redirect node server side logging to papertrail.  This will send all console output to your papertrail application.  Console logging is also disabled.

## Environment variables required
  - `NODE_ENV` of 'production', 'staging', or 'dev'
  - `PAPERTRAIL_HOST`
  - `PAPERTRAIL_PORT`.

  The host and port must be set up with an account in [papertrail](https://papertrailapp.com/)

## Installation
`npm install --save git+https://git@github.com/jim-phillips/clc-papertrail-logging.git`

## Usage
`require('clc-papertrail-logging');`

All subsequent console output will be redirected to papertrail.
