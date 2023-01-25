import css from './Button.module.css';
import { Component } from 'react';

export class Button extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button type="button" onClick={onClick} className={css.button}>
        Load more
      </button>
    );
  }
}
