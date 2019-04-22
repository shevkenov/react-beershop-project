function request(method) {
  let requestHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };

  const token = window.localStorage.getItem("auth_token");

  if (token) {
    requestHeaders.Authorization = "Bearer " + token;
  }

  return async (url, data = {}) => {

    const body = Object.keys(data).length ? JSON.stringify(data) : undefined;
    
    const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body
    });

    return response.json();
  };
}

const get = request("GET");
const post = request("POST");
const remove = request("DELETE");
export { get, post, remove };
