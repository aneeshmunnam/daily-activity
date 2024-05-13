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
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <h1>Daily App</h1>
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