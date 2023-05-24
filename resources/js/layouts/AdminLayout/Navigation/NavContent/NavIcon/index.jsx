

const NavIcon = ({ items }) => {
  let navIcons = false;
  if (items.icon) {
    navIcons = (
      <span className="pcoded-micon">
        <i className={items.icon} />
      </span>
    );
  }

  return <>{navIcons}</>;
};

export default NavIcon;
