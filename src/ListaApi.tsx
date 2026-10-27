import { useEffect, useState } from "react";
import type { Todo } from "./tipos";

const API_URL = "https://jsonplaceholder.typicode.com/todos?userId=1";
// Para testar o erro, troque por: .../todoss?userId=1

function ListaApi() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);
  const [atualizadoEm, setAtualizadoEm] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function carregar() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(API_URL, { signal: controller.signal });
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados: Todo[] = await resposta.json();
        setTodos(dados);
        setAtualizadoEm(new Date().toLocaleTimeString("pt-BR"));
        setCarregando(false);
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        setErro(e instanceof Error ? e.message : "Erro desconhecido");
        setCarregando(false);
      }
    }

    carregar();
    return () => controller.abort();
  }, [tentativa]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setTentativa(tentativa + 1)}
          disabled={carregando}
          className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white px-4 py-2 rounded"
        >
          {erro ? "Tentar de novo" : "Recarregar"}
        </button>
        {atualizadoEm && (
          <span className="text-sm text-slate-500">
            Última atualização: {atualizadoEm}
          </span>
        )}
      </div>

      {carregando && <p>Carregando...</p>}
      {erro && <p className="text-red-600">Erro: {erro}</p>}
      {!carregando && !erro && todos.length === 0 && <p>Nenhuma tarefa.</p>}
      {!carregando && !erro && todos.length > 0 && (
        <ul className="space-y-1">
          {todos.map((t) => (
            <li key={t.id}>
              {t.completed ? "[x]" : "[ ]"} {t.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}