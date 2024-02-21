import { useState, useRef } from 'react';
import { Block } from './Block';

// insert block button + event
export function AddContentButton({ onAddContent }) {
  const [contentType, setContentType] = useState("h1");
  const [showMenu, setShowMenu] = useState(false);

  function addContent(contentType: BlockType, id: string, content: string, children: Block[] | null) {
    setShowMenu(false);
    onAddContent(
      {
        id: id,
        blockType: contentType,
        content: "new content"
      }
    );
  }

  return (
    <div className='relative min-w-12'>
    <button onClick={() => setShowMenu(!showMenu)} className='border border-blue-500 bg-blue-200 w-auto p-2'>Add Content</button>
    {showMenu &&
      <div className='absolute top-10 w-auto min-w-12 border border-black p-1 rounded bg-white'>
        <button onClick={() => addContent("h1")}>Heading 1</button>
        <button onClick={() => addContent("h2")}>Heading 2</button>
        <button onClick={() => addContent("p")}>Paragraph</button>
        <button onClick={() => addContent("img")}>Image</button>
      </div>
    }
    </div>
  );
}
