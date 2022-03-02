import { useState } from 'react';
import './AnagramPuzzle.css';

// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
// https://mdn.github.io/dom-examples/drag-and-drop/copy-move-DataTransfer.html
// https://github.com/rajeshpillai/youtube-react-components/blob/master/src/AppDragDropDemo.js
// view-source:https://mdn.github.io/dom-examples/drag-and-drop/copy-move-DataTransfer.html
// https://github.com/timruffles/mobile-drag-drop

interface DragSquareProps {
  char: string;
  index: number;
  isUsed: boolean;
  onDragStart: any;
}

interface DropSquareProps {
  char: string;
  index: number;
  isCorrect: boolean;
  onDragOver: any;
  onDrop: any;
}

interface AnagramProps {
  anagram: string;
  solution: string;
}

export function DragSquare(props: DragSquareProps) {
  const handleDragStart = (ev: any) => {
    // console.log('DragSquare: handleDragEnter');
    ev.currentTarget.classList.add('on-drag-start');
    props.onDragStart(ev, props.index);
  };

  const handleDragEnd = (ev: any) => {
    // console.log('DragSquare: handleDragEnd');
    if (!props.isUsed) {
      ev.currentTarget.classList.remove('on-drag-start');
    }
  };

  return (
    <span
      className={`DragSquare ${props.isUsed ? 'on-drag-start' : ''}`}
      draggable={!props.isUsed}
      onDragStart={(ev) => handleDragStart(ev)}
      onDragEnd={(ev) => handleDragEnd(ev)}
    >
      {props.char}
    </span>
  );
}

export function DropSquare(props: DropSquareProps) {
  const handleDragEnter = (ev: any) => {
    // console.log('DropSquare: handleDragEnter');
    ev.currentTarget.classList.add('on-drag-over');
    // https://github.com/timruffles/mobile-drag-drop
    ev.preventDefault();
  };

  const handleDragLeave = (ev: any) => {
    // console.log('DropSquare: handleDragLeave');
    ev.currentTarget.classList.remove('on-drag-over');
  };

  const handleDragOver = (ev: any) => {
    // console.log('DropSquare: handleDragOver');
    props.onDragOver(ev);
  };

  const handleDrop = (ev: any) => {
    // console.log('DropSquare: handleDrop', props.index);
    ev.currentTarget.classList.remove('on-drag-over');
    props.onDrop(ev, props.index);
  };

  let positionOkClassName = '';
  if (props.isCorrect !== null) {
    positionOkClassName = props.isCorrect ? ' correct-position' : ' wrong-position';
  }

  return (
    <span
      className={`DropSquare${positionOkClassName}`}
      onDragOver={(ev) => handleDragOver(ev)}
      onDragEnter={(ev) => handleDragEnter(ev)}
      onDragLeave={(ev) => handleDragLeave(ev)}
      onDrop={(ev) => handleDrop(ev)}
    >
      {props.char}
    </span>
  );
}

export function AnagramPuzzle(props: AnagramProps) {
  //   constructor(props: any) {
  //     super(props);
  //   }

  const [anagramLetters, setAnargamLetters] = useState(Array.from(props.anagram));
  const [solutionLetters, setSolutionLetters] = useState(Array(props.solution.length).fill(''));

  const reset = () => {
    setAnargamLetters(Array.from(props.anagram));
    setSolutionLetters(Array(props.solution.length).fill(''));
  };

  const handleDragStart = (ev: any, index: number) => {
    // console.log('AnagramPuzzle: handleDragStart:', index);
    // If using 0, the mobile polyfil treats it as empty string.
    ev.dataTransfer.setData('index', 'i_' + index);
  };

  const handleDragOver = (ev: any) => {
    // console.log('AnagramPuzzle: handleDragOver');
    ev.preventDefault();
  };

  const handleDrop = (ev: any, targetIndex: number) => {
    // console.log('AnagramPuzzle: handleDrop');
    var sourceIndex = ev.dataTransfer.getData('index').replace('i_', '');
    // console.log('AnagramPuzzle: ', sourceIndex, targetIndex);
    const tempSolutionLetters = [...solutionLetters];
    tempSolutionLetters[targetIndex] = anagramLetters[sourceIndex];
    setSolutionLetters(tempSolutionLetters);
    ev.preventDefault();
  };
  const handleDragEnd = (ev: any, index: number) => {
    console.log('AnagramPuzzle: handleDragEnd', index);
    const tempSolutionLetters = [...solutionLetters];
    tempSolutionLetters[index] = '';
    setSolutionLetters(tempSolutionLetters);
    ev.preventDefault();
  };

  const isFinished = !solutionLetters.includes('');
  const isSolutionCorrect: boolean | null = solutionLetters.includes('') ? null : solutionLetters.join('') === props.solution;

  const isCharacterCorrect = (char: string, index: number) => {
    if (!isFinished) {
      return null;
    }
    return props.solution.charAt(index) === char;
  };

  const description = (isSolutionCorrect: boolean | null) => {
    if (isSolutionCorrect === null) {
      return <div></div>;
    }
    if (isSolutionCorrect === true) {
      return <div>Oh yeah!</div>;
    }
    if (isSolutionCorrect === false) {
      return (
        <div>
          Ikke helt riktig det der.{' '}
          <button className='button-but-not button-as-link' onClick={() => reset()}>
            Prøv igjen!
          </button>
        </div>
      );
    }
  };

  return (
    <div className='AnagramPuzzle'>
      <div className='puzzle'>
        {anagramLetters.map((char, index) => {
          return (
            <DragSquare
              key={index}
              isUsed={solutionLetters.includes(char)}
              char={char}
              index={index}
              onDragStart={(ev: any, index: number) => handleDragStart(ev, index)}
            />
          );
        })}
      </div>
      <div className='solution'>
        {solutionLetters.map((char, index) => {
          return (
            <DropSquare
              key={index}
              char={char}
              index={index}
              isCorrect={isCharacterCorrect(char, index)}
              onDragOver={(ev: any) => handleDragOver(ev)}
              onDrop={(ev: any) => handleDrop(ev, index)}
            />
          );
        })}
      </div>
      <div className='description'>{description(isSolutionCorrect)}</div>
    </div>
  );
}
