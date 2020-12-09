const BASE_URL = 'http://localhost:5000/api';
const RESOURCE_URL = `${BASE_URL}/film`;

const baseRequest = async({ urlPath = "", method = "GET", body = null }) => {
    try {
        const reqParams = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        if (body) {
            reqParams.body = JSON.stringify(body);
        }
        return await fetch(`${RESOURCE_URL}${urlPath}`, reqParams);
    } catch (err) {
        err('Sorry something wrong');
    }
};

export const getAllFilms = async() => {
    const rawRes = await baseRequest({ method: "GET" });
    return rawRes.json();
};


export const postFilm = (body) => baseRequest({ method: "POST", body });

export const deleteFilm = (id) => baseRequest({ urlPath: `/${id}`, method: "DELETE" });

export const editFilm = (id, body) => baseRequest({ urlPath: `/${id}`, method: "PATCH", body });