import { useState, useRef } from 'react';

type BlockType = "h1" | "h2" | "p" | "img";

type TBlock = {
  id: string;
  blockType: BlockType;
  content: String;
  children: Block[] | null;
};

// a doc tree item listing + its edit controls
export function Block({handleBlockChange, ...blockContent }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const onTextFieldChange = (e) => {
    handleBlockChange({ ...blockContent, newContent: e.target.value });
  }

  function toggleEditing() {
    setIsEditing(!isEditing);
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }

  return (
    <div className={`${blockContent.blockType}` + " block"}>
      {isEditing ?
        <input ref={inputRef} value={blockContent.content} onChange={onTextFieldChange} />
        :
        <button onClick={toggleEditing}>{blockContent.content}</button>
      }
    </div>
  )
}
