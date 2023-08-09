import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../assets/css/main.css';
import {URL} from "../common/Constant";
import {
    useLocation,
  } from "react-router-dom";
  import {PaginatedItems} from "../common/Paginate";

  const data = {
    "Basic_Configuration":{
       "message_type":"PDF",
       "installation_config_id":35,
       "is_enabled":true,
       "installation":"ahclearlake",
       "is_wiretap":false,
       "is_log_file_transmission":true,
       "is_rest_call_after_ack":false
    },
    "Transmission_Information":{
       "id":"b49649ca-d310-4fa9-8e4f-387f2a0eaf88",
       "service_type":"sftp",
       "host":"secureftp02.ah.org",
       "port":24,
       "username":"b01TissueAnalytics",
       "private_key":"w9LG9UJ4liPX+zQTY6KawJ3i5OBGYBLpztZHrhxkba5TTpMLNkBW0l3XuLHPfNwSglDGPDO",
       "password" : "123456",
       "private_key" : "213123",
       "remote_key" : "213123",
       "remote_directory" : "123/123/23",
       "share_name" : "123123123",
       "Connection_wait_timeout" : "12323",
    },
    "Message_Mapping_Details":[
       {
          "installation_config_id":34,
          "installation":"ahclearlake",
          "message_type":"ORU_Image",
          "source_id":"2e9523dd-3ca9-4dbe-aca4-c7eaf362a09c",
          "destination_id":"cfcd948d-6c9e-45b1-a10b-46a40c9b264f",
          "segment_label":"obr7",
          "path_to_object":"getWound.getWoundEvaluation.getCreated",
          "type":"DATE",
          "date_format":"yyyyMMddHHmmss",
          "created":"2021-09-10T19:36:29.921027Z"
       },
       {
          "installation_config_id":24,
          "installation":"ahclearlake",
          "message_type":"ORU_Discrete",
          "source_id":"f181dece-5098-4cbf-81e7-090b9bf7dee5",
          "destination_id":"08f26f28-482a-4fca-8b16-b19846eb8ba7",
          "segment_label":"obr7",
          "path_to_object":"getWound.getWoundEvaluation.getCreated",
          "type":"DATE",
          "date_format":"yyyyMMddHHmmss",
          "created":"2021-09-10T19:36:29.921027Z"
       },
       {
          "installation_config_id":24,
          "installation":"ahclearlake",
          "message_type":"ORU_Discrete",
          "source_id":"7afb96c4-af57-4df9-b7ef-2ce748ad3e5f",
          "destination_id":"39b50323-6c72-4090-aeb2-624f9351bf94",
          "segment_label":"pv144",
          "path_to_object":"getPatient.getCreated",
          "type":"DATE",
          "date_format":"yyyyMMddHHmmss",
          "created":"2021-09-10T19:36:32.444679Z"
       },
       {
          "installation_config_id":34,
          "installation":"ahclearlake",
          "message_type":"ORU_Image",
          "source_id":"1c4d4e9f-a0fa-4fe0-ad63-932bf23fb657",
          "destination_id":"620e484a-03d7-46d4-a4ab-89467e4c98ca",
          "segment_label":"pv144",
          "path_to_object":"getPatient.getCreated",
          "type":"DATE",
          "date_format":"yyyyMMddHHmmss",
          "created":"2021-09-10T19:36:32.444679Z"
       },
       {
          "installation_config_id":24,
          "installation":"ahclearlake",
          "message_type":"ORU_Discrete",
          "source_id":"5ea2a1c1-a90e-48df-8690-d68cc5f36685",
          "destination_id":"babb97d5-67a3-46b5-873f-4b52208fac0e",
          "segment_label":"pid7",
          "path_to_object":"getPatient.getDateOfBirth",
          "type":"STRING_TO_DATEFORMAT",
          "date_format":"yyyyMMdd",
          "created":"2021-09-10T19:36:55.440901Z"
       },
       {
          "installation_config_id":34,
          "installation":"ahclearlake",
          "message_type":"ORU_Image",
          "source_id":"c4df6cf9-9863-44d8-ac31-b25a7b588758",
          "destination_id":"6a2e4a7a-b61a-4979-9362-c0a482f28763",
          "segment_label":"pid7",
          "path_to_object":"getPatient.getDateOfBirth",
          "type":"STRING_TO_DATEFORMAT",
          "date_format":"yyyyMMdd",
          "created":"2021-09-10T19:36:55.440901Z"
       }
    ]
 }


