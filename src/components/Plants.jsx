import React from 'react'
import Container from './Container'
import Card from './Card'

export default function Plants() {
  return (
    <>
        <Container>
            <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 2xl:grid-cols-6 gap-8'>
                <Card/>
            </div>
        </Container>
    </>
  )
}
