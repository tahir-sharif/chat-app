export const apiUrl = (url = "") => {
  const _DEPLOYED_URL =
    "https://chat-server-l9wsph65l-tahir150.vercel.app/api" + url;
  const _LOCAL_URL = "http://localhost:6500/api" + url;

  const enviromentsURL = {
    production: _DEPLOYED_URL,
    development: _LOCAL_URL,
  };

  return enviromentsURL[process.env.NODE_ENV] || _LOCAL_URL;
};
