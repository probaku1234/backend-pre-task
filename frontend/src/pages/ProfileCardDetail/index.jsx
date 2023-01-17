import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

import useAxios from '../../context/hooks/useAxios';

import SingleData from './components/SingleData';
import ListData from './components/ListData';

import './index.scss';

const ProfileCardDetail = (props) => {
  const { profileCardId } = props.match.params;

  const [profileDetail, setProfileDetail] = useState({name: 'test'});

  const { request } = useAxios();
  const history = useHistory();

  const fetchProfileCardDetail = useCallback(async (fetchTargetId) => {
    // TODO: Change your api
    const response = await request({
      method: 'GET',
      url: '/api/profile-card/detail',
      params: {
        id: fetchTargetId
      }
    });
    if (!response || !response.profileCardDetail) return;

    setProfileDetail(response.profileCardDetail);
  }, []);

  useEffect(() => {
    fetchProfileCardDetail(profileCardId);
  }, [profileCardId]);

  const deleteProfileCard = useCallback(async () => {
    // TODO: Change your api
    const response = await request({
      method: 'POST',
      url: '/api/profile-card/delete',
      data: {
        profileCardId
      }
    });
    if (!response) return;

    history.push('/');
  }, [profileCardId]);

  const singleDataProps = useMemo(() => {
    if (!profileDetail || !profileDetail.valueStructures) return {};

    const { value, valueStructures: allDataStructures } = profileDetail;
    const singleDataStructures = allDataStructures.filter(({ type, parentDataKey }) => type !== 'list' && !parentDataKey);
    return {
      value,
      structures: singleDataStructures,
    };
  }, [profileDetail]);

  const listDataProps = useMemo(() => {
    if (!profileDetail || !profileDetail.valueStructures) return {};

    const { value, valueStructures: allDataStructures } = profileDetail;
    const listStructures = allDataStructures.filter(({ type }) => type === 'list');
    const listWithChildrenStructures = listStructures.map((listStructure) => {
      const { dataKey: targetDataKey } = listStructure;
      return {
        ...listStructure,
        childrenStructures: allDataStructures.filter(({ parentDataKey }) => parentDataKey === targetDataKey),
      };
    });
    return {
      value,
      structures: listWithChildrenStructures,
    };
  }, [profileDetail]);

  const onSaveValue = useCallback(async (newValue, parentDataKey, itemIndex) => {
    // TODO: Change your api
    const response = await request({
      method: 'POST',
      url: '/api/profile-card/update',
      data: {
        profileCardId,
        newValue,
        parentDataKey,
        itemIndex
      }
    });
    if (!response) return;

    fetchProfileCardDetail(profileCardId);
  }, [profileCardId]);

  const renderSingleData = () => {
    if (Object.keys(singleDataProps).length === 0) {
      return <></>
    } else {
      
      return <>
        <SingleData
        {...singleDataProps}
        onSaveValue={onSaveValue}
      />
      </>
    }
  }
  
  const renderListData = () => {
    if (Object.keys(listDataProps).length === 0) {
      return <></>
    } else {
      return <>
        <ListData
        {...listDataProps}
        onSaveValue={onSaveValue}
      />
      </>
    }
  }

  return (
    <div className="profile-card-detail">
      <div className="header">
        <h1>{profileDetail.name}</h1>
        <Button
          type="danger"
          onClick={deleteProfileCard}
        >
          연락처 삭제
        </Button>
      </div>
      <div className="data-section">
        {renderSingleData()}
        {renderListData()}
      </div>
    </div>
  );
};

ProfileCardDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      profileCardId: PropTypes.string,
    }),
  }),
};

export default ProfileCardDetail;
