import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import Card from '../../components/Card/MainCard';
import {useEffect} from "react";

const Index = (props) => {
    useEffect(()=>{

    },[])
  return (
      <>
        <Row>
          <Col>
            <Card title="Hello Card" isOption>
              <p>
                "w hhe hh fff dipsum dolor dsit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad md inim venisam, quis nosstrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                Ut enim ad md inim venisam, quis nosstrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                Ut enim ad md  inim venisam, quis nosstrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  dess
                  sede
                  sddd
                  w
                  d
              </p>
            </Card>
          </Col>
        </Row>
      </>
  );
};

/*

const mapStateToProps = state => {
    return {
        laravel: state
    };
};
export default connect(mapStateToProps)(SamplePage);
*/


export default Index;
