import Navbar from "./Navbar";

export default function Reg_Con() {
    return (
        <div className="container">
            <div>
                <Navbar />
                <div className="reg-con-container">
                    <div className="reg-con-card">
                        <img src={require("../img/register.png")}></img>
                        <div>
                            REGISTER YOUR HEALTHCARE SYSTEM OR CBO
                        </div>
                    </div>
                    <div className="reg-con-card">
                        <img src={require("../img/connect.png")}></img>
                        <div>
                            CONNECT TO A HEALTHCARE SYSTEM OR CBO
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}