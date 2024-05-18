import { useEffect, useState } from "react";

export default function Sweat({selectedDate}) {

    const [sweats, setSweats] = useState([]);

    const [sweat, setSweat] = useState({
        "id": 0,
        "workout": "",
        "Weight/reps": "",
        "status": false
    });

    useEffect(() => {
        setSweats([]);
    }, [selectedDate]);

    return (
        <div className="sweat">
            <h2>Sweaty</h2>
            <div className="row">
                <div className="col">
                    <input type="text"
                    className="form-control"
                    placeholder="Workout" />
                </div>
                <div className="col">
                    <input type="text" 
                    className="form-control"
                    placeholder="Weight" />
                </div>
            </div>
        </div>
    );
}