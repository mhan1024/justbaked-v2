import NavigationBar from "./NavigationBar";
import "./CSS/Home.css";

function Home() {

    return (
        <div className="home-div">
            <NavigationBar/>
            
            <div className="img-container">
                <img src="/images/home.png" alt="home page banner" className="home-banner"/>
            </div>
            
        </div>
    );
}

export default Home;