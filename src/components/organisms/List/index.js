import React from 'react';
import styled from 'styled-components';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';

import { colors } from 'theme';

const InfiniteList = styled.div`
  > div > div::-webkit-scrollbar-thumb {
      background-color: ${colors.DARK_BLUE};
      border-bottom-right-radius: 6px;
      border-bottom-left-radius: 6px;
  }
  > div > div::-webkit-scrollbar-track
  {
      border: 1px solid transparent;
      background-color: transparent;
  }
  > div > div::-webkit-scrollbar
  {
      width: 0.6rem;
      background-color: transparent;
  }
  div:focus {
    outline: none;
  }
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 0 2.163rem 0 1.563rem;
`;

class VirtualList extends React.Component {
  constructor(props) {
    super(props);
    
    this.cache = new CellMeasurerCache({ defaultHeight: 80, fixedWidth: true});
    this.list = React.createRef();
  }
  
  componentDidUpdate() {
    this.cache.clearAll();
    if (this.list) {
      this.list.recomputeRowHeights();
      this.list.scrollToRow(this.props.length);
    }
  }
  
  onResize = () => {
    this.cache.clearAll();
  };
  
  render() {
    const { length, header, children } = this.props;
    
    return (
      <React.Fragment>
        { header && <Header>{header}</Header> }
        <InfiniteList>
          <AutoSizer
            onResize={this.onResize}
          >
            {({ width, height }) => (
              <List
                height={height}
                ref={(element) => {
                  this.list = element;
                }}
                rowCount={length}
                rowHeight={this.cache.rowHeight}
                overscanRowCount={3}
                rowRenderer={({ index, isScrolling, parent, key, style }) => (
                  <CellMeasurer
                    cache={this.cache}
                    columnIndex={0}
                    key={key}
                    rowIndex={index}
                    parent={parent}
                  >
                    {children(index, isScrolling, style)}
                  </CellMeasurer>)}
                width={width}
              />
            )}
          </AutoSizer>
        </InfiniteList>
      </React.Fragment>
    );
  }
}

export default VirtualList;
