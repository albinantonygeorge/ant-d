import React, { useRef } from 'react';
import { Layout, ConfigProvider, Row, Col, message, theme } from 'antd';
import QuestionForm from './components/questionform';
import Sidebar from './components/rightbar';

const { Content } = Layout;

const App = () => {
  const questionFormRef = useRef();

  const handleSubmit = async () => {
    try {
      const isValid = await questionFormRef.current.validateForm();
      if (isValid) {
        console.log("Form is valid, submitting...");
        message.success("Question submitted successfully!");
        // Add your submission logic here
      }
    } catch (error) {
      console.log("Form has errors, please correct them");
      message.error("Please correct the errors in the form before submitting.");
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#4CAF50',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <Content style={{ padding: '24px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <QuestionForm ref={questionFormRef} />
            </Col>
            <Col xs={24} lg={8}>
              <Sidebar onSubmit={handleSubmit} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;