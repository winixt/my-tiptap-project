import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import classnames from 'classnames';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';

import BoldIcon from './icons/bold';
import ItalicIcon from './icons/italic';
import UnderlineIcon from './icons/underline';
import OrderedListIcon from './icons/ordered-list';
import BulletListIcon from './icons/bullet-list';
import RedoIcon from './icons/redo'
import UndoIcon from './icons/undo'

import ColorPicker from './components/color-picker';
import HeadPicker from './components/head-picker';
import TextAlignPicker from './components/text-align-picker';

const COLORS = [
  '#000',
  'rgba(0, 0, 0, 0.9)',
  'rgba(0, 0, 0, 0.6)',
  'rgba(0, 0, 0, 0.5)',
  'rgba(0, 0, 0, 0.35)',
  'rgba(0, 0, 0, 0.2)',
  'rgba(0, 0, 0, 0.16)',
  'rgba(0, 0, 0, 0.06)',
  'rgba(0, 0, 0, 0.05)',

  '#B78B22',
  '#DBAE31',
  '#F2BD2A',
  '#FFD143',
  '#FFEF7E',
  '#FFF9D9',

  '#3153B7',
  '#5C8EE6',
  '#E0EDFF',

  '#B63B19',
  '#FE7832',
  '#FEBD83',
  '#FEEED5',

  '#1A48AB',
  '#2B7CF5',
  '#85BDF9',
  '#E4F3FF',

  '#B72736',
  '#FF5A4F',
  '#FFE9DA',

  '#56A12B',
  '#98E059',
  '#F3FCCD',

  '#191919',
  '#666666',
  '#999999',
  '#CCCCCC',
  '#5C8FE6',
  '#E7BB2C',
];

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }
  
  return (
    <div className="MenuBar">
      <HeadPicker currentLevel={editor.getAttributes('heading').level} onSelect={(level) => editor.chain().focus().toggleHeading({ level }).run() } />
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={classnames(['btn-icon', editor.isActive('bold') ? 'is-active' : ''])}
      >
        <BoldIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={classnames(['btn-icon', editor.isActive('italic') ? 'is-active' : ''])}
      >
        <ItalicIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleUnderline()
            .run()
        }
        className={classnames(['btn-icon', editor.isActive('underline') ? 'is-active' : ''])}
      >
        <UnderlineIcon />
      </button>
      <ColorPicker colors={COLORS} onSelect={(color) => editor.chain().focus().setColor(color).run()} />
      <ColorPicker colors={COLORS} type="bg" onSelect={(color) => editor.chain().focus().toggleHighlight({ color }).run()} />
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={classnames(['btn-icon', editor.isActive('orderedList') ? 'is-active' : ''])}
      >
        <OrderedListIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={classnames(['btn-icon', editor.isActive('bulletList') ? 'is-active' : ''])}
      >
        <BulletListIcon />
      </button>
      <TextAlignPicker currentAlign={['left', 'right', 'center', 'justify'].find(align => editor.isActive({textAlign: align}))} onSelect={(align) => editor.chain().focus().setTextAlign(align).run() }  />
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className="btn-icon"
      >
        <UndoIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        className="btn-icon"
      >
        <RedoIcon />
      </button>
    </div>
  )
}

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, Color, Highlight.configure({ multicolor: true }), TextAlign.configure({
      types: ['heading', 'paragraph'],
    })],
    content: "<p>Hello World! 🌎️</p>",
  });

  const exportContent = () => {
    const html = editor.getHTML();
    console.log(html);
  }

  return <div>
    <button onClick={exportContent}>export</button>
  <MenuBar editor={editor} />
  <EditorContent editor={editor} />
  </div>
};

export default Tiptap;
