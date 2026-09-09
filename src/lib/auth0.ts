import { Auth0Client } from "@auth0/nextjs-auth0/server";

// console.log({
//   domain: process.env.AUTH0_DOMAIN,
//   clientId: process.env.AUTH0_CLIENT_ID,
//   hasClientSecret: !!process.env.AUTH0_CLIENT_SECRET,
//   hasAuth0Secret: !!process.env.AUTH0_SECRET,
//   baseUrl: process.env.APP_BASE_URL,
// });

export const auth0 = new Auth0Client();