import {useState, useContext, useEffect } from "react";
import { ContextData } from "../context/Context";
import type { Context } from "../interfaces/context";

export function ProgressBar({design} : {design : string}) {
    {/* Barra de experiencia: el ancho es solo ilustrativo */}
    const {xp,nextLevelXP} = useContext<Context>(ContextData).user.data;
    const [progressBar, setProgressBar] = useState(0);
    
    useEffect(()=>{
        if(xp>0){
            const newProgress = progressBar + 25
            setProgressBar(newProgress);
            if(xp>=nextLevelXP){
                setProgressBar(0)
            }
        }
    }, [xp])
    return (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700">
            <div className={design} style={{width: `${progressBar}%`}} /> 
            {/*El w- es lo que modifica la barra, w-41(40.6) es la barra llena */}
        </div>
    )
}