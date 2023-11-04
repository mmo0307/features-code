# Drap and Drop

*Install*
> npm i react-beautiful-dnd

*add import in file*
*import {DrapDropContext, Droppable, Draggable} from 'react-beautiful-dnd'*

*DragDropContext - enable drag and drop\n*
*Droppable - area to move around items\n*
*Draggable - item which we can move\n*

------------
*Create some data items to move around:*

const TEAM_DATA = [
    {id: 1, name: 'Dima'},
    {id: 2, name: 'Vika'},
    {id: 3, name: 'Anton'},
    {id: 4, name: 'Misha'},
    {id: 5, name: 'Any'},
];

------------

Template component
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