
import "./dragAndDrop.style.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import crossIcon from "../../assets/icon-cross.svg";
import checkIcon from "../../assets/icon-check.svg";
import { Item } from "../../App";

export interface IThemeProperties {
  textColor: string;
  lightBgColor: string;
  borderColor: string;
  items: Item[];
  filteredItems: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  deleteItemHandler: (id: string) => void;
}



const DragAndDrop = ({
  textColor,
  lightBgColor,
  borderColor,
  filteredItems,
  items,
  setItems,
  deleteItemHandler
}: IThemeProperties) => {
  
  console.log(items)
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const itemsCopy = [...items];
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);
    setItems(itemsCopy);
   
  };

  const checkboxHandler = (id: string) => {
    const itemsList = [...items];
    const itemsCopy = itemsList.map(item => {
      if(item.id === id) item.active = !item.active
      return item
    })
    setItems(itemsCopy)
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="items">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {filteredItems.map((item, index) => (
              <Draggable
                key={item.id && item.id}
                draggableId={item.id && item.id.toString()}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div
                      className="item-row"
                      style={{
                        color: textColor,
                        borderBottom: `1px solid ${borderColor}`,
                      }}
                    >
                      <span
                        id={item.id}
                        className={
                          item.active === false
                            ? "circle active_hover"
                            : "circle"
                        }
                        style={{ background: borderColor }}
                      >
                        <span
                          onClick={checkboxHandler.bind(this, item.id)}
                          style={{ background: lightBgColor }}
                          className="hover-inner-circle"
                        ></span>
                        <img
                          onClick={checkboxHandler.bind(this, item.id)}
                          className="checkIcon"
                          src={checkIcon}
                          alt="checkIcon"
                        />
                      </span>
                      <div>{item.content}</div>
                      <img src={crossIcon} className="crossIcon" alt="cross" onClick={() => deleteItemHandler(item.id)}/>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDrop;
