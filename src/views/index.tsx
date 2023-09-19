/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '@/components/loading';
import { updateRedux } from '@/ducks/common';
import { $getState, $dispatch } from '@/ducks/main';
import { request } from '@/utils/request';
import { IRes } from '@/@types/common';
import Style from './index.module.less';

console.log('get redux data => ', $getState().common.redux);

const Home = ({ redux }: { redux: string }) => {
  console.log('redux => ', redux);

  useEffect(() => {
    // console.log('Object.fromEntries', Object.fromEntries);
    $dispatch(updateRedux('redux update'));
    request('https://api.zhoushoujian.com').then((res: IRes<{ apiCount: string; date: string }>) => {
      console.log('res', res);
    });
  }, []);

  return (
    <div className={Style.testContainer}>
      <div className={Style.content}>
        <div className={Style.calculator}>
          <div className={Style.blueball}>
            <div className={Style.blueball1}></div>
            <div className={Style.blueball2}></div>
            <Loading text='Click me' />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { common: { redux: string } }) => {
  return {
    redux: state.common.redux,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
