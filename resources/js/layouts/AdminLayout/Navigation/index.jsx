import {useContext, useEffect} from 'react';

import { ConfigContext } from '../../../contexts/ConfigContext';
import useWindowSize from '../../../hooks/useWindowSize';

import NavLogo from './NavLogo';
import NavContent from './NavContent';
//import navigation from '../../../menu-items';
import {useSelector} from "react-redux";

const Navigation = () => {
   // console.log("I am here")
   const currentMenu= useSelector(state => state.menus.list)
    //console.log(currentMenu)
    //console.log(navigation.items)
  const configContext = useContext(ConfigContext);

  const {
    layout,
    layoutType,
    navFixedLayout,
    collapseMenu,
    rtlLayout,
    boxLayout,
    subLayout,
    navBackColor,
    navDropdownIcon,
    navBrandColor,
    navListIcon,
    navActiveListColor,
    navListTitleColor,
    navBackImage,
    navIconColor,
    navListTitleHide,
    layout6Background,
    layout6BackSize
  } = configContext.state;
  const windowSize = useWindowSize();


  let navClass = [
    'pcoded-navbar'
    //layoutType
  ];

  if (subLayout !== null && subLayout !== '' && subLayout !== 'layout-6' && subLayout !== 'layout-8' && subLayout !== 'horizontal-2') {
    navClass = [...navClass, subLayout];
  } else {
    navClass = [
      ...navClass,
      layoutType,
      navBackColor,
      navBrandColor,
      'drp-icon-' + navDropdownIcon,
      'menu-item-icon-' + navListIcon,
      navActiveListColor,
      navListTitleColor
    ];

    if (navBackImage) {
      navClass = [...navClass, navBackImage];
    }

    if (navIconColor) {
      navClass = [...navClass, 'icon-colored'];
    }

    if (!navFixedLayout && layout !== 'horizontal') {
      navClass = [...navClass, 'menupos-static'];
    }

    if (navListTitleHide) {
      navClass = [...navClass, 'caption-hide'];
    }
  }

  if (layout === 'horizontal') {
    navClass = [...navClass, 'theme-horizontal'];
  }

  if (windowSize.width < 992 && collapseMenu) {
    navClass = [...navClass, 'mob-open'];
  } else if (collapseMenu) {
    navClass = [...navClass, 'navbar-collapsed'];
  }

  if (subLayout === 'layout-6') {
    document.body.classList.add('layout-6');
    document.body.style.backgroundImage = layout6Background;
    document.body.style.backgroundSize = layout6BackSize;
  }

  if (subLayout === 'layout-8') {
    document.body.classList.add('layout-8');
  }

  if (layoutType === 'dark') {
    document.body.classList.add('datta-dark');
  } else {
    document.body.classList.remove('datta-dark');
  }

  if (rtlLayout) {
    document.body.classList.add('datta-rtl');
  } else {
    document.body.classList.remove('datta-rtl');
  }

  if (boxLayout) {
    document.body.classList.add('container');
    document.body.classList.add('box-layout');
  } else {
    document.body.classList.remove('container');
    document.body.classList.remove('box-layout');
  }

  let navStyle;

  let navBarClass = ['navbar-wrapper'];
  if (layout === 'horizontal' && subLayout === 'horizontal-2') {
    navBarClass = [...navBarClass, 'container'];
  }

  let navContent = (
    <div className={navBarClass.join(' ')}>
      <NavLogo />
      <NavContent navigation={currentMenu.menuItems} />
    </div>
  );
  if (windowSize.width < 992) {
    navContent = (
      <div className="navbar-wrapper">
        <NavLogo />
        <NavContent navigation={currentMenu.menuItems} />
      </div>
    );
  }
  return (
    <>
      <nav className={navClass.join(' ')} style={navStyle}>
        {navContent}
      </nav>
    </>
  );
};

export default Navigation;
