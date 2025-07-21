'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const SmoothScroll = ({ children }: Props) => {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
