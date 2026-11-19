type category = "exploration" | "combat" | "adventure" | "study"

type difficulty = "easy" | "medium" | "hard" | "epic"

type status = "completed" | "pending"

interface Rewards {
    xp: number,
    coins: number
}

export interface Mission{
    id: string,
    title: string,
    description: string,
    category: category,
    difficulty: difficulty,
    status: status,
    deadline: string | null,
    rewards: Rewards
}

export interface MissionContextType{
    data: Mission[],
    setMission: React.Dispatch<React.SetStateAction<Mission[]>>
}
