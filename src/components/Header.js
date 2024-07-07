import { useState } from "react"

export default function Header({onDateChange}) {

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const tommorow = new Date();
    tommorow.setDate(new Date().getDate()+1);
    const tommorowDate = tommorow.toISOString().split('T')[0];

    const handleDateChange = (event) => {
        const date = event.currentTarget.value;
        setDate(date);
        onDateChange(date)
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-success">
                <div className="container-fluid">
                    <a class="navbar-brand" href="#">Daily App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Workout</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Groceries</a>
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
        </>
    )
}