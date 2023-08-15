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
                    email: 'admin@usaid.org',
                    password: 'P@55w0rd',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        // await firebaseEmailPasswordSignIn(values.email, values.password);
                        await emailPasswordSignIn(values.email, values.password);

                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(true);
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
                        <div className="form-group mb-3" style={{display:"flex", alignItems:'start',flexDirection:'column'}}>
                            <label htmlFor="username" style={{'color':'#002a6c','fontFamily':'Noto Sans'}}>Email address</label>
                            <input
                                className="form-control"
                                error={touched.email && errors.email}
                                label="Email Address / Username"
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="email"
                                value={values.email}
                                placeholder="Email"
                                style={{
                                    color:'#495057',
                                    fontSize:'0.875rem',
                                    fontWeight:'600'
                                }}
                            />
                            {touched.email && errors.email && <small class="text-danger form-text">{errors.email}</small>}
                        </div>
                        <div className="form-group mb-4" style={{display:"flex", alignItems:'start',flexDirection:'column'}}>
                            <label htmlFor="username" style={{'color':'#002a6c','fontFamily':'Noto Sans'}}>Password</label>
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
                                    fontWeight:'600'
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
                                <Button className="btn-block" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary" style={{backgroundColor:'#992E62', borderColor:'#992E62'}}>
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
