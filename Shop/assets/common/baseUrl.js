//Common folder sets up the connection to the Servers
import { Platform } from "react-native"; //Platform distinguishes between Android and iOS

let baseURL = "";

//check which platform, changes depending

{
  Platform.OS == "android" //local host reserved word in android so call a different url but use port 3000
    ? baseURL = baseURL = 'http://192.168.0.52:3000/api/v1/' //api/v1 from backend = IP ADDRESS  INCLUDED, WORKS ON POSTMAN
    : //else if it's iOS

      baseURL = "http://localhost:3000/api/v1/";
}

export default baseURL;
