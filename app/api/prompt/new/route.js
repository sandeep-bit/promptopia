import Prompt from '@models/prompt';
import { connectionTODB } from '@utils/database';
export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectionTODB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt: prompt,
      tag: tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response('Failed to Create Prompt', { status: 500 });
  }
};
