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
