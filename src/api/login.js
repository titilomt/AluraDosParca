const authenticate = async (userName, password) => {


    const httpHeader = {
        method: "POST",
        body: JSON.stringify({
            userName,
            password
        }),
        headers: {
            "Content-type": "application/json"
        }
    }

    const resp = await fetch(
        "http://192.168.0.15:3030/users/login",
        httpHeader
    );

    if (resp.ok) {
        // Success
        return resp.headers.get("x-access-token")
    } else {
        throw new Error("Não foi possivel logar")
    }
}

export default authenticate