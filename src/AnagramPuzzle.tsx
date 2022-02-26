import React from 'react';
import './AnagramPuzzle.css';

interface DragSquareProps {
  char: string;
  index: number;
  isUsed: boolean;
  onDragStart: any;
}

interface DropSquareProps {
  char: string;
  index: number;
  onDragOver: any;
  onDrop: any;
}

interface AnagramProps {
  anagram: string;
}

export function DragSquare(props: DragSquareProps) {
  function handleDragStart(ev: any) {
    console.log('DragSquare: handleDragEnter');
    ev.currentTarget.classList.add('on-drag-start');
    props.onDragStart(ev, props.index);
  }
  function handleDragEnd(ev: any) {
    console.log('DragSquare: handleDragEnd');
    // TODO: Only remove if drag was not accepted.
    ev.currentTarget.classList.remove('on-drag-start');
  }
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
  function handleDragEnter(ev: any) {
    console.log('DropSquare: handleDragEnter');
    ev.currentTarget.classList.add('on-drag-over');
  }
  function handleDragLeave(ev: any) {
    console.log('DropSquare: handleDragLeave');
    ev.currentTarget.classList.remove('on-drag-over');
  }
  function handleDragOver(ev: any) {
    // console.log('DropSquare: handleDragOver');
    props.onDragOver(ev);
  }
  function handleDrop(ev: any) {
    console.log('DropSquare: handleDrop');
    ev.currentTarget.classList.remove('on-drag-over');
    props.onDrop(ev);
  }
  return (
    <span
      className='DropSquare'
      onDragOver={(ev) => handleDragOver(ev)}
      onDragEnter={(ev) => handleDragEnter(ev)}
      onDragLeave={(ev) => handleDragLeave(ev)}
      onDrop={(ev) => handleDrop(ev)}
    >
      {props.char}
    </span>
  );
}

export default class AnagramPuzzle extends React.Component<AnagramProps> {
  //   constructor(props: any) {
  //     super(props);
  //   }

  handleDragStart = (ev: any, id: any) => {
    console.log('AnagramPuzzle: handleDragStart:', id);
    ev.dataTransfer.setData('id', id);
  };
  handleDragOver = (ev: any) => {
    // console.log('AnagramPuzzle: handleDragOver');
    ev.preventDefault();
  };
  handleDrop = (ev: any) => {
    console.log('AnagramPuzzle: handleDrop');
    ev.preventDefault();
  };

  render(): React.ReactNode {
    return (
      <div className='AnagramPuzzle'>
        <div className='puzzle'>
          {Array.from(this.props.anagram).map((char, index) => {
            return (
              <DragSquare
                key={index}
                isUsed={false}
                char={char}
                index={index}
                onDragStart={(ev: any, id: any) => this.handleDragStart(ev, id)}
              />
            );
          })}
        </div>
        <div className='solution'>
          {Array.from(this.props.anagram).map((_char, index) => {
            return (
              <DropSquare
                key={index}
                char={''}
                index={index}
                onDragOver={(ev: any) => this.handleDragOver(ev)}
                onDrop={(ev: any) => this.handleDrop(ev)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
