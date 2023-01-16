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



const fetchSuppliers = async () => {
    return await (await fetch(`${config.url}/api/suppliers.json`)).json();
}

const fetchTurnoverSupplier = async (id = 1) => {
    return await (await fetch(`${config.url}/api/supplier_turnover/${id}`)).json();
}

const fetchTurnover = async (year = 0) => {
    return await (await fetch(`${config.url}/api/turnover_months/${year}`)).json();
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

const TurnoverChart = (props) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "Graphique du chiffre d'affaire pour une année",
            },
        },
    };

    const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    const data = {
        labels,
        datasets: [
            {
                label: "Chiffre d'affaire de ce mois",
                data: (props.data)? Object.values(props.data) : [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                backgroundColor: 'deepskyblue',
                borderWidth: 2
            }
        ],
    };


    return (
        <Bar options={options} data={data} />
    )
}

const YearsOption = ({start = 2020, end = 2030}) => {
    let opt = [];

    for(let i = start; i < end; i++) {
        opt.push(<option value={i}>{i}</option>);
    }

    return opt;
}


export default function Home() {
    const [turnover, setTurnover] = useState(0);
    const [data, setData] = useState([]);

    const handleSelect = (event) => {
        fetchTurnoverSupplier(event.target.value)
            .then(response => {
                setTurnover(response.turnover);
            });
    }

    const handleSelectYear = (event) => {
        fetchTurnover(event.target.value)
            .then(response => {
                setData(response);
            })
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
                    <select className="form-select" id="year" onChange={handleSelectYear}>
                        <YearsOption start={2000} end={2100}/>
                    </select>

                    <label className="mt-3" htmlFor="turnover">Chiffre d'affaire</label>
                    <TurnoverChart data={data}  />
                </div>


            </div>
        </>
    )
}