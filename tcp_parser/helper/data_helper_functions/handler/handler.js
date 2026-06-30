import { parseECUErrorType, parseECUAlive, parseECULock } from "../validators/ecuCheck.js";
import { parseNetworkType } from "../validators/networkCheck.js";
import { parsePowerSupplyCode } from "../validators/powerCheck.js";
import { parseLockType, parseLockState } from "../validators/gtmlsCheck.js";
import { insertGTFRI } from "../repo/gtfri.js";
import { insertGTHBD } from "../repo/gthbd.js";
import { insertStandardPacket } from "../repo/standardPacket.js";
import { insertGTMLS } from "../repo/gtmls.js";
import { insertGTNCN } from "../repo/gtncn.js";

export async function handleGTFRI(packet){
    const ecuCheck = parseECUErrorType(packet.ecu.errorType) && parseECUAlive(packet.ecu.alive) && parseECULock(packet.ecu.locked);
    const networkCheck = parseNetworkType(packet.network.networkType);
    const powerCheck = parsePowerSupplyCode(packet.power.powerSupply);

    if(ecuCheck && networkCheck && powerCheck){
        await insertGTFRI(packet);
    }  
}

export async function handleGTHBD(packet){
    await insertGTHBD(packet);
}

export async function handleStandardPacket(packet, packetType){
    const powerCheck = parsePowerSupplyCode(packet.power.powerSupply);

    if(powerCheck){
        await insertStandardPacket(packet, packetType);
    }  
}

export async function handleGTMLS(packet){
    const lockCheck = parseLockType(packet.lockType) && parseLockState(packet.lockState);

    if(lockCheck){
        await insertGTMLS(packet);
    }  
}

export async function handleGTNCN(packet){
    const ecuCheck = parseECUErrorType(packet.ecu.errorType) && parseECUAlive(packet.ecu.alive) && parseECULock(packet.ecu.locked);
    const networkCheck = parseNetworkType(packet.network.networkType);
    const powerCheck = parsePowerSupplyCode(packet.power.powerSupply);

    if(ecuCheck && networkCheck && powerCheck){
        await insertGTNCN(packet);
    }  
}