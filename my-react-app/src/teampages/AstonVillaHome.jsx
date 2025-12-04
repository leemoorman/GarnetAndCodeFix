import '../css/TeamHomePage.css'; 
import ScheduleBox from '../components/ScheduleBox';
import RecentBox from '../components/RecentBox';
import RosterBox from '../components/RosterBox';
import TeamInfo from '../components/TeamInfo'; 

const AstonVillaHome = () => {
    return(
        <div>
            <h3 id="location">Soccer / Teams / Premier League / Arsenal</h3>
            <TeamInfo img="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Aston_Villa_FC_new_crest.svg/250px-Aston_Villa_FC_new_crest.svg.png" name="Aston Villa"/>
            <div className="team-content">
                <section>
                    <h2>Roster</h2>
                    <RosterBox />
                </section>
                <section className="team-right-content">
                    <h2>Recent Matches</h2>
                    <RecentBox />
                    <h2>Upcoming Matches</h2>
                    <ScheduleBox />
                </section>
            </div>
        </div>
    );
};

export default AstonVillaHome;