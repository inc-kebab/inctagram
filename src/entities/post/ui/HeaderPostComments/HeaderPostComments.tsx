import { SelectItems, UserBanner } from '@/entities/post'
import { More } from '@/shared/assets/icons/common'
import { Edit, Trash } from '@/shared/assets/icons/outline'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Dropdown } from '@/shared/ui/DropDownMenu'
import { Typography } from '@/shared/ui/Typography'

type Props = {
  avatar?: string
  className?: string
  name: string
  onSelect: (option: SelectItems) => void
}

export const HeaderPostComments = ({ avatar, className, name, onSelect }: Props) => {
  const { t } = useTranslation()

  return (
    <UserBanner
      actions={
        <Dropdown.Menu
          align="end"
          trigger={
            <Button style={{ padding: '0' }} variant="text">
              <More />
            </Button>
          }
        >
          <Dropdown.Item onClick={() => onSelect('edit')} startIcon={<Edit />}>
            <Typography variant="regular14">{t.pages.post.editPost}</Typography>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onSelect('delete')} startIcon={<Trash />}>
            <Typography variant="regular14">{t.pages.post.deletePost}</Typography>
          </Dropdown.Item>
        </Dropdown.Menu>
      }
      avatar={avatar}
      className={className}
      name={name}
    />
  )
}
