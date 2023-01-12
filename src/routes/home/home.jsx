import { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto";
import config from "../../../config.json";

const fetchSuppliers = async () => {
    return await (await fetch(`${config.url}/api/suppliers.json`)).json();
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
        console.log("select change")//TODO
    }

    return (
        <>
            <div className="container justify-content-center">
                <h1 className="text-center mt-5">Chiffre d'affaire</h1>

                <label htmlFor="supplier">Fournisseur</label>
                <select className="form-select" id="supplier" onChange={handleSelect}>
                    <SupplierOption />
                </select>

                <label className="mt-3" htmlFor="turnover">Chiffre d'affaire</label>
                <input className="form-control mt-3" type={"text"} id="turnover" value={turnover} readOnly />


            </div>
        </>
    )
}