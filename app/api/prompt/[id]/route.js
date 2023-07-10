import { connectionTODB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, { params }) => {
  try {
    await connectionTODB();
    const post = await Prompt.findById(params.id).populate('creator');
    if (!post) return new Response('Prompt Not Found', { status: 404 });
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch prompts', { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectionTODB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response('Prompt Not Found', { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to update prompt', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectionTODB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Error deleting prompt', { status: 500 });
  }
};
