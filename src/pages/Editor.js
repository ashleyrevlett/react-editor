import { useState, useRef, useCallback } from 'react';
import { Block } from '../components/Block';
import { AddContentButton } from '../components/AddContentButton';
import { sampleData } from '../data';

export function Editor() {
  const [pageContent, setPageContent] = useState(sampleData);

  function handleAddContent(indexPosition: Number, newContent: Block){
    newContent.id = pageContent.length + 1;
    // insert newContent into pageContent at indexPosition
    const newPageContent = [...pageContent];
    newPageContent.splice(indexPosition, 0, newContent);
    setPageContent(newPageContent);
  }

  const handleBlockChange = (props) => {
    if (props.delete) {
      setPageContent(pageContent.filter(block => block.id !== props.id))
    } else {
      const newBlock = { ...props, content: props.newContent };
      setPageContent(pageContent.map(block => block.id === props.id ? newBlock : block));
    }
  };

  /*
  drag and drop
  */
  const [isDragging, _setIsDragging] = useState(null);
  const isDraggingRef = useRef(isDragging);
  function setIsDragging(val) {
    isDraggingRef.current = val;
    _setIsDragging(val);
  }

  const handleMouseDown = (e) => {
    const blockId = e.currentTarget.closest('.bb-block').id;
    console.log("mouse down on id: ", blockId);
    setIsDragging(blockId);
    document.addEventListener( "mouseup", handleMouseUp, { once: true });
  }

  const handleMouseUp = (e) => {
    // need to get the id of the closest .block element we dropped on
    const dropTarget = document.elementFromPoint(e.clientX, e.clientY).closest('.bb-block');
    if (dropTarget) {
      const dragBlock = pageContent.find(block => block.id == isDraggingRef.current);
      const dragIndex = pageContent.indexOf(dragBlock);
      const newPageContent = [...pageContent];
      newPageContent.splice(dragIndex, 1);

      if (dropTarget.id === "startingblock") {
        newPageContent.splice(0, 0, dragBlock);
      } else {
        const dropBlock = pageContent.find(block => block.id == dropTarget.id);
        const dropIndex = pageContent.indexOf(dropBlock);
        newPageContent.splice(dropIndex, 0, dragBlock);
      }
      setPageContent(newPageContent);
    }
    setIsDragging(null);
  }

  function getBlockClass(blockId) {
    let classList = "bb-block";
    if (isDraggingRef.current == blockId) {
      classList += " opacity-50";
    } else if (isDraggingRef.current !== null) {
      classList += " hoverable";
    }
    return classList;
  }

  return (
    <>
      <ul className="mb-4">
        <li className="bb-block hoverable" id="startingblock"></li>
        {pageContent.map((block, idx) =>
          <li className={getBlockClass(block.id)} key={idx} id={block.id}>
            <AddContentButton onAddContent={handleAddContent} indexPosition={idx} />
            <button className="tool-button h-7" onClick={(e) => handleBlockChange({ ...block, delete: true })}>
                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.10002 5H3C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H4.06055L4.88474 20.1871C4.98356 21.7682 6.29471 23 7.8789 23H16.1211C17.7053 23 19.0164 21.7682 19.1153 20.1871L19.9395 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H19.0073C19.0018 4.99995 18.9963 4.99995 18.9908 5H16.9C16.4367 2.71776 14.419 1 12 1C9.58104 1 7.56329 2.71776 7.10002 5ZM9.17071 5H14.8293C14.4175 3.83481 13.3062 3 12 3C10.6938 3 9.58254 3.83481 9.17071 5ZM17.9355 7H6.06445L6.88085 20.0624C6.91379 20.5894 7.35084 21 7.8789 21H16.1211C16.6492 21 17.0862 20.5894 17.1192 20.0624L17.9355 7ZM14.279 10.0097C14.83 10.0483 15.2454 10.5261 15.2068 11.0771L14.7883 17.0624C14.7498 17.6134 14.2719 18.0288 13.721 17.9903C13.17 17.9517 12.7546 17.4739 12.7932 16.9229L13.2117 10.9376C13.2502 10.3866 13.7281 9.97122 14.279 10.0097ZM9.721 10.0098C10.2719 9.97125 10.7498 10.3866 10.7883 10.9376L11.2069 16.923C11.2454 17.4739 10.83 17.9518 10.2791 17.9903C9.72811 18.0288 9.25026 17.6134 9.21173 17.0625L8.79319 11.0771C8.75467 10.5262 9.17006 10.0483 9.721 10.0098Z" fill="#0F1729"/>
                </svg>
            </button>
            <button className="tool-button mr-1" onMouseDown={handleMouseDown}>⋮⋮</button>
            <Block handleBlockChange={handleBlockChange} {...block} />
          </li>
        )}
      </ul>
      <AddContentButton indexPosition={pageContent.length + 1} onAddContent={handleAddContent} />
    </>
  )
}
