import { Row, Col, Button, Alert } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from '../../../hooks/useAuth';
import useScriptRef from '../../../hooks/useScriptRef';

const Login = ({ className, ...rest }) => {
    const scriptedRef = useScriptRef();

    const { emailPasswordSignIn } = useAuth();


    return (
        <>
            <Formik
                initialValues={{
                    username: null,
                    password: null,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().email('Must be a valid username').max(255).required('Username is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        // await firebaseEmailPasswordSignIn(values.email, values.password);
                        const successful = await emailPasswordSignIn(values.username, values.password);
                        console.log(successful);

                        if (successful) {
                            setStatus({ success: true });
                            setSubmitting(true);
                        } else {
                            setStatus({ success: false });
                            setSubmitting(false);
                            setErrors({ submit: "User name or password incorrect, please check and try again." });
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
                        <div className="form-group mb-1" style={{display:"flex", alignItems:'start',flexDirection:'column'}}>
                            <label htmlFor="username" style={{'color':'#002a6c','fontFamily':'Noto Sans',fontSize:'1.5rem'}}>User name</label>
                            <input
                                className="form-control"
                                error={touched.username && errors.username}
                                label="Username/Email Address"
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="email"
                                value={values.username}
                                placeholder="Username"
                                style={{
                                    color:'#495057',
                                    fontSize:'0.875rem',
                                    fontWeight:'600',
                                    height:'4rem',
                                    backgroundColor:'#fff'
                                }}
                            />
                            {touched.email && errors.username && <small class="text-danger form-text">{errors.username}</small>}
                        </div>
                        <div className="form-group mb-1" style={{display:"flex", alignItems:'start',flexDirection:'column'}}>
                            <label htmlFor="username" style={{'color':'#002a6c','fontFamily':'Noto Sans',fontSize:'1.5rem'}}>Enter your Password</label>
                            <input
                                className="form-control"
                                error={touched.password && errors.password}
                                label="Password"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="password"
                                value={values.password}
                                placeholder="Password"
                                style={{
                                    color:'#495057',
                                    fontSize:'0.875rem',
                                    fontWeight:'600',
                                    height:'4rem',
                                    backgroundColor:'#fff'
                                }}
                            />
                            {touched.password && errors.password && <small class="text-danger form-text">{errors.password}</small>}
                        </div>

                        {errors.submit && (
                            <Col sm={12}>
                                <Alert variant="danger">{errors.submit}</Alert>
                            </Col>
                        )}


                        <Row>
                            <Col mt={2}>
                                <Button className="btn-block" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary" style={{fontSize:'1.5rem', height:'4rem',backgroundColor:'#A52263', borderColor:'#992E62'}}>
                                    Signin
                                </Button>
                            </Col>
                        </Row>
                    </form>
                )}
            </Formik>
            <hr />
        </>
    );
};

export default Login;
