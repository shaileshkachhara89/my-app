import React from "react";
import logo from "../../assets/images/nethealth_logo.png";
import '../../assets/css/NavBar.css';
import user from "../../assets/images/user1.png";
import {
    useNavigate,
    Link,
    useParams,
  } from "react-router-dom";


export function NavBarTop() {
    let navigate = useNavigate();
    let user_id = "mohit.kumar@nethealth.com";
    const installationList = {
        "vpn": "mohit.kumar@nethealth.com",
        "installation": [
                            {"Installation_Name":"ahclearlake1",
                             "Message_type": 
                                           [
                                            {"message_name":"PDF"},
                                            {"message_name":"ORU_Image"},
                                            {"message_name":"ORU_Discrete"}
                                           ]
                            },
                            {"Installation_Name":"arborhealth2",
                            "Message_type":[
                                            {"message_name":"ORU_PDF"}
                                             ]
                            },
                            {"Installation_Name":"ahclearlake3",
                            "Message_type": 
                                          [
                                           {"message_name":"PDF"},
                                           {"message_name":"ORU_Image"},
                                           {"message_name":"ORU_Discrete"}
                                          ]},
                           {"Installation_Name":"arborhealth",
                           "Message_type":[
                                           {"message_name":"ORU_PDF"}
                                            ]
                           }
                        ]
    }

    const handleClick=(installation,message)=>{
        navigate('/configuration',
        {
            state:
            {
                message:message,
                installation:installation
            }});
    }
    
    return (
        <>    
            <div className="wrapper">  
                <div className="section">
                    <div className="top_navbar">
                        <div className="hamburger">
                            <a  href="/" >
                                <img src={logo}  width="150" alt="" />
                            </a>  
                        </div>
                        <div className="profile">
                            <img src={user} 
                            alt="profile_picture" />
                            <p>{user_id}</p>
                        </div>
                    </div>    
                </div>
               
            </div>
        </>
    );
}
