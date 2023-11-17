import  { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import {Link, useParams} from 'react-router-dom';
import { FiHome } from "react-icons/fi";
//import navigation from '../../../menu-items';
import { BASE_TITLE, BASENAME } from '../../../config/constant';
import {useLocation, withRouter} from "react-router-dom";
import {useSelector} from "react-redux";


const Breadcrumb = () => {
  let { state } = useLocation();
  const [main, setMain] = useState([]);
  const [item, setItem] = useState([]);
  const [showBreadcrumb, setShowBreadcrumb] = useState(true);
  const navigation= useSelector(state => state.menus.list)
  let { id } = useParams();
  const [collapseList, setCollapseList]= useState([]);
  const collapseTree = []

  useEffect(() => {
    navigation.menuItems.map((item, index) => {
      if (item.type && item.type === 'group') {
        getCollapse(item, index);
        //setShowBreadcrumb(false)
      }
      return false;
    });

  },[location.pathname,id]);


  function findPath(tree, target) {
    let currentValue = tree.id;
    let currentName = tree.title;
    if (currentValue === target) return [{title:currentName, id:target} ];
    for (let t of Object.entries(tree)) {
      if (t[0] === "children" && t[1]) {
        for (let child of t[1]) {
          let found = findPath(child, target);
          if (found) {
            return [{title:currentName, id:tree.id}].concat(found);
          }
        }
      }
    }
    return null;
  }



  const getCollapse = (item, index) => {
    if (item.children) {
      item.children.filter((collapse) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse, index);
        } else if (collapse.type && collapse.type === 'item') {
          if(collapse.category === 'dashboard'){
            if(location.pathname === collapse.url.replace(/\/+$/, "")+'/'+collapse.id){
              setMain(item);
              setItem(collapse);
              navigation.menuItems.map((menus)=>{
                const result = findPath(menus, item.id)
                if(result !== null){
                  setCollapseList([...result]);
                  return '';
                }
              })
            }

          }else{
            if (location.pathname === collapse.url.replace(/\/+$/, "")) {
              setMain(item);
              setItem(collapse);
              navigation.menuItems.map((menus)=>{
                const result = findPath(menus, item.id)
                if(result !== null){
                  setCollapseList([...result]);
                  return '';
                }
              })
            }
          }

        }
        return false;
      });
    }
  };

  let mainContent, itemContent;
  let breadcrumbContent = '';
  let title = '';

  if (main && main.type === 'collapse' || main.type === 'group' ) {
    mainContent = (
        <>
          {collapseList.map(item =>(
              <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
                <Link to={`/explore/${item.id}`}>{item.title}</Link>
              </ListGroup.Item>
          ))}

        </>

    );
  }

  if (item && item.type === 'item') {
    title = item.title;
    itemContent = (
      <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
        <Link to="#">{title} </Link>
      </ListGroup.Item>
    );

    if (item.breadcrumbs !== false) {
      const location = useLocation();
      breadcrumbContent = (
          <>
            <>
              {/*{(!state && location.pathname !== '/home' && location.pathname !== '/dashboards/view') &&*/}
                  <div className="page-header">
                    <div className="page-block">
                      <div className="row align-items-center">
                        <div className="col-md-12">
                          <div className="page-header-title">
                            {/*<h5 className="m-b-10">{title}</h5>*/}
                          </div>

                          <ListGroup as="ul" bsPrefix=" " className="breadcrumb" style={{marginBottom:'0rem'}}>
                            <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
                              <Link to="/">
                                <FiHome />
                              </Link>
                            </ListGroup.Item>
                            {mainContent}
                            {itemContent}
                          </ListGroup>
                        </div>
                      </div>
                    </div>
                  </div>
              {/*}*/}

            </>
          </>
      );
    }

    //document.title = title + BASE_TITLE;
    document.title = BASE_TITLE;
  }

  return <>
    {location.pathname !== "/home" &&(
        <>
          {breadcrumbContent}
        </>
    )}

  </>;
};

export default Breadcrumb;
