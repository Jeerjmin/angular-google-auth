# GoogleAuthAngular

You can look https://jeerjmin.github.io/angular-google-auth

## Run local

1. Create A Google App https://console.developers.google.com/apis/credentials
2. Set project and add your localhost address to whitelist
3. Create .env file and set up

GOOGLE_CLIENT_ID=<You google client id> that you can get via google console
DISCOVERY_DOCS="['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']"
SCOPES="https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.photos.readonly"


4. Finally go to root project directory and run yarn install, yarn run config for setup angular environment, yarn start
