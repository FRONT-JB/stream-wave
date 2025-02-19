'use client';

import { CSSProperties } from 'react';
import GridLayout from 'react-grid-layout';

const layout = [
  { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
  { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  { i: 'c', x: 4, y: 0, w: 1, h: 2 },
];

const style: CSSProperties = {
  userSelect: 'none',
  border: '1px solid #ccc',
};

export default function GridLayoutClient() {
  return (
    <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
      <div style={style} key="a">
        a
      </div>
      <div style={style} key="b">
        b
      </div>
      <div style={style} key="c">
        c
      </div>
    </GridLayout>
  );
}
