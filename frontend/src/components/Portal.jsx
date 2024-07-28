import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="modal">
      {children}
    </div>,
    document.getElementById('portal-root')
  );
};

export default Portal;