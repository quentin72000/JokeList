# JokeList
 A Node.JS script that lists all jokes of the joke API "[blagues-api](https://www.blagues-api.fr)". It's a french API.

### You will need an API key for this program to work. You can get it [here](https://www.blagues-api.fr/login).

## Installation
Download files

Run the file `setup.bat` (rename it to "setup.sh"if you use linux or Mac)

## Configuration
Rename the file `config.json.example` to `config.json`

### Config values
- api_key: String, The API key that will be used to get jokes, get it [here](https://www.blagues-api.fr/login).
- debug: true or false, if debug is true, display some debug information (not fully implemented yet)
- output_type: JSON or TEXT, will be the displayed output type
- export_format: The format that will be used for exported joke. Available placeholders: %joke%, %answer%, %id%, %type%

## Launch

Run the file `run.bat` (rename it to "run.sh"if you use linux or Mac)


## If you have an issue or want to contribute feel free to make an issue!