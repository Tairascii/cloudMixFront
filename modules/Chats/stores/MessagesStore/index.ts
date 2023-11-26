import { keysToCamel } from 'Core/utils/keysToCamel'
import { makeAutoObservable, runInAction } from 'mobx'
import { getAllChats } from 'modules/Chats/api/chats'
import { createBotReply, createMessage, getMessages } from 'modules/Chats/api/messages'
import { CreateMessageParams } from 'modules/Chats/api/types'

export class MessagesStore {
  isLoading: boolean = true

  messages: Message[] = []

  isChatSelected: boolean = false

  messageContent: string = ''

  chatId: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  loadMessages = async () => {
    this.isLoading = true
    try {
      const messages = await getMessages(this.chatId)
      runInAction(() => {
        this.messages = keysToCamel(messages.data)
        this.isChatSelected = messages.found
      })
    } catch (error) {
      throw new Error(error)
    } finally {
      this.isLoading = false
    }
  }

  sendMessage = async ({
    bot,
    sender,
    chat,
  }: Omit<CreateMessageParams, 'content'>) => {
    if(!this.messageContent) {
      return
    }
    try {
      const content = this.messageContent
      await createMessage({
        bot,
        sender,
        chat,
        content,
      })
      runInAction(() => {
        this.messageContent = ''
      })
      await createBotReply({
        bot,
        sender,
        chat,
        content,
      })

    } catch (error) {
      console.log(error.message)
    }
  }

  clearMessages = () => {
    this.messages = []
  }

  setChatId = (chatId: string) => {
    this.chatId = chatId
  }

  setMessageContent = (text: string) => {
    this.messageContent = text
  }

  get messagesCount() {
    return this.messages.length
  }

  hydrate(initialState: this): void {
    if (initialState) {
      for (let key in initialState) {
        if (this.hasOwnProperty(key)) {
          this[key] = initialState[key]
        }
      }
    }
  }
}
