import { GET } from "Core/api/REST"

const getApiPath = (slug: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}api/chats/${slug}`
}
export const getAllChats = async () => {
  const { data } = await GET(getApiPath(''))
  return data
}