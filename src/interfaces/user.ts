type avatar = "🧙" | "🛡️" | "🏹" | "🧝" | "🐉";

export interface User {
    username: string,
    avatar : avatar,
    level : number,
    xp : number,
    nextLevelXP : number,
    coins : number
}

export interface UserContextType {
  data: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}


/* 2. LeetCode 49 — Group Anagrams (Medio) */
