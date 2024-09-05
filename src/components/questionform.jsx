import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Select, Checkbox, Button, Typography, Row, Col, Card, Radio, Tooltip } from 'antd';
import { QuestionCircleOutlined, BulbOutlined, EditOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const QuestionForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    validateForm: () => form.validateFields().then(() => true).catch(() => false)
  }));

  const renderOptionRow = (labels) => (
    <Row gutter={[16, 16]}>
      {labels.map((label) => (
        <Col xs={24} sm={12} key={label}>
          <Card
            size="small"
            title={`Option ${label}`}
            extra={
              <Tooltip title="Mark as math equation">
                <Form.Item name={['isOptionMath', label]} valuePropName="checked" noStyle>
                  <Checkbox>
                    <span role="img" aria-label="formula">🧮</span>
                  </Checkbox>
                </Form.Item>
              </Tooltip>
            }
          >
            <Form.Item
              name={['options', label]}
              rules={[{ required: true, message: 'Please enter the option' }]}
              noStyle
            >
              <Input placeholder={`Enter option ${label}`} />
            </Form.Item>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <Card
      title={
        <Title level={4}>
          <BulbOutlined style={{ marginRight: 8 }} />
          Create a New Question
        </Title>
      }
      hoverable
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="typeOfQuestion"
              label="Type of Question"
              rules={[{ required: true, message: 'Please select a question type' }]}
            >
              <Select suffixIcon={<QuestionCircleOutlined />}>
                <Option value="text">Text</Option>
                <Option value="html">HTML</Option>
                <Option value="math">Math</Option>
                <Option value="statement">Statement</Option>
                <Option value="matchPairs">Match Pairs</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="question"
          rules={[{ required: true, message: 'Please enter the question' }]}
        >
          <TextArea rows={5} placeholder="Enter your Question ..." />
        </Form.Item>

        <Title level={5}>Options</Title>
        {renderOptionRow(['A', 'B'])}
        {renderOptionRow(['C', 'D'])}

        <Row gutter={16} align="middle">
          <Col xs={24} sm={16}>
            <Form.Item
              name="correctAnswer"
              label="Choose Correct Answer"
              rules={[{ required: true, message: 'Please select the correct answer' }]}
            >
              <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
                <Row gutter={[8, 8]}>
                  {['A', 'B', 'C', 'D'].map((label) => (
                    <Col span={6} key={label}>
                      <Radio.Button value={label} style={{ width: '100%', textAlign: 'center' }}>
                        Option {label}
                      </Radio.Button>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label=" " colon={false}>
              <Button type="dashed" icon={<EditOutlined />} block>
                Generate Wrong Options
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="paragraphId" label="Paragraph ID (Optional)">
          <Input prefix={<QuestionCircleOutlined />} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description (Required)"
          rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <TextArea rows={5} />
        </Form.Item>
      </Form>
    </Card>
  );
});

QuestionForm.displayName = 'QuestionForm';

export default QuestionForm;