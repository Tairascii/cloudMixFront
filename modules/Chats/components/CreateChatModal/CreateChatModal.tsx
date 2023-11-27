import { FC, FormEvent, useState } from 'react'
import Modal from '@mui/material/Modal'
import styles from './CreateChatModal.module.scss'
import { useTranslation } from 'next-i18next'

interface CreateChatModalProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onSubmit: (name: string) => Promise<void>
}

const CreateChatModal: FC<CreateChatModalProps> = ({
  isOpen,
  setIsOpen,
  onSubmit,
}) => {
  const { t } = useTranslation()
  const [name, setName] = useState('')

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    if (!name) return
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
      <form
        onSubmit={onSubmitForm}
        className={styles.form}
        data-testid='NameForm'
      >
        <span className={styles.title}>{t('typeNameForBot')}</span>
        <input
          type='text'
          placeholder={t('name') ?? 'Name'}
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
