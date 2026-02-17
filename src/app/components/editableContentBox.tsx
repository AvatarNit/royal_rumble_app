"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";

import { useEffect, useRef, useState } from "react";
import { saveContent, getContent } from "../../actions/other";
import InfoBox from "../components/infoBox";

interface Props {
  title: string;
  contentKey: string;
}

export default function EditableContentBox({ title, contentKey }: Props) {
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,

      TextStyle,

      Color,

      Highlight.configure({ multicolor: true }),

      Placeholder.configure({
        placeholder: "Start typing answer here...",
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: `
          min-height:150px;
          width:100%;
          outline:none;
          padding:2px;
          box-sizing:border-box;
        `,
      },
    },
  });

  useEffect(() => {
    async function load() {
      const content = await getContent(contentKey);
      editor?.commands.setContent(content || "");
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
    <section style={{ marginBottom: "20px" }}>
      <InfoBox headerText={title}>
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

          {/* TEXT COLOR ICON BUTTON */}
          <ColorButton
            icon="A"
            underline
            onColor={(c) =>
              editor.chain().focus().setMark("textStyle", { color: c }).run()
            }
          />

          {/* HIGHLIGHT ICON BUTTON */}
          <ColorButton
            icon="🖍"
            onColor={(c) =>
              editor.chain().focus().toggleHighlight({ color: c }).run()
            }
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

        <div style={editorWrapperStyle}>
          <EditorContent editor={editor} />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          style={{ ...saveButtonStyle, opacity: saving ? 0.6 : 1 }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </InfoBox>
    </section>
  );
}

/* ================================================= */
/*  Color Button */
/* ================================================= */

function ColorButton({
  icon,
  underline,
  onColor,
}: {
  icon: string;
  underline?: boolean;
  onColor: (color: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState("#000000");

  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
        inputRef.current?.click();
      }}
      style={{
        position: "relative",
        padding: "6px 10px",
        border: "1px solid #ddd",
        borderRadius: 6,
        cursor: "pointer",
        background: "white",
        fontWeight: 700,
        userSelect: "none",
      }}
    >
      {icon}

      {underline && (
        <div
          style={{
            height: 3,
            background: color,
            marginTop: 2,
            borderRadius: 2,
          }}
        />
      )}

      <input
        ref={inputRef}
        type="color"
        value={color}
        onChange={(e) => {
          const newColor = e.target.value;
          setColor(newColor);
          onColor(newColor);
        }}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* Reusable UI bits */

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
        borderRadius: 6,
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
        width: 1,
        height: 24,
        background: "#ddd",
        margin: "0 6px",
      }}
    />
  );
}

/* Styles */

const toolbarStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "6px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#f9fafb",
  marginBottom: "10px",
};

const editorWrapperStyle = {
  padding: "10px",
  backgroundColor: "white",
  borderRadius: "6px",
  border: "1px solid #ddd",
};

const saveButtonStyle = {
  marginTop: "10px",
  padding: "8px 16px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
};
