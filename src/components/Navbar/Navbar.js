import React from 'react'
import { useNavigate } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react"

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Menu>
      <Menu.Item onClick={() =>
        navigate('/')
      }>
        Home
      </Menu.Item>
      <Dropdown text='Projects' pointing className='link item'>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() =>
            navigate(`/projects/meme-generator`)
          }>
            Meme Generator
          </Dropdown.Item>
          <Dropdown.Item onClick={() =>
            navigate('/projects/bitcoin-tester')
          }>
            Bitcoin Tester
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  )
}