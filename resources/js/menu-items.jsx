// Get left navigation menu items from localStore
import _ from 'lodash';

const orderItems = (items) => _.orderBy(items, (item) => item.order_id, ["asc"]);
const setMenuItems = () => {
  let localStoreNavMenuItems = JSON.parse(localStorage.getItem( 'hatcard.navMenuItems' )) || 1;
  let items = []
  console.log('menu-tree mew mew'+ orderItems(localStoreNavMenuItems));
  alert('called')
  if(localStoreNavMenuItems !== 1){
    let navMenuItems = orderItems(localStoreNavMenuItems);
    if(navMenuItems.length > 0){
      return {
        items:navMenuItems
      }
    }
  }

  return {
    //items:items
    items:[]
  }
};
const menuItems = setMenuItems();
export default menuItems;
