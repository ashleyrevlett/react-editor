import { useState, useRef, useCallback } from 'react';
import { Block } from '../components/Block';
import { AddContentButton } from '../components/AddContentButton';
import { sampleData } from '../data';

export function Editor() {
  const [pageContent, setPageContent] = useState(sampleData);


  function handleAddContent(newContent: Block){
    console.log(pageContent.length);
    newContent.id = pageContent.length + 1;

    setPageContent([...pageContent, newContent]);
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

      console.log("Dropped on ", dropTarget.id);
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
      <ul class="mb-4">
        <li className="bb-block hoverable" id="startingblock"></li>
        {pageContent.map((block, idx) =>
        <li className={getBlockClass(block.id)} key={idx} id={block.id}>
          <button class="button" onMouseDown={handleMouseDown}>⋮⋮</button>
          <Block handleBlockChange={handleBlockChange} {...block} />
        </li>
        )}
      </ul>
      <AddContentButton id={pageContent.length + 1} onAddContent={handleAddContent} />
    </>
  )
}
