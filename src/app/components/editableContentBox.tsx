"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

import { useEffect, useRef, useState } from "react";
import { saveContent, getContent } from "../../actions/other";
import InfoBox from "../components/infoBox";

import "bootstrap-icons/font/bootstrap-icons.css";

/* ========================= */
/*  FONT SIZE EXTENSION */
/* ========================= */

const FontSize = Extension.create({
  name: "fontSize",

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
});

/* ========================= */
/*  COMPONENT */
/* ========================= */

interface Props {
  title: string;
  contentKey: string;
}

export default function EditableContentBox({ title, contentKey }: Props) {
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Underline,
      Link,
      TextStyle,
      FontSize,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["paragraph"],
      }),
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
          {/* Bold / Italic / Underline */}
          <ToolbarButton
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            icon="bi-type-bold"
          />
          <ToolbarButton
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            icon="bi-type-italic"
          />
          <ToolbarButton
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            icon="bi-type-underline"
          />

          <Divider />

          {/* FONT SIZE DROPDOWN */}
          <FontSizeDropdown editor={editor} />

          <Divider />

          {/* Lists */}
          <ToolbarButton
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            icon="bi-list-ul"
          />
          <ToolbarButton
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            icon="bi-list-ol"
          />

          <Divider />

          {/* Alignment */}
          <ToolbarButton
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            icon="bi-text-left"
          />
          <ToolbarButton
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            icon="bi-text-center"
          />
          <ToolbarButton
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            icon="bi-text-right"
          />
          <ToolbarButton
            active={editor.isActive({ textAlign: "justify" })}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            icon="bi-justify"
          />

          <Divider />

          {/* Text Color */}
          <ColorButton
            icon="bi-palette"
            onColor={(c) =>
              editor.chain().focus().setMark("textStyle", { color: c }).run()
            }
          />

          {/* Highlight */}
          <ColorButton
            icon="bi-highlighter"
            onColor={(c) =>
              editor.chain().focus().toggleHighlight({ color: c }).run()
            }
          />

          <Divider />

          {/* Undo / Redo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            icon="bi-arrow-counterclockwise"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            icon="bi-arrow-clockwise"
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

/* ========================= */
/* FONT SIZE DROPDOWN */
/* ========================= */

function FontSizeDropdown({ editor }: { editor: any }) {
  const sizes = [12, 14, 16, 18, 20, 24, 28, 32];

  return (
    <select
      onChange={(e) => {
        const size = e.target.value;
        if (!size) return;

        editor
          .chain()
          .focus()
          .setMark("textStyle", { fontSize: `${size}px` })
          .run();
      }}
      style={dropdownStyle}
      defaultValue=""
    >
      <option value="">Size</option>
      {sizes.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}

/* ========================= */
/* COLOR BUTTON */
/* ========================= */

function ColorButton({
  icon,
  onColor,
}: {
  icon: string;
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
      style={iconButtonStyle}
    >
      <i className={`bi ${icon}`} />

      <input
        ref={inputRef}
        type="color"
        value={color}
        onChange={(e) => {
          const newColor = e.target.value;
          setColor(newColor);
          onColor(newColor);
        }}
        style={{ position: "absolute", opacity: 0 }}
      />
    </div>
  );
}

/* ========================= */
/* TOOLBAR BUTTON */
/* ========================= */

function ToolbarButton({
  onClick,
  active,
  icon,
}: {
  onClick: () => void;
  active?: boolean;
  icon: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        ...iconButtonStyle,
        border: active ? "2px solid #2563eb" : "1px solid #ddd",
        backgroundColor: active ? "#eff6ff" : "white",
      }}
    >
      <i className={`bi ${icon}`} />
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

/* ========================= */
/* STYLES */
/* ========================= */

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

const dropdownStyle = {
  padding: "6px",
  borderRadius: 6,
  border: "1px solid #ddd",
  cursor: "pointer",
};

const iconButtonStyle: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 6,
  border: "1px solid #ddd",
  backgroundColor: "white",
  cursor: "pointer",
  position: "relative",
};
