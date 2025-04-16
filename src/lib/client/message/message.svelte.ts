type MessageType = 'success' | 'info' | 'error'

interface Message {
  id: string
  type: MessageType
  message: string
}

let messages: Message[] = $state([])

export function createMessageState() {
  return {
    get messages() {
      return messages
    },
    set messages(newMsgs) {
      messages = newMsgs
    },
  }
}

export function showSuccess(message: string) {
  showMessage('success', message)
}

export function showInfo(message: string) {
  showMessage('info', message)
}

export function showError(message: string) {
  showMessage('error', message)
}

function showMessage(type: MessageType, message: string) {
  const id = crypto.randomUUID()

  messages = [
    ...messages,
    {
      id,
      type,
      message,
    },
  ]

  setTimeout(() => (messages = messages.filter((message) => message.id !== id)), 3000)
}
