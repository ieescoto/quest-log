type avatar = "🧙" | "🛡️" | "🏹" | "🧝" | "🐉" | "⚔️"| "🧙‍♀️";

export interface User {
    id: string,
    username: string,
    avatar : avatar,
    level : number,
    xp : number,
    nextLevelXP : number,
    coins : number
}

export interface DBUser {
    id: string,
    username: string,
    avatar : avatar,
    xp : number,
    coins : number
}

export interface UserContextType {
  data: User;
  setUser: Function;
}


/* 2. LeetCode 49 — Group Anagrams (Medio) */
