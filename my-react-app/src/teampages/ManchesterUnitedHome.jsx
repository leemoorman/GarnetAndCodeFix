import '../css/TeamHomePage.css'; 
import ScheduleBox from '../components/ScheduleBox';
import RecentBox from '../components/RecentBox';
import RosterBox from '../components/RosterBox';
import TeamInfo from '../components/TeamInfo';

const ManchesterUnitedHome = () => {
    return(
        <div>
            <h3 id="location">Soccer / Teams / Premier League / Manchester United</h3>
            <TeamInfo img="https://b.fssta.com/uploads/application/soccer/team-logos/manchester-united.vresize.72.72.medium.0.png" name="Manchester United"/>
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

export default ManchesterUnitedHome;