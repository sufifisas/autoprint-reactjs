import React from 'react';

function Footer(props) {
  return (
    <div className="footer" style={{background:props.color}}>
      <div className="col-footer">
          <div className="copy">
              <p>copyright &copy; 2020 All Right Reserved by Autoprint</p>
          </div>
      </div>
    </div>
  );
}

export default Footer;