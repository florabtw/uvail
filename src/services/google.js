import request from "../request.js";

/** Makes an http request to Google to check if a google username is available.
 * You only need to pass in the username, not including "@gmail.com"
 *
 * @param {string} username - The username to check
 * @returns {Promise} result - Promise object with result
 * @returns {boolean} result.available - if the username is available
 * @returns {Array} result.suggestions - suggested usernames by google
 * @throws Will throw for http errors or api errors (e.g. username too short)
 */
const google = async (username) => {
  // Entirely undocumented, but this is the minimum needed request.
  const req = JSON.stringify(["", "", "", username, true, "", 1]);
  const params = new URLSearchParams({ "f.req": req });
  const res = await request({
    body: params.toString(),
    options: {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Google-Accounts-XSRF": "1",
      },
      hostname: "accounts.google.com",
      method: "POST",
      path: "/_/signup/webusernameavailability",
    },
  });

  const json = JSON.parse(res.slice(5));
  const [[key, status, _suggestions, error]] = json;

  if (key === "er") throw new Error();
  if (status === 3) throw new Error(error);

  return status === 1;
};

export default google;
