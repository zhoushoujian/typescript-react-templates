import React, { useEffect } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import Loading from '@/components/loading';
import { updateRedux } from '@/ducks/common';
import { $getState, $dispatch } from '@/ducks/main';

console.log('get redux data => ', $getState().common.redux);

const Test = ({ redux }) => {
  console.log('redux => ', redux);

  useEffect(() => {
    // console.log("Object.fromEntries", Object.fromEntries)
    Loadable.preloadAll();
    $dispatch(updateRedux('redux update'));
  }, []);

  return <Loading text='Put your text here' />;
};

const mapStateToProps = state => {
  return {
    redux: state.common.redux,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
