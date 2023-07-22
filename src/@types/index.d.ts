declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}

interface Window {
  axios: any;
}
