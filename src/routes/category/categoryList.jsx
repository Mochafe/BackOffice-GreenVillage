import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import config from "../../../config.json";

export async function loader() {
    const categories = await (await fetch(`${config.url}/api/categories`)).json();

    return categories;
}

export default function CategoryList() {
    const [categories, setCategories] = useState(useLoaderData());

    return (
        <>
            <div className="container-fluid">
                <h1 className="text-center mt-5">Liste des catégories</h1>

                <h5 className="text-center text-muted">({categories["hydra:totalItems"]})</h5>


                <div className="row mt-3">
                    <div className="col-3 ps-0">
                        <div className="border border-secondary rounded-end w-100 p-3">
                            <h2 className="text-center border-bottom pb-2">Filtre</h2>

                            <div className="row mt-4">
                                <label htmlFor="categoryName">Nom de la catégorie:</label>
                                <div className="input-group mb-3">
                                    <input type="search" id="categoryName" name="name" className="form-control" placeholder="Guitar, Basse..." />
                                </div>
                            </div>

                            <div className="row mt-4">

                                <div className="form-check col-6">
                                    <label className="w-100" htmlFor="categoryCheck">Afficher les catégorie principale</label>
                                    <input class="form-check-input" type="checkbox" id="mainCategoryCheck" checked/>
                                </div>

                                <div className="form-check col-6">
                                    <label className="w-100" htmlFor="subCategoryCheck">Afficher les sous-catégorie</label>
                                    <input class="form-check-input" type="checkbox" id="subCategoryCheck" checked/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}