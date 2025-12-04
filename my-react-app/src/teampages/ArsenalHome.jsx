import '../css/TeamHomePage.css'; 
import ScheduleBox from '../components/ScheduleBox';
import RecentBox from '../components/RecentBox';
import RosterBox from '../components/RosterBox'; 

const ArsenalHome = () => {
    return(
        <div>
            <h3 id="location">Soccer / Teams / Premier League / Arsenal</h3>
            <div className="team-info">
                <img src="https://upload.wikimedia.org/wikipedia/hif/8/82/Arsenal_FC.png" alt="arsenal"/>
                <section className="team-text">
                    <h1>ARSENAL</h1>
                    <p>RECORD</p>
                </section>
            </div>
            <div>
                <RosterBox />
                <section>
                    <RecentBox />
                    <ScheduleBox />
                </section>
            </div>
        </div>
    );
};

export default ArsenalHome;