"use client";

import React from 'react'
import { useParams } from 'next/navigation';

const SpecialityPage = () => {

    const {speciality} = useParams();

  return (
    <div>SpecialityPage: {speciality}</div>
  )
}

export default SpecialityPage