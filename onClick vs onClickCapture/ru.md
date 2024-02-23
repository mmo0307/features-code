# Toast Provider

onClickCapture — это свойство в React, похожее на onClick, но обрабатывающее событие на этапе всплывания, а не на этапе захвата. В React события имеют три фазы: захват, достижение цели и всплывание.

Когда вы используете onClick, обработчик вызывается на этапе всплытия. То есть, если у вас есть вложенные элементы, обработчик будет вызываться сначала для самого вложенного элемента, а затем перемещаться вверх по иерархии.

При использовании onClickCapture событие будет обрабатываться на этапе погружения, начиная с корневого элемента и продвигаясь вниз по иерархии. Это позволяет обработать событие до того, как оно достигнет целевого элемента.

Таким образом, основная разница между ними заключается в том, на какой фазе обрабатывается событие — на фазе погружения (onClickCapture) или на фазе всплытия (onClick).

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
*Это происходит потому, что onClickCapture обрабатывается на этапе захвата, а затем onClick обрабатывается на этапе всплытия.*

### onClickCapture
*Это связано с тем, что onClick обрабатывается только на этапе всплытия, а на этапе захвата обработка не выполняется, как в случае с onClickCapture.*