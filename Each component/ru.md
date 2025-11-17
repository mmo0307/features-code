# Each component

замена `.map()` функции

```
import type { ReactNode } from 'react';
import { Children } from 'react';

type EachProps<T> = {
  render: (item: T, index: number, itemArr: T[]) => ReactNode;

  data: T[];
};

const Each = <T,>({ render, data }: EachProps<T>) => (
  <>{Children.toArray(data.map((item, index, itemArr) => render(item, index, itemArr)))}</>
);
```

```
const arr = [{id: 2, name: 'name2'}, {id: 1, name: 'name1'}]

const App = () => 
    <Each data={arr} render={(item, index) => <div key={item.id}>{item.name}</div>} />
```
