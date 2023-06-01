import  { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';

const NavLogo = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <>
      <div className="navbar-brand header-logo" style={{backgroundColor:'#fff'}}>
        <Link to="#" className="b-brand">
          {/*<div className="b-bg" style={{backgroundImage:`url("images/hatcard_logo.jpg")`}}>*/}
          <div className="b-bg" style={{backgroundImage:`url("images/vsp-favicon.png")`}}>
          </div>
          <span className="b-title" style={{color: '#A42262',fontFamily: 'Trebuchet', fontSize:'25px'}}>
            {/*hat<span style={{color: '#4ED4E8',fontWeight:'bold',fontFamily: 'Trebuchet'}}>CARD</span>*/}
            PHC<span style={{color: '#4ED4E8',fontWeight:'bold',fontFamily: 'Trebuchet'}}>-VSP</span>
          </span>
        </Link>
        <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}>
          <span />
        </Link>
      </div>
    </>
  );
};

export default NavLogo;

/*
<a href="https://www.freepik.com/free-vector/data-analytics-flat-icons_3976973.htm#query=analytics%20icon&position=1&from_view=keyword&track=robertav1_2_sidr">Image by macrovector</a> on Freepik
*/

/*
<a href="#" className="sidebar-brand" >

</a>
<div className="sidebar-toggler not-active">
  <span></span>
  <span></span>
  <span></span>
</div>*/
