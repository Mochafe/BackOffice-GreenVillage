import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link, useLoaderData, useNavigate, Form } from "react-router-dom";
import config from "../../../config.json";

export async function loader({ params }) {
    const product = await (await fetch(`${config.url}/api/products/${params.product}.json`)).json()
    return product
}





export default function ProductView() {
    function getContenttoArray() {
        let content = [];
        
        for (const key in product.content) {
            content.push(
                <tr>
                    <td className="fw-bold">{key}</td>
                    <td>{product.content[key]}</td>
                </tr>
            )
        }

        return content;
    }


    const product = useLoaderData();
    const navigate = useNavigate();

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
                <Link to={`/product/edit/${product.id}`} className="text-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                </Link>
                <Form method="delete" action={`/product/${product.id}/delete`}>
                    <button type="submit" className="text-danger bg-white border-0" onClick={(event) => {
                        event.currentTarget.innerHTML = `<div className="spinner-border text-danger" role="status"><span className="sr-only"></span></div>`;
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </button>
                </Form>
            </div>

            <div className="container">
                <h1 className="mt-5">{product.name}</h1>
                <div className="d-flex justify-content-between">
                    <h6 className="text-muted">Réference: {product.reference}</h6>
                    <h6 className="text-muted">Id: {product.id}</h6>
                </div>

                <div className="row mt-4">
                    <div className="col-9">
                        <div id="imgCarousel" className="carousel carousel-dark slide" data-bs-ride="true">
                            <div className="carousel-indicators">
                                {product.images.map((image, index) => (
                                    <button type="button" data-bs-target="#imgCarousel" data-bs-slide-to={index} className={(index === 0) ? "active" : ""} aria-current={(index === 0) ? "true" : "false"} aria-label={"Slide " + { index }} key={index}></button>
                                ))}
                            </div>
                            <div className="carousel-inner">
                                {
                                    product.images.map((image, index) => (
                                        <div className={`carousel-item ${(index === 0) ? "active" : ""}`} key={index}>
                                            <img src={config.url + image.path} className="product-view-img" alt={image.title} />
                                        </div>
                                    ))
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#imgCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#imgCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-3">

                        <label htmlFor="price">Prix</label>
                        <div className="input-group mb-5">
                            <input type="text" id="price" className="form-control" aria-label="Prix" aria-describedby="Prix" defaultValue={product.price} disabled />
                            <span className="input-group-text" id="Prix">€</span>
                        </div>

                        <label htmlFor="quantity">Quantité</label>
                        <div className="input-group mb-5">
                            <input type="number" id="quantity" className="form-control" aria-label="Quantité" aria-describedby="Quantité" defaultValue={product.quantity} disabled />
                            <span className="input-group-text" id="Quantité">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
                                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                                </svg>
                            </span>
                        </div>

                        <label htmlFor="category">Categorie</label>
                        <div className="input-group mb-5">
                            <input type="text" id="category" className="form-control" aria-label="Quantité" aria-describedby="Quantité" defaultValue={product.category.name} disabled />
                            <span className="input-group-text" id="Quantité">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-collection" viewBox="0 0 16 16">
                                    <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" />
                                </svg>
                            </span>
                        </div>
                        {
                            (product.discount) ?
                                <>
                                    <label htmlFor="discount">Promotion</label>
                                    <div className="input-group mb-5">
                                        <input type="text" id="discount" className="form-control" aria-label="Promotion" aria-describedby="discountD" defaultValue={product.discount} disabled />
                                        <span className="input-group-text" id="discountD">
                                            €
                                        </span>
                                    </div>
                                </>
                                :
                                ""
                        }

                        {
                            (product.discountRate) ?
                                <>
                                    <label htmlFor="discountRate">Taux de réduction</label>
                                    <div className="input-group mb-5">
                                        <input type="text" id="discountRate" className="form-control" aria-label="Promotion" aria-describedby="discountD" defaultValue={product.discountRate} disabled />
                                        <span className="input-group-text" id="discountD">
                                            %
                                        </span>
                                    </div>
                                </>
                                :
                                ""
                        }

                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-8">
                        <ReactMarkdown>
                            {product.description}
                        </ReactMarkdown>
                    </div>
                    <div className="col-4">
                        <table className="table table-bordered">
                            <tbody>
                                {getContenttoArray()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}