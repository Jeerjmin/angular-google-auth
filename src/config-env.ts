const fs = require( 'fs' );
require('dotenv').config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const DISCOVERY_DOCS = process.env.DISCOVERY_DOCS;
const SCOPES = process.env.SCOPES;

const prodTargetPath = `./src/environments/environment.prod.ts`;
const devTargetPath = `./src/environments/environment.ts`;

const envConfigFile = `export const environment = {
    production: true,
    GOOGLE_CLIENT_ID: '${GOOGLE_CLIENT_ID}',
    DISCOVERY_DOCS: ${DISCOVERY_DOCS},
    SCOPES: '${SCOPES}'
};
`;

fs.writeFile(prodTargetPath, envConfigFile, (err) => {
  if (err) {
    console.log(err);
  }
});

fs.writeFile(devTargetPath, envConfigFile, (err) => {
  if (err) {
    console.log(err);
  }
});
