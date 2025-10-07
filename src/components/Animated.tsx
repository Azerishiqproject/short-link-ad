'use client';

import { motion, MotionProps } from 'framer-motion';
import React from 'react';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
} & MotionProps;

export function Reveal({ children, delay = 0, className, ...rest }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type HoverScaleProps = {
  children: React.ReactNode;
  scale?: number;
  className?: string;
} & MotionProps;

export function HoverScale({ children, scale = 1.03, className, ...rest }: HoverScaleProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}







