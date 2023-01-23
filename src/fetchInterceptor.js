import Cookies from "js-cookie";

const FetchInterceptor = async (url, config = {}) => {
    try {
        if(config.headers) {
            config.headers.Authorization = `Bearer ${Cookies.get("token")}`
        } else {
            config.headers = { Authorization: `Bearer ${Cookies.get("token")}` }
        }
        
        console.log(config)
        
        const fetchRes = await fetch(url, (config) ? {
            ...config,
        } : "");
        
        if (fetchRes.status === 401) {
            Cookies.remove("token");
            window.location = "/#/auth"
        }
        
        return fetchRes
    } catch(err) {
        
    }

}

export default FetchInterceptor;