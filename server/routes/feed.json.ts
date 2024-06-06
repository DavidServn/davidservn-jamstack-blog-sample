import { getFeed } from '../../utils/feed'

export default defineEventHandler(async (e) => {
  setResponseHeader(e, "Content-Type", "application/json");
  return (await getFeed(e)).json1();
})