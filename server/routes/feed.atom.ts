import { getFeed } from '../../utils/feed'

export default defineEventHandler(async (e) => {
  setResponseHeader(e, "Content-Type", "application/xml");
  return (await getFeed(e)).atom1();
})