import { keysToCamel } from 'Core/utils/keysToCamel'
import { makeAutoObservable, runInAction } from 'mobx'
import { createChat, getAllChats } from 'modules/Chats/api/chats'
import { createChatsDictionary } from 'modules/Chats/utils/createChatsDictionary'

export class ChatsStore {
  isLoading: boolean = true

  chats: Chat[] = []

  chatsDictionary: Record<string, Chat> = {}

  constructor() {
    makeAutoObservable(this)
  }

  loadChats = async () => {
    this.isLoading = true
    try {
      const chats = await getAllChats()
      runInAction(() => {
        this.chats = keysToCamel(chats)
        this.chatsDictionary = createChatsDictionary(this.chats)
      })
    } catch (error) {
      throw new Error(error)
    } finally {
      this.isLoading = false
    }
  }

  get chatsCount() {
    return this.chats?.length
  }

  createChat = async (botName: string) => {
    const chat = await createChat(botName)
  }

  hydrate(initialChats: Chat[]): void {
    if (initialChats) {
      this.chats = initialChats ?? []
      this.chatsDictionary = createChatsDictionary(this.chats)
    }
  }
}
