import { useState, useRef } from 'react';
import { Block } from './Block';

// insert block button + event
export function AddContentButton({ onAddContent, indexPosition }) {
  const [contentType, setContentType] = useState("h1");
  const [showMenu, setShowMenu] = useState(false);

  function addContent(contentType: BlockType) {
    setShowMenu(false);
    onAddContent(
      indexPosition,
      {
        blockType: contentType,
        content: "new content",
      }
    );
  }

  return (
    <div className='relative'>
    <button onClick={() => setShowMenu(!showMenu)} className='tool-button p-2 h-7'>
      <svg height="12px" width="12px" fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.402 45.402"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path> </g> </g></svg>
    </button>
    {showMenu &&
      <div className='absolute z-10 top-10 w-auto min-w-12 border border-black p-1 rounded bg-white'>
        <button className="list-item" onClick={() => addContent("h1")}>Heading 1</button>
        <button className="list-item" onClick={() => addContent("h2")}>Heading 2</button>
        <button className="list-item" onClick={() => addContent("p")}>Paragraph</button>
        <button className="list-item" onClick={() => addContent("img")}>Image</button>
      </div>
    }
    </div>
  );
}
