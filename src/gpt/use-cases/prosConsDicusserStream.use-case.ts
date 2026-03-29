import { response } from 'express';
import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDicusserStreamUseCase = async (openai: OpenAI, { prompt }: Options) => {
  return await openai.chat.completions.create({
    stream: true,
    model: 'gpt-5.4-nano',
    temperature: 0.8,
    max_completion_tokens: 500,
    messages: [
      {
        role: 'system',
        content: `
          Te serán proveídos temas o preguntas, tu tarea es discutir los pros y contras de dicho tema o pregunta, y retornar un resumen de la discusión.
          El resumen debe incluir una conclusión clara y concisa sobre el tema o pregunta discutida.
          la respuesta debe de ser en formato markdown,los pros y contras deben de estar en una lista
          `,
      },
      { role: 'user', content: prompt },
    ],
  });
}