export const IsDesktop = (setDesktopWidth) => {
    const widthToCheck = setDesktopWidth !== null && setDesktopWidth !== undefined ? setDesktopWidth : 990;
    return window.innerWidth > widthToCheck;
  }
