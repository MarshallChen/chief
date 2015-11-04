import ReactDOM from 'react-dom';
import ValidationError from '../../shares/lib/ValidationError';

export function focusInvalidField(component) {
  return (error) => {
    if (error instanceof ValidationError) {
      if (!error.field) return;
      const node = ReactDOM.findDOMNode(component);
      if (!node) return;
      const el = node.querySelector(`[name=${error.field}]`);
      if (!el) return;
      el.focus();
      return;
    }
    throw error;
  };
}