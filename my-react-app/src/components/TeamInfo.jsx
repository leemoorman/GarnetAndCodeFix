import '../css/TeamHomePage.css';

const TeamInfo = (props) => {
    return(
        <div className="team-info">
            <img src={props.img} alt={props.name}/>
            <section className="team-text">
                <h1>{props.name}</h1>
                <p>(3 - 0 - 1) <i>placeholder</i></p>
            </section>
        </div>
    );
};

export default TeamInfo;