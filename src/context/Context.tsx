import { createContext, useEffect, useState } from "react";
import type { User, DBUser } from "../interfaces/user";
import type { Mission } from "../interfaces/missions";
import type { Context } from "../interfaces/context";
import { supabase } from "../bd/supabase";
import {STORAGE_KEY} from "../constants/storageKey"
import {WelcomeModal} from "../components/WelcomeModal"

export const ContextData = createContext<Context>({
  user: {
    data: {
      id: "",
      username: "User",
      avatar: "🧙",
      level: 1,
      xp: 0,
      coins: 0,
      nextLevelXP: 100,
    },
    setUser: () => {},
  },
  mission: {
    data: [],
    setMission: () => {},
  },
});

export function AppContext({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({
    id: "",
    username: "User",
    avatar: "🧙",
    level: 1,
    xp: 0,
    nextLevelXP: 100,
    coins: 0,
  });
  const [mission, setMission] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(true)


  function formatUser(dbUser: DBUser) {
    const level = Math.floor(dbUser.xp / 100) + 1;
    const nextLevelXP = level * 100;
    setUser({ ...dbUser, level, nextLevelXP });
  }

  async function setUserData(userID: string) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userID)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        formatUser(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  async function getUsersQuest(userID:string){
    try{
      const {data,error} = await supabase.from("quests").select("id,title,description,category,difficulty,status,deadline").eq("user_id",userID).order("id",{ascending:true})

      if(!error){
        setMission(data)
      }else{
        console.error("Error when trying to get Quest Data: ",error.message)
      }
    }catch(error){
      console.error("Something went wrong when getting Quest Data: ",error)
    }
  }

  useEffect(() => {
    const getData = async () => {
      const userID = localStorage.getItem(STORAGE_KEY);
      if (userID !== null) {
        setIsNewUser(false)
        await setUserData(userID);
        getUsersQuest(userID)
      } 
    }

    getData()
  }, []);

  if(isNewUser){
    return (
      <WelcomeModal setLoading={setLoading} setIsNewUser={setIsNewUser} formatUser={formatUser} setQuest={setMission} />
    )
  }
  
  if (loading) {
    return;
  }

  return (
    <ContextData.Provider
      value={{
        user: {
          data: user,
          setUser: formatUser,
        },
        mission: {
          data: mission,
          setMission,
        },
      }}
    >
      {children}
    </ContextData.Provider>
  );
}
