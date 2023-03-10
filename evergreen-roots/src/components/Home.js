import Navbar from "./Navbar";

export default function Home() {
    return (
        <div className="container">
            <div>
                <Navbar />
                <div className="home-card-container">
                    <div className="home-search search">
                        Search...
                    </div>
                    <div>
                        <div className="home-card">
                            <h4>What is Collabor-Action?</h4>
                            <div className="card-content">
                                <div>
                                    <img src={require("../fist-bump.png")}></img>
                                </div>
                                <div>
                                    <p>Collabor-Action is a search-engine and communication tool designed to help unite Community Based Organizations and Nonprofits with healthcare organization in order to provide the best healthcare services and resources to patients from all communities. Organizations can search one another, in order to help establish good relationships through quality communication through our collaboration request forum to ultimately forge a reliable and supportive system!</p>
                                </div>
                            </div>
                        </div>
                        <div className="home-card">
                            <h4>Why was Collabor-Action Made?</h4>
                            <div className="card-content">
                                <div>
                                    <img src={require("../research.png")}></img>
                                </div>
                                <div>
                                    <p>
                                        - Our research indicated a lack of reliable communication between community based organizations and healthcare systems
                                    </p>
                                    <p>
                                        - That quality communications primarily occurs when there is already an establish relationship between healthcare systems and CBOs. However, many groups on either side of this relationships have not developed these connections
                                    </p>
                                    <p>
                                        - That there are “never-ending lack of resources,” such as volunteers at healthcare systems that could strive in a positive direction with the help of CBOs
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="home-card">
                            <p>If you want to add and register your organization to our database or connect your account to a company and show that you are a employee of a company, please click on the “register” button at the top right of screen</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}