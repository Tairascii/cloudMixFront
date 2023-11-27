import { describe, expect, it } from '@jest/globals'
import { CreateChatModal } from '..'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'

describe('CreateChatModal', () => {
  it('should not be rendered if not open', () => {
    render(
      <CreateChatModal
        isOpen={false}
        setIsOpen={jest.fn()}
        onSubmit={jest.fn()}
      />,
    )

    const text = screen.queryByText('Type name for your bot')
    expect(text).toBeNull()
  })

  it('should be rendered when opened', () => {
    render(
      <CreateChatModal
        isOpen={true}
        setIsOpen={jest.fn()}
        onSubmit={jest.fn()}
      />,
    )

    const text = screen.queryByText('Type name for your bot')
    expect(text).not.toBeNull()
  })

  it('should call submit function and close modal when enter pressed', async () => {
    const mockSetIsOpen = jest.fn()
    const mockSubmit = jest.fn()
    render(
      <CreateChatModal
        isOpen={true}
        setIsOpen={mockSetIsOpen}
        onSubmit={mockSubmit}
      />,
    )

    const input = screen.getByRole('textbox')
    const form = screen.getByTestId('NameForm')

    await waitFor(() => {
      fireEvent.change(input, { target: { value: 'Aliya' } })
    })
    
    fireEvent.submit(form)

    expect(mockSetIsOpen).toBeCalled()
    expect(mockSubmit).toBeCalledWith('Aliya')
  })

  it('should not submit if name is not given', () => {
    const mockSetIsOpen = jest.fn()
    const mockSubmit = jest.fn()
    render(
      <CreateChatModal
        isOpen={true}
        setIsOpen={mockSetIsOpen}
        onSubmit={mockSubmit}
      />,
    )

    const form = screen.getByTestId('NameForm')

    fireEvent.submit(form)

    expect(mockSetIsOpen).not.toBeCalled()
    expect(mockSubmit).not.toBeCalled()
  })
})
