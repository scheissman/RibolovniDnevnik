import {  obradiUspjeh, httpService } from "./HttpService";

export async function AuthorizationService(userData) {
    return await httpService
        .post("/Auth/login", userData)
        .then((res) => {
            return obradiUspjeh(res);
        })
        .catch((error) => {
            return {
                error: true,
                data: [{ property: "Authorization", message: error.response.data }],
            };
        });
}
export async function register(userData) {
    return await httpService
        .post("/Auth/register", userData)
        .then((res) => {
            return obradiUspjeh(res);
        })
        .catch((error) => {
            return {
                error: true,
                data: [{ property: "Registration", message: error.response.data }],
            };
        });
}
