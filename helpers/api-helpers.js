import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

/**
 * helper methods for common HTTP request checks.
 *
 * example usage:
 *
 * import { withAuthCheck, withMethodCheck } from './helper';
 *
 * async function handle(req, res) {
 *   // Do something
 * }
 *
 * export default withAuthCheck(withMethodCheck(handle));
 */

/**
 * higher-order function to check if a user is authenticated before
 * handling an HTTP request.
 *
 * @param {Function} handler - the function to handle the HTTP request
 * @returns {Function} the new handler function with the added authentication check
 */
export const withAuthCheck = (handler) => {
  return async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401).json({
        message: "Unauthorized. Please sign in before accessing this resource.",
      });
      return;
    }

    // If the check passed, call the actual handler
    return handler(req, res);
  };
};

/**
 * higher-order function to check the method of an HTTP request before
 * handling it.
 *
 * @param {Function} handler - the function to handle the HTTP request
 * @param {string} method - the HTTP method that the request should be
 * @returns {Function} the new handler function with the added method check
 */
export const withMethodCheck = (handler, method = "POST") => {
  return (req, res) => {
    if (req.method !== method) {
      console.error(`Only ${method} requests permitted`);
      res.status(405).send();
      return;
    }

    // If the check passed, call the actual handler
    return handler(req, res);
  };
};
