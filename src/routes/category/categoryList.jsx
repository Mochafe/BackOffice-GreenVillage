import { useState } from "react";
import { useLoaderData, Link, Form, redirect } from "react-router-dom";
import config from "../../../config.json";

export async function loader() {
    const categories = await (await fetch(`${config.url}/api/categories`)).json();

    console.log(categories);

    return categories;
}

export async function deleteAction({ params }) {
    const category = await (await fetch(`${config.url}/categories/${params.category}`)).json();
    await fetch(`${config.url}/api/images/${category.image.id}`, {
        method: "DELETE"
    });
    await fetch(`${config.url}/api/categories/${params.category}`, {
        method: "DELETE"
    });

    return redirect("/category");
}

export default function CategoryList() {
    const [categories, setCategories] = useState(useLoaderData()["hydra:member"]);
    const [filtredCategories, setFiltredCategories] = useState(categories);
    const [search, setSearch] = useState("");
    const [categoriesCheckbox, setCategoriesCheckbox] = useState(true);
    const [subCategoriesCheckbox, setSubCategoriesCheckbox] = useState(true);

    return (
        <>
            <div className="container-fluid">
                <h1 className="text-center mt-5">Liste des catégories</h1>

                <h5 className="text-center text-muted">({(filtredCategories.length) ? filtredCategories.length : "Il n'y a pas de catégories"})</h5>


                <div className="row mt-3">
                    <div className="col-3 ps-0">
                        <div className="border border-secondary rounded-end w-100 p-3">
                            <h2 className="text-center border-bottom pb-2">Filtre</h2>

                            <div className="row mt-4">
                                <label htmlFor="categoryName">Nom de la catégorie:</label>
                                <div className="input-group mb-3">
                                    <input type="search" id="categoryName" name="name" className="form-control" placeholder="Guitar, Basse..." value={search} onChange={(event) => {
                                        setSearch(event.currentTarget.value);
                                    }} />
                                </div>
                            </div>

                            <div className="row mt-4">

                                <div className="form-check col-6">
                                    <label className="w-100" htmlFor="categoryCheck">Afficher les catégories principale</label>
                                    <input className="form-check-input" type="checkbox" id="categoryCheck" checked={categoriesCheckbox} onChange={(event) => {
                                        setCategoriesCheckbox(!categoriesCheckbox);
                                    }} />
                                </div>

                                <div className="form-check col-6">
                                    <label className="w-100" htmlFor="subCategoryCheck">Afficher les sous-catégories</label>
                                    <input className="form-check-input" type="checkbox" id="subCategoryCheck" checked={subCategoriesCheckbox} onChange={(event) => {
                                        setSubCategoriesCheckbox(!subCategoriesCheckbox);
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row gx-3">
                            {(filtredCategories.length > 0) ?
                                filtredCategories.map((category) => (
                                    <div className="col-4" key={category.id}>
                                        <div className="card mb-3 card-category">
                                            <div className="d-flex justify-content-between my-1" >
                                                <span className="fs-6 text-muted text-uppercase text-start ms-2">Catégorie: {category.name}</span>
                                                <span className="fs-6 text-muted text-uppercase text-end me-2">Id: {category.id}</span>
                                            </div>
                                            <div className="card-category-img mx-auto">
                                                <img src={(category.image) ? config.url + category.image.path : "/image/product-placeholder.jpg"} className="card-img-top card-product-img" alt={(category.image) ? category.image.title : "Image placeholder"} />
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title card-product-name">{category.name}</h5>
                                                <div className="d-flex mt-3 justify-content-around">
                                                    <Link className="text-info">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                        </svg>
                                                    </Link>
                                                    <Form method="delete" action={`/category/${category.id}/delete`}>
                                                        <button type="submit" className="text-danger bg-white border-0" onClick={(event) => {
                                                            event.currentTarget.innerHTML = `<div class="spinner-border text-danger" role="status"><span class="sr-only"></span></div>`;
                                                        }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                            </svg>
                                                        </button>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}