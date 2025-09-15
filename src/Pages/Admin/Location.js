import React, { useState } from "react";
import Layout from "../../components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import City from "./City/List";
import Country from "./Country/List";
import States from "./States/List";

// 🔥 SortableItem wrapper
function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default function Dashboard() {
  const [items, setItems] = useState(["Country", "States", "City"]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.indexOf(active.id);
        const newIndex = prevItems.indexOf(over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  const renderComponent = (id) => {
    switch (id) {
      case "Country":
        return <Country />;
      case "States":
        return <States />;
      case "City":
        return <City />;
      default:
        return null;
    }
  };

  return (
    <Layout ac4="active">
      <section className="content">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((id) => (
              <SortableItem key={id} id={id}>
                {renderComponent(id)}
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </section>
      <ToastContainer position="top-center" style={{ width: "auto" }} />
    </Layout>
  );
}
