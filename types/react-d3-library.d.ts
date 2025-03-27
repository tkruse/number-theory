declare module 'react-d3-library' {
  import { Component } from 'react';

  interface RD3ComponentProps {
    data: HTMLElement;
  }

  export default class RD3Component extends Component<RD3ComponentProps> {}
}
