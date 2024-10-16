// src/components/ButtonToggle.tsx
import React from 'react';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

interface ButtonToggleProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const ButtonToggle: React.FC<ButtonToggleProps> = ({ collapsed, toggleCollapsed }) => {
  return (
    <Button type="primary" onClick={toggleCollapsed} className="mb-4">
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </Button>
  );
};

export default ButtonToggle;
