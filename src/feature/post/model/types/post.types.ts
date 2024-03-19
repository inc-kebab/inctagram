export type EditPostArgs = {
  description: string
  id: string
}

export type AdditionalRefProps = {
  isDirty: boolean
  onOpen: (open: boolean) => void
}
