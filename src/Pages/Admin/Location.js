import React, { useState } from "react";
import Layout from "../../components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import City from "./City/List";
import Country from "./Country/List";
import States from "./States/List";
import ContentHeader from "../../components/ContentHeader";

// 🔥 SortableItem wrapper (Fixed with drag handle)
function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "10px",
    background: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  return (
    <div ref={setNodeRef} style={style} className="sortable-item">
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        style={{
          cursor: "grab",
          padding: "8px 12px",
          background: "#f7f7f7",
          borderBottom: "1px solid #eee",
          fontWeight: "bold",
        }}
      >
        ⇅ Drag {id}
      </div>

      {/* Actual content (clickable area) */}
      <div style={{ padding: "10px" }} className="sortable-content">
        {children}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [items, setItems] = useState(["Country", "States", "City"]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
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
      <ContentHeader
              title="Manage Location"
              breadcrumbs={[{ label: "Manage Location (Country, States &  City)" }]}
            />
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
