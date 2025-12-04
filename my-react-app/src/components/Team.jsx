import '../css/Team.css';  
import {Link} from 'react-router-dom';

const Team = (props) =>{
    return(
        <Link to={`/teams/premier-league/${props.name.toLowerCase().replace(/ /g, "-")}`} id="team-container">
            <img id="team-img" src={props.img} alt={props.name}/>
            <p>{props.name}</p>
        </Link>
    );  
};

export default Team;