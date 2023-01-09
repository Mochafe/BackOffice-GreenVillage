import { useState } from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import config from "../../../config.json";

export async function loader() {
    return await (await fetch(`${config.url}/api/categories?exists[parent]=false`)).json();
}

export async function action({ request }) {
    const form = await request.formData();
    const formObj = Object.fromEntries(form);

    if(!formObj.name) return redirect("/category/new");

    let imgForm = new FormData();
    imgForm.append("image", formObj.image);
    imgForm.append("name", formObj.name);

    const imgObj = await (await fetch(`${config.url}/api/category_image`, {
        method: "POST",
        body: imgForm
    })).json()



    formObj.image = imgObj["@id"];

    console.log(imgObj);

    await fetch(`${config.url}/api/categories`, {
        method: "POST",
        body: JSON.stringify(formObj)
    });

    return redirect("/category");
}


export default function CategoryNew() {
    const categories = useLoaderData()["hydra:member"];
    const [images, setImages] = useState([]);


    return (
        <>
            <div className="d-flex justify-content-around mt-5">
                <button className="bg-white border-0" onClick={() => {
                    navigate(-1);
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                    </svg>
                </button>
                <span></span>
                <span></span>
            </div>
            <div className="container">
                <h1 className="text-center mt-5">Créer une catégorie</h1>
                <Form className="row gy-3" method="post" onSubmit={() => {
                    document.getElementById("spinner").classList.remove("d-none");
                }} encType="multipart/form-data">
                    <div className="col-6">
                        <label htmlFor="name">Nom de la catégorie</label>
                        <input className="form-control" id="name" name="name" type="text" placeholder="Guitare, Batterie..." required />
                    </div>
                    <div className="col-6">
                        <label htmlFor="category">Parent</label>
                        <select className="form-select" id="category" name="category">
                            <option value={""}>Catégorie principale</option>
                            {
                                categories.map(category => (
                                    <option value={category["@id"]}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="image">Image</label>
                        <input className="form-control" id="image" name="image" type="file" accept="image/*" required onChange={(event) => {
                            let imgBuff = [];

                            for (let i = 0; i < event.target.files.length; i++) {
                                imgBuff.push({
                                    file: event.target.files[i],
                                });
                            }

                            setImages(imgBuff);
                        }} />
                    </div>

                    {
                        (images.length > 0) ?
                            <>
                                <label>Prévisualisation de l'image</label>
                                <div id="imgCarousel" className="carousel carousel-dark slide" data-bs-ride="true">
                                    <div className="carousel-indicators">
                                        {images.map((image, index) => (
                                            <button type="button" data-bs-target="#imgCarousel" data-bs-slide-to={index} className={(index === 0) ? "active" : ""} aria-current={(index === 0) ? "true" : "false"} aria-label={"Slide " + { index }} key={index}></button>
                                        ))}
                                    </div>
                                    <div className="carousel-inner">
                                        {
                                            images.map((image, index) => (
                                                <div className={`carousel-item ${(index === 0) ? "active" : ""}`} key={index}>
                                                    <img src={(image.file) ? URL.createObjectURL(image.file) : ""} className="product-view-img" alt={(image.title) ? image.title : "Sans titre"} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
                            :
                            ""
                    }

                    <div className="d-flex my-5 justify-content-center">

                        <button className="btn btn-primary" type="submit">
                            Créer la catégorie
                        </button>

                        <div class="spinner-border text-primary ms-3 mt-2 d-none" id="spinner" role="status"><span class="sr-only"></span></div>
                    </div>
                </Form>
            </div>
        </>
    )
}