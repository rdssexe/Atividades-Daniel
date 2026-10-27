type Variante = "primario" | "perigo";

interface BotaoProps {
  texto: string;
  variante: Variante;
  onClick: () => void;
}

function Botao({ texto, variante, onClick }: BotaoProps) {
  const cor =
    variante === "primario"
      ? "bg-teal-600 hover:bg-teal-700"
      : "bg-red-600 hover:bg-red-700";

  return (
    <button
      onClick={onClick}
      className={`${cor} text-white px-4 py-2 rounded`}
    >
      {texto}
    </button>
  );
}

export default Botao;