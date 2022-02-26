import KUTE, { tweenProps } from 'kute.js';
import React from 'react';
import { useState } from 'react';
import './Header.css';

class Header extends React.Component {
  pathRef1: React.RefObject<SVGPathElement>;
  pathRef2: React.RefObject<SVGPathElement>;
  constructor(props: any) {
    super(props);
    this.pathRef1 = React.createRef();
    this.pathRef2 = React.createRef();
  }

  componentDidMount() {
    KUTE.fromTo(
      this.pathRef1.current as Element,
      // @ts-ignore
      { path: this.pathRef1.current },
      { path: this.pathRef2.current },
      { repeat: 9999, duration: 3000, yoyo: true }
    ).start(null);
  }

  render(): React.ReactNode {
    return (
      <header className='Header' aria-label='Logo Odek AS'>
        <div className='header-content'>
          <button
            className='logo-button button-but-not button-start-game'
            type='button'
            aria-label='Klikk for å prøve et lite spill'
          ></button>
        </div>
        <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 60' preserveAspectRatio='none'>
          <title>Curves for layout</title>
          <path
            d='M 1220,29.73833 V 0 H -20 V 37.875952 C 26.020383,54.023649 79.557403,60.77598 130.12926,59.929601 210.61218,58.582625 296.85628,7.822943 367.7482,16.856665 520.67612,36.344195 446.65676,99.056879 696.38459,16.929698 752.27272,-1.4500497 815.42233,86.987906 945.26604,35.556151 1043.7762,-3.4642067 1051.526,48.618078 1104.7882,46.588413 1143.5717,45.110489 1159.2032,40.71835 1220,29.73833 Z'
            className='shape-fill'
            ref={this.pathRef1}
          />
          <path
            d='M 1220,35.685582 V 0 H -20 c 0,0 -6.567187,21.72741 0,27.959071 C 20.808323,66.682445 88.892661,12.142715 143.72024,9.5777427 274.12385,3.4771348 295.4616,120.86629 535.25613,16.762442 c 88.71212,-38.513278 212.51012,84.860368 318.32386,9.155378 66.20744,-47.368453 162.61541,33.111422 244.77901,31.157073 41.0956,-0.977505 101.4862,0.005 121.641,-21.389311 z'
            className='shape-fill'
            ref={this.pathRef2}
            visibility={'hidden'}
          />
        </svg>
      </header>
    );
  }
}

export default Header;
