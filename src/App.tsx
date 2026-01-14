import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Tarefa, { TarefaTipo } from "./components/Tarefa";

const App = () => {

  const [gaveta, setGaveta] = useState<boolean>(false);
  const [tarefas, setTarefas] = useState<TarefaTipo[]>([]);

  const tituloRef = useRef<HTMLInputElement>(null);
  const descricaoRef = useRef<HTMLTextAreaElement>(null);
  const dataRef = useRef<HTMLInputElement>(null);

  async function buscarTarefas() {
    const request = await fetch('https://lista-de-tarefas-api-jkor.onrender.com/tarefas')
    const response = await request.json();
    setTarefas(response);
  }

  async function criarTarefa(event: any) {
    event.preventDefault();

    const tarefa = {
      titulo: tituloRef.current?.value || "",
      descricao: descricaoRef.current?.value || "",
      data: dataRef.current?.value
        ? `${dataRef.current.value}T00:00:00Z`
        : "",
    }

    const request = await fetch('https://lista-de-tarefas-api-jkor.onrender.com/tarefas', {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(tarefa)
    })
    const response = await request.json();
    alert(response.mensagem);
    setGaveta(false);
    buscarTarefas();

  }

  useEffect(() => {
    buscarTarefas();
  }, []);

  // const tarefas  = [
  //   {
  //     id: 1,
  //     titulo: "tarefa 1",
  //     descricao: "descricao da tarefa",
  //     data: "2026-01-06"
  //   },
  //   {
  //     id: 2,
  //     titulo: "tarefa 2",
  //     descricao: "descricao da tarefa",
  //     data: "2026-01-06"
  //   },
  //   {
  //     id: 3,
  //     titulo: "tarefa 3",
  //     descricao: "descricao da tarefa",
  //     data: "2026-01-06"
  //   },
  //   {
  //     id: 4,
  //     titulo: "tarefa 4",
  //     descricao: "descricao da tarefa",
  //     data: "2026-01-06"
  //   }
  // ];


  return (
    <div className="bg-slate-200 h-screen">
      <Header />
      <div className="flex justify-between items-center mt-6 px-15">
        <h2 className="text-2xl">Tarefas</h2>
        <button onClick={() => setGaveta(true)} className="h-10 px-4 rounded bg-black text-white cursor-pointer">Nova Tarefa</button>
      </div>
      <div className="grid lg:grid-cols-4 gap-4 p-15">
        {
          tarefas.map(tarefa => (
            <Tarefa key={tarefa.id} {...tarefa} />
          ))
        }
      </div>
      <div onClick={() => setGaveta(false)} className={`w-full h-screen bg-black/80 fixed top-0 left-0 duration-200 ${!gaveta && 'opacity-0 invisible'}`}></div>
      <div className={`w-100 h-screen bg-white fixed top-0 p-4 duration-200 ${!gaveta ? '-right-[400px]' : 'right-0'}`}>
        <form onSubmit={criarTarefa}>
          <label>Titulo</label>
          <input ref={tituloRef} type="text" placeholder="Titulo da tarefa" />
          <label>Descrição</label>
          <textarea ref={descricaoRef}></textarea>
          <label>Data</label>
          <input type="date" ref={dataRef} />
          <button type="submit">Criar</button>
        </form>
      </div>
    </div>
  );
}

export default App;