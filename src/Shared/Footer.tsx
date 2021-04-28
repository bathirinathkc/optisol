import React from 'react';
/**
 * Footer component
 * @returns 
 */
const Footer: React.FC = () => {
  return <>
    <footer className="footer">
      <div className="text-center">
        <span>
          &copy; {new Date().getFullYear()} Copyright
        </span>
      </div>
    </footer>
  </>
}

export default Footer;