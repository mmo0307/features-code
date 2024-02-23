# Drap and Drop

*Установить*
> npm i react-beautiful-dnd

*добавить импорт в файл*
*import {DrapDropContext, Droppable, Draggable} from 'react-beautiful-dnd'*

*DragDropContext - давать возможность drag and drop*
<br/>
*Droppable - область для перемещения предметов*
<br/>
*Draggable - предмет, который мы можем переместить*

------------
*Создайте несколько элементов данных для перемещения:*

const TEAM_DATA = [
    {id: 1, name: 'Dima'},
    {id: 2, name: 'Vika'},
    {id: 3, name: 'Anton'},
    {id: 4, name: 'Misha'},
    {id: 5, name: 'Any'},
];

------------

Компонент шаблона
```
function Table() {
    const [items, setItems] = useState(TEAM_DATA);

    const dataTable = items.map((el, indx) => {
        return(
            <Draggable 
                key={el.id} 
                draggableId={el.id.toString()} 
                index={indx}
            >
            {
                (prov) => {
                    return (
                        <div
                            {...prov.draggableProps}
                            {...prov.draggHandleProps}
                            ref={prov.innerRef}
                        >
                            {el.name}
                        </div>
                    )
                }
            }
            </Draggable>
        )
    });

    const onDragEnd = (res) => {
        const itemsCopy = [...items];

        const [reordereItem] = itemscopy.splice(res.source.index, 1);

        items.splice(res.destination.index, 0, reordereItem);

        setItems(items);
    }

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='items'>
                    {dataTable}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
```
