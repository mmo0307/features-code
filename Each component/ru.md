# Each component

замена `.map()` функции

```
import Children from 'react';

const arr = [{id: 2, name: 'name2'}, {id: 1, name: 'name1'}]

const Each = ({render, data}) => 
    Children.toArray(data.map((item, index) => render(item, index)))

const App = () => 
    <Each data={arr} render={(item, index) => <div key={item.id}>{item.name}</div>} />
```