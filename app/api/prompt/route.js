import { connectionTODB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, res) => {
  try {
    await connectionTODB();
    const posts = await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch prompts', { status: 500 });
  }
};
