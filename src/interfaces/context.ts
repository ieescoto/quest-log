import type {UserContextType} from "../interfaces/user";
import type {MissionContextType} from "../interfaces/missions";

export interface Context {
    user: UserContextType,
    mission : MissionContextType
}