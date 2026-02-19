"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";

import {
  FaBold,
  FaListUl,
  FaListOl,
  FaTable,
  FaPlus,
  FaMinus,
  FaColumns,
  FaTrash,
} from "react-icons/fa";

export default function MinimalEditor({ content, onChange }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // 🔥 Sync content when tab changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "", false);
    }
  }, [content, editor]);

  if (!editor) return null;

  const isTableActive = editor.isActive("table");

  return (
    <div className="border rounded-md bg-white shadow-sm">

      {/* TOOLBAR */}
      <div className="flex flex-wrap gap-2 border-b p-3 bg-[#f5f3ef] items-center">

        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive("bold") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <FaBold />
        </button>

        {/* Bullet List */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <FaListUl />
        </button>

        {/* Ordered List */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <FaListOl />
        </button>

        {/* Insert Table */}
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className="p-2 hover:bg-gray-200 rounded"
        >
          <FaTable />
        </button>

        {/* 🔥 TABLE CONTROLS — ONLY IF INSIDE TABLE */}
        {isTableActive && (
          <>
            <div className="w-px h-6 bg-gray-300 mx-2" />

            <button
              onClick={() => editor.chain().focus().addRowAfter().run()}
              className="p-2 hover:bg-gray-200 rounded"
              title="Add Row"
            >
              <FaPlus />
            </button>

            <button
              onClick={() => editor.chain().focus().deleteRow().run()}
              className="p-2 hover:bg-gray-200 rounded"
              title="Delete Row"
            >
              <FaMinus />
            </button>

            <button
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              className="p-2 hover:bg-gray-200 rounded"
              title="Add Column"
            >
              <FaColumns />
            </button>

            <button
              onClick={() => editor.chain().focus().deleteColumn().run()}
              className="p-2 hover:bg-gray-200 rounded"
              title="Delete Column"
            >
              <FaColumns className="rotate-90" />
            </button>

            <button
              onClick={() => editor.chain().focus().deleteTable().run()}
              className="p-2 hover:bg-red-200 text-red-600 rounded"
              title="Delete Table"
            >
              <FaTrash />
            </button>
          </>
        )}
      </div>

      {/* EDITOR */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-[250px] prose max-w-none focus:outline-none"
      />
    </div>
  );
}
