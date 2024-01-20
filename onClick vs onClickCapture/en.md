# Toast Provider

onClickCapture is a prop in React that is similar to onClick, but handles the event in the bubbling phase instead of the capturing phase. In React, events have three phases: capturing, at target, and bubbling.

When you use onClick, the handler is called in the bubbling phase. That is, if you have nested elements, the handler will be called first on the nested element itself and then move up the hierarchy.

With onClickCapture the event will be handled in the immersion phase, starting at the root element and moving down the hierarchy. This allows the event to be processed before it reaches the target element.

So the main difference between them is in which phase the event is processed - in the sinking phase (onClickCapture) or in the bubbling phase (onClick).

```
import React from 'react';

const ClickExample = () => {
  const handleClick = (phase) => {
    console.log(`Click event in ${phase} phase`);
  };

  return (
    <div onClick={() => handleClick('bubbling')}>
      <div onClickCapture={() => handleClick('capturing')}>
        Click me!
      </div>
    </div>
  );
};

export default ClickExample;

//onClick 
Click event in capturing phase
Click event in bubbling phase

//onClickCapture
Click event in bubbling phase
```

### onClick 
*This happens because onClickCapture is processed in the capturing phase, and then onClick is processed in the bubbling phase.*

### onClickCapture
*This is because onClick is only processed in the bubbling phase, and there is no processing in the capturing phase as is the case with onClickCapture.*