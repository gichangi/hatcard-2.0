import  { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    navigation.menuItems.map((item, index) => {
      if (item.type && item.type === 'group') {
        getCollapse(item, index);
        setShowBreadcrumb(false)
      }
      return false;
    });
  });

  const getCollapse = (item, index) => {
    if (item.children) {
      item.children.filter((collapse) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse, index);
        } else if (collapse.type && collapse.type === 'item') {
          if (document.location.pathname === BASENAME + collapse.url) {
            setMain(item);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  let mainContent, itemContent;
  let breadcrumbContent = '';
  let title = '';

  if (main && main.type === 'collapse') {
    mainContent = (
      <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
        <Link to="#">{main.title}</Link>
      </ListGroup.Item>
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

      breadcrumbContent = (
          <>
            <>

                  <div className="page-header">
                    <div className="page-block">
                      <div className="row align-items-center">
                        <div className="col-md-12">
                          <div className="page-header-title">
                            {/*<h5 className="m-b-10">{title}</h5>*/}
                          </div>

                          <ListGroup as="ul" bsPrefix=" " className="breadcrumb">
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
            </>
          </>
      );
    }

    //document.title = title + BASE_TITLE;
    document.title = BASE_TITLE;
  }
  const location = useLocation();
  return <>
    {(!state && location.pathname !== '/home' && location.pathname !== '/dashboards/view') &&
        {breadcrumbContent}
    }

  </>;
};

export default Breadcrumb;
