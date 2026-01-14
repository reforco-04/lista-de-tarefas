import { useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const Header= () => {

    const [modoDark, setModoDark]= useState(false);

    return(
        <header className="flex justify-between items-center py-4 px-15 bg-white shadow">
            <div className="flex gap-4 items-center">
                <h1 className="text-2xl font-bold">To-Do-List</h1>
                <input placeholder="Pesquisar tarefa" className="h-10 rounded bg-slate-200 pl-4"/>
            </div>
            {
                modoDark ? (
                    <LuSun className="cursor-pointer" onClick={() => setModoDark(!modoDark)} />
                ) : (
                    <LuMoon className="cursor-pointer" onClick={() => setModoDark(!modoDark)}  />
                )
            }
        </header>
    )
}

export default Header;