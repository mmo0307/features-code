# Show conditionals

```
import {Children} from 'react';

  export const Show = props => {
    let when = null;
    let otherwise = null;

    Children.forEach(props.children, children => {
      if(children.props.isTrue === undefined) {
        otherwise = children;
      } else if (!when && children.props.isTrue === true){
        when = children;
      }
    });

    return when || otherwise;
  }

  Show.When = ({ isTrue, children}) => isTrue && children;
  Show.Else = ({ render, children }) => render || children;
```

```
export function App(props) {
  const amount = 6;
  const hasLink = true;

  return (
    <div className='App'>
      <Show>
        <Show.When isTrue={amount === 6 && !hasLink}>
          <span>1</span>
        </Show.When>

        <Show.When isTrue={amount === 6 && hasLink}>
          <span>2</span>
        </Show.When>

        <Show.Else>
          <span>3</span>
        </Show.Else>
      </Show>
    </div>
  );
}

// Log to screen
render => <span>2</span>
```