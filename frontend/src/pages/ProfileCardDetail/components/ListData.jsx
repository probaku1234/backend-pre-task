import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import SingleData from './SingleData';

import './ListData.scss';

const ListData = (props) => {
  const {
    value,
    structures,
    onSaveValue,
  } = props;

  return structures.map(({ label, dataKey, childrenStructures }) => {
    const childrenValues = value[dataKey];
    return (
      <div
        key={dataKey}
        className="list-data"
      >
        <div className="list-data-header">
          <h3>{label}</h3>
        </div>
        <div className="list-items">
          {childrenValues.map((childrenValue, index) => (
            <SingleData
              key={index}
              isListItem
              value={childrenValue}
              structures={childrenStructures}
              onSaveValue={onSaveValue}
              index={index}
            />
          ))}
          <Button
            className="add-new-list-item"
            block
            onClick={() => onSaveValue({}, dataKey, childrenValues.length)}
          >
            새로운 항목 추가하기
          </Button>
        </div>
      </div>
    );
  });
};

ListData.propTypes = {
  value: PropTypes.shape({
    [PropTypes.string]: PropTypes.string,
  }),
  structures: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    dataKey: PropTypes.string,
    type: PropTypes.oneOf(['text', 'phone', 'email', 'date', 'list']),
  })),
  onSaveValue:PropTypes.func,
};

export default ListData;