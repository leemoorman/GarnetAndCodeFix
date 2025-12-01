import '../css/Team.css';
import '../assets/Arsenal.png';

const Team = (props) =>{
    return(
        <div id="team-container">
            <img id="team-img" src={props.img} alt={props.name}/>
        </div>
    );  
};

export default Team;