import React, { useEffect } from 'react';
import Loadable from 'react-loadable';
import Loading from "@/components/loading"

const Test = () => {

  useEffect(() => {
    Loadable.preloadAll();
  }, [])

  return (
    <Loading text="Loading" />
  )
}

export default Test