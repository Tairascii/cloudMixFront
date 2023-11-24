export const createChatsDictionary = (chats: Chat[]) => {
  const dict = {}
  chats.forEach((chat) => dict[chat.id] = chat)
  return dict
}
