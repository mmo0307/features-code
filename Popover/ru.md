# Popover component

### PopoverContext and usePopoverContext
```
import { createContext, useContext } from "react";
interface PopoverContextProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const PopoverContext = createContext<PopoverContextProps>(null!);

export const usePopoverContext = () => {
  const props = useContext(PopoverContext);
  if (!props) {
    throw new Error("No popover context found! ");
  }

  return props;
};
```

### PopoverListItem
```
interface PopoverListItemProps extends ComponentPropsWithoutRef<"button"> {}

const PopoverListItem: FC<PopoverListItemProps> = ({
  onClick,
  className,
  children,
}) => {
  const props = usePopoverContext();

  return (
    <button
      onClick={(e) => {
        onClick?.(e);
        props.onClose();
      }}
      className={classNames("", className)}
    >
      {children}
    </button>
  );
};
```

### PopoverList
```
interface PopoverListProps extends ComponentPropsWithoutRef<"div"> {
  show?: boolean;
}

const PopoverList: FC<PopoverListProps> = ({
  children,
  className,
  ...rest
}) => {
  const props = usePopoverContext();
  const ref = useClickOutside(props.onClose);
  if (!props.open) return null;

  return (
    <div
      {...rest}
      ref={ref}
      className={classNames(
        "bg-white rounded shadow p-5 flex flex-col absolute top-12 right-0",
        className
      )}
    >
      {children}
    </div>
  );
};
```

### PopoverButton
```
interface PopoverButtonProps extends ComponentPropsWithoutRef<"button"> {}

const PopoverButton: FC<PopoverButtonProps> = ({
  children,
  className,
  onClick,
  ...rest
}) => {
  const props = usePopoverContext();
  return (
    <button
      {...rest}
      className={classNames("", className)}
      onClick={(e) => {
        onClick?.(e);
        props.onOpen();
      }}
    >
      {children}
    </button>
  );
};
```
### Popover
```
interface PopoverComponentProps extends ComponentPropsWithoutRef<"div"> {}

const PopoverComponent: FC<PopoverComponentProps> = ({
  className,
  children,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <PopoverContext.Provider value={{ open, onOpen, onClose }}>
      <div {...rest} className={classNames("relative", className)}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

const Popover = Object.assign(PopoverComponent, {
  Button: PopoverButton,
  List: PopoverList,
  ListItem: PopoverListItem,
});
```

# Result
```
 <Popover className="relative">
        <Popover.Button>Popover!</Popover.Button>
        <Popover.List>
          {data.map((x) => (
            <Popover.ListItem key={x.firstname}>
              {x.firstname} {x.lastname}
            </Popover.ListItem>
          ))}
        </Popover.List>
      </Popover>
```