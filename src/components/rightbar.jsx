import React, { useState } from 'react';
import { Button, Input, Space, Typography, Card, List, Select, Checkbox, Tooltip, Badge } from 'antd';
import { DeleteOutlined, TranslationOutlined, BookOutlined, AppstoreOutlined, SendOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;

const Sidebar = ({ onSubmit }) => {
  // State for related modules
  const [relatedModules, setRelatedModules] = useState([]);
  const [moduleId, setModuleId] = useState('');

  // State for subject and section selection
  const [subject, setSubject] = useState(null);
  const [section, setSection] = useState(null);

  // Courses data and state
  const [courses, setCourses] = useState([
    { id: 1, name: 'Course: SSC CHSL', unit: 'History - Ancient, Medieval & Modern', topic: 'Ancient Indian History', selected: false },
    { id: 2, name: 'Course: SSC CGL', unit: 'History - Ancient, Medieval & Modern', topic: 'Ancient Indian History', selected: false },
    { id: 3, name: 'Course: SSC MTS', unit: 'History - Ancient, Medieval & Modern', topic: 'Ancient Indian History', selected: false }
  ]);

  const addModule = () => {
    if (moduleId && !relatedModules.includes(moduleId)) {
      setRelatedModules([...relatedModules, moduleId]);
      setModuleId(''); // Clear input field after adding
    }
  };

  const deleteModule = (id) => {
    setRelatedModules(relatedModules.filter((module) => module !== id));
  };

  const handleSubjectChange = (value) => {
    setSubject(value);
  };

  const handleSectionChange = (value) => {
    setSection(value);
  };

  const handleCheckboxChange = (courseId) => {
    setCourses(courses.map(course =>
      course.id === courseId ? { ...course, selected: !course.selected } : course
    ));
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      {/* Existing sidebar content */}
      <Card hoverable>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button 
            type="primary" 
            icon={<SendOutlined />} 
            block 
            onClick={onSubmit} 
            size="large"
            style={{ 
              backgroundColor: '#4CAF50', 
              borderColor: '#4CAF50',
              height: '50px',
              fontSize: '18px'
            }}
          >
            Submit Question
          </Button>
          
          <Space>
            <Checkbox>Add to Current Affairs</Checkbox>
            <Tooltip title="Questions marked as Current Affairs will be featured in the daily quiz">
              <Badge status="processing" />
            </Tooltip>
          </Space>
          <Checkbox>Show in Challenge</Checkbox>
          <Checkbox defaultChecked>Premium Question</Checkbox>
        </Space>
      </Card>

      {/* Language Card */}
      <Card hoverable>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={5}>Language</Title>
          <Select 
            defaultValue="English" 
            style={{ width: '100%' }}
            suffixIcon={<TranslationOutlined />}
          >
            <Option value="English">English</Option>
            <Option value="Malayalam">Malayalam</Option>
          </Select>

          <Button icon={<TranslationOutlined />} block>Translate</Button>
        </Space>
      </Card>

      {/* Subject and Section Selection */}
      <Card hoverable>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={5}>Select Subject</Title>
          <Select 
            placeholder="Select Subject" 
            style={{ width: '100%' }}
            onChange={handleSubjectChange}
            suffixIcon={<BookOutlined />}
          >
            <Option value="India">India</Option>
            <Option value="World">World</Option>
          </Select>

          <Title level={5}>Section</Title>
          <Select 
            placeholder="Select Section" 
            style={{ width: '100%' }}
            onChange={handleSectionChange}
            suffixIcon={<AppstoreOutlined />}
          >
            <Option value="Ancient History">Ancient History</Option>
            <Option value="Medieval History">Medieval History</Option>
          </Select>
        </Space>
      </Card>

      {/* Display Courses Based on Selection */}
      {subject && section && (
        <Card hoverable>
          <Title level={5}>Courses:</Title>
          <List
            bordered
            dataSource={courses}
            renderItem={course => (
              <List.Item>
                <Checkbox 
                  checked={course.selected} 
                  onChange={() => handleCheckboxChange(course.id)}
                >
                  <strong>{course.name}</strong>
                  <div>Unit: {course.unit}</div>
                  <div>Topic: {course.topic}</div>
                </Checkbox>
              </List.Item>
            )}
          />
        </Card>
      )}

      {/* List of Related Modules */}
      {relatedModules.length > 0 && (
        <Card hoverable>
          <Title level={5}>Related Modules:</Title>
          <List
            bordered
            dataSource={relatedModules}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => deleteModule(item)}
                  />,
                ]}
              >
                {item}
              </List.Item>
            )}
          />
        </Card>
      )}

      {/* Input field and Add button */}
      <Card hoverable>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Enter module ID"
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
          />
          <Button type="primary" block onClick={addModule}>
            Add Related Module
          </Button>
        </Space>
      </Card>
    </Space>
  );
};

export default Sidebar;
