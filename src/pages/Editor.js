import { useState, useRef } from 'react';
import { Block } from '../components/Block';
import { AddContentButton } from '../components/AddContentButton';
import { sampleData } from '../data';

export function Editor() {
  const [pageContent, setPageContent] = useState(sampleData);


  function handleAddContent(newContent: Block){
    console.log(pageContent.length);

    setPageContent([...pageContent, newContent]);
  }

  const handleBlockChange = (props) => {
    const newBlock = { ...props, content: props.newContent };
    setPageContent(pageContent.map(block => block.id === props.id ? newBlock : block));
  };

  return (
    <>
      <ul>{pageContent.map((block, idx) =>
        <Block key={idx} handleBlockChange={handleBlockChange} {...block} />
      )}</ul>
      <AddContentButton id={pageContent.length + 1} onAddContent={handleAddContent} />
    </>
  )
}
