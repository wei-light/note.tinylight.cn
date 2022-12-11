import classNames from 'classnames'

type Props = {
  active: boolean
  click: () => void
}

const MobileMenuButton = ({ active, click }: Props) => (
  <button
    onClick={click}
    className={classNames(
      { '-rotate-45': active },
      'flex flex-col justify-between w-[14px] h-4 transition-transform',
    )}
  >
    <span
      className={classNames(
        { '-rotate-90': active },
        'w-1/2 bg-neutral-400 h-0.5 rounded-full origin-right transition-transform',
      )}
    />
    <span
      className={classNames(
        'w-full bg-neutral-400 h-0.5 rounded-full transition-transform',
      )}
    />
    <span
      className={classNames(
        { '-rotate-90': active },
        'self-end w-1/2 bg-neutral-400 h-0.5 rounded-full origin-left transition-transform',
      )}
    />
  </button>
)

export default MobileMenuButton
