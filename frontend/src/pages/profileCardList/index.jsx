import React, { useEffect, useCallback } from 'react';

import useAxios from '../../context/hooks/useAxios'

import './index.scss';

const ProfileCardList = () => {
  const { request } = useAxios();

  const fetchProfileList = useCallback(async () => {
    const response = await request({
      method: 'GET',
      url: '/api/profile-card',
    });

    console.log('[response]', response);
  }, []);

  useEffect(() => {
    fetchProfileList();
  }, []);

  return (
    <div className="profile-card-list">
      <h1>연락처 목록</h1>
      <p>
        <a
          href="https://jober.notion.site/fa8af8dfd86640e9aa7d375e8f91868d"
          target="_blank"
        >
          사전과제 페이지
        </a>
        에 안내된 내용대로 연락처 목록 및 연락처 상세페이지를 구현해주세요.
      </p>
    </div>
  );
};

export default ProfileCardList;
