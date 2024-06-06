import { getFeed } from '../api/feed'

export default defineEventHandler(async (e) => {
  return (await getFeed(e)).json1();
})