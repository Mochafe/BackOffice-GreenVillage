import { redirect, useNavigate } from "react-router-dom";
import config from "../../config.json";

export async function action({ params }) {
    const product = await (await fetch(`${config.url}/api/products/${params.product}.json`)).json();

    console.log(product);

    for(let i = 0; i < product.images.length; i++) {
        await fetch(`${config.url}/api/images/${product.images[i].id}`, {
            method: "DELETE",
            headers: new Headers(),
            mode: "cors",
            cache: "default"
        });
    }
        
    

    const response = await fetch(`${config.url}/api/products/${params.product}`, {
        method: "DELETE",
        headers: new Headers(),
        mode: "cors",
        cache: "default"
    });

    if (response.status === 204) {
        console.log("Product resource deleted");
    } else {
        console.log("Resource not found");
    }

    return redirect("/product/list");
}