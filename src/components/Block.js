import { useState, useRef, useEffect, useCallback } from 'react';

type BlockType = "h1" | "h2" | "p" | "img";

type TBlock = {
  id: string;
  blockType: BlockType;
  content: String;
  children: Block[] | null;
};

// a doc tree item listing + its edit controls
export function Block({handleBlockChange, ...blockContent }) {
  const editableContentRef = useRef(null);

  const handleTextFieldChange = (e) => {
    handleBlockChange({ ...blockContent, newContent: e.currentTarget.textContent });
  }

  const handleKeyDown = (e) => {
    // if content is blank, and backspace is pressed, delete this block
    if (e.key === "Backspace" && editableContentRef.current.innerHTML === "") {
      handleBlockChange({ ...blockContent, delete: true });
    }
  }

  return (
    <>
      <div className={`${blockContent.blockType} w-full hover:bg-blue-200"`}
        contentEditable="true"
        suppressContentEditableWarning
        onBlur={handleTextFieldChange}
        onKeyDown={handleKeyDown}
        dataplaceholder="Type something..."
        ref={editableContentRef}
      >
        {blockContent.content}
      </div>
    </>
  )
}
