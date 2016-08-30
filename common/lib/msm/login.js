// @flow
import {URL_BASE, doMsmRequest, METHODS} from './helpers';

/**
 * Logs in to the MySchool server.
 * @param  {string} email    The user's email address.
 * @param  {string} password The user's password.
 * @return {Promise<boolean>}          A promise that resolves with the result (success or failure) and rejects after a network error.
 * @MSM-EndpointInfo:
 *  Params: user_email, user_password
 *  Resulting-Http-Codes: 302 with Location / in success, Location /login.php on failure
 */
export default function login(email: string, password: string) : Promise<boolean> {
  return doMsmRequest(METHODS.POST, '/', {user_email: email, user_password: password})
    .then(function(response) {
      return response.url.indexOf('login.php') === -1;
    });
}

export default function logout() : Promise {
  return doMsmRequest(METHODS.GET, '/login.php?m=1', {});
}
