import { redirect } from "react-router-dom";
import config from "../../../config.json";
import FetchInterceptor from "../../fetchInterceptor";

export async function action({ params }) {

    await FetchInterceptor(`${config.url}/api/categories/${params.category}`, {
        method: "DELETE"
    });

    return redirect(`/category/list`);
}