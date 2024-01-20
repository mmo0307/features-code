# Alternative useState hell

## Problem with multiple creative useState

```
Wrong
```
```
const App = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [remember, setRemember] = useState(false);
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
}
```

or

```
Right (1)
```
```
const App = () => {
    const [state, setState] = useState({
        name: '',
        password: '',
        email: '',
        remember: false,
        street: '',
        city: ''
    });
    
    
    return (
        <div>
            <button onClick={() => setState({
                ...state,
                ...{email: 'email@gmail.com'},
            )}>
                Submit
            </button>
        </div>
    )
}
```

```
Right (2)
```
```
const App = () => {
    const [state, updateState] = useReducer((prev, next) => ({
        ...prev,
        ...next
    }), {
        name: '',
        password: '',
        email: '',
        remember: false,
        street: '',
        city: ''
    });
    
    
    return (
        <div>
            <button onClick={() => updateState({
                remember: true,
                email: 'email@gmail.com'
            )}>
                Submit
            </button>
        </div>
    )
}
```