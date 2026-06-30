import { handleGTFRI, handleGTHBD, handleGTMLS, handleGTNCN, handleStandardPacket } from "../helper/data_helper_functions/handler/handler.js"
export async function operations(packet){
    const packetType = packet.envelope?.messageType;
    const packetInfo = packet.packet;
    if(packetType && packetInfo){
        switch(packetType){
            case "GTFRI":{
                await handleGTFRI(packetInfo);
                break;
            }
            case "GTHBD":{
                await handleGTHBD(packetInfo);
                break
            }
            case "GTLOC":
            case "GTLOF":
            case "GTLOF":
            case "GTULF": 
            case "GTSTT":
            case "GTALM":
            case "GTBOV":
            case "GTBRN":
            case "GTULS":{
                await handleStandardPacket(packetInfo, packetType);
                break;
            }
            case "GTULS":{
                await handleGTMLS(packetInfo);
                break;
            }
            case "GTNCN":{
                await handleGTNCN(packetInfo);
                break;
            }
        }
    }
}