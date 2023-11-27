import { describe, expect, it } from '@jest/globals'
import { createChatsDictionary } from '../createChatsDictionary'
import { mockChats } from '../__mocks__/chat'

describe('createChatsDictionary', () => {
  it('should convert chats into record with id as key', () => {
    const test = createChatsDictionary(mockChats)
    const keys = Object.keys(test)
    expect(keys).toHaveLength(2)
    expect(keys).toEqual(['1', '2'])
  })
})
