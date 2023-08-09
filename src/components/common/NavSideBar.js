import React, { useEffect, useState } from "react";
import '../../assets/css/NavBar.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {URL} from "../common/Constant";

  const installationList = {
    "vpn": "mohit.kumar@nethealth.com",
    "installation": [
                        {"installation_name":"ahclearlake",
                         "Message_type": 
                                       [
                                        {"message_name":"PDF"},
                                        {"message_name":"ORU_Image"},
                                        {"message_name":"ORU_Discrete"}
                                       ]
                        },
                        {"installation_name":"arborhealth",
                        "Message_type":[
                                        {"message_name":"ORU_PDF"}
                                         ]
                        },
                        {"installation_name":"baptisthealth",
                         "Message_type": 
                                       [
                                        {"message_name":"ORU_Discrete"},
                                        {"message_name":"ORU_Image"}
                                       ]
                        },
                        {"installation_name":"camc",
                        "Message_type":[
                                        {"message_name":"ORU_Image"},
                                        {"message_name":"ORU_Discrete"}
                                        ]
                        },
                    ]
  }

export function NavSideBar() {
    let navigate = useNavigate();

    const [installations, setInstallations] = useState([]);
    
    let user_id = "mohit.kumar@nethealth.com";
    
    useEffect(() => {
        getInstallations(user_id);
      },[user_id]);

    // get installations
    const getInstallations = (user_id) => {
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
          };
        
        let data = {"vpn": user_id};

        axios.post(URL.GET_INSTALLATION, data, config)
        .then((response) => {
            if (response.status === 200) {
               setInstallations(response?.data);
            }
        })
        .catch((error) => {
            alert("Data fatching failed.");
            console.log(error);
        });
    };  

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
            <div className="sidebar">
                <ul>
                    <li style={{padding:'13px 30px'}}>      
                        <span>Installations</span>
                        <span></span>       
                        <ul>
                            <li key={"list"}>
                                <a>
                                    List of Installations
                                </a>
                            </li>
                        {
                           (Array.isArray(installations.installation) && installations.installation.length > 0) ? installations.installation.map((value,index)=>{
                                return(
                                        <li key={value.installation_name+index}>
                                            <a>{value.installation_name}</a>
                                            <ul>
                                                {    
                                                    value.message_type && value.message_type.map((msg)=>
                                                    { 
                                                    return(
                                                    <li key={msg.message_name}>
                                                        <a onClick={()=>handleClick(value.installation_name,msg.message_name)} >
                                                            {msg.message_name}
                                                        </a>    
                                                        </li>
                                                    );    
                                                    })
                                                }
                                            </ul>
                                        </li>
                                );
                            })
                            :
                           
                                <li key={"loadding"}>
                                    <a>
                                        Loading ...
                                    </a>
                                </li>
                            
                        }
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="recentInstallation">
                <ul>
                    <li style={{padding:'13px 30px'}}>      
                        <span>Recent Installations</span>
                    </li>
                    <li style={{padding:'8px 15px'}}>      
                        <span>Installations Message1</span>
                    </li>
                    <li style={{padding:'8px 15px'}}>      
                        <span>Installations Message2</span>
                    </li>
            
                </ul>
            </div>
        </>
    );
}
