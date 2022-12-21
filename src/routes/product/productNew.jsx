import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link, useLoaderData, useNavigate, Form } from "react-router-dom";
import { useState } from "react";
import config from "../../../config.json";

export async function loader() {
    const categories = await (await fetch(`${config.url}/api/categories`)).json();

    return categories;
}

export async function action({ request }) {

}

function makeCategoryOption(categories) {
    let buff = []

    categories["hydra:member"].forEach(value => {
        if (value.parent) {
            buff.push(
                <option value={value.id}>{value.name}</option>
            )
        }

    });

    return buff;
}



export default function ProductNew() {
    function MakeInputFromContent() {
        let buff = [];
        for (const content in contents) {
            buff.push(
                <div className="d-flex border input-group">
                    <input id={content} className="form-control border border-secondary" type={"text"} placeholder="Example: Corps, Couleur..." value={String(content)} disabled />
                    <input className="form-control border border-secondary" type={"text"} placeholder="Example: Tilleul, Blanc..." value={contents[content]} disabled />
                    <button type="button" className="input-group-text" onClick={(event) => {
                        let tempObj = {
                            ...contents
                        }
                        delete tempObj[content];
                        setContents(tempObj);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                        </svg>
                    </button>
                </div>
            );
        }

        return buff;
    }

    const categories = useLoaderData();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [contents, setContents] = useState({});

    console.log(contents);

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
                <h1 className="text-center mt-5">Créer un produit</h1>

                <Form className="row gy-3" method="post">

                    <div className="col-6">
                        <label htmlFor="name">Nom du produit</label>
                        <input className="form-control" id="name" name="name" type="text" placeholder="Example: Guitar XM-6125" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="category">Categorie</label>
                        <select className="form-select" id="category" name="category" type="text" defaultValue={""}>
                            <option value={""}>Séléctionner une catégorie</option>
                            {
                                makeCategoryOption(categories)
                            }
                        </select>
                    </div>
                    <div className="col-4">
                        <label htmlFor="price">Prix</label>
                        <div className="input-group">
                            <input className="form-control text-center" id="price" name="price" type="number" placeholder="42" />
                            <span className="input-group-text">
                                €
                            </span>
                        </div>
                    </div>
                    <div className="col-4">
                        <label htmlFor="quantity">Quantité</label>
                        <div className="input-group">
                            <input className="form-control text-center" id="quantité" name="quantité" type="number" placeholder="42" />
                            <span className="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
                                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="col-4">
                        <label htmlFor="discount">Promotion</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                -
                            </span>
                            <input className="form-control text-center" id="discount" type="number" placeholder="5" />
                            <span className="input-group-text">
                                €
                            </span>
                        </div>
                    </div>
                    <div className="col-4">
                        <label htmlFor="discountRate">Promotion %</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                -
                            </span>
                            <input className="form-control text-center" id="discountRate" type="number" placeholder="7" />
                            <span className="input-group-text">
                                %
                            </span>
                        </div>
                    </div>
                    <div className="col-12 d-flex">
                        <div className="w-50 me-1">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control w-100 h-100" rows={15} id="description" name="description" onChange={(event) => {

                                setDescription(event.currentTarget.value);
                            }}>
                            </textarea>
                        </div>

                        <div className="w-50 ms-1">
                            <label>Prévisualisation Markdown</label>

                            <ReactMarkdown className="bg-light h-100 p-3">
                                {description}
                            </ReactMarkdown>
                        </div>
                    </div>

                    <div className="col-12 mt-5">
                        <label>Contenu</label>
                        {
                            MakeInputFromContent()
                        }

                        <div className="d-flex border input-group" id="contentInput">
                            <input className="form-control border" id="new-key" type={"text"} placeholder="Example: Corps, Couleur..." />
                            <input className="form-control border" id="new-value" type={"text"} placeholder="Example: Tilleul, Blanc..." />
                            <button type="button" className="input-group-text" onClick={(event) => {
                                let tempObj = {
                                    ...contents
                                }
                                tempObj[document.getElementById("new-key").value] = document.getElementById("new-value").value;
                                setContents(tempObj);

                                document.getElementById("new-key").value = "";
                                document.getElementById("new-value").value = "";
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    );
}