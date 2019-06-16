import { createElement as h } from 'react';
import styled from 'styled-components';

const defaultVariants = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p'
};

export const withDynamicTag = (Component, variants = defaultVariants) => {
  const bucket = Object.create(null);
  
  const DynamicTag = props => {
    const { tag } = props;
    
    if (typeof tag !== 'string' || !styled.hasOwnProperty(tag)) {
      return h(Component, props);
    }
    
    if (bucket[tag] === undefined) {
      bucket[tag] = Component.withComponent(tag);
    }
    
    return h(bucket[tag], props);
  };
  
  const name = Component.displayName || Component.constructor.name;
  
  if (name) {
    DynamicTag.displayName = `DynamicTag(${name})`;
  }
  
  return DynamicTag;
};
