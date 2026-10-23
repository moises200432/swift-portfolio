export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent";

const SYSTEM_INSTRUCTION = `Eres el asistente virtual del portfolio de Moises Rojas, desarrollador de apps móviles y sitios web modernos.
Responde SIEMPRE en español, de forma amable y profesional. Sé breve (3-5 oraciones) salvo que pidan más detalle.
Escribe en texto plano natural, como en una conversación: NO uses markdown ni asteriscos (**), ni numerales (#), ni listas con guiones. Nada de formato.
Puedes responder CUALQUIER tipo de pregunta, no solo sobre el portfolio.
Cuando la pregunta sea sobre Moises, sus proyectos, servicios, habilidades, formación, certificados o contacto, basa tu respuesta en la información del portfolio que aparece abajo. Si algo no está ahí, dilo con honestidad en lugar de inventarlo.
Si la pregunta es de otro tema (tecnología, negocios, cultura general, consejos, etc.), responde con tus conocimientos generales, sin mencionar el portfolio salvo que sea relevante.`;

let cachedPageContext: string | null = null;

function getPageContext(): string {
  if (cachedPageContext) return cachedPageContext;

  const sections = Array.from(document.querySelectorAll("section, footer"));
  const text = sections
    .map((el) => (el as HTMLElement).innerText)
    .join("\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();

  cachedPageContext = text.slice(0, 8000);
  return cachedPageContext;
}

export async function sendChatMessage(history: ChatMessage[]): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Falta configurar la API key de Gemini");
  }

  const res = await fetch(`${API_URL}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: {
        parts: [
          {
            text: `${SYSTEM_INSTRUCTION}\n\nInformación actual del portfolio:\n"""\n${getPageContext()}\n"""`,
          },
        ],
      },
      contents: history.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    }),
  });

  if (!res.ok) {
    throw new Error("El servicio de IA no está disponible, intenta más tarde");
  }

  const data = await res.json();
  const candidate = data.candidates?.[0];
  const text = candidate?.content?.parts
    ?.map((p: { text?: string }) => p.text ?? "")
    .join("")
    .trim();

  if (!text) {
    throw new Error("No recibí respuesta, intenta de nuevo");
  }
  return text;
}
