import OpenAI from "openai";
import { TextToAudioDto } from "../dtos";
import * as path from "path";
import * as fs from "fs";

export const textToAudioUseCase = async (openai: OpenAI, { prompt, voice = 'coral' }: TextToAudioDto) => {
  const voices = {
    'alloy': 'alloy',
    'nova': 'nova',
    'coral': 'coral',
    'ash': 'ash',
    'ballad': 'ballad',
    'echo': 'echo',
    'fable': 'fable'
  }
  const selectedVoice = voices[voice] ?? 'coral';
  const folderPath = path.resolve(__dirname, '../../../generated/audios');
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);
  await fs.promises.mkdir(folderPath, { recursive: true });

  const mp3 = await openai.audio.speech.create({
    model: 'gpt-4o-mini-tts',
    input: prompt,
    voice: selectedVoice,
    instructions: "Speak in a cheerful and positive tone.",
    response_format: 'mp3'
  });
  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(speechFile, buffer);
  return speechFile;
}