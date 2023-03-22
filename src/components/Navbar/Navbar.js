import React from 'react'
import { useNavigate } from "react-router-dom";
import { Menu, Dropdown, DropdownHeader, DropdownDivider, DropdownItem } from "semantic-ui-react"

export default function Navbar () {
  const navigate = useNavigate();

  return (
    <Menu>
      <Menu.Item onClick={ () =>
        navigate('/')
      }>
        Home
      </Menu.Item>
      <Dropdown text='Projects' pointing className='link item'>
        <Dropdown.Menu>
          <DropdownHeader>Scrimba</DropdownHeader>
          <Dropdown.Item onClick={ () =>
            navigate(`/projects/meme-generator`)
          }>
            Meme Generator
          </Dropdown.Item>
          <DropdownDivider />
          <DropdownHeader>Crypto</DropdownHeader>
          <Dropdown.Item onClick={ () =>
            navigate('/projects/bitcoin-tester')
          }>
            Bitcoin Tester
          </Dropdown.Item>
          <Dropdown.Item onClick={ () =>
            navigate('/projects/crypto-charts')
          }>
            Charts
          </Dropdown.Item>
          <DropdownDivider />
          <DropdownHeader>MTG</DropdownHeader>
          <DropdownItem onClick={ () =>
            navigate('/projects/mtg')
          }>
            MTG Card Lookup
          </DropdownItem>
          <DropdownDivider />
          <DropdownHeader>League of Legends</DropdownHeader>
          <DropdownItem onClick={ () =>
            navigate('/projects/lol')
          }>
            League of Legends Champion Scraper
          </DropdownItem>
          <DropdownItem onClick={ () =>
            navigate('/projects/lolaccount')
          }>
            League of Legends Account Scraper
          </DropdownItem>
          <DropdownDivider />
          <DropdownHeader>ChatGPT</DropdownHeader>
          <DropdownItem onClick={ () =>
            navigate('/projects/chatgpt')
          }>
            ChatGPT Example
          </DropdownItem>
          <DropdownDivider />
          <DropdownHeader>Calculator</DropdownHeader>
          <DropdownItem onClick={ () =>
            navigate('/projects/calculator')
          }>
            Calculator
          </DropdownItem>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  )
}