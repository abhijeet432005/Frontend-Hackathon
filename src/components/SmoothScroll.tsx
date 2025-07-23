'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const SmoothScroll = ({ children }: Props) => {
  console.log('🚀 Lenis SmoothScroll mounted!');
  const LenisComponent = ReactLenis as unknown as React.FC<{ children: ReactNode; root?: boolean }>;

  return (
    <LenisComponent root>
      {children}
    </LenisComponent>
  );
};

export default SmoothScroll;
