import { useEffect, useRef, useState } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import config from "../../../config.json";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

export const data = {
    labels,
    datasets: [
        {
            label: "Chiffre d'affaire par mois",
            data: [200, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
            backgroundColor: 'deepskyblue',
            borderWidth: 1
        }
    ],
};

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

const TurnoverChart = () => {
    const context = document.getElementById("context");


    /* new Chart(context, {
        type: "bar",
        data: {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            datasets: [{
                label: "Chiffre d'affaire par mois",
                data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
 */

    return (
        <Bar options={options} data={data} />
    )
}


export default function Home() {
    const [turnover, setTurnover] = useState(0);
    const turnoverChart = useRef(null);

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
                    <div className="input-group mb-3">
                        <input className="form-control" type={"text"} id="turnover" value={turnover} readOnly />
                        <span className="input-group-text">€</span>
                    </div>
                </div>

                <div className="mt-5">
                    <h3>Chiffre d'affaire par année</h3>
                    <label htmlFor="year">Année</label>
                    <select className="form-select" id="year" onChange={handleSelect}>
                        {/* TODO yearsOption */}
                    </select>

                    <label className="mt-3" htmlFor="turnover">Chiffre d'affaire</label>
                    <TurnoverChart />
                </div>


            </div>
        </>
    )
}