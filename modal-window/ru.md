# Modal Window &React Portal

Порталы используются в ситуациях, когда дочерним компонентам необходимо визуально отделиться от родительского контейнера. Типичные примеры использования порталов:

- Модальные диалоговые окна.
- Подсказки.
- Всплывающие визитки.
- Погрузчики.

Портал создается с помощью ReactDOM.createPortal(дочерний элемент, контейнер). Здесь *child* — это элемент, фрагмент или строка React, а *container* — это местоположение или узел DOM, куда следует добавить портал.

Порталы в React могут пригодиться, когда вам нужно визуализировать дочерние компоненты за пределами обычной иерархии DOM. При этом используется иерархия дерева компонентов React и не нарушается поведение по умолчанию, определенное для распространения событий. Именно так отображаются такие компоненты, как модальные окна, всплывающие подсказки или сообщения и многие другие.

Что следует учитывать при использовании порталов:
— Пузырь событий будет работать как обычно, передавая события предкам в дереве React, независимо от местоположения узла портала в DOM.
— React контролирует узлы портала и их жизненный цикл при рендеринге дочерних элементов с помощью этих порталов.
— Порталы влияют только на структуру DOM для HTML и не влияют на дерево компонентов React.
- Точка монтирования HTML предопределена: при использовании порталов необходимо определить элемент HTML DOM в качестве точки монтирования компонента портала.

```
добавить *<div id="portal"></div>* в index.html

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

создание Modal Component

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

добавить Modal Component в другой компонент

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
