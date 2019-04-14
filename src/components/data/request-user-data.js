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

export const post = request('POST');