import ReactDOM from 'react-dom';
import ValidationError from '../../shares/lib/ValidationError';

export default function focusInvalidField(component, error) {
    if (!(error instanceof ValidationError)) return;
    if (!error.field) return;
    const node = ReactDOM.findDOMNode(component);
    if (!node) return;
    const el = node.querySelector(`[name=${error.field}]`);
    if (!el) return;
    el.focus();
}