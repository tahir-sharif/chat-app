export const apiUrl = (url = "") => {
  const isForSocket = url && typeof url === "boolean";
  const subURL = isForSocket ? "" : "/api" + url;

  const _DEPLOYED_URL =
    "https://chat-server-l9wsph65l-tahir150.vercel.app" + subURL;
  const _LOCAL_URL = "http://localhost:6500" + subURL;

  const enviromentsURL = {
    production: _DEPLOYED_URL,
    development: _LOCAL_URL,
  };

  const _CONNECTION_URL = enviromentsURL[process.env.NODE_ENV] || _DEPLOYED_URL;

  return _CONNECTION_URL;
};
