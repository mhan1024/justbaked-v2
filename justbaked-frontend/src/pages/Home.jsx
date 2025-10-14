import "../css/Home.css";
import NavigationBar from "../components/NavigationBar";

function Home() {

    return (
        <div className="home-div"> 
            <NavigationBar />
                       
            <div className="img-container">
                <img src="/images/home.png" alt="home page banner" className="home-banner"/>
            </div>
            
        </div>
    );
}

export default Home;