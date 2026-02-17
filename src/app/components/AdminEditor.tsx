"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState } from "react";
import { getContent, saveContent } from "../../actions/other";

export default function AdminEditor({ contentKey }: { contentKey: string }) {
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Placeholder.configure({
        placeholder: "Start typing here...",
      }),
    ],
    content: "",
    immediatelyRender: false,
  });

  useEffect(() => {
    async function load() {
      const content = await getContent(contentKey);
      editor?.commands.setContent(content);
    }

    if (editor) load();
  }, [editor, contentKey]);

  const handleSave = async () => {
    if (!editor) return;
    setSaving(true);

    await saveContent(contentKey, editor.getHTML());

    setSaving(false);
  };

  if (!editor) return null;

  return (
    <div style={containerStyle}>
      {/* Toolbar */}
      <div style={toolbarStyle}>
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="B"
        />
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="I"
        />
        <ToolbarButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          label="U"
        />

        <Divider />

        <ToolbarButton
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          label="H1"
        />
        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          label="H2"
        />

        <Divider />

        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="• List"
        />
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          label="1. List"
        />

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          label="Undo"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          label="Redo"
        />
      </div>

      {/* Editor */}
      <div style={editorWrapperStyle}>
        <EditorContent editor={editor} />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          ...saveButtonStyle,
          opacity: saving ? 0.6 : 1,
        }}
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

/* ========================= */
/* Reusable Toolbar Button   */
/* ========================= */

function ToolbarButton({
  onClick,
  active,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 10px",
        borderRadius: "6px",
        border: active ? "2px solid #2563eb" : "1px solid #ddd",
        backgroundColor: active ? "#eff6ff" : "white",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: "1px",
        height: "24px",
        backgroundColor: "#ddd",
        margin: "0 6px",
      }}
    />
  );
}

/* ========================= */
/* Styles                    */
/* ========================= */

const containerStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
};

const toolbarStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "6px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#f9fafb",
};

const editorWrapperStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  minHeight: "300px",
  backgroundColor: "white",
};

const saveButtonStyle = {
  alignSelf: "flex-end",
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
};
