import React from 'react'
import Header from './components/Header'
import Meme from './components/Meme'
import './style.css'

export default function MemeGenerator() {
  return (
    <div>
      <Header />
      <Meme />
    </div>
  )
}