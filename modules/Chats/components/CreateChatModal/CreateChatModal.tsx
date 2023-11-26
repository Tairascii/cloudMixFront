import { FC, FormEvent, useState } from 'react'
import Modal from '@mui/material/Modal'
import styles from './CreateChatModal.module.scss'

interface CreateChatModalProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onSubmit: (name: string) => Promise<void>
}

const CreateChatModal: FC<CreateChatModalProps> = ({ isOpen, setIsOpen, onSubmit }) => {
  const [name, setName] = useState('')

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(name)
    setName('')
    setIsOpen(false)
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={styles.block}
    >
      <form onSubmit={onSubmitForm} className={styles.form}>
        <span className={styles.title}>Type name for your bot</span>
        <input
          type='text'
          placeholder='Name'
          className={styles.field}
          maxLength={16}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </Modal>
  )
}

export default CreateChatModal
