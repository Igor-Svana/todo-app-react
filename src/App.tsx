import sunIcon from "./assets/icon-sun.svg";
import moonIcon from "./assets/icon-moon.svg";
import { useState, useRef, useMemo } from "react";
import desktopImgDark from './images/bg-desktop-dark.jpg';
import desktopImgLight from './images/bg-desktop-light.jpg';
import { theme } from "./themeSchema";
import DragAndDrop from "./components/dragAndDrop/dragAndDrop";
import "./App.css";

export interface Item {
  id: string;
  content: string;
  active: boolean;
}

function App() {
  const [colorTheme, setColortheme] = useState(theme.dark);
  const [items, setItems] = useState<Item[]>([]);
  const [listState, setListState] = useState("all");
  const filteredItems = useMemo(() => {
    if (listState === "active") {
      return items.filter((item) => item.active === true);
    } else if (listState === "completed") {
      return items.filter((item) => item.active === false);
    } else if (listState === "all") {
      return items;
    }
  }, [listState, items]);
  const activeItems = useMemo(
    () => items.filter((item) => item.active === true),
    [items]
  );

  const newTodo = useRef<HTMLInputElement>(null);

  window.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (newTodo.current && newTodo.current.value != "") {
        const data: Item = {
          id: Math.random().toString(),
          content: newTodo.current.value,
          active: true,
        };
        setItems((current) => {
          return [data, ...current];
        });

        newTodo.current.value = "";
      }
    }
  });

  const deleteItemHandler = (id: string) => {
    const itemsList = items.filter((item) => item.id != id);
    setItems(itemsList);
  };

  const deleteCompletedHandler = () => {
    const filtered = items.filter((item) => item.active != false);
    setItems(filtered);
  };

  return (
    <>
      <main
        className="main-container"
        style={{ background: colorTheme.bgColor }}
      >
        <img
          className="bg-image"
          src={
            colorTheme === theme.dark
              ? desktopImgDark
              : desktopImgLight
          }
          alt="bg-image"
        />
        <div className="todo-container">
          <div className="todo-header">
            <h1>TODO</h1>
            <img
              onClick={() => {
                setColortheme(
                  colorTheme === theme.dark ? theme.light : theme.dark
                );
                {
                  colorTheme === theme.dark
                    ? document.body.style.setProperty(
                        "--hover_color",
                        "hsl(235, 24%, 19%)"
                      )
                    : document.body.style.setProperty(
                        "--hover_color",
                        "hsl(234, 39%, 85%)"
                      );
                }
              }}
              src={colorTheme === theme.dark ? sunIcon : moonIcon}
              alt="themeIcon"
            />
          </div>
          <div
            className="add-todo-container"
            style={{ background: colorTheme.listBgColor }}
          >
            <label htmlFor="add-todo-input">
              <span className="static_circle" style={{borderColor: colorTheme.borderColor}}></span>
            </label>
            <input
              ref={newTodo}
              id="add-todo-input"
              className="add-todo-input"
              style={{ color: colorTheme.textColor }}
              placeholder="Create a new todo..."
            ></input>
          </div>
          <div
            className="todo-items-container"
            style={{ background: colorTheme.listBgColor }}
          >
            <div className="items-list-container">
              <DragAndDrop
                textColor={colorTheme.textColor}
                lightBgColor={colorTheme.listBgColor}
                borderColor={colorTheme.borderColor}
                filteredItems={filteredItems ? filteredItems : items}
                items={items}
                setItems={setItems}
                deleteItemHandler={deleteItemHandler}
              />
            </div>
            <div
              className="filters-container"
              style={{
                color: colorTheme.very_light_lines,
                borderTop: `1px solid ${colorTheme.borderColor}`,
              }}
            >
              <span>{activeItems.length} items left</span>
              <div className="filters-middle" style={{background: colorTheme.listBgColor}}>
                <span
                  className={listState === "all" ? "active" : ""}
                  onClick={() => setListState("all")}
                >
                  All
                </span>
                <span
                  className={listState === "active" ? "active" : ""}
                  onClick={() => setListState("active")}
                >
                  Active
                </span>
                <span
                  className={listState === "completed" ? "active" : ""}
                  onClick={() => setListState("completed")}
                >
                  Completed
                </span>
              </div>
              <span onClick={() => deleteCompletedHandler()}>
                Clear Completed
              </span>
            </div>
          </div>
        </div>
        <span className="bottom-text" style={{color: colorTheme.borderColor}}>Drag and drop to reorder list</span>
      </main>
    </>
  );
}

export default App;
