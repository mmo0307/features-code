# Modal Window

add *<div id="portal"></div>* to index.html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <div id="portal"></div>
  </body>
</html>
```

create Modal Component

```
const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

//Custom Modal
function Modal({ open, children, onClose }) {
  if (!open) return null;

  useEffect(() => {
    function onKeyPress(e) {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", onKeyPress)

    return () => {
      document.removeEventListener("keydown", onKeyPress)
    }
  }, [onClose])

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button onClick={onClose}>Close Modal</button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  )
}

//Dialog Modal
function DialogModal({ isOpen, onClose, children }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog == null) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog == null) return

    dialog.addEventListener("close", onClose)

    return () => {
      dialog.removeEventListener("close", onClose)
    }
  }, [onClose])

  return createPortal(
    <dialog ref={dialogRef}>{children}</dialog>,
    document.getElementById('portal')
  )
}

```

add Modal Component into other component

```
import Modal from './Modal'

const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

const OTHER_CONTENT_STYLES = {
  position: 'relative',
  zIndex: 2,
  backgroundColor: 'red',
  padding: '10px'
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('clicked')}>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          Fancy Modal
        </Modal>
      </div>

      <div style={OTHER_CONTENT_STYLES}>Other Content</div>
    </>
  )
}
```