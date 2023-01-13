import { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto";
import config from "../../../config.json";

const fetchSuppliers = async () => {
    return await (await fetch(`${config.url}/api/suppliers.json`)).json();
}

const fetchTurnoverSupplier = async (id = 1) => {
    return await (await fetch(`${config.url}/api/supplier_turnover/${id}`)).json();
}

const SupplierOption = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetchSuppliers()
            .then(response => {
                setSuppliers(response);
            })
    }, [])

    return (
        <>
            {
                suppliers.map(supplier => (
                    <option value={supplier.id} key={"supplier-id-" + supplier.id}>{supplier.name}</option>
                ))
            }
        </>
    )
}


export default function Home() {
    const [turnover, setTurnover] = useState(0);
    const supplierChart = useRef(null);

    const handleSelect = (event) => {
        fetchTurnoverSupplier(event.target.value)
            .then(response => {
                setTurnover(response.turnover);
            });
    }

    useEffect(() => {
        fetchTurnoverSupplier()
            .then(response => {
                setTurnover(response.turnover);
            });
    }, [])

    return (
        <>
            <div className="container justify-content-center">
                <h1 className="text-center mt-5">Tableau de bord</h1>

                <div className="mt-5">
                    <h3>Chiffre d'affaire par fournisseur</h3>
                    <label htmlFor="supplier">Fournisseur</label>
                    <select className="form-select" id="supplier" onChange={handleSelect}>
                        <SupplierOption />
                    </select>

                    <label className="mt-3" htmlFor="turnover">Chiffre d'affaire</label>
                    <div class="input-group mb-3">
                        <input className="form-control" type={"text"} id="turnover" value={turnover} readOnly />
                        <span class="input-group-text">€</span>
                    </div>
                </div>


            </div>
        </>
    )
}