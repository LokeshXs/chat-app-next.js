/**
 * An array of routes that are accessible to the public
 * these routes do not require authentication
 * @type {string;}
 */

export const PUBLIC_ROUTES = ["/"];

/**
 * An Array of routes that are used for authentication
 * These routes will redirect logged in users to /chat
 * @type {string[]}
 */

export const AUTH_ROUTES = ["/signin", "/signup"];

/**
 * The prefix for API authentication routes
 * Routes that starts with this prefix are used for API authentication purposes
 * @type {string}
 */

// todo: Remove the messages routes should only be accessible if user is logged in
export const API_AUTH_PREFIX = ["/api/auth"];

/**
 * The default redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/chat";
