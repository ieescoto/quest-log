import { useContext } from "react";
import type {Context} from "../interfaces/context";
import { ContextData } from "../context/Context";
import Navbar from "../components/Navbar";

export default function Characters(){
    const data = useContext<Context>(ContextData).user.data
    
        return (
                /* CONTENEDOR GENERAL: menú lateral + contenido de la página */
                <div className="min-h-screen bg-[#090b18] pb-[calc(68px+env(safe-area-inset-bottom))] text-slate-100 lg:pb-0">
            
                  <div className="flex min-h-screen">
            
                    {/* MENÚ LATERAL */}
                    <Navbar />
            
                    {/* ÁREA PRINCIPAL: todo lo que aparece a la derecha del menú */}
                    <main className="min-w-0 flex-1">
                        <h1>Characters</h1>
                        <p>{data.username}</p>
                      
                    </main>
                  </div>
                </div>
              );
}