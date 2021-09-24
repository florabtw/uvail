import https from "https";

const request = ({ body, options }) =>
  new Promise((resolve, reject) => {
    let data = "";
    const req = https.request(options, (res) => {
      res.on("data", (d) => (data += d));
      res.on("end", () => resolve(data));
    });
    if (body) req.write(body);
    req.on("error", (e) => reject(e));
    req.end();
  });

export default request;
