import { useState } from "react"
import Workout from "./Workout";
import Personal from "./Personal";
import Work from "./Work";
import Groceries from "./Groceries";

export default function Header() {

    const [page, setPage] = useState('home');

    const navigate = (page) => {
        setPage(page);
    };

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const tommorow = new Date();
    tommorow.setDate(new Date().getDate()+1);
    const tommorowDate = tommorow.toISOString().split('T')[0];

    const handleDateChange = (event) => {
        const date = event.currentTarget.value;
        setDate(date);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-success">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Daily App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" 
                                onClick={() => navigate('home')}
                                href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" 
                                onClick={() => navigate('workout')}
                                href="#">Workout</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" 
                                onClick={() => navigate('groceries')}
                                href="#">Groceries</a>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex">
                        <input type="date" value={date} 
                        className="form-control"
                        max={tommorowDate}
                        onChange={handleDateChange}/>
                    </div>
                </div>
            </nav>
            <div>
                {page === 'workout' && <Workout selectedDate={date} />}
                {page === 'home' && 
                    (<div className="container-fluid">
                        <div className='row'>
                            <div className='col-sm column'>
                            <Personal selectedDate={date} />
                            </div>
                            <div className='col-sm column'>
                            <Work selectedDate={date} />
                            </div>
                        </div>
                    </div>)
                }
                {page === 'groceries' && <Groceries />}
            </div>
        </>
    )
}