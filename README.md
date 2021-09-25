# JokeList
 A Node.JS script that lists all jokes of the joke API "[blagues-api](https://www.blagues-api.fr)". It's a french API.

### You will need an API key for this program to work. You can get it [here](https://www.blagues-api.fr/login).

## Installation
Download files
Run `npm install`

## Configuration
Rename the file `config.json.example` to `config.json`

### Config values
- api_key: String, The API key that will be used to get jokes, get it [here](https://www.blagues-api.fr/login).
- debug: true or false, if debug is true, display some debug information (not fully implemented yet)
- export_format: The format that will be used for exported joke. Available placeholders: %joke%, %answer%, %id%, %type%

## Launch

Run `node index.js`


## If you have an issue or want to contribute feel free to make an issue!