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
    <>
    <button onClick={() => setShowMenu(!showMenu)}>Add Content</button>
    {showMenu &&
      <div>
        <button onClick={() => addContent("h1")}>Heading 1</button>
        <button onClick={() => addContent("h2")}>Heading 2</button>
        <button onClick={() => addContent("p")}>Paragraph</button>
        <button onClick={() => addContent("img")}>Image</button>
      </div>
    }
    </>
  );
}
