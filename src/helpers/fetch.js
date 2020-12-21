const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchNoToken = async ( endpoint, data, method = 'GET' ) => {
    const url = `${BASE_URL}/${endpoint}`;
    let response = null;
    if(method === 'GET'){
        response = await fetch( url );
    }else{

        response = await fetch( url, {
            method,
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        });
    }
    return await response.json();   
}