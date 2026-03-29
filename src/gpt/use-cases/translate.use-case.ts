import { TranslateDto } from '../dtos';
import OpenAI from 'openai';


export const translateUseCase = async (openai: OpenAI, { prompt, lang }: TranslateDto) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-5.4-nano',
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}:${ prompt }`,
      },
    ],
    temperature: 0.2,
  });
  return { message: response.choices[0]?.message?.content };
};