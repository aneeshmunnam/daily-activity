import Sweat from "./Sweat";
import Warmup from "./Warmup";

export default function Workout({selectedDate}) {
    return (
       <div className="container-fluid">
            <div className="row">
                <div className='col-sm column'>
                    <Warmup selectedDate={selectedDate} />
                </div>
                <div className='col-sm column'>
                    <Sweat selectedDate={selectedDate} />
                </div> 
            </div>
       </div>
    );
} 