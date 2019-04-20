function request(method){

    return async (url, data = {}) => {
        
        const response = await fetch(
            url,
            {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );
        
        return response.json();

    };
}

const post = request('POST');

export {post};