export function Configuration() {

    const location = useLocation();

    const [configData, setConfigData] = useState(data);
    const [trans_id ,setID] = useState(data.Transmission_Information.id);
    const [host, setHost] = useState(data.Transmission_Information.host);
    const [port, setPort] = useState(data.Transmission_Information.port);
    const [username, setUsername] = useState(data.Transmission_Information.username);
    const [password, setPassword] = useState(data.Transmission_Information.password);
    const [privateKey, setPrivateKey] = useState(data.Transmission_Information.private_key);
    const [remoteKey, setRemoteKey] = useState(data.Transmission_Information.remote_key);
    const [remoteDirectory, setRemoteDirectory] = useState(data.Transmission_Information.remote_directory);
    const [shareName, setShareName] = useState(data.Transmission_Information.share_name);
    const [timeout, setTimeout] = useState(data.Transmission_Information.Connection_wait_timeout);
    

    
    useEffect(() => {
        getConfiguration("mohit.kumar@nethealth.com");
    }, [location.state.installation,location.state.message]);

    // get installations
    const getConfiguration = (user_id="") => {
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };

        const param = {
                         "installation":location.state.installation,
                         "message_type":location.state.message,
                      };
            
        axios.post(URL.GET_CONFIGURATION,param,config)
          .then((response) => {
            if (response.status === 200) {
                setConfigData(response?.data);
                if(response?.data.transmission_information.host)
                    setHost(response?.data.transmission_information.host);
                else
                    setHost("");
                setPort(response?.data.transmission_information.port);
                setUsername(response?.data.transmission_information.username);
                if(response?.data.transmission_information.password)
                    setPassword(response?.data.transmission_information.password);
                else
                    setPassword("");

                setPrivateKey(response?.data.transmission_information.private_key);
                setRemoteKey(response?.data.transmission_information.domain);
                setShareName(response?.data.transmission_information.share_name);
                setTimeout(response?.data.transmission_information.connection_wait_timeout_ms);
                setRemoteDirectory(response?.data.transmission_information.remote_directory);
                setID(response?.data.transmission_information.id);
            }
            else{
                alert("Update Failed");
            }
          })
          .catch((error) => {
            alert("Data fetch Failed");
            console.log(error);
          });
    };  
    
    function handleHostChange(e) {
        setHost(e.target.value);
    }

    function handlePortChange(e) {
        setPort(e.target.value);
    }  

    function handleUsernameChange(e){
        setUsername(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    function handlePvtKeyChange(e){
        setPrivateKey(e.target.value);
    }

    function handleRemoteKeyChange(e){
        setRemoteKey(e.target.value);
    }

    function handleDirectoryChange(e){
        setRemoteDirectory(e.target.value);
    }

    function handleShareNameChange(e){
        setShareName(e.target.value);
    }

    function handleTimeoutChange(e){
        setTimeout(e.target.value);
    }


    //Post Data
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };

        const configData1 = 
        {
            "id":trans_id,
            "host": host,
            "port":port,
            "username":username,
            "password":password,
            "private_key":privateKey,
            "remote_directory":remoteDirectory,
            "domain":remoteKey,
            "share_name":shareName,
            "connection_wait_timeout_ms":timeout,
            "emailId":"mohit.kumar@nethealth.com",
            "installation":location.state.installation,
            "message_type":location.state.message,
        }

        axios.put(URL.POST_CONFIG_DATA, configData1, config)
        .then(response => {
            if (response.status === 200) {
                alert("Data changed Successfully.");
                getConfiguration("");
              }  
        })
        .catch(error => {
            alert("Data Update Failed.")
            console.log(error);
        });
    }
    
    return (
        <>    
         <ul className="breadcrumb">
            <li><a href="/">Home</a></li>
            <li>{location.state.installation}</li>
            <li>{location.state.message}</li>
        </ul>

        <div className="basic_configuration">
            <p>Basic Configuration</p>
            <table className="table table-borderless">
                <thead className="thead-dark" >
                    <tr>
                        <th style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Installation config ID</th>
                        <th style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Is Enabled</th>
                        <th style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Message Type</th>
                        <th style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>installation</th>
                        <th style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Is Wiretap</th>
                        <th style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Is Log File Transmission</th>
                        <th style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Is Rest Call After Ack</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    configData ? 
                        <tr>
                            <th scope="row">{configData?.basic_configuration?.installation_config_id}</th>
                            <td>{configData?.basic_configuration?.is_enabled?"TRUE":"FALSE"}</td>
                            <td>{configData?.basic_configuration?.message_type}</td>
                            <td>{configData?.basic_configuration?.installation}</td>
                            <td>{configData?.basic_configuration?.is_wiretap?"TRUE":"FALSE"}</td>
                            <td>{configData?.basic_configuration?.is_log_file_transmission?"TRUE":"FALSE"}</td>
                            <td>{configData?.basic_configuration?.is_rest_call_after_ack?"TRUE":"FALSE"}</td>
                        </tr>
                    :
                    ""
                    }    
                </tbody>
            </table>

        </div>

        <div className="transmission_configuration">
            <p>Transmission Configuration</p>  
            <form onSubmit={handleSubmit}> 
                <table className="table">
                    <tbody>
                    <tr>
                        <td>
                            <div className="form-group" style={{padding:'0px 20px'}}>
                                <label htmlFor="host" style={{margin:'10px 0px'}}>Host Name:</label>
                                <input type="text" className="form-control" id="host" value={host} onChange={handleHostChange} required />
                            </div>
                        </td>
                        <td>
                            <div className="form-group" style={{padding:'0px 20px'}}>
                                <label htmlFor="port" style={{margin:'10px 0px'}}>Port:</label>
                                <input type="text" className="form-control" id="port" value={port} onChange={handlePortChange} required />
                            </div>
                        </td>
                        <td>
                            <div className="form-group" style={{padding:'0px 20px'}}>
                                <label htmlFor="username" style={{margin:'10px 0px'}}>User Name:</label>
                                <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} required />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="form-group" style={{padding:'0px 20px'}}>
                                <label htmlFor="password" style={{margin:'10px 0px'}}>Password:</label>
                                <input type="text" className="form-control" id="password" value={password} onChange={handlePasswordChange} required />
                               
                            </div>
                        </td>
                        <td>
                            <div className="form-group" style={{padding:'0px 20px'}}>
                                <label htmlFor="private_key" style={{margin:'10px 0px'}}>Private Key:</label>
                                <input type="text" className="form-control" id="private_key" value={privateKey} onChange={handlePvtKeyChange} required />
                            </div>
                        </td>
                        <td>
                            <div className="form-group" style={{padding:'0px 20px'}}>
                                <label htmlFor="remote_key" style={{margin:'10px 0px'}}>Domain:</label>
                                <input type="text" className="form-control" id="remote_key" value={remoteKey} onChange={handleRemoteKeyChange} required />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="form-group" style={{padding:'0px 20px'}}>
                                <label htmlFor="remote_directory" style={{margin:'10px 0px'}}>Remote Directory:</label>
                                <input type="text" className="form-control" id="remote_directory" value={remoteDirectory} onChange={handleDirectoryChange} required />
                            </div>
                        </td>
                        <td>
                            <div className="form-group" style={{padding:'0px 20px'}}>
                                <label htmlFor="shareName" style={{margin:'10px 0px'}}>Share Name:</label>
                                <input type="text" className="form-control" id="shareName" value={shareName} onChange={handleShareNameChange} required />
                            </div>
                        </td>
                        <td>
                            <div className="form-group" style={{padding:'0px 20px'}}>
                                <label htmlFor="timeout" style={{margin:'10px 0px'}}>Connection Wait Timeout (ms):</label>
                                <input type="text" className="form-control" id="timeout" value={timeout} onChange={handleTimeoutChange} required />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td style={{padding:'20px'}}>
                           {/*<button type="reset" className="btn btn-outline-dark" style={{marginTop:'20px'}}>Reset</button>*/} 
                            <button type="submit" className="btn btn-dark" style={{marginTop:'20px',marginLeft:'20px',backgroundColor:'#adafb6',color:'black'}} >Update</button>
                        </td>
                    </tr>
                    </tbody>    
                </table>
            </form>   
        </div>

        <div className="message_mapping">
            <p>Message Mapping</p>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th  style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Installation config ID</th>
                        <th  style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Installation</th>
                        <th  style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Message Type</th>
                        <th  style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Source ID</th>
                        <th  style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Destination ID</th>
                        <th  style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}> Segment Lebel</th>
                        <th  style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Path to Object</th>
                        <th  style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Type</th>
                        <th  style={{ backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Date Format</th>
                        <th style={{backgroundColor:'#333F48',padding:'.5 rem',color: 'white'}}>Created</th>
                    </tr>
                </thead>
                <tbody>         
                        {
                        configData && configData.message_mapping_details ? 
                        <PaginatedItems items={configData.message_mapping_details} itemsPerPage={5} />
                        :
                        ""
                        }
                </tbody>
            </table>
        </div>
        </>
    );
}
