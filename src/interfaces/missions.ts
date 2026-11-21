type category = "exploration" | "combat" | "adventure" | "study"

type difficulty = "easy" | "medium" | "hard" | "epic"

type status = "completed" | "pending"

export interface Mission{
    id: string,
    title: string,
    description: string,
    category: category,
    difficulty: difficulty,
    status: status,
    deadline: string | null,
}

export interface MissionContextType{
    data: Mission[],
    setMission: React.Dispatch<React.SetStateAction<Mission[]>>
}
