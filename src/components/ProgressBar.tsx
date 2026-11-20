import {useState, useContext, useEffect } from "react";
import { ContextData } from "../context/Context";
import type { Context } from "../interfaces/context";

export function ProgressBar({design} : {design : string}) {
    {/* Barra de experiencia: el ancho es solo ilustrativo */}
    const {xp,nextLevelXP} = useContext<Context>(ContextData).user.data;
    const [progressBar, setProgressBar] = useState(0);
    
    useEffect(()=>{
        if(xp>0){
            let newProgress = 100-(nextLevelXP-xp)
            if(xp>=nextLevelXP){
                newProgress = xp-nextLevelXP;
            }
            setProgressBar(newProgress);
        }
    }, [xp])
    return (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700">
            <div className={`h-full rounded-full transition-all duration-300 ${design}`} style={{width: `${progressBar}%`}} /> 
            {/*El w- es lo que modifica la barra, w-41(40.6) es la barra llena */}
        </div>
    )
}