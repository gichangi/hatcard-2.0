import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import Card from '../../components/Card/MainCard';
import {useEffect} from "react";

const SamplePage = (props) => {
    useEffect(()=>{

    },[])
  return (
      <>
        <Row>
          <Col>
            <Card title="Hello Card" isOption>
              <p>
                "dipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim venisam, quis nosstrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </Card>
          </Col>
        </Row>
      </>
  );
};


const mapStateToProps = state => {
    return {
        laravel: state
    };
};
export default connect(mapStateToProps)(SamplePage);
