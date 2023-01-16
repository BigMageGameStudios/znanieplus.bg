/// <reference lib="webworker" />
import { processImage } from './decode';

addEventListener('message', ((message) => {
  try {
    const { width, height, data } = message.data;
    processImage(data);
    postMessage(null);
  } catch (e) {
    console.log(e)
  }
}));
