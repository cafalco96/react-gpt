import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt } = options;
  const completion = await openai.chat.completions.create({
    model: 'gpt-5.4-nano',
    temperature: 0.3,
    max_completion_tokens: 150,
    messages: [
      {
        role: 'system',
        content: `
          Te serán proveídos textos en español con posibles errores ortogáficos y gramaticales,
          desdes de responder en formato JSON,
          tu tarea es corregir los errores ortográficos y gramaticales presentes en el texto, verificando que las palabras existan y sean aceptadas con la RAE,
          y retornar información de la correcciòn realizada, ademàs de un porcentaje de acierto por el usuario.
          Si no hay errores se retorna un mensaje de felicitaciones.
          Ejemplo de salida JSON:
          {
          userScore: number,
          errores: string[], //['error -> corrección']
          message: string // '¡Felicitaciones! No se encontraron errores.' o 'Se encontraron errores, por favor revisa las correcciones. + emojis'
          }
          `,
      },
      { role: 'user', content: prompt },
    ],
  });
  return JSON.parse(completion.choices[0]?.message?.content ?? '{}');
};
