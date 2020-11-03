import React from 'react';
import Style from './index.less'

const Loading = ({ text = "loading" }) => {
  return (
		<div className={Style.loading}>{text}</div>
  );
};

export default Loading;
