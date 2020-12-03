// Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'xpgzsqzndb'
export const apiEndpoint = `https://${apiId}.execute-api.eu-west-1.amazonaws.com/dev`
// export const apiEndpoint = `https://ammarqureshi.tech/dev`

export const authConfig = {
  domain: 'dev-eapvudib.eu.auth0.com', // Auth0 domain
  clientId: 'SBgAGtN34KEpYMh3POFFtzBUbeHcTU4G', // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
