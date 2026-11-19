import { useEffect, useState, useContext } from "react";
import type {UserContextType} from "../interfaces/user";
import { ContextData } from "../context/Context";
import Navbar from "../components/Navbar";

export default function Error(){
    //const data = useContext<UserContextType>(UserContext).data

    return (
            /* CONTENEDOR GENERAL: menú lateral + contenido de la página */
            <div className="min-h-screen bg-[#090b18] text-slate-100">
        
              <div className="flex min-h-screen">
        
                {/* MENÚ LATERAL */}
                <Navbar />
        
                {/* ÁREA PRINCIPAL: todo lo que aparece a la derecha del menú */}
                <main className="min-w-0 flex-1">
                    <h1>PAGINA NO ENCONTRADA</h1>
                </main>
              </div>
            </div>
          );
}