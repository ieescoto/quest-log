import {createContext, useEffect, useState} from "react";
import type {User} from "../interfaces/user";
import type {Mission} from "../interfaces/missions";
import type {Context} from "../interfaces/context"

export const ContextData = createContext<Context>({
  user:{
    data: {
      username : "User",
      level : 1, 
      xp : 0,  
      coins : 0, 
      nextLevelXP : 100
    },
    setUser: () => {}
  },
  mission:{
    data: [],
    setMission: () => {}
  }
});

export function AppContext({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({
    username : "Roy",
    level : 1, 
    xp : 0,  
    coins : 0, 
    nextLevelXP : 100 
  });
  const [mission,setMission] = useState<Mission[]>([])
  
  useEffect(()=>{
    const getData = async () => {
      try{
        const response = await fetch("./src/assets/missions.json")
        const missions = await response.json()
        setMission(missions.missions)
      }catch(error){
        setMission([])
      }
    }
    
    getData()
  },[])
  

  return (
    <ContextData.Provider value={{
      user : {
        data : user,
        setUser
      },
      mission: {
        data: mission,
        setMission
      }
    }}>
      {children}
    </ContextData.Provider>
  )
}