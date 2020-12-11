import jwt from 'jsonwebtoken';
import config from '../appConfig.js';
import { _isEmpty as isEmpty } from 'underscore';

export function getPatronData(req, res) {
  if (req.patronTokenResponse.isTokenValid
    && req.patronTokenResponse.decodedPatron
    && req.patronTokenResponse.decodedPatron.sub
  ) {
    const userId = req.patronTokenResponse.decodedPatron.sub;

// to-do: implement nyplApiClient
// get bug related to 'fs'
    // return nyplApiClient()
    //   .then(client =>
    //     client.get(`/patrons/${userId}`, { cache: false })
    //       .then((response) => {
    //         if (_isEmpty(response)) {
    //           // Data is empty for the Patron
    //           const patron = {
    //             id: '',
    //             names: [],
    //             barcodes: [],
    //             emails: [],
    //             loggedIn: false,
    //           };
    //
    //           return patron;
    //         }
    //         // Data exists for the Patron
    //         return {
    //           id: response.data.id,
    //           names: response.data.names,
    //           barcodes: response.data.barCodes,
    //           emails: response.data.emails,
    //           loggedIn: true,
    //         };
    //       })
    //       .catch((error) => {
    //         console.error(
    //           'Error attemping to make server side fetch call to patrons in getPatronData' +
    //           `, /patrons/${userId}`,
    //           error,
    //         );
    //         const patron = {
    //           id: '',
    //           names: [],
    //           barcodes: [],
    //           emails: [],
    //           loggedIn: false,
    //         };
    //
    //         dispatch(updatePatronData(patron));
    //         // Continue next function call
    //         next();
    //       }),
    //   );
  }

  return {
    id: '',
    names: [],
    barcodes: [],
    emails: [],
    loggedIn: false,
  };
}


export function requireUser(req, res) {
  console.log('res', res);
  const patronTokenResponse = initializePatronTokenAuth(req, res);
  if (
    !patronTokenResponse ||
    !patronTokenResponse.isTokenValid ||
    !patronTokenResponse.decodedPatron ||
    !patronTokenResponse.decodedPatron.sub
  ) {
    // redirect to login
    console.log('need to redirect');
    res.statusCode = 302
    const fullUrl = encodeURIComponent(req.headers.referer);
    res.setHeader('Location', `${config.loginUrl}?redirect_uri=${fullUrl}`)
    res.end();
  }
}

function initializePatronTokenAuth(req, res) {
  const nyplIdentityCookieString = req.cookies.nyplIdentityPatron;
  const nyplIdentityCookieObject = nyplIdentityCookieString ?
    JSON.parse(nyplIdentityCookieString) : {};

  if (nyplIdentityCookieObject && nyplIdentityCookieObject.access_token) {
    return jwt.verify(nyplIdentityCookieObject.access_token, config.publicKey, (error, decoded) => {
      if (error) {
        // Token has expired, need to refresh token
        req.patronTokenResponse = {
          isTokenValid: false,
          errorCode: error.message,
        };
        return next();
      }

      // Token has been verified, initialize user session
      return {
        isTokenValid: true,
        decodedPatron: decoded,
        errorCode: null,
      };
    });
  }
  // Token is undefined from the cookie
  return {
    isTokenValid: false,
    errorCode: 'token undefined',
  };
}
