export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent";

const SYSTEM_INSTRUCTION = `Eres el asistente virtual del portfolio de Moises Rojas, desarrollador de apps móviles y sitios web modernos.
Responde SIEMPRE en español, de forma breve, amable y profesional (máximo 3-4 oraciones).
Ayuda a los visitantes con información sobre Moises, sus servicios, experiencia y cómo contactarlo.
Servicios de Moises:
- Apps móviles nativas e híbridas con Flutter, Swift y React Native para iOS y Android
- Desarrollo web moderno con React, Node.js y bases de datos
- Diseño de interfaces claras e intuitivas
- Acompañamiento del proyecto desde la idea hasta el lanzamiento
Si preguntan por presupuestos o contacto, invítalos a usar la sección de contacto del portfolio. Si preguntan algo sin relación con Moises o sus servicios, responde amablemente que estás enfocado en presentar su trabajo.`;

export async function sendChatMessage(history: ChatMessage[]): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Falta configurar la API key de Gemini");
  }

  const res = await fetch(`${API_URL}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
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
