import { redirect } from "react-router-dom";
import config from "../../../config.json";

export async function action({ params }) {

    await fetch(`${config.url}/api/categories/${params.category}`, {
        method: "DELETE"
    });

    console.log("delete")
    return redirect(`/category/list`);
}