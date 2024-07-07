import Sweat from "./Sweat";

export default function Workout({selectedDate}) {
    return (
        <div className='col-sm column'>
            <Sweat selectedDate={selectedDate} />
        </div> 
    );
} 