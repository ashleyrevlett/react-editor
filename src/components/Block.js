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
  /*
  show edit form, update state from text edits
  */
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  function toggleEditing() {
    setIsEditing(!isEditing);
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }

  const onTextFieldChange = (e) => {
    handleBlockChange({ ...blockContent, newContent: e.target.value });
  }

  function onDeleteBlock() {
    handleBlockChange({ ...blockContent, delete: true });
  }

  return (
    <>
      <button class="button" onClick={onDeleteBlock}>&#xe020;</button>
      <div className={`${blockContent.blockType}` + " block text-3xl font-bold "}>
        {isEditing ?
          <input ref={inputRef} value={blockContent.content} onChange={onTextFieldChange} />
          :
          <button onClick={toggleEditing}>{blockContent.content}</button>
        }
      </div>
    </>
  )
}
