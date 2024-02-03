# Stop re-rendering lists

article https://alexsidorenko.com/blog/react-list-rerender/

```
const Parent = () => {
  const [items, setItems] = useState([
    { value: '' },
    { value: '' },
    { value: '' }
  ])

  const onChange = useCallback((id, value) => {
    setItems(prevItems => prevItems.map((item, index) => {
      return index !== id ? item : { value: value }
    }))
  }, [])

  return (
    <div>
      {items.map((item, index) => (
        <Item
          key={index}
          id={index}
          value={item.value}
          onChange={onChange}
          />
      )}
    </div>
  )
}

const Item = memo(({id, value, onChange}) => {
  return (
    <input
      onChange={e => onChange(id, e.target.value)}
      value={value} />
  )
})
```