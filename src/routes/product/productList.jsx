import { useLoaderData, Link, Form } from "react-router-dom";
import config from "../../../config.json"
import { ReactMarkdown } from "react-markdown/lib/react-markdown";


export async function loader({ request }) {
    const url = new URL(request.url);
    let params = {};
    url.searchParams.forEach((value, key) => {
        params[key] = value;
    });


    let categories = await (await fetch(`${config.url}/api/categories`)).json()

    const products = await (await fetch(`${config.url}/api/products?${makeUrlFromParams(params)}`)).json();

    return { products, params, categories };
}

function makeUrlFromParams(params) {
    let urlParams = "";
    let count = 0;

    for (const key in params) {
        if (count === 0) {
            urlParams += `${key}=${params[key]}`;
        } else {
            urlParams += `&${key}=${params[key]}`;
        }

        count++;
    }

    return urlParams;
}

function nextPageObject(params) {
    let obj = {
        ...params
    }
    obj.page++;

    return obj;
}

function previousPageObject(params) {
    let obj = {
        ...params
    }
    obj.page--;

    return obj;
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


export default function ProductList() {
    let { products, params, categories } = useLoaderData();
    params.page = (params.page) ? params.page : 1;

    let previousPageParam = previousPageObject(params);
    let nextPageParam = nextPageObject(params);

    let productsSell = [];

    products["hydra:member"].forEach(product => {
        let quantity = 0;
        product.orderDetails.forEach(orderDetail => {
            console.log(orderDetail.quantity)
            quantity += Number(orderDetail.quantity);
        });
        productsSell[product.id] = quantity;
    });

    console.log(productsSell);

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })


    return (
        <div className="container-fluid">
            <h1 className="text-center mt-5">Liste des produits</h1>
            {
                (!products["hydra:totalItems"] > 0) ?
                    <h5 className="text-center text-muted">Il n'y a pas de produit</h5>
                    :
                    <h5 className="text-center text-muted">({products["hydra:totalItems"]})</h5>

            }

            <div className="row mt-3">
                <div className="col-3 ps-0">
                    <div className="border border-secondary rounded-end w-100 p-3">
                        <h2 className="text-center border-bottom pb-2">Filtre</h2>
                        <Form>
                            <div className="row mt-4">
                                <label htmlFor="productName">Nom du Produit:</label>
                                <div className="input-group mb-3">
                                    <input type="search" id="productName" name="name" className="form-control" placeholder="Piano, Batterie..." />
                                </div>

                                <div className="col-6">
                                    <label htmlFor="minPrice">Prix Minimum</label>
                                    <div className="input-group">
                                        <input className="form-control" type="number" name="price[gte]" id="minPrice" defaultValue={0} />
                                        <span className="input-group-text">
                                            €
                                        </span>
                                    </div>

                                </div>
                                <div className="col-6">
                                    <label htmlFor="maxPrice">Prix Maximum</label>
                                    <div className="input-group">
                                        <input className="form-control" type="number" name="price[lte]" id="maxPrice" defaultValue={9999} />
                                        <span className="input-group-text">
                                            €
                                        </span>
                                    </div>
                                </div>
                                <div className="div-12 mt-3">
                                    <label htmlFor="category">Categorie</label>
                                    <div className="input-group">
                                        <select className="form-select" name="category" id="category" defaultValue={0}>
                                            <option value="">Selectionner une Catégorie</option>
                                            {makeCategoryOption(categories)}
                                        </select>
                                        <span className="input-group-text">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-collection" viewBox="0 0 16 16">
                                                <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="bg-white border-0 d-block mx-auto mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>

                            <input type="hidden" name="page" value={params.page} />
                        </Form>
                    </div>


                    <button className="page-link scroll-top" onClick={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        })
                    }}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
                        </svg>
                    </button>
                    <button className="page-link scroll-bottom" onClick={() => {
                        window.scrollTo({
                            top: document.body.scrollHeight,
                            left: 0,
                            behavior: 'smooth'
                        })
                    }}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
                        </svg>
                    </button>
                </div>
                <div className="col-9">
                    <div className="row gx-3">
                        {(products["hydra:totalItems"] > 0) ?
                            products["hydra:member"].map((product) => (
                                <div className="col-4" key={product.id}>
                                    <div className="card mb-3">
                                        <div className="d-flex justify-content-between my-1" >
                                            <span className="fs-6 text-muted text-uppercase text-start ms-2">Catégorie: {product.category.name}</span>
                                            <span className="fs-6 text-muted text-uppercase text-end me-2">Id: {product.id}</span>
                                        </div>

                                        <img src={config.url + product.images[0].path} className="card-img-top card-product-img" alt={product.images[0].title} />
                                        <div className="card-body">
                                            <h5 className="card-title card-product-name">{product.name}</h5>
                                            <div className="card-text card-product-description">
                                                <div className="row gx-1">
                                                    <div className="col-6">
                                                        <label>Quantité</label>
                                                        <div className="input-group">
                                                            <input className="form-control text-center text-muted disabled" type="text" value={product.quantity} disabled />
                                                            <span className="input-group-text">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
                                                                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <label>Quantité Vendu</label>
                                                        <div className="input-group">
                                                            <input className="form-control text-center text-muted disabled" type="text" value={productsSell[product.id]} disabled />
                                                            <span className="input-group-text">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-seam" viewBox="0 0 16 16">
                                                                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <label>Prix</label>
                                                        <div className="input-group">
                                                            <input className="form-control text-center text-muted disabled" type="text" value={product.price} disabled />
                                                            <span className="input-group-text">
                                                                €
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {
                                                        (product.discount) ?
                                                            <div className="col-6">
                                                                <label>Réduction</label>
                                                                <div className="input-group">
                                                                    <input className="form-control text-center text-muted disabled" type="text" value={product.discount} disabled />
                                                                    <span className="input-group-text">
                                                                        €
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            :
                                                            ""
                                                    }
                                                    {
                                                        (product.discountRate) ?
                                                            <div className="col-6">
                                                                <label>Réduction %</label>
                                                                <div className="input-group">
                                                                    <input className="form-control text-center text-muted disabled" type="text" value={product.discount} disabled />
                                                                    <span className="input-group-text">
                                                                        %
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            :
                                                            ""
                                                    }
                                                </div>
                                            </div>
                                            <div className="d-flex mt-3 justify-content-around">
                                                <Link to={`/product/${product.id}/view`} className="text-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                    </svg>
                                                </Link>
                                                <Link to="#" className="text-info">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg>
                                                </Link>
                                                <Form method="delete" action={`/product/${product.id}/delete`}>
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
                                        <span className="fs-6 text-muted text-uppercase text-center">Réference: {product.reference}</span>

                                    </div>
                                </div>
                            ))
                            :
                            ""
                        }
                    </div>
                </div>
            </div>
            {
                (products["hydra:totalItems"] > 30) ?
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center mt-5">
                            {
                                (products["hydra:view"]["hydra:previous"]) ?
                                    <li className="page-item">
                                        <Link className="page-link" to={"/product/list?" + makeUrlFromParams(previousPageParam)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                                            </svg>
                                        </Link>
                                    </li>
                                    :
                                    <li className="page-item">
                                        <Link className="page-link disabled">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                                            </svg>
                                        </Link>
                                    </li>
                            }
                            <li className="page-item my-auto">
                                <Link className="page-link fs-3 disabled">
                                    {
                                        (params.page) ?
                                            params.page :
                                            1
                                    }
                                </Link>
                            </li>
                            {
                                (products["hydra:view"]["hydra:next"]) ?
                                    <li className="page-item">
                                        <Link className="page-link" to={"/product/list?" + makeUrlFromParams(nextPageParam)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                                            </svg>
                                        </Link>
                                    </li>
                                    :
                                    <li className="page-item">
                                        <Link className="page-link disabled">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                                            </svg>
                                        </Link>
                                    </li>
                            }
                        </ul>
                    </nav>
                    :
                    ""
            }

        </div>
    )
}


