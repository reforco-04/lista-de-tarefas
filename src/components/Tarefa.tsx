import { LuPencil, LuTrash } from "react-icons/lu";

export interface TarefaTipo {
    id?: number,
    titulo: string,
    descricao: string,
    data: string
}

const Tarefa = ({ titulo, descricao, data } : TarefaTipo ) => {
    return (
        <div className="rounded bg-white p-4 ">
            <h6 className="font-bold text-lg line-clamp-1" title={titulo}>{titulo}</h6>
            <p className="line-clamp-3">{descricao}</p>
            <div className="flex justify-between items-center mt-6">
                {data.split("T")[0].split('-').reverse().join('/')}
                <div className="flex gap-3">
                    <LuPencil className="cursor-pointer" />
                    <LuTrash className="cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default Tarefa;