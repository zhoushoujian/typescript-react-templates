import React, { useEffect } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import Loading from "@/components/loading"
import { updateRedux } from "@/ducks/common"

console.log('get redux data => ', window.$getState().common.redux)

const Test = ({ redux }) => {

  console.log("redux => ", redux)

  useEffect(() => {
    Loadable.preloadAll();
    window.$dispatch(updateRedux('redux update'))
  }, [])

  return (
    <Loading text="Loading" />
  )
}

const mapStateToProps = state => {
  return {
    redux: state.common.redux,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
